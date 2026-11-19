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
    // toggle() returns true when 'hidden' was added, i.e. the menu just closed
    const open = !menu.classList.toggle('hidden');
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
  let copyResetTimer;
  copyBtn.addEventListener('click', async () => {
    const email = copyBtn.dataset.email;
    let copied = false;
    try {
      await navigator.clipboard.writeText(email);
      copied = true;
    } catch (e) {
      // Fallback when the Clipboard API is missing or blocked (old browsers, file://)
      const textarea = document.createElement('textarea');
      textarea.value = email;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try { copied = document.execCommand('copy'); } catch (err) { copied = false; }
      document.body.removeChild(textarea);
    }
    copyBtn.textContent = copied ? 'Copied!' : 'Copy failed';
    copyBtn.classList.toggle('copied', copied);
    // Restart the timer so a second click gets its own full 2 seconds of feedback
    clearTimeout(copyResetTimer);
    copyResetTimer = setTimeout(() => {
      copyBtn.textContent = 'Copy Email';
      copyBtn.classList.remove('copied');
    }, 2000);
  });

  // ---- Highlight the nav link for the section in view ----
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = [...navLinks]
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);
  if ('IntersectionObserver' in window) {
    // A section counts as "in view" when it crosses a thin band just above the viewport's middle
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((section) => observer.observe(section));
  }
})();
