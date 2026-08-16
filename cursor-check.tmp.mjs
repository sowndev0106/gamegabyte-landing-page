import { chromium } from 'playwright'
const OUT = '/tmp/claude-1000/-home-sown-workplace-projects-gamegabyte-gamegabyte-web/232bc33d-d03f-4370-a364-59e35d30e63b/scratchpad'
const b = await chromium.launch()

// A. normal motion preference
const p = await b.newPage({ viewport: { width: 1440, height: 900 } })
await p.goto('http://127.0.0.1:5212/', { waitUntil: 'networkidle' })
await p.locator('#portfolio').scrollIntoViewIfNeeded()
await p.waitForTimeout(600)
const cur = p.locator('.command-cursor')
console.log('exists:', await cur.count(), '| css:', await cur.evaluate(el => {
  const s = getComputedStyle(el)
  return `${s.animationName} ${s.animationDuration} ${s.animationTimingFunction} ${s.animationIterationCount} / playState=${s.animationPlayState}`
}))
// capture one lit frame and one dark frame
let shot = { on: false, off: false }
for (let i = 0; i < 40 && !(shot.on && shot.off); i++) {
  const o = Number(await cur.evaluate(el => getComputedStyle(el).opacity))
  if (o > 0.5 && !shot.on)  { await p.locator('header').first().screenshot({ path: `${OUT}/cursor-ON.png` });  shot.on = true }
  if (o < 0.5 && !shot.off) { await p.locator('header').first().screenshot({ path: `${OUT}/cursor-OFF.png` }); shot.off = true }
  await p.waitForTimeout(90)
}
console.log('captured lit frame:', shot.on, '| captured dark frame:', shot.off)

// B. the one thing that legitimately stops it
const r = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
await r.goto('http://127.0.0.1:5212/', { waitUntil: 'networkidle' })
await r.waitForTimeout(600)
const rc = r.locator('.command-cursor')
console.log('with prefers-reduced-motion:reduce → duration:',
  await rc.evaluate(el => getComputedStyle(el).animationDuration),
  '| resting opacity:', await rc.evaluate(el => getComputedStyle(el).opacity))
await b.close()
