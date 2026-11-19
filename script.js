// Minimal vanilla JS: mobile menu, theme toggle, copy email, active nav link.
(function () {
  const root = document.documentElement;

  // ---- Footer year ----
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // ---- Mobile menu ----
  const menuBtn = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  function closeMenu() {
    menu.classList.add('hidden');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open menu');
  }
  menuBtn.addEventListener('click', () => {
    const open = menu.classList.toggle('hidden') === false;
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth >= 768) closeMenu(); });

  // ---- Theme toggle ----
  document.getElementById('theme-toggle').addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // ---- Copy email ----
  const copyBtn = document.getElementById('copy-email');
  copyBtn.addEventListener('click', async () => {
    const email = copyBtn.dataset.email;
    let ok = false;
    try {
      await navigator.clipboard.writeText(email);
      ok = true;
    } catch (e) {
      // Fallback for older browsers / non-secure contexts (e.g. file://)
      const ta = document.createElement('textarea');
      ta.value = email;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
      document.body.removeChild(ta);
    }
    copyBtn.textContent = ok ? 'Copied!' : 'Copy failed';
    copyBtn.classList.toggle('copied', ok);
    setTimeout(() => {
      copyBtn.textContent = 'Copy Email';
      copyBtn.classList.remove('copied');
    }, 2000);
  });

  // ---- Highlight the nav link for the section in view ----
  const links = document.querySelectorAll('.nav-link');
  const sections = [...links].map((l) => document.querySelector(l.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => io.observe(s));
  }
})();
