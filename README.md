# moving-service-website-for-NHA

Reliable and affordable moving services for homes and offices. We provide safe packing, fast transportation, and professional staff to help you relocate with ease. Contact us today for a free quote and stress-free moving experience.

## Mục tiêu
Tạo khung dự án website sử dụng thuần HTML, CSS và JavaScript, đồng thời sử dụng Tailwind CSS (hiện đang tích hợp qua CDN để khởi động nhanh). Tôi sẽ bổ sung nội dung sau — hiện tại đây là khuôn khung ban đầu.

## Cấu trúc dự án

- `index.html` — trang chính, đã tích hợp Tailwind (CDN) và liên kết tới CSS/JS cục bộ
- `src/css/styles.css` — file CSS tùy chỉnh (dùng kèm Tailwind)
- `src/js/main.js` — file JavaScript khởi tạo
- `.gitignore` — tập tin git ignore cơ bản

Sau khi tái cấu trúc, cấu trúc hiện tại:

- `frontend/` — chứa mã nguồn frontend (HTML/CSS/JS tĩnh). Mở `frontend/index.html` để chạy nhanh.
- `backend/` — Express server nhỏ cung cấp API và (tuỳ chọn) phục vụ frontend.

## Chạy dự án

- Chạy frontend nhanh: mở `frontend/index.html` trong trình duyệt.
- Chạy backend (phục vụ frontend và API):

	1. cd backend
	2. npm install
	3. npm start

API mẫu:
- GET /api/status
- GET /api/quote


## Cách chạy

1. Mở `index.html` trong trình duyệt (double-click hoặc `File -> Open`).
2. Hiện tại Tailwind được tích hợp bằng Play CDN (không cần bước build). Nếu muốn chuyển sang workflow build (Tailwind CLI / PostCSS), tôi có thể cấu hình tiếp.

## Ghi chú
- Đây là khung ban đầu. Nếu bạn muốn tôi thêm router tĩnh, trang dịch vụ, form liên hệ, hay tích hợp build step cho Tailwind, nói tiếp là tôi làm.

