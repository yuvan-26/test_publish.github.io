let singleCurrentIndex = 1;
const singleSlides = document.querySelectorAll('.single-slide-card');
const singleDots = document.querySelectorAll('.single-dot');
const singleSlider = document.getElementById('single-slider');
const singleTotalSlides = singleSlides.length;
let singleInterval;

function singleCloneSlides() {
    // Clone first and last slides for seamless looping
    const singleFirstSlide = singleSlides[0].cloneNode(true);
    const singleLastSlide = singleSlides[singleTotalSlides - 1].cloneNode(true);

    singleSlider.appendChild(singleFirstSlide);
    singleSlider.insertBefore(singleLastSlide, singleSlides[0]);
}

function singleUpdateSliderPosition() {
    singleSlider.style.transform = `translateX(-${singleCurrentIndex * 100}%)`;
    singleDots.forEach(dot => dot.classList.remove('active'));
    singleDots[(singleCurrentIndex - 1 + singleTotalSlides) % singleTotalSlides].classList.add('active');
}

function singleStartAutoSlide() {
    singleInterval = setInterval(() => {
        singleCurrentIndex++;
        singleUpdateSliderPosition();
        if (singleCurrentIndex === singleTotalSlides + 1) {
            setTimeout(() => {
                singleSlider.style.transition = 'none';
                singleCurrentIndex = 1;
                singleUpdateSliderPosition();
                setTimeout(() => singleSlider.style.transition = 'transform 0.5s ease', 50);
            }, 500);
        }
    }, 4000);
}

function singleStopAutoSlide() {
    clearInterval(singleInterval);
}

singleDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        singleCurrentIndex = index + 1;
        singleUpdateSliderPosition();
        singleStopAutoSlide();
        singleStartAutoSlide();
    });
});

singleSlider.addEventListener('mouseenter', singleStopAutoSlide);
singleSlider.addEventListener('mouseleave', singleStartAutoSlide);

document.addEventListener('DOMContentLoaded', () => {
    singleCloneSlides();
    singleSlider.style.transform = `translateX(-${singleCurrentIndex * 100}%)`;
    singleStartAutoSlide();
});


