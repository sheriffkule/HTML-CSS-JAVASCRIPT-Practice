const previewArea = document.getElementById('preview-area');
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

  // Color selection
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

  // Button events
  toggleTrailBtn.addEventListener('click', () => {
    config.enabled = !config.enabled;
    toggleTrailBtn.textContent = config.enabled ? 'Disable Trail' : 'Enable Trail';
  });

  clearTrailBtn.addEventListener('click', () => {
    clearTrail();
  });

  randomModeBtn.addEventListener('click', () => {
    config.randomMode = !config.randomMode;
    randomModeBtn.textContent = config.randomMode ? 'Disable Random' : 'Random Mode';
    randomModeBtn.style.background = config.randomMode
      ? 'rgba(255, 255, 255, 0.4)'
      : 'rgba(255, 255, 255, 0.2)';
  });

  // Mouse movement event - FIXED COORDINATE CALCULATION
  previewArea.addEventListener('mousemove', (e) => {
    if (!config.enabled) return;

    // Get the position relative to the preview area
    const rect = previewArea.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    createTrailElement(x, y);

    // Limit the number of trail elements
    if (config.trailElements.length > config.length) {
      const oldestElement = config.trailElements.shift();
      if (oldestElement) {
        oldestElement.style.opacity = 0;
        setTimeout(() => {
          if (oldestElement.parentNode) {
            oldestElement.parentNode.removeChild(oldestElement);
          }
        }, 500);
      }
    }
  });

  // create a trail element at the specific position
  function createTrailElement(x, y) {
    const trailElement = document.createElement('div');
    trailElement.className = 'trail-element';

    // Apply styling based on configuration
    const size = config.randomMode ? Math.random() * 30 + 10 : config.size;
    const color = config.randomMode ? getRandomColor() : config.color;

    trailElement.style.width = `${size}px`;
    trailElement.style.height = `${size}px`;
    trailElement.style.left = `${x - size * 0.5}px`;
    trailElement.style.top = `${y - size * 0.5}px`;
    trailElement.style.opacity = config.opacity;

    color === 'gradient'
      ? (trailElement.style.background = 'linear-gradient(45deg, #ff3e3e, #3ea6ff)')
      : (trailElement.style.background = color);

    if (config.randomMode) {
      // Random shape for random mode
      const shapes = [
        'circle',
        'square',
        'triangle',
        'star',
        'pentagon',
        'hexagon',
        'chess',
        'heart',
        'plus',
        'diamond',
      ];
      const randomShape = [Math.floor(Math.random() * shapes.length)];
      applyShape(trailElement, randomShape);
    } else {
      applyShape(trailElement, config.shape);
    }

    // Add rotation for visual interest
    trailElement.style.transform = `rotate(${Math.random() * 360}deg) scale(${Math.random() * 0.4 + 0.8})`;

    previewArea.appendChild(trailElement);
    config.trailElements.push(trailElement);

    // Fade out and remove after a delay
    setTimeout(() => {
      trailElement.style.opacity = 0;
      setTimeout(() => {
        if (trailElement.parentNode) {
          trailElement.parentNode.removeChild(trailElement);
        }
        // Remove from array
        const index = config.trailElements.indexOf(trailElement);
        if (index > -1) {
          config.trailElements.splice(index, 1);
        }
      }, 500);
    }, 1000);
  }
}

// Initialize the application
init();
