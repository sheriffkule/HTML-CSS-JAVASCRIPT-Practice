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

// Initialize the app when page loads
document.addEventListener('DOMContentLoaded', init);
