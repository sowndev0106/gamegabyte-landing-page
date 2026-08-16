#!/usr/bin/env node
// Inlines the brand webfonts into the contact-variants prototype so the page is
// a single self-contained file. Artifact hosting blocks external font requests,
// so a linked URL would fall back silently instead of failing loudly.
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dir = resolve(root, 'prototypes/contact-section-variants')

const fonts = {
  __FONT_DISPLAY__: 'public/fonts/SchibstedGrotesk_wght__1/SchibstedGrotesk_wght__1-english.woff2',
  __FONT_BODY__: 'public/fonts/Roboto_wdth_wght__2/Roboto_wdth_wght__2-english.woff2',
}

let html = await readFile(resolve(dir, 'index.src.html'), 'utf8')

for (const [token, path] of Object.entries(fonts)) {
  const base64 = (await readFile(resolve(root, path))).toString('base64')
  if (!html.includes(token)) throw new Error(`Source is missing the ${token} placeholder`)
  html = html.replaceAll(token, `data:font/woff2;base64,${base64}`)
}

const out = resolve(dir, 'index.html')
await writeFile(out, html)
console.log(`Wrote ${out} (${(html.length / 1024).toFixed(0)} KB)`)
