# Gamegabyte Session 5 Copy & Conversion Prompt

## Session 5 Là Gì?

Session 5 là phiên tối ưu **copywriting, conversion flow, CTA hierarchy và message clarity**. Sau khi UI đã đẹp và production-ready hơn, phiên này tập trung làm nội dung thuyết phục hơn mà không phá layout.

Session này không phải redesign toàn bộ. Nhiệm vụ là chỉnh copy, CTA, section narrative và microcopy để người đọc hiểu nhanh: Gamegabyte làm gì, giúp ai, vì sao nên tin, và nên làm gì tiếp theo.

## Prompt Cho AI Agent

Bạn là senior conversion copywriter kiêm frontend engineer. Hãy audit và cải thiện copy/content của Gamegabyte landing page để tăng clarity và conversion.

## 1. Context

Gamegabyte Studio là agency/studio làm:
- Game landing pages.
- Game marketing websites.
- UI/UX design.
- Web development.
- Marketing analytics.
- Community features.
- Training/resources qua GaByte Academy.

Target audience:
- Game studios.
- Indie game teams.
- Mobile/PC game developers.
- Marketing teams trong gaming.
- Founders cần landing page/campaign site để launch game.

Goal:
- User hiểu ngay Gamegabyte là game marketing studio.
- User thấy đủ trust để xem case studies hoặc contact.
- User được dẫn tới CTA rõ ràng.

## 2. Đọc Trước

Đọc:
- `docs/gamegabyte-redesign-agent-prompt.md`
- `src/content/content.ts`
- các section trong `src/sections/`
- UI hiện tại nếu có thể chạy browser.

## 3. Việc Cần Làm

### Message Clarity

Kiểm tra:
- Hero có nói rõ Gamegabyte làm gì không?
- Subtitle có cụ thể hay còn chung chung?
- CTA primary có đúng mục tiêu conversion không?
- Section order có kể câu chuyện hợp lý không?

### CTA Hierarchy

Kiểm tra:
- CTA chính nên nhất quán: `Let's talk`, `Connect with us`, hoặc `Start a project`.
- CTA phụ: `View case studies`, `Watch showreel`, `Explore services`.
- Không dùng quá nhiều CTA text khác nhau gây loạn.
- CTA trong services/portfolio/contact phải dẫn đúng anchor.

### Services Copy

Kiểm tra và chỉnh nếu cần:
- Service title nên nhất quán capitalization.
- Body copy nên cụ thể hơn, ít generic hơn.
- Mỗi service nên nói về outcome cho game studio.

### Proof & Trust

Kiểm tra:
- Stats có giải thích rõ không?
- Testimonials có context không?
- Portfolio title/tag có đủ rõ không?
- Academy section có vai trò rõ chưa?

### FAQ

Kiểm tra:
- FAQ có xử lý objection thật không?
- Answers có đủ cụ thể không?
- Không dài dòng.

### Contact Form

Kiểm tra:
- Contact headline có đủ mạnh không?
- Form labels rõ không?
- Success message có tự nhiên không?

## 4. Quy Tắc Copy

- Không thêm fake metrics.
- Không bịa client mới.
- Không bịa địa chỉ/email/phone.
- Không dùng buzzword quá nhiều.
- Không dùng lorem ipsum.
- Không làm text quá dài khiến layout vỡ.
- Có thể chỉnh grammar và tone.
- Giữ brand: bold, gaming-native, strategic, premium.

## 5. Files Có Thể Sửa

Ưu tiên:
- `src/content/content.ts`

Chỉ sửa section files nếu text đang hard-code trong component:
- `src/sections/Hero.tsx`
- `src/sections/Services.tsx`
- `src/sections/Stats.tsx`
- `src/sections/WorkProcess.tsx`
- `src/sections/WhyChooseUs.tsx`
- `src/sections/Portfolio.tsx`
- `src/sections/Testimonials.tsx`
- `src/sections/Academy.tsx`
- `src/sections/Faq.tsx`
- `src/sections/Contact.tsx`
- `src/sections/Footer.tsx`

## 6. Verification

Sau khi sửa:

```bash
npm run lint
npm run build
```

Nếu có browser:
- Check desktop/mobile để đảm bảo copy không overflow.
- Check hero headline/subtitle.
- Check service cards.
- Check FAQ.
- Check contact section.

## 7. Output Cuối

Báo cáo:
- Copy đã chỉnh ở đâu.
- CTA hierarchy sau chỉnh là gì.
- Content nào giữ nguyên.
- Commands đã chạy và kết quả.
- Nếu còn phần cần owner duyệt, ghi rõ.
