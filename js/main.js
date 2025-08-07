// Main JavaScript functionality for Rodney Ngwenya Portfolio

// Gmail Integration Function
function openGmailCompose() {
  const email = 'rodney.nd335@gmail.com';
  const subject = 'Email Copy Inquiry';
  const body = 'Hi Rodney,\n\nI visited your portfolio and I\'m interested in discussing email copywriting services.\n\nBest regards,';
  const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(gmailUrl, '_blank');
}

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functionality
  initializeNavigation();
  initializeScrollEffects();
  initializeAnimations();
  initializeSkillBars();
  initializeContactForm();
  initializeMobileMenu();
  
  // Add smooth scroll behavior to all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 70;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

// Navigation functionality
function initializeNavigation() {
  const nav = document.getElementById('nav-header');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Add scroll effect to navigation
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', debounce(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add background blur on scroll
    if (scrollTop > 50) {
      nav.style.backgroundColor = 'rgba(250, 250, 250, 0.98)';
      nav.style.backdropFilter = 'blur(15px)';
    } else {
      nav.style.backgroundColor = 'rgba(250, 250, 250, 0.95)';
      nav.style.backdropFilter = 'blur(10px)';
    }
    
    // Update active navigation link
    updateActiveNavLink();
    
    lastScrollTop = scrollTop;
  }, 10));
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const sectionHeight = section.offsetHeight;
    
    if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

// Mobile menu functionality
function initializeMobileMenu() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }
}

// Scroll effects and animations
function initializeScrollEffects() {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        
        // Trigger skill bar animations
        if (entry.target.classList.contains('skills-section')) {
          animateSkillBars();
        }
      }
    });
  }, observerOptions);
  
  // Observe all sections
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
  
  // Observe individual cards and elements
  document.querySelectorAll('.music-card, .project-card, .skill-category').forEach(card => {
    observer.observe(card);
  });
}

// Initialize animations
function initializeAnimations() {
  // Add hover effects to music cards
  document.querySelectorAll('.music-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  // Add click effects to project cards
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      card.style.transform = 'scale(0.98)';
      setTimeout(() => {
        card.style.transform = 'scale(1)';
      }, 150);
    });
  });
  
  // Parallax effect for hero section
  window.addEventListener('scroll', debounce(() => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection && scrolled < window.innerHeight) {
      const rate = scrolled * -0.5;
      heroSection.style.transform = `translateY(${rate}px)`;
    }
  }, 10));
}

// Skill bars animation
function initializeSkillBars() {
  const skillItems = document.querySelectorAll('.skill-item');
  
  skillItems.forEach(item => {
    const progressBar = item.querySelector('.skill-progress');
    const level = item.getAttribute('data-level');
    
    if (progressBar) {
      progressBar.style.width = '0%';
    }
  });
}

function animateSkillBars() {
  const skillItems = document.querySelectorAll('.skill-item');
  
  skillItems.forEach((item, index) => {
    const progressBar = item.querySelector('.skill-progress');
    const level = item.getAttribute('data-level');
    
    if (progressBar) {
      setTimeout(() => {
        progressBar.style.width = `${level}%`;
      }, index * 100);
    }
  });
}

// Contact form functionality
function initializeContactForm() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const subject = formData.get('subject');
      const message = formData.get('message');
      
      // Validate form
      if (!validateForm(name, email, subject, message)) {
        return;
      }
      
      // Create mailto link as fallback
      const mailtoLink = `mailto:rodney.nd335@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
      
      // Show success message
      showFormMessage('Thank you for your message! Opening your email client...', 'success');
      
      // Open email client
      setTimeout(() => {
        window.location.href = mailtoLink;
      }, 1000);
      
      // Reset form
      contactForm.reset();
    });
  }
}

// Form validation
function validateForm(name, email, subject, message) {
  const errors = [];
  
  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }
  
  if (!email || !isValidEmail(email)) {
    errors.push('Please enter a valid email address');
  }
  
  if (!subject || subject.trim().length < 5) {
    errors.push('Subject must be at least 5 characters long');
  }
  
  if (!message || message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  }
  
  if (errors.length > 0) {
    showFormMessage(errors.join('<br>'), 'error');
    return false;
  }
  
  return true;
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Show form message
function showFormMessage(message, type) {
  // Remove existing message
  const existingMessage = document.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Create new message
  const messageDiv = document.createElement('div');
  messageDiv.className = `form-message ${type}`;
  messageDiv.innerHTML = message;
  
  // Style the message
  messageDiv.style.cssText = `
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 8px;
    font-weight: 500;
    ${type === 'success' 
      ? 'background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;' 
      : 'background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
    }
  `;
  
  // Insert message
  const contactForm = document.getElementById('contact-form');
  contactForm.insertBefore(messageDiv, contactForm.firstChild);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (messageDiv.parentNode) {
      messageDiv.remove();
    }
  }, 5000);
}

// Utility functions
function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Throttle function for performance
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Lazy loading for images (if any are added)
function initializeLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

// Performance monitoring
function initializePerformanceMonitoring() {
  // Monitor Core Web Vitals
  if ('web-vital' in window) {
    // This would require the web-vitals library
    // For now, we'll use basic performance monitoring
  }
  
  // Basic performance logging
  window.addEventListener('load', () => {
    const navigationTiming = performance.getEntriesByType('navigation')[0];
    console.log('Page load time:', navigationTiming.loadEventEnd - navigationTiming.loadEventStart, 'ms');
  });
}

// Error handling
window.addEventListener('error', (e) => {
  console.error('JavaScript error:', e.error);
  // In production, you might want to send this to an error tracking service
});

// Accessibility enhancements
function initializeAccessibility() {
  // Skip to main content link
  const skipLink = document.createElement('a');
  skipLink.href = '#hero';
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Skip to main content';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 6px;
    background: #000;
    color: #fff;
    padding: 8px;
    text-decoration: none;
    transition: top 0.3s;
    z-index: 10000;
  `;
  
  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '6px';
  });
  
  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
  });
  
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Keyboard navigation for custom elements
  document.querySelectorAll('.music-card, .project-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initializeAccessibility);

// Export functions for global access
window.portfolioFunctions = {
  openGmailCompose,
  updateActiveNavLink,
  animateSkillBars,
  showFormMessage
};