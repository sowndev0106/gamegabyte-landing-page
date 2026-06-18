# Gamegabyte All Sections Live Parity Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the React rebuild so every visible Gamegabyte section follows the live site order, copy, assets, spacing, and responsive behavior as closely as the cloned source allows.

**Architecture:** Keep the app as a single-page React composition with one focused file per section. Use `src/content/content.ts` as the content and asset contract, then let each section consume that contract with live-site class targets from `docs/legacy-site/raw/component.js` and screenshot evidence. Preserve the existing Vite/Tailwind/Motion setup and use self-hosted assets already organized under `public/assets/img/` and `public/video/`.

**Tech Stack:** React 19, Vite 8, TypeScript 6, Tailwind CSS v4, Motion 12, Playwright CLI for screenshot verification, self-hosted WebP assets, self-hosted MP4 reel.

## Global Constraints

- Live parity wins over redesign: match `https://gamegabyte.com/` first, then keep code maintainable.
- Desktop reference viewport: `1440x1200`; mobile reference viewport: `390x844`.
- Live screenshot evidence is stored at `docs/legacy-site/screenshots/plan-audit-live-desktop-full.png` and `docs/legacy-site/screenshots/plan-audit-live-mobile-full.png`.
- Local screenshot evidence is stored at `docs/legacy-site/screenshots/plan-audit-local-desktop-full.png` and `docs/legacy-site/screenshots/plan-audit-local-mobile-full.png`.
- Live raw component evidence is stored at `docs/legacy-site/raw/component.js`; use this for sections that the live home screenshot does not expose in the first rendered scroll height.
- Hero background must use `public/assets/img/backgrounds/gamegabyte-pattern-glow.webp`, not `hero-dark-game-scene.webp`.
- Do not use `public/assets/img/icons/gamegabyte-icon.webp` as the brand logo; that file is an avatar asset.
- Keep the self-hosted reel `public/video/reel-2025.mp4`; do not replace it with a YouTube iframe.
- Keep semantic asset folders: `backgrounds/`, `clients/`, `icons/`, `portfolio/`.
- Build command `npm run build` and lint command `npm run lint` must pass after each task.
- Verification screenshots must wait for render and must scroll through the page so lazy images load before the final full-page capture.

---

## Section Audit

| Area | Live evidence | Current local | Required update |
| --- | --- | --- | --- |
| Header | Desktop has 80px black header, blocky GAME/GABYTE wordmark, centered nav, lime `LET'S TALK` button with arrow; mobile has wordmark and hamburger. | Header has text approximation, no mobile menu, CTA hidden only by breakpoint. | Add brand logo component, mobile menu state, exact nav copy, arrow CTA. |
| Hero | Pattern G background, no eyebrow/tagline, headline starts higher, desktop and mobile show two headline lines, CTA buttons match live sizing. | Uses dark game art at low opacity, includes tagline, content lower, mobile wraps into many lines. | Switch background asset, remove hero tagline, tune vertical placement and font sizes. |
| Showreel | `Showreel 2025` appears directly after hero and is visible at bottom of desktop viewport; raw bundle shows 1166px aspect-video player and client strip. | Showreel appears after Portfolio and uses `Gamegabyte Studio Reel 2025` heading. | Move after Hero, render live heading, keep local MP4, add client strip under the player. |
| Client Strip | Raw bundle has Sycamore, Disney Speedstorm, Tally, Seedify logos around the showreel area. | TrustBar appears immediately after hero with extra copy. | Move client strip into the showreel/trust area and remove extra proof copy from the first viewport. |
| Stats | Raw bundle: `Growing with Game Studios Worldwide`, stats `25+`, `5+`, `100%`, `2024`. | Stats are `2018`, `100+`, `7+`, only three columns. | Update values and use four-column layout with subtitles. |
| Services | Raw services page has six cards: `Game landing page`, `UI/UX Design`, `Marketing Analytics`, `Development`, `responsive design`, `community features`. | Local has five dark cards and different order. | Use six live cards, white/light card surface on purple patterned section. |
| Technology | Raw services page includes `our technology` cards: Documentation, Design, Development, Deployment. | No technology section exists. | Add a compact technology band inside `Services.tsx` after services cards. |
| Work Process | Current section content matches live-ish strategy steps but visual is too thin and not tied to surrounding live page rhythm. | Dark narrow boxes. | Keep four steps, align spacing, lime numbers, and section width with live stats/services rhythm. |
| About/Why | Live has strategic partner language and design-led claims; local content is close but the section uses pixel-tree art and low-density cards. | Four dark cards under pixel-tree band. | Keep four value cards, reduce decorative mismatch, align copy and spacing with live. |
| Portfolio | Raw bundle: `Project Showcase`, intro, tags `UI/UX`, `FRONTEND`, `BACKEND`, large showcase cards. | Three cards; lazy images do not appear in full-page screenshot because capture does not scroll first. | Use larger two/three-card showcase, real image loading in verification, live-style chips. |
| Testimonials | Raw bundle has Mickael Grants testimonial art/name; live copy emphasizes strategic partner. | Single dark quote card, acceptable copy but not live layout. | Style as live trust card with avatar/name block and centered quote. |
| Academy | Nav includes `GaByte Academy`; local block exists but is oversized lime rectangle. | Simple lime block. | Keep section but reduce height, align button and copy with live CTA language. |
| FAQ | Raw services page has purple background, white accordion cards, numbered questions, `ask a question` CTA. | Dark FAQ with thin dividers and plus signs. | Rebuild FAQ as purple panel with white cards and numbered questions. |
| Contact | Raw bundle has purple background, patterned overlay, white name/email/message fields and `Have an idea? Let's talk.` heading. | Black section with one textarea only. | Add name/email/message fields, purple patterned background, centered copy. |
| Footer | Raw bundle has multi-column footer: Services/Support/Legal and contact/link groups. | One-row simple footer. | Rebuild footer columns and brand block. |

