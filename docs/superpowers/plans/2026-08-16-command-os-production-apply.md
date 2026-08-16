# Command OS Production Apply Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the production Gamegabyte page in the approved Command OS design language — a persistent command shell wrapping twelve numbered sections, each with its own structural idiom.

**Architecture:** A section registry (`src/content/sections.ts`) is the single source of truth for section order, ids and numbering; the shell (`src/components/shell/`) replaces the deleted `Header`; a small primitive kit (`Panel`, `Readout`, `Eyebrow`, plus rewritten `Section`/`Container`/`SectionHeader`) carries the shared surface language so twelve utility-styled sections do not drift; each section is then rewritten on top of that kit, one commit at a time, verified by a committed Playwright QA harness.

**Tech Stack:** React 19, Tailwind CSS v4 (`@theme` tokens, utilities only), `motion` v12, Vite 8, Playwright 1.61.

**Spec:** `docs/superpowers/specs/2026-08-16-command-os-production-apply-design.md`

**Visual reference:** the approved prototype, readable at
`/home/sown/workplace/projects/gamegabyte/gamegabyte-web/.worktrees/command-os-full-page/prototypes/command-os-full-page/index.html`
or via `git show prototype/command-os-full-page:prototypes/command-os-full-page/index.html`.
Every section task must open the matching prototype markup before writing JSX. The prototype is the authority on visual detail; this plan is the authority on structure, data and accessibility.

## Global Constraints

- Tailwind utilities only. `index.css` may hold `@theme` tokens, `@font-face`, `@keyframes` and global rules — nothing else.
- All copy flows through `src/content/content.ts`. No user-visible strings hard-coded in JSX.
- No fabricated metrics ship. Every number displayed must come from `content.ts` and be true.
- No new asset files. Everything needed already exists under `public/`.
- Breakpoints are `--breakpoint-md: 760px` and `--breakpoint-lg: 1050px`.
- Prefer canonical spacing utilities over arbitrary values where the scale covers the value — `h-17.5` not `h-[70px]`, `px-4.5` not `px-[18px]`, `z-49` not `z-[49]`. The repo's Tailwind linter warns on the arbitrary form. Some class strings in this plan use the arbitrary form for readability; convert them as you write them.
- Support 1440×1000 desktop and 390×844 mobile with no horizontal document overflow.
- Continuous decorative motion stops under `prefers-reduced-motion: reduce`.
- Production React files outside `src/` and every existing prototype stay untouched.
- Scroll-triggered motion uses the existing `Reveal` / `Stagger` / `CountUp` components (the `motion` library). Do not port the prototype's hand-rolled IntersectionObserver reveal — the production components already handle `prefers-reduced-motion`.
- Each task ends green on `npm run build` and `npm run lint`; from Task 3 onward, also `npm run qa`.
- **Tasks 5–16 every one follow Steps A–G** defined in the *Tasks 5–16: The twelve sections* preamble. Read that preamble before starting any section task, including when picking a single task up out of order.

**Plan deviation from the spec, deliberate:** the spec listed the QA harness as the final commit. It is Task 3 here instead, so that every section task has a real red-to-green test cycle rather than being eyeballed. Nothing else about the spec's sequence changes.

---

### Task 1: Design tokens, breakpoints and the section registry

**Files:**
- Create: `src/content/sections.ts`
- Modify: `src/index.css:3-18` (the `@theme` block)
- Modify: `src/content/content.ts:28-34` (remove `nav`)
- Delete: `src/components/ui/SectionHeading.tsx`

**Interfaces:**
- Produces: `SECTIONS`, a readonly array of `{ id, index, label, eyebrow }`; the type `SectionId`; and the helper `sectionById(id: SectionId)`. Tasks 2–17 all consume these.

- [ ] **Step 1: Create the section registry**

```ts
// src/content/sections.ts

/**
 * The page's twelve sections in document order. Section numbering shows up in
 * the rail, the mobile menu and every section heading — this array is the only
 * place it is written down, so reordering the page is a one-line edit.
 */
export const SECTIONS = [
  { id: 'home', index: '01', label: 'Command', eyebrow: 'Game growth systems' },
  { id: 'reel', index: '02', label: 'Transmission', eyebrow: 'Visual transmission' },
  { id: 'telemetry', index: '03', label: 'Telemetry', eyebrow: 'Studio telemetry' },
  { id: 'services', index: '04', label: 'Services', eyebrow: 'Systems matrix' },
  { id: 'process', index: '05', label: 'Process', eyebrow: 'Mission sequence' },
  { id: 'about', index: '06', label: 'Advantages', eyebrow: 'Operational advantages' },
  { id: 'portfolio', index: '07', label: 'Archive', eyebrow: 'Archive / 03 files' },
  { id: 'case-study', index: '08', label: 'Dossier', eyebrow: 'Mission dossier / Seedify' },
  { id: 'testimonials', index: '09', label: 'Logs', eyebrow: 'Communication logs' },
  { id: 'academy', index: '10', label: 'Academy', eyebrow: 'Training subsystem / external node' },
  { id: 'faq', index: '11', label: 'Diagnostics', eyebrow: 'System diagnostics' },
  { id: 'contact', index: '12', label: 'Channel', eyebrow: 'Open channel' },
] as const

export type SectionId = (typeof SECTIONS)[number]['id']
export type SectionMeta = (typeof SECTIONS)[number]

export function sectionById(id: SectionId): SectionMeta {
  const found = SECTIONS.find((section) => section.id === id)
  if (!found) throw new Error(`Unknown section id: ${id}`)
  return found
}
```

