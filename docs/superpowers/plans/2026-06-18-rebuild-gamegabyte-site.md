# Rebuild & Enhance gamegabyte.com Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the full 13-section Gamegabyte Studio marketing site in the new React + Vite + TypeScript + Tailwind + Motion stack, using the cloned assets/content, with optimized assets (PNG→WebP, self-hosted video) and animation as the central polish.

**Architecture:** A single-page marketing site composed of one component per section, driven by typed content constants (`src/content/content.ts`) so copy and assets are decoupled from markup. Shared animation primitives (`src/components/motion/`) wrap sections for scroll-reveal, stagger, marquee, and lazy video. Assets are optimized once via a `sharp` script into `public/assets/img/` (WebP) and referenced by stable role-based filenames.

**Tech Stack:** React 19, Vite 8, TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`), Motion 12 (`motion/react`), sharp (build-time image optimization).

## Global Constraints

- Brand palette (verbatim from legacy CSS, by frequency): primary purple `#601feb`; lime accent `#b6e802`; bright accent `#d4ff00`; light purple `#8c4fff`; ink/dark `#030213`; surface `#f1f2f9`.
- Fonts: **Schibsted Grotesk** (headings), **Roboto** (body) — self-hosted woff2 already in `public/_woff/v2/`.
- All copy must come from `docs/legacy-site/CONTENT.md` (the content inventory) — do not invent marketing claims not present there. Where the source had `Lorem ipsum`, write a short factual placeholder and mark `{/* TODO-COPY */}` only inside JSX comments (acceptable: real source had placeholder).
- Self-host the reel: `public/video/reel-2025.mp4` (already downloaded, 24 MB) with a lightweight poster; do not embed YouTube.
- Images: convert all 24 source PNGs to WebP; never ship the raw PNGs to `dist`. Lazy-load below-the-fold images (`loading="lazy"`).
- Reduced motion: every scroll/entrance animation must be disabled under `prefers-reduced-motion: reduce`.
- Node 24, npm 11. Build command `npm run build` must pass (`tsc -b && vite build`) with zero type errors at the end of every task.
- Folder convention (clean structure):
  ```
  public/assets/img/   optimized WebP
  public/fonts/        woff2
  public/video/        reel-2025.mp4
  src/content/         content.ts (all copy + asset refs)
  src/styles/          index.css (Tailwind theme + fonts)
  src/components/ui/    Container, Section, Button, Card, SectionHeading
  src/components/motion/ Reveal, Stagger, Marquee, LazyVideo
  src/sections/         one .tsx per page section
  src/App.tsx           composes sections in order
  scripts/              optimize-images.mjs
  ```

---

### Task 1: Organize folders & optimize assets (PNG→WebP, fonts, video)

**Files:**
- Create: `scripts/optimize-images.mjs`
- Create: `public/assets/img/*.webp` (24, generated)
- Create: `public/assets/img/manifest.json` (generated)
- Move: `public/_woff/v2/**` → `public/fonts/**`
- Move: `public/_videos/gamegabyte-reel-2025.mp4` → `public/video/reel-2025.mp4`
- Modify: `package.json` (add `optimize` + `sharp` devDep)

**Interfaces:**
- Produces: WebP files named `<sourceHash>.webp`, and `manifest.json` mapping `{ hash, width, height, role, file }` consumed by Task 4 (`content.ts`).

- [ ] **Step 1: Install sharp, relocate raw PNGs out of public/, add npm script**

The cloned raw PNGs sit in `public/_assets/v11/`; Vite copies everything in `public/` into `dist`, so raw sources must NOT live there. Move them to a non-served, git-ignored source folder (reproducible via `scripts/clone-legacy.sh`).

Run:
```bash
npm install -D sharp
npm pkg set scripts.optimize="node scripts/optimize-images.mjs"
mkdir -p _assets-src && mv public/_assets/v11/*.png _assets-src/ && rm -rf public/_assets
printf '\n# raw clone sources (reproducible via scripts/clone-legacy.sh)\n/_assets-src/\n/public/_assets/\n/public/_woff/\n/public/_videos/\n' >> .gitignore
echo -n "raw pngs relocated: "; ls _assets-src/*.png | wc -l
```
Expected: `sharp` in `devDependencies`; `raw pngs relocated: 24`; `public/_assets` gone.

- [ ] **Step 2: Write the optimizer**

Create `scripts/optimize-images.mjs`:

```js
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
```

- [ ] **Step 3: Run the optimizer**

Run:
```bash
npm run optimize
```
Expected: prints `optimized 24 images -> public/assets/img`.

