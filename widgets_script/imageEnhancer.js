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
  if (uploadTrigger && imageUpload) {
    uploadTrigger.addEventListener('click', () => imageUpload.click());
  }
  if (imageUpload) {
    imageUpload.addEventListener('change', handleImageUpload);
  }
  downloadBtn?.addEventListener('click', downloadImage);
  resetBtn?.addEventListener('click', resetAdjustments);

  // Slider events
  brightnessSlider?.addEventListener('input', updateImage);
  contrastSlider?.addEventListener('input', updateImage);
  saturationSlider?.addEventListener('input', updateImage);
  blurSlider?.addEventListener('input', updateImage);
  hueSlider?.addEventListener('input', updateImage);

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
  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      alert('Please select an image file');
      return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
      imagePreview.src = e.target.result;
      imagePreview.style.display = 'block';
      const placeholder = document.querySelector('.placeholder-text');
      if (placeholder) placeholder.style.display = 'none';

      // Reset adjustments when new image is loaded
      resetAdjustments();
    };
    reader.readAsDataURL(file);
  }

  function updateImage() {
    if (!imagePreview || !imagePreview.src) return;

    // Show loading state
    imageContainer?.classList.add('processing');

    // Update value displays
    if (brightnessValue) brightnessValue.textContent = `${brightnessSlider?.value ?? 100}%`;
    if (contrastValue) contrastValue.textContent = `${contrastSlider?.value ?? 100}%`;
    if (saturationValue) saturationValue.textContent = `${saturationSlider?.value ?? 100}%`;
    if (blurValue) blurValue.textContent = `${blurSlider?.value ?? 0}px`;
    if (hueValue) hueValue.textContent = `${hueSlider?.value ?? 0}deg`;

    // Apply filters with a slight delay to show loading state
    setTimeout(() => {
      // Build filters array
      const filters = [];

      // Apply selected filter
      switch (currentFilter) {
        case 'grayscale':
          filters.push('grayscale(1)');
          break;
        case 'sepia':
          filters.push('sepia(1)');
          break;
        case 'invert':
          filters.push('invert(1)');
          break;
        case 'vintage':
          filters.push('contrast(1.2) sepia(0.3)');
          break;
        case 'cool':
          filters.push('hue-rotate(180deg) saturate(1.5)');
          break;
      }

      // Apply adjustments
      filters.push(`brightness(${brightnessSlider?.value ?? 100}%)`);
      filters.push(`contrast(${contrastSlider?.value ?? 100}%)`);
      filters.push(`saturate(${saturationSlider?.value ?? 100}%)`);
      const blurVal = blurSlider?.value ?? 0;
      if (parseFloat(blurVal) > 0) {
        filters.push(`blur(${blurVal}px)`);
      }
      filters.push(`hue-rotate(${hueSlider?.value ?? 0}deg)`);

      // Apply to image
      imagePreview.style.filter = filters.join(' ').trim();

      // Hide loading state
      imageContainer?.classList.remove('processing');
    }, 300);
  }

  function downloadImage() {
    if (!imagePreview.src) {
      alert('Please upload an image first!');
      return;
    }

    // Create canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions to match image
    canvas.width = imagePreview.naturalWidth;
    canvas.height = imagePreview.naturalHeight;

    // Apply current filters to canvas
    ctx.filter = imagePreview.style.filter || 'none';

    // Draw image on canvas (catch cross-origin tainting)
    try {
      ctx.drawImage(imagePreview, 0, 0, canvas.width, canvas.height);
    } catch (err) {
      alert('Unable to export image due to cross-origin restrictions.');
      return;
    }

    // Create download link
    const link = document.createElement('a');
    link.download = 'enhanced-image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  function resetAdjustments() {
    // Reset sliders to default values
    brightnessSlider.value = 100;
    contrastSlider.value = 100;
    saturationSlider.value = 100;
    blurSlider.value = 0;
    hueSlider.value = 0;

    // Reset filter to original
    filterOptions.forEach((opt) => opt.classList.remove('active'));
    const noneFilter = document.querySelector('.filter-option[data-filter="none"]');
    if (noneFilter) noneFilter.classList.add('active');
    currentFilter = 'none';

    // Update image
    updateImage();
  }

  function updateYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('year');

    if (!yearElement) {
      console.error('Year element not found');
      return;
    }

    if (yearElement) {
      yearElement.setAttribute('datetime', currentYear.toString());
      yearElement.dateTime = currentYear.toString();
      yearElement.textContent = currentYear.toString();
    }
  }

  updateYear();
});
