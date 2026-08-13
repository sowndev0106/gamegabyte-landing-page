# Gamegabyte Redesign Agent Prompt

## Session 2 Là Gì?

Session 2 là phiên làm việc tiếp theo với một AI Agent khác. Agent đó có thể không đọc được code hoặc không có toàn bộ lịch sử trao đổi trước đó, nên file này là prompt đầy đủ để đưa cho Agent redesign lại website Gamegabyte.

Cách dùng:

1. Mở session mới với AI Agent.
2. Copy toàn bộ nội dung từ phần `Prompt Cho AI Agent` trở xuống.
3. Dán vào Agent đó.
4. Yêu cầu Agent implement trực tiếp trong project React/Vite/Tailwind hiện tại.

## Prompt Cho AI Agent

Bạn là senior frontend designer + React engineer. Hãy redesign lại landing page Gamegabyte Studio dựa trên context đầy đủ bên dưới. Bạn cần tạo một giao diện mới, đẹp hơn, hiện đại hơn, gaming hơn, nhưng vẫn giữ đúng nội dung, cấu trúc chính và mục tiêu conversion của site.

## 1. Project Context

Đây là website landing page một trang cho **Gamegabyte Studio**, một agency/studio chuyên làm website marketing, UI/UX, analytics và digital strategy cho game studios.

Mục tiêu website:
- Tạo cảm giác đây là một game marketing studio chuyên nghiệp, hiện đại, có gu thiết kế mạnh.
- Bán dịch vụ làm landing page / marketing website / UI UX / analytics cho game studio.
- Tập trung conversion: dẫn người dùng đến contact form hoặc xem case studies.
- Visual cần có chất gaming, futuristic, bold, high-energy, nhưng vẫn sạch, dễ đọc, responsive tốt.

Tech stack hiện tại:
- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Motion package `motion/react` cho animation
- Không dùng component library nặng nếu không cần.
- Codebase chia theo sections:
  - Header
  - Hero
  - Showreel
  - Stats
  - Services
  - WorkProcess
  - WhyChooseUs
  - Portfolio
  - Testimonials
  - Academy
  - Faq
  - Contact
  - Footer

Yêu cầu khi redesign:
- Có thể thay toàn bộ layout/style/component markup nếu cần.
- Giữ React + Tailwind + Motion.
- Không làm mất nội dung chính.
- Không dùng placeholder lorem ipsum.
- Không phá accessibility cơ bản: alt text, aria-label, focus state, button/link rõ ràng.
- Mobile phải đẹp, không chỉ “co lại”.
- Header fixed/sticky phải không che nội dung.
- Không tạo layout bị overlap/clipping.
- Ưu tiên performance: ảnh dùng object-cover hợp lý, lazy-load ảnh dưới fold, video lazy-load.
- Nếu thêm animation thì phải vừa phải, có support `prefers-reduced-motion`.

## 2. Brand Direction

Brand name: **Gamegabyte Studio** hoặc **Gamegabyte**.

Lĩnh vực:
- Game marketing websites
- Game landing pages
- UI/UX design
- Web development
- Marketing analytics
- Community features
- Academy/training

Tone:
- Bold
- Gaming-native
- Strategic
- Premium but not corporate boring
- High contrast
- Confident
- Conversion-focused

Current fonts:
- Heading/display: **Schibsted Grotesk**
- Body: **Roboto**

Nên giữ hoặc cải thiện font system theo hướng:
- Heading mạnh, geometric, modern.
- Body rõ ràng, dễ đọc.
- Không dùng quá nhiều font.

Current color tokens:
- `brand`: `#601feb` purple
- `accent`: `#b6e802` neon lime
- `accent-bright`: `#d4ff00`
- `purple-light`: `#8c4fff`
- `ink`: `#030213`
- `surface`: `#f1f2f9`

Có thể giữ palette chính:
- Dark black/ink background
- Neon lime accent
- Purple brand accent

Nhưng hãy redesign để bớt flat và bớt lặp lại các mảng tím đặc. Nên dùng:
- Black / near-black base
- Neon lime cho CTA, highlights, active nav
- Purple làm glow/gradient/detail, không phủ toàn bộ section quá nhiều
- White/off-white cho text/card contrast
- Subtle grid, scanline, glass, game UI panels, HUD-like borders nếu hợp lý