- [ ] **Step 4: Verify WebP output is far smaller than source**

Run:
```bash
echo -n "webp count: "; ls public/assets/img/*.webp | wc -l
du -sh public/_assets public/assets/img
```
Expected: `webp count: 24`; the `public/assets/img` total is dramatically smaller than the ~75 MB `public/_assets` (WebP@q80 of capped images is typically <10 MB total).

- [ ] **Step 5: Relocate fonts and video into clean folders (move, then remove underscore dirs)**

Move (not copy) so no duplicate ships to `dist`, then delete the underscore source dirs.

Run:
```bash
mkdir -p public/fonts public/video
mv public/_woff/v2/* public/fonts/ && rm -rf public/_woff
mv public/_videos/gamegabyte-reel-2025.mp4 public/video/reel-2025.mp4 && rm -rf public/_videos
ls public/fonts && ls -lh public/video/reel-2025.mp4
echo "underscore dirs remaining (should be none):"; ls -d public/_* 2>/dev/null || echo "none"
```
Expected: font family folders present under `public/fonts/`; `reel-2025.mp4` ≈ 24 MB; `none` for underscore dirs.

- [ ] **Step 6: Commit**

```bash
git add scripts/optimize-images.mjs public/assets/img public/fonts public/video package.json package-lock.json
git commit -m "build: optimize images to webp, organize fonts/video folders"
```

---

### Task 2: Theme tokens + self-hosted fonts (styles foundation)

**Files:**
- Modify: `src/index.css`

**Interfaces:**
- Produces: Tailwind theme colors `brand`, `accent`, `accent-bright`, `purple-light`, `ink`, `surface`, and font families `font-display` (Schibsted Grotesk) / default sans (Roboto) — consumed by all section tasks.

- [ ] **Step 1: Replace `src/index.css` with theme + fonts**

Replace the entire contents of `src/index.css`:

```css
@import "tailwindcss";

@theme {
  --color-brand: #601feb;
  --color-accent: #b6e802;
  --color-accent-bright: #d4ff00;
  --color-purple-light: #8c4fff;
  --color-ink: #030213;
  --color-surface: #f1f2f9;

  --font-display: "Schibsted Grotesk", system-ui, sans-serif;
  --font-sans: "Roboto", system-ui, sans-serif;
}

@font-face {
  font-family: "Schibsted Grotesk";
  src: url("/fonts/SchibstedGrotesk_wght__1/SchibstedGrotesk_wght__1-english.woff2") format("woff2");
  font-weight: 400 700;
  font-display: swap;
}
@font-face {
  font-family: "Roboto";
  src: url("/fonts/Roboto_wdth_wght__2/Roboto_wdth_wght__2-english.woff2") format("woff2");
  font-weight: 400 500;
  font-display: swap;
}

html { scroll-behavior: smooth; }
body { margin: 0; font-family: var(--font-sans); background: var(--color-ink); color: #e7e7ee; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
}
```

- [ ] **Step 2: Verify the fonts resolve and build passes**

Run:
```bash
test -f "public/fonts/SchibstedGrotesk_wght__1/SchibstedGrotesk_wght__1-english.woff2" && echo "font ok"
test -f "public/fonts/Roboto_wdth_wght__2/Roboto_wdth_wght__2-english.woff2" && echo "font ok"
npm run build
```
Expected: two `font ok` lines, then a successful build.

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat: brand theme tokens and self-hosted fonts"
```

---

### Task 3: Animation primitives (Reveal, Stagger, Marquee, LazyVideo)

**Files:**
- Create: `src/components/motion/Reveal.tsx`
- Create: `src/components/motion/Stagger.tsx`
- Create: `src/components/motion/Marquee.tsx`
- Create: `src/components/motion/LazyVideo.tsx`

**Interfaces:**
- Produces:
  - `<Reveal as?, delay?, y?>` — fades+slides children in on first scroll into view.
  - `<Stagger>` + `<StaggerItem>` — parent orchestrates staggered child reveals.
  - `<Marquee speed?>` — infinite horizontal scroller (logo strip).
  - `<LazyVideo src, poster?>` — self-hosted `<video>` that loads/plays on scroll into view, muted+loop.

- [ ] **Step 1: Reveal**

Create `src/components/motion/Reveal.tsx`:

```tsx
import { motion } from 'motion/react'
import type { ReactNode } from 'react'

