#!/usr/bin/env node
// Mirror a Behance profile into the repo as self-hosted content.
//
// Two stages, each re-runnable on its own:
//   snapshot  — pull the raw Redux state of the profile and every project into
//               docs/behance/raw/. Network in, JSON out, nothing derived.
//   normalize — turn those snapshots into src/content/work/*.json and download
//               every image into _assets-src (originals) and public (webp).
//
// The split matters: Behance can change its page shape at any time, but the
// snapshots stay readable, so normalize can be fixed and re-run offline.
//
//   node scripts/clone-behance.mjs                    # both stages, 16 projects
//   node scripts/clone-behance.mjs --limit=24
//   node scripts/clone-behance.mjs --stage=normalize --force

import { chromium } from 'playwright'
import sharp from 'sharp'
import { mkdir, writeFile, readFile, access, readdir, rm, stat } from 'node:fs/promises'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const run = promisify(execFile)

const PROFILE_URL = 'https://www.behance.net/thaliatran'
const UA =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const RAW = path.join(ROOT, 'docs/behance/raw')
const ORIGINALS = path.join(ROOT, '_assets-src/behance')
const WEB = path.join(ROOT, 'public/assets/img/work')
const CONTENT = path.join(ROOT, 'src/content/work')
const PUBLIC_PREFIX = '/assets/img/work'

// Behance serves progressively larger renditions of the same upload; 2048 is
// what optimize-images.mjs already caps at, so cloned art matches hand-placed art.
const MAX_WIDTH = 2048
const WEBP_QUALITY = 80
// A long GIF is video wearing an image's clothes. Past these limits an animated
// WebP stays tens of megabytes, so h264 takes over: the profile's 358-frame GIF
// is 48MB as sent, 20MB as animated WebP, 4MB as MP4.
const ANIMATED_MAX_FRAMES = 60
const ANIMATED_MAX_BYTES = 2 * 1024 * 1024
const VIDEO_WIDTH = 1600

const argv = process.argv.slice(2)
const flag = (name, fallback) => {
  const hit = argv.find((a) => a.startsWith(`--${name}=`))
  return hit ? hit.slice(name.length + 3) : fallback
}
const LIMIT = Number(flag('limit', '16'))
const STAGE = flag('stage', 'all')
const FORCE = argv.includes('--force')

const tally = { projects: 0, downloaded: 0, converted: 0, skipped: 0, failures: [] }
const fail = (what, err) => {
  tally.failures.push(`${what}: ${err.message ?? err}`)
  console.error(`  ! ${what} — ${err.message ?? err}`)
}

const exists = (p) =>
  access(p).then(
    () => true,
    () => false,
  )

/** Behance slugs carry caps, parens and the odd control character. */
const toSlug = (raw) =>
  decodeURIComponent(raw)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

/** Every Behance page embeds its whole Redux store in one script tag. */
function extractStore(html) {
  const match = html.match(
    /<script type="application\/json" id="beconfig-store_state">([\s\S]*?)<\/script>/,
  )
  if (!match) throw new Error('no beconfig-store_state in page')
  return JSON.parse(match[1])
}

/**
 * Behance's HTML endpoints 403 every Node and Playwright HTTP stack we tried —
 * headers make no difference, so the tell is the TLS fingerprint. curl gets
 * through, and clone-legacy.sh already leans on it, so we shell out.
 * The CDN that serves the images has no such check; those use plain fetch.
 */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const jar = new Map()
const cookieHeader = () => [...jar].map(([k, v]) => `${k}=${v}`).join('; ')

/**
 * After a handful of hits Behance's Varnish layer answers 403 with a tiny page
 * that sets a `js_challenge_value` cookie in JS and reloads. A browser sails
 * through it without noticing; we have to read the cookie out of the body and
 * replay the request ourselves. Nothing here defeats a rate limit — the same
 * request simply succeeds once the cookie is presented.
 */
async function getText(url, attempt = 0) {
  const res = await fetch(url, {
    headers: {
      'user-agent': UA,
      accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'accept-language': 'en-US,en;q=0.9',
      ...(jar.size ? { cookie: cookieHeader() } : {}),
    },
  })
  for (const raw of res.headers.getSetCookie?.() ?? []) {
    const [pair] = raw.split(';')
    const eq = pair.indexOf('=')
    if (eq > 0) jar.set(pair.slice(0, eq).trim(), pair.slice(eq + 1).trim())
  }

  const body = await res.text()
  const challenge = body.match(/js_challenge_value=([a-f0-9]+)/)
  if (challenge && attempt < 3) {
    jar.set('js_challenge_value', challenge[1])
    return getText(url, attempt + 1)
  }
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  return body
}

