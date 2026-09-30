/**
 * NEXUS LANDING PAGE - JAVASCRIPT
 * Pure Vanilla JS | Mobile Navigation | Form Validation | Scroll Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* --------------------------------------------------------------------------
     1. SELECTORS & DOM ELEMENTS
     -------------------------------------------------------------------------- */
  const header = document.getElementById('header');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const scrollTopBtn = document.getElementById('scroll-top-btn');

  // Contact Form elements
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('user-name');
  const emailInput = document.getElementById('user-email');
  const messageInput = document.getElementById('user-message');
  const submitBtn = document.getElementById('form-submit-btn');
  const successAlert = document.getElementById('form-success-alert');
  const alertCloseBtn = document.getElementById('alert-close-btn');

  /* --------------------------------------------------------------------------
     2. MOBILE NAVIGATION HANDLER
     -------------------------------------------------------------------------- */
  function openMobileMenu() {
    navMenu.classList.add('open');
    hamburgerBtn.classList.add('active');
    mobileOverlay.classList.add('active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    navMenu.classList.remove('open');
    hamburgerBtn.classList.remove('active');
    mobileOverlay.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function toggleMobileMenu() {
    const isOpen = navMenu.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', toggleMobileMenu);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  // Close menu when any nav link or CTA is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  const mobileCtaLink = document.querySelector('.nav-cta-mobile a');
  if (mobileCtaLink) {
    mobileCtaLink.addEventListener('click', closeMobileMenu);
  }

  // Close menu on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  /* --------------------------------------------------------------------------
     3. HEADER SCROLL & BACK TO TOP BUTTON
     -------------------------------------------------------------------------- */
  function handleScroll() {
    const scrollPosition = window.scrollY;

    // Header background change
    if (scrollPosition > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll to Top visibility
    if (scrollTopBtn) {
      if (scrollPosition > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }

    // Highlight active navigation link
    updateActiveNav(scrollPosition);
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check on load

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* --------------------------------------------------------------------------
     4. ACTIVE NAVIGATION LINK ON SCROLL
     -------------------------------------------------------------------------- */
  function updateActiveNav(scrollPosition) {
    // If reached bottom of page, activate contact link
    if ((window.innerHeight + Math.round(scrollPosition)) >= document.documentElement.scrollHeight - 60) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#contact') {
          link.classList.add('active');
        }
      });
      return;
    }

    const headerHeight = header ? (header.offsetHeight || 76) : 76;
    const scrollOffset = scrollPosition + headerHeight + 60;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollOffset >= sectionTop && scrollOffset < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  /* --------------------------------------------------------------------------
     5. CONTACT FORM VALIDATION & INTERACTION
     -------------------------------------------------------------------------- */
  // Validation helpers
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setFieldError(inputElement, errorMessage) {
    const formGroup = inputElement.closest('.form-group');
    if (!formGroup) return;

    formGroup.classList.remove('has-success');
    formGroup.classList.add('has-error');

    const errorDisplay = formGroup.querySelector('.error-message');
    if (errorDisplay) {
      errorDisplay.textContent = errorMessage;
    }
  }

  function clearFieldError(inputElement) {
    const formGroup = inputElement.closest('.form-group');
    if (!formGroup) return;

    formGroup.classList.remove('has-error');
    const errorDisplay = formGroup.querySelector('.error-message');
    if (errorDisplay) {
      errorDisplay.textContent = '';
    }
  }

  function setFieldSuccess(inputElement) {
    const formGroup = inputElement.closest('.form-group');
    if (!formGroup) return;

    formGroup.classList.remove('has-error');
    formGroup.classList.add('has-success');
    const errorDisplay = formGroup.querySelector('.error-message');
    if (errorDisplay) {
      errorDisplay.textContent = '';
    }
  }

  // Clear validation on typing
  if (nameInput) {
    nameInput.addEventListener('input', () => {
      if (nameInput.value.trim().length >= 2) {
        setFieldSuccess(nameInput);
      } else {
        clearFieldError(nameInput);
      }
    });
  }

  if (emailInput) {
    emailInput.addEventListener('input', () => {
      if (emailRegex.test(emailInput.value.trim())) {
        setFieldSuccess(emailInput);
      } else {
        clearFieldError(emailInput);
      }
    });
  }

  if (messageInput) {
    messageInput.addEventListener('input', () => {
      if (messageInput.value.trim().length >= 10) {
        setFieldSuccess(messageInput);
      } else {
        clearFieldError(messageInput);
      }
    });
  }

  // Form submission handler
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      let firstInvalidInput = null;

      // Validate Name
      const nameValue = nameInput.value.trim();
      if (!nameValue) {
        setFieldError(nameInput, 'გთხოვთ, მიუთითოთ თქვენი სახელი');
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = nameInput;
      } else if (nameValue.length < 2) {
        setFieldError(nameInput, 'სახელი უნდა შედგებოდეს მინიმუმ 2 სიმბოლოსგან');
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = nameInput;
      } else {
        setFieldSuccess(nameInput);
      }

      // Validate Email
      const emailValue = emailInput.value.trim();
      if (!emailValue) {
        setFieldError(emailInput, 'გთხოვთ, მიუთითოთ ელექტრონული ფოსტა');
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = emailInput;
      } else if (!emailRegex.test(emailValue)) {
        setFieldError(emailInput, 'გთხოვთ, მიუთითოთ ვალიდური ელ-ფოსტის მისამართი');
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = emailInput;
      } else {
        setFieldSuccess(emailInput);
      }

      // Validate Message
      const messageValue = messageInput.value.trim();
      if (!messageValue) {
        setFieldError(messageInput, 'გთხოვთ, დაწეროთ შეტყობინება');
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = messageInput;
      } else if (messageValue.length < 10) {
        setFieldError(messageInput, 'შეტყობინება უნდა შეიცავდეს მინიმუმ 10 სიმბოლოს');
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = messageInput;
      } else {
        setFieldSuccess(messageInput);
      }

      // Focus first error field if any
      if (!isValid) {
        if (firstInvalidInput) {
          firstInvalidInput.focus();
        }
        return;
      }

      // Submit State (Simulated)
      const btnText = submitBtn.querySelector('.btn-text');
      const btnSpinner = submitBtn.querySelector('.btn-spinner');
      const btnArrow = submitBtn.querySelector('.btn-arrow');

      submitBtn.disabled = true;
      if (btnSpinner) btnSpinner.style.display = 'inline-block';
      if (btnArrow) btnArrow.style.display = 'none';
      if (btnText) btnText.textContent = 'იგზავნება...';

      // Simulate network request
      setTimeout(() => {
        // Reset submit button
        submitBtn.disabled = false;
        if (btnSpinner) btnSpinner.style.display = 'none';
        if (btnArrow) btnArrow.style.display = 'inline-block';
        if (btnText) btnText.textContent = 'შეტყობინების გაგზავნა';

        // Clear form fields and success states
        contactForm.reset();
        [nameInput, emailInput, messageInput].forEach(input => {
          const group = input.closest('.form-group');
          if (group) group.classList.remove('has-success');
        });

        // Show Success Alert
        if (successAlert) {
          successAlert.style.display = 'flex';
          successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 750);
    });
  }

  // Close Alert Button
  if (alertCloseBtn && successAlert) {
    alertCloseBtn.addEventListener('click', () => {
      successAlert.style.display = 'none';
    });
  }
});
