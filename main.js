// ALIGNA — Shared JavaScript

// Mobile menu
const mobileBtn = document.querySelector('.nav-mobile-btn');
const mobileMenu = document.querySelector('.mobile-menu');
if (mobileBtn && mobileMenu) {
  mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  document.addEventListener('click', e => {
    if (!mobileBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('open');
    }
  });
}

// Active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
  if (link.getAttribute('href') === currentPage) link.classList.add('active');
});

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = (entry.target.dataset.delay || 0) + 'ms';
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Email form handler
document.querySelectorAll('.email-form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    const btn = form.querySelector('button');
    if (!input.value || !input.value.includes('@')) {
      input.style.borderColor = '#c94040';
      setTimeout(() => input.style.borderColor = '', 2000);
      return;
    }
    // Replace this with your actual email service (Mailchimp, ConvertKit, etc.)
    btn.textContent = 'Thank you!';
    btn.style.background = '#4a6741';
    input.value = '';
    setTimeout(() => {
      btn.textContent = 'Join Waitlist';
      btn.style.background = '';
    }, 4000);
  });
});

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  const icon = item.querySelector('.faq-icon');
  if (q && a) {
    q.addEventListener('click', () => {
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        const ia = i.querySelector('.faq-a');
        const ii = i.querySelector('.faq-icon');
        if (ia) ia.style.maxHeight = null;
        if (ii) ii.textContent = '+';
      });
      if (!open) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
        if (icon) icon.textContent = '−';
      }
    });
  }
});
