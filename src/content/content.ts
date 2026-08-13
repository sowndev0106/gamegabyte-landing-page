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
  nav: [
    { label: 'Home', href: '#home' },
    { label: 'Our Services', href: '#services' },
    { label: 'GaByte Academy', href: '#academy' },
    { label: 'Case Studies', href: '#portfolio' },
    { label: 'About Us', href: '#about' },
  ] as const,
  hero: {
    headline: ['We Are The Game', 'Marketing Studio'],
    sub: 'From immersive websites to powerful digital strategies — we help your game win the market.',
    primaryCta: 'Case Study',
    secondaryCta: 'Connect with us',
  },
  reel: {
    title: 'Showreel 2025',
    ariaLabel: 'Gamegabyte Studio Reel 2025',
    src: assets.video,
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
  services: [
    { title: 'Game landing page', body: 'Create impressive landing pages showcasing your game with unique design and high conversion rates.' },
    { title: 'UI/UX Design', body: 'Forge captivating landing pages that spotlight your game with cutting-edge design and optimized conversion strategies.' },
    { title: 'Marketing Analytics', body: 'Drive growth with data-driven insights. We transform raw data into actionable strategies, boosting user engagement and maximizing ROI.' },
    { title: 'Development', body: 'Develop stunning, high-performance landing pages that captivate players and drive conversions.' },
    { title: 'responsive design', body: 'Craft adaptable landing pages ensuring seamless experiences across all devices, enhancing user engagement and broadening your audience reach.' },
    { title: 'community features', body: 'Enhance player interaction with integrated forums, chats, and social feeds, fostering a vibrant community around your game.' },
  ],
  technology: [
    { title: 'Documentation', body: 'Cloud platforms where we store project info, making progress easy to follow and update with clients in real time.' },
    { title: 'Design', body: 'Cutting edge design tools with prototype workflows for fast review.' },
    { title: 'Development', body: 'Modern frontend builds tuned for launch pages and campaign performance.' },
    { title: 'Deployment', body: 'Release workflows that keep game campaigns stable after launch.' },
  ],
  process: [
    { step: '01', title: 'Consultation & Analysis', body: 'Understand your game, target audience, and marketing goals to develop the right strategy.' },
    { step: '02', title: 'Design & Concept', body: "Create mockups and prototypes that truly reflect your game's spirit and brand identity." },
    { step: '03', title: 'Development & Optimization', body: 'Code the website with modern technology, integrating SEO and analytics for optimal performance.' },
    { step: '04', title: 'Launch & Support', body: 'Deploy the website and provide technical support, plus training for your team.' },
  ],
  why: [
    { title: 'Lightning speed delivery', body: 'Fast turnaround without compromise.' },
    { title: 'Unbeatable Pricing', body: 'Competitive pricing without sacrificing quality, built to maximize ROI.' },
    { title: 'Gaming Expertise', body: 'A team of gamers who understand player psychology and what attracts game audiences.' },
    { title: 'Design-Led Production', body: 'No templates. No shortcuts. Visually attractive design from concept to final result.' },
  ],
  portfolio: {
    title: 'Project Showcase',
    intro: "Explore the impressive game marketing websites we've created for game developers worldwide.",
    tags: ['UI/UX', 'FRONTEND', 'BACKEND'],
    items: [
      { title: 'RPG Fantasy Quest', tag: 'UI/UX' },
      { title: 'Fantasy Character Campaign', tag: 'FRONTEND' },
      { title: 'Beyond The Keep', tag: 'BACKEND' },
    ],
  },
  testimonials: [
    { quote: "We're not just another agency. We're strategic partners helping your game succeed in the fiercely competitive market.", name: 'Mickael Grants', role: 'CEO of Apples to Oranges' },
  ],
  academy: {
    title: 'GaByte Academy',
    body: 'Training and resources for game studios.',
    cta: 'Learn more',
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
  },
  footer: {
    columns: [
      { title: 'Services', links: ['Development', 'Marketing', 'Design'] },
      { title: 'Support', links: ['Help Center', 'Contact Us', 'FAQ'] },
      { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'] },
    ],
    tagline: 'Connect with us',
  },
} as const
