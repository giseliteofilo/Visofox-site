const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
  });
});

// Carrossel de inspiração: avança automaticamente e permite navegação manual.
const track = document.querySelector('#carousel-track');
const slides = Array.from(track.querySelectorAll('.carousel-slide'));
const dotsContainer = document.querySelector('#carousel-dots');
const previousButton = document.querySelector('#prev-slide');
const nextButton = document.querySelector('#next-slide');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let currentSlide = 0;
let carouselTimer;

slides.forEach((slide, index) => {
  const dot = document.createElement('button');
  dot.className = 'carousel-dot';
  dot.type = 'button';
  dot.setAttribute('aria-label', `Mostrar imagem ${index + 1}`);
  dot.addEventListener('click', () => {
    showSlide(index);
    restartTimer();
  });
  dotsContainer.appendChild(dot);
});

const dots = Array.from(dotsContainer.querySelectorAll('button'));

function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle('active', dotIndex === currentSlide);
    dot.setAttribute('aria-current', dotIndex === currentSlide ? 'true' : 'false');
  });
}

function nextSlide() { showSlide(currentSlide + 1); }
function previousSlide() { showSlide(currentSlide - 1); }
function startTimer() {
  if (!reducedMotion) carouselTimer = window.setInterval(nextSlide, 5000);
}
function restartTimer() {
  window.clearInterval(carouselTimer);
  startTimer();
}

nextButton.addEventListener('click', () => { nextSlide(); restartTimer(); });
previousButton.addEventListener('click', () => { previousSlide(); restartTimer(); });

const carouselFrame = document.querySelector('.carousel-frame');
carouselFrame.addEventListener('mouseenter', () => window.clearInterval(carouselTimer));
carouselFrame.addEventListener('mouseleave', startTimer);
carouselFrame.addEventListener('focusin', () => window.clearInterval(carouselTimer));
carouselFrame.addEventListener('focusout', startTimer);

showSlide(0);
startTimer();
document.querySelector('#year').textContent = new Date().getFullYear();
