export const assets = {
  clients: [
    { name: 'Sycamore', logo: '/assets/img/clients/sycamore-logo.webp' },
    { name: 'Disney Speedstorm', logo: '/assets/img/clients/disney-speedstorm-logo.webp' },
    { name: 'Tally', logo: '/assets/img/clients/tally-logo.webp' },
    { name: 'Seedify', logo: '/assets/img/clients/seedify-logo.webp' },
  ],
  backgrounds: {
    hero: '/assets/img/backgrounds/hero-fantasy-battlefield-v1.png',
    // Cut-out art with real alpha, not a scene: the hero composites it over ink
    // rather than tinting a photo down to a texture. See `Hero`.
    heroMascot: '/assets/img/backgrounds/hero-mascot-orbit.webp',
    pattern: '/assets/img/backgrounds/gamegabyte-pattern-glow.webp',
    pixelTrees: '/assets/img/backgrounds/pixel-tree-tiles.webp',
    battlefield: '/assets/img/backgrounds/hero-fantasy-battlefield-v1.png',
    characterWide: '/assets/img/backgrounds/fantasy-character-wide.webp',
    mech: '/assets/img/backgrounds/mech-concept-art.webp',
  },
  portfolio: [
    '/assets/img/portfolio/combat-magic-scene.webp',
    '/assets/img/portfolio/fantasy-character-art.webp',
    '/assets/img/portfolio/beyond-the-keep-menu.webp',
  ],
  // Cut from the reel itself rather than borrowed from the portfolio grid, so
  // the still under the play button is a frame of what actually plays. Lives
  // beside its video on the same stem, the way mirrored project video does.
  reelPoster: '/video/reel-2025.webp',
  // The studio's poster for the current master class, whole and uncropped at
  // its native 16:9. `Academy` gives it a full-width frame at that exact ratio,
  // so nothing composed into it — the mascot, the billing block, the Master
  // Classes lockup, the instructor's signature — is ever trimmed by a column.
  //
  // Its right half is a typeset billing block: course number, date, schedule.
  // Type baked into an image cannot be read by a screen reader, selected,
  // translated or searched, and at 350px wide it is barely legible at all — so
  // `academy.course.rows` sets the same four facts as real text under the
  // frame. That is a deliberate duplication, not an oversight: the poster is
  // the picture of the course, the strip is the readable copy of it.
  academyCourse: '/assets/img/academy/game-uxui-fundamentals.webp',
  video: '/video/reel-2025.mp4',
} as const

