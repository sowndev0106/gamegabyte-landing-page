# Gamegabyte Session 9 Experiments & A/B Testing Prompt

## Session 9 Là Gì?

Session 9 là phiên chuẩn bị conversion experiments và A/B testing. Mục tiêu là đề xuất, thiết kế và nếu phù hợp, tạo cấu trúc code nhẹ để thử nghiệm hero copy, CTA hierarchy, section order hoặc form messaging.

Session này chỉ nên chạy sau khi analytics tracking đã có kế hoạch hoặc đã implement.

## Prompt Cho AI Agent

Bạn là senior growth engineer kiêm conversion strategist. Hãy chuẩn bị A/B testing và conversion experiments cho Gamegabyte landing page.

## 1. Context

Gamegabyte landing page có mục tiêu:
- Người dùng hiểu nhanh dịch vụ.
- Xem case studies/showreel.
- Liên hệ qua form.

Các conversion chính:
- Contact form submit.
- Header/hero/contact CTA click.

Các conversion phụ:
- Portfolio click.
- Showreel play.
- FAQ engagement.

## 2. Đọc Trước

Đọc:
- `docs/gamegabyte-analytics-tracking-plan.md` nếu có.
- `src/content/content.ts`
- `src/sections/Hero.tsx`
- `src/sections/Services.tsx`
- `src/sections/Portfolio.tsx`
- `src/sections/Contact.tsx`
- analytics helper nếu Session 8 đã tạo.

## 3. Việc Cần Làm

### Experiment Backlog

Tạo file:

```txt
docs/gamegabyte-experiments-backlog.md
```

Ghi 8-12 experiment ideas, mỗi experiment gồm:
- Hypothesis.
- Variant A.
- Variant B.
- Primary metric.
- Secondary metrics.
- Risk.
- Implementation complexity.
- Recommendation priority.

### Experiment Ideas Gợi Ý

Ưu tiên các experiment:

1. Hero CTA:
   - A: `Connect with us`
   - B: `Start your game campaign`
2. Hero headline:
   - A: `We Are The Game Marketing Studio`
   - B: `Launch-ready websites for game studios`
3. CTA order:
   - A: primary contact, secondary case studies
   - B: primary case studies, secondary contact
4. Showreel placement:
   - A: after hero
   - B: after stats
5. Contact section:
   - A: simple form
   - B: form + project-fit checklist
6. Services card CTA:
   - A: `View portfolio`
   - B: `Talk about this service`
7. FAQ order:
   - A: timeline first
   - B: differentiation first
8. Academy visibility:
   - A: current placement
   - B: smaller CTA banner near footer

### Code Support

Only implement code support if useful and requested by repo state.

If implementing:
- Keep it simple.
- No heavy A/B testing SDK.
- Create config-driven content variants.
- Use deterministic variant assignment only if privacy-safe and simple.
- Do not block rendering.
- Do not persist user data unnecessarily.

For most cases, documentation/backlog is enough.

## 4. Rules

- Do not invent conversion results.
- Do not claim a variant wins without data.
- Do not add privacy-invasive tracking.
- Do not add third-party scripts without approval.
- Do not make the site unstable for experiments.

## 5. Verification

If only docs:
- Verify docs are clear and actionable.

If code changes:

```bash
npm run lint
npm run build
```

Browser-check variant behavior if implemented.

## 6. Output Cuối

Báo cáo:
- Experiment backlog path.
- Top 3 recommended tests.
- Any code changes.
- Commands run and results.
- What data is needed before running experiments.
