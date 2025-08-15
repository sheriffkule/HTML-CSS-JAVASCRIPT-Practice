const minSlider = document.getElementById('min-slider');
const maxSlider = document.getElementById('max-slider');
const minValueElem = document.querySelector('.min-value');
const maxValueElem = document.querySelector('.max-value');
const sliderRange = document.getElementById('slider-range');
const minBubble = document.getElementById('min-bubble');
const maxBubble = document.getElementById('max-bubble');

const minGap = 10;
const minPrice = parseInt(minSlider.min);
const maxPrice = parseInt(maxSlider.max);

function setSliderValues() {
  let minVal = parseInt(minSlider.value);
  let maxVal = parseInt(maxSlider.value);

  if (minVal < minPrice) {
    minSlider.value = minPrice;
    minVal = minPrice;
  }

  if (maxVal > maxPrice) {
    maxSlider.value = maxPrice;
    maxVal = maxPrice;
  }

  if (maxVal - minVal < minGap) {
    if (event.target === minSlider) {
      minSlider.value = maxVal - minGap;
      minVal = maxVal - minGap;
    } else {
      maxSlider.value = minVal + minGap;
      maxVal = minVal + minGap;
    }
  }

  minValueElem.textContent = `$${minVal}`;
  maxValueElem.textContent = `$${maxVal}`;
  minValueElem.style.left = ((minVal - minPrice) / (maxPrice - minPrice)) * 100 + '%';

  const percentMin = ((minVal - minPrice) / (maxPrice - minPrice)) * 100;
  const percentMax = ((maxVal - minPrice) / (maxPrice - minPrice)) * 100;
  sliderRange.style.left = percentMin + '%';
  sliderRange.style.width = percentMax - percentMin + '%';

  minBubble.textContent = `$${minVal}`;
  maxBubble.textContent = `$${maxVal}`;
  minBubble.style.left = percentMin + '%';
  maxBubble.style.left = percentMax + '%';
}

[minSlider, maxSlider].forEach((slider, idx) => {
  slider.addEventListener('input', setSliderValues);
  slider.addEventListener('mouseenter', () => {
    if (idx === 0) minBubble.style.opacity = 1;
    else maxBubble.style.opacity = 1;
  });
  slider.addEventListener('mouseleave', () => {
    if (idx === 0) minBubble.style.opacity = 0;
    else maxBubble.style.opacity = 0;
  });
});

window.addEventListener('DOMContentLoaded', setSliderValues);

function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');

  if (yearElement) {
    yearElement.setAttribute('datetime', currentYear.toString());
    yearElement.dateTime = currentYear;
    yearElement.textContent = currentYear.toString();
  }
}

window.addEventListener('load', updateYear);