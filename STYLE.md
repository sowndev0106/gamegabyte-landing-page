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
one operating system: a persistent rail on the left, a command bar across the
top, a single dark ground, and hairline rules instead of boxes.

The idea it is built on, and the one thing to protect:

> **One surface, twelve structures.**
> Every section shares the same ground, the same hairline, the same three type
> voices. What changes between sections is *structure* — a matrix, an orbit, an
> archive, a dossier. Nothing changes colour or texture to signal "new section".

That is why the page reads as a system rather than a stack of cards. A new
section that invents its own surface treatment breaks it; a new section that
invents its own *layout* on the shared surface strengthens it.

### The register is a terminal

Not a retro CRT pastiche — no scanlines, no green phosphor, no typewriter
animation, no ASCII boxes. What the page borrows is the plain working grammar of
a command line: **everything is labelled, everything is numbered, nothing is
decorated.** `[04] SYSTEMS MATRIX` is a prompt line, not a chip. A hairline is a
rule, not a card edge. Lime is a cursor colour. The mono voice is not a font
choice, it is the claim that these strings are output rather than copywriting.

Two tests for anything new:

1. **Would it print?** The page should survive being read as plain text.
   Structure comes from labels, indices and rules — things that still carry
   meaning without colour — never from a shape whose only job is to look
   technical.