Tránh:
- Beige/tan/brown palette
- Quá nhiều purple gradient kiểu generic SaaS
- Decorative blobs/orbs vô nghĩa
- Card bo góc quá tròn
- Text quá nhỏ hoặc tracking quá dày gây khó đọc

## 3. Existing Assets

Các asset đang có:

Backgrounds:
- `/assets/img/backgrounds/gamegabyte-pattern-glow.webp`
  - 2048x1259
  - Pattern/glow gaming dark background, đang dùng cho hero và overlay pattern.
- `/assets/img/backgrounds/pixel-tree-tiles.webp`
  - 2048x2048
  - Pixel/game environment tiles, đang dùng ở Why Choose Us top background.
- `/assets/img/backgrounds/fantasy-character-wide.webp`
- `/assets/img/backgrounds/hero-dark-game-scene.webp`
- `/assets/img/backgrounds/mech-concept-art.webp`

Portfolio images:
- `/assets/img/portfolio/combat-magic-scene.webp`
- `/assets/img/portfolio/fantasy-character-art.webp`
- `/assets/img/portfolio/beyond-the-keep-menu.webp`
- Ngoài ra còn:
  - `leaderboard-menu-ui.webp`
  - `crafting-inventory-ui.webp`
  - `gameplay-radial-menu.webp`
  - `gameplay-hud-desert.webp`
  - `season-pass-character.webp`
  - `map-screen-ui.webp`
  - `nova-core-ui.webp`
  - `awakening-screen.webp`
  - `pixel-character-sprites.webp`

Client logos:
- Sycamore: `/assets/img/clients/sycamore-logo.webp`
- Disney Speedstorm: `/assets/img/clients/disney-speedstorm-logo.webp`
- Tally: `/assets/img/clients/tally-logo.webp`
- Seedify: `/assets/img/clients/seedify-logo.webp`

Video:
- Current local video: `/video/reel-2025.mp4`
- Current poster: `/assets/img/portfolio/nova-core-ui.webp`
- Legacy reference mentions YouTube reel: `https://www.youtube.com/watch?v=vd_9qS1AWUU`
- If using self-hosted video, keep lazy loading and controls.
- If using YouTube, lazy-load iframe only after click.

Logo:
- Current logo is image SVG imported from `src/assets/logo.svg`.
- It visually shows white text:
  - Top line: `GAME`
  - Bottom line: `GABYTE`
- In header desktop current logo height around 40-44px.
- On mobile around 32px.

## 4. Current Site Structure

The app renders a single `<main>` with this order:

1. Header
2. Hero
3. Showreel
4. Stats
5. Services
6. WorkProcess
7. WhyChooseUs
8. Portfolio
9. Testimonials
10. Academy
11. FAQ
12. Contact
13. Footer

Keep this section order unless there is a strong design reason to slightly combine or improve flow.

## 5. Header Details

Current header:
- Fixed at top.
- Full width.
- Height: 80px desktop.
- Background: solid black.
- Border bottom: white at 10% opacity.
- Max width container: 1440px.
- Horizontal padding:
  - mobile: 20px
  - small+: 48px
- Left: Gamegabyte logo.
- Center desktop nav:
  - hidden on mobile/tablet, visible `lg`
  - uppercase
  - font medium
  - small text
  - gap around 48px
  - color white/86
  - active Home is neon accent
  - hover becomes accent
- Right desktop CTA:
  - button “Let’s talk” linking to `#contact`
  - neon lime background
  - arrow icon `↗`
- Mobile:
  - logo left
  - hamburger icon right
  - hamburger is 44x44
  - three white lines
  - when open, lines animate to X
  - mobile dropdown below header:
    - black background
    - top border white/10
    - nav vertical
    - gap 24px
    - uppercase links
    - includes CTA button at bottom

Nav items:
- Home -> `#home`
- Our Services -> `#services`
- GaByte Academy -> `#academy`
- Case Studies -> `#portfolio`
- About Us -> `#about`

Redesign instruction:
- Keep fixed/sticky header behavior.
- Improve visual quality: glass/dark translucent header, better hover/focus states, active nav state, responsive mobile menu.
- Header should feel like game UI HUD but remain clean.
- CTA must stay prominent.
- Avoid header becoming too tall on mobile.

## 6. Global Components

Current Button component:
- Anchor styled as button.
- Variants:
  - accent: neon lime bg, dark text, border accent, lime glow shadow
  - light: white bg, dark text
  - dark: translucent white bg, white text, subtle border
