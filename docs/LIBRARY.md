# UI / Animation Libraries — gamegabyte-web

Tài liệu tham khảo các thư viện UI & animation cho project. Mục tiêu: **focus vào animation, code thật (React/Next), bắt đầu với chi phí $0.**

---

## 1. Engine animation (bắt buộc)

| Thư viện | Giá | Link | Ghi chú |
|----------|-----|------|---------|
| **Motion** (`motion`, trước là `framer-motion`) | **Free — MIT** | https://motion.dev | Lõi của mọi animation. Cài: `npm install motion`, import: `motion/react` |
| Motion+ | Trả phí 1 lần (lifetime) | https://motion.dev/plus | **Tùy chọn** — chỉ thêm ví dụ premium, component làm sẵn, AI workflow. KHÔNG cần để làm animation. |

> ⚠️ Bản free đã đủ sức mạnh làm **mọi** animation (fade, scroll, parallax, page transition, gesture, layout…). Motion+ chỉ là "sách công thức", không phải "mở khóa" khả năng.

---

## 2. Component + animation copy-paste (route code thật)

| Thư viện | Giá | Link | Điểm mạnh |
|----------|-----|------|-----------|
| **shadcn/ui** | Free | https://ui.shadcn.com | Component nền: button, dialog, form… copy vào repo |
| **ReactBits** | Free | https://reactbits.dev | Hiệu ứng text / background động |
| **Aceternity UI** | Free (phần lớn); Pro **$199** (1 lần, lifetime) | https://ui.aceternity.com | Animation "wow": hero, hiệu ứng chuột, 3D card, template |
| **Magic UI** | Free tier; Pro **$20/tháng** | https://magicui.design | Marquee, text effect, animated beam |

> Đây là cách "clone animation cho code" đúng nghĩa: cho **mã React + Tailwind + Motion thật**, sửa được, không khóa trong môi trường Framer.

---

## 3. Framer kit (no-code) — KHÔNG dùng cho project này

Các kit này build cho **môi trường Framer**, không xuất ra React code dùng được. Chỉ dùng để **lấy cảm hứng / reference**, KHÔNG mua cho mục tiêu code.

| Kit | Giá | Link |
|-----|-----|------|
| Kompa | ~$129 (1 lần, lifetime) | https://www.kompa.design |
| Frameblox | Trả 1 lần (lifetime) | https://www.frameblox.com |
| Nova UI | Trả 1 lần | https://novaui.design |

---

## Stack đề xuất

- **Next.js + Tailwind CSS** — nền tảng
- **Motion** — animation engine (free)
- **shadcn/ui + Aceternity (free) + ReactBits** — component & hiệu ứng

**Tổng chi phí khởi đầu: $0.** Chỉ cân nhắc Aceternity Pro ($199, trả 1 lần) nếu cần nhiều template/block dựng landing page nhanh.

---

## 4 khái niệm animation cốt lõi (Motion)

| Khái niệm | Dùng để |
|-----------|---------|
| `initial / animate / exit` | Vào – hiện – ra của element |
| `transition` (duration, ease, spring) | Cảm giác chuyển động mượt |
| `whileHover / whileTap` | Tương tác chuột / chạm |
| `useScroll` + `useTransform` | Animation theo cuộn (parallax, reveal) |

Bổ sung: `<AnimatePresence>` (khi element biến mất), `layout` prop (tự sắp xếp lại).
