// DOM Elements
const animatedBox = document.getElementById('animatedBox');
const animationPreview = document.getElementById('animationPreview');
const codeOutput = document.getElementById('codeOutput');
const copyCodeBtn = document.getElementById('copyCodeBtn');
const exportBtn = document.getElementById('exportBtn');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

// Control elements
const animationType = document.getElementById('animationType');
const durationSlider = document.getElementById('duration');
const delaySlider = document.getElementById('delay');
const iterationSelect = document.getElementById('iteration');
const timingButtons = document.querySelectorAll('.timing-btn');
const bgColor = document.getElementById('bgColor');
const textColor = document.getElementById('textColor');
const animationPresets = document.querySelectorAll('.animation-preset');

// Display elements
const durationValue = document.getElementById('durationValue');
const durationDisplay = document.getElementById('durationDisplay');
const delayValue = document.getElementById('delayValue');
const delayDisplay = document.getElementById('delayDisplay');

// Animation state
let currentAnimation = '';
let currentTiming = 'ease';
let isPlaying = false;
let animationTimeout = null;

// Initialize the app
function init() {
  updateDisplayValues();
  generateAnimation();
  setupEventListeners();

  // Auto-play the animation when page loads
  setTimeout(() => {
    playAnimation();
  }, 500);
}

// Set up event listeners
function setupEventListeners() {
  // Control listeners
  animationType.addEventListener('change', generateAnimation);
  durationSlider.addEventListener('input', updateDisplayValues);
  durationSlider.addEventListener('change', generateAnimation);
  delaySlider.addEventListener('input', updateDisplayValues);
  delaySlider.addEventListener('change', generateAnimation);
  iterationSelect.addEventListener('change', generateAnimation);

  // Color listeners
  bgColor.addEventListener('input', function () {
    animatedBox.style.background = bgColor.value;
    generateAnimation();
  });

  textColor.addEventListener('input', function () {
    animatedBox.style.color = textColor.value;
    generateAnimation();
  });

  // Timing function buttons
  timingButtons.forEach((button) => {
    button.addEventListener('click', function () {
      timingButtons.forEach((btn) => btn.classList.remove('active'));
      this.classList.add('active');
      currentTiming = this.getAttribute('data-timing');
      generateAnimation();
    });
  });

  // Action buttons
  playBtn.addEventListener('click', function () {
    if (!isPlaying) playAnimation();
  });

  pauseBtn.addEventListener('click', function () {
    if (isPlaying) pauseAnimation();
  });

  resetBtn.addEventListener('click', function () {
    resetAnimation();
  });

  // Code export buttons
  copyCodeBtn.addEventListener('click', copyCodeToClipboard);
  exportBtn.addEventListener('click', exportCSSFile);

  // Animation presets
  animationPresets.forEach((preset) => {
    preset.addEventListener('click', function () {
      const presetType = this.getAttribute('data-preset');
      animationType.value = presetType;
      generateAnimation();

      // Highlight the selected preset
      animationPresets.forEach((p) => (p.style.borderColor = 'var(--gray)'));
      this.style.borderColor = 'var(--primary)';

      // Auto-play the animation
      setTimeout(() => {
        playAnimation();
      }, 100);
    });
  });

  // Auto-play when settings change
  animationType.addEventListener('change', () => {
    setTimeout(() => {
      playAnimation();
    }, 100);
  });

  durationSlider.addEventListener('change', () => {
    setTimeout(() => {
      playAnimation();
    }, 100);
  });
}

// Update display values for sliders
function updateDisplayValues() {
  durationValue.textContent = durationSlider.value;
  durationDisplay.textContent = durationSlider.value + 's';
  delayValue.textContent = delaySlider.value;
  delayDisplay.textContent = delaySlider.value + 's';
}

// Generate animation based on controls
function generateAnimation() {
  updateDisplayValues();

  // Get values from controls
  const type = animationType.value;
  const duration = durationSlider.value;
  const delay = delaySlider.value;
  const iteration = iterationSelect.value;

  // Reset animation state
  resetAnimation();

  // Remove any existing animation classes
  animatedBox.className = 'animated-element';

  // Apply new animation class
  animatedBox.classList.add(type);

  // Apply animation properties
  animatedBox.style.animation = `${type} ${duration}s ${currentTiming} ${delay}s ${iteration}`;

  // Store current animation
  currentAnimation = type;

  // Generate CSS code
  generateCSSCode(type, duration, delay, iteration);
}