- Current sizing:
  - min height 64px
  - px 32px
  - py 16px
  - uppercase
  - bold
  - inline-flex
  - gap 8px
  - arrow `↗` optional
- Motion:
  - hover y: -2
  - tap scale: 0.98

Redesign instruction:
- Create a stronger button system:
  - Primary: neon lime, dark text, gaming angled/glow detail if tasteful.
  - Secondary: white/transparent or dark glass.
  - Ghost/link CTA for card links.
- Preserve clickable area and accessibility.
- Buttons should look premium, not default rectangles.
- Use consistent radius. Existing site mostly square/sharp; use 0-8px radius max unless design system justifies otherwise.

Current Container:
- `max-w-6xl`
- horizontal padding `px-5 sm:px-6`

Current Section:
- `py-20 sm:py-28`

Current SectionHeading:
- optional eyebrow
- eyebrow: uppercase, accent, tracking 0.16em
- title: display font, 3xl to 5xl, bold

Redesign instruction:
- Standardize section spacing and heading system.
- Use strong hierarchy: eyebrow, title, optional body.
- Avoid excessive uppercase for long text.

## 7. Hero Section

Current content:
- Headline split:
  - Line 1: `We Are The Game`
  - Line 2: `Marketing Studio`
- The word `Game` is neon lime.
- Subtitle:
  - `From immersive websites to powerful digital strategies — we help your game win the market.`
- Primary CTA:
  - `Case Study` -> `#portfolio`
  - white button
- Secondary CTA:
  - `Connect with us` -> `#contact`
  - neon lime button

Current visual/layout:
- Section id: `home`
- Background: black + full-cover `gamegabyte-pattern-glow.webp`
- Overlay: black/72
- Decorative plus signs:
  - small lime plus at left/top
  - small purple plus at right/top
  - large purple plus near headline
- Desktop:
  - fixed header above
  - hero starts with top padding 80px
  - min height roughly `calc(100vh - 5rem)`, large desktop `calc(100vh - 14rem)`
  - center aligned
  - headline huge: up to 90px
  - max width around 1160px
  - subtitle max width 3xl/4xl
  - CTA row horizontal
- Mobile:
  - nav hidden behind hamburger
  - hero has very dark background
  - headline stacked:
    - “We Are The”
    - “Game”
    - “Marketing”
    - “Studio”
  - CTAs stack vertically
  - hero fills most of viewport

Redesign instruction:
- Hero must be the strongest section.
- Keep the same core message but improve copy if needed.
- First viewport should immediately show brand/service/category.
- Use actual game-related background imagery, not abstract-only.
- Consider using layered background: dark game art + subtle grid + neon scanline + HUD marks.
- Keep text legible.
- CTA hierarchy:
  - primary should probably be “Connect with us” or “Let’s talk” if conversion-focused.
  - secondary can be “View case studies”.
- Include trust/social proof hint near hero if appropriate.
- Avoid over-darkening so much that background becomes invisible.

## 8. Showreel Section

Current content:
- Title: `Showreel 2025`
- Video aria label: `Gamegabyte Studio Reel 2025`
- Video source: `/video/reel-2025.mp4`
- Poster: `/assets/img/portfolio/nova-core-ui.webp`
- TrustBar below video

Current layout:
- black background
- padding 32-64px depending viewport
- centered title with gradient text:
  - white to gray
  - display font
  - 24px mobile, up to 56px desktop
- video:
  - aspect-video
  - rounded-lg
  - width 90% mobile, 85% small, 1166px large
  - overflow hidden
  - controls
- client logos below:
  - centered flex wrap
  - max width 980px
  - gap x 48px, y 24px
  - grayscale
  - max height 32px
  - opacity 80%

Redesign instruction:
- Make showreel feel like a premium media module.
- Could use frame treatment like game launcher / video terminal / console panel.
- Keep video prominent.
- Trust logos should feel integrated, not floating randomly.
- Ensure mobile video is full width enough and not tiny.

## 9. Stats Section

Current content:
Section label: `OUR NUMBER`
Title: `Growing with Game Studios Worldwide`
Note: `Delivering focused impact for game teams.`

Stats:
- `25+` — `Studio Projects` — `Across AAA & mobile titles`
- `5+` — `Years in the Game Industry` — `Formerly From Gameloft & Partners`
- `100%` — `Design-Led Production` — `No templates. No shortcuts.`
- `2024` — `Studio Founded` — `Built for long-term collaboration`

