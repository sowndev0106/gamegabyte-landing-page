# Stats Section HTML Variants Design

**Goal:** Explore three substantially different visual directions for the `[02] Our Numbers` section before selecting one for production.

## Scope

- Build a standalone HTML prototype containing variants A, B, and C.
- Keep `src/sections/Stats.tsx` and all other production code unchanged.
- Preserve all existing prototypes, including `prototypes/cinematic-tech-hud/index.html`.
- Reuse the current production copy and four statistics without changing their meaning.
- Provide one local command and URL-based switching between variants.

## Shared Visual Language

All variants use Gamegabyte's current near-black ink background, lime accent, white display typography, monospaced metadata, hairline borders, subtle technical grids, and restrained motion. The prototype must remain readable and usable on desktop and mobile, respect reduced-motion preferences, and clearly identify itself as prototype-only.

## Variant A — Signal Command Board

The `25+ Studio Projects` metric becomes a dominant readout occupying the left side. The other three statistics form a compact command board on the right. A restrained signal trace connects the readings and animates only to communicate system activity. This is the recommended option because it creates a clear hierarchy and fits the cinematic technology direction without sacrificing comprehension.

## Variant B — Studio Trajectory

The four metrics become milestones on a rising trajectory. Each metric is anchored to a luminous node, with the connecting path suggesting studio momentum rather than acting as decoration. Desktop uses a diagonal composition; mobile converts it to a vertical progression to preserve reading order.

## Variant C — Live Data Ledger

The metrics become four full-width terminal-like rows. Each row carries an index, a large value, label, supporting note, and directional indicator. A subtle scan treatment and hover response give the section a live data-feed character. This direction is the most editorial and least card-like.

## Interaction and Switching

- Query parameter: `?variant=A`, `?variant=B`, or `?variant=C`.
- A fixed bottom switcher shows the active direction and lets the reviewer change variants.
- Left/right arrow keys cycle variants.
- Motion is subtle and disabled under `prefers-reduced-motion: reduce`.

## Acceptance Criteria

- All three variants render from one standalone HTML page.
- Every variant displays the same heading, description, and four production statistics.
- The three compositions are visibly distinct, not minor styling variations.
- No production source file is modified by the prototype.
- Desktop and mobile layouts have no horizontal overflow.