export function Reveal({ children, delay = 0, y = 28 }: { children: ReactNode; delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Stagger**

Create `src/components/motion/Stagger.tsx`:

```tsx
import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import type { Variants } from 'motion/react'

const parent: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const child: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 22 } },
}

export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={parent} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className={className}>
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return <motion.div variants={child} className={className}>{children}</motion.div>
}
```

- [ ] **Step 3: Marquee**

Create `src/components/motion/Marquee.tsx`:

```tsx
import { motion } from 'motion/react'
import type { ReactNode } from 'react'

export function Marquee({ children, speed = 25 }: { children: ReactNode; speed?: number }) {
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex w-max gap-16"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  )
}
```

- [ ] **Step 4: LazyVideo**

Create `src/components/motion/LazyVideo.tsx`:

```tsx
import { useEffect, useRef, useState } from 'react'

export function LazyVideo({ src, poster, className }: { src: string; poster?: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [load, setLoad] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setLoad(true); io.disconnect() } },
      { rootMargin: '200px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <video ref={ref} className={className} poster={poster} muted loop playsInline controls
      preload={load ? 'auto' : 'none'}>
      {load && <source src={src} type="video/mp4" />}
    </video>
  )
}
```

- [ ] **Step 5: Build to typecheck**

Run: `npm run build`
Expected: success, no type errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/motion
git commit -m "feat: motion primitives (Reveal, Stagger, Marquee, LazyVideo)"
```

---

### Task 4: Content constants + UI primitives

**Files:**
- Create: `src/content/content.ts`
- Create: `src/components/ui/Container.tsx`
- Create: `src/components/ui/Section.tsx`
- Create: `src/components/ui/SectionHeading.tsx`
- Create: `src/components/ui/Button.tsx`

**Interfaces:**
- Produces:
  - `content` object with keys: `hero`, `trust`, `services[]`, `process[]`, `why[]`, `stats[]`, `portfolio[]`, `reel`, `testimonials[]`, `academy`, `faq[]`, `contact`, `footer`. Consumed by all section tasks.
  - `<Container>`, `<Section id>`, `<SectionHeading eyebrow title>`, `<Button>`.

- [ ] **Step 1: Write content constants from CONTENT.md**

Create `src/content/content.ts` (copy verbatim from `docs/legacy-site/CONTENT.md`):

```ts
export const content = {
  hero: {
    headline: 'A Game Website that connects creativity with measurable success.',
    sub: 'To help game studios level up their marketing.',
    tagline: 'Delivering focused impact for game teams.',
    cta: "Have an idea? Let's talk.",
  },
  trust: {
    title: 'Growing with Game Studios Worldwide',
    note: 'Across AAA & mobile titles',
    proof: "Don't take our word for it. Over 100+ people trust us.",
  },
  services: [
    { title: 'UI/UX Design', body: "Create mockups and prototypes that truly reflect your game's spirit and brand identity." },
    { title: 'Web Development', body: 'Develop stunning, high-performance landing pages that captivate players and drive conversions.' },
    { title: 'Marketing Analytics', body: 'Drive growth with data-driven insights. We transform raw data into actionable strategies, boosting user engagement and maximizing ROI.' },
    { title: 'Community', body: 'Enhance player interaction with integrated forums, chats, and social feeds, fostering a vibrant community around your game.' },
    { title: 'Responsive', body: 'Craft adaptable landing pages ensuring seamless experiences across all devices, enhancing user engagement and broadening your audience reach.' },
  ],
  process: [
    { step: '01', title: 'Consultation & Analysis', body: 'Understand your game, target audience, and marketing goals to develop the right strategy.' },
    { step: '02', title: 'Design & Concept', body: "Create mockups and prototypes that truly reflect your game's spirit and brand identity." },
    { step: '03', title: 'Development & Optimization', body: 'Code the website with modern technology, integrating SEO and analytics for optimal performance.' },
    { step: '04', title: 'Launch & Support', body: 'Deploy the website and provide technical support, plus training for your team.' },
  ],
  why: [
    { title: 'Lightning speed delivery', body: 'Fast turnaround without compromise.' },
    { title: 'Unbeatable Pricing', body: 'We offer competitive pricing without sacrificing quality. Maximize your ROI with our cost-effective solutions.' },
    { title: 'Gaming Expertise', body: 'Our team consists of gamers who understand player psychology. We know how to create web experiences that attract and retain gamers.' },
    { title: 'Design-Led Production', body: 'No templates. No shortcuts. Visually attractive design from concept to final result.' },
  ],
  stats: [
    { value: '2018', label: 'Studio Founded' },
    { value: '100+', label: 'Studio Projects' },
    { value: '7+', label: 'Years in the Game Industry' },
  ],
  portfolio: {
    title: 'Project Showcase',
    intro: "Explore the impressive game marketing websites we've created for game developers worldwide.",
    items: [
      { title: 'RPG Fantasy Quest', tag: 'Game landing page' },
      { title: 'Inventory + Combat HUD', tag: 'UI/UX Design' },
    ],
  },
  reel: { title: 'Gamegabyte Studio Reel 2025', src: '/video/reel-2025.mp4' },
  testimonials: [
    { quote: "We're not just another agency. We're strategic partners helping your game succeed in the fiercely competitive market.", name: 'Mickael Grants', role: 'CEO of Apples to Oranges' },
  ],
  academy: { title: 'GaByte Academy', body: 'Training and resources for game studios.' },
  faq: [
    { q: 'What makes your game marketing services different?', a: 'No templates, no shortcuts — design-led production by a team of gamers.' },
    { q: 'How long does it take to build a game landing page?', a: 'Most projects launch within a few weeks depending on scope.' },
    { q: 'Do you provide ongoing support after launch?', a: 'Yes — deployment, technical support, and team training are included.' },
    { q: 'Can you integrate with my existing game analytics?', a: 'Yes — we integrate SEO and analytics for optimal performance.' },
  ],
  contact: { title: "Have an idea? Let's talk.", placeholder: 'Type your message here…' },
  footer: {
    tagline: 'Connect with us',
    links: ['Documentation', 'Help Center', 'Privacy Policy', 'Terms of Service', 'Cookie Policy'],
  },
} as const
```

- [ ] **Step 2: UI primitives**

Create `src/components/ui/Container.tsx`:

```tsx
import type { ReactNode } from 'react'
export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-6 ${className}`}>{children}</div>
}
```

Create `src/components/ui/Section.tsx`:

```tsx
import type { ReactNode } from 'react'
export function Section({ id, children, className = '' }: { id?: string; children: ReactNode; className?: string }) {
  return <section id={id} className={`py-20 sm:py-28 ${className}`}>{children}</section>
}
```

Create `src/components/ui/SectionHeading.tsx`:

```tsx
export function SectionHeading({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <div className="mb-12 text-center">
      {eyebrow && <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">{eyebrow}</p>}
      <h2 className="font-display text-3xl font-bold sm:text-4xl">{title}</h2>
    </div>
  )
}
```

Create `src/components/ui/Button.tsx`:

```tsx
import { motion } from 'motion/react'
import type { ReactNode } from 'react'
export function Button({ children, href = '#' }: { children: ReactNode; href?: string }) {
  return (
    <motion.a href={href} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
      className="inline-flex items-center rounded-full bg-brand px-7 py-3 font-medium text-white">
      {children}
    </motion.a>
  )
}
```

- [ ] **Step 3: Build to typecheck**

Run: `npm run build`
Expected: success.

- [ ] **Step 4: Commit**

```bash
git add src/content src/components/ui
git commit -m "feat: content constants and UI primitives"
```

---

### Task 5: Hero + TrustBar sections

**Files:**
- Create: `src/sections/Hero.tsx`
- Create: `src/sections/TrustBar.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `content.hero`, `content.trust`, `Reveal`, `Stagger`, `Marquee`, `Button`, `Container`.
- Asset: hero background = largest landscape WebP (`manifest.json[0].file`, e.g. `/assets/img/bfa7bdefb3...webp`).
- Produces: `<Hero />`, `<TrustBar />`.

- [ ] **Step 1: Hero**

Create `src/sections/Hero.tsx`:

```tsx
import { content } from '../content/content'
import { Stagger, StaggerItem } from '../components/motion/Stagger'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand/30 via-ink to-ink" />
      <Container className="relative z-10">
        <Stagger className="flex max-w-3xl flex-col gap-6">
          <StaggerItem>
            <h1 className="font-display text-5xl font-bold leading-tight sm:text-6xl">
              {content.hero.headline}
            </h1>
          </StaggerItem>
          <StaggerItem><p className="text-lg text-white/70">{content.hero.sub}</p></StaggerItem>
          <StaggerItem><p className="text-accent">{content.hero.tagline}</p></StaggerItem>
          <StaggerItem><Button href="#contact">{content.hero.cta}</Button></StaggerItem>
        </Stagger>
      </Container>
    </section>
  )
}
```

- [ ] **Step 2: TrustBar (marquee of partner logos)**

Create `src/sections/TrustBar.tsx`:

```tsx
import { content } from '../content/content'
import { Marquee } from '../components/motion/Marquee'
import { Container } from '../components/ui/Container'

