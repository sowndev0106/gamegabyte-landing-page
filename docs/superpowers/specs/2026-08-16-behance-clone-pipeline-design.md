# Behance clone pipeline — design

Date: 2026-08-16
Status: approved
Scope: phase 1 only — data + assets. No UI, no routing, no changes to `Portfolio.tsx`.

## Goal

Mirror the first 16 projects of `https://www.behance.net/thaliatran` into the repo
as durable, typed, self-hosted content: one summary record per project for a
showcase list page, one full record per project for a detail page, and every
image served from our own origin.

The site must never fetch from `behance.net` at runtime. Behance is the source of
truth at clone time and nothing more.

## What the source actually gives us

Verified against the live pages on 2026-08-16.

Every Behance page embeds its full Redux state in the HTML:

```html
<script type="application/json" id="beconfig-store_state">…</script>
```

Plain `curl` with a desktop UA returns HTTP 200 and that state is complete. No
headless browser is needed to read a project.

**Profile** (`state.profile.activeSection.work`):

- `profileSections[0].projectCount` — 24 total
- `profileProjects[]` — only the first 12 are server-rendered
- `hasMore`, `cursor` — the rest load on scroll

Reaching 16 therefore needs one pagination step. We drive it with Playwright
(already a devDependency, chromium already installed): load the profile, scroll
until `profileProjects.length >= limit`, read the store back out of the DOM.
Playwright is used for this and nothing else.

**Project detail** (`state.project.project`):

| field | example |
|---|---|
| `name` | `Seedworld Game UI \| Creative Mode` |
| `description` | one-paragraph plain text |
| `tags[]` | `#gameui`, `#Seedworld`, `#gamedesign` |
| `tools[]` | `Figma`, `Adobe Photoshop` |
| `publishedOn` | unix seconds |
| `stats` | `views`, `appreciations`, `comments` |
| `creator` | `displayName`, `url` |
| `covers.allAvailable[]` | includes an `original` variant (~2071px) |
| `modules[]` | 15 on the sample, all `ImageModule` |

Each `ImageModule` carries `src`, `width`, `height`, `altText`, `caption`, and
`imageSizes.allAvailable[]` — which includes a `source` variant up to 2880px.
That is the one we download. Some modules are `.gif`.

Roughly 240 images across 16 projects.

## Layout

Follows the convention `clone-legacy.sh` already established: raw downloads are
gitignored and reproducible, derived web assets are committed.

```
scripts/clone-behance.mjs           # the whole pipeline

docs/behance/raw/                   # audit trail — committed, small
  profile.json
  projects/<id>-<slug>.json         # untouched store slice, per project

_assets-src/behance/<slug>/         # originals — gitignored
  cover.png  01.png  02.gif …

public/assets/img/work/<slug>/      # derived webp — committed
  cover.webp  01.webp  02.webp …

src/content/work/
  index.json                        # 16 summaries, list page
  <slug>.json                       # one per project, detail page
  types.ts                          # types + typed loaders
```

Keeping `docs/behance/raw/` in git means a schema change on Behance's side does
not cost us the data — the normalizer can be re-run offline against the snapshot.

## Schema

`slug` is the Behance slug lowercased (`Seedworld-Game-UI-Creative-Mode` →
`seedworld-game-ui-creative-mode`). It is the directory name, the JSON filename,
and the future URL segment — one identifier, no mapping table to drift.

### `index.json` — `WorkSummary[]`

```ts
{
  id: string            // Behance project id, stable across renames
  slug: string
  title: string         // raw name, pipes intact
  titleParts: string[]  // name split on '|', trimmed
  description: string
  cover: string         // '/assets/img/work/<slug>/cover.webp'
  coverWidth: number
  coverHeight: number
  tags: string[]        // leading '#' stripped
  tools: string[]
  publishedOn: string   // ISO date
  sourceUrl: string
  author: { name: string, url: string }
}
```

`titleParts` exists because every title on this profile is pipe-delimited
(`Game Platform | UI/UX Design | Seedworld Quests`). Splitting at clone time
lets the page choose its own hierarchy without parsing strings in a component.

### `<slug>.json` — `WorkDetail`

`WorkSummary` plus `blocks: WorkBlock[]`, a discriminated union rendered in
order:

```ts
| { type: 'image', src, width, height, alt, caption }
| { type: 'text',  html }
| { type: 'embed', url, html? }
```

Behance module types map onto this union; an unrecognised module is skipped and
logged rather than failing the run. The union is ours, not Behance's — the
detail page renders `blocks` and never learns what a `MediaCollectionModule` is.

## Pipeline

Two stages in one script, each independently re-runnable.

**Stage 1 — snapshot.** Playwright loads the profile and scrolls until 16
projects are in the store; writes `profile.json`. Then `fetch` each project URL,
extract the store, write `projects/<id>-<slug>.json`. Network only.

**Stage 2 — normalize.** Read the snapshots. For each project: download cover +
module images at the largest available variant into `_assets-src/behance/<slug>/`,
convert with sharp into `public/assets/img/work/<slug>/`, emit `index.json` and
`<slug>.json`. No network beyond image downloads.

Image handling: resize to ≤2048px wide, WebP quality 80 — matching
`optimize-images.mjs`. Animated GIFs convert to animated WebP
(`sharp(buf, { animated: true })`); on failure the original `.gif` is copied
through unchanged and the failure logged. Downloads are skipped when the target
already exists, so re-runs are cheap.

Flags: `--limit=16`, `--force` (ignore existing files), `--stage=snapshot|normalize`.

## Error handling

- A project that fails to fetch or parse is logged and skipped; the run
  continues and the summary reports it. One dead project must not cost the
  other fifteen.
- A missing `source` image variant falls back down the `allAvailable` list by
  descending width.
- The script prints a final tally: projects written, images downloaded, images
  converted, failures. A non-zero failure count exits non-zero so the result is
  never silently partial.

## Out of scope

Routing, the showcase list page, the detail page, and any change to existing
sections. Those follow once the data exists and can be designed against real
content instead of guesses.

## Provenance

Every record keeps `sourceUrl` and `author`. The user has confirmed rights to
publish this work.