## File Structure

- Create `src/components/brand/GamegabyteLogo.tsx`: reusable wordmark component for header and footer.
- Modify `src/content/content.ts`: single contract for hero, nav, clients, stats, services, technology, process, why, portfolio, testimonials, academy, FAQ, contact, and footer.
- Modify `src/App.tsx`: live-parity section order.
- Modify `src/sections/Header.tsx`: desktop nav, CTA, mobile hamburger menu.
- Modify `src/sections/Hero.tsx`: live background, headline, buttons, vertical rhythm.
- Modify `src/sections/Showreel.tsx`: immediately-after-hero player and client logos.
- Modify `src/sections/TrustBar.tsx`: render a compact logo strip consumed after Showreel.
- Modify `src/sections/Stats.tsx`: four live stats.
- Modify `src/sections/Services.tsx`: six service cards and technology band.
- Modify `src/sections/WorkProcess.tsx`: live-aligned four-step process.
- Modify `src/sections/WhyChooseUs.tsx`: strategic partner cards.
- Modify `src/sections/Portfolio.tsx`: live-style showcase cards and tags.
- Modify `src/sections/Testimonials.tsx`: centered testimonial block.
- Modify `src/sections/Academy.tsx`: compact academy CTA.
- Modify `src/sections/Faq.tsx`: purple FAQ with white numbered cards.
- Modify `src/sections/Contact.tsx`: three-field purple contact form.
- Modify `src/sections/Footer.tsx`: multi-column footer.
- Modify `src/components/ui/Button.tsx`: add arrow-capable CTA rendering used by Header/Hero/FAQ/Contact.

---

### Task 1: Content Contract And Section Order

**Files:**
- Modify: `src/content/content.ts`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: existing semantic asset files in `public/assets/img/` and `public/video/reel-2025.mp4`.
- Produces: `assets` and `content` constants consumed by every section.

- [ ] **Step 1: Replace `src/content/content.ts` with the live-parity contract**

