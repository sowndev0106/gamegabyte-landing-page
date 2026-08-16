# Command OS — Gamegabyte design system

**Status:** current. Applies to every section on the marketing page.
**Spec:** `docs/superpowers/specs/2026-08-16-command-os-production-apply-design.md`
**Reference build:** the approved prototype, `git show prototype/command-os-full-page:prototypes/command-os-full-page/index.html`

Every value below was measured off the running page at 1440×1000, not copied from
the design file. Where the code currently disagrees with a rule, that is stated
plainly in [Known deviations](#known-deviations) rather than quietly smoothed over.

---

## 1. What the design is

**Command OS.** The page presents the studio as an instrument you are reading,
not a brochure you are scrolling. Twelve numbered sections behave like panels of
one operating system: a persistent rail on the left, a status bar across the top,
a single dark ground, and hairline rules instead of boxes.

The idea it is built on, and the one thing to protect:

> **One surface, twelve structures.**
> Every section shares the same ground, the same hairline, the same three type
> voices. What changes between sections is *structure* — a matrix, an orbit, an
> archive, a dossier. Nothing changes colour or texture to signal "new section".

That is why the page reads as a system rather than a stack of cards. A new
section that invents its own surface treatment breaks it; a new section that
invents its own *layout* on the shared surface strengthens it.

### Vocabulary

The section names are operational, not marketing. Use this language in copy,
component names and commits.

| Section | Idiom | Called |
|---|---|---|
| 01 `home` | Split dashboard | Command |
| 02 `reel` | Monitored feed | Transmission |
| 03 `telemetry` | Readout board | Telemetry |
| 04 `services` | Input/output matrix | Systems matrix |
| 05 `process` | Orbital sequence on a signal path | Mission sequence |
| 06 `about` | Parallel attribute nodes | Operational advantages |
| 07 `portfolio` | Asymmetric archive | Archive |
| 08 `case-study` | Dossier with a scrolling record rail | Mission dossier |
| 09 `testimonials` | Communication log | Logs |
| 10 `academy` | External terminal | Training subsystem |
| 11 `faq` | Diagnostic records | System diagnostics |
| 12 `contact` | Open channel | Channel |

---

## 2. Foundations

### Colour

| Token | Value | Use |
|---|---|---|
| `--color-ink` | `#05050c` | The only page background. Never a second surface colour. |
| `--color-accent` | `#b6e802` | Signal: active state, live status, primary CTA. |
| `--color-accent-bright` | `#d4ff00` | Figures in a readout, CTA hover, focus ring. |
| `--color-brand` | `#601feb` | Atmosphere only — blurred glows and gradients behind content. Never on text or a border. |
| hairline | `rgb(255 255 255 / 0.11)` | Every border on the page. |
| panel fill | `rgb(255 255 255 / 0.015)` | The only lift above ink. |
| body text | `white/70` | Paragraphs. |
| muted label | `white/48`, `white/30` | Mono labels, footnotes. |

**Lime is a signal, not a decoration.** If lime appears on something that is not
active, live, or the primary action, it is wrong. Measured: 10 of 12 sections use
lime only for the section eyebrow, status dots and CTAs.

### Type

Three voices, no fourth.

| Voice | Family | Role |
|---|---|---|
| Display | Schibsted Grotesk | Headings only. Uppercase, `tracking-tighter`, `leading-[0.86]`. |
| Body | Roboto | Paragraphs at 16px, dense supporting copy at 14px. |
| Mono | `ui-monospace` | Labels, indices, telemetry, status. Always uppercase, always wide tracking. |

**Display scale** (measured at 1440):

- Hero `h1` — `clamp(64px,7.2vw,112px)` → 104px. The hero is the only section allowed this size.
- Section `h2` — `clamp(38px,6vw,84px)` → 84px. Identical in all 10 sections that use `SectionHeader`.
- Panel title — 28px.
- Grid-cell title — 22px.

**Mono scale** — three steps, nothing between:

| Size | Tracking | Use |
|---|---|---|
| 11px | `0.22em` | Section eyebrow (`[04] SYSTEMS MATRIX`) — this size appears nowhere else. |
| 9px | `0.22em` | Panel and readout labels. |
| 8px | `0.18em` | Footnote meta, credentials. |

### Space

| Thing | Value |
|---|---|
| Container | `max-w-330` (1320px), `px-4.5` → `md:px-12` |
| Rail | 92px, `md` and up only |
| Topbar | 72px; mobile command bar 70px |
| Section rhythm | `py-19.5` → `md:py-28` → `lg:py-32` (128px at desktop) |
| Panel padding | 28px desktop, 22px mobile |
| Breakpoints | `md: 760px`, `lg: 1050px` — matched to the prototype, **not** Tailwind's stock 768/1024 |

### Form

- **No rounded corners.** The single exception is a status dot, which is a
  circle by definition. If a `rounded-*` utility appears on anything with an
  edge, it is wrong.
- **No shadows as elevation.** Glow (`shadow-[0_0_Npx_var(--color-accent)]`) is
  allowed only to make a lime signal read as lit.
- **Borders separate; fills do not.** A region is defined by a hairline, not by a
  lighter background.

### Motion

- Entrances use `Reveal` / `Stagger` / `CountUp` (the `motion` library). Do not
  hand-roll an IntersectionObserver.
- Only two continuous animations exist: the status-dot pulse and the process
  orbit rings. Adding a third needs a reason.
- Everything continuous must stop under `prefers-reduced-motion: reduce`.
  Capping `animation-duration` alone does **not** stop an infinite animation —
  `animation-iteration-count: 1` is what brings it to rest. `index.css` does both.

---

## 3. The section contract

Every section except the hero **must** open with `SectionHeader`:

```tsx
<Section id="services" grid>
  <Container>
    <SectionHeader id="services" title={…} description={…} />
    …
  </Container>
</Section>
```

`SectionHeader` reads its index and eyebrow from `src/content/sections.ts`. It
takes no `index` or `eyebrow` prop — free-string arguments are exactly how
numbering drifted out of order in the previous design, where `case-study` and
`faq` were both `[07]`.

Measured result of that contract at 1440: eyebrow at **x=154**, heading at
**x=442**, heading **84px**, in ten of twelve sections. That alignment is the
page's spine. Do not break it to make one section look better.

### Checklist for any new or edited section

1. `id` is in `src/content/sections.ts` and typed as `SectionId`.
2. Opens with `SectionHeader id={…}`; no hand-written index or eyebrow.
3. Wrapped in `Section` + `Container` — never a bespoke width or vertical rhythm.
4. Surfaces use `Panel`; figures use `Readout`. No hand-rolled panel class strings.
5. Its structure is **not** a copy of a neighbouring section's structure.
6. `grid` texture on, unless full-bleed imagery would hide it (see `reel`,
   `portfolio`, `academy`).
7. Every displayed number comes from `content.ts` and is true.
8. All copy lives in `content.ts`. No user-visible string in JSX.
9. Interactive controls carry a real accessible name; decorative art is
   `aria-hidden`.
10. `npm run qa` passes, including the clipping check at 390px.

---

## 4. Truth rule

**No fabricated metrics ship.** The prototype invented telemetry to sell the
look — `CAMPAIGN READINESS 87%`, `BUILD 24.08`, `DOSSIER UNLOCKED`. None of it
reached production. Every figure now traces to `content.ts`:

| Was invented | Now |
|---|---|
| `87%` readiness + bar chart | `25+` from `stats[0]`; bars are `aria-hidden` decoration with no value |
| six invented "system nodes" | the six real service titles |
| `BUILD 24.08` | removed |
| `DOSSIER UNLOCKED` | `09 records`, derived from `caseStudy.screens.length` |
| `SIGNAL VERIFIED` | the client's company name |

Two claims are deliberately **not** shipped until the studio confirms them:
the four Academy course tags, and the "replies in 2 working days" commitment
(the response card reads `Channel open` instead). Both are one line in
`content.ts` to restore.

The instrument aesthetic is allowed to *look* like telemetry. It is not allowed
to *assert* telemetry that nobody measured.

---

## 5. Traps

Three failure modes have already cost real time on this design. All three are
invisible to `tsc` and to a passing build.

### Unlayered CSS beats every utility

Tailwind v4 puts all utilities in `@layer`. A rule written bare in `index.css`
sits outside every layer, and unlayered styles win against layered ones
regardless of specificity. A three-line element reset —

```css
button, a, textarea { font: inherit; }   /* WRONG — unlayered */
```

— silently overrode `font-mono` and `text-*` on **23 links and buttons**,
including the entire mobile menu, while the class names in the markup still read
correctly. Element resets belong in `@layer base`.

### A grid track takes its minimum from min-content

`grid-cols-[1fr]` sizes its automatic minimum to the widest unbreakable word. A
large display heading therefore pushes the track wider than a 390px viewport,
and `overflow-hidden` clips it — while `document.scrollWidth === innerWidth`
still passes. Use `grid-cols-[minmax(0,1fr)]` and clamp the heading. `npm run qa`
checks this explicitly because the standard overflow assertion cannot.

### Ratios, not fixed heights, for interface art

Case-study and portfolio images are captured UI. A fixed pixel height against
16:9 source art crops the edges off the very work the section exists to show.
Always `aspect-[16/9]` (or `4/5`, `16/10`) with `object-cover`.

---

## 6. Known deviations

Honest ledger of where the code does not yet match the rules above.

| Where | Deviation | Verdict |
|---|---|---|
| `home` | Eyebrow and heading at x=140, heading 104px, outside the `SectionHeader` grid | **Intentional.** The hero is the only full-bleed section; it opens the page rather than taking a place in the sequence. |
| `academy` | No `SectionHeader` at all. Eyebrow and heading at x=814, heading 64px, inside the panel | **Outlier to fix.** Inherited from the prototype, where Academy was a standalone terminal. In a page where ten sections share one spine, it reads as a mistake rather than a choice. |
| `portfolio` | Item title 27px | Should be 28px, the panel-title step. |
| `faq` | Question 24px, eyebrow tracking `0.24em` | Should be 28px and `0.22em`. |
| `contact` | Field labels 11px — the size reserved for section eyebrows | Should be 9px. |
| `case-study`, `footer`, `services`, `testimonials` | Stray mono trackings `0.14em`, `0.18em`, `0.12em` at 9px | Should be `0.22em` at 9px. |
| `testimonials` | Meta column has ~350px of empty space between its top and bottom labels at desktop | Reads as unresolved rather than instrumental; wants a middle element or a shorter column. |
| `contact` | Response card sits low and alone because the grid is `items-end` | Wants `items-start` or a filled second column. |

None of these break a build or a test. They are the difference between a page
that is consistent and a page that is merely finished.

---

## 7. Verifying

```bash
npm run qa      # 73 checks: structure, clipping at 390 and 1440, interaction, reduced motion
npm run build
npm run lint
```

`npm run qa` writes a screenshot of every section at both viewports to `.qa/`.
Read them. The clipping check catches content pushed outside the viewport, but
only a human notices when a section stops looking like the rest of the system.
