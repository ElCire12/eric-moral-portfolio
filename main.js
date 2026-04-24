/* =========================================================
   PORTFOLIO — ÈRIC MORAL PEREIRA
   main.js — Navbar · Mobile menu · Scroll reveal · Active links
   ========================================================= */

(function () {
  'use strict';

  /* ── DOM refs ─────────────────────────────────────────── */
  const header = document.querySelector('.header');
  const navLinks = document.querySelectorAll('.nav-menu a');
  const sections = document.querySelectorAll('section[id], footer[id]');
  const revealEls = document.querySelectorAll('.section, .education-card, .project-card, .event-item, .job-card');

  /* ── 1. Navbar — scrolled state ──────────────────────── */
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 20);
    updateActiveLink();
    revealOnScroll();
  }

  /* ── 2. Active nav link on scroll ────────────────────── */
  function updateActiveLink() {
    let currentId = '';
    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top;
      if (top <= 120) currentId = sec.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${currentId}`);
    });
  }

  /* ── 3. Smooth scroll to section ─────────────────────── */
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (!href.startsWith('#')) return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      closeMobileMenu();
    });
  });

  /* ── 4. Mobile hamburger menu ─────────────────────────── */
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      navMenu.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!header.contains(e.target)) closeMobileMenu();
    });
  }

  function closeMobileMenu() {
    hamburger?.classList.remove('open');
    navMenu?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
  }

  /* ── 5. Scroll-reveal ─────────────────────────────────── */
  // Add reveal class to elements
  revealEls.forEach((el, i) => {
    el.classList.add('reveal');
    // Stagger children within grids
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  });

  function revealOnScroll() {
    revealEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.88) {
        el.classList.add('visible');
      }
    });
  }

  /* ── 6. Hero typing effect on tagline ────────────────── */
  function typeWriter(el, text, speed = 32) {
    el.textContent = '';
    el.style.opacity = '1';
    let i = 0;
    const cursor = document.createElement('span');
    cursor.textContent = '|';
    cursor.style.cssText = 'animation: blink 0.8s step-end infinite; color: var(--lime);';
    el.after(cursor);

    const style = document.createElement('style');
    style.textContent = '@keyframes blink { 50% { opacity: 0; } }';
    document.head.appendChild(style);

    const tick = () => {
      if (i < text.length) {
        el.textContent += text[i++];
        setTimeout(tick, speed + Math.random() * 20);
      } else {
        setTimeout(() => cursor.remove(), 1200);
      }
    };
    setTimeout(tick, 800);
  }

  const tagline = document.querySelector('.tagline');
  if (tagline) {
    const originalText = tagline.textContent;
    tagline.style.opacity = '0';
    // Start typing after a short delay so it feels intentional
    setTimeout(() => typeWriter(tagline, originalText), 400);
  }

  /* ── 7. Project image fallback ───────────────────────── */
  document.querySelectorAll('.project-img img').forEach(img => {
    img.addEventListener('error', function () {
      const container = this.closest('.project-img');
      const name = this.closest('.project-card').querySelector('h3')?.textContent || '?';
      container.innerHTML = '';
      container.style.cssText = `
        display: flex; align-items: center; justify-content: center;
        background: var(--bg-3); min-height: 180px;
      `;
      const placeholder = document.createElement('span');
      placeholder.textContent = name.charAt(0);
      placeholder.style.cssText = `
        font-family: var(--font-display); font-size: 5rem;
        color: var(--border); letter-spacing: 0.1em;
      `;
      container.appendChild(placeholder);
    });
  });

  /* ── 8. Init ─────────────────────────────────────────── */
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

})();