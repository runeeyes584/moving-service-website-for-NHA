// --- SERVICES ---
async function fetchServices() {
  const token = localStorage.getItem('token');
  const res = await fetch('http://localhost:3001/api/services', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  if (!res.ok) return [];
  return await res.json();
}
function renderServices(services) {
  const tbody = document.getElementById('services-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  services.forEach(sv => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="py-2 px-3 font-semibold">${sv.name || ''}</td>
      <td class="py-2 px-3">${sv.description || ''}</td>
      <td class="py-2 px-3">${sv.basePrice?.toLocaleString('vi-VN')} đ</td>
      <td class="py-2 px-3">${(sv.features||[]).map(f=>`<span class='inline-block bg-gray-100 rounded px-2 py-1 mr-1 mb-1'>${f}</span>`).join('')}</td>
      <td class="py-2 px-3">${sv.imageUrl ? `<img src="${sv.imageUrl}" alt="${sv.name}" class="h-12 w-auto rounded shadow" />` : ''}</td>
      <td class="py-2 px-3 flex gap-2">
        <button class="text-blue-600 hover:underline btn-edit-service" data-id="${sv._id}"><i class="fas fa-edit"></i> Sửa</button>
        <button class="text-red-600 hover:underline btn-delete-service" data-id="${sv._id}"><i class="fas fa-trash"></i> Xóa</button>
        <button class="text-gray-600 hover:underline btn-detail-service" data-id="${sv._id}"><i class="fas fa-eye"></i> Xem</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
  // Gán sự kiện cho các nút
  tbody.querySelectorAll('.btn-edit-service').forEach(btn => {
    btn.addEventListener('click', () => openServiceModal('edit', btn.dataset.id));
  });
  tbody.querySelectorAll('.btn-delete-service').forEach(btn => {
    btn.addEventListener('click', () => deleteService(btn.dataset.id));
  });
  tbody.querySelectorAll('.btn-detail-service').forEach(btn => {
    btn.addEventListener('click', () => openServiceModal('detail', btn.dataset.id));
  });
}

// Modal logic
document.getElementById('btn-add-service')?.addEventListener('click', () => openServiceModal('add'));
document.getElementById('btn-cancel-service')?.addEventListener('click', () => {
  document.getElementById('modal-service').classList.add('hidden');
});

async function openServiceModal(mode, id) {
  const modal = document.getElementById('modal-service');
  const title = document.getElementById('modal-service-title');
  const form = document.getElementById('service-form');
  form.reset();
  form.querySelector('#service-id').value = '';
  form.querySelector('#service-name').value = '';
  form.querySelector('#service-description').value = '';
  form.querySelector('#service-basePrice').value = '';
  form.querySelector('#service-features').value = '';
  form.querySelector('#service-imageUrl').value = '';
  form.querySelectorAll('input,textarea').forEach(i => i.disabled = false);
  form.querySelector('button[type="submit"]').style.display = (mode === 'detail') ? 'none' : '';
  if (mode === 'add') {
    title.textContent = 'Thêm gói dịch vụ';
    modal.classList.remove('hidden');
    return;
  }
  // Lấy dữ liệu service
  const token = localStorage.getItem('token');
  const res = await fetch(`http://localhost:3001/api/services/${id}`, {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  if (!res.ok) return alert('Không lấy được dữ liệu dịch vụ!');
  const sv = await res.json();
  form.querySelector('#service-id').value = sv._id;
  form.querySelector('#service-name').value = sv.name || '';
  form.querySelector('#service-description').value = sv.description || '';
  form.querySelector('#service-basePrice').value = sv.basePrice || '';
  form.querySelector('#service-features').value = (sv.features||[]).join(', ');
  form.querySelector('#service-imageUrl').value = sv.imageUrl || '';
  if (mode === 'edit') {
    title.textContent = 'Sửa gói dịch vụ';
    form.querySelectorAll('input,textarea').forEach(i => i.disabled = false);
    form.querySelector('button[type="submit"]').style.display = '';
  } else {
    title.textContent = 'Chi tiết gói dịch vụ';
    form.querySelectorAll('input,textarea').forEach(i => i.disabled = true);
    form.querySelector('button[type="submit"]').style.display = 'none';
  }
  modal.classList.remove('hidden');
}

// Submit form
document.getElementById('service-form')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  const id = this.querySelector('#service-id').value;
  const name = this.querySelector('#service-name').value.trim();
  const description = this.querySelector('#service-description').value.trim();
  const basePrice = Number(this.querySelector('#service-basePrice').value);
  const features = this.querySelector('#service-features').value.split(',').map(f=>f.trim()).filter(f=>f);
  const imageUrl = this.querySelector('#service-imageUrl').value.trim();
  const token = localStorage.getItem('token');
  const body = JSON.stringify({ name, description, basePrice, features, imageUrl });
  let method = id ? 'PUT' : 'POST';
  let url = 'http://localhost:3001/api/services' + (id ? `/${id}` : '');
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
    body
  });
  if (!res.ok) return alert('Lưu thất bại!');
  document.getElementById('modal-service').classList.add('hidden');
  fetchServices().then(renderServices);
});

