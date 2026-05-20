/* ============================================================
   NIYAM SHETH — PORTFOLIO JS
   Handles: custom cursor, nav scroll, reveal animations,
            skill bar animation, smooth section transitions
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── CUSTOM CURSOR ──────────────────────────────────────────
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  // Smooth follower with RAF
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Cursor grow on hoverable elements
  const hoverTargets = document.querySelectorAll('a, button, .work-card, .service-pill, .btn-primary, .btn-ghost');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
      cursor.style.background = 'transparent';
      cursor.style.border = '1.5px solid var(--color-accent)';
      follower.style.width = '56px';
      follower.style.height = '56px';
      follower.style.borderColor = 'rgba(236,156,157,0.4)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.background = 'var(--color-accent)';
      cursor.style.border = 'none';
      follower.style.width = '36px';
      follower.style.height = '36px';
      follower.style.borderColor = 'var(--color-accent)';
    });
  });


  // ── NAV SCROLL STATE ───────────────────────────────────────
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });


  // ── REVEAL ON SCROLL ───────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay based on siblings
        const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
        const index = siblings.indexOf(entry.target);
        const delay = Math.min(index * 80, 400);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));


  // ── SKILL BAR ANIMATION ────────────────────────────────────
  const skillFills = document.querySelectorAll('.skill-fill');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const w = target.dataset.w || '0';
        // Small delay so it feels intentional
        setTimeout(() => {
          target.style.width = w + '%';
        }, 200);
        skillObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  skillFills.forEach(el => skillObserver.observe(el));


  // ── HERO PARALLAX (subtle) ─────────────────────────────────
  const heroBgText = document.querySelector('.hero-bg-text');
  if (heroBgText) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      heroBgText.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.18}px))`;
    }, { passive: true });
  }


  // ── ACTIVE NAV LINK ────────────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = 'var(--color-accent)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => activeObserver.observe(s));


  // ── SMOOTH ANCHOR SCROLL ───────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  // ── WORK CARD — ADD TO PORTFOLIO PLACEHOLDER ────────────────
  // When you add real project images, replace .card-placeholder divs
  // with <img src="your-image.jpg" alt="Project name" />
  // The .card-img height and overlay styles will still apply.

  console.log('%cNiyam Sheth Portfolio', 'color:#EC9C9D;font-family:Georgia,serif;font-size:20px;font-weight:bold;');
  console.log('%cDesigned & built by Niyam Sheth', 'color:#c4a98e;font-family:Georgia,serif;font-size:12px;');

});
