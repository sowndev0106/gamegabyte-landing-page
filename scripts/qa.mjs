/**
 * Command OS page QA.
 *
 * Boots Vite through its JS API so there is no port to coordinate, drives the
 * page at both target viewports, and fails the process on any broken check.
 * Section tasks add their own checks here as they land.
 *
 * Run with `npm run qa`. Screenshots land in `.qa/` (gitignored).
 */
import { createServer } from 'vite'
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { SECTIONS } from '../src/content/sections.ts'

const OUT = '.qa'
const VIEWPORTS = [
  { label: 'desktop', width: 1440, height: 1000 },
  { label: 'mobile', width: 390, height: 844 },
]

const results = []
const check = (name, pass, detail = '') => results.push({ name, pass, detail })

const server = await createServer({ server: { port: 0 }, logLevel: 'error' })
await server.listen()
const url = server.resolvedUrls.local[0]
mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch()

for (const viewport of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
  })
  const page = await context.newPage()
  const errors = []
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  page.on('pageerror', (e) => errors.push(String(e)))

  await page.goto(url, { waitUntil: 'load' })
  await page.waitForTimeout(1200)

  const metrics = await page.evaluate(() => ({
    sections: document.querySelectorAll('main > section').length,
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
  }))

  check(`${viewport.label}: twelve sections`, metrics.sections === 12, String(metrics.sections))
  check(
    `${viewport.label}: no horizontal overflow`,
    metrics.scrollWidth === metrics.innerWidth,
    `${metrics.scrollWidth} vs ${metrics.innerWidth}`,
  )

  // Content wider than the viewport but hidden by `overflow: hidden` scrolls
  // nothing, so it passes the check above while being visibly cut off. That is
  // the failure that broke the prototype's hero, so it gets its own check.
  //
  // Two things legitimately sit outside the viewport and must not fail it:
  // decoration marked `aria-hidden` (glows, grids, bleed art), and content in a
  // horizontally scrollable ancestor, which the reader can still reach.
  const clipped = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth
    const reachableByScroll = (el) => {
      for (let node = el.parentElement; node && node !== document.body; node = node.parentElement) {
        if (node.scrollWidth > node.clientWidth + 1) return true
      }
      return false
    }
    return [...document.querySelectorAll('main *')]
      .filter((el) => {
        if (el.closest('[aria-hidden="true"]')) return false
        if (reachableByScroll(el)) return false
        const r = el.getBoundingClientRect()
        return r.width > 0 && r.height > 0 && (r.right > vw + 1 || r.left < -1)
      })
      .slice(0, 10)
      .map((el) => {
        const section = el.closest('section')
        return `${section ? `#${section.id} ` : ''}${el.tagName.toLowerCase()}.${String(el.className).slice(0, 40)}`
      })
  })
  check(`${viewport.label}: nothing clipped outside the viewport`, clipped.length === 0, clipped.join(' | '))

  // The hero headline is the page's largest type in the narrowest column, so it
  // is the first thing to blow its grid track. Checked explicitly because the
  // clipping sweep above cannot see inside `overflow: hidden`.
  const heroFits = await page.evaluate(() => {
    const title = document.querySelector('#home h1')
    if (!title) return false
    const vw = document.documentElement.clientWidth
    const r = title.getBoundingClientRect()
    return r.left >= -1 && r.right <= vw + 1
  })
  check(`${viewport.label}: hero headline fits the viewport`, heroFits)

  // The reel's controls are restyled, not reimplemented — this guards the
  // wiring surviving the restyle.
  {
    const muteBtn = page.locator('#reel button[aria-label*="ute showreel"]').first()
    await page.locator('#reel').scrollIntoViewIfNeeded()
    await page.waitForTimeout(300)
    const before = await page.evaluate(() => document.querySelector('#reel video')?.muted)
    await muteBtn.click()
    await page.waitForTimeout(200)
    const after = await page.evaluate(() => document.querySelector('#reel video')?.muted)
    check(`${viewport.label}: reel mute toggles`, before !== after, `${before} -> ${after}`)
    await muteBtn.click()
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(300)
  }

  for (const section of SECTIONS) {
    const el = page.locator(`#${section.id}`)
    const count = await el.count()
    check(`${viewport.label}: #${section.id} exists`, count === 1, String(count))
    if (count === 1) {
      await el.scrollIntoViewIfNeeded()
      await page.waitForTimeout(250)
      await el.screenshot({ path: `${OUT}/${viewport.label}-${section.index}-${section.id}.png` })
    }
  }

  check(`${viewport.label}: no console errors`, errors.length === 0, errors.join(' | '))
  await context.close()
}

// Mobile navigation contract: the sheet's attributes are what the shell promises.
{
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } })
  const page = await context.newPage()
  await page.goto(url, { waitUntil: 'load' })
  await page.waitForTimeout(600)

  const menu = page.locator('button[aria-controls="mobile-menu"]')
  check('mobile: menu starts closed', (await menu.getAttribute('aria-expanded')) === 'false')
  await menu.click()
  await page.waitForTimeout(200)
  check(
    'mobile: menu opens',
    (await menu.getAttribute('aria-expanded')) === 'true' && (await page.locator('#mobile-menu').isVisible()),
  )
  await page.locator('#mobile-menu a').first().click()
  await page.waitForTimeout(400)
  check('mobile: menu closes after selection', (await menu.getAttribute('aria-expanded')) === 'false')
  await menu.click()
  await page.waitForTimeout(150)
  await page.keyboard.press('Escape')
  await page.waitForTimeout(200)
  check('mobile: Escape dismisses menu', (await menu.getAttribute('aria-expanded')) === 'false')
  await context.close()
}

// Nothing decorative may still be running once the page settles.
{
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: 'reduce',
  })
  const page = await context.newPage()
  await page.goto(url, { waitUntil: 'load' })
  await page.waitForTimeout(1500)
  const running = await page.evaluate(
    () => document.getAnimations().filter((a) => a.playState === 'running').length,
  )
  check('reduced motion: no running animation', running === 0, String(running))
  await context.close()
}

await browser.close()
await server.close()

let failed = 0
for (const r of results) {
  if (!r.pass) failed++
  console.log(`${r.pass ? 'PASS' : 'FAIL'}  ${r.name}${r.detail ? `  [${r.detail}]` : ''}`)
}
console.log(`\n${results.length - failed}/${results.length} checks passed`)
process.exit(failed ? 1 : 0)
