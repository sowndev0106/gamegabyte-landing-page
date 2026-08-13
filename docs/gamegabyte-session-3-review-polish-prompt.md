# Gamegabyte Session 3 Review & Polish Prompt

## Session 3 Là Gì?

Session 3 là phiên làm việc sau khi Session 2 đã redesign hoặc implement lại giao diện Gamegabyte. Mục tiêu của Session 3 không phải redesign lại từ đầu, mà là **review, QA, sửa lỗi, polish visual, kiểm tra responsive, kiểm tra interaction và đảm bảo build sạch**.

Cách dùng:

1. Mở session mới với AI Agent.
2. Đưa Agent file này hoặc copy toàn bộ phần `Prompt Cho AI Agent`.
3. Nếu Agent có quyền đọc repo, yêu cầu Agent đọc thêm:
   - `docs/gamegabyte-redesign-agent-prompt.md`
   - các file trong `src/sections/`
   - các component UI trong `src/components/`
4. Yêu cầu Agent làm audit trước, sau đó mới sửa.

## Prompt Cho AI Agent

Bạn là senior frontend engineer kiêm UI QA reviewer. Bạn đang tiếp quản project Gamegabyte sau một phiên redesign trước đó. Nhiệm vụ của bạn là review kỹ, phát hiện lỗi, sửa polish và xác nhận website production-ready hơn.

Không redesign lại toàn bộ từ đầu nếu không cần. Hãy giữ hướng thiết kế mới của Session 2, chỉ sửa những vấn đề thực tế về visual, responsive, accessibility, code quality, interaction, performance và build.

## 1. Project Context

Project là landing page một trang cho **Gamegabyte Studio**, studio/agency chuyên làm game marketing websites, game landing pages, UI/UX design, web development, marketing analytics và community features cho game studios.

Stack:
- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- `motion/react`

Main sections:
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

Important files:
- `src/App.tsx`
- `src/index.css`
- `src/content/content.ts`
- `src/components/ui/Button.tsx`
- `src/components/ui/Container.tsx`
- `src/components/ui/Section.tsx`
- `src/components/ui/SectionHeading.tsx`
- `src/components/brand/GamegabyteLogo.tsx`
- `src/components/motion/Reveal.tsx`
- `src/components/motion/Stagger.tsx`
- `src/components/motion/LazyVideo.tsx`
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

## 2. Required Context To Read First

Before making changes:

1. Read `docs/gamegabyte-redesign-agent-prompt.md`.
2. Read current `src/App.tsx`, `src/content/content.ts`, `src/index.css`.
3. Read all section files in `src/sections/`.
4. Read shared UI/motion components in `src/components/`.
5. Check `git status --short` so you know what files are already modified.

Do not revert user or previous-agent changes blindly. Work with the current state.

## 3. Main Goal

Make the redesigned Gamegabyte landing page feel finished.

You should:
- Fix visual bugs.
- Fix responsive issues.
- Fix overflow/clipping.
- Fix weak spacing and section rhythm.
- Fix inconsistent buttons/cards/headings.
- Fix broken image/video paths.
- Fix interactions: header menu, FAQ accordion, contact form.
- Fix obvious accessibility issues.
- Fix TypeScript/lint/build errors.
- Preserve the redesign direction unless it is objectively broken.

You should not:
- Replace the whole design without reason.
- Remove core content.
- Remove sections.
- Add fake business data, fake phone numbers, fake addresses or fake metrics.
- Add heavy dependencies unless necessary.
- Leave TODOs/placeholders.

## 4. Brand & Visual Standard

The site should feel:
- Gaming-native
- Premium
- High contrast
- Bold
- Strategic
- Conversion-focused
- Modern, not generic SaaS

Core visual language:
- Dark black/ink base.
- Neon lime for primary CTA and high-value highlights.
- Purple as secondary accent/glow/detail.
- Game UI / HUD-inspired panels are acceptable.
- Cards should be sharp or lightly rounded, not overly bubbly.
- Avoid giant repetitive purple blocks.
- Avoid decorative blobs/orbs.
- Avoid unreadable tiny uppercase text.
- Avoid section transitions that feel abrupt or copy-pasted.

Current useful tokens may include:
- `#601feb` purple
- `#b6e802` neon lime
- `#d4ff00` bright lime
- `#8c4fff` purple light
- `#030213` ink
- `#f1f2f9` surface

Fonts:
- Display: Schibsted Grotesk
- Body: Roboto

## 5. Content That Must Remain

Keep the core content:

Hero:
- `We Are The Game Marketing Studio`
- `From immersive websites to powerful digital strategies — we help your game win the market.`
- CTA to case studies / portfolio.
- CTA to contact.

Navigation:
- Home -> `#home`
- Our Services -> `#services`
- GaByte Academy -> `#academy`
- Case Studies -> `#portfolio`
- About Us -> `#about`
- Header CTA -> `#contact`

Stats:
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

Academy:
- GaByte Academy
- Training and resources for game studios.

FAQ:
- Keep all four existing questions and answers.

Contact:
- Have an idea? Let's talk.
- Your name
- Your email
- Tell us about your idea
- Send