- [ ] **Step 2: Verify the registry compiles and is exhaustive**

Run: `npx tsc --noEmit -p tsconfig.app.json`
Expected: exit 0.

Then confirm twelve entries with unique ids:

```bash
node --input-type=module -e "
const src = await import('./src/content/sections.ts').catch(() => null)
" 2>/dev/null || grep -c "id: '" src/content/sections.ts
```
Expected: `12`.

- [ ] **Step 3: Update the theme tokens**

In `src/index.css`, inside the existing `@theme` block, change the ink token and add the two breakpoints:

```css
@theme {
  --color-brand: #601feb;
  --color-accent: #b6e802;
  --color-accent-bright: #d4ff00;
  --color-purple-light: #8c4fff;
  --color-ink: #05050c;
  --color-ink-raised: #17171f;
  --color-surface: #f1f2f9;
  --color-chip: #e8e8fd;
  --color-chip-ink: #5d5c81;

  --breakpoint-md: 760px;
  --breakpoint-lg: 1050px;

  --font-display: "Schibsted Grotesk", system-ui, sans-serif;
  --font-sans: "Roboto", system-ui, sans-serif;
  --font-mono: ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, monospace;
}
```

Leave the rest of `index.css` alone in this task.

- [ ] **Step 4: Remove `content.nav` and the dead heading primitive**

`content.nav` exists only for `Header`, which Task 2 deletes; the rail reads `SECTIONS` instead. Delete the whole `nav: [...] as const,` entry from `src/content/content.ts` including its two explanatory comment lines above it.

Delete `src/components/ui/SectionHeading.tsx` — nothing imports it.

- [ ] **Step 5: Verify nothing else referenced them**

Run:

```bash
grep -rn "content.nav\|SectionHeading" src/ && echo "STILL REFERENCED" || echo "clean"
```
Expected: `clean`. If `Header.tsx` still shows up, that is expected only until Task 2 — in that case leave `content.nav` in place and move its deletion into Task 2 instead.

Run: `npm run build && npm run lint`
Expected: both exit 0.

- [ ] **Step 6: Commit**

```bash
git add src/content/sections.ts src/index.css src/content/content.ts
git rm src/components/ui/SectionHeading.tsx
git commit -m "feat: add section registry, command OS tokens and breakpoints"
```

---

### Task 2: Command shell replaces the header

**Files:**
- Create: `src/components/shell/CommandShell.tsx`
- Create: `src/components/shell/CommandRail.tsx`
- Create: `src/components/shell/CommandTopbar.tsx`
- Create: `src/components/shell/MobileCommandBar.tsx`
- Create: `src/components/shell/useActiveSection.ts`
- Modify: `src/App.tsx` (whole file)
- Modify: `src/content/content.ts` (add the `shell` block)
- Modify: `src/sections/Stats.tsx:13` (add the missing `id`)
- Delete: `src/sections/Header.tsx`

**Interfaces:**
- Consumes: `SECTIONS`, `SectionId` from Task 1.
- Produces: `<CommandShell>{children}</CommandShell>`, which renders the skip link, rail, topbar, mobile bar and `<main id="main">`; and `useActiveSection(ids: readonly string[]): string`, returning the id of the section currently owning the viewport.

- [ ] **Step 1: Add the shell copy to content.ts**

Add to the `content` object, after `hero`:

```ts
  shell: {
    status: 'Studio network online',
    cta: 'Open channel',
    brand: 'Gamegabyte / OS',
    menu: 'Menu',
  },
```

- [ ] **Step 2: Lift the active-section hook out of Header**

Create `src/components/shell/useActiveSection.ts` with the observer currently living at `src/sections/Header.tsx:13-36`, changed to take and return bare ids rather than hash hrefs:

```ts
import { useEffect, useState } from 'react'

/** Returns the id of the section currently owning the viewport. */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (!targets.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] },
    )
    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [ids])

  return active
}
```

- [ ] **Step 3: Build the rail**

Create `src/components/shell/CommandRail.tsx`. The rail is 92px wide, fixed, full height, hidden below `md`. Each entry shows only its two-digit index, so the accessible name comes from the registry label:

