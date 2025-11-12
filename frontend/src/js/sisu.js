// Dev login popup logic + phân quyền thực tế
document.addEventListener('DOMContentLoaded', function() {
    var fab = document.getElementById('dev-login-fab');
    var popup = document.getElementById('dev-login-popup');
    var btnUser = document.querySelector('.dev-login-user');
    var btnAdmin = document.querySelector('.dev-login-admin');
    if (fab && popup) {
        fab.addEventListener('click', function(e) {
            popup.classList.toggle('active');
        });
        document.addEventListener('mousedown', function(e) {
            if (popup.classList.contains('active') && !popup.contains(e.target) && e.target !== fab) {
                popup.classList.remove('active');
            }
        });
    }
    function devLogin(role) {
        // Dùng đúng email demo backend
        var email = role === 'admin' ? 'admin@nha.vn' : 'driver@nha.vn';
        var pass = '123456';
        var form = document.querySelector('.sign-in-container form');
        if (form) {
            var inputs = form.querySelectorAll('input[type="email"],input[type="password"]');
            if (inputs[0] && inputs[1]) {
                inputs[0].value = email;
                inputs[1].value = pass;
            }
        }
        if (popup) popup.classList.remove('active');
    }
    if (btnUser) btnUser.addEventListener('click', function() { devLogin('driver'); });
    if (btnAdmin) btnAdmin.addEventListener('click', function() {
        // FE demo: chỉ lưu role/token giả lập và chuyển hướng
        localStorage.setItem('token', 'demo-admin-token');
        localStorage.setItem('role', 'admin');
        localStorage.setItem('fullName', 'Admin Demo');
        window.location.href = '../admin/index.html';
        if (popup) popup.classList.remove('active');
    });

    // FE demo: xử lý form đăng nhập không cần backend
    var loginForm = document.querySelector('.sign-in-container form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var email = loginForm.querySelector('input[type="email"]').value.trim();
            var password = loginForm.querySelector('input[type="password"]').value;
            // Demo: nếu là admin@nha.vn thì role admin, còn lại là driver
            var role = (email === 'admin@nha.vn') ? 'admin' : 'driver';
            localStorage.setItem('token', 'demo-' + role + '-token');
            localStorage.setItem('role', role);
            localStorage.setItem('fullName', role === 'admin' ? 'Admin Demo' : 'Driver Demo');
            if (role === 'admin') {
                window.location.href = '../admin/index.html';
            } else {
                window.location.href = '../driver/submit.html';
            }
        });
    }
});
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});