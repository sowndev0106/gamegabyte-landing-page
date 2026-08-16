// Guards the output of clone-behance.mjs. The clone talks to a site we do not
// control, so the risk is not a crash — it is a run that "succeeds" while
// quietly emitting a record whose image never landed on disk.

import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile, readdir, access } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const CONTENT = path.join(ROOT, 'src/content/work')
const PUBLIC = path.join(ROOT, 'public')

const readJson = async (p) => JSON.parse(await readFile(p, 'utf8'))
const onDisk = (webPath) =>
  access(path.join(PUBLIC, webPath)).then(
    () => true,
    () => false,
  )

const index = await readJson(path.join(CONTENT, 'index.json'))
const details = await Promise.all(
  (await readdir(path.join(CONTENT, 'projects')))
    .filter((f) => f.endsWith('.json'))
    .map((f) => readJson(path.join(CONTENT, 'projects', f))),
)

test('index and detail files describe the same set of projects', () => {
  assert.ok(index.length > 0, 'index.json is empty')
  assert.deepEqual(
    details.map((d) => d.slug).sort(),
    index.map((s) => s.slug).sort(),
    'a detail file exists with no index entry, or the reverse',
  )
  assert.equal(new Set(index.map((s) => s.slug)).size, index.length, 'duplicate slug')
})

test('every summary carries the fields a listing needs', () => {
  for (const item of index) {
    for (const field of ['id', 'slug', 'title', 'cover', 'sourceUrl']) {
      assert.ok(item[field], `${item.slug || item.id}: missing ${field}`)
    }
    assert.match(item.slug, /^[a-z0-9]+(-[a-z0-9]+)*$/, `${item.slug}: not a url-safe slug`)
    assert.ok(item.coverWidth > 0 && item.coverHeight > 0, `${item.slug}: cover has no dimensions`)
    assert.ok(Array.isArray(item.titleParts) && item.titleParts.length > 0, `${item.slug}: titleParts`)
  }
})

test('every block is a shape the detail page knows how to render', () => {
  const kinds = new Set(['image', 'video', 'embed', 'text'])
  for (const detail of details) {
    assert.ok(detail.blocks.length > 0, `${detail.slug}: no blocks`)
    for (const [i, block] of detail.blocks.entries()) {
      assert.ok(kinds.has(block.type), `${detail.slug} block ${i}: unknown type ${block.type}`)
      if (block.type === 'image' || block.type === 'video') {
        assert.ok(block.width > 0 && block.height > 0, `${detail.slug} block ${i}: no dimensions`)
      }
      if (block.type === 'embed') assert.match(block.url, /^https:\/\//)
    }
  }
})

test('every referenced asset exists under public/', async () => {
  const referenced = new Set()
  for (const item of index) referenced.add(item.cover)
  for (const detail of details) {
    referenced.add(detail.cover)
    for (const block of detail.blocks) {
      if (block.type === 'image' || block.type === 'video') referenced.add(block.src)
      if (block.type === 'video') referenced.add(block.poster)
    }
  }

  const missing = []
  for (const asset of referenced) {
    assert.ok(asset.startsWith('/assets/img/work/'), `unexpected asset root: ${asset}`)
    if (!(await onDisk(asset))) missing.push(asset)
  }
  assert.deepEqual(missing, [], 'content points at assets that were never written')
})

test('no GIF survives into the shipped assets', () => {
  // GIF is always the wrong answer on the web; the clone converts or transcodes.
  for (const detail of details) {
    for (const block of detail.blocks) {
      if (block.type === 'image') assert.doesNotMatch(block.src, /\.gif$/i, detail.slug)
    }
  }
})