```tsx
import { SECTIONS } from '../../content/sections'

export function CommandRail({ active }: { active: string }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[92px] flex-col items-center justify-between border-r border-white/11 bg-ink/95 py-6 backdrop-blur-xl md:flex">
      <a href="#home" aria-label="Gamegabyte home" className="font-display text-base font-extrabold tracking-[0.05em] [writing-mode:vertical-rl] rotate-180">
        GGB
      </a>

      <nav aria-label="Command sections" className="flex flex-col gap-[17px]">
        {SECTIONS.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-label={section.label}
            aria-current={active === section.id ? 'true' : undefined}
            className={`relative font-mono text-[8px] [writing-mode:vertical-rl] transition-colors ${
              active === section.id ? 'text-accent' : 'text-white/35 hover:text-white'
            }`}
          >
            {section.index}
          </a>
        ))}
      </nav>

      <span className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.13em] text-accent [writing-mode:vertical-rl]">
        Online
      </span>
    </aside>
  )
}
```

Note: with twelve entries the rail is denser than the prototype's five. If the column overflows at 1000px viewport height, reduce the gap to `gap-3` — do not drop entries.

- [ ] **Step 4: Build the topbar and the mobile command bar**

`src/components/shell/CommandTopbar.tsx` — fixed, starts after the rail (`left-[92px]`), hidden below `md`, carries the pulsing status dot with `content.shell.status` and a `Button href="#contact"` labelled `content.shell.cta`.

`src/components/shell/MobileCommandBar.tsx` — shown only below `md`. The attribute wiring here is load-bearing: the QA harness asserts on `aria-expanded`, `aria-controls="mobile-menu"` and the sheet's `hidden` state, so keep those exact names.

```tsx
import { useEffect, useState } from 'react'
import { SECTIONS } from '../../content/sections'
import { content } from '../../content/content'

export function MobileCommandBar({ active }: { active: string }) {
  const [open, setOpen] = useState(false)

  // Trap the page behind the sheet and honour Escape — ported from Header.tsx:51-63.
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex h-[70px] items-center justify-between border-b border-white/11 bg-ink/95 px-[18px] backdrop-blur-xl md:hidden">
        <a href="#home" className="font-display text-[15px] font-extrabold uppercase tracking-[0.08em]">
          {content.shell.brand}
        </a>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
          className="min-h-[42px] min-w-12 cursor-pointer border border-white/11 font-mono text-[8px] uppercase tracking-[0.14em]"
        >
          {content.shell.menu}
        </button>
      </header>

      <nav
        id="mobile-menu"
        hidden={!open}
        aria-label="Command sections"
        className="fixed inset-x-0 top-17.5 z-49 grid grid-cols-2 border-b border-white/11 bg-ink/98 md:hidden"
      >
        {SECTIONS.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-current={active === section.id ? 'true' : undefined}
            onClick={() => setOpen(false)}
            className="border-b border-r border-white/11 px-[18px] py-4 font-mono text-[9px] uppercase tracking-[0.12em] text-white/70"
          >
            {section.index} / {section.label}
          </a>
        ))}
      </nav>
    </>
  )
}
```

- [ ] **Step 5: Compose the shell and rewrite App.tsx**

`CommandShell` renders skip link, rail, topbar, mobile bar and `<main id="main">`, offsetting the content by the rail width (`md:ml-[92px]`). `App.tsx` becomes:

```tsx
import { CommandShell } from './components/shell/CommandShell'
import { Hero } from './sections/Hero'
import { Showreel } from './sections/Showreel'
import { Stats } from './sections/Stats'
import { Services } from './sections/Services'
import { WorkProcess } from './sections/WorkProcess'
import { WhyChooseUs } from './sections/WhyChooseUs'
import { Portfolio } from './sections/Portfolio'
import { CaseStudy } from './sections/CaseStudy'
import { Testimonials } from './sections/Testimonials'
import { Academy } from './sections/Academy'
import { Faq } from './sections/Faq'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'

function App() {
  return (
    <CommandShell>
      <Hero />
      <Showreel />
      <Stats />
      <Services />
      <WorkProcess />
      <WhyChooseUs />
      <Portfolio />
      <CaseStudy />
      <Testimonials />
      <Academy />
      <Faq />
      <Contact />
      <Footer />
    </CommandShell>
  )
}

export default App
```

The three previously parked sections come back **in their existing styling** — Tasks 12, 13 and 14 restyle them. The page must be coherent and shippable at every commit boundary, not correct only at the end.

- [ ] **Step 6: Give Stats its missing id**

`src/sections/Stats.tsx:13` currently passes only `data-export="stats"`. Add `id="telemetry"` so all twelve registry ids resolve in the DOM.

- [ ] **Step 7: Delete Header and verify**

Run:

```bash
git rm src/sections/Header.tsx
grep -rn "sections/Header\|content.nav" src/ && echo "STILL REFERENCED" || echo "clean"
npm run build && npm run lint
```
Expected: `clean`, both commands exit 0.

Then start the dev server and confirm in the browser at 1440 wide that the rail is visible, the topbar clears it, and clicking rail entry `07` scrolls to the portfolio.

- [ ] **Step 8: Commit**

