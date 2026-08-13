import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8')

test('services and technology render as one Services + Stack section', async () => {
  const source = await read('src/sections/Services.tsx')

  assert.equal((source.match(/<Section(?:\s|>)/g) ?? []).length, 1)
  assert.match(source, /index="03"/)
  assert.match(source, /title="Services \+ Stack"/)
  assert.match(source, /content\.services\.map/)
  assert.match(source, /content\.technology\.map/)
  assert.match(source, /serviceSymbols/)
  assert.match(source, /PointerGlow/)
})

test('services preserves the visible technical-grid background from prototype A', async () => {
  const source = await read('src/sections/Services.tsx')
  const styles = await read('src/index.css')

  assert.match(source, /className="services-grid-background"/)
  assert.match(source, /className="services-card-grid grid/)
  assert.doesNotMatch(source, /services-card-grid[^"\n]*bg-white\/10/)
  assert.match(source, /className="bg-white\/\[0\.014\]"/)
  assert.match(styles, /\.services-grid-background > \.hud-grid/)
  assert.match(styles, /\.services-card-grid > \*/)
  assert.match(styles, /background-size:\s*56px 56px/)
  assert.match(styles, /opacity:\s*1/)
})

test('merged services and work process occupy section numbers 03 and 04', async () => {
  assert.match(await read('src/sections/Services.tsx'), /index="03"/)
  assert.match(await read('src/sections/WorkProcess.tsx'), /index="04"/)
})

test('work process uses the responsive animated signal timeline from variant A', async () => {
  const source = await read('src/sections/WorkProcess.tsx')

  assert.match(source, /eyebrow="Transmission path"/)
  assert.match(source, /title="From signal to launch"/)
  assert.match(source, /motion\.div/)
  assert.match(source, /scaleX/)
  assert.match(source, /scaleY/)
  assert.match(source, /useReducedMotion/)
  assert.match(source, /process-signal-node/)
})

test('contact keeps its form and adds only the open-channel status card', async () => {
  const source = await read('src/sections/Contact.tsx')

  assert.match(source, /<form/)
  assert.match(source, /content\.contact\.fields\.name/)
  assert.match(source, /content\.contact\.fields\.email/)
  assert.match(source, /content\.contact\.fields\.message/)
  assert.match(source, /System status \/ online/)
  assert.match(source, /Replies in 2 working days/)
  assert.match(source, /lg:grid-cols-\[minmax\(0,2fr\)_minmax\(280px,1fr\)\]/)
})

test('stats uses the approved Signal Command Board hierarchy', async () => {
  const source = await read('src/sections/Stats.tsx')

  assert.match(source, /CountUp/)
  assert.match(source, /content\.stats\[0\]/)
  assert.match(source, /content\.stats\.slice\(1\)\.map/)
  assert.match(source, /stats-command-board/)
  assert.match(source, /stats-command-primary/)
  assert.match(source, /stats-command-secondary/)
  assert.match(source, /stats-signal-trace/)
})
