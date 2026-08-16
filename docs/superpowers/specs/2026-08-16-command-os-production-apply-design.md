# Command OS — Production Apply Design

**Date:** 2026-08-16
**Status:** Approved for planning
**Prototype:** `prototypes/command-os-full-page/index.html` (branch `prototype/command-os-full-page`, commit `1742510`)

## Goal

Rebuild the production Gamegabyte marketing page in the Command OS design language approved from the full-page prototype: a persistent command shell (vertical rail, status topbar, mobile command bar) wrapping twelve numbered sections, each with its own structural idiom rather than a repeated card grid.

## Decisions

These were settled during brainstorming and are not open for re-litigation during implementation:

| Decision | Choice |
|---|---|
| Scope | All twelve sections. `CaseStudy`, `Testimonials` and `Academy` come out of park. |
| Styling | Tailwind utilities throughout. Only `@keyframes`, `@font-face` and `@theme` tokens live in `index.css`. |
| Navigation shell | `Header` is deleted. The rail is the primary navigation and lists all twelve sections. |
| Rollout | One branch, one commit per section, merged once. No staged production releases. |
| Invented metrics | Replaced with real values from `content.ts`. No fabricated numbers ship. |
| Verification | A committed Playwright QA script (`npm run qa`), not ad-hoc checking. |
| Code organisation | Primitive kit first, then sections composed on top of it. |

## Architecture

### Section registry

Section numbering appears in three places (rail, mobile menu, section heading). Hard-coding it means twelve edits per reorder and guaranteed drift. One registry owns it:

```ts
// src/content/sections.ts
export const SECTIONS = [
  { id: 'home',         index: '01', label: 'Command',       eyebrow: 'Game growth systems' },
  { id: 'reel',         index: '02', label: 'Transmission',  eyebrow: 'Visual transmission' },
  { id: 'telemetry',    index: '03', label: 'Telemetry',     eyebrow: 'Studio telemetry' },
  { id: 'services',     index: '04', label: 'Services',      eyebrow: 'Systems matrix' },
  { id: 'process',      index: '05', label: 'Process',       eyebrow: 'Mission sequence' },
  { id: 'about',        index: '06', label: 'Advantages',    eyebrow: 'Operational advantages' },
  { id: 'portfolio',    index: '07', label: 'Archive',       eyebrow: 'Archive / 03 files' },
  { id: 'case-study',   index: '08', label: 'Dossier',       eyebrow: 'Mission dossier / Seedify' },
  { id: 'testimonials', index: '09', label: 'Logs',          eyebrow: 'Communication logs' },
  { id: 'academy',      index: '10', label: 'Academy',       eyebrow: 'Training subsystem / external node' },
  { id: 'faq',          index: '11', label: 'Diagnostics',   eyebrow: 'System diagnostics' },
  { id: 'contact',      index: '12', label: 'Channel',       eyebrow: 'Open channel' },
] as const
```

`CommandRail`, `MobileCommandBar` and `SectionHeader` all read from it. Reordering the page is one array edit.

### Shell

New directory `src/components/shell/`:

| File | Responsibility |
|---|---|
| `CommandShell.tsx` | Page frame: skip link, rail, topbar, mobile bar, `<main>`. Owns menu open/close state. |
| `CommandRail.tsx` | Desktop vertical rail: twelve entries, active highlight, status foot. |
| `CommandTopbar.tsx` | Status strip plus the *Open channel* call to action. |
| `MobileCommandBar.tsx` | Brand, Menu button, sheet. Keeps the Escape handling and scroll lock currently in `Header`. |
| `useActiveSection.ts` | The IntersectionObserver hook lifted out of `Header.tsx`, now shared by rail and mobile menu. |

`App.tsx` becomes a list of sections inside `CommandShell`.

**Deleted:** `src/sections/Header.tsx`, `src/components/ui/SectionHeading.tsx` (dead code — no importers).

### Primitives

Rewritten: `Section` (no top border, Command OS vertical rhythm), `Container` (max-width 1320px, replacing `max-w-6xl` at 1152px), `SectionHeader` (narrow eyebrow column left, large display heading right, index drawn from the registry).

