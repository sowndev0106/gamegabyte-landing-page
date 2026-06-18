export const assets = {
  brand: {
    icon: '/assets/img/icons/gamegabyte-icon.webp',
  },
  clients: [
    { name: 'Sycamore', logo: '/assets/img/clients/sycamore-logo.webp' },
    { name: 'Disney Speedstorm', logo: '/assets/img/clients/disney-speedstorm-logo.webp' },
    { name: 'Tally', logo: '/assets/img/clients/tally-logo.webp' },
    { name: 'Seedify', logo: '/assets/img/clients/seedify-logo.webp' },
  ],
  backgrounds: {
    hero: '/assets/img/backgrounds/hero-dark-game-scene.webp',
    pattern: '/assets/img/backgrounds/gamegabyte-pattern-glow.webp',
    pixelTrees: '/assets/img/backgrounds/pixel-tree-tiles.webp',
    characterWide: '/assets/img/backgrounds/fantasy-character-wide.webp',
    mech: '/assets/img/backgrounds/mech-concept-art.webp',
  },
  portfolio: [
    '/assets/img/portfolio/beyond-the-keep-menu.webp',
    '/assets/img/portfolio/season-pass-character.webp',
    '/assets/img/portfolio/crafting-inventory-ui.webp',
  ],
  reelPoster: '/assets/img/portfolio/nova-core-ui.webp',
  video: '/video/reel-2025.mp4',
} as const

export const content = {
  nav: ['Home', 'Our Services', 'GaByte Academy', 'Case Studies', 'About Us'],
  hero: {
    headline: 'We Are The Game Marketing Studio',
    sub: 'From immersive websites to powerful digital strategies — we help your game win the market.',
    tagline: 'Delivering focused impact for game teams.',
    cta: "Let's talk",
  },
  trust: {
    title: 'Growing with Game Studios Worldwide',
    note: 'Across AAA & mobile titles',
    proof: "Don't take our word for it. Over 100+ people trust us.",
  },
  services: [
    { title: 'UI/UX Design', body: "Create mockups and prototypes that truly reflect your game's spirit and brand identity." },
    { title: 'Web Development', body: 'Develop stunning, high-performance landing pages that captivate players and drive conversions.' },
    { title: 'Marketing Analytics', body: 'Drive growth with data-driven insights. We transform raw data into actionable strategies, boosting user engagement and maximizing ROI.' },
    { title: 'Community', body: 'Enhance player interaction with integrated forums, chats, and social feeds, fostering a vibrant community around your game.' },
    { title: 'Responsive', body: 'Craft adaptable landing pages ensuring seamless experiences across all devices, enhancing user engagement and broadening your audience reach.' },
  ],
  process: [
    { step: '01', title: 'Consultation & Analysis', body: 'Understand your game, target audience, and marketing goals to develop the right strategy.' },
    { step: '02', title: 'Design & Concept', body: "Create mockups and prototypes that truly reflect your game's spirit and brand identity." },
    { step: '03', title: 'Development & Optimization', body: 'Code the website with modern technology, integrating SEO and analytics for optimal performance.' },
    { step: '04', title: 'Launch & Support', body: 'Deploy the website and provide technical support, plus training for your team.' },
  ],
  why: [
    { title: 'Lightning speed delivery', body: 'Fast turnaround without compromise.' },
    { title: 'Unbeatable Pricing', body: 'We offer competitive pricing without sacrificing quality. Maximize your ROI with our cost-effective solutions.' },
    { title: 'Gaming Expertise', body: 'Our team consists of gamers who understand player psychology. We know how to create web experiences that attract and retain gamers.' },
    { title: 'Design-Led Production', body: 'No templates. No shortcuts. Visually attractive design from concept to final result.' },
  ],
  stats: [
    { value: '2018', label: 'Studio Founded' },
    { value: '100+', label: 'Studio Projects' },
    { value: '7+', label: 'Years in the Game Industry' },
  ],
  portfolio: {
    title: 'Project Showcase',
    intro: "Explore the impressive game marketing websites we've created for game developers worldwide.",
    items: [
      { title: 'RPG Fantasy Quest', tag: 'Game landing page' },
      { title: 'Inventory + Combat HUD', tag: 'UI/UX Design' },
      { title: 'Marketing Launch System', tag: 'Analytics + community' },
    ],
  },
  reel: { title: 'Gamegabyte Studio Reel 2025', src: assets.video },
  testimonials: [
    { quote: "We're not just another agency. We're strategic partners helping your game succeed in the fiercely competitive market.", name: 'Mickael Grants', role: 'CEO of Apples to Oranges' },
  ],
  academy: { title: 'GaByte Academy', body: 'Training and resources for game studios.' },
  faq: [
    { q: 'What makes your game marketing services different?', a: 'No templates, no shortcuts — design-led production by a team of gamers.' },
    { q: 'How long does it take to build a game landing page?', a: 'Most projects launch within a few weeks depending on scope.' },
    { q: 'Do you provide ongoing support after launch?', a: 'Yes — deployment, technical support, and team training are included.' },
    { q: 'Can you integrate with my existing game analytics?', a: 'Yes — we integrate SEO and analytics for optimal performance.' },
  ],
  contact: { title: "Have an idea? Let's talk.", placeholder: 'Type your message here...' },
  footer: {
    tagline: 'Connect with us',
    links: ['Documentation', 'Help Center', 'Privacy Policy', 'Terms of Service', 'Cookie Policy'],
  },
} as const
