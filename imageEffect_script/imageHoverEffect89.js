const sliderContainer = document.querySelector('.slider-container');
const sliderContent = sliderContainer.querySelector('.slider-content');
const sliderItems = sliderContent.querySelector('.slider-items');
const sliderItem = sliderItems.querySelectorAll('.slider-item');

let slideTouched = false;
let currentMouseX = 0;
let lastMouseX = 0;
let lastSliderX = 0;
let moveTo = 0;

const runSlider = () => {
  const space = 40;
  const sliderSizes = onResize();
  const currentSlideIndex = Math.max(1, sliderItem.length);
  const currentSlideDegree = 360 / currentSlideIndex;
  const translateZ = horizontalHeight(sliderSizes.w, currentSlideIndex, space);

  const height = calculateHeight(translateZ);

  sliderContainer.style.width = `${translateZ * 2 + space * currentSlideIndex}px`;
  sliderContainer.style.height = `${height}px`;

  sliderItem.forEach((item, i) => {
    item.style.transform = `rotateY(${currentSlideDegree * i}deg) translateZ(${translateZ}px)`;
  });
};

const onResize = () => {
  const boundingCarousel = sliderContent.getBoundingClientRect();

  const sliderSizes = {
    w: boundingCarousel.width,
    h: boundingCarousel.height,
  };

  return sliderSizes;
};

const horizontalHeight = (sliderWidth, currentSlideIndex, space) => {
  return sliderWidth / 2 / Math.tan(Math.PI / currentSlideIndex) + space;
};

const calculateHeight = (translateZ) => {
  const t = Math.atan((90 * Math.PI) / 180 / 2);
  const height = 2 * t * translateZ;

  return height;
};

const updateMouseX = (x) => {
  currentMouseX = x;
  currentMouseX < lastMouseX ? (moveTo -= 2.5) : (moveTo += 2.5);

  lastMouseX = currentMouseX;
};

const updateSlider = () => {
  lastSliderX = 0.2 * (moveTo - lastSliderX) + lastSliderX;
  sliderItems.style.transform = `rotateY(${lastSliderX}deg)`;

  requestAnimationFrame(updateSlider);
};

const checkMousePosition = () => {
  sliderItems.addEventListener('mousedown', () => {
    slideTouched = true;
    sliderItems.style.cursor = 'grabbing';
  });

  sliderItems.addEventListener('mouseup', () => {
    slideTouched = false;
    sliderItems.style.cursor = 'grab';
  });

  sliderItems.addEventListener('mouseleave', () => {
    slideTouched = false;
  });

  sliderItems.addEventListener('mousemove', (e) => {
    slideTouched && updateMouseX(e.clientX);
  });

  sliderItems.addEventListener('touchstart', () => {
    slideTouched = true;
  });

  sliderItems.addEventListener('touchend', () => {
    slideTouched = false;
  });

  sliderItems.addEventListener('touchmove', (e) => {
    slideTouched && updateMouseX(e.touches[0].clientX);
  });

  updateSlider();
  runSlider();
};

checkMousePosition();
