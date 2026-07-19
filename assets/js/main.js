/* ===== Hoba Hair - Interactions & Animations ===== */

function initSiteInteractions() {
  const header = document.getElementById('siteHeader');
  const progress = document.querySelector('.scroll-progress');
  const backTop = document.getElementById('backTop');

  function onScroll() {
    const y = window.pageYOffset;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = (docH > 0 ? (y / docH) * 100 : 0) + '%';
    if (header) header.classList.toggle('scrolled', y > 40);
    if (backTop) backTop.classList.toggle('show', y > 500);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileMenu');
  const close = document.getElementById('menuClose');
  const openMenu = () => menu && menu.classList.add('open');
  const hideMenu = () => menu && menu.classList.remove('open');
  if (toggle) toggle.addEventListener('click', openMenu);
  if (close) close.addEventListener('click', hideMenu);
  if (menu) menu.querySelectorAll('a:not(.btn)').forEach(a => a.addEventListener('click', hideMenu));

  // Back to top
  if (backTop) backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

initSiteInteractions();

// ===== Scroll reveal =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      if (e.target.classList.contains('stat')) countUp(e.target);
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== Count up =====
function countUp(stat) {
  const el = stat.querySelector('.num');
  if (!el || el.dataset.done) return;
  const target = parseInt(el.dataset.target, 10) || 0;
  const suffix = el.dataset.suffix || '';
  let cur = 0; const steps = 60; const inc = target / steps;
  const t = setInterval(() => {
    cur += inc;
    if (cur >= target) { cur = target; clearInterval(t); }
    el.textContent = Math.floor(cur) + suffix;
  }, 26);
  el.dataset.done = 'true';
}

// ===== Smooth anchor scroll =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      const t = document.querySelector(id);
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    }
  });
});
