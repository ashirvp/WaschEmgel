import './style.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Initialize Smooth Scrolling (Lenis)
const lenis = new Lenis({
  duration: 1.5,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true, // correct stable v1.0+ parameter
  smoothTouch: false,
});

lenis.on('scroll', ScrollTrigger.update);

// Hook up all anchor links starting with "#" for beautiful Lenis smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      
      // Calculate navbar height offset to avoid overlapping sections
      const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
      
      lenis.scrollTo(targetElement, {
        offset: -navbarHeight,
        duration: 1.6,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    }
  });
});

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// Hero Section Parallax Effect
if (document.querySelector('.hero') && document.querySelector('.hero-bg')) {
  gsap.to('.hero-bg', {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
}

// Animate Elements on Load
if (document.querySelector('.hero-title')) {
  gsap.from('.hero-title', {
    y: 50,
    opacity: 0,
    duration: 1.2,
    ease: 'power4.out',
    delay: 0.2
  });
}

if (document.querySelector('.hero-subtitle')) {
  gsap.from('.hero-subtitle', {
    y: 30,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    delay: 0.6
  });
}

if (document.querySelector('.hero-actions')) {
  gsap.from('.hero-actions', {
    y: 30,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    delay: 0.8
  });
}

// Interactive Showcase Cards Scroll Animation
const showcaseCards = gsap.utils.toArray('.coating-card');
if (showcaseCards.length > 0) {
  showcaseCards.forEach((card, i) => {
    gsap.to(card, {
      y: 0,
      opacity: 1,
      duration: 1.5,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  });
}

// Partner Logos Parallax/Fade
if (document.querySelector('.partners-banner') && document.querySelector('.partners-content')) {
  gsap.from('.partners-content', {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
      trigger: '.partners-banner',
      start: 'top 90%'
    }
  });
}

// Locations Reveal
const locations = gsap.utils.toArray('.location-card');
if (locations.length > 0 && document.querySelector('.locations-grid')) {
  locations.forEach((loc, i) => {
    gsap.from(loc, {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: i * 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.locations-grid',
        start: 'top 80%'
      }
    });
  });
}

// Flyer Section Reveal
if (document.querySelector('.flyer-section')) {
  gsap.from('.flyer-content > *', {
    y: 40,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.flyer-section',
      start: 'top 80%'
    }
  });

  gsap.from('.flyer-media-col', {
    y: 60,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.flyer-section',
      start: 'top 75%'
    }
  });
}

// Our Services Grid Reveal (IntersectionObserver for absolute robustness on Vercel)
const servicesSection = document.querySelector('#services-grid');
const serviceGridItems = document.querySelectorAll('.service-grid-item');
if (servicesSection && serviceGridItems.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        serviceGridItems.forEach((item) => {
          item.classList.add('revealed');
        });
        observer.unobserve(servicesSection); // stop observing once triggered
      }
    });
  }, {
    rootMargin: '0px 0px -10% 0px' // triggers slightly before it enters the viewport fully
  });
  observer.observe(servicesSection);
}

// Navbar Blur Effect on Scroll
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'var(--primary-gold)';
      navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
    } else {
      navbar.style.background = 'var(--primary-gold)';
      navbar.style.boxShadow = 'none';
    }
  });
}

// --- Modal Logic ---
let currentStep = 1;
const totalSteps = 7;

const modalOverlay = document.getElementById('booking-modal');
const closeBtn = document.querySelector('.modal-close');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');

function updateProgress() {
  const percentage = Math.round((currentStep / totalSteps) * 100);
  if (progressBar) progressBar.style.width = `${percentage}%`;
  if (progressText) progressText.textContent = `${percentage}%`;
}

function showStep(stepIndex) {
  document.querySelectorAll('.modal-step').forEach(step => {
    step.classList.remove('active');
  });
  const activeStep = document.getElementById(`step-${stepIndex}`);
  if (activeStep) activeStep.classList.add('active');
  updateProgress();
}

