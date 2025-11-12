# Frontend

This folder contains the static frontend (plain HTML/CSS/JS using Tailwind CDN).

Pages included:
- `index.html` — Trang chủ
- `pages/services.html` — Danh sách dịch vụ
- `pages/about.html` — Giới thiệu
- `pages/contact.html` — Trang liên hệ (mẫu)

To run (preview):
- Open `frontend/index.html` in your browser (no build required).
- Or run the backend server to serve the frontend from `http://localhost:3000`.

Notes:
- Mobile menu toggle and active link highlighting are implemented in `src/js/main.js`.
- Tailwind is loaded from the Play CDN for quick development. If you plan to go to production, consider switching to a build process (Tailwind CLI / PostCSS) to purge unused CSS.