```ts
export const assets = {
  clients: [
    { name: 'Sycamore', logo: '/assets/img/clients/sycamore-logo.webp' },
    { name: 'Disney Speedstorm', logo: '/assets/img/clients/disney-speedstorm-logo.webp' },
    { name: 'Tally', logo: '/assets/img/clients/tally-logo.webp' },
    { name: 'Seedify', logo: '/assets/img/clients/seedify-logo.webp' },
  ],
  backgrounds: {
    hero: '/assets/img/backgrounds/gamegabyte-pattern-glow.webp',
    pattern: '/assets/img/backgrounds/gamegabyte-pattern-glow.webp',
    pixelTrees: '/assets/img/backgrounds/pixel-tree-tiles.webp',
    characterWide: '/assets/img/backgrounds/fantasy-character-wide.webp',
    mech: '/assets/img/backgrounds/mech-concept-art.webp',
  },
  portfolio: [
    '/assets/img/portfolio/combat-magic-scene.webp',
    '/assets/img/portfolio/fantasy-character-art.webp',
    '/assets/img/portfolio/beyond-the-keep-menu.webp',
  ],
  reelPoster: '/assets/img/portfolio/nova-core-ui.webp',
  video: '/video/reel-2025.mp4',
} as const

export const content = {
  nav: [
    { label: 'Home', href: '#home' },
    { label: 'Our Services', href: '#services' },
    { label: 'GaByte Academy', href: '#academy' },
    { label: 'Case Studies', href: '#portfolio' },
    { label: 'About Us', href: '#about' },
  ],
  hero: {
    headline: ['We Are The Game', 'Marketing Studio'],
    sub: 'From immersive websites to powerful digital strategies — we help your game win the market.',
    primaryCta: 'Case Study',
    secondaryCta: 'Connect with us',
  },
  reel: {
    title: 'Showreel 2025',
    ariaLabel: 'Gamegabyte Studio Reel 2025',
    src: assets.video,
  },
  trust: {
    title: 'Growing with Game Studios Worldwide',
    note: 'Delivering focused impact for game teams.',
  },
  stats: [
    { value: '25+', label: 'Studio Projects', note: 'Across AAA & mobile titles' },
    { value: '5+', label: 'Years in the Game Industry', note: 'Formerly From Gameloft & Partners' },
    { value: '100%', label: 'Design-Led Production', note: 'No templates. No shortcuts.' },
    { value: '2024', label: 'Studio Founded', note: 'Built for long-term collaboration' },
  ],
  services: [
    { title: 'Game landing page', body: 'Create impressive landing pages showcasing your game with unique design and high conversion rates.' },
    { title: 'UI/UX Design', body: 'Forge captivating landing pages that spotlight your game with cutting-edge design and optimized conversion strategies.' },
    { title: 'Marketing Analytics', body: 'Drive growth with data-driven insights. We transform raw data into actionable strategies, boosting user engagement and maximizing ROI.' },
    { title: 'Development', body: 'Develop stunning, high-performance landing pages that captivate players and drive conversions.' },
    { title: 'responsive design', body: 'Craft adaptable landing pages ensuring seamless experiences across all devices, enhancing user engagement and broadening your audience reach.' },
    { title: 'community features', body: 'Enhance player interaction with integrated forums, chats, and social feeds, fostering a vibrant community around your game.' },
  ],
  technology: [
    { title: 'Documentation', body: 'Cloud platforms where we store project info, making progress easy to follow and update with clients in real time.' },
    { title: 'Design', body: 'Cutting edge design tools with prototype workflows for fast review.' },
    { title: 'Development', body: 'Modern frontend builds tuned for launch pages and campaign performance.' },
    { title: 'Deployment', body: 'Release workflows that keep game campaigns stable after launch.' },
  ],
  process: [
    { step: '01', title: 'Consultation & Analysis', body: 'Understand your game, target audience, and marketing goals to develop the right strategy.' },
    { step: '02', title: 'Design & Concept', body: "Create mockups and prototypes that truly reflect your game's spirit and brand identity." },
    { step: '03', title: 'Development & Optimization', body: 'Code the website with modern technology, integrating SEO and analytics for optimal performance.' },
    { step: '04', title: 'Launch & Support', body: 'Deploy the website and provide technical support, plus training for your team.' },
  ],
  why: [
    { title: 'Lightning speed delivery', body: 'Fast turnaround without compromise.' },
    { title: 'Unbeatable Pricing', body: 'Competitive pricing without sacrificing quality, built to maximize ROI.' },
    { title: 'Gaming Expertise', body: 'A team of gamers who understand player psychology and what attracts game audiences.' },
    { title: 'Design-Led Production', body: 'No templates. No shortcuts. Visually attractive design from concept to final result.' },
  ],
  portfolio: {
    title: 'Project Showcase',
    intro: "Explore the impressive game marketing websites we've created for game developers worldwide.",
    tags: ['UI/UX', 'FRONTEND', 'BACKEND'],
    items: [
      { title: 'RPG Fantasy Quest', tag: 'UI/UX' },
      { title: 'Fantasy Character Campaign', tag: 'FRONTEND' },
      { title: 'Beyond The Keep', tag: 'BACKEND' },
    ],
  },
  testimonials: [
    { quote: "We're not just another agency. We're strategic partners helping your game succeed in the fiercely competitive market.", name: 'Mickael Grants', role: 'CEO of Apples to Oranges' },
  ],
  academy: {
    title: 'GaByte Academy',
    body: 'Training and resources for game studios.',
    cta: 'Learn more',
  },
  faq: [
    { q: 'How long does it take to build a game landing page?', a: 'Typically, a custom game landing page takes 2-4 weeks from initial concept to launch. This includes design, development, revisions, and optimization.' },
    { q: 'Do you provide ongoing support after launch?', a: 'Yes. We offer post-launch support including bug fixes, content updates, performance monitoring, and technical assistance.' },
    { q: 'Can you integrate with my existing game analytics?', a: 'Yes. We integrate with major analytics platforms and custom tracking setups so marketing metrics are captured clearly.' },
    { q: 'What makes your game marketing services different?', a: 'We combine gaming industry knowledge with design-led marketing production, built by people who understand game audiences.' },
  ],
  contact: {
    title: "Have an idea? Let's talk.",
    body: 'Visually attractive design from concept to final result. We create solutions that are bold and forward-looking.',
    fields: {
      name: 'Your name',
      email: 'Your email',
      message: 'Tell us about your idea',
    },
    cta: 'Send',
  },
  footer: {
    columns: [
      { title: 'Services', links: ['Development', 'Marketing', 'Design'] },
      { title: 'Support', links: ['Help Center', 'Contact Us', 'FAQ'] },
      { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'] },
    ],
    tagline: 'Connect with us',
  },
} as const
```

