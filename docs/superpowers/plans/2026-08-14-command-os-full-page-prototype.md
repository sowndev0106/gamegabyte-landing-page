# Command OS Full-Page Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and host a standalone, interactive full-page Gamegabyte prototype that reinterprets every active and parked production section as a native Variant B Command OS.

**Architecture:** One static HTML document at `prototypes/command-os-full-page/index.html` contains shared tokens, semantic page markup, responsive Command OS layouts, and small vanilla-JavaScript controllers for navigation, video, FAQ, and contact form state. Vite serves the page through a dedicated npm script from an isolated retained worktree and branch; no production source is modified.

**Tech Stack:** Semantic HTML, modern CSS, vanilla JavaScript, existing repository images/video/fonts, Vite 8, Playwright 1.61 for interaction and visual QA.

## Global Constraints

- Include Header, Hero, Showreel, Stats, Services, Work Process, Why Choose Us, Portfolio, Case Study, Testimonials, Academy, FAQ, Contact, and Footer.
- Preserve production copy, project destinations, Academy external URL, repository images, and reel video.
- Follow Variant B's rail, topbar, technical grid, lime signals, violet depth, asymmetric archive, orbital process, and operational vocabulary.
- Keep production React files and all existing prototypes unchanged.
- Mark the artifact prototype-only and retain its branch/worktree after delivery.
- Support `1440x1000` desktop and `390x844` mobile without horizontal overflow.
- Stop continuous decorative motion under `prefers-reduced-motion: reduce`.

---

### Task 1: Create the isolated prototype shell and full content system

**Files:**
- Create: `prototypes/command-os-full-page/index.html`
- Modify: `package.json`

**Interfaces:**
- Consumes: Content and asset paths from `src/content/content.ts`, plus local fonts under `public/fonts/`.
- Produces: `npm run prototype:command-os`, opening `/prototypes/command-os-full-page/index.html`; semantic section IDs `home`, `reel`, `telemetry`, `services`, `process`, `about`, `portfolio`, `case-study`, `testimonials`, `academy`, `faq`, and `contact`.

- [ ] **Step 1: Record production and existing-prototype baselines**

Run:

```bash
git diff -- src package.json prototypes/cinematic-tech-hud prototypes/stats-section-variants > /tmp/command-os-before.diff
```

Expected: the baseline captures all tracked differences in files that the prototype must not alter.

- [ ] **Step 2: Add the one-command runner**

Add without modifying existing scripts:

```json
"prototype:command-os": "vite --host 127.0.0.1 --open /prototypes/command-os-full-page/index.html"
```

- [ ] **Step 3: Build the global Command OS shell**

Create `prototypes/command-os-full-page/index.html` with:

```html
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <aside class="command-rail">
    <a href="#home" aria-label="Gamegabyte home">GGB</a>
    <nav aria-label="Command sections">
      <a href="#home">01</a><a href="#services">04</a><a href="#process">05</a><a href="#portfolio">07</a><a href="#contact">12</a>
    </nav>
    <span>Online</span>
  </aside>
  <header class="command-topbar"><span>Studio network online</span><a href="#contact">Open channel</a></header>
  <header class="mobile-commandbar"><a href="#home">Gamegabyte</a><button type="button" aria-expanded="false" aria-controls="mobile-menu">Menu</button></header>
  <main id="main">
    <section id="home"></section><section id="reel"></section><section id="telemetry"></section>
    <section id="services"></section><section id="process"></section><section id="about"></section>
    <section id="portfolio"></section><section id="case-study"></section><section id="testimonials"></section>
    <section id="academy"></section><section id="faq"></section><section id="contact"></section>
  </main>
  <p class="prototype-flag">Prototype only / Command OS study</p>
</body>
```

Use shared CSS variables `--ink`, `--lime`, `--violet`, `--white`, `--muted`, `--line`, `--display`, `--sans`, and `--mono`. Implement the desktop sticky rail, topbar, mobile command bar/menu, keyboard focus, technical-grid utility, section heading pattern, button styles, and reduced-motion rules.

