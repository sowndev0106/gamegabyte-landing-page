# Gamegabyte Live Parity Design

## Goal

Rework the current Gamegabyte React rebuild so it matches the live `https://gamegabyte.com/` page as closely as practical, while keeping the optimized local React/Vite/Tailwind/Motion implementation. The site should feel like a clone of the live Figma Make page, not a loosely inspired redesign.

## Visual Target

- Match the live black/lime/purple art direction.
- Prioritize above-the-fold parity first: header, GAME/GABYTE wordmark, nav, lime CTA, large hero typography, hero vertical placement, CTA buttons, and decorative plus marks.
- Preserve the 13-section content structure from `docs/legacy-site/CONTENT.md`, but tune section scale, spacing, borders, colors, and typography to follow the live screenshots.
- Use live screenshots as the visual source of truth when the plan and implementation disagree.

## Asset Taxonomy

Hash-only asset references should be replaced with semantic paths. Assets remain WebP and stay under `public/assets/img/`, but move into purpose-based folders:

- `brand/` for Gamegabyte marks or site identity assets.
- `clients/` for partner/client logos, including Sycamore, Disney Speedstorm, Seedify, Tally, and similar marks.
- `portfolio/` for game UI, case-study, gameplay, HUD, and showcase imagery.
- `backgrounds/` for wide decorative/hero/background images.
- `icons/` for small icons and favicon-like marks.

Example required mapping:

- `public/assets/img/4038f95b0cd6c2746fe4f2da7590b09366d59ac2.webp` becomes `public/assets/img/clients/sycamore-logo.webp`.

The React code should import/reference semantic asset paths through `src/content/content.ts` or a small asset map, not raw hashes in section components.

## Page Implementation

- `src/App.tsx` remains the top-level section composition.
- `src/content/content.ts` owns copy and semantic asset paths.
- Sections remain split under `src/sections/`.
- Shared UI and motion primitives remain under `src/components/`.
- Avoid decorative card-heavy redesigns. Keep the live page’s stark black surfaces, sharp rectangular CTA buttons, and restrained lime/purple accents.

## Section Priorities

1. Header and hero must be closest to live.
2. Client/trust bar must use actual client logo assets and correct grouping.
3. Services, process, why, stats, portfolio, showreel, testimonials, academy, FAQ, contact, and footer should be tuned section-by-section after the hero.
4. Showreel must use `/video/reel-2025.mp4`; its poster must not use a client logo.
5. Portfolio cards must use portfolio/game UI imagery, not client logos.

## E2E Visual Verification

Each parity pass should capture:

- Live desktop and mobile screenshots from `https://gamegabyte.com/`.
- Local desktop and mobile screenshots from the Vite app.
- An asset contact sheet after renaming.

Screenshots go in `docs/legacy-site/screenshots/`.

Because the live Figma Make site scrolls inside an internal frame, full-page capture may only show the first viewport. For visual parity, compare the visible viewport and then inspect/capture sections by scrolling where possible.

## Acceptance Criteria

- `npm run build` passes.
- `npm run lint` passes.
- Local homepage returns HTTP 200.
- Local video returns HTTP 200.
- `dist` ships no PNG files.
- No section references hash-only asset paths directly.
- Client logos live in `public/assets/img/clients/`.
- The hero/header visible viewport is substantially closer to the live screenshot than the current rebuild.
