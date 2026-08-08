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
    if (color1) {
      color1.addEventListener('input', function () {
        if (color1Text) color1Text.value = color1.value;
        updateGradient();
      });
    }

    if (color2) {
      color2.addEventListener('input', function () {
        if (color2Text) color2Text.value = color2.value;
        updateGradient();
      });
    }

    if (color1Text) {
      color1Text.addEventListener('input', function () {
        if (isValidHex(this.value) && color1) {
          color1.value = this.value;
          updateGradient();
        }
      });
    }

    if (color2Text) {
      color2Text.addEventListener('input', function () {
        if (isValidHex(this.value) && color2) {
          color2.value = this.value;
          updateGradient();
        }
      });
    }

    // Angle slider
    if (angle) {
      angle.addEventListener('input', function () {
        if (angleValue) angleValue.textContent = this.value;
        updateGradient();
      });
    }

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
    if (animateToggle && animationControls) {
      animateToggle.addEventListener('change', function () {
        isAnimating = this.checked;
        animationControls.style.display = isAnimating ? 'block' : 'none';

        isAnimating ? startAnimation() : stopAnimation();
      });
    }

    // Copy buttons
    if (copyCssBtn) copyCssBtn.addEventListener('click', copyCss);
    if (copyCodeBtn) copyCodeBtn.addEventListener('click', copyCss);

    // Randomize button
    if (randomizeBtn) randomizeBtn.addEventListener('click', randomizeGradient);
    if (resetBtn) resetBtn.addEventListener('click', resetGradient);

    // Presets
    presets.forEach((preset) => {
      preset.addEventListener('click', function () {
        const colors = this.dataset.colors.split(',');
        const type = this.dataset.type;
        const presetAngle = this.dataset.angle;

        // Update UI
        if (color1) color1.value = colors[0] || '#000000';
        if (color1Text) color1Text.value = colors[0] || '#000000';

        if (color2) color2.value = colors[1] || colors[0] || '#ffffff';
        if (color2Text) color2Text.value = colors[1] || colors[0] || '#ffffff';

        if (colors[2]) {
          // For gradients with more than with more than 2 colors
          // In a more advanced version, we could add support for multiple colors
        }

        const typeButton = document.querySelector(`.gradient-type button[data-type="${type}"]`);
        if (typeButton) typeButton.click();
        if (angle) angle.value = presetAngle;
        if (angleValue) angleValue.textContent = presetAngle;

        updateGradient();
      });
    });
  }

  function updateGradient() {
    if (!color1 || !color2 || !angle) return;

    let gradient;
    const color1Val = color1.value;
    const color2Val = color2.value;
    const angleVal = angle.value;

    switch (currentType) {
      case 'linear':
        gradient = `linear-gradient(${angleVal}deg, ${color1Val}, ${color2Val})`;
        break;
      case 'radial':
        gradient = `radial-gradient(${angleVal}deg, ${color1Val}, ${color2Val})`;
        break;
      case 'conic':
        gradient = `conic-gradient(from ${angleVal}deg, ${color1Val}, ${color2Val})`;
        break;
      default:
        gradient = `linear-gradient(${angleVal}deg, ${color1Val}, ${color2Val})`;
    }

    if (gradientPreview) gradientPreview.style.background = gradient;
    updateCssCode(gradient);
  }

  function updateCssCode(gradient) {
    let animationCode = '';

    if (isAnimating) {
      const speedValueSec = speed ? Number(speed.value) || 5 : 5;
      animationCode = `\nanimation: gradientAnimation ${speedValueSec}s ease infinite;\n\n@keyframes gradientAnimation {\n  0% { background: ${gradient}; }\n  50% { background: ${generateComplementaryGradient(gradient)}; }\n  100% { background: ${gradient}; }\n}\n`;
    }

    if (cssCode) cssCode.textContent = `background: ${gradient};${animationCode}`;
  }

  function generateComplementaryGradient(gradient) {
    // This is a simplified version that just swaps the colors
    // In a more advanced version, we could calculate complementary colors
    const color1Val = color1 ? color1.value : '#000000';
    const color2Val = color2 ? color2.value : '#ffffff';
    const angleVal = angle ? angle.value : 0;

    switch (currentType) {
      case 'linear':
        gradient = `linear-gradient(${angleVal}deg, ${color2Val}, ${color1Val})`;
        break;
      case 'radial':
        gradient = `radial-gradient(circle, ${color2Val}, ${color1Val})`;
        break;
      case 'conic':
        gradient = `conic-gradient(from ${angleVal}deg, ${color2Val}, ${color1Val})`;
        break;
      default:
        gradient = `linear-gradient(${angleVal}deg, ${color2Val}, ${color1Val})`;
    }
    return gradient;
  }

  function startAnimation() {
    stopAnimation(); // Clear any existing animation

    const duration = Number(speed?.value) * 1000 || 5000;
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
        progress -= step;
        if (progress <= 0) {
          isForward = true;
        }
      }

      const percentage = (progress / (duration / 2)) * 100;
      const gradient = interpolateGradient(
        percentage,
        currentType,
        angle ? angle.value : 0,
        color1 ? color1.value : '#000000',
        color2 ? color2.value : '#ffffff'
      );

      if (gradientPreview) gradientPreview.style.background = gradient;
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
        return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
      case 'radial':
        return `radial-gradient(circle, ${color1}, ${color2})`;
      case 'conic':
        return `conic-gradient(from ${angle}deg, ${color1}, ${color2})`;
      default:
       return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
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

  function randomizeGradient() {
    // Random colors
    color1.value = getRandomColor();
    color1Text.value = color1.value;

    color2.value = getRandomColor();
    color2Text.value = color2.value;

    // Random angle
    const randomAngle = Math.floor(Math.random() * 360);
    angle.value = randomAngle;
    angleValue.textContent = randomAngle;

    // Random type
    const types = ['linear', 'radial', 'conic'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomTypeButton = document.querySelector(`.gradient-type button[data-type="${randomType}"]`);
    if (randomTypeButton) randomTypeButton.click();

    // Random animation
    const shouldAnimate = Math.random() > 0.5;
    animateToggle.checked = shouldAnimate;
    isAnimating = shouldAnimate;
    animationControls.style.display = shouldAnimate ? 'block' : 'none';

    if (shouldAnimate) {
      const randomSpeed = Math.floor(Math.random() * 15 + 5);
      speed.value = randomSpeed;
      speedValue.textContent = randomSpeed;
      startAnimation();
    } else {
      stopAnimation();
    }

    updateGradient();
  }

  function resetGradient() {
    // Reset to default values
    color1.value = '#4361ee';
    color1Text.value = '#4361ee';

    color2.value = '#3a0ca3';
    color2Text.value = '#3a0ca3';

    angle.value = 135;
    angleValue.textContent = 135;

    document.querySelector('.gradient-type button[data-type="linear"]').click();

    animateToggle.checked = false;
    isAnimating = false;
    animationControls.style.display = 'none';
    stopAnimation();

    updateGradient();
  }

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  function isValidHex(color) {
    return /^#([0-9A-F]{3}){1,2}$/i.test(color);
  }

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // Changing colors on input type range track
  document.querySelectorAll('input[type="range"]').forEach((input) => {
    const updateTrack = () => {
      const val = ((input.value - input.min) / (input.max - input.min)) * 100;
      const thumbWidth = 15; // match your thumb's actual width in px
      const width = input.offsetWidth;
      const ratio = (input.value - input.min) / (input.max - input.min);

      input.style.backgroundImage = `linear-gradient(to right,var(--success),var(--primary)${val}%,var(--medium-gray) ${val}%)`;
    };
    input.addEventListener('input', updateTrack);
    updateTrack();
  });

  // Update year in footer
  function updateYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('year');

    if (!yearElement) {
      console.error('Year element not found');
      return;
    }
    yearElement.setAttribute('datetime', currentYear.toString());
    yearElement.textContent = currentYear.toString();
  }
  updateYear();
});
