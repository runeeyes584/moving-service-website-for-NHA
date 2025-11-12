// Dev login popup logic
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
        var email = role === 'admin' ? 'admin@example.com' : 'user@example.com';
        var pass = role === 'admin' ? 'admin123' : 'user123';
        var form = document.querySelector('.sign-in-container form');
        if (form) {
            var inputs = form.querySelectorAll('input');
            if (inputs[0] && inputs[1]) {
                inputs[0].value = email;
                inputs[1].value = pass;
            }
        }
        if (popup) popup.classList.remove('active');
    }
    if (btnUser) btnUser.addEventListener('click', function() { devLogin('user'); });
    if (btnAdmin) btnAdmin.addEventListener('click', function() { devLogin('admin'); });
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