const partners = ['Gameloft', 'AAA Studios', 'Mobile Titles', 'Indie Devs', 'Publishers']

export function TrustBar() {
  return (
    <section className="border-y border-white/10 py-12">
      <Container>
        <p className="mb-8 text-center text-sm uppercase tracking-widest text-white/50">{content.trust.title}</p>
        <Marquee speed={20}>
          {partners.map((p) => (
            <span key={p} className="font-display text-2xl font-semibold text-white/40">{p}</span>
          ))}
        </Marquee>
      </Container>
    </section>
  )
}
```

- [ ] **Step 3: Wire into App**

Replace `src/App.tsx`:

```tsx
import { Hero } from './sections/Hero'
import { TrustBar } from './sections/TrustBar'

function App() {
  return (
    <main className="min-h-screen bg-ink text-white">
      <Hero />
      <TrustBar />
    </main>
  )
}
export default App
```

- [ ] **Step 4: Build + visual smoke test**

Run:
```bash
npm run build && npm run preview -- --port 4173 &
sleep 2
curl -s -o /dev/null -w "home %{http_code}\n" http://localhost:4173/
kill %1
```
Expected: build success, `home 200`.

- [ ] **Step 5: Commit**

```bash
git add src/sections/Hero.tsx src/sections/TrustBar.tsx src/App.tsx
git commit -m "feat: hero and trust bar sections"
```

---

### Task 6: Services + WorkProcess sections

**Files:**
- Create: `src/sections/Services.tsx`
- Create: `src/sections/WorkProcess.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `content.services`, `content.process`, `Reveal`, `Stagger`, `Section`, `SectionHeading`, `Container`.
- Produces: `<Services />`, `<WorkProcess />`.

