# Gamegabyte Session 6 Production Handoff Prompt

## Session 6 Là Gì?

Session 6 là phiên chuẩn bị bàn giao production. Mục tiêu là kiểm tra lần cuối repo, build, deployment readiness, docs, scripts, assets, environment assumptions và tạo báo cáo handoff rõ ràng.

Session này dành cho lúc website đã qua redesign, review, performance/SEO/a11y và copy polish.

## Prompt Cho AI Agent

Bạn là senior release engineer kiêm frontend lead. Hãy kiểm tra project Gamegabyte trước khi bàn giao/deploy production.

## 1. Context

Project:

```txt
/home/sown/workplace/projects/gamegabyte/gamegabyte-web
```

Stack:
- React
- TypeScript
- Vite
- Tailwind CSS v4
- Motion

Deploy scripts có thể có:
- `deploy.main.sh`
- `deploy.uat.sh`
- `npm run deploy`

Package scripts cần kiểm tra:
- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run preview`
- `npm run deploy`

## 2. Đọc Trước

Đọc:
- `package.json`
- `README.md`
- `deploy.main.sh`
- `deploy.uat.sh`
- `public/_redirects`
- `vite.config.ts`
- `index.html`
- `docs/gamegabyte-session-1-analysis-prompt.md`
- `docs/gamegabyte-redesign-agent-prompt.md`
- `docs/gamegabyte-session-3-review-polish-prompt.md`
- `docs/gamegabyte-session-4-performance-seo-a11y-prompt.md`
- `docs/gamegabyte-session-5-copy-conversion-prompt.md`

## 3. Việc Cần Kiểm Tra

### Repo State

Chạy:

```bash
git status --short
git diff --stat
```

Không revert thay đổi nếu không được yêu cầu. Chỉ báo cáo rõ file nào đang modified/untracked.

### Build Health

Chạy:

```bash
npm run lint
npm run build
```

Nếu build fail:
- Tìm nguyên nhân gốc.
- Fix nếu trong scope.
- Chạy lại.

### Preview

Nếu có thể:

```bash
npm run preview
```

Kiểm tra site production build render đúng.

### Deployment Readiness

Kiểm tra:
- `dist/` build output được tạo.
- Public assets có tồn tại.
- Video path đúng.
- Logo path đúng.
- `_redirects` phù hợp cho static hosting.
- Deploy script có assumptions gì.
- `wrangler` hoặc Cloudflare Pages config nếu dùng có cần auth không.

### Final Browser QA

Kiểm tra nhanh:
- Desktop 1440px.
- Mobile 390px.
- Header menu.
- Anchor nav.
- FAQ accordion.
- Contact submit.
- Video.
- Footer.
- No horizontal scroll.

### Documentation

Nếu README còn template Vite mặc định, đề xuất hoặc cập nhật tối thiểu:
- Project name.
- Local dev command.
- Build command.
- Preview command.
- Deploy command nếu rõ.
- Important docs links.

Chỉ sửa README nếu được phép hoặc nếu owner muốn handoff đầy đủ.

## 4. Quy Tắc

- Không deploy thật nếu user không yêu cầu.
- Không chạy command destructive.
- Không xóa untracked files.
- Không commit nếu user không yêu cầu.
- Không thay đổi scope lớn.
- Không invent deploy credentials.
- Nếu deploy cần auth/network, báo rõ.

## 5. Output Cuối

Tạo handoff report gồm:

1. Repo status.
2. Build/lint result.
3. Preview/browser QA result.
4. Deployment readiness.
5. Files changed trong Session 6.
6. Known risks.
7. Recommended next action:
   - deploy UAT,
   - deploy production,
   - request final design approval,
   - or fix remaining blockers.