```bash
git add src/components/shell src/App.tsx src/content/content.ts src/sections/Stats.tsx
git commit -m "feat: replace header with command OS shell"
```

---

### Task 3: Playwright QA harness

**Files:**
- Create: `scripts/qa.mjs`
- Modify: `package.json` (add the `qa` script)
- Modify: `.gitignore` (ignore `.qa/`)

**Interfaces:**
- Produces: `npm run qa`, exiting non-zero on any failed check and writing per-section screenshots to `.qa/`. Tasks 4–18 each add checks to the `CHECKS` array in this file.

- [ ] **Step 1: Write the harness**

Create `scripts/qa.mjs`. It boots Vite through its JS API so no port coordination is needed:

```js
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

const server = await createServer({ server: { port: 0 } })
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

  // Clipped-but-not-scrolling content: the failure mode the overflow check misses.
  const clipped = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth
    const allowed = ['dossier-rail', 'ticker']
    return [...document.querySelectorAll('main *')]
      .filter((el) => {
        if (el.closest(`.${allowed.join(', .')}`)) return false
        const r = el.getBoundingClientRect()
        return r.width > 0 && (r.right > vw + 1 || r.left < -1)
      })
      .slice(0, 10)
      .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 40)}`)
  })
  check(`${viewport.label}: nothing clipped outside the viewport`, clipped.length === 0, clipped.join(' | '))

  for (const section of SECTIONS) {
    const el = page.locator(`#${section.id}`)
    check(`${viewport.label}: #${section.id} exists`, (await el.count()) === 1)
    if (await el.count()) {
      await el.scrollIntoViewIfNeeded()
      await page.waitForTimeout(250)
      await el.screenshot({ path: `${OUT}/${viewport.label}-${section.index}-${section.id}.png` })
    }
  }

  check(`${viewport.label}: no console errors`, errors.length === 0, errors.join(' | '))
  await context.close()
}

