const slides = Array.from(document.querySelectorAll('.slide'));
const dotsContainer = document.getElementById('sliderDots');
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
const navLinks = Array.from(document.querySelectorAll('.nav a'));
const sections = Array.from(document.querySelectorAll('main .section'));

let currentSlide = 0;
let intervalId = null;

function renderDots() {
  slides.forEach((_, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', `Ir al slide ${index + 1}`);
    button.addEventListener('click', () => {
      goToSlide(index);
      restartAutoplay();
    });
    dotsContainer.appendChild(button);
  });
}

function updateSlider() {
  const dots = Array.from(dotsContainer.querySelectorAll('button'));
  slides.forEach((slide, index) => {
    slide.classList.toggle('is-active', index === currentSlide);
  });
  dots.forEach((dot, index) => {
    dot.classList.toggle('is-active', index === currentSlide);
  });
}

function goToSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  updateSlider();
}

function nextSlide() {
  goToSlide(currentSlide + 1);
}

function restartAutoplay() {
  clearInterval(intervalId);
  intervalId = setInterval(nextSlide, 5000);
}

navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('is-open');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('is-active', isActive);
      });
    }
  });
}, {
  threshold: 0.55
});

sections.forEach(section => observer.observe(section));

renderDots();
updateSlider();
restartAutoplay();
