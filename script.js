/* =============================================
   MODERN PORTFOLIO JAVASCRIPT
   ============================================= */

// ============= INITIALIZE AOS (Animate on Scroll) =============
AOS.init({
  duration: 800,
  easing: 'ease-out',
  once: true,
  offset: 100
});

// ============= TYPING EFFECT FOR HERO =============
const typingText = "Shourya Gupta";
let typingIndex = 0;
const typingElement = document.getElementById("typing");

function typeWriter() {
  if (typingIndex < typingText.length) {
    typingElement.textContent += typingText.charAt(typingIndex);
    typingIndex++;
    setTimeout(typeWriter, 100);
  } else {
    // Add cursor blink effect after typing is complete
    typingElement.style.borderRight = "3px solid";
    typingElement.style.animation = "blink 1s infinite";
  }
}

// Start typing effect after page load
window.addEventListener('load', () => {
  setTimeout(typeWriter, 500);
});

// Add blink animation for cursor
const style = document.createElement('style');
style.textContent = `
  @keyframes blink {
    0%, 50% { border-color: transparent; }
    51%, 100% { border-color: var(--primary-color); }
  }
`;
document.head.appendChild(style);

// ============= NAVBAR SCROLL EFFECT =============
const navbar = document.getElementById('navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Add scrolled class when scrolling down
  if (scrollTop > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScrollTop = scrollTop;
});

// ============= MOBILE MENU TOGGLE =============
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav-link');

// Toggle menu on button click
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  
  // Animate hamburger icon
  const spans = navToggle.querySelectorAll('span');
  if (navLinks.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

// Close menu when clicking on a link
navLinkItems.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
    navLinks.classList.remove('active');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

// ============= SMOOTH SCROLL FOR ANCHOR LINKS =============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ============= SCROLL TO TOP BUTTON =============
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ============= THEME TOGGLE (Dark/Light Mode) =============
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
  const theme = html.getAttribute('data-theme');
  const newTheme = theme === 'light' ? 'dark' : 'light';
  
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
  
  // Add rotation animation
  themeToggle.style.transform = 'rotate(360deg)';
  setTimeout(() => {
    themeToggle.style.transform = 'rotate(0deg)';
  }, 300);
});

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector('i');
  if (theme === 'dark') {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
}

// ============= ACTIVE NAVIGATION HIGHLIGHT =============
const sections = document.querySelectorAll('.section, .hero');
const navLinksArray = Array.from(navLinkItems);

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop - 150) {
      current = section.getAttribute('id');
    }
  });
  
  navLinksArray.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ============= PARALLAX EFFECT FOR GRADIENT ORBS =============
const orbs = document.querySelectorAll('.gradient-orb');

window.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;
  
  orbs.forEach((orb, index) => {
    const speed = (index + 1) * 20;
    const x = mouseX * speed;
    const y = mouseY * speed;
    
    orb.style.transform = `translate(${x}px, ${y}px)`;
  });
});

// ============= CURSOR TRAIL EFFECT (Optional) =============
let cursorTrail = [];
const trailLength = 10;

document.addEventListener('mousemove', (e) => {
  cursorTrail.push({ x: e.clientX, y: e.clientY });
  
  if (cursorTrail.length > trailLength) {
    cursorTrail.shift();
  }
});

// ============= SKILL CARDS TILT EFFECT =============
const skillItems = document.querySelectorAll('.skill-item');

skillItems.forEach(item => {
  item.addEventListener('mousemove', (e) => {
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });
  
  item.addEventListener('mouseleave', () => {
    item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  });
});

// ============= PROJECT CARDS HOVER EFFECT =============
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'all 0.3s ease';
  });
  
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// ============= ANIMATED COUNTER FOR STATS (if needed in future) =============
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    start += increment;
    element.textContent = Math.floor(start);
    
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    }
  }, 16);
}

// ============= INTERSECTION OBSERVER FOR LAZY ANIMATIONS =============
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.glass-card').forEach(card => {
  observer.observe(card);
});

// ============= CONSOLE EASTER EGG =============
console.log('%c👋 Hello, Developer!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cInterested in the code? Let\'s connect!', 'font-size: 14px; color: #8b5cf6;');
console.log('%c🔗 LinkedIn: https://www.linkedin.com/in/shourya-gupta-8a8876250/', 'font-size: 12px; color: #06b6d4;');
console.log('%c💻 GitHub: https://github.com/maximanoob01', 'font-size: 12px; color: #06b6d4;');

// ============= PERFORMANCE OPTIMIZATION =============
// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll-heavy operations
const debouncedScroll = debounce(() => {
  // Additional scroll operations can go here
}, 100);

window.addEventListener('scroll', debouncedScroll);

// ============= PAGE LOAD ANIMATION =============
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Animate elements in sequence
  setTimeout(() => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }
  }, 200);
});

// ============= PREVENT ANIMATIONS ON WINDOW RESIZE =============
let resizeTimer;
window.addEventListener('resize', () => {
  document.body.classList.add('resize-animation-stopper');
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove('resize-animation-stopper');
  }, 400);
});

// Add CSS for resize animation stopper
const resizeStyle = document.createElement('style');
resizeStyle.textContent = `
  .resize-animation-stopper * {
    transition: none !important;
    animation: none !important;
  }
`;
document.head.appendChild(resizeStyle);

// ============= FORM VALIDATION (if contact form is added later) =============
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// ============= SERVICE WORKER (for PWA - optional) =============
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Uncomment when you have a service worker file
    // navigator.serviceWorker.register('/sw.js')
    //   .then(registration => console.log('SW registered'))
    //   .catch(err => console.log('SW registration failed'));
  });
}

// ============= KEYBOARD NAVIGATION ACCESSIBILITY =============
document.addEventListener('keydown', (e) => {
  // ESC key closes mobile menu
  if (e.key === 'Escape' && navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
  }
  
  // Ctrl/Cmd + K for quick navigation (optional)
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    // Can implement a quick search/navigation feature here
  }
});

// ============= FOCUS VISIBLE FOR ACCESSIBILITY =============
document.body.addEventListener('mousedown', () => {
  document.body.classList.add('using-mouse');
});

document.body.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.remove('using-mouse');
  }
});

// Add CSS for focus visibility
const focusStyle = document.createElement('style');
focusStyle.textContent = `
  .using-mouse *:focus {
    outline: none;
  }
`;
document.head.appendChild(focusStyle);