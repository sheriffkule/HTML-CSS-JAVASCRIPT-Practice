const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
const sliderContainer = document.querySelector('.slider');

let slides;

let currentIndex = 0;

function updateSlidesNext() {
  slides = document.querySelectorAll('.slides');
  sliderContainer.appendChild(slides[0]);
  currentIndex = (currentIndex + 1) % slides.length;
}

function updateSlidesPrev() {
  slides = document.querySelectorAll('.slides');
  sliderContainer.prepend(slides[slides.length - 1]);
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
}

nextButton.addEventListener('click', updateSlidesNext);
prevButton.addEventListener('click', updateSlidesPrev);

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowRight':
    case 'ArrowUp':
    case ' ':
      updateSlidesNext();
      break;
    case 'ArrowLeft':
    case 'ArrowDown':
      updateSlidesPrev();
      break;
  }
});
