# Clone Legacy gamegabyte.com Assets, Styles & Content — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Pull every asset (images, fonts), the original CSS/style tokens, and all text content from the existing Figma Make site `https://gamegabyte.com/` into the new React + Vite project, so the rebuild can be optimized against a faithful local copy.

**Architecture:** The legacy site is a Figma Make SPA. Its real content lives in a code-component JS bundle; styling lives in a sibling CSS bundle; binary assets live under `/_assets/v11/` and fonts under `/_woff/v2/`. We snapshot the raw bundles, then a single idempotent shell script parses asset/font URLs out of the bundles and mirrors them into `public/` preserving their paths (so the original CSS keeps resolving). Style tokens and content are extracted into Markdown references for the rebuild.

**Tech Stack:** Bash (curl, grep, python3 for JSON), React 19 + Vite 8 + TypeScript + Tailwind v4 (already scaffolded).

## Global Constraints

- Source origin: `https://gamegabyte.com` (the user's own site — owner-authorized clone).
- Bundle id: `16d09317-cc2b-480e-a5d3-32b5e158b7c0`.
- Component bundle hash: `34d668635ee5929e2ab690d9abe8380d63d428ce` (`.js` + `.css`).
- Assets version: `v11`; fonts version: `v2`.
- Preserve original URL paths under `public/` (e.g. `public/_assets/v11/<hash>.png`) so relative `url(...)` references in the legacy CSS resolve unchanged.
- All downloads use header `User-Agent: Mozilla/5.0` (origin returns 403 to default curl UA on some paths).
- Expected counts after mirroring: **24** PNG assets, **12** woff2 font files. These are assertion targets, not guesses.
- Idempotent: re-running the script must not duplicate or corrupt files (`curl -o`, overwrite in place).

---

### Task 1: Snapshot raw legacy bundles

**Files:**
- Create: `docs/legacy-site/raw/index.html`
- Create: `docs/legacy-site/raw/_index.json`
- Create: `docs/legacy-site/raw/component.js`
- Create: `docs/legacy-site/raw/component.css`
- Create: `scripts/clone-legacy.sh`

**Interfaces:**
- Produces: `scripts/clone-legacy.sh` with shell vars `ORIGIN`, `BUNDLE_ID`, `COMP_HASH`, and a `snapshot()` function — consumed by Task 2's `mirror_assets()`.

- [ ] **Step 1: Create the script skeleton with snapshot stage**

Create `scripts/clone-legacy.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail

ORIGIN="https://gamegabyte.com"
BUNDLE_ID="16d09317-cc2b-480e-a5d3-32b5e158b7c0"
COMP_HASH="34d668635ee5929e2ab690d9abe8380d63d428ce"
UA="Mozilla/5.0"

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
RAW="$ROOT/docs/legacy-site/raw"

dl() { # url dest
  curl -fsSL -A "$UA" "$1" -o "$2"
}

snapshot() {
  mkdir -p "$RAW"
  dl "$ORIGIN/"                                            "$RAW/index.html"
  dl "$ORIGIN/_json/$BUNDLE_ID/_index.json"               "$RAW/_index.json"
  dl "$ORIGIN/_components/v2/$COMP_HASH.js"                "$RAW/component.js"
  dl "$ORIGIN/_components/v2/$COMP_HASH.css"              "$RAW/component.css"
  echo "snapshot: done"
}

main() {
  snapshot
}
main "$@"
```

- [ ] **Step 2: Make executable and run the snapshot**

Run:
```bash
chmod +x scripts/clone-legacy.sh && ./scripts/clone-legacy.sh
```
Expected: prints `snapshot: done`, exit 0.

- [ ] **Step 3: Verify the four raw files exist and are non-trivial**

Run:
```bash
wc -c docs/legacy-site/raw/index.html docs/legacy-site/raw/_index.json \
      docs/legacy-site/raw/component.js docs/legacy-site/raw/component.css
```
Expected: `index.html` ≈ 16 KB, `_index.json` ≈ 33 KB, `component.js` ≈ 1.1 MB, `component.css` ≈ 110 KB. None zero.

- [ ] **Step 4: Commit**

```bash
git add scripts/clone-legacy.sh docs/legacy-site/raw
git commit -m "chore: snapshot legacy gamegabyte.com bundles"
```

---

### Task 2: Mirror all assets and fonts into public/

**Files:**
- Modify: `scripts/clone-legacy.sh` (add `mirror_assets()` + call in `main`)
- Create: `public/_assets/v11/*.png` (24 files, downloaded)
- Create: `public/_woff/v2/**/*.woff2` (12 files, downloaded)
- Create: `docs/legacy-site/asset-manifest.txt`

**Interfaces:**
- Consumes: `ORIGIN`, `UA`, `RAW`, `ROOT`, `dl()` from Task 1.
- Produces: populated `public/_assets` and `public/_woff` trees + `docs/legacy-site/asset-manifest.txt` (one URL path per line) consumed by Task 3 verification.

- [ ] **Step 1: Add the mirror function**

In `scripts/clone-legacy.sh`, add before `main()`:

```bash
mirror_assets() {
  local manifest="$ROOT/docs/legacy-site/asset-manifest.txt"
  # Extract every asset + font path referenced in the raw bundles.
  grep -ohaE '/_(assets|woff)/[A-Za-z0-9_./-]+\.(png|jpe?g|webp|avif|svg|woff2?)' \
    "$RAW/index.html" "$RAW/_index.json" "$RAW/component.js" "$RAW/component.css" \
    | sort -u > "$manifest"
  echo "found $(wc -l < "$manifest") referenced asset/font URLs"

  while IFS= read -r path; do
    [ -z "$path" ] && continue
    local dest="$ROOT/public$path"
    mkdir -p "$(dirname "$dest")"
    dl "$ORIGIN$path" "$dest"
  done < "$manifest"
  echo "mirror_assets: done"
}
```

Update `main()`:

```bash
main() {
  snapshot
  mirror_assets
}
```

- [ ] **Step 2: Run the mirror**

Run:
```bash
./scripts/clone-legacy.sh
```
Expected: prints `found 36 referenced asset/font URLs` (24 png + 12 woff2), then `mirror_assets: done`, exit 0.

- [ ] **Step 3: Assert exact asset and font counts**

Run:
```bash
echo -n "png: "; find public/_assets -name '*.png' | wc -l
echo -n "woff2: "; find public/_woff -name '*.woff2' | wc -l
```
Expected: `png: 24` and `woff2: 12`. If either differs, stop and reconcile against `docs/legacy-site/asset-manifest.txt` before continuing.

- [ ] **Step 4: Verify no zero-byte downloads (broken fetches)**

Run:
```bash
find public/_assets public/_woff -type f -size 0
```
Expected: no output (every file has content).

- [ ] **Step 5: Commit**

```bash
git add scripts/clone-legacy.sh public/_assets public/_woff docs/legacy-site/asset-manifest.txt
git commit -m "chore: mirror legacy assets (24 png) and fonts (12 woff2) into public/"
```

---

### Task 3: Capture original CSS + extract design tokens

**Files:**
- Create: `src/styles/legacy.css` (copy of the original component CSS, for reference)
- Create: `docs/legacy-site/STYLE.md`

**Interfaces:**
- Consumes: `docs/legacy-site/raw/component.css`, `docs/legacy-site/raw/index.html` (font-face block) from Task 1.
- Produces: `docs/legacy-site/STYLE.md` documenting font families, color values, and the asset/font path convention — the style contract the rebuild follows.

- [ ] **Step 1: Copy the legacy CSS into the project for reference**

Run:
```bash
cp docs/legacy-site/raw/component.css src/styles/legacy.css
```

- [ ] **Step 2: Extract the distinct hex colors used**

Run:
```bash
grep -ohaE '#[0-9a-fA-F]{3,8}\b' src/styles/legacy.css | tr 'A-F' 'a-f' | sort | uniq -c | sort -rn | head -30
```
Expected: a ranked list of hex colors. Record the top brand colors (most frequent) for `STYLE.md`.

- [ ] **Step 3: List the font families**

Run:
```bash
grep -ohaE 'font-family:"[^"]+"' docs/legacy-site/raw/index.html | sort -u
```
Expected: includes `Schibsted Grotesk` (Regular/Medium/SemiBold/Bold) and `Roboto`.

- [ ] **Step 4: Write `docs/legacy-site/STYLE.md`**

Create `docs/legacy-site/STYLE.md` capturing, in your own words, the findings from Steps 2–3:

```markdown
# Legacy Site — Style Reference

Source: https://gamegabyte.com (Figma Make). Raw CSS: `docs/legacy-site/raw/component.css`
(also copied to `src/styles/legacy.css`).

## Fonts
- **Schibsted Grotesk** — headings (weights: Regular, Medium, SemiBold, Bold).
- **Roboto** — body (Regular).
- Files: `public/_woff/v2/SchibstedGrotesk_wght__1/`, `public/_woff/v2/Roboto_wdth_wght__2/`.

## Colors
<paste the ranked hex list from Step 2; mark the most frequent as primary/bg/text>

## Asset convention
- Images: `public/_assets/v11/<sha1>.png` (24 files).
- Original CSS references assets by absolute path `/_assets/...`, which Vite serves
  from `public/` unchanged — no rewrite needed during clone phase.
```

- [ ] **Step 5: Verify the style reference resolves its asset paths**

Run:
```bash
grep -ohaE '/_assets/v11/[a-f0-9]+\.png' src/styles/legacy.css | sort -u | while read p; do
  test -f "public$p" || echo "MISSING: public$p"
done; echo "check done"
```
Expected: prints only `check done` (every CSS-referenced asset exists locally).

- [ ] **Step 6: Commit**

```bash
git add src/styles/legacy.css docs/legacy-site/STYLE.md
git commit -m "docs: capture legacy CSS and extract style tokens"
```

---

### Task 4: Extract content / copy inventory

**Files:**
- Modify: `scripts/clone-legacy.sh` (add `extract_content()` + call in `main`)
- Create: `docs/legacy-site/CONTENT.md`

**Interfaces:**
- Consumes: `docs/legacy-site/raw/component.js` from Task 1.
- Produces: `docs/legacy-site/content-strings.txt` (raw) and a curated `docs/legacy-site/CONTENT.md`.

- [ ] **Step 1: Add content extraction to the script**

In `scripts/clone-legacy.sh`, add before `main()`:

```bash
extract_content() {
  local out="$ROOT/docs/legacy-site/content-strings.txt"
  # Sentence-like quoted string literals from the code-component bundle.
  grep -ohaE '"[A-Z][A-Za-z0-9 ,.!?:&'"'"'-]{12,120}"' "$RAW/component.js" \
    | sort -u > "$out"
  echo "extracted $(wc -l < "$out") candidate content strings"
}
```

Update `main()`:

```bash
main() {
  snapshot
  mirror_assets
  extract_content
}
```

- [ ] **Step 2: Run and inspect**

Run:
```bash
./scripts/clone-legacy.sh && sed -n '1,80p' docs/legacy-site/content-strings.txt
```
Expected: prints `extracted N candidate content strings` and a list including headlines such as
`A Game Website that connect creativity with measurable success.`,
`Explore the impressive game marketing websites we've created...`, FAQ questions, and section
titles (`Design & Concept`, `Gaming Expertise`, `GaByte Academy`, `Launch & Support`).

- [ ] **Step 3: Curate `docs/legacy-site/CONTENT.md`**

Create `docs/legacy-site/CONTENT.md`. Read `content-strings.txt`, drop SVG path data
(strings starting with `M0`/`M10` etc.) and icon labels, and organize the real copy into
sections in document order:

```markdown
# Legacy Site — Content Inventory

Source: https://gamegabyte.com — raw strings in `docs/legacy-site/content-strings.txt`.

## Hero
- Headline: "A Game Website that connect creativity with measurable success."
- ...

## Process / Services
- Design & Concept — ...
- Consultation & Analysis — ...
- Development & Optimization — ...
- Launch & Support — ...

## Portfolio
- "Explore the impressive game marketing websites we've created for game developers worldwide."

## Academy
- GaByte Academy — ...

## FAQ
- "How long does it take to build a game landing page?"
- "Do you provide ongoing support after launch?"
- "Can you integrate with my existing game analytics?"

## Footer / Misc
- "Connect with us", "Documentation", "Cookie Policy"
```

Fill each bullet from the extracted strings; do not invent copy that is not in the source.

- [ ] **Step 4: Verify no SVG path noise remains in the curated doc**

Run:
```bash
grep -nE '"M[0-9]' docs/legacy-site/CONTENT.md || echo "clean"
```
Expected: prints `clean` (no raw SVG path data leaked into the content doc).

- [ ] **Step 5: Commit**

```bash
git add scripts/clone-legacy.sh docs/legacy-site/content-strings.txt docs/legacy-site/CONTENT.md
git commit -m "docs: extract and curate legacy site content inventory"
```

---

### Task 5: Wire assets into the Vite app and verify they load

**Files:**
- Modify: `src/index.css` (register legacy fonts via local woff2 + import legacy.css for reference is optional)
- Create: `src/legacy-check.tsx` (temporary smoke component)
- Modify: `src/App.tsx` (mount `<LegacyCheck />` temporarily)

**Interfaces:**
- Consumes: fonts at `public/_woff/v2/...`, images at `public/_assets/v11/...` from Task 2.
- Produces: visual confirmation that mirrored assets resolve through Vite's dev server.

- [ ] **Step 1: Register one legacy font + reference an asset to prove the pipeline**

Append to `src/index.css`:

```css
@font-face {
  font-family: "Schibsted Grotesk";
  src: url("/_woff/v2/SchibstedGrotesk_wght__1/SchibstedGrotesk_wght__1-english.woff2") format("woff2");
  font-display: swap;
}
```

- [ ] **Step 2: Create a temporary smoke component**

Create `src/legacy-check.tsx`:

```tsx
// TEMPORARY: remove after confirming mirrored assets resolve. See Task 5 Step 6.
const FIRST_ASSET = '/_assets/v11/05ccf6a0ab369ec013ecd173f35b8fda7bada12b.png'

export function LegacyCheck() {
  return (
    <div style={{ fontFamily: 'Schibsted Grotesk', padding: 24 }}>
      <p>Legacy font + asset smoke test</p>
      <img src={FIRST_ASSET} alt="legacy asset 0" width={240} />
    </div>
  )
}
```

- [ ] **Step 3: Mount it temporarily in `src/App.tsx`**

Add the import at the top of `src/App.tsx`:

```tsx
import { LegacyCheck } from './legacy-check'
```

And render it as the first child inside the root `<div>` of `App`:

```tsx
      <LegacyCheck />
```

- [ ] **Step 4: Verify production build still passes**

Run:
```bash
npm run build
```
Expected: `tsc -b && vite build` completes, `✓ built` printed, no type errors.

- [ ] **Step 5: Verify the asset is served (HTTP 200)**

Run the preview server and probe the asset:
```bash
npm run preview -- --port 4173 &
sleep 2
curl -s -o /dev/null -w "%{http_code}\n" "http://localhost:4173/_assets/v11/05ccf6a0ab369ec013ecd173f35b8fda7bada12b.png"
kill %1
```
Expected: prints `200`.

- [ ] **Step 6: Remove the temporary smoke component**

Revert the `<LegacyCheck />` mount and its import in `src/App.tsx`, then delete the file:

```bash
rm src/legacy-check.tsx
```
(Leave the `@font-face` rule in `src/index.css` — it is real.)

- [ ] **Step 7: Final build + commit**

```bash
npm run build
git add src/index.css src/App.tsx
git commit -m "feat: register legacy font; verify mirrored assets serve via Vite"
```

---

## Self-Review

**Spec coverage** (request: "clone toàn bộ asset, style, content, logo, background, image, video"):
- Images / logos / backgrounds → Task 2 (24 PNGs mirrored; logos and backgrounds are among them).
- Fonts → Task 2 (12 woff2) + Task 5 (registered).
- Style → Task 3 (original CSS copied + tokens extracted).
- Content/copy → Task 4.
- Video → no self-hosted file (`.mp4/.webm` grep empty). The "Gamegabyte Studio Reel 2025" is a **YouTube embed**: https://www.youtube.com/watch?v=vd_9qS1AWUU — nothing to mirror locally; on rebuild, lazy-load the iframe (load only on click) for performance. Captured in `docs/legacy-site/CONTENT.md` §8.

**Placeholder scan:** No `TODO`/`TBD`/"handle edge cases" steps; every code/command step is concrete. Task 3 Step 4 and Task 4 Step 3 require human curation of extracted data (paste/organize) — these are explicit transcription steps, not placeholders.

**Type/path consistency:** Asset paths (`public/_assets/v11/...`), font paths (`public/_woff/v2/...`), bundle id, and component hash are identical across all tasks and match the Global Constraints.
