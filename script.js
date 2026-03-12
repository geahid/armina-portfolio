/* ===========================
   ARMINA AGAO — PORTFOLIO JS
   =========================== */

// ===========================
// CUSTOM CURSOR
// ===========================
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');

let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateTrail() {
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;
  cursorTrail.style.left = trailX + 'px';
  cursorTrail.style.top = trailY + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();

document.querySelectorAll('a, button, .pub-card, .edit-card, .bc-card, .photo-item, .ev-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
    cursorTrail.style.opacity = '0.3';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorTrail.style.opacity = '1';
  });
});

// ===========================
// NAVBAR SCROLL
// ===========================
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

// ===========================
// MOBILE MENU
// ===========================
const burger = document.getElementById('navBurger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ===========================
// REVEAL ON SCROLL
// ===========================
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, (i % 5) * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ===========================
// SKILL BARS ANIMATION
// ===========================
const skillItems = document.querySelectorAll('.skill-item');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const pct = entry.target.getAttribute('data-pct');
      const fill = entry.target.querySelector('.skill-fill');
      setTimeout(() => {
        fill.style.width = pct + '%';
      }, 300);
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillItems.forEach(item => skillObserver.observe(item));

// ===========================
// LIGHTBOX
// ===========================
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbCaption = document.getElementById('lbCaption');
const lbClose = document.getElementById('lbClose');
const lbBackdrop = document.getElementById('lbBackdrop');

function openLightbox(src, caption) {
  lbImg.src = src;
  lbCaption.textContent = caption || '';
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  lbImg.src = '';
}

lbClose.addEventListener('click', closeLightbox);
lbBackdrop.addEventListener('click', closeLightbox);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// Attach to clickable items
const clickableImages = document.querySelectorAll(
  '.pub-card, .edit-card, .bc-card, .photo-item, .ev-card, .ach-card'
);
clickableImages.forEach(card => {
  card.addEventListener('click', () => {
    const img = card.querySelector('img');
    const title = card.querySelector('h4, h3');
    if (img) openLightbox(img.src, title ? title.textContent : '');
  });
});

// ===========================
// SMOOTH STAGGER INTRO
// ===========================
window.addEventListener('load', () => {
  const introReveal = document.querySelectorAll('.intro .reveal');
  introReveal.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 300 + i * 150);
  });
});

// ===========================
// PARALLAX ON HERO IMAGE
// ===========================
const heroImg = document.querySelector('.intro-photo-frame img');
window.addEventListener('scroll', () => {
  if (heroImg) {
    const scrolled = window.scrollY;
    heroImg.style.transform = `translateY(${scrolled * 0.08}px)`;
  }
});

// ===========================
// SECTION ACTIVE HIGHLIGHT
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'white';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

console.log('%c Armina Agao Portfolio', 'color: white; background: black; font-size: 18px; padding: 8px 16px; font-family: serif; font-style: italic;');
console.log('%c Open Source — Feel free to fork & customize!', 'color: #888; font-size: 12px;');