- [ ] **Step 2: Replace `src/App.tsx` with the live-parity section order**

```tsx
import { Header } from './sections/Header'
import { Hero } from './sections/Hero'
import { Showreel } from './sections/Showreel'
import { Stats } from './sections/Stats'
import { Services } from './sections/Services'
import { WorkProcess } from './sections/WorkProcess'
import { WhyChooseUs } from './sections/WhyChooseUs'
import { Portfolio } from './sections/Portfolio'
import { Testimonials } from './sections/Testimonials'
import { Academy } from './sections/Academy'
import { Faq } from './sections/Faq'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'

function App() {
  return (
    <main className="min-h-screen bg-ink text-white">
      <Header />
      <Hero />
      <Showreel />
      <Stats />
      <Services />
      <WorkProcess />
      <WhyChooseUs />
      <Portfolio />
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

- [ ] **Step 3: Run checks**

Run:
```bash
npm run build
npm run lint
```
Expected: both commands exit `0`.

- [ ] **Step 4: Commit**

```bash
git add src/content/content.ts src/App.tsx
git commit -m "feat: align content contract and section order with live"
```

---

### Task 2: Header And Hero Viewport Parity

**Files:**
- Create: `src/components/brand/GamegabyteLogo.tsx`
- Modify: `src/sections/Header.tsx`
- Modify: `src/sections/Hero.tsx`
- Modify: `src/components/ui/Button.tsx`

**Interfaces:**
- Consumes: `content.nav`, `content.hero`, `assets.backgrounds.hero`.
- Produces: a live-like first viewport on desktop and mobile.

- [ ] **Step 1: Create reusable wordmark**

Create `src/components/brand/GamegabyteLogo.tsx`:

```tsx
type GamegabyteLogoProps = {
  className?: string
}

