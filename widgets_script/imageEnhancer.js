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
});
