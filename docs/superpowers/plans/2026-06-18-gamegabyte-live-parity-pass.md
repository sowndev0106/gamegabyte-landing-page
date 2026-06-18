# Gamegabyte Live Parity Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the current React rebuild match the live `https://gamegabyte.com/` page as closely as practical, with semantic asset folders and screenshot-based verification.

**Architecture:** Keep the existing React section architecture, but replace hash-only asset references with a semantic asset map in `src/content/content.ts`. Tune the page visually section-by-section using live screenshots as the source of truth, with header/hero as the highest-priority parity target.

**Tech Stack:** React 19, Vite 8, TypeScript, Tailwind CSS v4, Motion 12, Playwright CLI screenshots, WebP assets under `public/assets/img/`.

## Global Constraints

- Match the live black/lime/purple art direction.
- Asset paths must be semantic and grouped under `brand/`, `clients/`, `portfolio/`, `backgrounds/`, and `icons/`.
- `public/assets/img/4038f95b0cd6c2746fe4f2da7590b09366d59ac2.webp` must become `public/assets/img/clients/sycamore-logo.webp`.
- React section components must not reference hash-only asset paths directly.
- Showreel must use `/video/reel-2025.mp4` and must not use a client logo as poster.
- Portfolio cards must use game UI/showcase imagery, not client logos.
- `npm run build` and `npm run lint` must pass.
- Local homepage and local video must return HTTP 200.
- `dist` must ship zero PNG files.

---

## File Structure

- Modify `src/content/content.ts`: Own all semantic asset references and live-parity copy.
- Modify `src/sections/Header.tsx`: Live-like GAME/GABYTE logo, nav, and lime CTA.
- Modify `src/sections/Hero.tsx`: Live hero scale, spacing, black stage, CTA pair, plus decorations.
- Modify `src/sections/TrustBar.tsx`: Use semantic client logo assets.
- Modify `src/sections/Portfolio.tsx`: Use semantic portfolio assets.
- Modify `src/sections/Showreel.tsx`: Use video plus non-logo poster.
- Modify remaining `src/sections/*.tsx`: Tighten visual parity, spacing, colors, and rectangular treatment.
- Move files under `public/assets/img/`: Create semantic subfolders and remove direct hash path dependency from code.
- Create/update screenshots under `docs/legacy-site/screenshots/`: E2E live/local comparison.

---

### Task 1: Semantic Asset Taxonomy

**Files:**
- Modify: `public/assets/img/**`
- Modify: `src/content/content.ts`
- Create: `docs/legacy-site/screenshots/gamegabyte-assets-semantic-contact-sheet.png`

**Interfaces:**
- Produces: `assets` object in `src/content/content.ts` with keys `brand`, `clients`, `backgrounds`, `portfolio`, `icons`, `video`.
- Consumes: existing optimized WebP files in `public/assets/img/*.webp`.

- [ ] **Step 1: Create semantic asset folders**

Run:

```bash
mkdir -p public/assets/img/brand public/assets/img/clients public/assets/img/portfolio public/assets/img/backgrounds public/assets/img/icons
```

Expected: five semantic folders exist under `public/assets/img/`.

- [ ] **Step 2: Move known client logos into `clients/`**

Run:

```bash
mv public/assets/img/4038f95b0cd6c2746fe4f2da7590b09366d59ac2.webp public/assets/img/clients/sycamore-logo.webp
mv public/assets/img/433b9836e8cff75088caed5999e5aac59c4987e7.webp public/assets/img/clients/disney-speedstorm-logo.webp
mv public/assets/img/5dc34d4a7e12a45b0f714d1b05bfda4ad165d40b.webp public/assets/img/clients/tally-logo.webp
mv public/assets/img/0b5e7daef71d4c3dab074e8b6681942138ca210b.webp public/assets/img/clients/seedify-logo.webp
```

Expected: the Sycamore, Speedstorm, Tally, and Seedify logo files live in `public/assets/img/clients/`.

- [ ] **Step 3: Move known identity/icon assets**

Run:

```bash
mv public/assets/img/cd9d6a45540edadf4778c6654fa8c3501df46b99.webp public/assets/img/icons/gamegabyte-icon.webp
mv public/assets/img/05ccf6a0ab369ec013ecd173f35b8fda7bada12b.webp public/assets/img/icons/small-round-avatar.webp
```