export function GamegabyteLogo({ className = '' }: GamegabyteLogoProps) {
  return (
    <span className={`block text-white ${className}`} aria-label="Gamegabyte">
      <span className="block font-display text-[30px] font-black uppercase leading-[0.78] tracking-[-0.06em] sm:text-[42px]">
        GAME
      </span>
      <span className="mt-1 block font-display text-[12px] font-black uppercase leading-none tracking-[0.48em] sm:text-[16px]">
        GABYTE
      </span>
    </span>
  )
}
```

- [ ] **Step 2: Update the shared button so CTA arrows are consistent**

Change `src/components/ui/Button.tsx` so its props include `showArrow?: boolean` and render this inside the button content:

```tsx
{children}
{showArrow && <span aria-hidden="true" className="ml-2 text-lg leading-none">↗</span>}
```

Expected behavior: existing buttons render unchanged when `showArrow` is omitted; hero and header pass `showArrow`.

- [ ] **Step 3: Rebuild Header behavior**

Update `src/sections/Header.tsx` to:
- Use `useState(false)` for mobile menu.
- Render `<GamegabyteLogo />` instead of text logo markup.
- Keep desktop nav hidden below `lg`.
- Render a mobile hamburger button below `lg`.
- Render a black mobile dropdown with all nav links and the lime CTA.

The hamburger button markup:

```tsx
<button
  type="button"
  className="inline-flex h-11 w-11 items-center justify-center text-white lg:hidden"
  aria-label={open ? 'Close navigation' : 'Open navigation'}
  aria-expanded={open}
  onClick={() => setOpen((value) => !value)}
>
  <span className="relative block h-5 w-6">
    <span className={`absolute left-0 top-0 h-0.5 w-6 bg-current transition ${open ? 'translate-y-2 rotate-45' : ''}`} />
    <span className={`absolute left-0 top-2 h-0.5 w-6 bg-current transition ${open ? 'opacity-0' : ''}`} />
    <span className={`absolute left-0 top-4 h-0.5 w-6 bg-current transition ${open ? '-translate-y-2 -rotate-45' : ''}`} />
  </span>
</button>
```

- [ ] **Step 4: Rebuild Hero first viewport**

Update `src/sections/Hero.tsx` to:
- Use `assets.backgrounds.hero` as a full-cover image at visible opacity.
- Remove the current `content.hero.tagline` eyebrow.
- Set content wrapper to `lg:-mt-32` so `Showreel 2025` is visible at the bottom of `1440x1200`.
- Use desktop `xl:text-[90px]`, mobile `text-[36px]`, and `leading-tight`.
- Render `content.hero.headline[0]` and `content.hero.headline[1]` on two block lines; wrap only the word `Game` in lime.

The headline markup:

```tsx
<h1 className="font-display text-[36px] font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-[90px]">
  <span className="block">
    We Are The <span className="text-accent">Game</span>
  </span>
  <span className="block">Marketing Studio</span>