- [ ] **Step 4: Implement Hero through Work Process**

Add these semantic sections with exact production copy and assets:

- `#home`: portal-arena background, `We Are The Game / Marketing Studio`, CTAs, credentials, campaign-readiness dashboard, capability ticker.
- `#reel`: `/video/reel-2025.mp4`, `/assets/img/portfolio/nova-core-ui.webp`, monitored transmission frame, play/pause and mute controls.
- `#telemetry`: all four production stats, one primary and three supporting readouts.
- `#services`: all six production services in an input/output matrix plus the four technology notes.
- `#process`: sticky orbital system and all four production process steps on a signal path.

Expected: each section has one heading, all required production strings, and stable IDs for navigation.

- [ ] **Step 5: Implement Why Choose Us through Academy**

Add:

- `#about`: four operational advantage nodes containing tag, title, body, and sprites from `/assets/img/backgrounds/pixel-tree-tiles.webp`.
- `#portfolio`: asymmetric three-project archive using the three production portfolio assets and `#contact` destinations.
- `#case-study`: Seedify/Beyond The Keep dossier with all nine declared screens and labels.
- `#testimonials`: communication log containing the full Mickael Grants quote, name, and role.
- `#academy`: training terminal with Academy title/body/CTA, battlefield artwork, and external URL `https://game-uxui-fundamentals.gamegabyte.com/` using `target="_blank" rel="noreferrer"`.

Expected: parked sections are visible in document order after Portfolio and before FAQ.

- [ ] **Step 6: Implement FAQ, Contact, and Footer**

Add:

- `#faq`: four real `<button>` diagnostic disclosures with `aria-expanded="false"`, stable `aria-controls`, and answer panels hidden by default.
- `#contact`: required name/email/message fields, submit button, `aria-live="polite"` local status region, and the `Replies in 2 working days` status card.
- Footer: three production link groups, four social labels, `Connect with us`, and prototype network-status strip.

Expected: all production FAQ, contact, footer, and social strings are present.

- [ ] **Step 7: Implement interactions**

Add vanilla JavaScript controllers with these exact states:

```js
menuButton.setAttribute('aria-expanded', String(menuOpen))
faqButton.setAttribute('aria-expanded', String(open))
video.paused ? video.play() : video.pause()
video.muted = !video.muted
formStatus.textContent = 'Transmission received / Local prototype only'
```

Also implement IntersectionObserver active-navigation updates, menu close after selection, Escape dismissal, and video control label updates. Form submission must call `event.preventDefault()` and send no request.

- [ ] **Step 8: Validate content, accessibility state, and isolation**

Use Playwright at `1440x1000` and `390x844` to assert:

```js
document.querySelectorAll('main > section').length === 12
document.querySelectorAll('.diagnostic-button').length === 4
document.querySelectorAll('.dossier-screen').length === 9
document.documentElement.scrollWidth === window.innerWidth
```

Exercise mobile menu, FAQ, video mute, contact submission, Academy link attributes, and navigation. Assert no browser console errors. In reduced-motion context assert no decorative animation remains in `running` state after page load settles.

Run:

```bash
git diff -- src prototypes/cinematic-tech-hud prototypes/stats-section-variants > /tmp/command-os-after.diff
cmp /tmp/command-os-before.diff /tmp/command-os-after.diff
npm run build
git diff --check -- package.json prototypes/command-os-full-page/index.html
```

Expected: all commands exit `0`.

- [ ] **Step 9: Capture visual QA and commit prototype deliverables**

Capture full-page and representative section screenshots for desktop and mobile. Inspect Hero, Showreel, Process, Case Study, Academy, FAQ, and Contact for clipping, overlap, image cropping, and hierarchy. Fix only issues inside the prototype.

Commit:

```bash
git add package.json prototypes/command-os-full-page/index.html docs/superpowers/plans/2026-08-14-command-os-full-page-prototype.md
git commit -m "prototype: build full-page command OS direction"
```

Expected: branch remains separate, worktree remains available, and the local prototype server stays running for review.