window.nextStep = function() {
  if (currentStep < totalSteps) {
    currentStep++;
    showStep(currentStep);
  }
};

window.prevStep = function() {
  if (currentStep > 1) {
    currentStep--;
    showStep(currentStep);
  }
};

window.selectOption = function(element, step) {
  // Single selection logic for steps 1, 3, 4
  const siblings = element.parentElement.querySelectorAll('.selectable');
  siblings.forEach(el => {
    el.classList.remove('selected');
  });
  
  element.classList.add('selected');
  
  // Automatically go to next step after brief delay for single choices
  setTimeout(() => {
    window.nextStep();
  }, 400);
};

window.submitForm = async function() {
  // 1. Gather all data from the steps
  const data = {
    location: document.querySelector('#step-1 .selectable.selected')?.innerText.replace(/\n/g, ', ').trim() || '',
    services: Array.from(document.querySelectorAll('#step-2 .hidden-input:checked')).map(el => el.parentElement.querySelector('.list-text').innerText).join(', '),
    vehicle: document.querySelector('#step-3 .selectable.selected')?.innerText.trim() || '',
    reason: document.querySelector('#step-4 .selectable.selected')?.innerText.trim() || '',
    date: document.getElementById('input-date')?.value || '',
    license_plate: document.getElementById('input-license')?.value || '',
    salutation: document.getElementById('input-salutation')?.value || '',
    first_name: document.getElementById('input-firstname')?.value || '',
    last_name: document.getElementById('input-lastname')?.value || '',
    phone: (document.getElementById('input-phone-code')?.value || '') + ' ' + (document.getElementById('input-phone')?.value || ''),
    email: document.getElementById('input-email')?.value || '',
  };

  // 2. Define your Make.com / Zapier / Google Script Webhook URL here:
  const WEBHOOK_URL = 'YOUR_WEBHOOK_URL_HERE'; 

  try {
    const btn = document.querySelector('button[onclick="submitForm()"]');
    const originalText = btn ? btn.innerText : 'Absenden';
    if (btn) {
      btn.innerText = 'Sende...';
      btn.disabled = true;
    }

    // Send POST request if URL is set
    if (WEBHOOK_URL !== 'YOUR_WEBHOOK_URL_HERE') {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } else {
      console.log('Excel Integration: Webhook URL not set. Gathered data:', data);
      await new Promise(res => setTimeout(res, 1000)); // Simulate network latency
    }

    alert('Ihre Anfrage wurde erfolgreich gesendet! Wir melden uns in Kürze.');
    closeModal();
    if (btn) {
      btn.innerText = originalText;
      btn.disabled = false;
    }
  } catch(err) {
    alert('Es gab einen Fehler beim Senden. Bitte versuchen Sie es später erneut.');
    console.error(err);
  }
};

function openModal(e) {
  if (e) e.preventDefault();
  if (!modalOverlay) return;
  
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden'; // prevent scrolling
  currentStep = 1;
  showStep(currentStep);
  
  // Reset selections
  document.querySelectorAll('.selectable').forEach(el => {
    el.classList.remove('selected');
  });
  document.querySelectorAll('.hidden-input').forEach(input => {
    input.checked = false;
  });
}

function closeModal() {
  if (!modalOverlay) return;
  modalOverlay.classList.remove('active');
  document.body.style.overflow = ''; 
}

// Global Event Delegation for Booking Triggers
document.addEventListener('click', (e) => {
  const trigger = e.target.closest('.trigger-booking');
  if (trigger) {
    openModal(e);
  }
});

// Close triggers
if (closeBtn) {
  closeBtn.addEventListener('click', closeModal);
}

if (modalOverlay) {
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
}

// Refresh GSAP ScrollTrigger once the page is fully loaded to prevent height/scroll position misalignment with Lenis
window.addEventListener('load', () => {
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 250);
});
