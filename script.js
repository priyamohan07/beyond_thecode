/**
 * ==========================================================================
 * BEYOND THE CODE - INTERACTIVE PORTFOLIO SCRIPT
 * Developer: Priya Darshini
 * Case Study Project - Frontend Design
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. INITIALIZE LUCIDE ICONS
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. DYNAMIC COPYRIGHT YEAR
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 3. RESPONSIVE MOBILE NAVIGATION MENU
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    // Toggle Menu Open / Close
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);

      // Prevent background scroll when mobile menu is active
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close Mobile Menu when any Navigation Link is Clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          navToggle.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    });

    // Close Mobile Menu when clicking outside the navbar
    document.addEventListener('click', (event) => {
      if (
        navMenu.classList.contains('open') &&
        !navMenu.contains(event.target) &&
        !navToggle.contains(event.target)
      ) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // 4. ACTIVE SECTION HIGHLIGHTING ON SCROLL
  const sections = document.querySelectorAll('section[id]');
  
  function highlightActiveNav() {
    const scrollY = window.pageYOffset;
    const isAtBottom = (window.innerHeight + window.pageYOffset) >= document.documentElement.scrollHeight - 40;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 140;
      const sectionId = section.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-list a[href*="#${sectionId}"]`);

      if (targetNavLink) {
        if (isAtBottom && sectionId === 'contact') {
          navLinks.forEach(link => link.classList.remove('active'));
          targetNavLink.classList.add('active');
        } else if (!isAtBottom && scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLinks.forEach(link => link.classList.remove('active'));
          targetNavLink.classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightActiveNav);

  // 5. INTERSECTION OBSERVER FOR SCROLL-REVEAL ANIMATIONS
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Once revealed, unobserve to optimize performance
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if reduced motion is enabled or observer unsupported
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
  }

  // 6. CONTACT FORM CLIENT-SIDE VALIDATION
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const formSuccessBanner = document.getElementById('form-success');

    // Validation rules regex & helpers
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validateField(input, isConditionValid, errorElementId) {
      const errorMsg = document.getElementById(errorElementId);
      if (!isConditionValid) {
        input.classList.add('is-invalid');
        if (errorMsg) errorMsg.classList.add('visible');
        return false;
      } else {
        input.classList.remove('is-invalid');
        if (errorMsg) errorMsg.classList.remove('visible');
        return true;
      }
    }

    // Real-time input listeners to clear errors on user typing
    nameInput?.addEventListener('input', () => {
      if (nameInput.value.trim().length >= 2) validateField(nameInput, true, 'name-error');
    });

    emailInput?.addEventListener('input', () => {
      if (emailRegex.test(emailInput.value.trim())) validateField(emailInput, true, 'email-error');
    });

    subjectInput?.addEventListener('input', () => {
      if (subjectInput.value.trim().length >= 3) validateField(subjectInput, true, 'subject-error');
    });

    messageInput?.addEventListener('input', () => {
      if (messageInput.value.trim().length >= 10) validateField(messageInput, true, 'message-error');
    });

    // Form Submit Event Handler
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Validate all fields
      const isNameValid = validateField(nameInput, nameInput.value.trim().length >= 2, 'name-error');
      const isEmailValid = validateField(emailInput, emailRegex.test(emailInput.value.trim()), 'email-error');
      const isSubjectValid = validateField(subjectInput, subjectInput.value.trim().length >= 3, 'subject-error');
      const isMessageValid = validateField(messageInput, messageInput.value.trim().length >= 10, 'message-error');

      const isFormValid = isNameValid && isEmailValid && isSubjectValid && isMessageValid;

      if (isFormValid) {
        /* 
         * INTEGRATION GUIDE FOR LIVE EMAIL DELIVERY:
         * To make this contact form deliver actual emails without a custom backend server:
         * 
         * Option A: Formspree (Recommended for static sites)
         * 1. Register free at https://formspree.io
         * 2. Create a new form endpoint.
         * 3. Change form tag in index.html to:
         *    <form action="https://formspree.io/f/YOUR_ENDPOINT_ID" method="POST">
         * 4. Remove e.preventDefault() or call form.submit().
         * 
         * Option B: EmailJS
         * 1. Add EmailJS SDK script tag to HTML head.
         * 2. Call emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', '#contact-form') here.
         */

        // Display Success State Alert Banner
        if (formSuccessBanner) {
          formSuccessBanner.style.display = 'flex';
          formSuccessBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // Reset form input values
        contactForm.reset();

        // Automatically hide success banner after 8 seconds
        setTimeout(() => {
          if (formSuccessBanner) formSuccessBanner.style.display = 'none';
        }, 8000);
      }
    });
  }

  // 7. EXPANDABLE PROJECT DETAILS ACCORDION
  const expandButtons = document.querySelectorAll('.btn-expand-details');
  expandButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.project-card');
      const detailsContainer = card ? card.querySelector('.project-expanded-details') : null;
      if (!detailsContainer) return;

      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const btnSpan = btn.querySelector('span');
      const btnIcon = btn.querySelector('i');

      if (isExpanded) {
        btn.setAttribute('aria-expanded', 'false');
        detailsContainer.classList.remove('active');
        if (btnSpan) btnSpan.textContent = 'View Details';
        if (btnIcon) btnIcon.style.transform = 'rotate(0deg)';
      } else {
        btn.setAttribute('aria-expanded', 'true');
        detailsContainer.classList.add('active');
        if (btnSpan) btnSpan.textContent = 'Hide Details';
        if (btnIcon) btnIcon.style.transform = 'rotate(180deg)';
      }
    });
  });

  // 8. SMOOTH SCROLL FOR IN-PAGE ANCHORS
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

});
