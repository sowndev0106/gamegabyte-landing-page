# Cinematic Tech HUD UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the existing Gamegabyte landing page into a shorter, more varied Cinematic Tech HUD experience with restrained motion and stronger project emphasis.

**Architecture:** Keep the existing React section architecture and Motion dependency. Add two small reusable visual primitives, then update sections independently so ambient effects, pointer interaction, and reduced-motion behavior stay centralized. Reorder existing sections in `App.tsx`; do not add routes, backend behavior, or new dependencies.

**Tech Stack:** React 19, TypeScript 6, Tailwind CSS 4, Motion 12, Vite 8, Playwright 1.61.

## Global Constraints

- Preserve ink `#030213`, acid lime `#b6e802`, brand purple `#601feb`, Schibsted Grotesk, and Roboto.
- Use Motion and CSS only; add no animation package.
- Animate transform and opacity by default; avoid continuous glitch, scroll hijacking, custom cursors, and large 3D tilt.
- `prefers-reduced-motion` must show final states and disable ambient movement.
- Pointer-follow effects must run only when `(hover: hover) and (pointer: fine)` matches.
- Preserve current content and working interactions unless this plan explicitly changes their presentation.
- Do not implement case-study pages, contact backend, legal pages, or social destinations.
- Validate at 390px, 768px, 1024px, and 1440px without horizontal overflow.

---

### Task 1: Add reusable technology visual primitives

**Files:**
- Create: `src/components/ui/TechOverlay.tsx`
- Create: `src/components/ui/PointerGlow.tsx`
- Modify: `src/index.css`

**Interfaces:**
- Produces: `TechOverlay({ variant, className })` for decorative grids, scan lines, and deterministic particles.
- Produces: `PointerGlow({ children, className })` for fine-pointer-only card highlights.
- Consumes: existing theme tokens from `src/index.css` and Motion's reduced-motion hook.

- [ ] **Step 1: Create the ambient overlay primitive**

Implement `TechOverlay.tsx` with a deterministic particle list and decorative semantics:

```tsx
import { useReducedMotion } from 'motion/react'

const particles = [
  ['12%', '24%', '0s'],
  ['78%', '18%', '-3s'],
  ['88%', '62%', '-6s'],
  ['65%', '82%', '-9s'],
] as const

export function TechOverlay({
  variant = 'grid',
  className = '',
}: {
  variant?: 'grid' | 'portal' | 'scan'
  className?: string
}) {
  const reduceMotion = useReducedMotion()

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className={`absolute inset-0 tech-overlay-${variant} ${reduceMotion ? 'motion-reduce' : ''}`} />
      {variant === 'portal' && particles.map(([left, top, delay]) => (
        <span
          key={`${left}-${top}`}
          className="tech-particle absolute h-1 w-1 bg-accent"
          style={{ left, top, animationDelay: delay }}
        />
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Create the fine-pointer card highlight primitive**

Implement `PointerGlow.tsx`; write pointer coordinates to CSS variables without React state:

```tsx
import type { PointerEvent, ReactNode } from 'react'

