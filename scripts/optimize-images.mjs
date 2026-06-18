import sharp from 'sharp'
import { readdir, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const SRC = '_assets-src'
const OUT = 'public/assets/img'

function roleFor(w, h) {
  const ar = w / h
  if (w <= 200 && h <= 200) return 'icon'
  if (ar > 1.6 && w >= 1200) return 'background'
  if (ar > 1.2) return 'wordmark-or-card'
  if (ar < 0.9) return 'poster'
  return 'square'
}

const files = (await readdir(SRC)).filter((f) => f.endsWith('.png'))
await mkdir(OUT, { recursive: true })
const manifest = []
for (const f of files) {
  const hash = path.basename(f, '.png')
  const img = sharp(path.join(SRC, f))
  const { width, height } = await img.metadata()
  // Cap very large source art to 2048px wide; keep aspect ratio.
  const pipeline = width > 2048 ? img.resize({ width: 2048 }) : img
  await pipeline.webp({ quality: 80 }).toFile(path.join(OUT, `${hash}.webp`))
  manifest.push({ hash, width, height, role: roleFor(width, height), file: `/assets/img/${hash}.webp` })
}
manifest.sort((a, b) => b.width * b.height - a.width * a.height)
await writeFile(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2))
console.log(`optimized ${manifest.length} images -> ${OUT}`)