// Reduced motion: nothing decorative may still be running once the page settles.
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' })
  const page = await context.newPage()
  await page.goto(url, { waitUntil: 'load' })
  await page.waitForTimeout(1500)
  const running = await page.evaluate(() =>
    document.getAnimations().filter((a) => a.playState === 'running').length,
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
```

If importing `sections.ts` from Node fails on the TypeScript syntax, run the script through Vite's loader instead by changing the `qa` script to `vite-node scripts/qa.mjs`, or inline the twelve ids as a plain array in the harness — do not weaken the twelve-section assertion.

- [ ] **Step 2: Wire the script and ignore the output**

In `package.json`, add to `scripts`, without touching the others:

```json
"qa": "node scripts/qa.mjs"
```

Append to `.gitignore`:

```
# Playwright QA screenshots
.qa/
```

- [ ] **Step 3: Run it and read the failures**

Run: `npm run qa`
Expected: all twelve `#id exists` checks pass (Task 2 wired every section). The clipping and console checks should pass. If `no horizontal overflow` fails on mobile, that is a real defect from Task 2 — fix it before committing.

- [ ] **Step 4: Commit**

```bash
git add scripts/qa.mjs package.json .gitignore
git commit -m "test: add playwright QA harness for the command OS page"
```

---

### Task 4: Primitive kit

**Files:**
- Modify: `src/components/ui/Section.tsx` (whole file)
- Modify: `src/components/ui/Container.tsx`
- Modify: `src/components/ui/SectionHeader.tsx` (whole file)
- Create: `src/components/ui/Panel.tsx`
- Create: `src/components/ui/Readout.tsx`

**Interfaces:**
- Consumes: `SECTIONS`, `SectionId`, `sectionById` from Task 1.
- Produces:
  - `<Section id={SectionId} grid? backdrop? className?>` — the section frame, no top border, Command OS vertical rhythm.
  - `<Container className?>` — centred, `max-w-[1320px]`, horizontal padding.
  - `<SectionHeader id={SectionId} title description? action?>` — reads index and eyebrow from the registry; callers no longer pass them by hand.
  - `<Panel className?>` — the shared hairline surface.
  - `<Readout label value note? size?>` — mono label plus display value; the value span carries `data-readout-value` for the QA harness.

The spec also listed an `Eyebrow` primitive. It is deliberately dropped: `SectionHeader` already renders the only eyebrow on the page, and a second component with no consumer is dead code on arrival.

- [ ] **Step 1: Rewrite SectionHeader against the registry**

The current signature takes `index` and `eyebrow` as free strings, which is how numbering drifts. Change it to take the section id and look both up:

```tsx
import type { ReactNode } from 'react'
import { Reveal } from '../motion/Reveal'
import { sectionById, type SectionId } from '../../content/sections'

export function SectionHeader({
  id,
  title,
  description,
  action,
}: {
  id: SectionId
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
}) {
  const { index, eyebrow } = sectionById(id)

  return (
    <Reveal>
      <div className="mb-10 grid gap-6 lg:mb-14 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)] lg:gap-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
          <span aria-hidden="true" className="text-white/45">[{index}]</span> {eyebrow}
        </p>
        <div>
          <h2 className="font-display text-[clamp(38px,6vw,84px)] font-extrabold uppercase leading-[0.86] tracking-[-0.05em] text-white">
            {title}
          </h2>
          {description && <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70">{description}</p>}
          {action && <div className="mt-8">{action}</div>}
        </div>
      </div>
    </Reveal>
  )
}
```

- [ ] **Step 2: Rewrite Section and widen Container**

`Section`: drop `border-t border-white/8`, keep the `grid` backdrop option and the `backdrop` slot with its existing comment about paint order, and set the Command OS rhythm `py-[78px] md:py-28 lg:py-32`. Type `id` as `SectionId` so a typo cannot silently break the rail.

`Container`: change `max-w-6xl` to `max-w-[1320px]` and padding to `px-[18px] md:px-12`.

- [ ] **Step 3: Add Panel, Readout and Eyebrow**

```tsx
// src/components/ui/Panel.tsx
import type { ReactNode } from 'react'

/** The page's one surface recipe: hairline border on a barely-lifted ground. */
export function Panel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`border border-white/11 bg-white/[0.015] ${className}`}>{children}</div>
}
```

```tsx
// src/components/ui/Readout.tsx
import type { ReactNode } from 'react'

/** A mono label above a display-weight value — the telemetry voice of the page. */
export function Readout({
  label,
  value,
  note,
  size = 'md',
}: {
  label: ReactNode
  value: ReactNode
  note?: ReactNode
  size?: 'md' | 'lg'
}) {
  return (
    <div>
      <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/48">{label}</span>
      <span
        data-readout-value
        className={`mt-6 block font-display font-bold leading-[0.84] tracking-[-0.055em] text-accent-bright ${
          size === 'lg' ? 'text-[clamp(96px,14vw,188px)]' : 'text-[clamp(46px,5vw,68px)]'
        }`}
      >
        {value}
      </span>
      {note && <p className="mt-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.105em] text-white/60">{note}</p>}
    </div>
  )
}
```

Two files only. The mono-label voice needed outside these primitives is a short utility string, not a third component.

- [ ] **Step 4: Update every call site of SectionHeader**

Nine sections pass `index`/`eyebrow` today. Change each to pass `id` instead — the same id the section already gives its `<Section>`. Find them with:

```bash
grep -rln "SectionHeader" src/sections/
```

- [ ] **Step 5: Verify**

Run: `npm run build && npm run lint && npm run qa`
Expected: all three exit 0. The section numbering visible in the browser must now read `[01]`–`[12]` in document order, which it did not before — Showreel previously showed `[01]` while sitting second.

- [ ] **Step 6: Commit**

```bash
git add src/components/ui src/sections
git commit -m "refactor: command OS primitive kit driven by the section registry"
```

---

### Tasks 5–16: The twelve sections

Every section task follows the same shape. Rather than repeating boilerplate twelve times, the shared procedure is written once here; each task below states only what is specific to it.

**Shared procedure for each section task:**

- [ ] **Step A: Read the prototype markup** for this section in the reference file, including its `@media(max-width:1050px)` and `@media(max-width:760px)` overrides. Those two blocks hold the responsive layout and are easy to miss.
- [ ] **Step B: Add the QA check** for this section to the `CHECKS` in `scripts/qa.mjs` (the check is given per task below), then run `npm run qa` and confirm it **fails**. A check that passes before the work is written is not testing anything — fix the check.
- [ ] **Step C: Rewrite the section component** in Tailwind utilities on top of the Task 4 primitives.
- [ ] **Step D: Delete any now-dead CSS** for this section from `index.css` (named per task).
- [ ] **Step E: Run `npm run qa`** and confirm the new check passes and no previously passing check regressed.
- [ ] **Step F: Compare against the prototype** — open both at 1440 and 390 and check the section for clipping, cropped imagery and hierarchy. Fix inside the section only.
- [ ] **Step G: Run `npm run build && npm run lint`, then commit** with `feat: rebuild <section> as command OS`.

---

### Task 5: Hero

**Files:**
- Modify: `src/sections/Hero.tsx` (whole file)
- Modify: `src/content/content.ts` (add `hero.dashboard`)
- Modify: `scripts/qa.mjs`

**Interfaces:**
- Consumes: `Panel`, `Readout` (Task 4); `content.hero`, `content.services`, `content.stats`.
- Produces: nothing other tasks depend on.

**Layout:** split grid — copy left (eyebrow, display headline with the lime `Marketing` line, sub, two CTAs, credentials row), three-panel dashboard right, capability ticker below. Background is `assets.backgrounds.hero` at low opacity behind a two-stop gradient.

**Content addition:**

```ts
  // Real figures only: the dashboard reads from stats and services rather than
  // the prototype's invented telemetry.
  dashboard: {
    projectsLabel: 'Studio projects',
    focusLabel: 'Active focus',
    focusValue: 'AAA + Mobile',
    nodesLabel: 'Available system nodes',
  },
```

The bar chart is decoration: render it `aria-hidden="true"` with no numeric label. The node list renders the six titles from `content.services`. The `87%`, `BUILD 24.08` and `CAMPAIGN READINESS` strings from the prototype do not ship.

**The trap this section exists to avoid:** a bare `1fr` grid track takes its automatic minimum from min-content, so the display headline blows the track wider than a 390px viewport and the section's `overflow-hidden` silently clips it — `scrollWidth === innerWidth` still passes. Use `grid-cols-[minmax(0,1fr)]` at mobile and clamp the headline:

```tsx
<h1 className="font-display text-[clamp(34px,14vw,74px)] font-extrabold uppercase leading-[0.82] tracking-[-0.065em] md:text-[clamp(64px,7.2vw,112px)]">
```

**QA check to add (Step B):**

```js
// Hero headline must fit its column at 390px — the prototype's original failure.
const heroFits = await page.evaluate(() => {
  const title = document.querySelector('#home h1')
  const vw = document.documentElement.clientWidth
  const r = title.getBoundingClientRect()
  return r.left >= -1 && r.right <= vw + 1
})
check(`${viewport.label}: hero headline fits the viewport`, heroFits)
```

**Dead CSS to delete (Step D):** none.

---

### Task 6: Showreel

**Files:**
- Modify: `src/sections/Showreel.tsx`
- Modify: `src/components/motion/LazyVideo.tsx` (control bar styling only)
- Modify: `scripts/qa.mjs`

**Interfaces:**
- Consumes: `LazyVideo` — keep its existing props (`src`, `poster`, `className`, `aria-label`) and its play/pause/seek/mute logic untouched.

**Layout:** monitored transmission frame with corner ticks, the player, then a status row reading `Transmission ready` beside the text-styled controls. `TrustBar` keeps the four client logos, two-up on mobile.

**Restyle only:** `LazyVideo`'s control bar becomes the Command OS text-button language (`Play signal` / `Pause signal`, `Mute: off` / `Mute: on`). Do not change `toggle`, `toggleMute`, `seek` or the `aria-label` behaviour — those are correct and the QA harness depends on them.

**QA check to add:**

```js
const muteBtn = page.locator('#reel button[aria-label*="ute showreel"]').first()
const before = await page.evaluate(() => document.querySelector('#reel video').muted)
await muteBtn.click()
await page.waitForTimeout(200)
const after = await page.evaluate(() => document.querySelector('#reel video').muted)
check(`${viewport.label}: reel mute toggles`, before !== after, `${before} -> ${after}`)
```

**Dead CSS to delete:** none.

---

### Task 7: Stats (telemetry)

**Files:**
- Modify: `src/sections/Stats.tsx`
- Modify: `src/index.css` (delete the stats block)
- Modify: `scripts/qa.mjs`

**Layout:** one primary readout panel (`stats[0]`, `size="lg"`) beside a three-cell grid of supporting readouts, using `Readout` from Task 4. Keep `CountUp` for the numbers.

**Dead CSS to delete:** the whole stats block in `src/index.css` — `.stats-command-board`, `.stats-command-primary`, `.stats-command-primary::after`, `.stats-command-status`, `.stats-command-status::before`, `.stats-command-primary-value`, `.stats-command-secondary`, `.stats-command-reading` and its `nth-child` rules, `.stats-command-index`, `.stats-command-value`, `.stats-command-label`, `.stats-command-note`, `.stats-signal-trace`, `.stats-signal-trace polyline`, plus the `@keyframes stats-status-pulse` / `stats-signal-trace` and the three media-query blocks that only style them (`index.css:107-314`). Keep the signal-trace keyframes **only** if the rebuilt section still draws the SVG trace; if it does, they belong in the keyframes area of `index.css`.

**QA check to add:**

```js
const values = await page.locator('#telemetry [data-readout-value]').allTextContents()
check(`${viewport.label}: four telemetry readouts`, values.length === 4, values.join(','))
```

`data-readout-value` already ships on `Readout` from Task 4 — no component change needed here.

---

### Task 8: Services

**Files:**
- Modify: `src/sections/Services.tsx`
- Modify: `src/index.css` (delete `.services-card-grid`, `.services-grid-background` and their four media-query blocks, `index.css:61-105`)
- Modify: `scripts/qa.mjs`

**Layout:** input/output matrix — a narrow key column (`Input / Discipline`, `Output / Growth`) beside six service cells in two rows of three, collapsing to one column below `md`. Below it, the four `content.technology` notes as a divided strip.

Collapse the internal borders with `nth-child` arbitrary variants rather than a CSS file, e.g. `[&>*:nth-child(3n)]:border-r-0`.

**QA check to add:**

```js
check(`${viewport.label}: six service cells`, (await page.locator('#services [data-service-cell]').count()) === 6)
```

---

### Task 9: WorkProcess

**Files:**
- Modify: `src/sections/WorkProcess.tsx`
- Modify: `src/index.css` (delete `.process-signal-node`, `index.css:374-380`)
- Modify: `scripts/qa.mjs`

**Layout:** a sticky orbital panel on the left (`lg:sticky lg:top-[120px]`, concentric rings drawn with borders and a lime core, `aria-hidden`) beside the four `content.process` steps strung on a vertical signal path. The orbit panel drops above the steps below `lg`.

**QA check to add:**

```js
check(`${viewport.label}: four process steps`, (await page.locator('#process [data-process-step]').count()) === 4)
```

---

### Task 10: WhyChooseUs (advantages)

**Files:**
- Modify: `src/sections/WhyChooseUs.tsx`
- Modify: `scripts/qa.mjs`

**Layout:** four advantage nodes in one row, two-up below `lg`, one-up below `md`. Each carries tag, sprite, title, body and a foot meta line. Keep `PixelSprite` with the existing `sprite` indices from `content.why` — it already crops one character per node, so no sprite work is needed.

**QA check to add:**

```js
check(`${viewport.label}: four advantage nodes`, (await page.locator('#about [data-advantage]').count()) === 4)
```

---

### Task 11: Portfolio

**Files:**
- Modify: `src/sections/Portfolio.tsx`
- Modify: `scripts/qa.mjs`

**Layout:** asymmetric archive — one tall item on the left spanning both rows, two stacked on the right; single column below `md` with explicit row heights. Each item keeps its `content.portfolio.items[].href` destination and its tag.

**Image rule:** `aspect-[4/5]` for the tall item and `aspect-[16/10]` for the stacked pair, always `object-cover`. Never a fixed pixel height.

**QA check to add:**

```js
check(`${viewport.label}: three archive items`, (await page.locator('#portfolio [data-archive-item]').count()) === 3)
```

---

### Task 12: CaseStudy (dossier)

**Files:**
- Modify: `src/sections/CaseStudy.tsx` (whole file — this section is coming out of park)
- Modify: `src/content/content.ts` (add `caseStudy.recordLabel`)
- Modify: `scripts/qa.mjs`

**Layout:** a meta panel (client, title, intro, record count) beside a feature image, then a horizontally scrolling rail of all nine screens with scroll-snap.

**Content addition:**

```ts
    recordLabel: 'Primary record / 01',
```

The prototype's `DOSSIER UNLOCKED` becomes `09 records`, derived from `content.caseStudy.screens.length` so it cannot go stale.

**Two rules this section exists to enforce:**
1. The feature image is `aspect-[16/9]` with `object-cover`, never a fixed height — a 460px-tall box against 1920×1080 art crops the interface art's edges off, which is exactly what happened in the prototype.
2. The rail is the one place horizontal overflow is legitimate. Give it `overflow-x-auto snap-x snap-mandatory` and the class `dossier-rail`, which the Task 3 clipping check already allows.

**QA check to add:**

```js
check(`${viewport.label}: nine dossier screens`, (await page.locator('#case-study [data-dossier-screen]').count()) === 9)
const featureRatio = await page.evaluate(() => {
  const el = document.querySelector('#case-study [data-dossier-feature]')
  const r = el.getBoundingClientRect()
  return r.width / r.height
})
check(`${viewport.label}: dossier feature is 16:9`, Math.abs(featureRatio - 16 / 9) < 0.05, String(featureRatio))
```

---

### Task 13: Testimonials (communication log)

**Files:**
- Modify: `src/sections/Testimonials.tsx` (whole file — coming out of park)
- Modify: `scripts/qa.mjs`

**Layout:** a narrow meta column (`Log 01 / Human intelligence` at the top, the client company name at the foot) beside the full quote set large, with the attribution below a hairline rule.

The prototype's `SIGNAL VERIFIED` is replaced by the real company name from `content.testimonials[0].role`.

**QA check to add:**

```js
const quote = await page.locator('#testimonials blockquote').innerText()
check(`${viewport.label}: full testimonial quote present`, quote.includes('strategic partners helping your game succeed'))
```

---

### Task 14: Academy

**Files:**
- Modify: `src/sections/Academy.tsx` (whole file — coming out of park)
- Modify: `scripts/qa.mjs`

**Layout:** a terminal panel split in two — battlefield artwork left (`assets.backgrounds.battlefield`, gradient fading into the panel), copy and CTA right. Stacks below `md` with the gradient rotated to vertical.

**Do not ship the four course tags** (`Game UX`, `UI systems`, `Player thinking`, `Production craft`). They were invented for the prototype and were never verified against the real course. If the studio later confirms them, add `academy.tags` to `content.ts` and render it — that is a one-line change, and shipping unverified curriculum claims is not.

The CTA links to `https://game-uxui-fundamentals.gamegabyte.com/` with `target="_blank" rel="noreferrer"`.

**QA check to add:**

```js
const academy = page.locator('#academy a[href^="https://game-uxui-fundamentals"]')
check(
  `${viewport.label}: academy link opens externally`,
  (await academy.getAttribute('target')) === '_blank' &&
    (await academy.getAttribute('rel')).includes('noreferrer'),
)
```

---

### Task 15: Faq (diagnostics)

**Files:**
- Modify: `src/sections/Faq.tsx`
- Modify: `scripts/qa.mjs`

**Layout:** four diagnostic rows, each a real `<button>` with the index, the question, and a plus that rotates when open; the answer panel sits below, indented to the question column. Multiple rows may stay open at once.

Keep the existing `aria-expanded` / `aria-controls` / `id={`faq-panel-${index}`}` wiring from `src/sections/Faq.tsx:67` — it is already correct.

**QA check to add:**

```js
const faq = page.locator('#faq button[aria-expanded]').first()
const panelId = await faq.getAttribute('aria-controls')
check(`${viewport.label}: four diagnostics`, (await page.locator('#faq button[aria-expanded]').count()) === 4)
check(`${viewport.label}: faq answer starts hidden`, !(await page.locator(`#${panelId}`).isVisible()))
await faq.click()
await page.waitForTimeout(250)
check(`${viewport.label}: faq opens`, (await faq.getAttribute('aria-expanded')) === 'true')
await faq.click()
```

---

### Task 16: Contact

**Files:**
- Modify: `src/sections/Contact.tsx`
- Modify: `scripts/qa.mjs`

**Layout:** a two-column form (name and email side by side, message full width, submit full width) beside a response card. Keep the existing field ids, labels, the `aria-live` status region and the `endpoint`-empty mailto fallback at `src/sections/Contact.tsx:56-159` — that fallback is what stops the form claiming a success that never happened.

**The response card headline** must not promise a turnaround the studio has not confirmed. Ship the neutral `System status / Online` heading with the existing `content.contact.body`. If the studio confirms the two-working-day commitment, add it to `content.contact` and render it then.

**QA check to add:**

```js
check(`${viewport.label}: contact form has all three fields`,
  (await page.locator('#contact-name').count()) === 1 &&
  (await page.locator('#contact-email').count()) === 1 &&
  (await page.locator('#contact-message').count()) === 1)
```

---

### Task 17: Footer

**Files:**
- Modify: `src/sections/Footer.tsx`
- Modify: `scripts/qa.mjs`

**Layout:** brand block spanning full width on mobile, the three `content.footer.columns` link groups, and the four social labels under `content.footer.tagline`. Offset by the rail on desktop (`md:ml-[92px]`) so it lines up with `<main>`.

**QA check to add:**

```js
check(`${viewport.label}: footer has three link groups`, (await page.locator('footer [data-footer-column]').count()) === 3)
check(`${viewport.label}: footer has four social links`, (await page.locator('footer [data-footer-social]').count()) === 4)
```

---

### Task 18: CSS cleanup and full verification

**Files:**
- Modify: `src/index.css`
- Modify: `README.md` if it documents the old header (check first)

- [ ] **Step 1: Find what is left unreferenced**

```bash
for name in hud-surface hud-surface-interactive hud-portrait hud-grid pointer-glow; do
  printf '%s: ' "$name"
  grep -rl "$name" src/ | grep -v index.css | wc -l
done
```

Any utility reporting `0` is dead. Delete it from `index.css`, along with `src/components/ui/PointerGlow.tsx` if `pointer-glow` is dead and nothing imports the component.

- [ ] **Step 2: Confirm index.css holds only what the spec allows**

Read the file top to bottom. It should contain `@import "tailwindcss"`, the `@theme` block, `@font-face` rules, any `@keyframes` still in use, the `html`/`body` rules, the scroll-margin rule, the focus-visible rule and the reduced-motion block. Anything else is a leftover — delete it.

Run:

```bash
wc -l src/index.css
```
Expected: fewer than the 406 lines it started at.

- [ ] **Step 3: Full verification**

Run:

```bash
npm run build
npm run lint
npm run qa
```
Expected: all three exit 0, with every QA check passing.

- [ ] **Step 4: Visual comparison against the prototype**

Open the production dev server and the prototype side by side at 1440×1000 and 390×844. Walk all twelve sections. Confirm no clipped text, no cropped interface art, and that section numbering reads `[01]`–`[12]` in order. Fix anything found before committing.

- [ ] **Step 5: Confirm the prototypes were not touched**

```bash
git diff --stat main -- prototypes/
```
Expected: empty.

- [ ] **Step 6: Commit**

```bash
git add src/index.css
git commit -m "refactor: drop CSS superseded by the command OS rebuild"
```

---

## Open items carried from the spec

Both ship in the safe form and flip with a one-line content change once the studio confirms:

1. **Academy course tags** — omitted in Task 14.
2. **`Replies in 2 working days`** — replaced with a neutral response card in Task 16.

## Out of scope

- Wiring `content.contact.endpoint` to a form backend
- Case-study detail pages (portfolio items still point at `#contact`)
- Real hrefs for the placeholder social links
- Any test infrastructure beyond `scripts/qa.mjs`
