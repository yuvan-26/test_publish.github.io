let currentIndex = 1;
const slides = document.querySelectorAll('.slide-card');
const dots = document.querySelectorAll('.dot');
const slider = document.getElementById('slider');
const totalSlides = slides.length;
let interval;

function cloneSlides() {
  const firstSlide = slides[0].cloneNode(true);
  const secondSlide = slides[1].cloneNode(true);
  const lastSlide = slides[totalSlides - 1].cloneNode(true);
  const secondLastSlide = slides[totalSlides - 2].cloneNode(true);

  slider.appendChild(firstSlide);
  slider.appendChild(secondSlide);
  slider.insertBefore(lastSlide, slides[0]);
  slider.insertBefore(secondLastSlide, slides[0]);
}

function updateSliderPosition() {
  slider.style.transform = `translateX(-${currentIndex * 33.33}%)`;
  dots.forEach(dot => dot.classList.remove('active'));
  dots[(currentIndex - 1 + totalSlides) % totalSlides].classList.add('active');
}

function startAutoSlide() {
  interval = setInterval(() => {
    currentIndex++;
    updateSliderPosition();
    if (currentIndex === totalSlides + 1) {
      setTimeout(() => {
        slider.style.transition = 'none';
        currentIndex = 1;
        updateSliderPosition();
        setTimeout(() => slider.style.transition = 'transform 0.5s ease', 50);
      }, 500);
    }
  }, 3000);
}

function stopAutoSlide() {
  clearInterval(interval);
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentIndex = index + 1;
    updateSliderPosition();
    stopAutoSlide();
    startAutoSlide();
  });
});

slider.addEventListener('mouseenter', stopAutoSlide);
slider.addEventListener('mouseleave', startAutoSlide);

document.addEventListener('DOMContentLoaded', () => {
  cloneSlides();
  slider.style.transform = `translateX(-${currentIndex * 33.33}%)`;
  startAutoSlide();
});