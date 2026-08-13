# Redrawn Section PNG Export Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a reusable export workflow that generates sharp PNG files for Gamegabyte landing-page sections.

**Architecture:** A Node/Playwright script opens the built Vite app, computes section group bounds from DOM selectors, and saves high-DPR screenshots into `design/d1cfc480-redrawn-sections`. A small Node test locks the export manifest so filenames and selector groups remain stable.

**Tech Stack:** Vite, React, Playwright, Node test runner, ImageMagick verification commands.

## Global Constraints

- Do not overwrite `design/d1cfc480-b94f-4bad-87e1-58b744b4c397.png`.
- Do not overwrite `design/d1cfc480-sections`.
- Export PNG files to `design/d1cfc480-redrawn-sections`.
- Use source-rendered UI rather than sharpening the old screenshot.

---

### Task 1: Export Manifest Test

**Files:**
- Create: `scripts/export-redrawn-sections.test.mjs`
- Create: `scripts/export-redrawn-sections.mjs`

**Interfaces:**
- Produces: `SECTION_EXPORTS`, an array of `{ name: string, selectors: string[] }`
- Produces: `getOutputPath(outputDir: string, name: string): string`

- [ ] **Step 1: Write the failing test**

```js
import assert from 'node:assert/strict'
import test from 'node:test'
import { SECTION_EXPORTS, getOutputPath } from './export-redrawn-sections.mjs'

test('section export manifest uses stable png names and selectors', () => {
  assert.deepEqual(
    SECTION_EXPORTS.map((section) => section.name),
    [
      '01-hero-showreel-stats.png',
      '02-services.png',
      '03-process.png',
      '04-growth-partner-selected-projects.png',
      '05-testimonials-academy.png',
      '06-faq.png',
      '07-contact.png',
      '08-footer.png',
    ],
  )

  for (const section of SECTION_EXPORTS) {
    assert.ok(section.selectors.length > 0)
    assert.ok(section.selectors.every((selector) => selector.startsWith('#') || selector.startsWith('[data-export=')))
  }

  assert.equal(
    getOutputPath('design/d1cfc480-redrawn-sections', '02-services.png'),
    'design/d1cfc480-redrawn-sections/02-services.png',
  )
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/export-redrawn-sections.test.mjs`

Expected: FAIL because `scripts/export-redrawn-sections.mjs` does not exist.

- [ ] **Step 3: Implement the export manifest and screenshot workflow**

Create `scripts/export-redrawn-sections.mjs` with exported manifest, helper functions, and CLI execution.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test scripts/export-redrawn-sections.test.mjs`

Expected: PASS.

### Task 2: Generate and Verify PNG Files

**Files:**
- Use: `scripts/export-redrawn-sections.mjs`
- Create: `design/d1cfc480-redrawn-sections/*.png`

**Interfaces:**
- Consumes: `SECTION_EXPORTS`
- Produces: valid PNG screenshots

- [ ] **Step 1: Build the app**

Run: `npm run build`

Expected: exit code 0.

- [ ] **Step 2: Start preview server**

Run: `npm run preview -- --host 127.0.0.1 --port 4173`

Expected: server accepts requests at `http://127.0.0.1:4173`.

- [ ] **Step 3: Run export**

Run: `node scripts/export-redrawn-sections.mjs --url http://127.0.0.1:4173 --out design/d1cfc480-redrawn-sections`

Expected: eight PNG files written.

- [ ] **Step 4: Verify dimensions**

Run: `identify design/d1cfc480-redrawn-sections/*.png`

Expected: every output is a PNG with width greater than 0 and height greater than 0.
