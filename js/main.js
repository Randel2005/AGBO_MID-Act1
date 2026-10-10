/* ============================================
   FLORISTA - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ---- STICKY HEADER ----
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // ---- HAMBURGER MENU ----
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('mainNav');

  if (hamburger && mainNav) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      mainNav.classList.toggle('open');
    });

    // Close nav when a link is clicked
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        mainNav.classList.remove('open');
      });
    });

    // Close nav on outside click
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !mainNav.contains(e.target)) {
        hamburger.classList.remove('active');
        mainNav.classList.remove('open');
      }
    });
  }

  // ---- COUNTDOWN TIMER ----
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const msEl = document.getElementById('milliseconds');

  if (hoursEl && minutesEl && secondsEl) {
    // Set a target time 7 hours from page load
    const target = new Date().getTime() + (7 * 60 * 60 * 1000) + (11 * 60 * 1000) + (1 * 1000);

    function updateCountdown() {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        if (msEl) msEl.textContent = '00';
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      const ms = Math.floor((diff % 1000) / 10);

      hoursEl.textContent = String(hours).padStart(2, '0');
      minutesEl.textContent = String(minutes).padStart(2, '0');
      secondsEl.textContent = String(seconds).padStart(2, '0');
      if (msEl) msEl.textContent = String(ms).padStart(2, '0');
    }

    setInterval(updateCountdown, 100);
    updateCountdown();
  }

  // ---- PRICE RANGE SLIDER ----
  const priceRange = document.getElementById('priceRange');
  const priceVal = document.getElementById('priceVal');

  if (priceRange && priceVal) {
    priceRange.addEventListener('input', function () {
      priceVal.textContent = '$' + priceRange.value;
    });
  }

  // ---- PRODUCT FILTER BUTTONS ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
    });
  });

  // ---- VIEW TOGGLE ----
  const viewBtns = document.querySelectorAll('.view-btn');
  viewBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      viewBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
    });
  });

  // ---- FAQ ACCORDION ----
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    const btn = item.querySelector('.faq-q');
    if (btn) {
      btn.addEventListener('click', function () {
        const isOpen = item.classList.contains('open');
        // Close all
        faqItems.forEach(function (f) {
          f.classList.remove('open');
          const q = f.querySelector('.faq-q');
          if (q) q.setAttribute('aria-expanded', 'false');
        });
        // Toggle clicked
        if (!isOpen) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // ---- ADD TO CART BUTTONS ----
  const cartCountEl = document.querySelector('.cart-count');
  let cartCount = 0;

  const addBtns = document.querySelectorAll('.btn-add, .overlay-btn[title="Add to Cart"]');
  addBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      cartCount++;
      if (cartCountEl) {
        cartCountEl.textContent = cartCount;
        cartCountEl.style.transform = 'scale(1.4)';
        setTimeout(function () {
          cartCountEl.style.transform = 'scale(1)';
        }, 200);
      }
    });
  });

  // ---- CONTACT FORM ----
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      btn.style.background = '#4caf50';
      btn.disabled = true;
      setTimeout(function () {
        btn.innerHTML = original;
        btn.style.background = '';
        btn.disabled = false;
        contactForm.reset();
      }, 3000);
    });
  }

  // ---- SMOOTH SCROLL ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- HERO SLIDE DOTS ----
  const dots = document.querySelectorAll('.dot');
  if (dots.length > 0) {
    let currentDot = 0;
    setInterval(function () {
      dots[currentDot].classList.remove('active');
      currentDot = (currentDot + 1) % dots.length;
      dots[currentDot].classList.add('active');
    }, 3000);
  }

  // ---- NEWSLETTER FORM ----
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = newsletterForm.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
      btn.style.background = '#4caf50';
      btn.disabled = true;
      setTimeout(function () {
        btn.innerHTML = original;
        btn.style.background = '';
        btn.disabled = false;
        newsletterForm.reset();
      }, 3000);
    });
  }

  // ---- SCROLL REVEAL ANIMATION ----
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll(
    '.product-card, .bouquet-card, .why-card, .feature-item, .review-card, .team-card, .value-card, .blog-card, .contact-card'
  );

  revealElements.forEach(function (el) {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

});
