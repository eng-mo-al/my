/**
 * Mohammed Al-Majidi Portfolio - Main JavaScript
 * Design Philosophy: Digital Luxury (Enhanced)
 * Features: Smooth scrolling, animations, form handling, mobile menu, active section indicator
 */

// ===== DOM Elements =====
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const contactForm = document.getElementById('contactForm');
const skillBars = document.querySelectorAll('.skill-progress');
const navbar = document.querySelector('nav');
const navItems = document.querySelectorAll('.nav-links a');

// ===== Mobile Menu Toggle =====
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    menuToggle.textContent = navLinks.style.display === 'flex' ? '✕' : '☰';
  });
}

// Close mobile menu when a link is clicked
if (navLinks) {
  const navItemsAll = navLinks.querySelectorAll('a');
  navItemsAll.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.style.display = 'none';
      if (menuToggle) menuToggle.textContent = '☰';
    });
  });
}

// ===== Active Section Indicator =====
function updateActiveSection() {
  const sections = document.querySelectorAll('section');
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop - 200) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href') === `#${currentSection}`) {
      item.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveSection);

// ===== Smooth Scroll for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href !== '#home') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// ===== Intersection Observer for Animations =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      
      // Animate skill bars
      if (entry.target.classList.contains('skill-progress')) {
        const width = entry.target.getAttribute('data-width');
        entry.target.style.width = width;
      }
      
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections and skill bars
document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

skillBars.forEach(bar => {
  observer.observe(bar);
});

// ===== Form Submission =====
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const countryCode = document.getElementById('country_code').value;
    const phone = document.getElementById('phone').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Validate form
    if (!name || !email || !countryCode || !phone || !subject || !message) {
      e.preventDefault();
      showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
      return;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      e.preventDefault();
      showNotification('يرجى إدخال بريد إلكتروني صحيح', 'error');
      return;
    }
    
    // Show loading message
    showNotification('جاري إرسال رسالتك...', 'info');
  });
}

// ===== Notification System =====
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    padding: 1rem 1.5rem;
    background-color: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
    color: white;
    border-radius: 0.75rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    z-index: 10000;
    animation: slideInRight 0.3s ease;
    font-family: 'Lato', sans-serif;
    font-weight: 600;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideInLeft 0.3s ease reverse';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ===== Navbar Background on Scroll =====
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== Settings Menu =====
const settingsBtn = document.querySelector('.settings-btn');
if (settingsBtn) {
  settingsBtn.addEventListener('click', () => {
    showSettingsMenu();
  });
}

function showSettingsMenu() {
  const menu = document.createElement('div');
  menu.className = 'settings-menu';
  menu.innerHTML = `
    <div style="
      position: fixed;
      top: 80px;
      right: 20px;
      background-color: white;
      border: 1px solid rgba(212, 175, 55, 0.2);
      border-radius: 0.75rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
      z-index: 2000;
      min-width: 220px;
      overflow: hidden;
      animation: slideInRight 0.3s ease;
    ">
      <button onclick="this.parentElement.parentElement.remove()" style="
        width: 100%;
        padding: 0.75rem 1rem;
        border: none;
        background-color: transparent;
        text-align: right;
        cursor: pointer;
        font-size: 1.25rem;
        transition: background-color 0.3s ease;
      " onmouseover="this.style.backgroundColor='#F5F5F0'" onmouseout="this.style.backgroundColor='transparent'">✕</button>
      <a href="#about" onclick="this.parentElement.parentElement.remove()" style="
        display: block;
        padding: 0.75rem 1rem;
        color: #1A1A1A;
        text-decoration: none;
        border-top: 1px solid rgba(212, 175, 55, 0.2);
        transition: all 0.3s ease;
      " onmouseover="this.style.backgroundColor='#F5F5F0'; this.style.color='#D4AF37'" onmouseout="this.style.backgroundColor='transparent'; this.style.color='#1A1A1A'">
        عني
      </a>
      <a href="#skills" onclick="this.parentElement.parentElement.remove()" style="
        display: block;
        padding: 0.75rem 1rem;
        color: #1A1A1A;
        text-decoration: none;
        border-top: 1px solid rgba(212, 175, 55, 0.2);
        transition: all 0.3s ease;
      " onmouseover="this.style.backgroundColor='#F5F5F0'; this.style.color='#D4AF37'" onmouseout="this.style.backgroundColor='transparent'; this.style.color='#1A1A1A'">
        مهاراتي
      </a>
      <a href="#projects" onclick="this.parentElement.parentElement.remove()" style="
        display: block;
        padding: 0.75rem 1rem;
        color: #1A1A1A;
        text-decoration: none;
        border-top: 1px solid rgba(212, 175, 55, 0.2);
        transition: all 0.3s ease;
      " onmouseover="this.style.backgroundColor='#F5F5F0'; this.style.color='#D4AF37'" onmouseout="this.style.backgroundColor='transparent'; this.style.color='#1A1A1A'">
        أعمالي
      </a>
      <a href="#contact" onclick="this.parentElement.parentElement.remove()" style="
        display: block;
        padding: 0.75rem 1rem;
        color: #1A1A1A;
        text-decoration: none;
        border-top: 1px solid rgba(212, 175, 55, 0.2);
        transition: all 0.3s ease;
      " onmouseover="this.style.backgroundColor='#F5F5F0'; this.style.color='#D4AF37'" onmouseout="this.style.backgroundColor='transparent'; this.style.color='#1A1A1A'">
        التواصل
      </a>
    </div>
  `;
  
  document.body.appendChild(menu);
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.settings-btn') && !e.target.closest('.settings-menu')) {
      menu.remove();
    }
  });
}

// ===== Page Load Animation =====
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

// ===== Initialize Page =====
document.addEventListener('DOMContentLoaded', () => {
  console.log('Mohammed Al-Majidi Portfolio loaded successfully!');
  
  // Initialize skill bars with 0 width
  skillBars.forEach(bar => {
    bar.style.width = '0%';
  });
  
  // Set initial active section
  updateActiveSection();
});
