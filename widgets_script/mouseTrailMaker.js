const previewArea = document.getElementById('previewArea');
const sizeSlider = document.getElementById('size-slider');
const lengthSlider = document.getElementById('length-slider');
const opacitySlider = document.getElementById('opacity-slider');
const sizeValue = document.getElementById('size-value');
const lengthValue = document.getElementById('length-value');
const opacityValue = document.getElementById('opacity-value');
const colorOptions = document.querySelectorAll('.color-option');
const shapeOptions = document.querySelectorAll('.shape-option');
const toggleTrailBtn = document.getElementById('toggle-trail');
const clearTrailBtn = document.getElementById('clear-trail');
const randomModeBtn = document.getElementById('random-mode');

// Trail configuration
let config = {
  size: 20,
  length: 15,
  opacity: 0.7,
  color: '#ff3e3e',
  shape: 'circle',
  enabled: true,
  randomMode: false,
  trailElements: [],
};

// Initialize the app
function init() {
  updateSliderValues();
  setupEventListeners();
}

function updateSliderValues() {
  sizeValue.textContent = `${config.size}px`;
  lengthValue.textContent = config.length;
  opacityValue.textContent = config.opacity;
}

// set up event listeners
function setupEventListeners() {
  // slider events
  sizeSlider.addEventListener('input', () => {
    config.size = parseInt(sizeSlider.value);
    updateSliderValues();
  });

  lengthSlider.addEventListener('input', () => {
    config.length = parseInt(lengthSlider.value);
    updateSliderValues();
  });

  opacitySlider.addEventListener('input', () => {
    config.opacity = parseFloat(opacitySlider.value);
    updateSliderValues();
  });

  // Shape selection
  colorOptions.forEach((option) => {
    option.addEventListener('click', () => {
      colorOptions.forEach((opt) => opt.classList.remove('active'));
      option.classList.add('active');
      config.color = option.getAttribute('data-color');
    });
  });

  // Shape selection
  shapeOptions.forEach((option) => {
    option.addEventListener('click', () => {
      shapeOptions.forEach((opt) => opt.classList.remove('active'));
      option.classList.add('active');
      config.shape = option.getAttribute('data-shape');
    });
  });
}

// Initialize the application
init();