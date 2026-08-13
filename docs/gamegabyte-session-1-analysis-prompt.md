# Gamegabyte Session 1 Analysis Prompt

## Session 1 Là Gì?

Session 1 là phiên phân tích ban đầu. Mục tiêu của Session 1 là đọc project hiện tại, gom context đầy đủ về codebase, nội dung, style, layout, assets, sections, responsive behavior và vấn đề UI hiện tại. Kết quả của Session 1 là tài liệu nền để tạo Session 2 redesign prompt.

Session 1 không cần implement redesign. Nhiệm vụ chính là **hiểu dự án thật kỹ** và xuất ra context đủ chi tiết cho Agent khác tiếp tục.

## Prompt Cho AI Agent

Bạn là senior frontend engineer kiêm UI analyst. Hãy phân tích toàn bộ project Gamegabyte landing page và tạo một bản context đầy đủ để chuẩn bị cho một phiên redesign tiếp theo.

Không redesign, không sửa code trừ khi được yêu cầu. Hãy tập trung đọc code, tài liệu, assets, screenshot và mô tả chính xác website hiện tại.

## 1. Project Cần Phân Tích

Project path:

```txt
/home/sown/workplace/projects/gamegabyte/gamegabyte-web
```

Stack dự kiến:
- React
- TypeScript
- Vite
- Tailwind CSS
- Motion / animation library nếu có

Mục tiêu website:
- Landing page cho Gamegabyte Studio.
- Game marketing studio/agency.
- Bán dịch vụ game landing page, UI/UX, development, analytics, community features.
- Dẫn người dùng tới case studies hoặc contact form.

## 2. Việc Cần Làm

Hãy đọc và phân tích:

- `package.json`
- `README.md`
- `AGENTS.md` nếu có nội dung
- `docs/`
- `docs/legacy-site/CONTENT.md`
- `docs/LIBRARY.md`
- `src/App.tsx`
- `src/index.css`
- `src/content/content.ts`
- Toàn bộ `src/sections/`
- Toàn bộ `src/components/ui/`
- `src/components/brand/`
- `src/components/motion/`
- Assets trong:
  - `public/assets/img/backgrounds/`
  - `public/assets/img/portfolio/`
  - `public/assets/img/clients/`
  - `public/video/`
  - `src/assets/`
- Screenshot nếu có trong:
  - `docs/legacy-site/screenshots/`

Sau đó tạo một bản phân tích rõ ràng gồm:

1. Project overview.
2. Tech stack.
3. Current app structure.
4. Current section order.
5. Header/menu behavior.
6. Button system.
7. Design tokens: colors, fonts, spacing.
8. Content inventory đầy đủ.
9. Assets inventory.
10. Current visual direction.
11. Responsive behavior desktop/mobile.
12. Interaction/animation behavior.
13. Current visual/UI problems.
14. Constraints Agent redesign cần biết.
15. Suggested direction for Session 2 redesign.

## 3. Codebase Facts Cần Capture

Khi phân tích, hãy ghi lại càng cụ thể càng tốt:

- App render các section theo thứ tự nào.
- Mỗi section có `id` gì.
- Header nav link đến anchor nào.
- Mobile menu hoạt động thế nào.
- Button có bao nhiêu variants.
- CTA text và href của từng CTA.
- Hero headline/subtitle/background.
- Showreel dùng video asset nào.
- Trust bar dùng logo nào.
- Stats gồm số liệu nào.
- Services gồm card nào.
- Technology/process gồm item nào.
- Portfolio gồm project nào và image nào.
- FAQ gồm câu hỏi/trả lời nào.
- Contact form có fields gì và submit behavior ra sao.
- Footer columns/links là gì.
- Màu chủ đạo và font hiện tại.
- Những nơi dùng background image/pattern.
- Motion/reveal/stagger/accordion behavior.

## 4. Output Mong Muốn

Xuất ra một bản context có thể dùng trực tiếp để viết prompt redesign cho Agent khác.

Văn phong:
- Rõ ràng.
- Cụ thể.
- Có file path khi cần.
- Không nói chung chung.
- Không bỏ sót header/menu/button/background/element quan trọng.

Nếu tạo file, lưu trong:

```txt
docs/
```

Tên file gợi ý:

```txt
docs/gamegabyte-session-1-analysis.md
```

## 5. Không Làm

Không làm các việc sau trong Session 1:

- Không redesign.
- Không refactor code.
- Không đổi content.
- Không chạy destructive git commands.
- Không revert thay đổi đang có.
- Không tự invent thông tin không có trong repo.

## 6. Kết Quả Session 1 Nên Dẫn Tới Session 2

Sau khi phân tích xong, hãy tạo hoặc đề xuất một prompt Session 2 với mục tiêu:

- Redesign landing page.
- Giữ đúng content.
- Cải thiện visual theo hướng gaming premium.
- Cải thiện responsive.
- Cải thiện header/menu/button/cards/forms.
- Giữ React + Tailwind + Motion.
- Chạy lint/build sau khi implement.

Session 2 prompt nên đủ context để Agent không cần đọc toàn bộ code vẫn có thể hiểu dự án.

## 7. Ghi Chú Repo Hiện Tại Từ Lần Phân Tích Trước

Các file/tài liệu liên quan đã được tạo:

- `docs/gamegabyte-redesign-agent-prompt.md`
  - Prompt Session 2 để Agent redesign/implement UI mới.
- `docs/gamegabyte-session-3-review-polish-prompt.md`
  - Prompt Session 3 để Agent review, QA, polish sau redesign.

Repo từng có uncommitted changes ở:

- `src/components/brand/GamegabyteLogo.tsx`
- `src/sections/Header.tsx`
- `src/assets/logo.svg`
- một số screenshot trong `docs/legacy-site/screenshots/`

Khi phân tích, hãy chạy `git status --short` và không revert những thay đổi này nếu không được yêu cầu.
