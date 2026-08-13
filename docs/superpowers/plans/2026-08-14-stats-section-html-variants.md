# Stats Section HTML Variants Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build one standalone HTML prototype with three radically different, switchable directions for Gamegabyte's `[02] Our Numbers` section.

**Architecture:** A single throwaway document at `prototypes/stats-section-variants/index.html` owns the shared design tokens, production Stats copy, three semantic variant sections, responsive styles, and a tiny query-parameter switcher. Vite serves the static file through a dedicated npm command; production React files remain untouched.

**Tech Stack:** Semantic HTML, modern CSS, vanilla JavaScript, existing Vite development server, Playwright for visual QA.

## Global Constraints

- Keep `src/sections/Stats.tsx` and every other production file unchanged.
- Preserve `prototypes/cinematic-tech-hud/index.html` and all existing prototype artifacts.
- Reuse the exact production heading, description, values, labels, and notes from `src/content/content.ts`.
- Support `?variant=A`, `?variant=B`, and `?variant=C`, plus left/right arrow cycling.
- Respect `prefers-reduced-motion: reduce` and prevent horizontal overflow on desktop and mobile.
- Mark the page visibly as prototype-only.

---

### Task 1: Build and validate the Stats variants prototype

**Files:**
- Create: `prototypes/stats-section-variants/index.html`
- Modify: `package.json`

**Interfaces:**
- Consumes: Static production copy from `src/content/content.ts` as specified in the approved design document.
- Produces: `npm run prototype:stats`, serving `/prototypes/stats-section-variants/index.html?variant=A`; query parameter `variant` accepts `A | B | C`.

- [ ] **Step 1: Record the production-file baseline**

Run:

```bash
git diff -- src/sections/Stats.tsx src/content/content.ts > /tmp/stats-prototype-production-before.diff
```

Expected: `/tmp/stats-prototype-production-before.diff` captures the user's current production changes so prototype work can be proven isolated.

- [ ] **Step 2: Create the standalone prototype page**

Create `prototypes/stats-section-variants/index.html` with:

```html
<body data-variant="A">
  <p class="prototype-note">Prototype only / Stats direction study</p>
  <main>
    <section class="variant variant-a" aria-labelledby="title-a">...</section>
    <section class="variant variant-b" aria-labelledby="title-b">...</section>
    <section class="variant variant-c" aria-labelledby="title-c">...</section>
  </main>
  <nav class="switcher" aria-label="Stats design variants">...</nav>
  <script>
    const variants = ['A', 'B', 'C']
    const requested = new URLSearchParams(location.search).get('variant')?.toUpperCase()
    const active = variants.includes(requested) ? requested : 'A'
    document.body.dataset.variant = active
  </script>
</body>
```

Implement the approved directions in the same file:

- A: dominant `25+` readout on the left; three compact command readings and an animated signal trace on the right.
- B: four luminous milestones attached to a rising SVG trajectory; vertical progression below 760px.
- C: four full-width data-ledger rows with index, value, label, note, and directional indicator.
- Shared heading: `Growing with Game Studios Worldwide`.
- Shared description: `Delivering focused impact for game teams.`
- Shared metrics: `25+`, `5+`, `100%`, and `2024`, with exact production labels and notes.
- Switcher buttons update `?variant=` without reloading; left/right arrow keys cycle variants.
- CSS disables transitions and animations under `prefers-reduced-motion: reduce`.

- [ ] **Step 3: Add the one-command runner**

Add this script to `package.json` without changing the existing `prototype:ui` script:

```json
"prototype:stats": "vite --host 127.0.0.1 --open /prototypes/stats-section-variants/index.html?variant=A"
```

- [ ] **Step 4: Verify semantic content and variant switching**

Run the server:

```bash
npm run prototype:stats -- --port 5176
```

Use Playwright to open variants A, B, and C. For each variant, assert:

```js
document.body.dataset.variant === expectedVariant
document.querySelectorAll('.variant:not([hidden])').length === 1
document.body.textContent.includes('Growing with Game Studios Worldwide')
['25+', '5+', '100%', '2024'].every(value => document.body.textContent.includes(value))
document.documentElement.scrollWidth === window.innerWidth
```

Expected: all assertions pass at `1440x1000` and `390x844`; browser console contains no errors.

- [ ] **Step 5: Perform visual and reduced-motion QA**

Capture desktop and mobile screenshots for all three variants. Open each screenshot and confirm A is a command board, B is a rising trajectory, and C is a data ledger. Repeat with `reducedMotion: 'reduce'` and assert `document.getAnimations().filter(animation => animation.playState === 'running').length === 0`.

Expected: six visually distinct, readable screenshots; no clipped copy, overlapping switcher, or running reduced-motion animation.

- [ ] **Step 6: Prove production isolation and validate repository formatting**

Run:

```bash
git diff -- src/sections/Stats.tsx src/content/content.ts > /tmp/stats-prototype-production-after.diff
cmp /tmp/stats-prototype-production-before.diff /tmp/stats-prototype-production-after.diff
git diff --check -- prototypes/stats-section-variants/index.html package.json
```

Expected: `cmp` and `git diff --check` both exit `0`.

- [ ] **Step 7: Commit only the prototype deliverables**

```bash
git add prototypes/stats-section-variants/index.html package.json docs/superpowers/plans/2026-08-14-stats-section-html-variants.md
git commit -m "prototype: explore stats section directions"
```

Expected: the commit contains only the prototype HTML, npm runner, and this implementation plan.
