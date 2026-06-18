import { chromium } from 'playwright'

const targets = [
  { path: 'docs/legacy-site/screenshots/final-local-desktop-full.png', width: 1440, height: 1200 },
  { path: 'docs/legacy-site/screenshots/final-local-mobile-full.png', width: 390, height: 844 },
]

for (const target of targets) {
  console.log(`Starting capture for: ${target.path} (${target.width}x${target.height})`)
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: target.width, height: target.height } })
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  
  const bodyHeight = await page.evaluate(() => document.body.scrollHeight)
  console.log(`Body scroll height: ${bodyHeight}`)
  
  for (let y = 0; y <= bodyHeight; y += Math.floor(target.height * 0.75)) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y)
    await page.waitForTimeout(180)
  }
  
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(500)
  await page.screenshot({ path: target.path, fullPage: true })
  await browser.close()
  console.log(`Finished capture: ${target.path}`)
}