Expected: icon-like assets live in `public/assets/img/icons/`.

- [ ] **Step 4: Move broad decorative and portfolio assets**

Run:

```bash
mv public/assets/img/bfa7bdefb3f47ed0ebdc8628ac372d588072421e.webp public/assets/img/backgrounds/hero-dark-game-scene.webp
mv public/assets/img/a679ae9ede79cfbe23bd01ce70700bc31c9703f2.webp public/assets/img/backgrounds/pixel-trees-strip.webp
mv public/assets/img/260119f996927bf88a220565a996b6389bf82043.webp public/assets/img/portfolio/beyond-the-keep-menu.webp
mv public/assets/img/66359bc02e3e849dbc8560af26925a62a9e0c106.webp public/assets/img/portfolio/season-pass-character.webp
mv public/assets/img/549c806684162d5909a2c765b10f159169bc22b4.webp public/assets/img/portfolio/crafting-inventory-ui.webp
mv public/assets/img/c82c5959671f33d88ddc3de7e32a5b0c8e0fba31.webp public/assets/img/portfolio/nova-core-ui.webp
mv public/assets/img/764b832532c0423237ea0580c779994aac5d557d.webp public/assets/img/portfolio/gameplay-hud-desert.webp
mv public/assets/img/ba1c6f87a156aaff9af0e2ac6dbf65b852daa410.webp public/assets/img/portfolio/awakening-screen.webp
```

Expected: known game UI/showcase imagery lives in `public/assets/img/portfolio/` and background art in `backgrounds/`.

- [ ] **Step 5: Move remaining hash WebPs into `portfolio/unsorted-*` or `backgrounds/unsorted-*` by visual role**

Inspect the asset contact sheet and move each remaining root-level `.webp` out of `public/assets/img/`. Use descriptive names when clear; use `portfolio/unsorted-<short-hash>.webp` only when unclear.

Run:

```bash
find public/assets/img -maxdepth 1 -name '*.webp'
```

Expected: no root-level `.webp` files remain.

- [ ] **Step 6: Update `src/content/content.ts` asset map**

Replace the existing `assets` constant with:

```ts
export const assets = {
  brand: {
    icon: '/assets/img/icons/gamegabyte-icon.webp',
  },
  clients: [
    { name: 'Sycamore', logo: '/assets/img/clients/sycamore-logo.webp' },
    { name: 'Disney Speedstorm', logo: '/assets/img/clients/disney-speedstorm-logo.webp' },
    { name: 'Tally', logo: '/assets/img/clients/tally-logo.webp' },
    { name: 'Seedify', logo: '/assets/img/clients/seedify-logo.webp' },
  ],
  backgrounds: {
    hero: '/assets/img/backgrounds/hero-dark-game-scene.webp',
    pixelTrees: '/assets/img/backgrounds/pixel-trees-strip.webp',
  },
  portfolio: [
    '/assets/img/portfolio/beyond-the-keep-menu.webp',
    '/assets/img/portfolio/season-pass-character.webp',
    '/assets/img/portfolio/crafting-inventory-ui.webp',
  ],
  reelPoster: '/assets/img/portfolio/nova-core-ui.webp',
  video: '/video/reel-2025.mp4',
} as const
```

Expected: section code can consume semantic paths without hash filenames.

- [ ] **Step 7: Generate semantic asset contact sheet**

Run:

```bash
montage public/assets/img/**/*.webp -thumbnail 180x120 -background '#111111' -fill white -pointsize 12 -set label '%d/%t' -geometry 240x170+10+10 docs/legacy-site/screenshots/gamegabyte-assets-semantic-contact-sheet.png
```

Expected: contact sheet is created and shows semantic folder/name labels.

- [ ] **Step 8: Build and commit**

Run:

```bash
npm run build
git add public/assets/img src/content/content.ts docs/legacy-site/screenshots/gamegabyte-assets-semantic-contact-sheet.png
git commit -m "refactor: organize gamegabyte assets by role"
```

Expected: build succeeds and asset taxonomy is committed.

---

### Task 2: Header and Hero Live Parity

