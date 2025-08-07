// Advanced Animations for Portfolio

// Animation Controller Class
class AnimationController {
  constructor() {
    this.isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.animations = new Map();
    this.observers = new Map();
    
    this.init();
  }

  init() {
    this.setupIntersectionObservers();
    this.setupScrollAnimations();
    this.setupHoverAnimations();
    this.setupClickAnimations();
    this.setupParticleSystem();
  }

  // Intersection Observer for scroll-triggered animations
  setupIntersectionObservers() {
    const options = {
      threshold: [0.1, 0.3, 0.5, 0.7],
      rootMargin: '-10% 0px -10% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.triggerAnimation(entry.target, entry.intersectionRatio);
        }
      });
    }, options);

    // Observe elements for animations
    document.querySelectorAll([
      '.hero-container',
      '.music-card',
      '.project-card',
      '.skill-category',
      '.about-content',
      '.contact-content',
      '.framework-step'
    ].join(',')).forEach(el => {
      observer.observe(el);
    });

    this.observers.set('main', observer);
  }

  // Trigger animations based on element type
  triggerAnimation(element, ratio) {
    if (this.isReduced) return;

    const animationClass = this.getAnimationClass(element);
    
    if (!element.classList.contains('animated')) {
      element.classList.add('animated', animationClass);
      
      // Special handling for different elements
      if (element.classList.contains('skill-category')) {
        this.animateSkillBars(element);
      }
      
      if (element.classList.contains('music-card')) {
        this.setupMusicCardAnimation(element);
      }
    }
  }

  // Get appropriate animation class based on element
  getAnimationClass(element) {
    if (element.classList.contains('hero-container')) return 'fade-in-up-hero';
    if (element.classList.contains('music-card')) return 'fade-in-scale';
    if (element.classList.contains('project-card')) return 'fade-in-slide-left';
    if (element.classList.contains('skill-category')) return 'fade-in-slide-right';
    if (element.classList.contains('about-content')) return 'fade-in-up';
    if (element.classList.contains('framework-step')) return 'fade-in-bounce';
    
    return 'fade-in-up';
  }

  // Setup scroll-based animations
  setupScrollAnimations() {
    let ticking = false;

    const updateScrollAnimations = () => {
      const scrollY = window.pageYOffset;
      const windowHeight = window.innerHeight;

      // Parallax effect for hero
      const hero = document.querySelector('.hero-section');
      if (hero && scrollY < windowHeight) {
        const rate = scrollY * -0.3;
        hero.style.transform = `translate3d(0, ${rate}px, 0)`;
      }

      // Floating animation for music cards
      document.querySelectorAll('.music-card.animated').forEach((card, index) => {
        const offset = Math.sin((scrollY * 0.01) + (index * 0.5)) * 5;
        card.style.transform += ` translateY(${offset}px)`;
      });

      ticking = false;
    };

    const requestScrollUpdate = () => {
      if (!ticking && !this.isReduced) {
        requestAnimationFrame(updateScrollAnimations);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
  }

  // Setup hover animations
  setupHoverAnimations() {
    // Music cards hover effects
    document.querySelectorAll('.music-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        if (this.isReduced) return;
        
        card.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        card.style.transform = 'translateY(-15px) scale(1.05) rotateY(5deg)';
        
        // Add glow effect
        const genre = card.dataset.genre;
        this.addGlowEffect(card, genre);
      });

      card.addEventListener('mouseleave', () => {
        if (this.isReduced) return;
        
        card.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
        this.removeGlowEffect(card);
      });
    });

    // Project cards hover effects
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        if (this.isReduced) return;
        
        card.style.transform = 'translateY(-10px) rotateX(5deg)';
        card.style.boxShadow = '0 25px 50px rgba(0,0,0,0.2)';
      });

      card.addEventListener('mouseleave', () => {
        if (this.isReduced) return;
        
        card.style.transform = 'translateY(0) rotateX(0deg)';
        card.style.boxShadow = '';
      });
    });

    // Button hover effects
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        if (this.isReduced) return;
        
        btn.style.transform = 'translateY(-3px) scale(1.05)';
        this.addRippleEffect(btn);
      });

      btn.addEventListener('mouseleave', () => {
        if (this.isReduced) return;
        
        btn.style.transform = 'translateY(0) scale(1)';
      });
    });
  }

  // Setup click animations
  setupClickAnimations() {
    document.querySelectorAll('.music-card, .project-card, .btn').forEach(element => {
      element.addEventListener('click', (e) => {
        if (this.isReduced) return;
        
        this.createClickRipple(e);
        
        // Pulse animation
        element.style.animation = 'pulse 0.3s ease-in-out';
        setTimeout(() => {
          element.style.animation = '';
        }, 300);
      });
    });
  }

  // Add glow effect to music cards
  addGlowEffect(card, genre) {
    const colors = {
      'hip-hop': '#FFD700',
      'rnb': '#9D4EDD',
      'amapiano': '#06FFA5',
      'house': '#4CC9F0'
    };

    const color = colors[genre] || '#FFD700';
    card.style.boxShadow = `0 20px 40px ${color}40, 0 0 20px ${color}60`;
  }

  // Remove glow effect
  removeGlowEffect(card) {
    card.style.boxShadow = '';
  }

  // Create click ripple effect
  createClickRipple(e) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple-animation 0.6s linear;
      pointer-events: none;
    `;

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  // Add ripple effect to buttons
  addRippleEffect(button) {
    if (!button.querySelector('.ripple-bg')) {
      const rippleBg = document.createElement('div');
      rippleBg.className = 'ripple-bg';
      rippleBg.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
        transform: translateX(-100%);
        transition: transform 0.6s ease;
        pointer-events: none;
      `;
      
      button.style.position = 'relative';
      button.style.overflow = 'hidden';
      button.appendChild(rippleBg);
      
      setTimeout(() => {
        rippleBg.style.transform = 'translateX(100%)';
      }, 50);
    }
  }

  // Animate skill bars
  animateSkillBars(skillCategory) {
    const skillItems = skillCategory.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
      const progressBar = item.querySelector('.skill-progress');
      const level = item.getAttribute('data-level');
      
      if (progressBar) {
        setTimeout(() => {
          progressBar.style.width = `${level}%`;
          progressBar.style.animation = 'skill-fill 1.5s ease-out';
        }, index * 200);
      }
    });
  }

  // Setup music card special animation
  setupMusicCardAnimation(card) {
    const icon = card.querySelector('.card-icon');
    if (icon) {
      icon.style.animation = 'bounce-rotate 2s ease-in-out infinite';
    }
  }

  // Particle system for background
  setupParticleSystem() {
    if (this.isReduced) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
      opacity: 0.1;
    `;

    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 50;

    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1
      });
    }

    // Animate particles
    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 0, 0, ${particle.opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(animateParticles);
    };

    animateParticles();
  }

  // Cleanup method
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.animations.clear();
    
    const canvas = document.getElementById('particle-canvas');
    if (canvas) canvas.remove();
  }
}

// CSS Animations (injected into page)
const injectAnimationStyles = () => {
  const styles = `
    <style>
      @keyframes fade-in-up-hero {
        from {
          opacity: 0;
          transform: translateY(60px) scale(0.95);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @keyframes fade-in-scale {
        from {
          opacity: 0;
          transform: scale(0.8) rotateY(-10deg);
        }
        to {
          opacity: 1;
          transform: scale(1) rotateY(0deg);
        }
      }

      @keyframes fade-in-slide-left {
        from {
          opacity: 0;
          transform: translateX(-50px) rotateX(-10deg);
        }
        to {
          opacity: 1;
          transform: translateX(0) rotateX(0deg);
        }
      }

      @keyframes fade-in-slide-right {
        from {
          opacity: 0;
          transform: translateX(50px) rotateX(-10deg);
        }
        to {
          opacity: 1;
          transform: translateX(0) rotateX(0deg);
        }
      }

      @keyframes fade-in-bounce {
        from {
          opacity: 0;
          transform: translateY(30px) scale(0.9);
        }
        50% {
          opacity: 0.8;
          transform: translateY(-10px) scale(1.05);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }

      @keyframes ripple-animation {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }

      @keyframes skill-fill {
        from { width: 0%; }
      }

      @keyframes bounce-rotate {
        0%, 100% {
          transform: translateY(0) rotate(0deg);
        }
        25% {
          transform: translateY(-10px) rotate(5deg);
        }
        75% {
          transform: translateY(-5px) rotate(-5deg);
        }
      }

      .fade-in-up-hero {
        animation: fade-in-up-hero 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }

      .fade-in-scale {
        animation: fade-in-scale 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }

      .fade-in-slide-left {
        animation: fade-in-slide-left 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }

      .fade-in-slide-right {
        animation: fade-in-slide-right 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }

      .fade-in-bounce {
        animation: fade-in-bounce 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }

      /* Stagger animations */
      .music-card:nth-child(1) { animation-delay: 0.1s; }
      .music-card:nth-child(2) { animation-delay: 0.2s; }
      .music-card:nth-child(3) { animation-delay: 0.3s; }
      .music-card:nth-child(4) { animation-delay: 0.4s; }

      .project-card:nth-child(1) { animation-delay: 0.1s; }
      .project-card:nth-child(2) { animation-delay: 0.2s; }
      .project-card:nth-child(3) { animation-delay: 0.3s; }

      .skill-category:nth-child(1) { animation-delay: 0.1s; }
      .skill-category:nth-child(2) { animation-delay: 0.2s; }
      .skill-category:nth-child(3) { animation-delay: 0.3s; }
      .skill-category:nth-child(4) { animation-delay: 0.4s; }

      .framework-step:nth-child(1) { animation-delay: 0.1s; }
      .framework-step:nth-child(2) { animation-delay: 0.2s; }
      .framework-step:nth-child(3) { animation-delay: 0.3s; }

      /* Initial state for animated elements */
      .hero-container,
      .music-card,
      .project-card,
      .skill-category,
      .about-content,
      .contact-content,
      .framework-step {
        opacity: 0;
      }

      .animated {
        opacity: 1;
      }

      /* Hover transitions */
      .music-card,
      .project-card,
      .btn {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      /* Reduced motion support */
      @media (prefers-reduced-motion: reduce) {
        * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
        
        .hero-container,
        .music-card,
        .project-card,
        .skill-category,
        .about-content,
        .contact-content,
        .framework-step {
          opacity: 1;
        }
      }
    </style>
  `;

  document.head.insertAdjacentHTML('beforeend', styles);
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  injectAnimationStyles();
  
  // Wait a bit for styles to load
  setTimeout(() => {
    window.animationController = new AnimationController();
  }, 100);
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (window.animationController) {
    window.animationController.destroy();
  }
});