</h1>
```

- [ ] **Step 5: Capture first-viewport comparison**

Run:
```bash
npx playwright screenshot --wait-for-timeout=3000 --viewport-size=1440,1200 https://gamegabyte.com/ docs/legacy-site/screenshots/parity-live-desktop-viewport.png
npx playwright screenshot --wait-for-timeout=1500 --viewport-size=1440,1200 http://localhost:5173/ docs/legacy-site/screenshots/parity-local-desktop-viewport.png
npx playwright screenshot --wait-for-timeout=3000 --viewport-size=390,844 https://gamegabyte.com/ docs/legacy-site/screenshots/parity-live-mobile-viewport.png
npx playwright screenshot --wait-for-timeout=1500 --viewport-size=390,844 http://localhost:5173/ docs/legacy-site/screenshots/parity-local-mobile-viewport.png
```
Expected:
- Desktop local hero background is the purple G pattern.
- Desktop local header height and button placement match live within 16px.
- Desktop local shows `Showreel 2025` at the viewport bottom.
- Mobile local shows hamburger and a two-line hero headline.

- [ ] **Step 6: Run checks and commit**

```bash
npm run build
npm run lint
git add src/components/brand/GamegabyteLogo.tsx src/components/ui/Button.tsx src/sections/Header.tsx src/sections/Hero.tsx docs/legacy-site/screenshots/parity-*-viewport.png
git commit -m "feat: match live header and hero viewport"
```

---

### Task 3: Showreel And Client Strip

**Files:**
- Modify: `src/sections/Showreel.tsx`
- Modify: `src/sections/TrustBar.tsx`

**Interfaces:**
- Consumes: `content.reel`, `assets.video`, `assets.reelPoster`, `assets.clients`.
- Produces: showreel section directly after hero with a live-like heading and client logos.

- [ ] **Step 1: Update `Showreel.tsx` layout**

Set the section to:
- `className="relative w-full bg-black py-8 sm:py-12 lg:py-16"`.
- Heading text exactly `Showreel 2025`.
- Heading classes: `bg-gradient-to-r from-white via-[#f4f4f4] to-[#7a7a7a] bg-clip-text text-center font-display text-2xl font-bold capitalize text-transparent sm:text-3xl md:text-4xl lg:text-5xl xl:text-[56px]`.
- Video wrapper classes: `mx-auto mb-8 aspect-video w-[90%] overflow-hidden rounded-lg sm:mb-12 sm:w-[85%] lg:mb-16 lg:w-[1166px]`.
- Use `<LazyVideo src={content.reel.src} poster={assets.reelPoster} aria-label={content.reel.ariaLabel} />`.

- [ ] **Step 2: Update client strip**

Make `TrustBar.tsx` render only a compact logo strip:

```tsx
import { assets } from '../content/content'

export function TrustBar() {
  return (
    <div className="mx-auto flex w-full max-w-[980px] flex-wrap items-center justify-center gap-x-12 gap-y-6 px-5 opacity-80">
      {assets.clients.map((client) => (
        <img key={client.name} src={client.logo} alt={client.name} loading="lazy" className="max-h-8 w-auto object-contain grayscale" />
      ))}
    </div>
  )
}
```

Then import and render `<TrustBar />` at the bottom of `Showreel.tsx`.

- [ ] **Step 3: Run checks and commit**

```bash
npm run build
npm run lint
git add src/sections/Showreel.tsx src/sections/TrustBar.tsx
git commit -m "feat: place showreel and client strip after hero"
```

---

### Task 4: Stats, Services, And Technology

**Files:**
- Modify: `src/sections/Stats.tsx`
- Modify: `src/sections/Services.tsx`

**Interfaces:**
- Consumes: `content.trust`, `content.stats`, `content.services`, `content.technology`, `assets.backgrounds.pattern`.
- Produces: live stats band plus services/technology area matching raw bundle content.

- [ ] **Step 1: Update `Stats.tsx`**

Render:
- Outer section `className="relative overflow-hidden bg-black px-4 py-12 sm:px-6 sm:py-20 lg:py-40"`.
- Pattern background image `assets.backgrounds.pattern` at low opacity.
- Eyebrow `OUR NUMBER`.
- Heading `content.trust.title`.
- Body `content.trust.note`.
- Four-column grid: `grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4`.
- Each stat value classes: `font-display text-5xl font-bold text-accent sm:text-[64px]`.

- [ ] **Step 2: Update `Services.tsx`**

Render:
- Section id `services`.
- Purple background `bg-brand`.
- Pattern overlay using `assets.backgrounds.pattern` at `opacity-[0.18]`.
- Heading `Our services`.
- Six cards from `content.services`.
- Card classes: `relative min-h-[275px] bg-white p-8 text-black transition duration-300 hover:-translate-y-1 hover:scale-[1.03]`.
- Title classes: `font-display text-2xl font-semibold capitalize tracking-[-0.04em]`.
- Body classes: `mt-4 text-lg leading-normal text-black/70`.
- CTA text `view our portfolio` linking to `#portfolio`.

- [ ] **Step 3: Add technology band inside `Services.tsx`**

After the service cards, render:
- Wrapper classes: `bg-gradient-to-b from-[#232323] to-black py-20`.
- Heading `our technology`.
- Description `We leverage cutting-edge tools and innovative strategies to build immersive gaming experiences from the ground up.`
- Four cards from `content.technology`.
- Card classes: `min-h-[260px] border border-white/10 bg-white/[0.045] p-8`.

- [ ] **Step 4: Run checks and commit**

```bash
npm run build
npm run lint
git add src/sections/Stats.tsx src/sections/Services.tsx
git commit -m "feat: align stats services and technology sections"
```

---

### Task 5: Middle Content Sections

**Files:**
- Modify: `src/sections/WorkProcess.tsx`
- Modify: `src/sections/WhyChooseUs.tsx`
- Modify: `src/sections/Portfolio.tsx`
- Modify: `src/sections/Testimonials.tsx`
- Modify: `src/sections/Academy.tsx`

**Interfaces:**
- Consumes: `content.process`, `content.why`, `content.portfolio`, `content.testimonials`, `content.academy`, `assets.portfolio`, `assets.backgrounds.pixelTrees`.
- Produces: live-aligned middle page flow after services.

- [ ] **Step 1: Restyle `WorkProcess.tsx`**

Keep four steps from `content.process` and set:
- Section background `bg-black`.
- Heading eyebrow `OUR WORK PROCESS`.
- Heading `From strategy to launch`.
- Grid `grid gap-5 lg:grid-cols-4`.
- Step number classes `font-display text-5xl font-bold text-accent`.
- Card classes `border-t border-white/20 bg-white/[0.035] p-6`.

- [ ] **Step 2: Restyle `WhyChooseUs.tsx`**

Keep id `about`, add a pattern/art band with `assets.backgrounds.pixelTrees`, and render:
- Eyebrow `WHY CHOOSE US`.
- Heading `Strategic partners, not just an agency`.
- Four cards from `content.why`.
- Card classes `border border-white/10 bg-white/[0.035] p-6`.

- [ ] **Step 3: Restyle `Portfolio.tsx`**

Use:
- Section id `portfolio`.
- Heading `Project Showcase`.
- Intro from `content.portfolio.intro`.
- Tag chips from `content.portfolio.tags`.
- Three image cards using `assets.portfolio[index]`.
- Image must use `loading="lazy"` and fixed `aspect-[16/10]`.
- Card wrapper classes `group overflow-hidden bg-white text-black`.
- Tag classes `inline-flex bg-[#e8e8fd] px-3 py-2 text-[13px] font-semibold text-[#5d5c81]`.

- [ ] **Step 4: Restyle `Testimonials.tsx`**

Render one centered testimonial:
- Section background `bg-black`.
- Small uppercase line: `DON'T TAKE OUR WORD FOR IT. OVER 100+ PEOPLE TRUST US.`
- Card classes `mx-auto max-w-3xl bg-white/[0.055] px-8 py-10 text-center`.
- Quote classes `font-display text-2xl font-bold leading-snug text-white`.
- Name and role underneath in smaller muted text.

- [ ] **Step 5: Restyle `Academy.tsx`**

Render compact lime CTA:
- Section id `academy`.
- Wrapper `bg-accent px-5 py-14 text-center text-ink`.
- Eyebrow `GABYTE ACADEMY`.
- Heading `GaByte Academy`.
- Body and CTA from `content.academy`.
- CTA as dark button with arrow.

- [ ] **Step 6: Run checks and commit**

```bash
npm run build
npm run lint
git add src/sections/WorkProcess.tsx src/sections/WhyChooseUs.tsx src/sections/Portfolio.tsx src/sections/Testimonials.tsx src/sections/Academy.tsx
git commit -m "feat: align middle content sections with live"
```

---

### Task 6: FAQ, Contact, And Footer

**Files:**
- Modify: `src/sections/Faq.tsx`
- Modify: `src/sections/Contact.tsx`
- Modify: `src/sections/Footer.tsx`

**Interfaces:**
- Consumes: `content.faq`, `content.contact`, `content.footer`, `assets.backgrounds.pattern`.
- Produces: live-like closing sections.

- [ ] **Step 1: Rebuild `Faq.tsx`**

Render:
- Purple section `bg-brand`.
- Pattern overlay `assets.backgrounds.pattern` at `opacity-[0.18]`.
- Heading `FAQ`.
- Description: `We're not just another agency. We're strategic partners helping your game succeed in the fiercely competitive market.`
- White accordion cards with numbers `1` through `4`.
- Closed card icon background `#f1f2f9`; open card icon background `#601feb`.
- CTA button text `ask a question`.

- [ ] **Step 2: Rebuild `Contact.tsx`**

Render:
- Purple section `bg-brand`.
- Pattern overlay.
- Heading and body from `content.contact`.
- Controlled `name`, `email`, and `message` state.
- White input fields with black text.
- `message` textarea height at least `160px`.
- Lime submit button text from `content.contact.cta`.

- [ ] **Step 3: Rebuild `Footer.tsx`**

Render:
- Black footer.
- `<GamegabyteLogo />` at left/top.
- Column list from `content.footer.columns`.
- Column heading classes `font-display text-lg font-semibold uppercase text-white`.
- Link classes `text-white/65 transition hover:text-accent`.
- Bottom line containing `content.footer.tagline`.

- [ ] **Step 4: Run checks and commit**

```bash
npm run build
npm run lint
git add src/sections/Faq.tsx src/sections/Contact.tsx src/sections/Footer.tsx
git commit -m "feat: align faq contact and footer with live"
```

---

### Task 7: Full Visual Verification

**Files:**
- Create: `docs/legacy-site/screenshots/final-live-desktop-full.png`
- Create: `docs/legacy-site/screenshots/final-live-mobile-full.png`
- Create: `docs/legacy-site/screenshots/final-local-desktop-full.png`
- Create: `docs/legacy-site/screenshots/final-local-mobile-full.png`

**Interfaces:**
- Consumes: running local dev server at `http://localhost:5173/`.
- Produces: final screenshots and verification results.

- [ ] **Step 1: Start or confirm local server**

Run:
```bash
curl -I http://localhost:5173/ | sed -n '1,5p'
```
Expected: response includes `HTTP/1.1 200 OK`.

- [ ] **Step 2: Capture live screenshots**

Run:
```bash
npx playwright screenshot --full-page --wait-for-timeout=3000 --viewport-size=1440,1200 https://gamegabyte.com/ docs/legacy-site/screenshots/final-live-desktop-full.png
npx playwright screenshot --full-page --wait-for-timeout=3000 --viewport-size=390,844 https://gamegabyte.com/ docs/legacy-site/screenshots/final-live-mobile-full.png
```
Expected: live screenshots show the purple G pattern hero and mobile hamburger.

- [ ] **Step 3: Scroll local page before full-page screenshots**

Run:
```bash
node - <<'NODE'
import { chromium } from 'playwright'

const targets = [
  { path: 'docs/legacy-site/screenshots/final-local-desktop-full.png', width: 1440, height: 1200 },
  { path: 'docs/legacy-site/screenshots/final-local-mobile-full.png', width: 390, height: 844 },
]

for (const target of targets) {
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: target.width, height: target.height } })
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  const bodyHeight = await page.evaluate(() => document.body.scrollHeight)
  for (let y = 0; y <= bodyHeight; y += Math.floor(target.height * 0.75)) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y)
    await page.waitForTimeout(180)
  }
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.screenshot({ path: target.path, fullPage: true })
  await browser.close()
}
NODE
```
Expected: local portfolio and client images are visible in the screenshots.

- [ ] **Step 4: Verify assets and production build**

Run:
```bash
npm run build
npm run lint
find dist -type f -name '*.png' -print
rg -n "/assets/img/[a-f0-9]{40}\\.webp|gamegabyte-icon" src || true
```
Expected:
- Build exits `0`.
- Lint exits `0`.
- `find dist -type f -name '*.png' -print` prints no files.
- `rg` prints no matches.

- [ ] **Step 5: Commit verification screenshots**

```bash
git add docs/legacy-site/screenshots/final-*-full.png
git commit -m "test: capture final live parity screenshots"
```

---

## Self-Review

- Spec coverage: every current local section and every live/raw section identified in the audit table maps to Tasks 1 through 7.
- Placeholder scan: this plan uses exact section copy, paths, commands, screenshot names, class targets, and commit commands.
- Type consistency: `assets` and `content` names introduced in Task 1 are the names consumed by Tasks 2 through 7.
