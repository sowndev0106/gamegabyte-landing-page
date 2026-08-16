import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import sharp from 'sharp'

export const SECTION_EXPORTS = [
  {
    name: '01-hero-showreel-stats.png',
    selectors: ['[data-export="header"]', '#home', '#reel', '[data-export="stats"]'],
  },
  { name: '02-services.png', selectors: ['#services'] },
  { name: '04-growth-partner-selected-projects.png', selectors: ['#about', '#portfolio'] },
  { name: '05-academy.png', selectors: ['#academy'] },
  { name: '06-faq.png', selectors: ['#faq'] },
  { name: '07-contact.png', selectors: ['#contact'] },
  { name: '08-footer.png', selectors: ['[data-export="footer"]'] },
]

export function getOutputPath(outputDir, name) {
  return path.posix.join(outputDir, name)
}

function parseArgs(argv) {
  const args = {
    url: 'http://127.0.0.1:4173',
    out: 'design/d1cfc480-redrawn-sections',
    width: 1440,
    height: 1600,
    dpr: 2,
  }

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]
    const next = argv[index + 1]

    if (arg === '--url' && next) {
      args.url = next
      index += 1
    } else if (arg === '--out' && next) {
      args.out = next
      index += 1
    } else if (arg === '--width' && next) {
      args.width = Number(next)
      index += 1
    } else if (arg === '--height' && next) {
      args.height = Number(next)
      index += 1
    } else if (arg === '--dpr' && next) {
      args.dpr = Number(next)
      index += 1
    }
  }

  return args
}

async function waitForAssets(page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < height; y += 900) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y)
    await page.waitForTimeout(60)
  }
  await page.evaluate(() => window.scrollTo(0, 0))

  await page.evaluate(async () => {
    await document.fonts.ready

    const images = Array.from(document.images)
    const imageSettled = Promise.all(
      images.map((image) => {
        if (image.complete && image.naturalWidth > 0) return undefined
        return new Promise((resolve) => {
          image.addEventListener('load', resolve, { once: true })
          image.addEventListener('error', resolve, { once: true })
        })
      }),
    )

    await Promise.race([
      imageSettled,
      new Promise((resolve) => window.setTimeout(resolve, 5000)),
    ])
  })
}

async function getClipForSelectors(page, selectors) {
  const clip = await page.evaluate((sectionSelectors) => {
    const rects = sectionSelectors.map((selector) => {
      const element = document.querySelector(selector)
      if (!element) {
        throw new Error(`Missing selector: ${selector}`)
      }

      const rect = element.getBoundingClientRect()
      return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
        right: rect.right + window.scrollX,
        bottom: rect.bottom + window.scrollY,
      }
    })

    const left = Math.min(...rects.map((rect) => rect.left))
    const top = Math.min(...rects.map((rect) => rect.top))
    const right = Math.max(...rects.map((rect) => rect.right))
    const bottom = Math.max(...rects.map((rect) => rect.bottom))

    return {
      x: Math.max(0, Math.floor(left)),
      y: Math.max(0, Math.floor(top)),
      width: Math.ceil(right - left),
      height: Math.ceil(bottom - top),
    }
  }, selectors)

  if (clip.width <= 0 || clip.height <= 0) {
    throw new Error(`Invalid clip for selectors: ${selectors.join(', ')}`)
  }

  return clip
}

export async function exportSections(options = {}) {
  const args = { ...parseArgs([]), ...options }
  await fs.mkdir(args.out, { recursive: true })

  const browser = await chromium.launch()
  try {
    const page = await browser.newPage({
      viewport: { width: args.width, height: args.height },
      deviceScaleFactor: args.dpr,
    })

    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto(args.url, { waitUntil: 'domcontentloaded' })
    await waitForAssets(page)

    const fullPagePath = path.join(args.out, '.full-page.png')
    await page.screenshot({ path: fullPagePath, fullPage: true, scale: 'device' })

    for (const section of SECTION_EXPORTS) {
      const clip = await getClipForSelectors(page, section.selectors)
      const outputPath = getOutputPath(args.out, section.name)
      await sharp(fullPagePath)
        .extract({
          left: Math.round(clip.x * args.dpr),
          top: Math.round(clip.y * args.dpr),
          width: Math.round(clip.width * args.dpr),
          height: Math.round(clip.height * args.dpr),
        })
        .png()
        .toFile(outputPath)
      console.log(`${section.name} ${clip.width}x${clip.height}`)
    }

    await fs.rm(fullPagePath, { force: true })
  } finally {
    await browser.close()
  }
}

const isCli = process.argv[1] === fileURLToPath(import.meta.url)

if (isCli) {
  exportSections(parseArgs(process.argv.slice(2))).catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
}
