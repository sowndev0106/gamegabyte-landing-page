# Hero Background Variants Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Generate and validate three selectable hero background images that match Gamegabyte's current visual system.

**Architecture:** Each variant is generated as an independent raster asset from a purpose-built prompt. Accepted outputs are copied into the existing background asset directory and inspected individually; no application code or active asset reference changes until the user chooses a winner.

**Tech Stack:** Built-in OpenAI image generation, local image inspection, ImageMagick metadata checks, WebP/PNG raster assets.

## Global Constraints

- Use a 16:9 landscape composition suitable for a full-width landing-page hero.
- Use a premium dark sci-fi gaming style with purple/ultraviolet energy and restrained acid-lime accents matching `#b6e802`.
- Keep the central headline and CTA zone dark, low-contrast, and visually quiet.
- Compose safely for `object-cover` across desktop and mobile crops.
- Include no text, typography, logos, UI, borders, signatures, or watermarks.
- Do not change the active hero asset reference before the user selects a winner.

---

### Task 1: Generate the cyber heroine variant

**Files:**
- Create: `public/assets/img/backgrounds/hero-cyber-heroine-v1.png`

**Interfaces:**
- Consumes: visual rules in `docs/superpowers/specs/2026-08-13-hero-background-variants-design.md`
- Produces: a standalone 16:9 hero candidate with the character in the right third

- [ ] **Step 1: Generate the image**

Use the built-in image generation tool with a structured `stylized-concept` prompt specifying a right-aligned futuristic heroine, purple energy ring, restrained lime details, and a dark quiet center.

- [ ] **Step 2: Save the generated output**

Copy the accepted result to `public/assets/img/backgrounds/hero-cyber-heroine-v1.png` without overwriting an existing asset.

- [ ] **Step 3: Validate the asset**

Run:

```bash
identify public/assets/img/backgrounds/hero-cyber-heroine-v1.png
```

Expected: a readable landscape raster image. Visually inspect that the face and armor avoid the center copy zone and that no text or watermark is present.

### Task 2: Generate the portal arena variant

**Files:**
- Create: `public/assets/img/backgrounds/hero-portal-arena-v1.png`

**Interfaces:**
- Consumes: visual rules in `docs/superpowers/specs/2026-08-13-hero-background-variants-design.md`
- Produces: a standalone 16:9 environment-led hero candidate

- [ ] **Step 1: Generate the image**

Use the built-in image generation tool with a structured `stylized-concept` prompt specifying an unoccupied futuristic arena, purple portal, architectural framing, restrained lime details, and a dark quiet center.

- [ ] **Step 2: Save the generated output**

Copy the accepted result to `public/assets/img/backgrounds/hero-portal-arena-v1.png` without overwriting an existing asset.

- [ ] **Step 3: Validate the asset**

Run:

```bash
identify public/assets/img/backgrounds/hero-portal-arena-v1.png
```

Expected: a readable landscape raster image. Visually inspect responsive crop tolerance, copy clearance, and absence of text or watermarks.

### Task 3: Generate the fantasy-sci-fi battlefield variant

**Files:**
- Create: `public/assets/img/backgrounds/hero-fantasy-battlefield-v1.png`

**Interfaces:**
- Consumes: visual rules in `docs/superpowers/specs/2026-08-13-hero-background-variants-design.md`
- Produces: a standalone 16:9 atmospheric hero candidate with a small distant figure

- [ ] **Step 1: Generate the image**

Use the built-in image generation tool with a structured `stylized-concept` prompt specifying a wide fantasy-sci-fi battlefield, distant warrior silhouette, floating debris, restrained purple/lime energy, and a dark quiet center.

- [ ] **Step 2: Save the generated output**

Copy the accepted result to `public/assets/img/backgrounds/hero-fantasy-battlefield-v1.png` without overwriting an existing asset.

- [ ] **Step 3: Validate the asset set**

Run:

```bash
identify public/assets/img/backgrounds/hero-*-v1.png
```

Expected: three readable landscape raster files. Visually compare palette cohesion, copy clearance, object-cover crop safety, unwanted text, and obvious generation artifacts. Present all three to the user without changing `src/content/content.ts`.

