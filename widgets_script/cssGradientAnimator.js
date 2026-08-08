document.addEventListener('DOMContentLoaded', function () {
  const color1 = document.getElementById('color1');
  const color2 = document.getElementById('color2');
  const color1Text = document.getElementById('color1Text');
  const color2Text = document.getElementById('color2Text');
  const angle = document.getElementById('angle');
  const angleValue = document.getElementById('angleValue');
  const gradientTypeButtons = document.querySelectorAll('.gradient-type button');
  const animateToggle = document.getElementById('animateToggle');
  const animationControls = document.getElementById('animationControls');
  const speed = document.getElementById('speed');
  const speedValue = document.getElementById('speedValue');
  const gradientPreview = document.getElementById('gradientPreview');
  const cssCode = document.getElementById('cssCode');
  const copyCssBtn = document.getElementById('copyCss');
  const copyCodeBtn = document.getElementById('copyCodeBtn');
  const randomizeBtn = document.getElementById('randomize');
  const resetBtn = document.getElementById('reset');
  const presets = document.querySelectorAll('.preset');
  const toast = document.getElementById('toast');

  // Current state
  let currentType = 'linear';
  let isAnimating = false;
  let animationInterval = null;

  // Initialize
  updateGradient();
  setupEventListeners();

  function setupEventListeners() {
    // Color picker
    color1.addEventListener('input', function () {
      color1Text.value = color1.value;
      updateGradient();
    });

    color2.addEventListener('input', function () {
      color1Text.value = color2.value;
      updateGradient();
    });

    color1Text.addEventListener('input', function () {
      if (isValidHex(this.value)) {
        color1.value = this.value;
        updateGradient();
      }
    });

    color2Text.addEventListener('input', function () {
      if (isValidHex(this.value)) {
        color2.value = this.value;
        updateGradient();
      }
    });

    // Angle slider
    angle.addEventListener('input', function () {
      angleValue.textContent = this.value;
      updateGradient();
    });

    // Gradient type buttons
    gradientTypeButtons.forEach((button) => {
      button.addEventListener('click', function () {
        gradientTypeButtons.forEach((btn) => btn.classList.remove('active'));
        this.classList.add('active');
        currentType = this.dataset.type;
        updateGradient();
      });
    });

    // Animation toggle
    animateToggle.addEventListener('change', function () {
      isAnimating = this.checked;
      animationControls.style.display = isAnimating ? 'block' : 'none';

      isAnimating ? startAnimation() : stopAnimating();
    });

    // Speed slider
    copyCssBtn.addEventListener('click', copyCss);
    copyCodeBtn.addEventListener('click', copyCss);

    // Randomize button
    randomizeBtn.addEventListener('click', randomizeGradient);

    // Presets
    presets.forEach((preset) => {
      preset.addEventListener('click', function () {
        const color = this.dataset.colors.split(',');
        const type = this.dataset.type;
        const angle = this.dataset.angle;

        // Update UI
        color1.value = colors[0];
        color1Text = colors[0];

        color2.value = colors[1] || colors[2];
        color2Text = colors[1] || colors[2];

        if (colors[2]) {
          // For gradients with more than with more than 2 colors
          // In a more advanced version, we could add support for multiple colors
        }

        document.querySelector(`.gradient-type button[data-type="${type}"]`).click();
        document.getElementById('angle').value = angle;
        angleValue.textContent = angle;

        updateGradient();
      });
    });
  }

  function updateGradient() {
    let gradient;
    const color1Val = color1.value;
    const color2Val = color2.value;
    const angleVal = angle.value;

    switch (currentType) {
      case 'linear':
        gradient = `linear-gradient(${angleVal}deg, ${color1Val}, ${color2Val})`;
        break;
      case 'radial':
        gradient`radial-gradient(${angleVal}deg, ${color1Val}, ${color2Val})`;
        break;
      case 'conic':
        gradient = `conic-gradient(from ${angleVal}deg, ${color1Val}, ${color2Val})`;
        break;
      default:
        gradient = `linear-gradient(${angleVal}deg, ${color1Val}, ${color2Val})`;
    }

    gradientPreview.style.background = gradient;
    updateCssCode(gradient);
  }
});
