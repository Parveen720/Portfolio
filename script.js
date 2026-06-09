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

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const submitBtn = contactForm.querySelector('.btn-submit');
  const originalText = submitBtn.innerHTML;

  submitBtn.innerHTML = 'Sending...';
  submitBtn.disabled = true;

  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      alert('Message sent successfully! I will get back to you soon.');
      contactForm.reset();
    } else {
      alert('Failed to send message. Please try again later.');
    }
  } catch (error) {
    console.error(error);
    alert('Something went wrong. Please try again.');
  } finally {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
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



// ============= Moving Particle Background =============
(function () {
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');

  // ── Colors matched to YOUR portfolio's purple/blue theme ──
  const CONFIG = {
    particleCount: 100,
    dotColor:'0, 188, 212',    // purple  #a78bfa
    lineColor: '0, 150, 199',    // blue    #60a5fa
    dotMinSize: 1.5,
    dotMaxSize: 3,
    speed: 0.35,
    connectDist: 130,
    mouseRadius: 160,
    mouseStrength: 0.06,
    dotOpacity: 0.6,
    lineMaxOpacity: 0.25,
  };

  let W, H, particles = [];
  let mouse = { x: -9999, y: -9999 };

  function Particle() { this.reset(true); }

  Particle.prototype.reset = function (init) {
    this.x  = Math.random() * W;
    this.y  = init ? Math.random() * H : (Math.random() < 0.5 ? -5 : H + 5);
    this.vx = (Math.random() - 0.5) * CONFIG.speed;
    this.vy = (Math.random() - 0.5) * CONFIG.speed;
    this.r  = CONFIG.dotMinSize + Math.random() * (CONFIG.dotMaxSize - CONFIG.dotMinSize);
    this.opacity = 0.4 + Math.random() * 0.5;
  };

  Particle.prototype.update = function () {
    const dx = this.x - mouse.x, dy = this.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < CONFIG.mouseRadius && dist > 0) {
      const force = (CONFIG.mouseRadius - dist) / CONFIG.mouseRadius;
      this.vx += (dx / dist) * force * CONFIG.mouseStrength;
      this.vy += (dy / dist) * force * CONFIG.mouseStrength;
    }
    this.vx *= 0.995; this.vy *= 0.995;
    const spd = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (spd < 0.05) {
      this.vx += (Math.random() - 0.5) * 0.05;
      this.vy += (Math.random() - 0.5) * 0.05;
    }
    this.x += this.vx; this.y += this.vy;
    if (this.x < -10) this.x = W + 10;
    if (this.x > W + 10) this.x = -10;
    if (this.y < -10) this.y = H + 10;
    if (this.y > H + 10) this.y = -10;
  };

  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${CONFIG.dotColor},${this.opacity * CONFIG.dotOpacity})`;
    ctx.fill();
  };

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONFIG.connectDist) {
          const alpha = (1 - dist / CONFIG.connectDist) * CONFIG.lineMaxOpacity;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${CONFIG.lineColor},${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(animate);
  }

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('touchmove', e => {
    if (e.touches.length) { mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; }
  }, { passive: true });
  window.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });
  window.addEventListener('resize', resize);

  resize();
  for (let i = 0; i < CONFIG.particleCount; i++) particles.push(new Particle());
  animate();
})();


// ============= Custom Cyan Cursor =============
(function () {
  const main  = document.getElementById('cursorMain');
  const trail = document.getElementById('cursorTrail');
  if (!main || !trail) return;

  // Only run on desktop (pointer: fine = mouse)
  if (!window.matchMedia('(pointer: fine)').matches) return;

  let mouseX = 0, mouseY = 0;
  let trailX = 0, trailY = 0;

  // Move the main dot instantly
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    main.style.left = mouseX + 'px';
    main.style.top  = mouseY + 'px';
  });

  // Trail follows with smooth lag
  function animateTrail() {
    trailX += (mouseX - trailX) * 0.12;
    trailY += (mouseY - trailY) * 0.12;
    trail.style.left = trailX + 'px';
    trail.style.top  = trailY + 'px';
    requestAnimationFrame(animateTrail);
  }
  animateTrail();

  // Hover effect on interactive elements
  const hoverTargets = 'a, button, .btn-primary, .btn-outline, .project-card, .skill-badge, .social-link, .contact-card, input, textarea';

  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => {
      main.classList.add('hovered');
      trail.classList.add('hovered');
    });
    el.addEventListener('mouseleave', () => {
      main.classList.remove('hovered');
      trail.classList.remove('hovered');
    });
  });

  // Click ripple effect
  document.addEventListener('mousedown', () => {
    main.classList.add('clicked');
    setTimeout(() => main.classList.remove('clicked'), 150);
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    main.style.opacity = '0';
    trail.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    main.style.opacity = '1';
    trail.style.opacity = '1';
  });
})();