// Xóa service
async function deleteService(id) {
  if (!confirm('Bạn có chắc muốn xóa gói dịch vụ này?')) return;
  const token = localStorage.getItem('token');
  const res = await fetch(`http://localhost:3001/api/services/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': 'Bearer ' + token }
  });
  if (!res.ok) return alert('Xóa thất bại!');
  fetchServices().then(renderServices);
}
window.addEventListener('DOMContentLoaded', function() {
  fetchServices().then(renderServices);
});
// --- EMPLOYEES ---
async function fetchEmployees() {
  const token = localStorage.getItem('token');
  const res = await fetch('http://localhost:3001/api/employees', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  if (!res.ok) return [];
  return await res.json();
}
function renderEmployees(employees) {
  const tbody = document.querySelector('#employees table tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  employees.forEach(emp => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="py-2 px-3">${emp.employeeId || ''}</td>
      <td class="py-2 px-3">${emp.fullName || ''}</td>
      <td class="py-2 px-3">${emp.email || ''}</td>
      <td class="py-2 px-3">${emp.phoneNumber || ''}</td>
      <td class="py-2 px-3">${emp.address || ''}</td>
      <td class="py-2 px-3">${emp.role || ''}</td>
      <td class="py-2 px-3">${emp.status || ''}</td>
      <td class="py-2 px-3"><button class="text-blue-600 hover:underline btn-employee-detail" type="button">Xem</button></td>
    `;
    // Gán data-employee cho nút
    const btn = tr.querySelector('.btn-employee-detail');
    btn.dataset.employee = JSON.stringify(emp).replace(/'/g, "&#39;");
    btn.addEventListener('click', function() {
      showEmployeeDetail(btn);
    });
    tbody.appendChild(tr);
  });
}
window.showEmployeeDetail = function(btn) {
  const emp = JSON.parse(btn.getAttribute('data-employee').replace(/&#39;/g, "'"));
  let html = `<div style="max-width:400px;min-width:250px">
    <h3 class='font-bold text-lg mb-2'>Chi tiết nhân viên</h3>
    <div class='mb-2'><b>Mã NV:</b> ${emp.employeeId || ''}</div>
    <div class='mb-2'><b>Họ tên:</b> ${emp.fullName || ''}</div>
    <div class='mb-2'><b>Email:</b> ${emp.email || ''}</div>
    <div class='mb-2'><b>SĐT:</b> ${emp.phoneNumber || ''}</div>
    <div class='mb-2'><b>Địa chỉ:</b> ${emp.address || ''}</div>
    <div class='mb-2'><b>Vai trò:</b> ${emp.role || ''}</div>
    <div class='mb-2'><b>Trạng thái:</b> ${emp.status || ''}</div>
  </div>`;
  showModal(html);
}
// Render employees khi DOMContentLoaded
window.addEventListener('DOMContentLoaded', function() {
  fetchEmployees().then(renderEmployees);
});
// --- Định nghĩa formatDate toàn cục ---
function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleString('vi-VN', { hour12: false });
}

// --- KPI Chart ---
window.addEventListener('DOMContentLoaded', function() {
  const ctx = document.getElementById('kpiChart')?.getContext('2d');
  if (ctx) {
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
        datasets: [
          { label: 'Giao đúng hạn (%)', data: [97, 98, 99, 97, 98, 98], backgroundColor: '#3b82f6' },
          { label: 'Doanh thu (triệu)', data: [200, 210, 220, 190, 230, 250], backgroundColor: '#22c55e' },
          { label: 'Chi phí (triệu)', data: [120, 130, 110, 140, 135, 125], backgroundColor: '#facc15' }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'top' } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }

  // --- USERS ---
  const token = localStorage.getItem('token');


  // --- BOOKINGS ---
  async function fetchBookings() {
    const res = await fetch('http://localhost:3001/api/bookings', {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    if (!res.ok) return [];
    return await res.json();
  }
// Đưa formatDate ra ngoài để toàn cục
function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleString('vi-VN', { hour12: false });
}
  function renderBookings(bookings) {
    const tbody = document.getElementById('orders-tbody');
    const reviewTbody = document.getElementById('review-orders-tbody');
    if (tbody) tbody.innerHTML = '';
    if (reviewTbody) reviewTbody.innerHTML = '';
    bookings.forEach(booking => {
      const route = `${booking.originAddress?.city || ''} → ${booking.destinationAddress?.city || ''}`;
      let statusClass = 'bg-gray-100 text-gray-800';
      if (booking.status === 'pending') statusClass = 'bg-yellow-100 text-yellow-800';
      if (booking.status === 'confirmed') statusClass = 'bg-blue-100 text-blue-800';
      if (booking.status === 'in_progress') statusClass = 'bg-orange-100 text-orange-800';
      if (booking.status === 'completed') statusClass = 'bg-green-100 text-green-800';
      if (booking.status === 'cancelled') statusClass = 'bg-red-100 text-red-800';
      const tr = document.createElement('tr');
      let approveBtn = '';
      if (booking.status === 'fail') {
        approveBtn = `<button class="ml-2 px-2 py-1 rounded bg-green-500 text-white btn-approve-booking" type="button">Duyệt</button>`;
      }
      // Dropdown trạng thái
      const statusOptions = [
        { value: 'pending', label: 'Chờ xử lý' },
        { value: 'confirmed', label: 'Đã xác nhận' },
        { value: 'in_progress', label: 'Đang thực hiện' },
        { value: 'completed', label: 'Hoàn tất' },
        { value: 'cancelled', label: 'Đã hủy' },
        { value: 'fail', label: 'Chờ duyệt' }
      ];
      let statusDropdown = `<select class="status-dropdown border rounded px-2 py-1" data-id="${booking._id}">`;
      statusOptions.forEach(opt => {
        statusDropdown += `<option value="${opt.value}"${booking.status===opt.value?' selected':''}>${opt.label}</option>`;
      });
      statusDropdown += '</select>';
      // Không cần nút hoàn tất sale, chỉ dùng dropdown trạng thái
      let saleBtn = '';
      tr.innerHTML = `
        <td class="py-2 px-3">${booking.bookingId || (booking._id ? booking._id.slice(-6).toUpperCase() : '')}</td>
        <td class="py-2 px-3">${booking.customerFullName || ''}</td>
        <td class="py-2 px-3">${booking.customerPhone || ''}</td>
        <td class="py-2 px-3">${route}</td>
        <td class="py-2 px-3">${formatDate(booking.movingDate)}</td>
        <td class="py-2 px-3"><span class="inline-block px-2 py-1 rounded ${statusClass}">${booking.status}</span></td>
        <td class="py-2 px-3">
          <button class="text-blue-600 hover:underline btn-booking-detail" type="button">Xem</button>
          ${approveBtn}
        </td>
  <td class="py-2 px-3 flex gap-2 items-center">${statusDropdown}</td>
      `;
      // Gán data-booking cho nút
      const btn = tr.querySelector('.btn-booking-detail');
      btn.dataset.booking = JSON.stringify(booking).replace(/'/g, "&#39;");
      btn.addEventListener('click', function() {
        showBookingDetail(btn);
      });
      // Sự kiện dropdown trạng thái
      const dropdown = tr.querySelector('.status-dropdown');
      if (dropdown) {
        dropdown.addEventListener('change', async function() {
          const newStatus = this.value;
          const token = localStorage.getItem('token');
          // Gửi toàn bộ dữ liệu booking, chỉ thay đổi status
          const updateData = { ...booking, status: newStatus };
          // Xóa các trường không cần thiết nếu có
          delete updateData._id;
          delete updateData.__v;
          const res = await fetch(`http://localhost:3001/api/bookings/${booking._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(updateData)
          });
          if (!res.ok) return alert('Cập nhật trạng thái thất bại!');
          fetchBookings().then(renderBookings);
        });
      }
      // Không cần sự kiện nút hoàn tất sale nữa
      // Nút duyệt booking
      if (booking.status === 'fail') {
        const approveBtnEl = tr.querySelector('.btn-approve-booking');
        if (approveBtnEl) {
          approveBtnEl.addEventListener('click', async function() {
            if (!confirm('Bạn có chắc muốn duyệt đơn này sang trạng thái "pending"?')) return;
            try {
              const token = localStorage.getItem('token');
              const res = await fetch(`http://localhost:3001/api/bookings/${booking._id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({ status: 'pending' })
              });
              if (!res.ok) throw new Error('Duyệt đơn thất bại');
              alert('Đã duyệt đơn thành công!');
              // Reload lại danh sách
              fetchBookings().then(renderBookings);
            } catch (err) {
              alert('Có lỗi xảy ra khi duyệt đơn!');
            }
          });
        }
        if (reviewTbody) reviewTbody.appendChild(tr);
      } else {
        if (tbody) tbody.appendChild(tr);
      }
    });
  }

  fetchBookings().then(renderBookings);
});