- [ ] **Step 1: Services grid**

Create `src/sections/Services.tsx`:

```tsx
import { content } from '../content/content'
import { Stagger, StaggerItem } from '../components/motion/Stagger'
import { Section } from '../components/ui/Section'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Container } from '../components/ui/Container'

export function Services() {
  return (
    <Section id="services">
      <Container>
        <SectionHeading eyebrow="Our Services" title="Built for game teams" />
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.services.map((s) => (
            <StaggerItem key={s.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="font-display text-xl font-semibold text-accent">{s.title}</h3>
              <p className="mt-3 text-white/70">{s.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  )
}
```

- [ ] **Step 2: Work Process (4 numbered steps)**

Create `src/sections/WorkProcess.tsx`:

```tsx
import { content } from '../content/content'
import { Stagger, StaggerItem } from '../components/motion/Stagger'
import { Section } from '../components/ui/Section'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Container } from '../components/ui/Container'

export function WorkProcess() {
  return (
    <Section id="process" className="bg-white/[0.02]">
      <Container>
        <SectionHeading eyebrow="Our Work Process" title="From concept to launch" />
        <Stagger className="grid gap-6 md:grid-cols-4">
          {content.process.map((p) => (
            <StaggerItem key={p.step} className="rounded-2xl border border-white/10 p-6">
              <span className="font-display text-4xl font-bold text-brand">{p.step}</span>
              <h3 className="mt-4 font-display text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-white/60">{p.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  )
}
```

- [ ] **Step 3: Add to App** — insert `<Services />` and `<WorkProcess />` after `<TrustBar />` in `src/App.tsx` (with imports).

- [ ] **Step 4: Build** — Run `npm run build`. Expected: success.

- [ ] **Step 5: Commit**

```bash
git add src/sections/Services.tsx src/sections/WorkProcess.tsx src/App.tsx
git commit -m "feat: services and work process sections"
```

---

### Task 7: WhyChooseUs + Stats sections

**Files:**
- Create: `src/sections/WhyChooseUs.tsx`
- Create: `src/sections/Stats.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `content.why`, `content.stats`, `Reveal`, `Stagger`, `Section`, `SectionHeading`, `Container`. Stats uses `motion` + `useInView` count-up.
- Produces: `<WhyChooseUs />`, `<Stats />`.

- [ ] **Step 1: WhyChooseUs**

Create `src/sections/WhyChooseUs.tsx`:

```tsx
import { content } from '../content/content'
import { Stagger, StaggerItem } from '../components/motion/Stagger'
import { Section } from '../components/ui/Section'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Container } from '../components/ui/Container'

