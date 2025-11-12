// main.js — file JS khởi tạo
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM ready — NHA Moving scaffold (frontend folder)');

  // Mobile menu toggle
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn && menuBtn.addEventListener('click', function () {
    if (!mobileNav) return;
    mobileNav.classList.toggle('hidden');
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', (!expanded).toString());
  });

  // Smooth scrolling for in-page anchors and close mobile nav on click
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(a => {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      // Close mobile nav if open
      if (mobileNav && !mobileNav.classList.contains('hidden')) {
        mobileNav.classList.add('hidden');
        menuBtn && menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Highlight active nav link based on scroll position using IntersectionObserver
  const sectionElems = document.querySelectorAll('section[id^="section-"]');
  const navLinks = document.querySelectorAll('#navMenu a');
  const mobileLinks = document.querySelectorAll('#mobileNav a');

  function setActive(id) {
    navLinks.forEach(a => {
      if (a.getAttribute('href') === '#' + id) {
        a.classList.add('text-blue-600', 'font-semibold');
      } else {
        a.classList.remove('text-blue-600', 'font-semibold');
      }
    });
    mobileLinks.forEach(a => {
      if (a.getAttribute('href') === '#' + id) {
        a.classList.add('text-blue-600', 'font-semibold');
      } else {
        a.classList.remove('text-blue-600', 'font-semibold');
      }
    });
  }

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    }, { root: null, rootMargin: '0px', threshold: 0.5 });

    sectionElems.forEach(s => obs.observe(s));
  } else {
    // Fallback: set first section as active
    if (sectionElems[0]) setActive(sectionElems[0].id);
  }
});
