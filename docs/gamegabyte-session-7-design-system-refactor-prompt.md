# Gamegabyte Session 7 Design System & Component Refactor Prompt

## Session 7 Là Gì?

Session 7 là phiên chuẩn hóa design system và refactor component sau khi website đã redesign, polish, tối ưu và chuẩn bị production. Mục tiêu là làm code UI dễ bảo trì hơn, giảm duplicate Tailwind classes, chuẩn hóa component, token, section pattern và interaction.

Session này không nhằm đổi visual direction. Chỉ refactor khi giữ nguyên hoặc cải thiện nhẹ UI hiện tại.

## Prompt Cho AI Agent

Bạn là senior frontend engineer chuyên design system. Hãy audit và refactor code UI Gamegabyte để component system nhất quán, dễ bảo trì và ít duplicate hơn mà không phá giao diện đã hoàn thiện.

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
- Visual direction: dark gaming premium, neon lime CTA, purple secondary accent.
- Đây là giai đoạn sau redesign và QA.

## 2. Đọc Trước

Đọc:
- `docs/gamegabyte-sessions-index.md`
- `docs/gamegabyte-redesign-agent-prompt.md`
- `src/index.css`
- `src/App.tsx`
- `src/content/content.ts`
- `src/components/ui/`
- `src/components/motion/`
- `src/components/brand/`
- `src/sections/`

Chạy trước:

```bash
git status --short
```

Không revert thay đổi đang có.

## 3. Việc Cần Làm

### Component Audit

Kiểm tra:
- Button variants có nhất quán không.
- Container widths/paddings có nhất quán không.
- Section spacing có bị hard-code lung tung không.
- Section headings có pattern rõ không.
- Cards có nhiều class duplicate không.
- Tag/chip/badge style có lặp không.
- Form input style có component hóa được không.
- CTA link/button style có nhất quán không.

### Design Tokens

Kiểm tra:
- Màu chính nằm trong `@theme` hoặc token rõ ràng.
- Font tokens rõ ràng.
- Shadow/glow/border style có thể chuẩn hóa nếu lặp nhiều.
- Radius/spacing có quy ước nhất quán.

### Component Refactor

Chỉ tạo abstraction khi thật sự giảm duplication hoặc cải thiện clarity.

Có thể tạo/cải thiện:
- `Button`
- `Container`
- `Section`
- `SectionHeading`
- `Card`
- `Badge`
- `TextInput`
- `Textarea`
- `Panel`
- `GlowFrame`

Không tạo component quá generic nếu chỉ dùng một lần.

### Section Cleanup

Trong section files:
- Giữ markup dễ đọc.
- Đưa repeated card patterns vào component nếu hợp lý.
- Giữ content data trong `src/content/content.ts` nếu đang phù hợp.
- Không trộn quá nhiều logic vào visual component.

## 4. Quy Tắc

- Không redesign lại từ đầu.
- Không đổi content trừ lỗi nhỏ.
- Không thêm dependency.
- Không làm abstraction quá mức.
- Không phá responsive.
- Không phá animation.
- Không phá accessibility.
- Không đổi anchor ids.

## 5. Verification

Chạy:

```bash
npm run lint
npm run build
```

Nếu có thể, kiểm tra browser:
- Desktop 1440px.
- Mobile 390px.
- Header menu.
- FAQ.
- Contact form.
- Full page scroll.

## 6. Output Cuối

Báo cáo:
- Component nào đã chuẩn hóa.
- Duplicate nào đã giảm.
- Files đã sửa.
- Commands đã chạy và kết quả.
- Rủi ro còn lại nếu có.
