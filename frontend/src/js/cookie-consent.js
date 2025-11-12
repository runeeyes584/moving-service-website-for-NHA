// Cookie Consent Banner Logic
window.addEventListener('DOMContentLoaded', function() {
  var banner = document.getElementById('cookieConsentBanner');
  var btn = document.getElementById('acceptCookiesBtn');
  if (!banner || !btn) return;
  if (!localStorage.getItem('cookieAccepted')) {
    banner.style.display = 'flex';
  }
  btn.onclick = function() {
    localStorage.setItem('cookieAccepted', 'yes');
    banner.style.display = 'none';
  };
});
