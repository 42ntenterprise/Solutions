/* ============================================================
   DataBI Pro — Landing Page JavaScript
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── AOS Init ─────────────────────────────────────────── */
  AOS.init({
    once: true,
    offset: 60,
    duration: 700,
    easing: 'ease-out-cubic'
  });

  /* ── Navbar scroll effect ─────────────────────────────── */
  const nav = document.getElementById('mainNav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Active nav link on scroll ────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#navMenu .nav-link');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));

  /* ── Smooth scroll for anchor links ──────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = nav.offsetHeight + 8;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      // Close mobile menu
      const bsCollapse = bootstrap.Collapse.getInstance(document.getElementById('navMenu'));
      if (bsCollapse) bsCollapse.hide();
    });
  });

  /* ── Particles in hero ────────────────────────────────── */
  const container = document.getElementById('particles');
  if (container) {
    const count = window.innerWidth < 768 ? 12 : 24;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      const size = Math.random() * 6 + 3;
      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-duration: ${Math.random() * 18 + 10}s;
        animation-delay: ${Math.random() * 8}s;
        opacity: ${Math.random() * 0.4 + 0.1};
        background: rgba(${Math.random() > 0.5 ? '0,187,255' : '64,224,221'}, 0.2);
      `;
      container.appendChild(p);
    }
  }

  /* ── Urgency radio buttons ────────────────────────────── */
  document.querySelectorAll('.urgency-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.urgency-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
    });
  });

  /* ── EmailJS init (desde emailjs-config.js) ──────────── */
  if (typeof emailjs !== 'undefined' && typeof EMAILJS_CONFIG !== 'undefined') {
    emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
  }

  /* ── Form submission ──────────────────────────────────── */
  const form = document.getElementById('quoteForm');
  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }

      // Deshabilitar botón mientras envía
      const btn = form.querySelector('button[type="submit"]');
      const btnOriginal = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Enviando…';

      // Recopilar datos del formulario
      const urgencySelected = form.querySelector('.urgency-option.selected span');
      const selects = form.querySelectorAll('select');
      const templateParams = {
        to_email:       '42ntenterprise@gmail.com',
        nombre_cargo:   form.querySelector('input[placeholder*="Juan"]')?.value    || '',
        empresa:        form.querySelector('input[placeholder*="empresa"]')?.value  || '',
        industria:      selects[0]?.value || '',
        tamano_empresa: selects[1]?.value || '',
        necesidad:      selects[2]?.value || '',
        fuente_datos:   selects[3]?.value || '',
        urgencia:       urgencySelected ? urgencySelected.textContent : 'No especificada',
        email:          form.querySelector('input[type="email"]')?.value || '',
        whatsapp:       form.querySelector('input[type="tel"]')?.value   || '',
      };

      try {
        await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          templateParams
        );

        // Éxito
        const toastEl = document.getElementById('formToast');
        new bootstrap.Toast(toastEl, { delay: 5000 }).show();
        form.reset();
        form.classList.remove('was-validated');
        document.querySelectorAll('.urgency-option').forEach(o => o.classList.remove('selected'));

      } catch (err) {
        console.error('EmailJS error:', err);
        const toastErrorEl = document.getElementById('formToastError');
        if (toastErrorEl) new bootstrap.Toast(toastErrorEl, { delay: 6000 }).show();

      } finally {
        btn.disabled = false;
        btn.innerHTML = btnOriginal;
      }
    });
  }

  /* ── Pain card click → scroll to service ─────────────── */
  document.querySelectorAll('.pain-card').forEach(card => {
    card.addEventListener('click', e => {
      const href = card.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = nav.offsetHeight + 16;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── Counter animation for hero float cards ───────────── */
  const animateCounter = (el, target, suffix = '') => {
    let start = 0;
    const duration = 1800;
    const step = timestamp => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  // Observe hero section to trigger counters
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    const heroObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        heroObserver.disconnect();
      }
    }, { threshold: 0.3 });
    heroObserver.observe(heroSection);
  }

  /* ── Service image parallax (subtle) ─────────────────── */
  if (window.innerWidth > 992) {
    const serviceImgs = document.querySelectorAll('.service-img');
    window.addEventListener('scroll', () => {
      serviceImgs.forEach(img => {
        const rect = img.getBoundingClientRect();
        const center = window.innerHeight / 2;
        const offset = (rect.top + rect.height / 2 - center) * 0.04;
        img.style.transform = `translateY(${offset}px)`;
      });
    }, { passive: true });
  }

  /* ── Highlight active pricing card on hover ───────────── */
  document.querySelectorAll('.price-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      document.querySelectorAll('.price-card').forEach(c => {
        if (c !== card) c.style.opacity = '0.75';
      });
    });
    card.addEventListener('mouseleave', () => {
      document.querySelectorAll('.price-card').forEach(c => {
        c.style.opacity = '1';
      });
    });
  });

  /* ── Typed text effect in hero H1 ────────────────────── */
  // Subtle shimmer on the gradient text
  const gradientText = document.querySelector('.text-gradient');
  if (gradientText) {
    let angle = 135;
    setInterval(() => {
      angle = (angle + 0.5) % 360;
      gradientText.style.backgroundImage = `linear-gradient(${angle}deg, #00BBFF 0%, #40E0DD 50%, #7FFFD4 100%)`;
    }, 50);
  }

  /* ── Scroll progress bar ──────────────────────────────── */
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #007BA7, #00BBFF, #40E0DD);
    z-index: 9999;
    transition: width 0.1s linear;
    width: 0%;
  `;
  document.body.prepend(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  }, { passive: true });

  /* ── Back to top on logo click ────────────────────────── */
  document.querySelector('.navbar-brand')?.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});