2. **Does it claim something?** Terminals report. If an element looks like a
   readout it must be reading something real (see [Truth rule](#truth-rule)). An
   invented figure in this voice is not a flourish; it is a lie in a monospace
   font.

The costume version of this design is the failure mode to watch for: a `$` on a
button, a caret in front of a heading, a blinking block after a paragraph. Those
say "terminal" instead of *behaving* like one. The page does speak in prompt
syntax in exactly three places, all of them in the command bar and all of them
reporting something — they are listed in [The prompt](#the-prompt).

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

**Mono scale** — four roles, nothing between. Tracking is part of the step, not
a free choice: wide tracking makes a two-word label read as an instrument, and
makes a full sentence unreadable.

| Size | Tracking | Role |
|---|---|---|
| 11px | `0.22em` | Section eyebrow (`[04] SYSTEMS MATRIX`). Used by `SectionHeader` and the hero only. |
| 9px | `0.22em` | Panel label — short, one to three words. |
| 9px | `0.16em` | Mono sentence: caption, control label, nav item, readout note. |
| 8px | `0.18em` | Micro meta — credentials, badges, the rail status. |

### Alignment

**Everything reads from one left edge.** No centred headings, no centred
paragraphs, anywhere. A centred block has no edge to align to, so it breaks the
column structure the rail and the section grid establish — one centred paragraph
is enough to make the page look like a template again.

Three exceptions, all narrow:

| Exception | Why |
|---|---|
| A label inside a `<button>` | The control centres its own label; that is the button's internal layout, not page text. Three on the page. |
| The caption under the process orbit | It sits beneath the only radially symmetric element on the page, so it centres on that element's axis. |
| The corner meta in `about` (`Latency / Low` …) | Deliberately right-aligned, pinning a reading to the far corner of each node the way an instrument does. The only right-aligned text on the page — keep it to that one pattern. |

Anything else that is not left-aligned is a mistake. The audit that produces
this list is four lines of `getComputedStyle(el).textAlign` — run it before
claiming a section conforms.

### Space

| Thing | Value |
|---|---|
| Container | gutter only — `px-4.5` → `md:px-12`, **no width cap**. Capping and centring it put every section on a different left edge from the hero, and the gap grew with the viewport. |
| Rail | 92px, `md` and up only |
| Topbar | 72px; mobile command bar 70px |
| Section rhythm | `py-19.5` → `md:py-28` → `lg:py-32` (128px at desktop) |
| Panel padding | 28px desktop, 22px mobile |
| Breakpoints | `md: 760px`, `lg: 1050px` — matched to the prototype, **not** Tailwind's stock 768/1024. `sm`, `xl` and `2xl` are untouched but unused; nothing on the page reaches past `lg`. |

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
- Three continuous animations exist, and a fourth needs a reason:
  the status-dot pulse, the process orbit rings, and the topbar cursor blink.
  The cursor earns its place because a cursor that does not blink is a
  rectangle — the blink is the whole message ("waiting for input"), not a
  decoration on top of one. Note it is a **square wave** (`step-end`), not the
  eased pulse the status dot uses: an easing cursor reads as a light that is
  alive rather than a prompt that is waiting.
- Everything continuous must stop under `prefers-reduced-motion: reduce`.
  Capping `animation-duration` alone does **not** stop an infinite animation —
  `animation-iteration-count: 1` is what brings it to rest. `index.css` does both.

---

## 3. The shell

Navigation is the one thing on the page that is not a section, and it is where
the terminal register is stated most plainly. It exists at three resolutions of
the *same* twelve-item list — never as three competing navigations.

| Where | Renders | Carries |
|---|---|---|
| Rail, `md`+ | Twelve ticks, no text | **Position**, as a reading on a scale. |
| Topbar, `md`+ | Five text groups, plus a path readout at `lg`+ | **Destination** (the group being read carries a lime `>` caret) and **position** (the path names the section). |
| Mobile bar, `<md` | Twelve rows in a sheet | Both. A sheet has room for the real list, so groups are not used. |

All three read `src/content/sections.ts`. The rail and the sheet map `SECTIONS`
directly; the topbar maps `NAV_GROUPS`, whose members are typed `SectionId`, so
a renamed section fails the build instead of shipping a link that scrolls
nowhere. There is no second nav list anywhere in the tree — if you find yourself
writing one, you are about to let the two drift apart.

`home` and `contact` belong to no group on purpose: the logo is the way back to
one and the CTA is the way to twelve. While either owns the viewport the topbar
shows **no** caret — the same rest state the rail takes before any section owns
the viewport. Do not invent an active state for the hero to fill the gap; a
prompt with nothing at it is a truthful reading.

### The prompt

The bar reads as one shell line: five groups on the left, the working directory
on the right. Scrolling into a section **is** the `cd` — so the readout reports
where the reader actually is, and asserts nothing it has not measured.

```
> WORK   SERVICES   STUDIO   ACADEMY   FAQ        GAMEGABYTE:~/WORK/PORTFOLIO ▍
└ caret marks the group ┘                         └ host ┘└─ path ─┘└ cursor ┘
```

Three constructs carry the prompt syntax, and they are the only three on the page:

| Construct | Rule |
|---|---|
| `>` caret | Lime, on the active group. **Always rendered**, faded to `opacity-0` when inactive — taking it out of the flow would shift the whole row sideways every time the reading moves. |
| `gamegabyte:` + path | Host at `white/30`, path at `white/70`. The path comes from `sectionPath()`, built from section **ids**, so it can never drift from the anchor it names. |
| Block cursor | Lime, square, `command-cursor`. Marks the end of the line, which is why there is **no `$` terminator** — a dim `$` wedged between the path and the cursor read as a smudge rather than as syntax. |

Two things were tried and rejected, both worth not re-litigating:

- **A lowercase path.** Closer to a real shell, but it was the one string in the
  bar not shouting, so it read as a different system rather than a detail. The
  mono voice stays uppercase everywhere, no exceptions.
- **A status sentence** (`STUDIO NETWORK ONLINE`). A fixed claim sitting where a
  live reading belongs. The path replaced it and the status dot became the
  cursor, so the bar gained a readout and lost nothing.

Everything else in the shell does its ordinary job — mono labels, indices,
hairlines. That restraint is what keeps the voice from tipping into costume; see
[The register is a terminal](#the-register-is-a-terminal).

### How the topbar collapses

Things go in the order they can be spared. Measured on the running page:

| Width | State |
|---|---|
| `< md` (760) | The whole bar goes. `MobileCommandBar` takes over with twelve rows. |
| `md` – `lg` | No path. Nav spacing and CTA padding tighten (`pl-6` / `pr-4` / `px-6`). At 760 — the narrowest the bar ever renders — this leaves **127px** between the last group and the CTA. |
| `lg` (1050) + | The path appears and spacing relaxes to `pl-11` / `pr-7` / `px-11`. The longest path, `~/studio/testimonials`, measures **265px** and clears the groups by 31px at 1050. |

The path goes first because it is the one thing the rail still says on its own.
The bar is 72px at every width and the five groups never wrap.

`npm run qa` covers 1440 and 390 only, so the 760–1050 band is verified by hand.
Measure it before adding anything to the bar — 31px is the whole margin at 1050,
and a sixth group would spend it.

---

## 4. The section contract

Every section except the hero **must** be built with `SectionSplit`:

```tsx
<Section id="services" grid>
  <Container>
    <SectionSplit id="services" title={…} description={…}>
      …content…
    </SectionSplit>
  </Container>
</Section>
```

`SectionSplit` is a **sidehead**: the title sits in a column beside its content
rather than above it, and stays sticky so a tall body cannot scroll its own
title out of view.

**The 38/62 split is set by the type, not by taste.** At the heading's 60px the
widest unbreakable line on the page — `CAPABILITIES.` — measures 418px.
Measured at 1440:

| Split | Heading column | 60px | 48px | 40px |
|---|---|---|---|---|
| 25 / 75 | 313px | 3 headings clip | 1 clips | fits |
| 33 / 67 | 413px | 1 clips | fits | fits |
| **38 / 62** | **476px** | **fits** | fits | fits |
| 45 / 55 | 563px | fits | fits | fits |

Narrowing the heading column means shrinking the heading with it — never one
without the other. Re-measure when copy changes: a longer word moves that 418px.
`prototypes/section-split/` outlines any heading that will not fit its column
and counts them, so the check takes a click.

The content column carries `min-w-0`. Without it a wide child — the dossier
rail, a long table row — pushes the track past its share and the split silently
stops holding.

**What the narrow content column costs.** At 1440 the content column is ~740px,
so grids that ran three or four across came down to two: the systems matrix, the
advantage nodes, the technology notes, the client marks. In the matrix the axis
label spans its row rather than taking a cell of its own, and the third
discipline in each axis spans the row — three items in a two-column grid
otherwise leave a hole.

`SectionSplit` reads its index and eyebrow from `src/content/sections.ts`. It
takes no `index` or `eyebrow` prop — free-string arguments are exactly how
numbering drifted out of order in the previous design, where `case-study` and
`faq` were both `[07]`.

Every section still starts on the page's single left edge, hero included. That
alignment is the spine; do not break it to make one section look better.

### The pinned-panel pattern

Three sections use the same construct and it is deliberate: a tall panel with a
mono label pinned to the **top** edge, a status or figure pinned to the
**bottom** edge, and the space between left empty.

| Section | Top | Bottom |
|---|---|---|
| `telemetry` | `STUDIO SIGNAL / ACTIVE` | the `25+` readout |
| `case-study` | `CLIENT / SEEDIFY` and the title | `09 RECORDS` |
| `testimonials` | `LOG 01 / HUMAN INTELLIGENCE` | the client's name |

The void is the point — a gauge reads as an instrument because its markings sit
at the edges of the housing, not because the housing is full. Do not "fix" these
by centring the contents or shrinking the panel, and do not introduce a fourth
variant that fills the middle.

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

## 5. Truth rule

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

## 6. Traps

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

## 7. Known deviations

Honest ledger of where the code does not yet match the rules above.

Measured at 1440×1000. The header grid now resolves to `240px 936px` with the
the eyebrow and the heading both at **x=154**, at **84px**, in **eleven of
twelve** sections.

| Where | Deviation | Verdict |
|---|---|---|
| `home` | Heading 104px against the sections' 84px, and a split two-column layout instead of a stacked header | **Intentional and permanent.** The hero is the only section that must pitch and establish the instrument at once; it earns a different rhythm. Its **left edge now matches** every other section. |

**Resolved: one left edge.** The hero is full-bleed off the rail while sections
used to sit in a centred 1320px measure, so the two drifted apart as the screen
widened — 14px at 1440, 221px at 1853, 574px at 2560. Three fixes were measured
in `prototypes/section-header-alignment/`:

| Fix | Edges match | Dead space right @2560 |
|---|---|---|
| Hero joins the measure | yes | 574px, and the whole page drifts right |
| Sections keep the cap, pinned left | yes | 1148px |
| **Sections drop the cap** | **yes, at every width** | **none** |

The last one shipped. Verified: all twelve headings share one left edge at 390,
760, 1050, 1440, 1853 and 2560px, with no horizontal overflow.

That is the whole list. An earlier revision of this document also flagged the
empty middle of the `testimonials` meta column as unresolved. Reviewed against
`telemetry` and `case-study`, it is the third instance of one deliberate
construct, not a loose end — see [the pinned-panel pattern](#the-pinned-panel-pattern).

### Resolved

- `academy` now opens with `SectionHeader` on the standard grid. Its panel's right
  column prints the real destination host, derived from `academy.href` so the
  stated destination cannot drift from the actual one.
- Mono scale normalised across 13 files to the four roles above.
- Heading scale normalised to two steps: 22px for a cell in a grid of peers,
  28px for a singular panel or step title.
- `contact` response card was bottom-aligned (`items-end`) and floated below the
  form; now `items-start`. Its status message was centred at 12px — the only
  centred body text on the page — now left at 9px/`0.22em`.

Nothing in this list broke a build or a test. That is the point: they are the
difference between a page that is consistent and a page that is merely finished.

---

## 8. Verifying

```bash
npm run qa      # 73 checks: structure, clipping at 390 and 1440, interaction, reduced motion
npm run build
npm run lint
```

`npm run qa` writes a screenshot of every section at both viewports to `.qa/`.
Read them. The clipping check catches content pushed outside the viewport, but
only a human notices when a section stops looking like the rest of the system.
