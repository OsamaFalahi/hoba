// ===== Include shared HTML components (header & footer) =====
(function () {
  const HEADER = `
<header class="site-header" id="siteHeader">
  <div class="container header-inner">
    <a href="index.html" class="brand">
      <img alt="Hoba Hair Logo" src="assets/img/logo.png"/>
      <span class="brand-name">HOBA HAIR</span>
    </a>
    <nav class="nav">
      <a href="index.html">الرئيسية</a>
      <a href="about.html">من نحن</a>
      <a href="services.html">خدماتنا</a>
      <a href="gallery.html">معرض الأعمال</a>
      <a href="contact.html">تواصل معنا</a>
    </nav>
    <div class="header-actions">
      <a href="https://wa.me/966544277897" target="_blank" rel="noopener" class="icon-btn" aria-label="واتساب"><span class="material-symbols-outlined">chat</span></a>
      <a href="contact.html" class="btn btn-dark" style="padding:11px 22px;font-size:.85rem">احجزي الآن</a>
      <button class="icon-btn menu-toggle" id="menuToggle" aria-label="القائمة"><span class="material-symbols-outlined">menu</span></button>
    </div>
  </div>
</header>
<div class="mobile-menu" id="mobileMenu">
  <button class="mobile-close" id="menuClose" aria-label="إغلاق"><span class="material-symbols-outlined">close</span></button>
  <a href="index.html">الرئيسية</a>
  <a href="about.html">من نحن</a>
  <a href="services.html">خدماتنا</a>
  <a href="gallery.html">معرض الأعمال</a>
  <a href="contact.html">تواصل معنا</a>
  <a href="contact.html" class="btn btn-gold" style="margin-top:10px">احجزي الآن</a>
</div>`;

  const FOOTER = `
<footer class="site-footer">
  <div class="container footer-inner">
    <div class="notice reveal" style="margin-bottom:48px">
      <h4><span class="material-symbols-outlined" style="font-size:1.6rem">favorite</span> نشكركم لتواصلكم مع Hoba Salon 💕</h4>
      <p>لخدمات الصبغات وتسهيل التواصل 💞 يرجى ذكر الإجراءات التي قمتي بها بشعرك خلال سنتين وإذا فيه موانع للصبغه مثل حنه او صبغه غامقه سابقه او معالج حار بروتين وذكر إذا يوجد حساسيه وسيتم الرد عليكم بأقرب وقت 🌹</p>
    </div>
    <div class="footer-grid">
      <div>
        <img alt="Hoba Hair Logo" src="assets/img/logo.png" style="height:54px;width:auto;margin-bottom:14px"/>
        <p>صالونكِ الأول للجمال والرقي والعناية بالشعر في المملكة العربية السعودية.</p>
      </div>
      <div>
        <h4>روابط سريعة</h4>
        <a href="index.html">الرئيسية</a><br/>
        <a href="about.html">من نحن</a><br/>
        <a href="services.html">خدماتنا</a><br/>
        <a href="gallery.html">معرض الأعمال</a><br/>
        <a href="contact.html">تواصل معنا</a>
      </div>
      <div>
        <h4>تواصلي معنا</h4>
        <p>الرياض - حي الربيع</p>
        <p dir="ltr">+96​65​44​27​78​97</p>
        <p>info@hobahair.com</p>
      </div>
        <div>
          <h4>حساباتنا</h4>
          <div class="social">
            <a class="ig" href="https://www.instagram.com/reel/DVt06uGDNWn/?igsh=MXJoM3J6bzBuZTM4" target="_blank" rel="noopener" aria-label="إنستقرام"><i class="fa-brands fa-instagram"></i><span class="lbl">إنستقرام</span></a>
            <a class="tt" href="https://vt.tiktok.com/ZSuyUYRmM/" target="_blank" rel="noopener" aria-label="تيك توك"><i class="fa-brands fa-tiktok"></i><span class="lbl">تيك توك</span></a>
            <a class="sc" href="https://www.snapchat.com/add/hoba_salon?share_id=ucyETMV7TVCS_CaU716qTA&locale=ar_SA@calendar=gregorian" target="_blank" rel="noopener" aria-label="سناب شات"><i class="fa-brands fa-snapchat"></i><span class="lbl">سناب شات</span></a>
          </div>
        </div>
    </div>
    <div class="footer-bottom">
      <div><a href="#">سياسة الخصوصية</a><a href="#">الشروط والأحكام</a></div>
      <p>تم بواسطة  © 2026 <a href="https://rwabts.com/" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline">لمؤسسة روابط الرقمية لتقنية المعلومات</a></p>
    </div>
  </div>
</footer>`;

  function mount(id, html) {
    const el = document.getElementById(id);
    if (el) el.outerHTML = html;
  }

  async function load() {
    const mounts = [
      { id: 'header-mount', file: 'components/header.html', html: HEADER },
      { id: 'footer-mount', file: 'components/footer.html', html: FOOTER }
    ];
    for (const m of mounts) {
      let done = false;
      try {
        const res = await fetch(m.file);
        if (res.ok) {
          const text = await res.text();
          mount(m.id, text.replace(/<!--[\s\S]*?-->/, '').trim());
          done = true;
        }
      } catch (e) {}
      if (!done) mount(m.id, m.html);
    }
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.site-header .nav a').forEach(a => {
      if (a.getAttribute('href') === path) { a.classList.add('active'); }
    });
    document.querySelectorAll('.mobile-menu a[href]').forEach(a => {
      if (a.getAttribute('href') === path && !a.classList.contains('btn')) a.classList.add('active');
    });
    if (window.initSiteInteractions) window.initSiteInteractions();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', load);
  else load();
})();