Footer:
- Services
- Support
- Legal
- Connect with us

## 6. QA Checklist

Run this review before editing, then again after editing.

### Header

Check:
- Header does not cover hero text.
- Header is readable over dark/visual backgrounds.
- Desktop nav is horizontally aligned and not cramped.
- Active/hover/focus states are visible.
- Header CTA is prominent.
- Mobile hamburger opens and closes.
- Mobile menu contains all nav items and CTA.
- Tapping mobile menu links closes menu.
- Header height is not excessive on mobile.

### Hero

Check:
- First viewport immediately communicates what Gamegabyte does.
- Headline does not clip at 1440px, 1024px, 768px, 390px.
- CTA buttons do not overflow.
- Background supports text readability.
- Visual is not too dark or empty.
- Hero spacing works with fixed header.

### Showreel

Check:
- Video renders.
- Poster path works.
- Controls are usable.
- Video frame is not tiny on mobile.
- Section feels integrated with trust logos.
- Logos are visible enough but not overpowering.

### Stats

Check:
- Numbers are readable.
- Labels and notes do not become cramped.
- Grid behaves well on mobile.
- Stats feel credible, not decorative only.

### Services

Check:
- Six services are present.
- Cards have consistent height/rhythm where appropriate.
- Text is readable.
- Hover states do not cause layout shift.
- Mobile one-column layout is clean.
- Links/buttons point to valid targets.

### Technology / Process

Check:
- Technology section supports trust and does not feel like filler.
- Process order is clear.
- Numbering is obvious.
- Mobile layout is not cramped.

### Why Choose Us

Check:
- About section target `#about` exists.
- Differentiators are clear.
- Background image/pattern does not reduce readability.
- Cards do not feel generic or duplicated.

### Portfolio

Check:
- All images load.
- Cards/case studies look premium.
- Tags are readable.
- Hover states are smooth.
- Mobile cards have correct image aspect ratio.

### Testimonials

Check:
- Quote is readable.
- Attribution is clear.
- Section does not have excessive empty space.
- Single testimonial is presented intentionally, not like a broken carousel.

### Academy

Check:
- Section feels distinct but not disconnected.
- CTA is visible.
- Text contrast passes basic readability.

### FAQ

Check:
- Accordion opens/closes correctly.
- Default open state is sensible.
- Plus/minus state is clear.
- Long questions wrap cleanly on mobile.
- Animated height does not glitch.

### Contact

Check:
- Form fields are usable.
- Labels are clear.
- Focus states are visible.
- Submit works with local state.
- Success message appears.
- Form clears only after submit.
- Desktop layout and mobile layout are both clean.

### Footer

Check:
- Logo is visible.
- Columns align well.
- Links have hover/focus states.
- Copyright year works.
- Footer is not visually forgotten.

## 7. Accessibility Checklist

Fix issues found:
- Interactive elements need visible focus states.
- Buttons vs links should be semantically correct.
- Icon-only buttons need aria-labels.
- Decorative images should use empty alt.
- Meaningful images should have useful alt.
- Form inputs need labels.
- FAQ buttons should be keyboard accessible.
- Mobile menu button should have `aria-expanded`.
- Contrast must be readable, especially lime/purple/dark combinations.
- Respect reduced motion where animations are significant.

## 8. Responsive Checklist

Test at least:
- Desktop: 1440px wide
- Laptop: 1280px wide
- Tablet: 768px wide
- Mobile: 390px wide
- Small mobile: 360px wide if possible

Look for:
- Horizontal scroll.
- Text clipping.
- Buttons wider than viewport.
- Cards too cramped.
- Header/menu overflow.
- Images with bad crop.
- Section gaps too large or too small.
- Fixed header covering anchors.

## 9. Performance Checklist

Check:
- Large images are used intentionally.
- Below-fold images use `loading="lazy"` where appropriate.
- Video lazy-load behavior remains reasonable.
- No unnecessary heavy dependencies.
- No layout thrash caused by animations.
- CSS does not include huge unused custom code.

## 10. Build & Verification Commands

Run:

```bash
npm run lint
npm run build
```

If there is a dev server available, run or use:

```bash
npm run dev
```

Then inspect the site in browser if possible.

If using Playwright or screenshots, verify:
- Desktop full page.
- Mobile full page.
- Header/menu interaction.
- FAQ interaction.
- Contact form submit.

If any command fails, fix the root cause. Do not hide errors.

## 11. Editing Rules

When editing:
- Keep changes focused.
- Prefer existing patterns and components.
- Avoid unrelated refactors.
- Do not delete useful content.
- Do not add TODO comments.
- Do not invent fake data.
- Keep TypeScript clean.
- Keep Tailwind classes readable enough.
- Extract repeated styling only when it improves maintainability.

If the visual redesign from Session 2 is fundamentally incomplete, do a targeted completion pass, not a total restart.

## 12. Expected Final Response

When done, report:

1. What you reviewed.
2. What you fixed.
3. What commands you ran and whether they passed.
4. Any remaining risks or things that need manual design approval.

Be concrete. Mention file paths changed. Do not claim the site is perfect unless verified.