Current layout:
- black background
- subtle pattern background opacity 0.05
- vertical padding large, up to 160px desktop
- centered intro
- stats grid:
  - 2 columns mobile
  - 4 columns desktop
- stat numbers neon lime, display font, 50-64px
- labels uppercase small
- notes uppercase tiny white/40

Redesign instruction:
- Make stats more credible and visually polished.
- Could use horizontal metric strip, HUD counters, bordered panels, or terminal-like cards.
- Keep numbers highly visible.
- Notes should remain readable.

## 10. Services Section

Current Services content:
Title: `Our services`

Cards:
1. `Game landing page`
   - `Create impressive landing pages showcasing your game with unique design and high conversion rates.`
2. `UI/UX Design`
   - `Forge captivating landing pages that spotlight your game with cutting-edge design and optimized conversion strategies.`
3. `Marketing Analytics`
   - `Drive growth with data-driven insights. We transform raw data into actionable strategies, boosting user engagement and maximizing ROI.`
4. `Development`
   - `Develop stunning, high-performance landing pages that captivate players and drive conversions.`
5. `responsive design`
   - `Craft adaptable landing pages ensuring seamless experiences across all devices, enhancing user engagement and broadening your audience reach.`
6. `community features`
   - `Enhance player interaction with integrated forums, chats, and social feeds, fostering a vibrant community around your game.`

Each card current:
- white bg
- black text
- min height 275px
- padding 32px
- hover translate up and scale 1.03
- title display font, 24px, semi-bold, capitalize
- body 18px black/70
- link: `view our portfolio ↗` to `#portfolio`
- link uppercase small, purple

Current services section background:
- full purple `#601feb`
- pattern overlay opacity 0.18
- grid:
  - 1 col mobile
  - 2 col small
  - 3 col desktop

Redesign instruction:
- Improve services dramatically. Current white cards on purple feel generic.
- Use better service cards with icons or visual micro-elements if useful.
- Keep 6 services.
- Make the cards scan quickly.
- Do not make all cards identical if a better editorial layout works.
- Preserve link/CTA path to portfolio or contact.
- Consider pairing services with game UI imagery / small tags / outcomes.

## 11. Technology Section

Current content:
Title: `our technology`
Body:
`We leverage cutting-edge tools and innovative strategies to build immersive gaming experiences from the ground up.`

Cards:
1. `Documentation`
   - `Cloud platforms where we store project info, making progress easy to follow and update with clients in real time.`
2. `Design`
   - `Cutting edge design tools with prototype workflows for fast review.`
3. `Development`
   - `Modern frontend builds tuned for launch pages and campaign performance.`
4. `Deployment`
   - `Release workflows that keep game campaigns stable after launch.`

Current layout:
- background gradient from `#232323` to black
- cards:
  - border white/10
  - bg white opacity 0.045
  - min height 260px
  - padding 32px
- 1 col mobile, 2 small, 4 desktop

Redesign instruction:
- Make this feel like a production pipeline/toolchain section.
- Could use steps, stack cards, console tabs, or “build pipeline” visual.
- Keep concise; this section should support trust, not dominate.

## 12. Work Process Section

Current content:
Eyebrow: `OUR WORK PROCESS`
Title: `From strategy to launch`

Steps:
1. `01` — `Consultation & Analysis`
   - `Understand your game, target audience, and marketing goals to develop the right strategy.`
2. `02` — `Design & Concept`
   - `Create mockups and prototypes that truly reflect your game's spirit and brand identity.`
3. `03` — `Development & Optimization`
   - `Code the website with modern technology, integrating SEO and analytics for optimal performance.`
4. `04` — `Launch & Support`
   - `Deploy the website and provide technical support, plus training for your team.`

Current layout:
- black background
- centered heading
- grid:
  - 1 col mobile
  - 2 small
  - 4 desktop
- cards:
  - border-top white/20
  - bg white opacity 0.035
  - padding 24px
  - min height 220px
- number large neon lime

Redesign instruction:
- Make process feel like a mission/quest pipeline.
- Must remain practical and professional.
- Strong numbered progression.
- Could use horizontal timeline desktop, stacked vertical cards mobile.

## 13. Why Choose Us / About Section

Current id: `about`

Current content:
Eyebrow: `WHY CHOOSE US`
Title: `Strategic partners, not just an agency`

