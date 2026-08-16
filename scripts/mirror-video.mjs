/**
 * Pull every hosted project video onto our own domain.
 *
 * Behance hands us players, not files: a project's video arrives as an iframe
 * pointing at Vimeo or Adobe CCV, which means a third party decides whether the
 * work loads, what plays before it, and who gets told about it. This script
 * fetches the actual media, re-encodes it to VP9/WebM, and rewrites the block
 * from `embed` to `video` so the page serves its own work.
 *
 * YouTube embeds are left alone on purpose — those are publisher trailers, not
 * our uploads, and an iframe is the right way to show somebody else's video.
 *
 * Run after a clone: `npm run mirror:video`. It is idempotent, and self-repairing
 * in both directions the state can break:
 *
 *  - a re-clone regenerates `projects/*.json` and throws the rewrites away, but
 *    the encoded files are still on disk, so the next run re-links them without
 *    downloading or encoding anything.
 *  - a deleted output leaves a rewritten block pointing at nothing, so the next
 *    run re-encodes it from the retained source original. Recognising those
 *    blocks is what `MIRRORED_SRC` is for.
 *
 * Only if BOTH the output and the source original are gone is a block beyond
 * repair, because the rewrite consumed the provider URL — re-clone, then re-run.
 *
 * Failures are per-video and non-fatal: a video that will not resolve keeps its
 * embed rather than leaving a `<video>` pointing at nothing.
 *
 * Two known access failures, neither of them a bug here. Vimeo's config and
 * OAuth endpoints refuse datacenter IPs outright ("we couldn't verify the
 * security of your connection", even from a real headless browser), and older
 * yt-dlp builds cannot parse Vimeo's current page shape — the two newest uploads
 * in this set fail with `KeyError('config_url')` on yt-dlp 2024.04.09. A current
 * yt-dlp on an ordinary connection gets all of them.
 */
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { readFile, writeFile, mkdir, readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const run = promisify(execFile)

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const PROJECTS = path.join(ROOT, 'src/content/work/projects')
const ORIGINALS = path.join(ROOT, '_assets-src/behance')
const WEB = path.join(ROOT, 'public/assets/img/work')
const PUBLIC_PREFIX = '/assets/img/work'

// Matches the still-image pipeline's ceiling: cloned video should not arrive
// larger than the cloned art it sits between.
const VIDEO_WIDTH = 1600
// VP9 at 32 held a 12MB source to 3.1MB with no visible loss on UI motion,
// which is the hardest thing here — flat panels and type show banding first.
const CRF = 32
const AUDIO_BITRATE = '96k'
// Frame rate, not quality, is what makes a showreel heavy: the one 60fps source
// in the set came out at 8MB for 20 seconds while a 22-second 30fps clip came
// out at 3MB. Halving its frame rate took it to 6MB with every remaining frame
// untouched — raising CRF to reach the same size visibly degraded all of them.
// Written as a floor against `source_fps` so the filter is a no-op below 30 and
// a 29.97 source is never resampled to 30.
const MAX_FPS = 30

// The providers whose players host OUR uploads. `iframe` (YouTube) is excluded
// by its absence, not by a special case.
const MIRRORED = new Set(['vimeo', 'adobe-ccv'])

/**
 * A block this script has already rewritten, recognised by the file name it
 * gave it. Necessary because the rewrite is destructive: once an `embed` becomes
 * a `video` the provider URL is gone from the JSON, so on the next run there is
 * nothing left identifying the block as ours except the path — and without that
 * a deleted output leaves the page pointing at a file nobody will rebuild.
 *
 * Transcoded GIFs are `video` blocks too, and are deliberately not matched: they
 * are numbered by image index and belong to the clone script, not to this one.
 */
const MIRRORED_SRC = /\/(embed-\d+)\.webm$/

const FORCE = process.argv.includes('--force')
const tally = { mirrored: 0, relinked: 0, skipped: 0, failures: [] }

const exists = (p) =>
  stat(p).then(
    () => true,
    () => false,
  )

/**
 * Adobe signs its manifests with a short-lived token, so there is no stable URL
 * to keep — the player has to be opened and the request it makes intercepted.
 */
async function resolveAdobeManifest(embedUrl) {
  const { chromium } = await import('playwright')
  const browser = await chromium.launch()
  try {
    const page = await browser
      .newContext({ extraHTTPHeaders: { Referer: 'https://www.behance.net/' } })
      .then((ctx) => ctx.newPage())
    let manifest = null
    page.on('response', (res) => {
      if (!manifest && /master\.m3u8/.test(res.url())) manifest = res.url()
    })
    await page.goto(embedUrl, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => {})
    await page.waitForTimeout(2500)
    if (!manifest) throw new Error('player never requested a manifest')
    return manifest
  } finally {
    await browser.close()
  }
}

/** yt-dlp resolves Vimeo from the canonical URL; the player URL 401s. */
function vimeoUrl(embedUrl) {
  const id = embedUrl.match(/\/video\/(\d+)/)?.[1]
  if (!id) throw new Error(`no video id in ${embedUrl}`)
  // Unlisted videos carry their hash in `h`, and it is part of the address.
  const hash = new URL(embedUrl).searchParams.get('h')
  return `https://vimeo.com/${id}${hash ? `/${hash}` : ''}`
}

async function fetchSource(block, dest) {
  const url =
    block.provider === 'adobe-ccv' ? await resolveAdobeManifest(block.url) : vimeoUrl(block.url)
  await run('yt-dlp', [
    '--no-warnings',
    '--no-progress',
    '-f',
    'bv*+ba/b',
    '--merge-output-format',
    'mp4',
    '-o',
    dest,
    url,
  ])
  return dest
}

async function probe(file) {
  const { stdout } = await run('ffprobe', [
    '-v', 'error',
    '-select_streams', 'v:0',
    '-show_entries', 'stream=width,height',
    '-of', 'json',
    file,
  ])
  const { width, height } = JSON.parse(stdout).streams[0]
  return { width, height }
}

async function hasAudio(file) {
  const { stdout } = await run('ffprobe', [
    '-v', 'error',
    '-select_streams', 'a',
    '-show_entries', 'stream=codec_type',
    '-of', 'csv=p=0',
    file,
  ])
  return stdout.trim().length > 0
}

/**
 * Re-encode to WebM and cut a poster from it. The poster comes from the encoded
 * file rather than the source so that what the reader sees before pressing play
 * is exactly the first frame of what plays.
 */
async function encode(source, outDir, stem) {
  const src = await probe(source)
  const width = Math.min(src.width, VIDEO_WIDTH)
  // Even dimensions or VP9 refuses the odd one; -2 lets ffmpeg pick the height.
  const sound = await hasAudio(source)

  const webm = path.join(outDir, `${stem}.webm`)
  await run('ffmpeg', [
    '-y', '-loglevel', 'error',
    '-i', source,
    '-vf', `scale=${width}:-2:flags=lanczos,fps=fps=min(source_fps\\,${MAX_FPS})`,
    '-c:v', 'libvpx-vp9', '-crf', String(CRF), '-b:v', '0',
    '-row-mt', '1', '-cpu-used', '2', '-pix_fmt', 'yuv420p',
    ...(sound ? ['-c:a', 'libopus', '-b:a', AUDIO_BITRATE] : ['-an']),
    webm,
  ])

  const frame = path.join(outDir, `${stem}.poster.png`)
  await run('ffmpeg', ['-y', '-loglevel', 'error', '-i', webm, '-frames:v', '1', frame])
  const poster = `${stem}.webp`
  await sharp(frame).webp({ quality: 80 }).toFile(path.join(outDir, poster))
  await run('rm', ['-f', frame])

  const out = await probe(webm)
  return { webm: `${stem}.webm`, poster, width: out.width, height: out.height, sound }
}

async function mirrorProject(file) {
  const projectPath = path.join(PROJECTS, file)
  const project = JSON.parse(await readFile(projectPath, 'utf8'))
  const srcDir = path.join(ORIGINALS, project.slug)
  const outDir = path.join(WEB, project.slug)
  let changed = false

  for (const [i, block] of project.blocks.entries()) {
    const pending = block.type === 'embed' && MIRRORED.has(block.provider)
    const done = block.type === 'video' && MIRRORED_SRC.test(block.src)
    if (!pending && !done) continue

    const stem = pending ? `embed-${String(i).padStart(2, '0')}` : block.src.match(MIRRORED_SRC)[1]
    const label = `${project.slug}/${stem}`
    const webmPath = path.join(outDir, `${stem}.webm`)

    // Already mirrored and the file is still there: nothing to do. Re-probing it
    // to rebuild a block that already says the right thing is wasted work.
    if (!FORCE && done && (await exists(webmPath))) {
      tally.skipped++
      continue
    }

    try {
      await mkdir(srcDir, { recursive: true })
      await mkdir(outDir, { recursive: true })

      let encoded
      if (!FORCE && !done && (await exists(webmPath))) {
        // Encoded by an earlier run whose JSON rewrite was then thrown away by a
        // re-clone. Re-link it rather than spending a download and an encode on
        // a file already sitting on disk.
        encoded = { webm: `${stem}.webm`, poster: `${stem}.webp`, ...(await probe(webmPath)) }
        tally.relinked++
        console.log(`  = ${label} (re-linked)`)
      } else {
        const source = path.join(srcDir, `${stem}.mp4`)
        if (FORCE || !(await exists(source))) {
          // Only an `embed` block still carries the provider URL. A `video` block
          // whose source original is gone too cannot be recovered here — re-clone
          // to bring the embed back, then run this again.
          if (done) throw new Error('output and source original both missing — re-clone first')
          await fetchSource(block, source)
        }
        encoded = await encode(source, outDir, stem)
        tally.mirrored++
        console.log(`  + ${label} (${encoded.width}x${encoded.height}${encoded.sound ? ', sound' : ''})`)
      }

      project.blocks[i] = {
        type: 'video',
        src: `${PUBLIC_PREFIX}/${project.slug}/${encoded.webm}`,
        poster: `${PUBLIC_PREFIX}/${project.slug}/${encoded.poster}`,
        width: encoded.width,
        height: encoded.height,
        alt: '',
        caption: block.caption ?? '',
        // Set on every mirrored block, silent ones included — see the field's
        // note in `types.ts`. The renderer cannot tell a film from a transcoded
        // GIF without it, and the two behave oppositely.
        player: true,
      }
      changed = true
    } catch (err) {
      tally.failures.push(`${label}: ${err.message ?? err}`)
      console.log(`  ! ${label}: ${String(err.message ?? err).split('\n')[0]}`)
    }
  }

  if (changed) await writeFile(projectPath, `${JSON.stringify(project, null, 2)}\n`)
}

const files = (await readdir(PROJECTS)).filter((f) => f.endsWith('.json'))
for (const file of files) await mirrorProject(file)

console.log(
  `\nmirrored ${tally.mirrored} · re-linked ${tally.relinked} · unchanged ${tally.skipped} · failed ${tally.failures.length}`,
)
if (tally.failures.length) {
  console.log('\nleft as embeds:')
  for (const f of tally.failures) console.log(`  ${f}`)
}