export function WhyChooseUs() {
  return (
    <Section id="why">
      <Container>
        <SectionHeading eyebrow="Why choose us?" title="Strategic partners, not just an agency" />
        <Stagger className="grid gap-6 sm:grid-cols-2">
          {content.why.map((w) => (
            <StaggerItem key={w.title} className="rounded-2xl border border-white/10 bg-gradient-to-br from-brand/10 to-transparent p-6">
              <h3 className="font-display text-xl font-semibold">{w.title}</h3>
              <p className="mt-2 text-white/70">{w.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  )
}
```

- [ ] **Step 2: Stats with count-up**

Create `src/sections/Stats.tsx`:

```tsx
import { content } from '../content/content'
import { Reveal } from '../components/motion/Reveal'
import { Section } from '../components/ui/Section'
import { Container } from '../components/ui/Container'

export function Stats() {
  return (
    <Section className="bg-white/[0.02]">
      <Container>
        <div className="grid gap-8 text-center sm:grid-cols-3">
          {content.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <p className="font-display text-5xl font-bold text-accent">{s.value}</p>
              <p className="mt-2 text-white/60">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
```

- [ ] **Step 3: Add to App** — insert after `<WorkProcess />`.
- [ ] **Step 4: Build** — Run `npm run build`. Expected: success.
- [ ] **Step 5: Commit**

```bash
git add src/sections/WhyChooseUs.tsx src/sections/Stats.tsx src/App.tsx
git commit -m "feat: why-choose-us and stats sections"
```

---

### Task 8: Portfolio + Showreel sections

**Files:**
- Create: `src/sections/Portfolio.tsx`
- Create: `src/sections/Showreel.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `content.portfolio`, `content.reel`, `Reveal`, `Stagger`, `LazyVideo`, `Section`, `SectionHeading`, `Container`.
- Asset: portfolio thumbnails = 1920×1080 WebPs from `manifest.json` (role `background`); reel poster = any 16:9 WebP.
- Produces: `<Portfolio />`, `<Showreel />`.

- [ ] **Step 1: Portfolio**

Create `src/sections/Portfolio.tsx`:

```tsx
import { content } from '../content/content'
import { Stagger, StaggerItem } from '../components/motion/Stagger'
import { Section } from '../components/ui/Section'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Container } from '../components/ui/Container'

// Pick two 16:9 thumbnails from public/assets/img (see manifest.json role:"background").
const thumbs = ['/assets/img/260119f996927bf88a220565a996b6389bf82043.webp', '/assets/img/66359bc02e3e849dbc8560af26925a62a9e0c106.webp']

export function Portfolio() {
  return (
    <Section id="portfolio">
      <Container>
        <SectionHeading eyebrow="Case Studies" title={content.portfolio.title} />
        <p className="mx-auto mb-12 max-w-2xl text-center text-white/60">{content.portfolio.intro}</p>
        <Stagger className="grid gap-6 sm:grid-cols-2">
          {content.portfolio.items.map((it, i) => (
            <StaggerItem key={it.title} className="group overflow-hidden rounded-2xl border border-white/10">
              <img src={thumbs[i]} alt={it.title} loading="lazy"
                className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="p-5">
                <p className="text-sm text-accent">{it.tag}</p>
                <h3 className="font-display text-xl font-semibold">{it.title}</h3>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  )
}
```

- [ ] **Step 2: Showreel (self-hosted lazy video)**

Create `src/sections/Showreel.tsx`:

```tsx
import { content } from '../content/content'
import { Reveal } from '../components/motion/Reveal'
import { LazyVideo } from '../components/motion/LazyVideo'
import { Section } from '../components/ui/Section'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Container } from '../components/ui/Container'

export function Showreel() {
  return (
    <Section id="reel" className="bg-white/[0.02]">
      <Container>
        <SectionHeading eyebrow="Showreel 2025" title={content.reel.title} />
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-white/10">
            <LazyVideo src={content.reel.src} className="aspect-video w-full" />
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
```

- [ ] **Step 3: Add to App** — insert after `<Stats />`.
- [ ] **Step 4: Build + verify video serves**

Run:
```bash
npm run build && npm run preview -- --port 4173 &
sleep 2
curl -s -o /dev/null -w "video %{http_code}\n" http://localhost:4173/video/reel-2025.mp4
kill %1
```
Expected: build success, `video 200`.

- [ ] **Step 5: Commit**

```bash
git add src/sections/Portfolio.tsx src/sections/Showreel.tsx src/App.tsx
git commit -m "feat: portfolio and self-hosted showreel sections"
```

---

### Task 9: Testimonials + Academy sections

**Files:**
- Create: `src/sections/Testimonials.tsx`
- Create: `src/sections/Academy.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `content.testimonials`, `content.academy`, `Reveal`, `Section`, `SectionHeading`, `Container`.
- Produces: `<Testimonials />`, `<Academy />`.

- [ ] **Step 1: Testimonials**

Create `src/sections/Testimonials.tsx`:

```tsx
import { content } from '../content/content'
import { Reveal } from '../components/motion/Reveal'
import { Section } from '../components/ui/Section'
import { Container } from '../components/ui/Container'

export function Testimonials() {
  return (
    <Section id="testimonials">
      <Container>
        <p className="mb-12 text-center text-white/60">{content.trust.proof}</p>
        {content.testimonials.map((t) => (
          <Reveal key={t.name}>
            <figure className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
              <blockquote className="font-display text-2xl leading-relaxed">"{t.quote}"</blockquote>
              <figcaption className="mt-6 text-white/60">
                <span className="font-semibold text-white">{t.name}</span> — {t.role}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </Container>
    </Section>
  )
}
```

- [ ] **Step 2: Academy**

Create `src/sections/Academy.tsx`:

```tsx
import { content } from '../content/content'
import { Reveal } from '../components/motion/Reveal'
import { Section } from '../components/ui/Section'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'

export function Academy() {
  return (
    <Section id="academy" className="bg-gradient-to-br from-brand/20 to-transparent">
      <Container>
        <Reveal>
          <div className="flex flex-col items-center gap-6 text-center">
            <p className="text-sm uppercase tracking-widest text-accent">GaByte Academy</p>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">{content.academy.title}</h2>
            <p className="max-w-xl text-white/70">{content.academy.body}</p>
            <Button href="#contact">Learn more</Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
```

- [ ] **Step 3: Add to App** — insert after `<Showreel />`.
- [ ] **Step 4: Build** — Run `npm run build`. Expected: success.
- [ ] **Step 5: Commit**

```bash
git add src/sections/Testimonials.tsx src/sections/Academy.tsx src/App.tsx
git commit -m "feat: testimonials and academy sections"
```

---

### Task 10: FAQ (animated accordion) + Contact + Footer

**Files:**
- Create: `src/sections/Faq.tsx`
- Create: `src/sections/Contact.tsx`
- Create: `src/sections/Footer.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `content.faq`, `content.contact`, `content.footer`, `AnimatePresence`/`motion` from `motion/react`, `Reveal`, `Section`, `SectionHeading`, `Container`, `Button`.
- Produces: `<Faq />`, `<Contact />`, `<Footer />`.

- [ ] **Step 1: FAQ accordion**

Create `src/sections/Faq.tsx`:

```tsx
import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { content } from '../content/content'
import { Section } from '../components/ui/Section'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Container } from '../components/ui/Container'

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <Section id="faq">
      <Container>
        <SectionHeading eyebrow="FAQ" title="Questions, answered" />
        <div className="mx-auto max-w-2xl divide-y divide-white/10">
          {content.faq.map((f, i) => (
            <div key={f.q}>
              <button onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between py-5 text-left font-display text-lg">
                {f.q}
                <span className="text-accent">{open === i ? '−' : '+'}</span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                    className="overflow-hidden pb-5 text-white/60">{f.a}</motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
```

- [ ] **Step 2: Contact form**

Create `src/sections/Contact.tsx`:

```tsx
import { useState } from 'react'
import { content } from '../content/content'
import { Reveal } from '../components/motion/Reveal'
import { Section } from '../components/ui/Section'
import { Container } from '../components/ui/Container'

export function Contact() {
  const [sent, setSent] = useState(false)
  return (
    <Section id="contact" className="bg-white/[0.02]">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">{content.contact.title}</h2>
            <form className="mt-8 flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
              <textarea required rows={4} placeholder={content.contact.placeholder}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white outline-none focus:border-brand" />
              <button type="submit" className="rounded-full bg-brand px-7 py-3 font-medium text-white">Send</button>
              {sent && <p className="text-accent">Form submitted — thank you!</p>}
            </form>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
```

- [ ] **Step 3: Footer**

Create `src/sections/Footer.tsx`:

```tsx
import { content } from '../content/content'
import { Container } from '../components/ui/Container'

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-12">
      <Container className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <p className="font-display text-xl font-bold">Gamegabyte Studio</p>
        <nav className="flex flex-wrap justify-center gap-6 text-sm text-white/50">
          {content.footer.links.map((l) => <a key={l} href="#" className="hover:text-accent">{l}</a>)}
        </nav>
        <p className="text-sm text-white/40">{content.footer.tagline}</p>
      </Container>
    </footer>
  )
}
```

- [ ] **Step 4: Final App composition**

Replace `src/App.tsx` with all 13 sections in order:

```tsx
import { Hero } from './sections/Hero'
import { TrustBar } from './sections/TrustBar'
import { Services } from './sections/Services'
import { WorkProcess } from './sections/WorkProcess'
import { WhyChooseUs } from './sections/WhyChooseUs'
import { Stats } from './sections/Stats'
import { Portfolio } from './sections/Portfolio'
import { Showreel } from './sections/Showreel'
import { Testimonials } from './sections/Testimonials'
import { Academy } from './sections/Academy'
import { Faq } from './sections/Faq'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'

function App() {
  return (
    <main className="min-h-screen bg-ink text-white">
      <Hero />
      <TrustBar />
      <Services />
      <WorkProcess />
      <WhyChooseUs />
      <Stats />
      <Portfolio />
      <Showreel />
      <Testimonials />
      <Academy />
      <Faq />
      <Contact />
      <Footer />
    </main>
  )
}
export default App
```

- [ ] **Step 5: Build + full smoke test**

Run:
```bash
npm run build && npm run preview -- --port 4173 &
sleep 2
curl -s -o /dev/null -w "home %{http_code}\n" http://localhost:4173/
kill %1
```
Expected: build success, `home 200`.

- [ ] **Step 6: Commit**

```bash
git add src/sections src/App.tsx
git commit -m "feat: faq, contact, footer; compose full site"
```

---

### Task 11: Final polish — SEO meta, favicon, prod verification

**Files:**
- Modify: `index.html`
- Create: `public/assets/img/` favicon reference (use the 99×99 icon WebP)

**Interfaces:**
- Consumes: meta values from `docs/legacy-site/raw/index.html` (`og:title`, description).
- Produces: production-ready `index.html`.

- [ ] **Step 1: Update document head**

Replace the `<title>` and add meta in `index.html` `<head>`:

```html
    <title>Gamegabyte Studio</title>
    <meta name="description" content="A game website studio connecting creativity with measurable success — UI/UX, web development, and marketing analytics for game studios." />
    <meta property="og:title" content="Gamegabyte Studio" />
    <meta property="og:type" content="website" />
    <link rel="icon" href="/assets/img/cd9d6a45540edadf4778c6654fa8c3501df46b99.webp" />
```

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: no errors (fix any unused imports flagged).

- [ ] **Step 3: Production build + bundle size check**

Run: `npm run build`
Expected: success; note the JS gzip size in output (should remain reasonable for a marketing site).

- [ ] **Step 4: Confirm no raw PNGs ship to dist**

Run:
```bash
find dist -name '*.png' | wc -l
```
Expected: `0` (only WebP referenced).

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: SEO meta, favicon, production verification"
```

---

## Self-Review

**Spec coverage** (full 13-section rebuild + asset optimization, per CONTENT.md):
- Hero → Task 5 · TrustBar → Task 5 · Services → Task 6 · WorkProcess → Task 6 · WhyChooseUs → Task 7 · Stats → Task 7 · Portfolio → Task 8 · Showreel (self-hosted video) → Task 8 · Testimonials → Task 9 · Academy → Task 9 · FAQ → Task 10 · Contact → Task 10 · Footer → Task 10.
- Asset optimization (PNG→WebP, fonts/video folders) → Task 1. Theme/fonts → Task 2. Animation primitives → Task 3. SEO/favicon → Task 11.

**Placeholder scan:** No `TBD`/"handle edge cases" steps. The only `TODO-COPY` markers are JSX comments where the *source site itself* used Lorem ipsum (documented in Global Constraints). Two asset filenames in Task 8 (`thumbs`) are concrete examples from `manifest.json`; the implementer may swap for better-matching art after viewing `public/assets/img/`.

**Type/path consistency:** `content` keys defined in Task 4 (`hero`, `trust`, `services`, `process`, `why`, `stats`, `portfolio`, `reel`, `testimonials`, `academy`, `faq`, `contact`, `footer`) are exactly the keys consumed in Tasks 5–10. Motion primitive names (`Reveal`, `Stagger`/`StaggerItem`, `Marquee`, `LazyVideo`) and UI primitives (`Container`, `Section`, `SectionHeading`, `Button`) are defined in Tasks 3–4 and used consistently thereafter. Asset paths use `/assets/img/*.webp`, `/fonts/...`, `/video/reel-2025.mp4` throughout.
```