Cards:
1. `Lightning speed delivery`
   - `Fast turnaround without compromise.`
2. `Unbeatable Pricing`
   - `Competitive pricing without sacrificing quality, built to maximize ROI.`
3. `Gaming Expertise`
   - `A team of gamers who understand player psychology and what attracts game audiences.`
4. `Design-Led Production`
   - `No templates. No shortcuts. Visually attractive design from concept to final result.`

Current visual:
- background `ink`
- top image strip `pixel-tree-tiles.webp`
  - absolute top
  - height 224px
  - opacity 14%
- centered heading
- grid:
  - 1 col mobile
  - 2 cols desktop
- cards:
  - border white/10
  - bg white opacity 0.035
  - padding 24px
  - min height 160px

Legacy context also mentions:
- Built for long-term collaboration
- “We're not just another agency. We're strategic partners helping your game succeed in the fiercely competitive market.”
- “We Expert in various different game genre”
- “We leverage cutting-edge tools and innovative strategies to build immersive gaming experiences from the ground up.”

Redesign instruction:
- This section should communicate differentiation, not just generic cards.
- Consider adding a stronger intro paragraph.
- Use game-native credibility: player psychology, launch campaigns, landing page conversion, genre awareness.
- Cards can be asymmetric or include icons/labels.

## 14. Portfolio / Case Studies Section

Current content:
Eyebrow: `CASE STUDIES`
Title: `Project Showcase`
Intro:
`Explore the impressive game marketing websites we've created for game developers worldwide.`

Tags:
- `UI/UX`
- `FRONTEND`
- `BACKEND`

Items:
1. `RPG Fantasy Quest` — tag `UI/UX` — image `/assets/img/portfolio/combat-magic-scene.webp`
2. `Fantasy Character Campaign` — tag `FRONTEND` — image `/assets/img/portfolio/fantasy-character-art.webp`
3. `Beyond The Keep` — tag `BACKEND` — image `/assets/img/portfolio/beyond-the-keep-menu.webp`

Current layout:
- dark ink background
- centered heading
- centered tag chips
  - light lavender bg `#e8e8fd`
  - text `#5d5c81`
  - uppercase
- portfolio cards:
  - white bg, black text
  - image aspect 16/10
  - hover image scale 1.05
  - card body p 32px
  - tag chip
  - title 24px bold

Redesign instruction:
- Make portfolio feel much more premium.
- Use images strongly; current cards are too plain.
- Could use large featured case + two smaller cases, or 3 cinematic cards.
- Add hover/focus states.
- Include project type tags.
- Keep all 3 projects.
- If adding metrics, keep them plausible and generic unless exact numbers are provided.

## 15. Testimonials Section

Current content:
Top label:
`DON'T TAKE OUR WORD FOR IT. OVER 100+ PEOPLE TRUST US.`

Quote:
`We're not just another agency. We're strategic partners helping your game succeed in the fiercely competitive market.`

Name:
`Mickael Grants`

Role:
`CEO of Apples to Oranges`

Current layout:
- black background
- centered
- quote card max width 3xl
- bg white opacity 0.055
- padding 32/40
- blockquote display font 24-30px bold
- attribution small white/60

Redesign instruction:
- Make testimonial feel credible and integrated with brand.
- Avoid huge empty black space.
- Could include avatar placeholder/icon only if tasteful.
- Keep quote readable.
- Since only one testimonial, design it as a strong single proof block, not carousel.

## 16. Academy Section

Current content:
Eyebrow: `GABYTE ACADEMY`
Title: `GaByte Academy`
Body:
`Training and resources for game studios.`
CTA:
`Learn more` -> `#contact`

Current visual:
- neon lime background
- dark ink text
- centered
- padding 56px
- CTA uses dark variant:
  - bg white/5
  - border white/15
  - text white

Redesign instruction:
- Academy should feel like a distinct product/initiative.
- Keep it as a conversion bridge, but improve visual.
- Could make it a banner with dark/lime contrast, or a split mini-section with “training/resources/playbooks”.
- CTA should be visible and consistent.

## 17. FAQ Section

Current content:
Title: `FAQ`
Body:
`We're not just another agency. We're strategic partners helping your game succeed in the fiercely competitive market.`

Questions:
1. `How long does it take to build a game landing page?`
   - `Typically, a custom game landing page takes 2-4 weeks from initial concept to launch. This includes design, development, revisions, and optimization.`
