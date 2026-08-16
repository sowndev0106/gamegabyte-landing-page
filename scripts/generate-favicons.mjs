/**
 * Builds the favicon set from the master brand mark.
 *
 *   node scripts/generate-favicons.mjs
 *
 * The master export has transparent padding on the top-left only — the mark
 * bleeds off the right and bottom edges of its canvas. Scaling it straight down
 * leaves the glyph visibly shoved into the bottom-right corner, which is
 * obvious at 16px. So every output is re-composed from the alpha bounding box
 * rather than from the raw canvas.
 */
import { Buffer } from 'node:buffer'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const MASTER = path.join(root, 'design/brand/gamegabyte-mark.png')

/** --color-ink. iOS and Android composite icons onto an opaque tile anyway, so
 *  we pick the colour instead of letting them default to black or white. */
const INK = '#05050c'

/**
 * Trim to the mark's alpha bounds, then centre it on a square tile.
 *
 * @param margin fraction of the tile left empty on the tightest axis.
 * @param background `null` keeps transparency.
 */
async function tile(size, { margin, background = null }) {
  const trimmed = await sharp(MASTER).trim({ threshold: 1 }).toBuffer()
  const inner = Math.round(size * (1 - margin * 2))

  const mark = await sharp(trimmed)
    .resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer()

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: background ?? { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: mark, gravity: 'centre' }])
    .png({ compressionLevel: 9 })
    .toBuffer()
}

/**
 * Pack PNG buffers into an ICO container. Every target that still reads .ico
 * (Windows taskbar, older Edge/IE, some feed readers) accepts PNG-compressed
 * entries, so there is no need to emit BMP payloads.
 */
function ico(images) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0) // reserved
  header.writeUInt16LE(1, 2) // 1 = icon
  header.writeUInt16LE(images.length, 4)

  let offset = 6 + images.length * 16
  const entries = images.map(({ size, data }) => {
    const entry = Buffer.alloc(16)
    entry.writeUInt8(size >= 256 ? 0 : size, 0) // 0 encodes 256
    entry.writeUInt8(size >= 256 ? 0 : size, 1)
    entry.writeUInt8(0, 2) // palette colours
    entry.writeUInt8(0, 3) // reserved
    entry.writeUInt16LE(1, 4) // colour planes
    entry.writeUInt16LE(32, 6) // bits per pixel
    entry.writeUInt32LE(data.length, 8)
    entry.writeUInt32LE(offset, 12)
    offset += data.length
    return entry
  })

  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)])
}

async function emit(relPath, data) {
  const dest = path.join(root, relPath)
  await mkdir(path.dirname(dest), { recursive: true })
  await writeFile(dest, data)
  console.log(`  ${relPath}  ${(data.length / 1024).toFixed(1)} kB`)
}

console.log('Generating favicons from design/brand/gamegabyte-mark.png')

// Browser tab. Tight margin so the glyph stays readable at 16px.
const icoSizes = [16, 32, 48]
const icoImages = await Promise.all(
  icoSizes.map(async (size) => ({ size, data: await tile(size, { margin: 0.04 }) })),
)
await emit('public/favicon.ico', ico(icoImages))

// Higher-DPI tab icon; browsers prefer this over the .ico when linked.
await emit('public/assets/img/brand/favicon-96x96.png', await tile(96, { margin: 0.04 }))
await emit('public/assets/img/brand/favicon.png', await tile(256, { margin: 0.04 }))

// iOS home screen. Transparency is flattened to black by iOS, hence the ink
// tile, and iOS rounds the corners, hence the wider margin.
await emit('public/apple-touch-icon.png', await tile(180, { margin: 0.14, background: INK }))

// PWA / Android.
await emit('public/assets/img/brand/icon-192.png', await tile(192, { margin: 0.1, background: INK }))
await emit('public/assets/img/brand/icon-512.png', await tile(512, { margin: 0.1, background: INK }))
// Maskable icons get cropped to an arbitrary shape, so the glyph has to sit
// inside the centre 80% safe zone.
await emit(
  'public/assets/img/brand/icon-maskable-512.png',
  await tile(512, { margin: 0.2, background: INK }),
)

await emit(
  'public/site.webmanifest',
  `${JSON.stringify(
    {
      name: 'Gamegabyte',
      short_name: 'Gamegabyte',
      icons: [
        { src: '/assets/img/brand/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
        { src: '/assets/img/brand/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
        {
          src: '/assets/img/brand/icon-maskable-512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
      theme_color: INK,
      background_color: INK,
      display: 'standalone',
    },
    null,
    2,
  )}\n`,
)
