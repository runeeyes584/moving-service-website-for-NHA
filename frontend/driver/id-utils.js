// Sinh bookingId dạng DHyyyymmddNNN, NNN là số tăng dần trong ngày (client-side, kiểm tra trùng qua API)
async function generateBookingId() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const prefix = `DH${y}${m}${d}`;
    // Lấy số lượng booking đã có trong ngày này
    const res = await fetch(`http://localhost:3001/api/bookings?date=${y}-${m}-${d}`);
    let count = 0;
    if (res.ok) {
        const bookings = await res.json();
        count = Array.isArray(bookings) ? bookings.length : 0;
    }
    // Số thứ tự tăng dần, bắt đầu từ 1
    const nnn = String(count + 1).padStart(3, '0');
    return prefix + nnn;
}

// Export cho dùng ở submit.html
window.generateBookingId = generateBookingId;