Added: `Panel` (the shared hairline surface), `Readout` (mono label plus display value), `Eyebrow`.

### Breakpoints

The prototype breaks at 760px and 1050px; Tailwind defaults to 768 and 1024. The gap matters — the hero mobile failure below sat inside it. Align the tokens to the prototype:

```css
@theme {
  --breakpoint-md: 760px;
  --breakpoint-lg: 1050px;
}
```

This is global. Every existing `md:`/`lg:` utility shifts with it, which is acceptable only because all twelve sections are being rewritten in the same branch.

### Ink token

Adopt the prototype's `#05050c` for `--color-ink`, replacing `#030213`.

### CSS cleanup

`index.css` currently carries bespoke blocks from the previous stats apply. Rewriting those sections in utilities makes them dead, and leaving them behind would mislead the next reader. Each is deleted in the same commit as the section that stops using it:

| Block | Lines (approx.) | Fate |
|---|---|---|
| `.stats-command-*`, `.stats-signal-trace`, its keyframes and media queries | ~200 | Deleted with the `Stats` rewrite |
| `.services-card-grid`, `.services-grid-background` | ~45 | Deleted with the `Services` rewrite |
| `.process-signal-node` | ~7 | Deleted with the `WorkProcess` rewrite |
| `@utility hud-grid` | — | Kept; the technical grid is core to the language |
| `@utility hud-surface`, `hud-surface-interactive`, `hud-portrait`, `.pointer-glow` | ~45 | Kept only if still referenced after the rewrite; otherwise deleted in the final cleanup commit |

`index.css` should end this work smaller than it started, holding tokens, fonts, keyframes and global rules only.

## Section mapping

| # | id | Component | Layout | Data |
|---|---|---|---|---|
| 01 | `home` | `Hero` | Split grid: copy left, three-panel dashboard right, ticker below | `content.hero` + new `hero.dashboard` |
| 02 | `reel` | `Showreel` | Monitored transmission frame with corner ticks, *Play signal* / *Mute* controls, TrustBar of four client logos | `content.reel`, `assets.clients` |
| 03 | `telemetry` | `Stats` | One primary readout plus three supporting readouts | `content.stats` |
| 04 | `services` | `Services` | Input/output matrix: key column plus six cells, then the four technology notes | `content.services`, `content.technology` |
| 05 | `process` | `WorkProcess` | Sticky orbital panel left, four steps on a signal path right | `content.process` |
| 06 | `about` | `WhyChooseUs` | Four advantage nodes: sprite, tag, title, body, foot meta | `content.why` |
| 07 | `portfolio` | `Portfolio` | Asymmetric archive: one large left, two stacked right | `content.portfolio`, `assets.portfolio` |
| 08 | `case-study` | `CaseStudy` (unpark) | Dossier: meta panel plus 16:9 feature image, then a horizontal rail of nine screens | `content.caseStudy` |
| 09 | `testimonials` | `Testimonials` (unpark) | Communication log: meta column plus large quote | `content.testimonials` |
| 10 | `academy` | `Academy` (unpark) | Terminal: artwork left, copy and CTA right, external link with `target="_blank" rel="noreferrer"` | `content.academy` |
| 11 | `faq` | `Faq` | Four diagnostic disclosures, real `<button aria-expanded>` plus answer panels | `content.faq` |
| 12 | `contact` | `Contact` | Two-column form plus response card | `content.contact` |
| — | — | `Footer` | Three link groups, four social labels | `content.footer` |

## Replacing invented metrics

The prototype invented telemetry to sell the aesthetic. None of it ships as-is.

