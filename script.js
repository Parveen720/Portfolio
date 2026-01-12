// ============= Navbar Scroll Effect =============
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ============= Mobile Menu Toggle =============
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenuBtn.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenuBtn.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// ============= Typing Animation =============
const roles = ['Software Developer', 'Data Analyst', 'Problem Solver', 'Machine Learning Enthusiast'];
const typingText = document.getElementById('typing-text');
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
  const currentRole = roles[roleIndex];
  
  if (!isDeleting) {
    typingText.textContent = currentRole.slice(0, charIndex + 1);
    charIndex++;
    
    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeRole, 2000); // Pause before deleting
      return;
    }
  } else {
    typingText.textContent = currentRole.slice(0, charIndex - 1);
    charIndex--;
    
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  
  setTimeout(typeRole, isDeleting ? 50 : 100);
}

typeRole();

// ============= Project Card Tilt Effect =============
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  const glow = card.querySelector('.project-glow');
  
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    
    // Update glow position
    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;
    glow.style.background = `radial-gradient(600px circle at ${glowX}% ${glowY}%, hsla(25, 95%, 53%, 0.15), transparent 40%)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });
});

// ============= Contact Form =============
const contactForm = document.getElementById('contact-form');

// Remove or comment out this entire block:
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const submitBtn = contactForm.querySelector('.btn-submit');
  const originalText = submitBtn.innerHTML;
  
  submitBtn.innerHTML = 'Sending...';
  submitBtn.disabled = true;
  
  setTimeout(() => {
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }, 1000);
});


// ============= Footer Year =============
document.getElementById('year').textContent = new Date().getFullYear();

// ============= Intersection Observer for Animations =============
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-fade-up, .animate-slide-left, .animate-slide-right').forEach(el => {
  el.style.animationPlayState = 'paused';
  observer.observe(el);
});