export function PointerGlow({ children, className = '' }: { children: ReactNode; className?: string }) {
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`)
  }

  return <div onPointerMove={move} className={`pointer-glow ${className}`}>{children}</div>
}
```

- [ ] **Step 3: Add shared CSS animation tokens**

Append named CSS for `.tech-overlay-grid`, `.tech-overlay-portal`, `.tech-overlay-scan`, `.tech-particle`, and `.pointer-glow::before`. Use opacity below `0.2`, animation cycles of at least eight seconds, and the existing accent variables. Add a `prefers-reduced-motion` rule that disables each animation and transition.

- [ ] **Step 4: Verify primitives compile and respect lint rules**

Run:

```bash
npm run lint
npm run build
```

Expected: both commands exit 0 with no TypeScript or ESLint errors.

- [ ] **Step 5: Commit the primitives**

```bash
git add src/components/ui/TechOverlay.tsx src/components/ui/PointerGlow.tsx src/index.css
git commit -m "feat: add cinematic tech visual primitives"
```

### Task 2: Improve global section rhythm and header motion

**Files:**
- Modify: `src/components/ui/Section.tsx`
- Modify: `src/components/ui/SectionHeader.tsx`
- Modify: `src/sections/Header.tsx`

**Interfaces:**
- Consumes: existing `Reveal` and `content.nav` interfaces.
- Produces: compact default section spacing and sequential section-header reveals.

- [ ] **Step 1: Reduce default section spacing**

Change the shared section classes to:

```tsx
className={`relative overflow-hidden border-t border-white/8 bg-ink py-20 sm:py-24 lg:py-28 ${className}`}
```

- [ ] **Step 2: Split the section heading reveal sequence**

Keep the existing layout but wrap eyebrow, title, and description/action in separate `Reveal` components with delays `0`, `0.06`, and `0.12`. Change desktop bottom spacing from `lg:mb-16` to `lg:mb-12`; use `tracking-[0.2em] sm:tracking-[0.28em]` on the eyebrow.

- [ ] **Step 3: Tune header navigation typography and active indicator**

Use `text-[13px] tracking-[0.12em]` on desktop navigation. Change `aria-current` from `page` to `location` for same-page section links. Expand the active line beyond the text with `-inset-x-2` and retain transform animation.

- [ ] **Step 4: Contain focus inside the mobile navigation sheet**

Add refs for the menu button and sheet, move focus to the first sheet link when opened, loop Tab/Shift+Tab within visible menu controls, and return focus to the button after Escape or link activation. Preserve body scroll locking.

- [ ] **Step 5: Verify keyboard behavior**

Use Playwright at 390px to open the menu, press Tab through every menu control, confirm focus returns to the first control instead of entering Hero, press Escape, and confirm focus returns to the menu button.

- [ ] **Step 6: Commit global rhythm and navigation**

```bash
git add src/components/ui/Section.tsx src/components/ui/SectionHeader.tsx src/sections/Header.tsx
git commit -m "feat: refine section rhythm and navigation motion"
```

### Task 3: Upgrade the cinematic hero

**Files:**
- Modify: `src/sections/Hero.tsx`
- Modify: `src/index.css`

**Interfaces:**
- Consumes: `TechOverlay` from Task 1 and `assets.backgrounds.hero`.
- Produces: a responsive hero with localized image contrast and compact mobile credentials.

- [ ] **Step 1: Replace the flat image overlay**

Remove `bg-ink/85`. Add one overlay using:

```tsx
<div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,2,19,.82)_0%,rgba(3,2,19,.78)_45%,rgba(3,2,19,.42)_82%,rgba(3,2,19,.58)_100%)] max-sm:bg-[linear-gradient(180deg,rgba(3,2,19,.72)_0%,rgba(3,2,19,.82)_58%,rgba(3,2,19,.7)_100%)]" />
```

- [ ] **Step 2: Add restrained ambient portal treatment**

Render `<TechOverlay variant="portal" />` above the artwork and below content. Add a single CSS pseudo-light aligned to the right-side portal; animate scale from `0.98` to `1.02` and opacity from `0.65` to `0.85` over at least eight seconds.

- [ ] **Step 3: Compress mobile credentials**

Change the definition list to two columns on mobile and three columns from `sm`. Give the final credential `col-span-2 sm:col-span-1`, reduce mobile padding to `px-4 py-4`, and keep desktop layout unchanged.

- [ ] **Step 4: Capture and inspect the hero**

Capture the Hero at 390px and 1440px. Expected: portal remains visible, headline contrast remains strong, CTA controls remain above the credential panel, and the mobile section is shorter than its current 900px capture.

- [ ] **Step 5: Commit the hero**

```bash
git add src/sections/Hero.tsx src/index.css
git commit -m "feat: add cinematic motion to hero"
```

### Task 4: Promote and redesign Project Showcase

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/sections/Portfolio.tsx`
- Modify: `src/content/content.ts`

**Interfaces:**
- Consumes: `PointerGlow` from Task 1, `assets.portfolio`, and `content.portfolio.items`.
- Produces: one featured project and two supporting projects with no low-value filters.

- [ ] **Step 1: Move Portfolio after Stats**

Use this order in `App.tsx`:

```tsx
<Hero />
<Showreel />
<Stats />
<Portfolio />
<Services />
<WorkProcess />
<WhyChooseUs />
<Testimonials />
<Academy />
<Faq />
<Contact />
```

- [ ] **Step 2: Add concise project summaries**

Extend each portfolio item with a `summary` string describing the visible deliverable without inventing numeric outcomes. Use the existing project imagery and titles.

- [ ] **Step 3: Remove filters and build the featured layout**

Delete local filter state and filter controls. Render the first item as a wide `lg:grid-cols-12` feature with artwork spanning eight columns and copy spanning four. Render the remaining two items in a `sm:grid-cols-2` row. Wrap each card surface in `PointerGlow` and keep its existing destination.

- [ ] **Step 4: Add project reveal and hover treatment**

Use Motion or CSS to reveal image wrappers with a left-to-right clip path once. On hover, scale artwork no more than `1.03`, animate corner marks, and move the arrow by no more than four pixels.

- [ ] **Step 5: Verify responsive project composition**

Capture Portfolio at 390px, 768px, and 1440px. Expected: no clipped art or heading, one clear featured project, two readable supporting cards, and no empty filter row.

- [ ] **Step 6: Commit the Portfolio slice**

```bash
git add src/App.tsx src/sections/Portfolio.tsx src/content/content.ts
git commit -m "feat: promote featured project showcase"
```

### Task 5: Merge Technology into animated Services

**Files:**
- Modify: `src/sections/Services.tsx`
- Modify: `src/content/content.ts`

**Interfaces:**
- Consumes: `PointerGlow`, `TechOverlay`, `content.services`, and `content.technology`.
- Produces: one Services section containing six service cards and a compact technology strip.

- [ ] **Step 1: Remove the second standalone Section**

Keep one wrapper with `id="services"`. Render the six services, then add a compact technology strip below them inside the same Section.

- [ ] **Step 2: Add deterministic technical symbols**

Add a `symbol` field to each service such as `//`, `<>`, `01`, `↗`, `◎`, and `#`. Render it as a decorative mono label, not as an unlabeled interactive icon.

- [ ] **Step 3: Add animated service surfaces**

Wrap service cards in `PointerGlow`, add four CSS corner marks, retain the arrow affordance, and reduce each body to a maximum of two short sentences. Keep effects disabled on touch.

- [ ] **Step 4: Build the compact technology strip**

Render `content.technology` as a four-column desktop/two-column tablet strip with title plus one short line. Use a shared top rule and no individual large card glow.

- [ ] **Step 5: Verify section length and consistency**

Capture the section at 390px and 1440px. Expected: it is materially shorter than the previous combined Services plus Technology capture, card text remains legible, and pointer effects do not appear on touch emulation.

- [ ] **Step 6: Commit Services integration**

```bash
git add src/sections/Services.tsx src/content/content.ts
git commit -m "feat: integrate technology into services"
```

### Task 6: Build the animated process signal line

**Files:**
- Modify: `src/sections/WorkProcess.tsx`
- Modify: `src/index.css`

**Interfaces:**
- Consumes: `content.process` and Motion viewport animation.
- Produces: horizontal desktop and vertical mobile process timelines.

- [ ] **Step 1: Replace the passive line with a progress line**

Create a relative timeline container with a muted base line and an accent line. Animate the accent line scale from `0` to `1` when the timeline enters the viewport, using `origin-left` on desktop and `origin-top` on mobile.

- [ ] **Step 2: Connect each process step**

Place each numbered marker on the line. Reveal marker, title, and body with an `0.08s` stagger while keeping every step present in the accessibility tree before and after motion.

- [ ] **Step 3: Add reduced-motion behavior**

Under `prefers-reduced-motion`, set the accent line to full scale and remove stagger transforms.

- [ ] **Step 4: Verify both orientations**

Capture at 390px and 1440px after scrolling into the section. Expected: the mobile line reads top-to-bottom, desktop reads left-to-right, and no content overlaps the connector.

- [ ] **Step 5: Commit the timeline**

```bash
git add src/sections/WorkProcess.tsx src/index.css
git commit -m "feat: animate process signal timeline"
```

### Task 7: Add controlled visual breaks and compact closing sections

**Files:**
- Modify: `src/sections/WhyChooseUs.tsx`
- Modify: `src/sections/Testimonials.tsx`
- Modify: `src/sections/Academy.tsx`
- Modify: `src/sections/Faq.tsx`
- Modify: `src/sections/Contact.tsx`

**Interfaces:**
- Consumes: existing content and shared section primitives.
- Produces: one strong purple testimonial break, one compact Academy panel, and quieter surrounding sections.

- [ ] **Step 1: Quiet the Why section**

Remove large glow treatment, retain editorial rows, strengthen index/status markers, and keep a clean ink background.

- [ ] **Step 2: Make Testimonials the primary visual break**

Add a restrained purple surface behind the testimonial content, preserve readable white copy, and use only one accent corner. Ensure the layout remains valid for one or multiple testimonials.

- [ ] **Step 3: Compact Academy**

Reduce desktop padding, add a small data/curriculum motif, and retain the lime edge without introducing another full-strength background glow.

- [ ] **Step 4: Reduce FAQ spacing and clarify active rows**

Use a stronger active-row surface, a short animated lime rule, and smaller section padding through `className`. Preserve the existing button semantics and AnimatePresence behavior.

- [ ] **Step 5: Balance Contact on desktop**

Use a two-column desktop layout: form on the left, a compact response-time/project-status panel on the right. Stack naturally on mobile. The status panel is informational only and must not imply a connected backend.

- [ ] **Step 6: Capture closing-section rhythm**

Capture Testimonials through Footer at 390px and 1440px. Expected: one clear visual break, no competing full-strength glow in Academy, and Contact uses desktop width without making the form harder to scan.

- [ ] **Step 7: Commit the closing section polish**

```bash
git add src/sections/WhyChooseUs.tsx src/sections/Testimonials.tsx src/sections/Academy.tsx src/sections/Faq.tsx src/sections/Contact.tsx
git commit -m "feat: add visual rhythm to closing sections"
```

### Task 8: Full responsive and motion verification

**Files:**
- Modify only files requiring corrections found by this task.
- Create screenshots under `/tmp/gamegabyte-cinematic-tech-hud/`; do not commit temporary captures.

**Interfaces:**
- Consumes: the completed UI from Tasks 1–7.
- Produces: verified lint, build, responsive, keyboard, media, and reduced-motion behavior.

- [ ] **Step 1: Run static verification**

```bash
npm run lint
npm run build
git diff --check
```

Expected: every command exits 0.

- [ ] **Step 2: Capture complete pages after lazy loading**

Start Vite and use Playwright to scroll through the entire page before taking full-page screenshots at 390px, 768px, 1024px, and 1440px.

- [ ] **Step 3: Validate layout metrics**

For every viewport, assert `document.body.scrollWidth === window.innerWidth`, every image has `naturalWidth > 0` after lazy loading, and no heading rectangle extends outside the viewport.

- [ ] **Step 4: Validate motion preferences**

Run one Playwright context with `reducedMotion: 'reduce'`. Confirm particles, portal pulse, grid drift, scanning line, and pointer-follow effects have no running animation while all final content remains visible.

- [ ] **Step 5: Validate keyboard interactions**

Test Skip to Content, mobile menu focus containment and Escape return, video controls, FAQ toggles, CTA focus rings, form labels, and logical Tab order.

- [ ] **Step 6: Inspect priority section screenshots**

Review Hero, Project Showcase, Services, Process, Testimonials, and Contact at desktop and mobile sizes. Correct clipping, weak contrast, repetitive effects, or excessive whitespace, then repeat Steps 1–5.

- [ ] **Step 7: Commit final verified corrections**

```bash
git add src
git commit -m "fix: polish cinematic tech HUD responsive UI"
```