// Play animation
function playAnimation() {
  // First reset to ensure animation plays from start
  animatedBox.style.animation = 'none';

  // Force reflow to restart animation
  void animatedBox.offsetWidth;

  // Get values from controls
  const type = animationType.value;
  const duration = durationSlider.value;
  const delay = delaySlider.value;
  const iteration = iterationSelect.value;

  // Reapply animation
  animatedBox.style.animation = `${type} ${duration}s ${currentTiming} ${delay}s ${iteration}`;
  animatedBox.style.animationPlayState = 'running';

  isPlaying = true;
  playBtn.disabled = true;
  pauseBtn.disabled = false;

  // If animation is not infinite, enable play button after animation completes
  if (iteration !== 'infinite') {
    const totalTime = (parseFloat(duration) + parseFloat(delay)) * 1000 * (parseInt(iteration) || 1);

    clearTimeout(animationTimeout);
    animationTimeout = setTimeout(() => {
      if (isPlaying) {
        isPlaying = false;
        playBtn.disabled = false;
        pauseBtn.disabled = true;
      }
    }, totalTime + 100);
  }
}

// Pause animation
function pauseAnimation() {
  animatedBox.style.animationPlayState = 'paused';
  isPlaying = false;
  playBtn.disabled = false;
  pauseBtn.disabled = true;
}

// Reset animation
function resetAnimation() {
  animatedBox.style.animation = 'none';
  void animatedBox.offsetWidth; // Trigger reflow to restart animation
  isPlaying = false;
  playBtn.disabled = false;
  pauseBtn.disabled = true;
  clearTimeout(animationTimeout);
}

// Generate CSS code for the animation
function generateCSSCode(type, duration, delay, iteration) {
  // Get color values
  const bgColorValue = bgColor.value;
  const textColorValue = textColor.value;

  // Create keyframes based on animation type
  let keyframes = '';

  switch (type) {
    case 'slide':
      keyframes = `@keyframes slide {
  0% { transform: translateX(-150px); opacity: 0; }
  70% { transform: translateX(10px); }
  100% { transform: translateX(0); opacity: 1; }
}`;
      break;
    case 'bounce':
      keyframes = `@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-30px); }
  60% { transform: translateY(-15px); }
}`;
      break;
    case 'rotate':
      keyframes = `@keyframes rotate {
  from { transform: rotate(0); }
  to { transform: rotate(360deg); }
}`;
      break;
    case 'fade':
      keyframes = `@keyframes fade {
  from { opacity: 0; }
  to { opacity: 1; }
}`;
      break;
    case 'pulse':
      keyframes = `@keyframes pulse {
  from { transform: scale(1); }
  50% { transform: scale(1.2); }
  to { transform: scale(1); }
}`;
      break;
    case 'shake':
      keyframes = `@keyframes shake {
  from, to { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
  20%, 40%, 60%, 80% { transform: translateX(10px); }
}`;
      break;
    case 'flip':
      keyframes = `@keyframes flip {
  from { transform: perspective(400px) rotateY(0); }
  to { transform: perspective(400px) rotateY(360deg); }
}`;
      break;
    case 'zoom':
      keyframes = `@keyframes zoom {
  from { transform: scale(0.3); opacity: 0; }
  70% { transform: scale(1.1); }
  to { transform: scale(1); opacity: 1; }
}`;
      break;
  }

  // Create CSS code
  const cssCode = `${keyframes}
  
.${type} {
  animation: ${type} ${duration}s ${currentTiming} ${delay}s ${iteration};
}
  

/* To apply this animation to any element: */
.your-element {
  width: 120px;
  height: 120px;
  background: ${bgColorValue};
  color: ${textColorValue};
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${type} ${duration}s ${currentTiming} ${delay}s ${iteration};
}`;

  // Update code output
  codeOutput.textContent = cssCode;

  // Highlight the selected preset
  animationPresets.forEach((preset) => {
    if (preset.getAttribute('data-preset') === type) {
      preset.style.borderColor = 'var(--primary)';
    } else {
      preset.style.borderColor = 'var(--gray)';
    }
  });
}

// Copy CSS code to clipboard
function copyCodeToClipboard() {
  const codeText = codeOutput.textContent;

  navigator.clipboard
    .writeText(codeText)
    .then(() => {
      const originalText = copyCodeBtn.innerHTML;
      copyCodeBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
      copyCodeBtn.style.background = 'var(--success)';

      setTimeout(() => {
        copyCodeBtn.innerHTML = originalText;
        copyCodeBtn.style.background = '';
      }, 2000);
    })
    .catch((err) => {
      console.error('Failed to copy text: ', err);
      alert('Failed to copy code to clipboard, Please try again.');
    });
}

// Export CSS as a file
function exportCSSFile() {
  const cssCode = codeOutput.textContent;
  const blob = new Blob([cssCode], { type: 'text/css' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'css-animation.css';
  document.body.appendChild(a);
  a.click();

  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
}

// Update year in footer
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

// Initialize the app when page loads
document.addEventListener('DOMContentLoaded', init);
