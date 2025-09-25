document.addEventListener('DOMContentLoaded', function () {
  const sliderContainer = document.getElementById('slider-container');
  const slider = document.getElementById('slider');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const progressBar = document.getElementById('progress-bar');
  const currentSlideElement = document.getElementById('current-slide');
  const totalSlidesElement = document.getElementById('total-slides');
  const dotsContainer = document.getElementById('slider-dots');

  let currentSlide = 0;
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID = 0;

  const slides = Array.from(slider.querySelectorAll('.slide'));
  const totalSlides = slides.length;

  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.querySelectorAll('.dot'));

  prevBtn.addEventListener('click', goToPrevSlide);
  nextBtn.addEventListener('click', goToNextSlide);

  slider.addEventListener('touchstart', touchStart);
  slider.addEventListener('touchend', touchEnd);
  slider.addEventListener('touchmove', touchMove);

  slider.addEventListener('mousedown', mouseDown);
  slider.addEventListener('mouseup', mouseUp);
  slider.addEventListener('mouseleave', mouseLeave);
  slider.addEventListener('mousemove', mouseMove);

  slider.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goToPrevSlide();
    if (e.key === 'ArrowRight') goToNextSlide();
  });

  updateSlider();

  function goToPrevSlide() {
    if (currentSlide <= 0) return;
    currentSlide--;
    updateSlider();
  }

  function goToNextSlide() {
    if (currentSlide >= totalSlides - 1) return;
    currentSlide++;
    updateSlider();
  }

  function goToSlide(index) {
    currentSlide = index;
    updateSlider();
  }

  function updateSlider() {
    slider.style.transform = `translateX(${-currentSlide * sliderContainer.offsetWidth}px)`;

    progressBar.style.width = `${((currentSlide + 1) / totalSlides) * 100}%`;

    currentSlideElement.textContent = currentSlide + 1;

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  function touchStart(e) {
    startPos = e.touches[0].clientX;
    isDragging = true;
    animationID = requestAnimationFrame(animation);
    slider.classList.add('.dragging');
  }

  function touchEnd() {
    if (!isDragging) return;
    isDragging = false;
    cancelAnimationFrame(animationID);

    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100 && currentSlide < totalSlides - 1) {
      currentSlide++;
    }

    if (movedBy > 100 && currentSlide > 0) {
      currentSlide--;
    }

    setPositionByIndex();
    slider.classList.remove('dragging');
  }

  function touchMove(e) {
    if (!isDragging) return;
    const currentPosition = e.touches[0].clientX;
    currentTranslate = prevTranslate + currentPosition - startPos;
  }

  function mouseDown(e) {
    startPos = e.clientX;
    isDragging = true;
    animationID = requestAnimationFrame(animation);
    slider.classList.add('dragging');
  }

  function mouseUp() {
    if (!isDragging) return;
    isDragging = false;
    cancelAnimationFrame(animationID);

    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100 && currentSlide < totalSlides - 1) {
      currentSlide++;
    }

    if (movedBy > 100 && currentSlide > 0) {
      currentSlide--;
    }

    setPositionByIndex();
    slider.classList.remove('dragging');
  }

  function mouseLeave() {
    if (!isDragging) return;
    isDragging = false;
    cancelAnimationFrame(animationID);

    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100 && currentSlide < totalSlides - 1) {
      currentSlide++;
    }

    if (movedBy > 100 && currentSlide > 0) {
      currentSlide--;
    }

    setPositionByIndex();
    slider.classList.remove('dragging');
  }

  function mouseMove(e) {
    if (!isDragging) return;
    const currentPosition = e.clientX;
    currentTranslate = prevTranslate + currentPosition - startPos;
  }

  function setPositionByIndex() {
    currentTranslate = currentSlide * -sliderContainer.offsetWidth;
    prevTranslate = currentTranslate;
    updateSlider();
  }

  function animation() {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
  }

  function setSliderPosition() {
    slider.style.transform = `translateX(${currentTranslate}px)`;
  }

  let autoplayInterval = setInterval(goToNextSlide, 5000);

  sliderContainer.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
  });

  sliderContainer.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(goToNextSlide, 5000);
  });

  sliderContainer.addEventListener('touchstart', () => {
    clearInterval(autoplayInterval);
  });

  sliderContainer.addEventListener('touchend', () => {
    autoplayInterval = setInterval(goToNextSlide, 5000);
  });
});