export const content = {
  // Navigation lives in `src/content/sections.ts` — the rail, the topbar groups
  // and the mobile menu are all generated from the section registry, so there is
  // no separate nav list to keep in sync.
  shell: {
    // The topbar prints `<host>:<path>$`, where the path is the section being
    // read (see `sectionPath`). Only the host is copy; the rest is a reading.
    host: 'gamegabyte',
    cta: 'Open channel',
    brand: 'Gamegabyte / OS',
    menu: 'Menu',
  },
  hero: {
    // Three display lines rather than one string, so the accent line is data
    // rather than a substring the component has to go hunting for.
    // Accent is per LINE, not per word, so the phrase has to break where the
    // emphasis does — "Video games" is its own line because it is the lime one.
    headline: [
      { text: 'We make', accent: false },
      { text: 'websites for', accent: false },
      { text: 'Video games', accent: true },
    ],
    sub: 'Launch pages, storefronts and campaign sites for game studios — built to turn attention into players.',
    primaryCta: 'Case Study',
    secondaryCta: 'Connect with us',
    // The right half of the fold is `assets.backgrounds.heroMascot` and nothing
    // else — no copy. It replaced a node table that restated `services` in a
    // panel; the section it duplicated is one scroll down, so the table was
    // paying for the fold's whole right half to say something already said.
    // The client band across the floor of the fold carries no copy at all —
    // it is `assets.clients` and nothing else. See `TrustTicker`.
  },
  reel: {
    title: 'Showreel 2025',
    intro: 'A minute of interface design, campaign pages and launch art shipped for game teams.',
    ariaLabel: 'Gamegabyte Studio Reel 2025',
    src: assets.video,
    status: 'Transmission ready',
    controls: {
      play: 'Play signal',
      pause: 'Pause signal',
      muteOn: 'Mute: on',
      muteOff: 'Mute: off',
    },
  },
  trust: {
    title: 'Growing with Game Studios Worldwide',
    note: 'Delivering focused impact for game teams.',
  },
  // `unit` carries the dimension of a figure that is not a bare count, so the
  // readout can set it a size down instead of running `1 WEEK` across a cell
  // that is only ~150px wide inside its padding.
  stats: [
    { value: '25+', label: 'Studio Projects', note: 'Across AAA & mobile titles' },
    { value: '3', unit: 'Days', label: 'To First Prototype', note: 'First loop back in three days' },
    { value: '1', unit: 'Week', label: 'From Brief to Delivery', note: 'From one week, scope depending' },
    { value: '100%', label: 'Design-Led Production', note: 'No templates. No shortcuts.' },
    { value: '2024', label: 'Studio Founded', note: 'Built for long-term collaboration' },
  ],
  // `kind` names the axis each discipline sits on in the systems matrix.
  services: [
    { kind: 'Web', title: 'Game Landing Pages', body: 'High-impact campaign pages built around discovery and conversion.' },
    { kind: 'Product', title: 'UI/UX Design', body: 'Player-focused interfaces shaped around your game identity.' },
    { kind: 'Data', title: 'Marketing Systems - SEO', body: 'Connected analytics and campaign experiences for launch.' },
    { kind: 'Players', title: 'Community Features', body: 'Systems that turn an audience into an active player base.' },
  ],
  systemsMatrix: {
    title: ['One network.', 'Four capabilities.'],
    intro: 'Four disciplines in one launch system, split between what goes in and what comes out.',
    inputKey: 'Input / Discipline',
    outputKey: 'Output / Growth',
  },
  // `sprite` indexes the 4×4 pixel-character sheet, left-to-right, top-to-bottom.
  // `tag` names the attribute each point stands for — these four are parallel
  // claims, not a sequence, so they carry a label rather than a step number.
  // `meta` restates each claim in the page's readout voice; it introduces no
  // new promise beyond the body copy beside it.
  why: [
    { tag: 'Turnaround', title: 'Lightning speed delivery', body: 'Fast turnaround without compromise.', sprite: 5, meta: 'Latency / Low' },
    { tag: 'Value', title: 'Unbeatable Pricing', body: 'Competitive pricing without sacrificing quality, built to maximize ROI.', sprite: 8, meta: 'Efficiency / High' },
    { tag: 'Insight', title: 'Gaming Expertise', body: 'A team of gamers who understand player psychology and what attracts game audiences.', sprite: 0, meta: 'Sector / Native' },
    { tag: 'Craft', title: 'Design-Led Production', body: 'No templates. No shortcuts. Visually attractive design from concept to final result.', sprite: 6, meta: 'Quality / Locked' },
  ],
  advantagesSection: {
    title: ['Built as a', 'growth partner.'],
    intro: 'Four system attributes that protect speed, value, insight and craft.',
  },
  portfolio: {
    title: 'Project Showcase',
    intro: "Explore the impressive game marketing websites we've created for game developers worldwide.",
    tags: ['UI/UX', 'FRONTEND', 'BACKEND'],
    // `href` points at the case study page for each project. Until those pages
    // exist they route to the contact form.
    items: [
      { title: 'RPG Fantasy Quest', tag: 'UI/UX', href: '#contact' },
      { title: 'Fantasy Character Campaign', tag: 'FRONTEND', href: '#contact' },
      { title: 'Beyond The Keep', tag: 'BACKEND', href: '#contact' },
    ],
  },
  // All of these screens belong to one shipped title, so they read as a single
  // deep case study rather than a set of unrelated thumbnails.
  caseStudy: {
    client: 'Seedify',
    title: 'Beyond The Keep',
    systemTitle: 'Interface system',
    systemBody: 'Nine connected records across onboarding, progression, inventory and live operations.',
    recordLabel: 'Primary record / 01',
    railNote: 'Horizontal archive / scroll for all records',
    intro:
      'A full interface system for SeedWorld — onboarding, progression, crafting, maps and live-ops screens built around the Nova Orb.',
    screens: [
      { src: '/assets/img/portfolio/awakening-screen.webp', label: 'Onboarding — Awakening' },
      { src: '/assets/img/portfolio/beyond-the-keep-menu.webp', label: 'Main menu' },
      { src: '/assets/img/portfolio/nova-core-ui.webp', label: 'Nova Core progression' },
      { src: '/assets/img/portfolio/leaderboard-menu-ui.webp', label: 'Echo Archives leaderboard' },
      { src: '/assets/img/portfolio/crafting-inventory-ui.webp', label: 'Crafting & inventory' },
      { src: '/assets/img/portfolio/map-screen-ui.webp', label: 'Tactical map' },
      { src: '/assets/img/portfolio/gameplay-hud-desert.webp', label: 'In-game HUD' },
      { src: '/assets/img/portfolio/gameplay-radial-menu.webp', label: 'Radial action menu' },
      { src: '/assets/img/portfolio/season-pass-character.webp', label: 'Season pass — Emberborn Saga' },
    ],
  },
  academy: {
    title: 'Learn the system.',
    // The course number and the instructor are carried here rather than in the
    // card beside the poster. Both are printed on the poster, but type baked
    // into an image cannot be read by a screen reader, selected, searched or
    // translated, and it is gone entirely if the image fails — so they are held
    // in a sentence, which costs the card no height. See `Academy`.
    body: 'GaByte Academy is the studio teaching what it ships. Course #03 is a live online master class in game UX/UI with Thalia Tran — small intakes, real briefs, and feedback on every piece of homework.',
    cta: 'Register now',
    // The course lives off-site; this was the only external destination in the
    // old nav list, so it moved here when the rail replaced that list. The
    // panel prints this host, derived from the URL rather than retyped.
    href: 'https://game-uxui-fundamentals.gamegabyte.com/',
    // Both facts below are printed on the poster (`assets.academyCourse`) —
    // nothing here is inferred. The name keeps the poster's spelling, `UXUI`,
    // which is also the host.
    //
    // Two rows, and the card is full. They are the two a visitor needs before
    // clicking, and they are what the height beside a 16:9 poster affords — a
    // third row makes the column taller than the artwork it sits next to and
    // the poster starts floating in a band of ink. The rest of the poster's
    // billing block (the free 1:1 homework support, the A/B prompts) stays on
    // the poster.
    //
    // NOTE: `Starts` is a fixed intake, not an evergreen date. Once 17 Sep 2026
    // passes this is stale copy, not a design problem — update it, and
    // `assets.academyCourse`, for the studio's next intake.
    course: {
      name: 'Game UXUI Fundamentals',
      // The keys are the card's row labels; keeping them here means the card
      // never hard-codes a user-visible string in JSX.
      rows: [
        { key: 'Starts', value: '17 September 2026' },
        { key: 'Live', value: 'Every Thursday, 8:00–10:30 PM' },
      ],
      // The schedule is set as text beside the poster, so the alt describes the
      // picture rather than reciting the billing block a second time.
      alt: 'Poster for Game UXUI Fundamentals: a hooded sprout character standing in a purple mushroom forest, with the course details typeset beside it and instructor Thalia Tran’s signature below.',
    },
  },
  faqSection: {
    title: 'Questions / decoded.',
    intro: 'Expand any diagnostic record. Multiple channels can remain open.',
  },
  faq: [
    { q: 'How long does it take to build a game landing page?', a: 'Typically, a custom game landing page takes 2-4 weeks from initial concept to launch. This includes design, development, revisions, and optimization.' },
    { q: 'Do you provide ongoing support after launch?', a: 'Yes. We offer post-launch support including bug fixes, content updates, performance monitoring, and technical assistance.' },
    { q: 'Can you integrate with my existing game analytics?', a: 'Yes. We integrate with major analytics platforms and custom tracking setups so marketing metrics are captured clearly.' },
    { q: 'What makes your game marketing services different?', a: 'We combine gaming industry knowledge with design-led marketing production, built by people who understand game audiences.' },
  ],
  contact: {
    title: "Have an idea? Let's talk.",
    body: 'Visually attractive design from concept to final result. We create solutions that are bold and forward-looking.',
    fields: {
      name: 'Your name',
      email: 'Your email',
      message: 'Tell us about your idea',
    },
    cta: 'Send',
    // Wire `endpoint` to the form backend (Formspree, a Worker, etc.). While it
    // is empty the form falls back to opening the visitor's mail client, so it
    // never reports a success that did not happen. Replace `email` too.
    endpoint: '',
    email: 'hello@gamegabyte.studio',
    // The prototype promised a reply within two working days. That is a service
    // commitment nobody has confirmed, so the card states only what is known.
    // Restore the specific promise here once the studio stands behind it.
    response: {
      status: 'System status / online',
      title: 'Channel open',
      body: 'Share your launch date, platform and what success looks like. We will respond with a practical next step.',
    },
  },
  footer: {
    columns: [
      { title: 'Services', links: ['Development', 'Marketing', 'Design'] },
      { title: 'Support', links: ['Help Center', 'Contact Us', 'FAQ'] },
      { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'] },
    ],
    tagline: 'Connect with us',
    // Replace the placeholder hrefs with the studio's real profiles.
    social: [
      { label: 'LinkedIn', href: '#' },
      { label: 'X', href: '#' },
      { label: 'YouTube', href: '#' },
      { label: 'Discord', href: '#' },
    ],
  },
} as const