// --- Booking Detail Modal ---
window.showBookingDetail = function(btn) {
  const booking = JSON.parse(btn.getAttribute('data-booking').replace(/&#39;/g, "'"));
  // Ưu tiên lấy customerFullName, customerPhone nếu có, nếu không lấy từ customerId (trường hợp cũ)
  // Lấy đúng trường theo mẫu data mới, không ưu tiên customerId nữa
  const customerName = booking.customerFullName || '';
  const customerPhone = booking.customerPhone || '';
  const customerEmail = booking.customerEmail || '';
  let html = `<div style="max-width:500px;min-width:300px">
    <h3 class='font-bold text-lg mb-2'>Chi tiết đơn hàng</h3>
    <div class='mb-2'><b>Mã ĐH:</b> ${booking.bookingId || (booking._id ? booking._id.slice(-6).toUpperCase() : '')}</div>
    <div class='mb-2'><b>Khách:</b> ${customerName} </div>
    <div class='mb-2'><b>Điện thoại:</b> ${customerPhone} </div>
    <div class='mb-2'><b>Email:</b> ${customerEmail} </div>
    <div class='mb-2'><b>Địa chỉ đi:</b> ${booking.originAddress?.street}, ${booking.originAddress?.district}, ${booking.originAddress?.city}</div>
    <div class='mb-2'><b>Địa chỉ đến:</b> ${booking.destinationAddress?.street}, ${booking.destinationAddress?.district}, ${booking.destinationAddress?.city}</div>
    <div class='mb-2'><b>Ngày chuyển:</b> ${formatDate(booking.movingDate)}</div>
    <div class='mb-2'><b>Trạng thái:</b> ${booking.status}</div>
    <div class='mb-2'><b>Ghi chú:</b> ${booking.notes || ''}</div>
    <div class='mb-2'><b>Danh sách đồ đạc:</b>
      <table class='min-w-full text-sm border mt-1'>
        <thead><tr><th class='border px-2'>Tên đồ</th><th class='border px-2'>SL</th><th class='border px-2'>Ghi chú</th></tr></thead>
        <tbody>
          ${(booking.inventory||[]).map(item => `<tr><td class='border px-2'>${item.item}</td><td class='border px-2'>${item.quantity}</td><td class='border px-2'>${item.note||''}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`;
  showModal(html);
}
function showModal(html) {
  let modal = document.getElementById('modal-booking-detail');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'modal-booking-detail';
    modal.innerHTML = `<div class='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50'>
      <div class='bg-white rounded shadow-lg p-6 relative'>
        <button onclick="document.getElementById('modal-booking-detail').remove()" class='absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl'>&times;</button>
        <div id='modal-booking-content'></div>
      </div>
    </div>`;
    document.body.appendChild(modal);
  }
  modal.querySelector('#modal-booking-content').innerHTML = html;
  modal.style.display = 'block';
}

// --- Booking Detail Modal ---
window.showBookingDetail = function(btn) {
  const booking = JSON.parse(btn.getAttribute('data-booking').replace(/&#39;/g, "'"));
  let html = `<div style="max-width:500px;min-width:300px">
    <h3 class='font-bold text-lg mb-2'>Chi tiết đơn hàng</h3>
    <div class='mb-2'><b>Mã ĐH:</b> ${booking._id}</div>
    <div class='mb-2'><b>Khách:</b> ${booking.customerId?.fullName || booking.customerId || ''}</div>
    <div class='mb-2'><b>Điện thoại:</b> ${booking.customerId?.phoneNumber || ''}</div>
    <div class='mb-2'><b>Địa chỉ đi:</b> ${booking.originAddress?.street}, ${booking.originAddress?.district}, ${booking.originAddress?.city}</div>
    <div class='mb-2'><b>Địa chỉ đến:</b> ${booking.destinationAddress?.street}, ${booking.destinationAddress?.district}, ${booking.destinationAddress?.city}</div>
    <div class='mb-2'><b>Ngày chuyển:</b> ${formatDate(booking.movingDate)}</div>
    <div class='mb-2'><b>Trạng thái:</b> ${booking.status}</div>
    <div class='mb-2'><b>Ghi chú:</b> ${booking.notes || ''}</div>
    <div class='mb-2'><b>Danh sách đồ đạc:</b>
      <table class='min-w-full text-sm border mt-1'>
        <thead><tr><th class='border px-2'>Tên đồ</th><th class='border px-2'>SL</th><th class='border px-2'>Ghi chú</th></tr></thead>
        <tbody>
          ${(booking.inventory||[]).map(item => `<tr><td class='border px-2'>${item.item}</td><td class='border px-2'>${item.quantity}</td><td class='border px-2'>${item.note||''}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`;
  showModal(html);
}
function showModal(html) {
  let modal = document.getElementById('modal-booking-detail');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'modal-booking-detail';
    modal.innerHTML = `<div class='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50'>
      <div class='bg-white rounded shadow-lg p-6 relative'>
        <button onclick="document.getElementById('modal-booking-detail').remove()" class='absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl'>&times;</button>
        <div id='modal-booking-content'></div>
      </div>
    </div>`;
    document.body.appendChild(modal);
  }
  modal.querySelector('#modal-booking-content').innerHTML = html;
  modal.style.display = 'block';
}
