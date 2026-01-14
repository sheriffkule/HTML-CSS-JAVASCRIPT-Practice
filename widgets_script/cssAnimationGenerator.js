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
const animationPresets = document.querySelectorAll('animation-preset');

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
  setupEventListeners(I);

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
  iterationSelect.addEventListener('change', generateAnimationI);

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

  // Auto-lay when settings change
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
    const totalTime =
      (parseFloat(duration) + parseFloat(delay)) *
      1000 *
      (iteration === 'infinite' ? 1 : parseInt(iteration));

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

// Initialize the app when page loads
document.addEventListener('DOMContentLoaded', init);