**Files:**
- Modify: `src/sections/Header.tsx`
- Modify: `src/sections/Hero.tsx`
- Modify: `src/components/ui/Button.tsx`
- Modify: `src/index.css`

**Interfaces:**
- Consumes: `content.hero`, `assets.backgrounds.hero`.
- Produces: Above-the-fold viewport visually close to live desktop/mobile screenshots.

- [ ] **Step 1: Header sizing and positioning**

Update `Header.tsx` so the header is 80px desktop, black, thin bottom border, left wordmark, centered nav, and lime CTA on the right. Use text-based wordmark until a true Gamegabyte logo asset is available:

```tsx
<span className="block font-display text-[32px] font-black uppercase leading-[0.78] tracking-tight text-white">
  Game
  <span className="block text-[15px] tracking-[0.42em]">Gabyte</span>
</span>
```

Expected: header resembles live screenshot more than current small local header.

- [ ] **Step 2: Hero black stage**

Update `Hero.tsx` to use black as the dominant surface and keep the background art very subtle:

```tsx
<section id="home" className="relative flex min-h-screen items-center overflow-hidden bg-black pt-20">
  <img src={assets.backgrounds.hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.08]" />
  <div className="absolute inset-0 bg-black/70" />
```

Expected: hero reads closer to the live mostly-black viewport.

- [ ] **Step 3: Hero typography and position**

Set hero content lower and larger on desktop:

```tsx
<Stagger className="mx-auto flex max-w-[980px] translate-y-20 flex-col items-center gap-7 text-center sm:translate-y-28">
```

Use:

```tsx
className="font-display text-[58px] font-bold leading-[1.04] text-white sm:text-[92px] lg:text-[118px]"
```

Expected: hero headline size and vertical position are close to live desktop.

- [ ] **Step 4: CTA buttons**

Ensure `Button.tsx` uses square/rectangular live-style buttons, not rounded pills:

```tsx
className={`inline-flex min-h-16 items-center justify-center gap-2 border px-8 py-4 text-base font-bold uppercase ${classes}`}
```

Expected: CTAs match live rectangular button language.

- [ ] **Step 5: Decorative plus marks**

Place lime/purple plus marks close to live:

```tsx
<div className="absolute left-[17%] top-[31%] text-2xl font-black text-accent opacity-70">+</div>
<div className="absolute right-[13%] top-[33%] text-2xl font-black text-purple-light opacity-80">+</div>
<div className="absolute left-[15%] top-[53%] rotate-12 text-8xl font-black text-purple-light opacity-80">+</div>
```

Expected: plus decorations visually align with live screenshot.

- [ ] **Step 6: Verify and commit**

Run:

```bash
npm run build
npm run lint
git add src/sections/Header.tsx src/sections/Hero.tsx src/components/ui/Button.tsx src/index.css
git commit -m "feat: match live header and hero"
```

Expected: build/lint pass and the above-the-fold parity changes are committed.

---

### Task 3: Section and Asset Usage Parity

**Files:**
- Modify: `src/sections/TrustBar.tsx`
- Modify: `src/sections/Services.tsx`
- Modify: `src/sections/WorkProcess.tsx`
- Modify: `src/sections/WhyChooseUs.tsx`
- Modify: `src/sections/Stats.tsx`
- Modify: `src/sections/Portfolio.tsx`
- Modify: `src/sections/Showreel.tsx`
- Modify: `src/sections/Testimonials.tsx`
- Modify: `src/sections/Academy.tsx`
- Modify: `src/sections/Faq.tsx`
- Modify: `src/sections/Contact.tsx`
- Modify: `src/sections/Footer.tsx`

**Interfaces:**
- Consumes: semantic `assets` map from Task 1 and `content`.
- Produces: section sequence that remains complete but uses correct asset categories and live-like visual treatment.

- [ ] **Step 1: TrustBar uses client logos**

Update `TrustBar.tsx` to render `assets.clients` logos instead of text-only partner names:

```tsx
{assets.clients.map((client) => (
  <img key={client.name} src={client.logo} alt={client.name} loading="lazy" className="h-10 w-auto max-w-48 object-contain opacity-70 grayscale" />
))}
```

Expected: client/logo strip uses Sycamore/Speedstorm/Tally/Seedify assets.

- [ ] **Step 2: Portfolio uses portfolio assets only**

