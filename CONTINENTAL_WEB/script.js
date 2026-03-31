document.addEventListener('DOMContentLoaded', () => {
  // Header con cambio al hacer scroll
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 100);
    }
  });

  // Carrusel
  const slidesContainer = document.getElementById('carruselSlides');
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.getElementById('dots');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  const carruselBox = document.querySelector('.carrusel-container');

  if (!slidesContainer || !dotsContainer || slides.length === 0) {
    console.error('No se encontraron los elementos del carrusel.');
    return;
  }

  let currentSlide = 0;
  const totalSlides = slides.length;
  let autoSlide;

  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');

    if (i === 0) {
      dot.classList.add('active');
    }

    dot.addEventListener('click', () => {
      goToSlide(i);
      restartAutoSlide();
    });

    dotsContainer.appendChild(dot);
  }

  function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  function goToSlide(index) {
    currentSlide = index;
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateDots();
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(currentSlide);
  }

  function startAutoSlide() {
    autoSlide = setInterval(nextSlide, 3000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlide);
  }

  function restartAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      restartAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      restartAutoSlide();
    });
  }

  if (carruselBox) {
    carruselBox.addEventListener('mouseenter', stopAutoSlide);
    carruselBox.addEventListener('mouseleave', startAutoSlide);
  }

  startAutoSlide();

  // Formulario demo
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('¡Cotización enviada con éxito! (Demostración para clase)');
      e.target.reset();
    });
  }
});