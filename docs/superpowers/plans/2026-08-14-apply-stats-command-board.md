# Apply Stats Signal Command Board Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current four-column Stats readout with approved prototype A, Signal Command Board, in production.

**Architecture:** Keep the existing `Section`, `SectionHeader`, `Container`, `Reveal`, `CountUp`, and `content.stats` data flow. Render `content.stats[0]` as the dominant left readout and `content.stats.slice(1)` as the right command grid; add narrowly prefixed CSS for the orbit, status pulse, and signal trace.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4, existing motion components, CSS keyframes, Node test runner, Playwright visual QA.

## Global Constraints

- Apply only approved variant A; do not redesign it during implementation.
- Do not change `src/content/content.ts` or the meaning of any metric.
- Preserve existing Stats heading, section index, count-up behavior, reduced-motion support, and surrounding sections.
- Do not merge or delete the Stats prototype branch/worktree.
- Prevent horizontal overflow and clipped content on desktop and mobile.

---

### Task 1: Implement Signal Command Board in production

**Files:**
- Modify: `src/sections/Stats.tsx`
- Modify: `src/index.css`
- Modify: `scripts/services-stack.test.mjs`

**Interfaces:**
- Consumes: `content.stats`, where the first entry is the primary metric and the remaining three are secondary metrics.
- Produces: The production Stats section with `.stats-command-board`, `.stats-command-primary`, `.stats-command-secondary`, and `.stats-signal-trace` hooks.

- [ ] **Step 1: Add a failing structural regression test**

Assert that `Stats.tsx` retains `CountUp` and `content.stats`, renders `content.stats[0]`, maps `content.stats.slice(1)`, and includes all four command-board CSS hooks.

- [ ] **Step 2: Run the focused test and confirm RED**

Run `node --test scripts/services-stack.test.mjs` and confirm the new Stats test fails because `.stats-command-board` is absent.

- [ ] **Step 3: Implement the approved composition**

Replace only the current four-column readout with a two-column command board. Use the first stat as the primary reading, the remaining three as secondary readings, preserve `CountUp`, and add an accessible decorative signal SVG with `aria-hidden="true"`.

- [ ] **Step 4: Add scoped responsive and motion CSS**

Add `.stats-command-*` styles for the orbit, status indicator, secondary grid borders, signal trace, desktop/mobile layouts, and reduced-motion animation disabling. Keep all selectors scoped to the Stats component.

- [ ] **Step 5: Verify automated checks**

Run `node --test scripts/services-stack.test.mjs`, `npm run lint`, `npm run build`, and `git diff --check`. Expected: all exit `0`.

- [ ] **Step 6: Verify rendered behavior**

Use Playwright at `1440x1000` and `390x844` to confirm four metrics, one primary readout, three secondary readouts, no console errors, no horizontal overflow, and zero running animations with reduced motion enabled.

- [ ] **Step 7: Hand off without committing shared production changes**

Report the local production URL and the exact verification evidence. Leave the current dirty branch intact because production files contain other user-owned changes.
