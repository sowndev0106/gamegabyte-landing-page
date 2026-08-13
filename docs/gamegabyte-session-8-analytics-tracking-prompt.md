# Gamegabyte Session 8 Analytics & Event Tracking Prompt

## Session 8 Là Gì?

Session 8 là phiên thiết kế và triển khai analytics/event tracking cho landing page. Mục tiêu là đo được user interaction quan trọng: CTA clicks, case study clicks, showreel plays, FAQ opens, contact form submit và navigation behavior.

Session này không deploy tracker thật nếu chưa có provider/config. Nếu chưa có analytics provider, hãy tạo tracking abstraction an toàn để sau này gắn GA4/Plausible/PostHog/Meta Pixel dễ dàng.

## Prompt Cho AI Agent

Bạn là senior frontend engineer chuyên analytics implementation. Hãy audit và chuẩn bị event tracking cho Gamegabyte landing page.

## 1. Context

Project:

```txt
/home/sown/workplace/projects/gamegabyte/gamegabyte-web
```

Stack:
- React
- TypeScript
- Vite
- Tailwind CSS

Website goal:
- Convert visitors into leads.
- Primary conversion: contact form submit / contact CTA click.
- Secondary conversion: case studies / showreel engagement.

## 2. Đọc Trước

Đọc:
- `src/App.tsx`
- `src/content/content.ts`
- `src/sections/Header.tsx`
- `src/sections/Hero.tsx`
- `src/sections/Showreel.tsx`
- `src/sections/Services.tsx`
- `src/sections/Portfolio.tsx`
- `src/sections/Faq.tsx`
- `src/sections/Contact.tsx`
- `src/components/ui/Button.tsx`

## 3. Tracking Plan

Trước khi code, tạo hoặc cập nhật một tracking plan trong docs:

```txt
docs/gamegabyte-analytics-tracking-plan.md
```

Ghi rõ:
- Event name.
- Trigger.
- Properties.
- Section/source.
- Conversion priority.

## 4. Events Nên Theo Dõi

Recommended event names:

- `nav_click`
  - properties: `label`, `href`, `location`
- `cta_click`
  - properties: `label`, `href`, `section`, `variant`
- `showreel_play`
  - properties: `source`, `section`
- `showreel_pause`
  - properties: `source`, `section`
- `portfolio_click`
  - properties: `project`, `tag`, `index`
- `service_portfolio_click`
  - properties: `service`, `href`
- `faq_open`
  - properties: `question`, `index`
- `faq_close`
  - properties: `question`, `index`
- `contact_form_submit`
  - properties: `has_name`, `has_email`, `message_length_bucket`
- `contact_form_success`
  - properties: `section`
- `footer_link_click`
  - properties: `label`, `column`

## 5. Implementation Options

Nếu chưa có provider:
- Tạo helper `src/lib/analytics.ts`.
- Export function `trackEvent(name, properties)`.
- Trong development, có thể log nhẹ nếu cần, nhưng tránh spam.
- Trong production, no-op nếu chưa có provider.
- Cho phép sau này gắn `window.gtag`, Plausible hoặc PostHog.

Nếu đã có provider:
- Gắn theo provider hiện tại.
- Không hard-code secrets.
- Dùng env vars nếu cần.

## 6. Rules

- Không gửi PII.
- Không gửi email/name/message raw.
- Với contact form, chỉ gửi boolean hoặc bucket.
- Không break form behavior.
- Không break links.
- Không làm tracking blocking UI.
- Không thêm dependency lớn nếu không cần.

## 7. Verification

Chạy:

```bash
npm run lint
npm run build
```

Nếu có browser:
- Click header nav.
- Click hero CTA.
- Play/pause video.
- Click service/portfolio CTA.
- Open/close FAQ.
- Submit contact form.
- Xác nhận không có runtime error.

## 8. Output Cuối

Báo cáo:
- Tracking plan file.
- Helper/implementation files.
- Events đã gắn.
- Provider status: real provider hay no-op abstraction.
- Commands đã chạy và kết quả.
