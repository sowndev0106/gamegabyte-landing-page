# Gamegabyte Session 10 Maintenance & Long-Term Quality Prompt

## Session 10 Là Gì?

Session 10 là phiên tạo checklist bảo trì dài hạn cho website Gamegabyte. Mục tiêu là giúp team sau này update content, đổi assets, kiểm tra deploy, audit performance định kỳ và tránh site xuống cấp sau nhiều lần sửa.

Session này nên chạy sau khi site đã production-ready hoặc đã deploy.

## Prompt Cho AI Agent

Bạn là senior frontend maintainer. Hãy tạo hoặc cập nhật tài liệu bảo trì dài hạn cho Gamegabyte landing page.

## 1. Context

Project:

```txt
/home/sown/workplace/projects/gamegabyte/gamegabyte-web
```

Website:
- One-page React/Vite landing page.
- Gamegabyte Studio marketing website.
- Có sections, assets, video, contact form local behavior, animations, responsive design.

## 2. Đọc Trước

Đọc:
- `package.json`
- `README.md`
- `docs/gamegabyte-sessions-index.md`
- `src/content/content.ts`
- `src/index.css`
- `src/App.tsx`
- asset folders under `public/assets/`
- deploy scripts.

## 3. Tạo Maintenance Doc

Tạo file:

```txt
docs/gamegabyte-maintenance-guide.md
```

Nội dung nên gồm:

### Local Development

- Install dependencies.
- Run dev server.
- Build.
- Preview.
- Lint.

### Content Updates

- Where copy lives.
- How to update nav.
- How to update services.
- How to update portfolio items.
- How to update FAQ.
- How to update footer.

### Asset Updates

- Background image paths.
- Portfolio image paths.
- Client logo paths.
- Video path/poster path.
- Recommended image formats and sizes.
- Lazy loading guidance.

### Design System

- Brand colors.
- Fonts.
- Button variants.
- Section spacing.
- Card patterns.
- Responsive breakpoints.

### QA Checklist

- Header.
- Mobile menu.
- Hero.
- Showreel.
- Services.
- Portfolio.
- FAQ.
- Contact form.
- Footer.
- Desktop/mobile.

### Release Checklist

- `npm run lint`
- `npm run build`
- Preview production build.
- Check git status.
- Deploy UAT.
- Final approval.
- Deploy production.

### Regression Risks

- Fixed header anchor overlap.
- Mobile overflow.
- Broken asset paths.
- Video loading.
- FAQ animation.
- Contact form state.
- Contrast issues.

### Future Improvements

- Real form backend.
- Analytics provider.
- CMS/content management.
- Case study detail pages.
- Blog/academy pages.
- Automated visual regression tests.

## 4. Optional README Update

If README is still generic Vite template, update it to a concise project README:

- Project name.
- What it is.
- Commands.
- Docs index.
- Deploy notes.

Do not over-document.

## 5. Rules

- Do not modify app behavior unless necessary.
- Do not invent secrets/deploy credentials.
- Do not remove existing docs.
- Keep docs practical.
- Prefer checklists over long essays.

## 6. Verification

If docs only:
- Check file paths in docs are accurate.

If README or code changes:

```bash
npm run lint
npm run build
```

## 7. Output Cuối

Báo cáo:
- Maintenance guide path.
- README updated or not.
- Any commands run.
- Remaining owner decisions.
