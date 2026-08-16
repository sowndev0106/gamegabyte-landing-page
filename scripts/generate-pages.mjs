#!/usr/bin/env node
// Generates one real HTML entry per work page.
//
// The site is a Vite multi-page build rather than a client-side router, so
// every project needs a file on disk before `vite build` can see it. That is
// the cost; the payoff is that each project gets its own <title>, description
// and Open Graph card baked into static HTML — which a single-page app cannot
// have, because a crawler or a chat unfurl reads the HTML it is served, not
// the DOM React builds afterwards.
//
// These files are derived from src/content/work/index.json and are gitignored.
// `npm run dev` and `npm run build` both regenerate them first.

import { mkdir, writeFile, readFile, rm } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(ROOT, 'work')

// Absolute origin for og:image and canonical — relative URLs are ignored by
// most unfurlers, so a relative og:image is the same as having none.
const SITE = process.env.SITE_ORIGIN ?? 'https://gamegabyte.com'

const escape = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

/** Open Graph descriptions get truncated around 200 chars; do it on a word. */
function clamp(text, max = 180) {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max)
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`
}

function page({ title, description, canonical, image, entry }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escape(title)}</title>
    <meta name="description" content="${escape(description)}" />
    <link rel="canonical" href="${escape(canonical)}" />
    <meta property="og:title" content="${escape(title)}" />
    <meta property="og:description" content="${escape(description)}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${escape(canonical)}" />
${image ? `    <meta property="og:image" content="${escape(image)}" />\n    <meta name="twitter:card" content="summary_large_image" />\n` : ''}    <link rel="icon" href="/assets/img/brand/favicon.png" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="${entry}"></script>
  </body>
</html>
`
}

const index = JSON.parse(await readFile(path.join(ROOT, 'src/content/work/index.json'), 'utf8'))

// Rebuilt from scratch each run, so a project removed from the clone does not
// leave a stale page behind that still builds and still ranks.
await rm(OUT, { recursive: true, force: true })
await mkdir(OUT, { recursive: true })

await writeFile(
  path.join(OUT, 'index.html'),
  page({
    title: 'Work — Gamegabyte Studio',
    description: `Game websites, campaign pages and interface systems shipped for game teams. ${index.length} selected projects.`,
    canonical: `${SITE}/work/`,
    image: index[0] ? `${SITE}${index[0].cover}` : '',
    entry: '/src/entries/work-index.tsx',
  }),
)

for (const item of index) {
  const dir = path.join(OUT, item.slug)
  await mkdir(dir, { recursive: true })
  const label = [item.client, 'Gamegabyte Studio'].filter(Boolean).join(' — ')
  await writeFile(
    path.join(dir, 'index.html'),
    page({
      title: `${item.title} — ${label}`,
      description: clamp(item.description),
      canonical: `${SITE}/work/${item.slug}/`,
      image: `${SITE}${item.cover}`,
      entry: '/src/entries/work-detail.tsx',
    }),
  )
}

console.log(`generated ${index.length + 1} pages -> work/`)
