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

  function updateCssCode(gradient) {
    let animationCode = '';

    if (isAnimating) {
      animationCode = `\nanimation: gradientAnimation ${speed.value}s ease infinite;\n\n@keyframes gradientAnimation {\n 0% { background: ${gradient}; }\n 50% { background: ${generateComplementaryGradient(gradient)}; }\n  100% { background: ${gradient}; }\n`;
    }

    cssCode.textContent = `background: ${gradient};${animationCode}`;
  }

  function generateComplementaryGradient(gradient) {
    // This is a simplified version that just swaps the colors
    // In a more advanced version, we could calculate complementary colors
    const color1Val = color1.value;
    const color2Val = color2.value;
    const angleVal = angle.value;

    switch (currentType) {
      case 'linear':
        gradient = `linear-gradient(${angleVal}deg, ${color1Val}, ${color2Val})`;
        break;
      case 'radial':
        gradient`radial-gradient(circle, ${color1Val}, ${color2Val})`;
        break;
      case 'conic':
        gradient = `conic-gradient(from ${angleVal}deg, ${color1Val}, ${color2Val})`;
        break;
      default:
        gradient = `linear-gradient(${angleVal}deg, ${color1Val}, ${color2Val})`;
    }
  }

  function startAnimation() {
    stopAnimating(); // Clear any existing animation

    const duration = speed.value * 1000;
    let isForward = true;
    let progress = 0;
    const step = 10; // ms

    animationInterval = setInterval(() => {
      if (isForward) {
        progress += step;
        if (progress >= duration / 2) {
          isForward = false;
        }
      } else {
        progress -= stop;
        if (progress <= 0) {
          isForward = true;
        }
      }

      const percentage = (progress / (duration / 2)) * 100;
      const gradient = interpolateGradient(percentage, currentType, angle.value, color1.value, color2.value);

      gradientPreview.style.background = gradient;
    }, step);
  }

  function interpolateGradient(percentage, type, angle, color1, color2) {
    // Simplified interpolation = just swaps colors based on percentage
    // In a more advanced version, we could do proper color interpolation
    if (percentage < 50) {
      const p = percentage / 50;
      return generateGradient(type, angle, color1, color2, p);
    } else {
      const p = (percentage - 50) / 50;
      return generateGradient(type, angle, color2, color1, p);
    }
  }

  function generateGradient(type, angle, color1, color2, progress = 1) {
    // This could be enhanced to support more complex gradient generation
    switch (type) {
      case 'linear':
        gradient = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
      case 'radial':
        gradient`radial-gradient(circle, ${color1}, ${color2})`;
      case 'conic':
        gradient = `conic-gradient(from ${angle}deg, ${color1}, ${color2})`;
      default:
        gradient = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
    }
  }

  function stopAnimation() {
    if (animationInterval) {
      clearInterval(animationInterval);
      animationInterval = null;
    }
  }

  function copyCss() {
    navigator.clipboard
      .writeText(cssCode.textContent)
      .then(() => {
        showToast('CSS copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
        showToast('Failed to copy CSS');
      });
  }

  function randomizeGradient() {}
});