2. `Do you provide ongoing support after launch?`
   - `Yes. We offer post-launch support including bug fixes, content updates, performance monitoring, and technical assistance.`
3. `Can you integrate with my existing game analytics?`
   - `Yes. We integrate with major analytics platforms and custom tracking setups so marketing metrics are captured clearly.`
4. `What makes your game marketing services different?`
   - `We combine gaming industry knowledge with design-led marketing production, built by people who understand game audiences.`

Current behavior:
- Accordion
- Default open index: 0
- Clicking toggles open/closed
- Uses AnimatePresence + motion height animation
- Plus/minus icon on right
- Open icon bg purple, white text
- Closed icon bg light surface, black text

Current visual:
- purple background with pattern overlay opacity 0.18
- FAQ cards white with black text
- card rounded-lg
- button full width, p 24
- number on left in purple
- CTA below: `ask a question` neon button to `#contact`

Redesign instruction:
- Keep accordion behavior.
- Improve spacing and readability on mobile.
- FAQ cards can use dark panels or light cards, but must be readable.
- Make open/closed states visually clear.
- CTA below should stay.

## 18. Contact Section

Current content:
Title:
`Have an idea? Let's talk.`

Body:
`Visually attractive design from concept to final result. We create solutions that are bold and forward-looking.`

Form fields:
- Label: `Your name`
- Label: `Your email`
- Label: `Tell us about your idea`

Submit:
- `Send`

Behavior:
- React local state only.
- On submit:
  - prevent default
  - show sent message
  - clear fields
- Success message:
  - `Form submitted - thank you!`

Current visual:
- purple background with pattern overlay opacity 0.18
- centered max width 2xl
- white labels uppercase
- inputs white background black text
- input padding 20 x 16
- textarea min height 160px
- submit full width neon lime
- no backend integration

Redesign instruction:
- Contact is final conversion point. Make it strong.
- Could use split layout desktop:
  - left: CTA/copy/contact promise
  - right: form panel
- Mobile should stack cleanly.
- Improve form UI:
  - visible focus rings
  - labels clear
  - field spacing
  - success state polished
- Keep simple local submit behavior unless backend is requested.
- CTA button should be highly visible.

## 19. Footer

Current content:
Logo left.
Copyright:
`© {currentYear} Gamegabyte. All rights reserved.`

Columns:
Services:
- Development
- Marketing
- Design

Support:
- Help Center
- Contact Us
- FAQ

Legal:
- Privacy Policy
- Terms of Service
- Cookie Policy

Bottom tagline:
`Connect with us`

Current layout:
- black background
- top border white/10
- padding 64-96px
- container grid:
  - mobile 1 col
  - small 2 col
  - desktop 4 col
- headings uppercase display font
- links white/65 hover accent
- bottom border top white/10, centered tagline white/40

Legacy footer also mentions:
- Documentation
- Help Center
- Privacy Policy
- Terms of Service
- Cookie Policy

Redesign instruction:
- Keep footer simple but polished.
- Improve link grouping if helpful.
- Add social/contact row only if using existing content or generic safe labels.
- Do not invent fake addresses/phone numbers.

## 20. Motion / Interaction

Existing motion:
- `Reveal`: fade/slide up while in view once.
- `Stagger`: stagger children on scroll into view.
- Button hover lifts slightly, tap scales.
- FAQ accordion animates height/opacity.
- Portfolio image scales on hover.
- Mobile menu hamburger animates to X.

Redesign instruction:
- Keep animation subtle and performant.
- Add polish where helpful:
  - hero text reveal
  - cards stagger
  - hover glow/border shift
  - video frame reveal
  - FAQ accordion
  - mobile menu transition
- Must respect reduced motion.

## 21. Current Visual Problems To Improve

The current site works but feels like a rebuilt clone:
- Too much pure black empty space.
- Purple blocks are large and repetitive.
- Service cards and portfolio cards feel plain/default.
- Typography is strong in hero but less refined in lower sections.
- Some uppercase/tracking makes content harder to scan.
- Section transitions are abrupt.
- Background pattern is reused too often.
- Contact and FAQ both use same purple background, making the ending feel repetitive.
- Footer is functional but not memorable.
- Showreel/video area could feel more premium.
- Need better visual rhythm between dark cinematic sections, proof sections, service cards and CTA sections.

## 22. Desired Redesign Direction

