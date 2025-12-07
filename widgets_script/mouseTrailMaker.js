const previewArea = document.getElementById('preview-area');
const sizeSlider = document.getElementById('size-slider');
const lengthSlider = document.getElementById('length-slider');
const opacitySlider = document.getElementById('opacity-slider');
const sizeValue = document.getElementById('size-value');
const lengthValue = document.getElementById('length-value');
const opacityValue = document.getElementById('opacity-value');
const colorOptions = document.querySelectorAll('.color-option');
const customColorPicker = document.getElementById('custom-color');
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

  // Custom color picker
  customColorPicker.addEventListener('input', () => {
    colorOptions.forEach((opt) => opt.classList.remove('active'));
    config.color = customColorPicker.value;
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

  // Click event for particle burst
  previewArea.addEventListener('click', (e) => {
    const rect = previewArea.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    createParticleBurst(x, y);
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

// Create particle burst effect
function createParticleBurst(x, y) {
  const particleCount = 12;
  const colors = config.randomMode ? null : [config.color];
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const angle = (i / particleCount) * Math.PI * 2;
    const velocity = Math.random() * 50 + 100;
    const size = Math.random() * 20 + 10;
    const color = colors ? colors[0] : getRandomColor();
    
    particle.style.position = 'absolute';
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.background = color === 'gradient' ? 'linear-gradient(45deg, #ff3e3e, #3ea6ff)' : color;
    particle.style.borderRadius = '50%';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1000';
    
    previewArea.appendChild(particle);
    
    // Animate particle
    const endX = x + Math.cos(angle) * velocity;
    const endY = y + Math.sin(angle) * velocity;
    
    particle.animate([
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: `translate(${endX - x}px, ${endY - y}px) scale(0)`, opacity: 0 }
    ], {
      duration: 800,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }).onfinish = () => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    };
  }
}

// Apply the specified shape to an element
function applyShape(element, shape) {
  // Reset any previous shape styles
  element.style.borderRadius = '';
  element.style.slipPath = '';
  element.style.background = element.style.backgroundColor;

  switch (shape) {
    case 'circle':
      element.style.borderRadius = '50%';
      break;
    case 'square':
      break;
    case 'triangle':
      element.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
      break;
    case 'star':
      element.style.clipPath =
        'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
      break;
    case 'pentagon':
      element.style.clipPath = 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)';
      break;
    case 'hexagon':
      element.style.clipPath = 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)';
      break;
    case 'chess':
      element.style.clipPath =
        'polygon(0% 0%, 100% 0%, 100% 25%, 0% 25%, 0% 50%, 100% 50%, 100% 75%, 0% 75%, 0% 100%, 100% 100%, 100% 0%, 75% 0%, 75% 100%, 50% 100%, 50% 0%, 25% 0%, 25% 100%, 0% 100%)';
      break;
    case 'heart':
      element.style.clipPath =
        'polygon(30% 0%, 50% 15%, 70% 0%, 90% 10%, 100% 35%, 80% 70%, 50% 100%, 20% 70%, 0% 35%, 10% 10%)';
      break;
    case 'plus':
      element.style.clipPath =
        'polygon(33% 0%, 66% 0%, 66% 33%, 100% 33%, 100% 66%, 66% 66%, 66% 100%, 33% 100%, 33% 66%, 0% 66%, 0% 33%, 33% 33%)';
      break;
    case 'diamond':
      element.style.clipPath = 'polygon(25% 0%, 75% 0%, 100% 25%, 50% 100%, 0% 25%)';
      break;
  }
}

// Clear all trail elements
function clearTrail() {
  config.trailElements.forEach((element) => {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  });
  config.trailElements = [];
}

// Generate random color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Initialize the application
init();

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
