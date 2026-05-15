/* ==========================================================================
   Orlando Kids Party - Brazilian Buffet
   Interactivity
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- Site config injection ---------- */
  const CFG = window.SITE_CONFIG || {};

  function getOpeningLabel(lang) {
    const o = CFG.opening || {};
    const status = o.status || 'soon';
    const labels = o.labels || {};
    const date = (o.date && o.date[lang]) || '';

    if (status === 'custom') {
      return (o.customLabel && o.customLabel[lang]) || '';
    }
    let tpl = (labels[status] && labels[status][lang]) || '';
    return tpl.replace('{date}', date);
  }

  function getFaqAnswer(lang) {
    const o = CFG.opening || {};
    const tpl = (o.faqAnswer && o.faqAnswer[lang]) || '';
    const date = (o.date && o.date[lang]) || '';
    return tpl.replace('{date}', date);
  }

  function applyConfig(lang) {
    const c = CFG.contact || {};
    const s = CFG.social || {};

    document.querySelectorAll('[data-config]').forEach(el => {
      const key = el.getAttribute('data-config');

      switch (key) {
        case 'opening.label':
          el.textContent = getOpeningLabel(lang);
          break;

        case 'opening.heroNumber':
          el.textContent = (CFG.opening?.heroNumber?.[lang]) || (CFG.opening?.date?.[lang]) || '';
          break;

        case 'opening.faqAnswer':
          el.textContent = getFaqAnswer(lang);
          break;

        case 'contact.whatsappLink':
          if (c.whatsapp) {
            el.setAttribute('href', 'https://wa.me/' + c.whatsapp);
            // Keep visible text but update if it contains the phone display
            if (el.classList.contains('whatsapp-float')) {
              // floating button — text already SVG, just set href
            } else if (c.whatsappDisplay) {
              el.textContent = 'WhatsApp: ' + c.whatsappDisplay;
            }
          }
          break;

        case 'contact.emailLink':
          if (c.email) {
            el.setAttribute('href', 'mailto:' + c.email);
            el.textContent = c.email;
          }
          break;

        case 'contact.locationDisplay':
          if (c.location) {
            el.textContent = '📍 ' + c.location;
          }
          break;

        case 'social.instagram':
        case 'social.facebook':
        case 'social.tiktok': {
          const platform = key.split('.')[1];
          const url = s[platform];
          if (url) {
            el.setAttribute('href', url);
            el.setAttribute('target', '_blank');
            el.setAttribute('rel', 'noopener');
            el.style.display = '';
          } else {
            // Sem URL → esconde o link pra evitar dead links
            el.style.display = 'none';
          }
          break;
        }
      }
    });
  }

  /* ---------- Language toggle (PT / EN) ---------- */
  const STORAGE_KEY = 'okp_lang';
  const supportedLangs = ['pt', 'en'];

  function getInitialLang() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && supportedLangs.includes(stored)) return stored;
    const browser = (navigator.language || 'pt').slice(0, 2).toLowerCase();
    return supportedLangs.includes(browser) ? browser : 'pt';
  }

  function applyLang(lang) {
    document.documentElement.setAttribute('lang', lang === 'pt' ? 'pt-BR' : 'en-US');
    document.documentElement.setAttribute('data-lang', lang);

    // Swap text content
    document.querySelectorAll('[data-pt][data-en]').forEach(el => {
      const text = el.getAttribute('data-' + lang);
      if (text !== null) {
        // Preserve child elements; only swap text nodes when element has no children
        if (el.children.length === 0) {
          el.textContent = text;
        } else {
          // For mixed-content elements, replace only direct text nodes
          for (const node of el.childNodes) {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
              node.textContent = text;
              break;
            }
          }
        }
      }
    });

    // Swap placeholders
    document.querySelectorAll('[data-placeholder-pt][data-placeholder-en]').forEach(el => {
      const ph = el.getAttribute('data-placeholder-' + lang);
      if (ph !== null) el.setAttribute('placeholder', ph);
    });

    // Update toggle button display
    const toggle = document.getElementById('langToggle');
    if (toggle) {
      const current = toggle.querySelector('.lang-toggle__current');
      const other = toggle.querySelector('.lang-toggle__other');
      if (current && other) {
        current.textContent = lang.toUpperCase();
        other.textContent = (lang === 'pt' ? 'EN' : 'PT');
      }
    }

    // Update title and meta description
    if (lang === 'en') {
      document.title = "Orlando Kids Party - Brazilian Buffet | Children's Parties in Orlando";
    } else {
      document.title = 'Orlando Kids Party - Brazilian Buffet | Festas Infantis em Orlando';
    }

    // Apply config-driven values (opening date, contacts) for the active language
    applyConfig(lang);

    localStorage.setItem(STORAGE_KEY, lang);

    if (window.gtag) {
      gtag('event', 'language_change', { language: lang });
    }
  }

  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-lang') || 'pt';
      applyLang(current === 'pt' ? 'en' : 'pt');
    });
  }

  // Apply initial language
  applyLang(getInitialLang());

  /* ---------- Mobile menu ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.querySelector('.nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Smooth scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---------- Google Analytics event tracking ---------- */
  function trackEvent(name, params) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, params || {});
    }
    if (typeof window.clarity === 'function') {
      try { window.clarity('event', name); } catch (err) { /* noop */ }
    }
  }

  document.querySelectorAll('[data-ga-event]').forEach(el => {
    el.addEventListener('click', () => {
      const eventName = el.getAttribute('data-ga-event');
      trackEvent(eventName, {
        element_text: (el.textContent || '').trim().slice(0, 50),
        page_section: el.closest('section')?.id || 'unknown'
      });
    });
  });

  // Track FAQ openings
  document.querySelectorAll('.faq__item').forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        const question = item.querySelector('summary')?.textContent.trim() || '';
        trackEvent('faq_opened', { question: question.slice(0, 80) });
      }
    });
  });

  /* ---------- Form submission (interest form) ---------- */
  const interestForm = document.getElementById('interestForm');
  const formSuccess = document.getElementById('formSuccess');

  if (interestForm) {
    interestForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = interestForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Enviando...</span>';

      try {
        const formData = new FormData(interestForm);

        // Track GA event with rich data (without PII)
        trackEvent('lead_submit', {
          package: formData.get('pacote') || 'none',
          age_range: formData.get('idade_crianca') || 'none',
          timing: formData.get('mes_festa') || 'none',
          neighborhood: formData.get('bairro') || 'none'
        });

        // Submit to Netlify Forms (URL-encoded body)
        const body = new URLSearchParams(formData).toString();
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body
        });

        if (response.ok || response.status === 200) {
          interestForm.style.display = 'none';
          if (formSuccess) {
            formSuccess.hidden = false;
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        } else {
          throw new Error('Submission failed');
        }
      } catch (err) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        const lang = document.documentElement.getAttribute('data-lang') || 'pt';
        alert(lang === 'pt'
          ? 'Ops! Algo deu errado. Tenta de novo ou nos chama no WhatsApp.'
          : 'Oops! Something went wrong. Please try again or contact us on WhatsApp.');
        trackEvent('lead_submit_error', { error: String(err).slice(0, 100) });
      }
    });
  }

  /* ---------- Form submission (ask question form) ---------- */
  const askForm = document.getElementById('askForm');
  if (askForm) {
    askForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = askForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = '...';

      try {
        const formData = new FormData(askForm);
        trackEvent('question_submit', {
          has_name: !!formData.get('nome_pergunta'),
          question_length: (formData.get('pergunta_texto') || '').length
        });

        const body = new URLSearchParams(formData).toString();
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body
        });

        if (response.ok || response.status === 200) {
          const lang = document.documentElement.getAttribute('data-lang') || 'pt';
          askForm.innerHTML = '<p style="text-align:center;font-weight:600;color:var(--color-accent-dark);font-size:1.05rem;">' +
            (lang === 'pt' ? '✓ Pergunta enviada! A gente responde rapidinho.' : '✓ Question sent! We\'ll reply soon.') +
            '</p>';
        } else {
          throw new Error('Submission failed');
        }
      } catch (err) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        const lang = document.documentElement.getAttribute('data-lang') || 'pt';
        alert(lang === 'pt' ? 'Erro ao enviar. Tenta de novo.' : 'Submission error. Please try again.');
      }
    });
  }

  /* ---------- Animated count-up for social proof ---------- */
  const counterEl = document.getElementById('interestedCount');
  if (counterEl) {
    const target = (CFG.interestedCount != null) ? CFG.interestedCount : 127;
    const finalText = target + '+';
    let started = false;

    function animateCounter() {
      if (started) return;
      started = true;
      const duration = 1500;
      const start = performance.now();

      function step(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out
        const value = Math.floor(eased * target);
        counterEl.textContent = value + (progress === 1 ? '+' : '');
        if (progress < 1) requestAnimationFrame(step);
        else counterEl.textContent = finalText;
      }
      requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) animateCounter(); });
    }, { threshold: 0.4 });
    observer.observe(counterEl);
  }

  /* ---------- Scroll reveal animation ---------- */
  const revealTargets = document.querySelectorAll(
    '.section__header, .service-card, .theme-card, .menu-category, .package-card, .about-card, .form, .faq__item, .ask-question'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealTargets.forEach(el => revealObserver.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Scroll depth tracking for GA ---------- */
  const scrollMarks = [25, 50, 75, 90];
  const firedMarks = new Set();

  function onScroll() {
    const scrolled = window.scrollY + window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const percent = Math.round((scrolled / docHeight) * 100);

    scrollMarks.forEach(mark => {
      if (percent >= mark && !firedMarks.has(mark)) {
        firedMarks.add(mark);
        trackEvent('scroll_depth', { percent: mark });
      }
    });
  }

  let scrollTimer;
  window.addEventListener('scroll', () => {
    if (scrollTimer) return;
    scrollTimer = setTimeout(() => { onScroll(); scrollTimer = null; }, 250);
  }, { passive: true });

  /* ---------- Menu carousel ---------- */
  const carousel = document.getElementById('menuCarousel');
  if (carousel) {
    const slides = carousel.querySelectorAll('.menu-carousel__slide');
    const dots = carousel.querySelectorAll('.menu-carousel__dots button');
    const prevBtn = carousel.querySelector('.menu-carousel__nav--prev');
    const nextBtn = carousel.querySelector('.menu-carousel__nav--next');
    const totalSlides = slides.length;
    let currentIdx = 0;
    let autoplayTimer = null;
    const AUTOPLAY_DELAY = 5000;

    function goTo(idx) {
      currentIdx = ((idx % totalSlides) + totalSlides) % totalSlides;
      slides.forEach((s, i) => s.classList.toggle('is-active', i === currentIdx));
      dots.forEach((d, i) => d.classList.toggle('is-active', i === currentIdx));
      trackEvent('carousel_change', { slide_index: currentIdx });
    }

    function next() { goTo(currentIdx + 1); }
    function prev() { goTo(currentIdx - 1); }

    function startAutoplay() {
      stopAutoplay();
      autoplayTimer = setInterval(next, AUTOPLAY_DELAY);
    }
    function stopAutoplay() {
      if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; }
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAutoplay(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAutoplay(); });
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { goTo(i); startAutoplay(); });
    });

    // Pausa autoplay quando o usuário hover (UX comum)
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    // Suporte a swipe no mobile
    let touchStartX = 0;
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      stopAutoplay();
    }, { passive: true });
    carousel.addEventListener('touchend', (e) => {
      const diff = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(diff) > 50) { (diff < 0 ? next : prev)(); }
      startAutoplay();
    });

    // Pausa quando a página/tab não está visível pra economizar recursos
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopAutoplay();
      else startAutoplay();
    });

    startAutoplay();
  }

  /* ---------- Outbound link tracking ---------- */
  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', () => {
      const href = link.getAttribute('href') || '';
      if (href.includes('wa.me')) return; // handled separately via data-ga-event
      trackEvent('outbound_click', {
        destination: href.slice(0, 100)
      });
    });
  });

})();
