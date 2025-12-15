// --- Dynamic Inventory List ---
function createInventoryRow(item = '', quantity = 1, note = '') {
    const row = document.createElement('div');
    row.className = 'flex gap-2 mb-2 items-center';
    row.innerHTML = `
        <input type="text" placeholder="Tên đồ" class="border rounded px-2 py-1 flex-1" value="${item}" required />
        <input type="number" min="1" placeholder="SL" class="border rounded px-2 py-1 w-16" value="${quantity}" required />
        <input type="text" placeholder="Ghi chú" class="border rounded px-2 py-1 flex-1" value="${note}" />
        <button type="button" class="removeInventoryBtn text-red-600 hover:text-red-800 text-lg"><i class="fas fa-trash"></i></button>
    `;
    row.querySelector('.removeInventoryBtn').onclick = () => row.remove();
    return row;
}
document.getElementById('addInventoryBtn').onclick = function() {
    document.getElementById('inventoryList').appendChild(createInventoryRow());
};
// --- Submit handler ---
document.getElementById('bookingForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const form = e.target;
    const data = {
        customerFullName: form.customerFullName.value,
        customerPhone: form.customerPhone.value,
        customerEmail: form.customerEmail.value,
        originAddress: {
            street: form.originStreet.value,
            district: form.originDistrict.value,
            city: form.originCity.value
        },
        destinationAddress: {
            street: form.destinationStreet.value,
            district: form.destinationDistrict.value,
            city: form.destinationCity.value
        },
        movingDate: form.movingDate.value,
        surveyDate: form.surveyDate.value,
        notes: form.notes.value,
        status: 'fail'
    };
    // Lấy inventory động
    const inventoryRows = document.querySelectorAll('#inventoryList > div');
    if (inventoryRows.length > 0) {
        data.inventory = Array.from(inventoryRows).map(row => {
            const inputs = row.querySelectorAll('input');
            return {
                item: inputs[0].value,
                quantity: parseInt(inputs[1].value) || 1,
                note: inputs[2].value
            };
        });
    }
    // Sinh bookingId tự động
    data.bookingId = await window.generateBookingId();
    // Gửi API
    const res = await fetch('http://localhost:3001/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    const msg = document.getElementById('formMsg');
    if (res.ok) {
        msg.textContent = 'Gửi đơn thành công!';
        msg.className = 'text-green-600 text-center mt-2';
        form.reset();
        document.getElementById('inventoryList').innerHTML = '';
    } else {
        const err = await res.json();
        msg.textContent = err.error || 'Có lỗi xảy ra.';
        msg.className = 'text-red-600 text-center mt-2';
    }
});
