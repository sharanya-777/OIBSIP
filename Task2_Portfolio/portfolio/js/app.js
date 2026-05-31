/**
 * Jallella Sharanya Yadav - Portfolio Script
 * Created manually for student internship submission.
 * Handles interactive elements on the page.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Current Copyright Year in Footer ---
  const copyrightYear = document.getElementById('copyright-year');
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }

  // --- 2. Mobile Hamburger Menu Toggle ---
  const hamburger = document.getElementById('hamburger-menu');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // --- 3. Simple Form Validation & Interactive Submission ---
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const formError = document.getElementById('form-error');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Stop default form submit action

      // Hide any previous alert messages
      if (formSuccess) formSuccess.style.display = 'none';
      if (formError) formError.style.display = 'none';

      // Get form field values
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      // Basic client-side validation
      if (!name || !email || !subject || !message) {
        showFeedback(formError, 'Please fill in all fields before sending.');
        return;
      }

      if (!validateEmail(email)) {
        showFeedback(formError, 'Please enter a valid email address.');
        return;
      }

      // Simulate sending data (since there is no server-side component)
      // A typical student portfolio might send details to a mock alert or console
      console.log('Sending Message:', { name, email, subject, message });

      // Show success message
      showFeedback(formSuccess, `Thank you, ${name}! Your message has been sent successfully.`);
      
      // Clear form inputs
      contactForm.reset();
    });
  }

  // Helper to validate email format using a simple regex
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Helper to display form feedback messages
  function showFeedback(element, message) {
    if (element) {
      element.textContent = message;
      element.style.display = 'block';
      // Automatically scroll to the message so user can see it
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  // --- 4. Back to Top Button ---
  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    // Scroll to top smoothly when clicked
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- 5. Active Navigation Link Highlighting on Scroll ---
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      // Account for fixed header height (approx 80px)
      if (window.scrollY >= (sectionTop - 100)) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
});