Create a cohesive gaming studio landing page with:
- Cinematic dark hero.
- Strong neon lime primary CTA.
- Purple used as secondary glow/detail, not as giant flat background everywhere.
- Better section transitions.
- Cards inspired by game UI / HUD / dashboard panels.
- Portfolio images used more cinematically.
- Better conversion flow:
  1. Hero explains what Gamegabyte does.
  2. Showreel builds visual trust.
  3. Stats/logos build credibility.
  4. Services explain offer.
  5. Process reduces uncertainty.
  6. Why choose us differentiates.
  7. Portfolio proves capability.
  8. Testimonial adds trust.
  9. Academy adds extra brand depth.
  10. FAQ removes objections.
  11. Contact converts.

## 23. Content To Preserve

Use this content unless improving grammar slightly:

Hero:
- `We Are The Game Marketing Studio`
- `From immersive websites to powerful digital strategies — we help your game win the market.`
- CTA: `Case Study`
- CTA: `Connect with us`

Stats:
- `Growing with Game Studios Worldwide`
- `Delivering focused impact for game teams.`
- `25+ Studio Projects`
- `5+ Years in the Game Industry`
- `100% Design-Led Production`
- `2024 Studio Founded`

Services:
- Game landing page
- UI/UX Design
- Marketing Analytics
- Development
- Responsive design
- Community features

Process:
- Consultation & Analysis
- Design & Concept
- Development & Optimization
- Launch & Support

Why:
- Lightning speed delivery
- Unbeatable Pricing
- Gaming Expertise
- Design-Led Production

Portfolio:
- RPG Fantasy Quest
- Fantasy Character Campaign
- Beyond The Keep

Testimonial:
- Quote and author as listed above.

Academy:
- GaByte Academy
- Training and resources for game studios.
- Learn more

FAQ:
- Keep all four questions and answers.

Contact:
- Have an idea? Let's talk.
- Your name
- Your email
- Tell us about your idea
- Send

Footer:
- Services, Support, Legal columns
- Connect with us

## 24. Responsive Requirements

Desktop:
- Header horizontal nav visible.
- Hero headline can be very large but must not clip.
- Portfolio/services should use multi-column layouts.
- Contact can be split layout.
- Video can be large and cinematic.

Tablet:
- Avoid cramped 4-column cards.
- Use 2-column grids where appropriate.

Mobile:
- Header logo + hamburger.
- Mobile nav dropdown/drawer must include all nav links and CTA.
- Hero headline must wrap beautifully.
- CTA buttons stack or fit without overflow.
- Cards one column.
- FAQ rows must not squeeze question text.
- Contact form full width.
- No horizontal scrolling.

## 25. Implementation Instructions

Please implement the redesign directly in React + Tailwind.

Recommended files to touch:
- `src/index.css` for design tokens/global CSS if needed.
- `src/components/ui/Button.tsx`
- `src/components/ui/Container.tsx`
- `src/components/ui/Section.tsx`
- `src/components/ui/SectionHeading.tsx`
- `src/sections/Header.tsx`
- `src/sections/Hero.tsx`
- `src/sections/Showreel.tsx`
- `src/sections/Stats.tsx`
- `src/sections/Services.tsx`
- `src/sections/WorkProcess.tsx`
- `src/sections/WhyChooseUs.tsx`
- `src/sections/Portfolio.tsx`
- `src/sections/Testimonials.tsx`
- `src/sections/Academy.tsx`
- `src/sections/Faq.tsx`
- `src/sections/Contact.tsx`
- `src/sections/Footer.tsx`
- `src/content/content.ts` only if copy needs light cleanup.

Do not remove existing functionality:
- Header links must scroll to sections.
- Mobile menu must open/close.
- FAQ accordion must work.
- Contact form local submit success must work.
- Video must render and play.
- Buttons must link correctly.

After implementation:
- Run lint/build.
- Check desktop viewport around 1440px.
- Check mobile viewport around 390px.
- Verify no horizontal overflow.
- Verify header/menu/FAQ/contact interactions.
- Verify images/video paths are valid.

## 26. Current Git / Repo Note

At the time this context was created, the repo had existing uncommitted changes:
- `src/components/brand/GamegabyteLogo.tsx`
- `src/sections/Header.tsx`
- `src/assets/logo.svg`
- several screenshot files under `docs/legacy-site/screenshots/`

Do not blindly revert existing changes. Work with the current files.
