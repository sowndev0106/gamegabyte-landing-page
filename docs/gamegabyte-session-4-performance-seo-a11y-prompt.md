# Gamegabyte Session 4 Performance, SEO & Accessibility Prompt

## Session 4 Là Gì?

Session 4 là phiên tối ưu sau khi UI đã được redesign và polish. Mục tiêu là kiểm tra và cải thiện **performance, SEO, accessibility, semantic HTML, metadata, image/video loading và production quality**.

Session này không redesign lại giao diện. Chỉ sửa những phần giúp website nhanh hơn, dễ index hơn, dễ truy cập hơn và đáng tin hơn khi deploy.

## Prompt Cho AI Agent

Bạn là senior frontend engineer chuyên performance, SEO và accessibility. Hãy audit project Gamegabyte landing page sau redesign và tối ưu để site sẵn sàng production.

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
- `motion/react`

Website:
- One-page landing page cho Gamegabyte Studio.
- Mục tiêu conversion: dẫn user tới case studies hoặc contact form.
- Visual direction: dark gaming premium, neon lime CTA, purple secondary accent.

Đọc trước:
- `docs/gamegabyte-redesign-agent-prompt.md`
- `docs/gamegabyte-session-3-review-polish-prompt.md`
- `src/App.tsx`
- `src/index.css`
- `src/content/content.ts`
- `index.html`
- tất cả files trong `src/sections/`
- shared components trong `src/components/`

## 2. Việc Cần Audit

### Performance

Kiểm tra và sửa:
- Image loading strategy.
- Video loading strategy.
- Large background usage.
- Lazy-load ảnh dưới fold.
- Không lazy-load ảnh hero nếu ảnh cần render first viewport.
- Không dùng animation gây layout shift.
- Không tạo CSS/DOM quá phức tạp không cần thiết.
- Không import asset thừa.
- Build output có kích thước hợp lý.

### SEO

Kiểm tra và sửa:
- `index.html` title.
- Meta description.
- Open Graph tags.
- Twitter card tags.
- Canonical URL nếu biết domain.
- Favicon/logo nếu có.
- Semantic heading order.
- Landing page chỉ nên có một H1 chính.
- Section headings dùng H2/H3 hợp lý.
- Anchor sections có id đúng.
- Content quan trọng là text thật, không chỉ nằm trong image.

### Accessibility

Kiểm tra và sửa:
- Interactive elements có focus-visible state.
- Mobile menu button có `aria-expanded`, `aria-label`.
- FAQ accordion keyboard accessible.
- Form labels đúng với inputs.
- Decorative images dùng `alt=""`.
- Meaningful images có alt rõ ràng.
- Video có aria-label hoặc title phù hợp.
- Contrast đọc được trên dark/purple/lime backgrounds.
- Reduced motion được tôn trọng.
- Link/button semantics đúng.

### HTML / React Quality

Kiểm tra và sửa:
- Không có invalid nesting.
- Không có duplicate id.
- Không có broken anchor.
- Không có console noise.
- Không có unused imports.
- Không có TypeScript/lint errors.

## 3. Các Command Cần Chạy

Chạy:

```bash
npm run lint
npm run build
```

Nếu có thể, chạy dev server và kiểm tra browser:

```bash
npm run dev
```

Nếu dùng Lighthouse hoặc Playwright được, hãy kiểm tra:
- Desktop.
- Mobile.
- First viewport.
- Full page scroll.
- Header menu.
- FAQ accordion.
- Contact form.

## 4. Quy Tắc Sửa

- Không redesign lại layout lớn.
- Không đổi brand direction.
- Không xóa content.
- Không thêm fake data.
- Không thêm dependency nặng nếu không cần.
- Chỉ refactor khi giúp performance/accessibility/SEO rõ ràng.
- Giữ code maintainable.

## 5. Output Cuối

Báo cáo:
- Files đã sửa.
- Performance improvements.
- SEO improvements.
- Accessibility improvements.
- Commands đã chạy và kết quả.
- Vấn đề còn lại nếu có.