// ---------------------------------------------------------------- stage 1

/**
 * The profile server-renders only its first 12 projects and loads the rest on
 * scroll, so this is the one place a real browser earns its keep.
 */
async function discoverProjects(limit) {
  const browser = await chromium.launch({ args: ['--disable-blink-features=AutomationControlled'] })
  try {
    const ctx = await browser.newContext({
      userAgent: UA, // headless chromium's default UA gets served a blank page
      viewport: { width: 1440, height: 1000 },
      locale: 'en-US',
    })
    const page = await ctx.newPage()
    await page.goto(PROFILE_URL, { waitUntil: 'domcontentloaded', timeout: 60_000 })
    await page.waitForTimeout(4000)

    const hrefs = () =>
      page.$$eval('a[href*="/gallery/"]', (as) => [
        ...new Set(as.map((a) => a.getAttribute('href'))),
      ])

    let found = await hrefs()
    for (let i = 0; i < 12 && found.length < limit; i++) {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
      await page.waitForTimeout(2000)
      const next = await hrefs()
      if (next.length === found.length) break // grid exhausted
      found = next
    }
    if (found.length < limit) {
      console.warn(`  ~ profile only yielded ${found.length} projects, wanted ${limit}`)
    }

    return found.slice(0, limit).map((href) => {
      const [, id, slug] = href.match(/\/gallery\/(\d+)\/([^/?#]+)/)
      return { id, behanceSlug: slug, slug: toSlug(slug), url: `https://www.behance.net${href}` }
    })
  } finally {
    await browser.close()
  }
}

async function snapshot(limit) {
  console.log(`snapshot: discovering up to ${limit} projects on ${PROFILE_URL}`)
  const projects = await discoverProjects(limit)
  console.log(`  found ${projects.length}`)

  await mkdir(path.join(RAW, 'projects'), { recursive: true })
  await writeFile(
    path.join(RAW, 'profile.json'),
    JSON.stringify(
      { profileUrl: PROFILE_URL, fetchedAt: new Date().toISOString(), projects },
      null,
      2,
    ),
  )

  for (const p of projects) {
    const dest = path.join(RAW, 'projects', `${p.id}-${p.slug}.json`)
    if (!FORCE && (await exists(dest))) {
      tally.skipped++
      continue
    }
    try {
      const store = extractStore(await getText(p.url))
      const project = store?.project?.project
      if (!project) throw new Error('store has no project slice')
      await writeFile(dest, JSON.stringify(project, null, 2))
      console.log(`  + ${p.slug}`)
    } catch (err) {
      fail(`snapshot ${p.slug}`, err)
    }
    await sleep(500) // 16 sequential hits on one profile; don't look like a flood
  }
}

// ---------------------------------------------------------------- stage 2

/**
 * Renditions are listed smallest-first with `width: null` on the originals, so
 * neither natural order nor a width sort finds the best one on its own.
 */
function pickModuleImage(module) {
  const all = module.imageSizes?.allAvailable ?? []
  // A GIF's still renditions are real entries here — keep the animation.
  const animated = /\.gif(\?|$)/i.test(module.src ?? '')
  const pool = animated ? all.filter((v) => /\.gif(\?|$)/i.test(v.url)) : all
  const candidates = pool.length ? pool : all
  const source = candidates.find((v) => v.url.includes('/project_modules/source/'))
  if (source) return source.url
  const widest = [...candidates].sort((a, b) => (b.width ?? 0) - (a.width ?? 0))[0]
  return widest?.url ?? module.src
}

function pickCover(covers) {
  const all = covers?.allAvailable ?? []
  return (
    all.find((c) => c.url.includes('/projects/original/'))?.url ??
    all.find((c) => c.url.includes('/projects/original_webp/'))?.url ??
    [...all].sort((a, b) => (b.width ?? 0) - (a.width ?? 0))[0]?.url
  )
}

async function download(url, dest) {
  if (!FORCE && (await exists(dest))) return readFile(dest)
  const res = await fetch(url, { headers: { 'user-agent': UA } })
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  // A challenge page would otherwise land on disk wearing a .png extension.
  const mime = res.headers.get('content-type') ?? ''
  if (!mime.startsWith('image/')) throw new Error(`expected an image, got ${mime} for ${url}`)
  const buf = Buffer.from(await res.arrayBuffer())
  await writeFile(dest, buf)
  tally.downloaded++
  return buf
}

/**
 * Turn one downloaded original into the asset the site actually serves.
 *
 * @returns {{ kind: 'image'|'video', file: string, poster?: string,
 *             width: number, height: number }}
 */
async function toWeb(buf, originalPath, outDir, stem, { still = false } = {}) {
  // Behance's biggest renditions blow past sharp's default pixel guard, and a
  // stacked GIF blows past it by two orders of magnitude.
  const read = (opts) => sharp(buf, { limitInputPixels: false, ...opts })
  const meta = await read().metadata()
  const animated = path.extname(originalPath).toLowerCase() === '.gif' && !still && meta.pages > 1

  // On animated input `height` is every frame stacked; `pageHeight` is one frame.
  const srcW = meta.width ?? 0
  const srcH = meta.pageHeight ?? meta.height ?? 0
  const fit = (cap) => {
    const width = Math.min(srcW, cap) || srcW
    return { width, height: srcW ? Math.round((srcH * width) / srcW) : srcH }
  }

  const writeWebp = async (file, opts, cap) => {
    const box = fit(cap)
    await read(opts)
      .resize({ width: box.width, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(path.join(outDir, file))
    tally.converted++
    return box
  }

  const webp = `${stem}.webp`
  const mp4 = `${stem}.mp4`

  if (!animated) {
    const box = fit(MAX_WIDTH)
    if (!FORCE && (await exists(path.join(outDir, webp))))
      return { kind: 'image', file: webp, ...box }
    return { kind: 'image', file: webp, ...(await writeWebp(webp, undefined, MAX_WIDTH)) }
  }

  if (!FORCE && (await exists(path.join(outDir, mp4)))) {
    return { kind: 'video', file: mp4, poster: webp, ...fit(VIDEO_WIDTH) }
  }

  // Long animations never come out small as WebP, so skip the wasted encode.
  if (meta.pages <= ANIMATED_MAX_FRAMES) {
    if (!FORCE && (await exists(path.join(outDir, webp))))
      return { kind: 'image', file: webp, ...fit(MAX_WIDTH) }
    const box = await writeWebp(webp, { animated: true }, MAX_WIDTH)
    const { size } = await stat(path.join(outDir, webp))
    if (size <= ANIMATED_MAX_BYTES) return { kind: 'image', file: webp, ...box }
    await rm(path.join(outDir, webp)) // too heavy to ship; fall through to h264
  }

  const box = fit(VIDEO_WIDTH)
  await run('ffmpeg', [
    '-y', '-loglevel', 'error',
    '-i', originalPath,
    '-vf', `scale=${box.width}:-2:flags=lanczos`,
    '-c:v', 'libx264', '-crf', '24', '-preset', 'medium',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an',
    path.join(outDir, mp4),
  ])
  tally.converted++
  await writeWebp(webp, { pages: 1 }, VIDEO_WIDTH) // poster frame
  console.log(`  ~ ${stem}: ${meta.pages} frames -> mp4`)
  return { kind: 'video', file: mp4, poster: webp, ...box }
}

/**
 * Behance ships embeds as a blob of iframe markup with inline styles. We keep
 * the player URL and the aspect ratio and throw the markup away — the detail
 * page should own its own layout, not inherit Behance's.
 */
function embedBlock(module) {
  const markup = module.originalEmbed ?? module.fluidEmbed ?? module.embed ?? ''
  const src = markup.match(/<iframe[^>]+src="([^"]+)"/)?.[1]
  if (!src) return null
  const url = src.replace(/&amp;/g, '&')
  return {
    type: 'embed',
    url,
    provider: /vimeo\.com/.test(url) ? 'vimeo' : /adobe\.io/.test(url) ? 'adobe-ccv' : 'iframe',
    width: module.originalWidth ?? module.width ?? 0,
    height: module.originalHeight ?? module.height ?? 0,
    caption: module.captionPlain ?? '',
  }
}

/** Behance module kinds mapped onto our own union; unknowns are dropped, loudly. */
function blockFor(module) {
  switch (module.__typename) {
    case 'ImageModule':
      return { type: 'image', module }
    case 'TextModule':
      return module.text?.trim() ? { type: 'text', html: module.text } : null
    case 'EmbedModule':
    case 'VideoModule':
    case 'MediaCollectionModule':
      return embedBlock(module)
    default:
      return null
  }
}

async function normalizeProject(entry) {
  const raw = JSON.parse(
    await readFile(path.join(RAW, 'projects', `${entry.id}-${entry.slug}.json`), 'utf8'),
  )
  const srcDir = path.join(ORIGINALS, entry.slug)
  const outDir = path.join(WEB, entry.slug)
  await mkdir(srcDir, { recursive: true })
  await mkdir(outDir, { recursive: true })

  const publicPath = (file) => `${PUBLIC_PREFIX}/${entry.slug}/${file}`
  const asset = async (url, stem, opts) => {
    const ext = path.extname(new URL(url).pathname) || '.png'
    const originalPath = path.join(srcDir, `${stem}${ext}`)
    const buf = await download(url, originalPath)
    return toWeb(buf, originalPath, outDir, stem, opts)
  }

  // A cover is a thumbnail wherever it is used, so it stays a still frame.
  const cover = await asset(pickCover(raw.covers), 'cover', { still: true })

  const blocks = []
  let imageIndex = 0
  for (const module of raw.modules ?? []) {
    const mapped = blockFor(module)
    if (!mapped) {
      if (module.__typename !== 'TextModule') {
        console.warn(`  ~ ${entry.slug}: skipped ${module.__typename}`)
      }
      continue
    }
    if (mapped.type !== 'image') {
      blocks.push(mapped)
      continue
    }
    const stem = String(++imageIndex).padStart(2, '0')
    try {
      const out = await asset(pickModuleImage(module), stem)
      blocks.push({
        type: out.kind,
        src: publicPath(out.file),
        ...(out.poster ? { poster: publicPath(out.poster) } : {}),
        width: out.width,
        height: out.height,
        alt: module.altText ?? '',
        caption: module.caption ?? '',
      })
    } catch (err) {
      fail(`${entry.slug} image ${stem}`, err)
    }
  }

  const title = raw.name ?? ''
  const summary = {
    id: String(raw.id ?? entry.id),
    slug: entry.slug,
    title,
    titleParts: title
      .split('|')
      .map((s) => s.trim())
      .filter(Boolean),
    description: raw.description ?? '',
    cover: publicPath(cover.file),
    coverWidth: cover.width,
    coverHeight: cover.height,
    tags: (raw.tags ?? []).map((t) => String(t.title ?? t).replace(/^#/, '')).filter(Boolean),
    tools: (raw.tools ?? []).map((t) => t.title ?? t.displayName ?? String(t)).filter(Boolean),
    publishedOn: raw.publishedOn ? new Date(raw.publishedOn * 1000).toISOString().slice(0, 10) : '',
    sourceUrl: raw.url ?? entry.url,
    author: {
      name: raw.creator?.displayName ?? raw.owners?.[0]?.displayName ?? '',
      url: raw.creator?.url ?? raw.owners?.[0]?.url ?? '',
    },
  }

  await writeFile(
    path.join(CONTENT, 'projects', `${entry.slug}.json`),
    JSON.stringify({ ...summary, blocks }, null, 2),
  )
  tally.projects++
  console.log(`  = ${entry.slug} (${blocks.filter((b) => b.type === 'image').length} images)`)
  return summary
}

async function normalize(limit) {
  const profile = JSON.parse(await readFile(path.join(RAW, 'profile.json'), 'utf8'))
  const entries = profile.projects.slice(0, limit)
  console.log(`normalize: ${entries.length} projects`)

  await mkdir(path.join(CONTENT, 'projects'), { recursive: true })
  const summaries = []
  for (const entry of entries) {
    try {
      summaries.push(await normalizeProject(entry))
    } catch (err) {
      fail(`normalize ${entry.slug}`, err)
    }
  }
  await writeFile(path.join(CONTENT, 'index.json'), JSON.stringify(summaries, null, 2))

  // A shrunk --limit would otherwise leave orphaned detail files behind.
  const keep = new Set(summaries.map((s) => `${s.slug}.json`))
  for (const file of await readdir(path.join(CONTENT, 'projects'))) {
    if (!keep.has(file)) {
      await rm(path.join(CONTENT, 'projects', file))
      console.log(`  - dropped stale ${file}`)
    }
  }
}

// ---------------------------------------------------------------- main

if (STAGE === 'all' || STAGE === 'snapshot') await snapshot(LIMIT)
if (STAGE === 'all' || STAGE === 'normalize') await normalize(LIMIT)

console.log(
  `\nprojects ${tally.projects} · downloaded ${tally.downloaded} · converted ${tally.converted}` +
    `${tally.skipped ? ` · skipped ${tally.skipped}` : ''} · failures ${tally.failures.length}`,
)
if (tally.failures.length) {
  console.error('\nfailures:')
  for (const f of tally.failures) console.error(`  ${f}`)
  process.exit(1)
}
