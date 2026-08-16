export const assets = {
  clients: [
    { name: 'Sycamore', logo: '/assets/img/clients/sycamore-logo.webp' },
    { name: 'Disney Speedstorm', logo: '/assets/img/clients/disney-speedstorm-logo.webp' },
    { name: 'Tally', logo: '/assets/img/clients/tally-logo.webp' },
    { name: 'Seedify', logo: '/assets/img/clients/seedify-logo.webp' },
  ],
  backgrounds: {
    hero: '/assets/img/backgrounds/hero-portal-arena-v1.png',
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
  reelPoster: '/assets/img/portfolio/nova-core-ui.webp',
  video: '/video/reel-2025.mp4',
} as const

export const content = {
  // Navigation lives in `src/content/sections.ts` — the rail and the mobile
  // menu are both generated from the section registry, so there is no separate
  // nav list to keep in sync.
  shell: {
    status: 'Studio network online',
    cta: 'Open channel',
    brand: 'Gamegabyte / OS',
    menu: 'Menu',
  },
  hero: {
    // Three display lines rather than one string, so the accent line is data
    // rather than a substring the component has to go hunting for.
    headline: [
      { text: 'We are the game', accent: false },
      { text: 'Marketing', accent: true },
      { text: 'Studio.', accent: false },
    ],
    sub: 'From immersive websites to powerful digital strategies — we help your game win the market.',
    primaryCta: 'Case Study',
    secondaryCta: 'Connect with us',
    credentials: [
      { label: 'Founded', value: '2024 — Studio' },
      { label: 'Shipped', value: '25+ projects' },
      { label: 'Focus', value: 'AAA & mobile titles' },
    ],
    // Labels only. Every figure the dashboard shows is read from `stats` and
    // `services` below, so nothing on it can claim something untrue.
    dashboard: {
      projectsLabel: 'Studio projects',
      focusLabel: 'Active focus',
      focusValue: 'AAA + Mobile',
      nodesLabel: 'Available system nodes',
    },
  },
  reel: {
    title: 'Showreel 2025',
    intro: 'A minute of interface design, campaign pages and launch art shipped for game teams.',
    ariaLabel: 'Gamegabyte Studio Reel 2025',
    src: assets.video,
    status: 'Transmission ready',
    trust: 'Trusted by teams at',
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
  stats: [
    { value: '25+', label: 'Studio Projects', note: 'Across AAA & mobile titles' },
    { value: '5+', label: 'Years in the Game Industry', note: 'Formerly From Gameloft & Partners' },
    { value: '100%', label: 'Design-Led Production', note: 'No templates. No shortcuts.' },
    { value: '2024', label: 'Studio Founded', note: 'Built for long-term collaboration' },
  ],
  // `kind` names the axis each discipline sits on in the systems matrix.
  services: [
    { kind: 'Web', title: 'Game Landing Pages', body: 'High-impact campaign pages built around discovery and conversion.' },
    { kind: 'Product', title: 'UI/UX Design', body: 'Player-focused interfaces shaped around your game identity.' },
    { kind: 'Data', title: 'Marketing Systems', body: 'Connected analytics and campaign experiences for launch.' },
    { kind: 'Code', title: 'Development', body: 'Fast, accessible production tuned for every device.' },
    { kind: 'Device', title: 'Responsive Design', body: 'Immersive layouts with thoughtful mobile behavior.' },
    { kind: 'Players', title: 'Community Features', body: 'Systems that turn an audience into an active player base.' },
  ],
  systemsMatrix: {
    title: ['One network.', 'Six capabilities.'],
    intro: 'Six disciplines in one launch system. Technical detail stays compact and supports the work.',
    inputKey: 'Input / Discipline',
    outputKey: 'Output / Growth',
  },
  technology: [
    { title: 'Documentation', body: 'Shared project intelligence' },
    { title: 'Design', body: 'Rapid prototype loops' },
    { title: 'Development', body: 'Modern frontend systems' },
    { title: 'Deployment', body: 'Stable launch workflows' },
  ],
  processSection: {
    title: ['Signal becomes', 'launch.'],
    intro: 'A readable operational path from the first brief to a stable launch.',
    engine: 'GGB / Mission engine',
    engineNote: 'Sequence synchronized',
  },
  // `phase` names what each step does to the signal, in the page's voice.
  process: [
    { step: '01', phase: 'Decode', title: 'Consultation', body: 'Understand the world, audience and launch target.' },
    { step: '02', phase: 'Shape', title: 'Design system', body: 'Prototype the story, interface and conversion path.' },
    { step: '03', phase: 'Assemble', title: 'Production', body: 'Build, integrate and optimize the experience.' },
    { step: '04', phase: 'Transmit', title: 'Launch support', body: 'Deploy, observe and stabilize the campaign.' },
  ],
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
  testimonials: [
    { quote: "We're not just another agency. We're strategic partners helping your game succeed in the fiercely competitive market.", name: 'Mickael Grants', role: 'CEO of Apples to Oranges' },
  ],
  academy: {
    title: 'GaByte Academy',
    body: 'Training and resources for game studios.',
    cta: 'Learn more',
    // The course lives off-site; this was the only external destination in the
    // old nav list, so it moved here when the rail replaced that list.
    href: 'https://game-uxui-fundamentals.gamegabyte.com/',
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