Update `Portfolio.tsx` to use `assets.portfolio` and ensure no client logo path appears in portfolio thumbnails.

Run:

```bash
rg "clients/" src/sections/Portfolio.tsx
```

Expected: no matches.

- [ ] **Step 3: Showreel uses non-logo poster**

Update `Showreel.tsx` to use `assets.reelPoster` and `assets.video`.

Run:

```bash
rg "clients/" src/sections/Showreel.tsx
```

Expected: no matches.

- [ ] **Step 4: Tighten rectangular live styling across sections**

For card-like elements in services/process/why/portfolio/testimonials/contact, remove rounded corners and keep borders thin:

```tsx
className="border border-white/10 bg-white/[0.045] p-6"
```

Expected: sections visually align better with live’s sharp-edged style.

- [ ] **Step 5: Build and commit**

Run:

```bash
npm run build
npm run lint
git add src/sections
git commit -m "feat: align sections with live asset usage"
```

Expected: build/lint pass and section parity changes are committed.

---

### Task 4: E2E Screenshot Verification and Final Fixes

**Files:**
- Create/Modify: `docs/legacy-site/screenshots/e2e-live-desktop-full.png`
- Create/Modify: `docs/legacy-site/screenshots/e2e-live-mobile-full.png`
- Create/Modify: `docs/legacy-site/screenshots/e2e-local-desktop-full.png`
- Create/Modify: `docs/legacy-site/screenshots/e2e-local-mobile-full.png`

**Interfaces:**
- Consumes: production build served by Vite preview.
- Produces: screenshot evidence and final clean branch.

- [ ] **Step 1: Build and start preview**

Run:

```bash
npm run build
npm run preview -- --port 4173
```

Expected: preview starts at `http://localhost:4173/`.

- [ ] **Step 2: Capture local screenshots**

Run in a second shell:

```bash
npx playwright screenshot --full-page --viewport-size=1440,1200 http://localhost:4173/ docs/legacy-site/screenshots/e2e-local-desktop-full.png
npx playwright screenshot --full-page --viewport-size=390,1200 http://localhost:4173/ docs/legacy-site/screenshots/e2e-local-mobile-full.png
```

Expected: local desktop/mobile screenshots are updated.

- [ ] **Step 3: Capture live screenshots**

Run:

```bash
npx playwright screenshot --full-page --viewport-size=1440,1200 https://gamegabyte.com/ docs/legacy-site/screenshots/e2e-live-desktop-full.png
npx playwright screenshot --full-page --viewport-size=390,1200 https://gamegabyte.com/ docs/legacy-site/screenshots/e2e-live-mobile-full.png
```

Expected: live desktop/mobile screenshots are updated. Live may only capture the visible Figma frame viewport.

- [ ] **Step 4: Verify endpoints and raw asset policy**

Run:

```bash
curl -s -o /dev/null -w "home %{http_code}\n" http://localhost:4173/
curl -s -o /dev/null -w "video %{http_code}\n" http://localhost:4173/video/reel-2025.mp4
find dist -name '*.png' | wc -l
rg "/assets/img/[0-9a-f]{40}\\.webp" src
```

Expected:

- `home 200`
- `video 200`
- `0`
- no hash-only WebP matches in `src`

- [ ] **Step 5: Stop preview, commit screenshots**

Stop the preview process with `Ctrl+C`, then run:

```bash
git add docs/legacy-site/screenshots
git commit -m "test: capture live parity screenshots"
```

Expected: screenshot evidence committed.

- [ ] **Step 6: Final build/lint and clean status**

Run:

```bash
npm run build
npm run lint
git status --short
```

Expected: build/lint pass and working tree is clean.

---

## Self-Review

**Spec coverage:** Asset taxonomy is Task 1. Header/hero live parity is Task 2. Remaining section parity and correct asset usage is Task 3. E2E screenshots and verification gates are Task 4.

**Placeholder scan:** No forbidden placeholder markers or fill-in-later steps. The only flexible step is Task 1 Step 5 for unknown assets, but it gives an exact naming fallback and verification command.

**Type consistency:** `assets.brand`, `assets.clients`, `assets.backgrounds`, `assets.portfolio`, `assets.reelPoster`, and `assets.video` are defined in Task 1 and consumed by Tasks 2-3.
