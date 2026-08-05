(function () {
  'use strict';

  const AGE_KEY = 'calicave_age_verified';

  function initAgeGate() {
    const gate = document.getElementById('age-gate');
    if (!gate) return;

    if (localStorage.getItem(AGE_KEY) === 'true') {
      gate.classList.add('hidden');
      return;
    }

    document.getElementById('age-yes')?.addEventListener('click', () => {
      localStorage.setItem(AGE_KEY, 'true');
      gate.classList.add('hidden');
    });

    document.getElementById('age-no')?.addEventListener('click', () => {
      window.location.href = 'https://www.google.com';
    });
  }

  function initMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const overlay = document.getElementById('nav-overlay');
    if (!toggle || !overlay) return;

    toggle.addEventListener('click', () => {
      const isOpen = overlay.classList.toggle('open');
      toggle.classList.toggle('active', isOpen);
      document.body.classList.toggle('menu-open', isOpen);
    });

    overlay.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        overlay.classList.remove('open');
        toggle.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });
  }

  function initModals() {
    document.querySelectorAll('[data-modal]').forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const id = trigger.getAttribute('data-modal');
        const modal = document.getElementById(id);
        if (modal) {
          modal.classList.add('open');
          document.body.classList.add('modal-open');
        }
      });
    });

    document.querySelectorAll('.modal__close, .modal').forEach((el) => {
      el.addEventListener('click', (e) => {
        if (el.classList.contains('modal') && e.target !== el) return;
        const modal = el.closest('.modal') || el;
        modal.classList.remove('open');
        document.body.classList.remove('modal-open');
      });
    });

    document.querySelectorAll('.modal__content').forEach((content) => {
      content.addEventListener('click', (e) => e.stopPropagation());
    });
  }

  function initForms() {
    document.querySelectorAll('form[data-form]').forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const success =
          form.querySelector('.form-success') ||
          form.parentElement?.querySelector('.modal__success') ||
          form.parentElement?.querySelector('.form-success');
        if (success) {
          success.style.display = 'block';
          form.reset();
          setTimeout(() => {
            success.style.display = 'none';
            const modal = form.closest('.modal');
            if (modal) {
              modal.classList.remove('open');
              document.body.classList.remove('modal-open');
            }
          }, 2800);
        }
      });
    });
  }

  function initFollow() {
    document.querySelectorAll('.header__follow').forEach((btn) => {
      btn.addEventListener('click', () => {
        window.open('https://www.instagram.com/calicave.thailand/', '_blank', 'noopener');
      });
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const id = anchor.getAttribute('href');
        if (!id || id === '#') return;
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initAgeGate();
    initMenu();
    initModals();
    initForms();
    initFollow();
    initSmoothScroll();
  });
})();
