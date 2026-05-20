/* ============================================================
   NIYAM SHETH — PORTFOLIO JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── PRELOADER ──
  const preloader = document.getElementById('preloader');
  const preloaderFill = document.getElementById('preloaderFill');
  
  // Simulate loading
  let loadProgress = 0;
  const loadInterval = setInterval(() => {
    loadProgress += Math.random() * 15;
    if (loadProgress >= 100) {
      loadProgress = 100;
      clearInterval(loadInterval);
      setTimeout(() => {
        preloader.classList.add('loaded');
        // Trigger initial reveals after load
        triggerReveals();
      }, 500);
    }
    preloaderFill.style.width = `${loadProgress}%`;
  }, 100);

  // ── CUSTOM CURSOR ──
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function renderCursor() {
    // Fast follow for dot
    cursorX += (mouseX - cursorX) * 0.5;
    cursorY += (mouseY - cursorY) * 0.5;
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;

    // Smooth follow for ring
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;

    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Cursor hover states
  const hoverElements = document.querySelectorAll('a, button, .process-card, .project-image, .skill-item');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  // ── SCROLL PROGRESS ──
  const scrollProgress = document.getElementById('scrollProgress');
  
  window.addEventListener('scroll', () => {
    const totalScroll = document.documentElement.scrollTop;
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scroll = `${totalScroll / windowHeight * 100}%`;
    scrollProgress.style.width = scroll;
  });

  // ── NAVIGATION SCROLL STATE ──
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    // Nav background
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Active nav link based on scroll position
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // ── MOBILE MENU ──
  const navMenuBtn = document.getElementById('navMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu-links a');

  navMenuBtn.addEventListener('click', () => {
    navMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    if (mobileMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenuBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ── REVEAL ON SCROLL ──
  const revealElements = document.querySelectorAll('.reveal');

  const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      
      const el = entry.target;
      const delay = el.getAttribute('data-delay');
      
      if (delay) {
        setTimeout(() => {
          el.classList.add('active');
        }, parseInt(delay));
      } else {
        el.classList.add('active');
      }
      
      observer.unobserve(el);
    });
  }, revealOptions);

  function triggerReveals() {
    revealElements.forEach(el => {
      revealOnScroll.observe(el);
    });
  }

  // ── NUMBER COUNTER (ABOUT SECTION) ──
  const stats = document.querySelectorAll('.stat-num');
  
  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const count = parseInt(target.getAttribute('data-count'));
        let currentCount = 0;
        const duration = 2000; // 2 seconds
        const step = Math.ceil(count / (duration / 16)); // 60fps
        
        const counter = setInterval(() => {
          currentCount += step;
          if (currentCount >= count) {
            target.innerText = count;
            clearInterval(counter);
          } else {
            target.innerText = currentCount;
          }
        }, 16);
        
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => statsObserver.observe(stat));

  // ── SKILL BARS ──
  const skillFills = document.querySelectorAll('.skill-fill');
  
  const skillsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const width = el.getAttribute('data-w');
        setTimeout(() => {
          el.style.width = `${width}%`;
        }, 300); // Slight delay for effect
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  skillFills.forEach(fill => skillsObserver.observe(fill));

  // ── SKILL CIRCLES ──
  const skillCircles = document.querySelectorAll('.skill-circle-fill');
  
  const circleObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const pct = parseInt(el.getAttribute('data-pct'));
        // max dashoffset is 264 (0%), min is 0 (100%)
        const offset = 264 - (264 * (pct / 100));
        setTimeout(() => {
          el.style.strokeDashoffset = offset;
        }, 300);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  skillCircles.forEach(circle => circleObserver.observe(circle));

  // ── CREATIVE PROCESS TIMELINE ──
  const processSteps = document.querySelectorAll('.process-step');
  const processLineFill = document.getElementById('processLineFill');
  const processSection = document.getElementById('process');

  window.addEventListener('scroll', () => {
    if (!processSection) return;
    
    const rect = processSection.getBoundingClientRect();
    // If section is in view
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      // Calculate progress line
      const processTop = processSteps[0].getBoundingClientRect().top;
      const processBottom = processSteps[processSteps.length - 1].getBoundingClientRect().bottom;
      const totalHeight = processBottom - processTop;
      const currentScroll = window.innerHeight / 2 - processTop;
      
      let fillHeight = Math.max(0, Math.min(100, (currentScroll / totalHeight) * 100));
      if (processLineFill) {
        processLineFill.style.height = `${fillHeight}%`;
      }

      // Activate steps
      processSteps.forEach(step => {
        const stepRect = step.getBoundingClientRect();
        if (stepRect.top < window.innerHeight / 2) {
          step.classList.add('active');
        } else {
          step.classList.remove('active');
        }
      });
    }
  });

  // ── TESTIMONIAL SLIDER ──
  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('testimonialPrev');
  const nextBtn = document.getElementById('testimonialNext');
  const dots = document.querySelectorAll('#testimonialDots .dot');
  
  if (track && prevBtn && nextBtn && dots.length > 0) {
    let currentIndex = 0;
    const totalSlides = dots.length;

    function updateSlider() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalSlides - 1;
      updateSlider();
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex < totalSlides - 1) ? currentIndex + 1 : 0;
      updateSlider();
    });

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        currentIndex = idx;
        updateSlider();
      });
    });
  }

  // ── PARALLAX HERO ELEMENTS ──
  const heroGrid = document.querySelector('.hero-grid-overlay');
  
  document.addEventListener('mousemove', (e) => {
    if (window.scrollY > window.innerHeight) return; // Only process when hero is visible
    
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    
    if (heroGrid) {
      heroGrid.style.transform = `translate(${x}px, ${y}px)`;
    }
  });

});
