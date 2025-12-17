document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const imageUpload = document.getElementById('imageUpload');
  const uploadTrigger = document.getElementById('uploadTrigger');
  const imagePreview = document.getElementById('imagePreview');
  const imageContainer = document.getElementById('imageContainer');
  const downloadBtn = document.getElementById('downloadBtn');
  const resetBtn = document.getElementById('resetBtn');

  // Adjustment sliders
  const brightnessSlider = document.getElementById('brightness');
  const contrastSlider = document.getElementById('contrast');
  const saturationSlider = document.getElementById('saturation');
  const blurSlider = document.getElementById('blur');
  const hueSlider = document.getElementById('hue');

  // Value displays
  const brightnessValue = document.getElementById('brightnessValue');
  const contrastValue = document.getElementById('contrastValue');
  const saturationValue = document.getElementById('saturationValue');
  const blurValue = document.getElementById('blurValue');
  const hueValue = document.getElementById('hueValue');

  // Filter options
  const filterOptions = document.querySelectorAll('.filter-option');

  // Current filter
  let currentFilter = 'none';

  // Event Listeners
  uploadTrigger.addEventListener('click', () => imageUpload.click());
  imageUpload.addEventListener('click', handleImageUpload);
  downloadBtn.addEventListener('click', downloadImage);
  resetBtn.addEventListener('click', resetAdjustments);

  // Slider events
  brightnessSlider.addEventListener('input', updateImage);
  contrastSlider.addEventListener('input', updateImage);
  saturationSlider.addEventListener('input', updateImage);
  blurSlider.addEventListener('input', updateImage);
  hueSlider.addEventListener('input', updateImage);

  // Filter events
  filterOptions.forEach((option) => {
    option.addEventListener('click', () => {
      // Remove active class from all filters
      filterOptions.forEach((opt) => opt.classList.remove('active'));
      // Add active class to clicked filter
      option.classList.add('active');
      // Update current filter
      currentFilter = option.getAttribute('data-filter');
      // Apply filter
      updateImage();
    });
  });

  // Functions
});