| Prototype | Production |
|---|---|
| `CAMPAIGN READINESS 87%` with bar chart | `STUDIO PROJECTS 25+` from `stats[0]`; bars become `aria-hidden` decoration carrying no value |
| `ACTIVE FOCUS / AAA + Mobile`, `25+ SHIPPED` | Kept — already real, sourced from `hero.credentials` |
| `AVAILABLE SYSTEM NODES` (Strategy, Design, Code, Analytics, Community, Support) | The six real service titles from `content.services` |
| `BUILD 24.08` on the topbar | Dropped. Topbar reads `Studio network online` only |
| `DOSSIER UNLOCKED` | `09 records` — matches the nine real screens |
| `SIGNAL VERIFIED` on the testimonial | The client company name, `Apples to Oranges` |

The `55%` badge on the case-study image is part of the game screenshot itself, not an overlay, and is left alone.

## Content additions

All new copy goes through `content.ts`; no strings hard-coded in JSX.

- `hero.dashboard` — focus label and value, plus the node list derived from service titles
- `shell` — topbar status text and CTA label
- `caseStudy.recordLabel` — the `PRIMARY RECORD / 01` badge text

## Motion and accessibility

Use the existing `Reveal` / `Stagger` / `CountUp` components (the `motion` library) rather than the prototype's hand-rolled IntersectionObserver. Only the ticker, status pulse and signal trace need `@keyframes` in `index.css`; the global `prefers-reduced-motion` rule at `index.css:398` already disables them.

- Rail links show only a two-digit number, so each takes `aria-label` from `SECTIONS[].label`
- Skip link retained
- FAQ uses real buttons with `aria-expanded` and stable `aria-controls`
- Video control labels update with state
- Contact form keeps an `aria-live="polite"` status region
- The global focus ring at `index.css:392` covers every new surface

No new assets. Every image, the reel video, the client logos and the sprite sheet already exist under `public/`.

## Verification

`scripts/qa.mjs`, run via `npm run qa`, re-runnable after each section:

- Structure: twelve `main > section`, four diagnostic buttons, nine dossier screens
- `document.documentElement.scrollWidth === window.innerWidth` at 1440×1000 and 390×844
- Interaction: mobile menu open/close/Escape, FAQ toggle, video mute and play/pause, contact submit (local only, no network request), Academy link attributes
- No console errors on either viewport
- No animation in `running` state under `prefers-reduced-motion: reduce`
- Section screenshots written to `.qa/` (added to `.gitignore`)

### Known traps

Carried forward from the prototype's visual QA, where DOM assertions passed while the page was visibly broken:

1. **Hero on mobile.** A `1fr` grid track takes its automatic minimum from min-content, so a large display heading blows the track wider than the viewport and `overflow:hidden` silently clips it. Use `grid-cols-[minmax(0,1fr)]` and clamp the heading size. `scrollWidth === innerWidth` does **not** catch this.
2. **UI screenshots.** Always `aspect-[16/9]` with `object-cover`; never a fixed height, or the interface art loses its edges.
3. `figure` carries a 40px UA side margin. Tailwind's preflight already resets it, so this cannot recur in production — noted only because it cost a fix in the prototype.

## Commit sequence

Roughly seventeen commits on one branch:

1. Tokens, breakpoints, `sections.ts`
2. Shell (rail, topbar, mobile bar); delete `Header`
3. Primitives (`Section`, `Container`, `SectionHeader`, `Panel`, `Readout`, `Eyebrow`); delete `SectionHeading`
4–15. One commit per section, in page order
16. Footer
17. QA script and a full pass

## Definition of done

`npm run build`, `npm run lint` and `npm run qa` all pass, and production screenshots match the prototype section by section.

## Open items

Both default to the safe reading and can be flipped with a one-line content change:

1. **Academy course tags.** The prototype's `GAME UX / UI SYSTEMS / PLAYER THINKING / PRODUCTION CRAFT` were invented, not read from the real course. Default: omit them. Restore by adding `academy.tags` to `content.ts` once verified.
2. **`Replies in 2 working days`.** A service commitment, unverified. Default: a neutral label on the response card. Restore the specific promise once confirmed.

## Out of scope

- Wiring `content.contact.endpoint` to a real form backend
- Case-study detail pages (portfolio items still point at `#contact`)
- Replacing the placeholder social hrefs in `content.footer`
- Any test infrastructure beyond the QA script
