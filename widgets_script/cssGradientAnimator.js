document.addEventListener('DOMContentLoaded', function () {
  const colorCountSelect = document.getElementById('colorCountSelect');
  const color1 = document.getElementById('color1');
  const color2 = document.getElementById('color2');
  const color3 = document.getElementById('color3');
  const color4 = document.getElementById('color4');
  const color5 = document.getElementById('color5');
  const colorPicker3 = document.getElementById('colorPicker3');
  const colorPicker4 = document.getElementById('colorPicker4');
  const colorPicker5 = document.getElementById('colorPicker5');
  const color1Text = document.getElementById('color1Text');
  const color2Text = document.getElementById('color2Text');
  const color3Text = document.getElementById('color3Text');
  const color4Text = document.getElementById('color4Text');
  const color5Text = document.getElementById('color5Text');
  const color1Opacity = document.getElementById('color1Opacity');
  const color2Opacity = document.getElementById('color2Opacity');
  const color3Opacity = document.getElementById('color3Opacity');
  const color4Opacity = document.getElementById('color4Opacity');
  const color5Opacity = document.getElementById('color5Opacity');
  const opacity1Value = document.getElementById('opacity1Value');
  const opacity2Value = document.getElementById('opacity2Value');
  const opacity3Value = document.getElementById('opacity3Value');
  const opacity4Value = document.getElementById('opacity4Value');
  const opacity5Value = document.getElementById('opacity5Value');
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
  updateColorInputsVisibility();
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
    if (animateToggle) {
      animateToggle.addEventListener('change', function () {
        isAnimating = this.checked;
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

        if (color3) color3.value = colors[2] || '#f72585';
        if (color3Text) color3Text.value = colors[2] || '#f72585';

        if (color4) color4.value = colors[3] || '#4895ef';
        if (color4Text) color4Text.value = colors[3] || '#4895ef';

        if (color5) color5.value = colors[4] || '#4cc9f0';
        if (color5Text) color5Text.value = colors[4] || '#4cc9f0';

        const selectedCount = Math.max(2, Math.min(5, colors.length || 2));
        if (colorCountSelect) {
          colorCountSelect.value = selectedCount.toString();
          updateColorInputsVisibility();
        }

        const typeButton = document.querySelector(`.gradient-type button[data-type="${type}"]`);
        if (typeButton) typeButton.click();
        if (angle) angle.value = presetAngle;
        if (angleValue) angleValue.textContent = presetAngle;

        updateGradient();
      });
    });
  }

  function hexToRgba(hex, opacity) {
    if (!hex || hex.length !== 7 || !hex.startsWith('#')) return hex;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return opacity < 1 ? `rgba(${r}, ${g}, ${b}, ${opacity})` : hex;
  }

  function updateGradient() {
    if (!color1 || !color2 || !angle) return;

    const colorStops = getColorStops();
    const angleVal = angle.value;

    let gradient;
    switch (currentType) {
      case 'linear':
        gradient = `linear-gradient(${angleVal}deg, ${colorStops.join(', ')})`;
        break;
      case 'radial':
        gradient = `radial-gradient(circle, ${colorStops.join(', ')})`;
        break;
      case 'conic':
        gradient = `conic-gradient(from ${angleVal}deg, ${colorStops.join(', ')})`;
        break;
      default:
        gradient = `linear-gradient(${angleVal}deg, ${colorStops.join(', ')})`;
    }

    if (gradientPreview) gradientPreview.style.background = gradient;
    updateCssCode(gradient);
  }

  function getColorStops() {
    const activeCount = Number(colorCountSelect?.value || 2);
    const colorInputs = [color1, color2, color3, color4, color5];
    const opacityInputs = [color1Opacity, color2Opacity, color3Opacity, color4Opacity, color5Opacity];

    return colorInputs.slice(0, activeCount).map((input, index) => {
      const hex = input?.value || '#000000';
      const opacity = parseFloat(opacityInputs[index]?.value ?? 1);
      return hexToRgba(hex, opacity);
    });
  }

  function updateColorInputsVisibility() {
    const activeCount = Number(colorCountSelect?.value || 2);
    if (colorPicker3) colorPicker3.style.display = activeCount >= 3 ? 'block' : 'none';
    if (colorPicker4) colorPicker4.style.display = activeCount >= 4 ? 'block' : 'none';
    if (colorPicker5) colorPicker5.style.display = activeCount >= 5 ? 'block' : 'none';
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
    // Use reversed stops for a simple complementary effect
    const colorStops = getColorStops();
    const angleVal = angle ? angle.value : 0;
    const reversedStops = colorStops.slice().reverse().join(', ');

    switch (currentType) {
      case 'linear':
        return `linear-gradient(${angleVal}deg, ${reversedStops})`;
      case 'radial':
        return `radial-gradient(circle, ${reversedStops})`;
      case 'conic':
        return `conic-gradient(from ${angleVal}deg, ${reversedStops})`;
      default:
        return `linear-gradient(${angleVal}deg, ${reversedStops})`;
    }
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

  function interpolateGradient(percentage, type, angle) {
    const colorStops = getColorStops();
    const reversedStops = colorStops.slice().reverse();

    if (percentage < 50) {
      return generateGradient(type, angle, colorStops);
    }
    return generateGradient(type, angle, reversedStops);
  }

  function generateGradient(type, angle, colorStops) {
    const stops = Array.isArray(colorStops) ? colorStops.join(', ') : colorStops;

    switch (type) {
      case 'linear':
        return `linear-gradient(${angle}deg, ${stops})`;
      case 'radial':
        return `radial-gradient(circle, ${stops})`;
      case 'conic':
        return `conic-gradient(from ${angle}deg, ${stops})`;
      default:
        return `linear-gradient(${angle}deg, ${stops})`;
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
    // Random colors for all possible stops
    const allColors = [color1, color2, color3, color4, color5];
    const allTextInputs = [color1Text, color2Text, color3Text, color4Text, color5Text];

    allColors.forEach((input, index) => {
      if (!input) return;
      input.value = getRandomColor();
      if (allTextInputs[index]) allTextInputs[index].value = input.value;
    });

    // Random opacity for visible stops
    const allOpacities = [color1Opacity, color2Opacity, color3Opacity, color4Opacity, color5Opacity];
    const allOpacityValues = [opacity1Value, opacity2Value, opacity3Value, opacity4Value, opacity5Value];
    const activeCount = Number(colorCountSelect?.value || 2);
    allOpacities.slice(0, activeCount).forEach((input, index) => {
      if (!input) return;
      const randomOpacity = (Math.random() * 1).toFixed(2);
      input.value = randomOpacity;
      if (allOpacityValues[index]) allOpacityValues[index].textContent = randomOpacity;
    });

    // Random angle
    const randomAngle = Math.floor(Math.random() * 360);
    angle.value = randomAngle;
    angleValue.textContent = randomAngle;
    angle.dispatchEvent(new Event('input'));

    // Random type
    const types = ['linear', 'radial', 'conic'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomTypeButton = document.querySelector(`.gradient-type button[data-type="${randomType}"]`);
    if (randomTypeButton) randomTypeButton.click();

    // Random animation
    const shouldAnimate = Math.random() > 0.5;
    animateToggle.checked = shouldAnimate;
    isAnimating = shouldAnimate;

    if (shouldAnimate) {
      const randomSpeed = Math.floor(Math.random() * 15 + 5);
      speed.value = randomSpeed;
      speedValue.textContent = randomSpeed;
      speed.dispatchEvent(new Event('input'));
      startAnimation();
    } else {
      stopAnimation();
    }

    updateGradient();
  }

  function resetGradient() {
    // Reset to default values
    if (colorCountSelect) colorCountSelect.value = '2';
    updateColorInputsVisibility();

    color1.value = '#4361ee';
    color1Text.value = '#4361ee';
    color1Opacity.value = 1;
    if (opacity1Value) opacity1Value.textContent = '1';

    color2.value = '#3a0ca3';
    color2Text.value = '#3a0ca3';
    color2Opacity.value = 1;
    if (opacity2Value) opacity2Value.textContent = '1';

    color3?.value && (color3.value = '#f72585');
    color3Text?.value && (color3Text.value = '#f72585');
    color3Opacity?.value && (color3Opacity.value = 1);
    if (opacity3Value) opacity3Value.textContent = '1';

    color4?.value && (color4.value = '#4895ef');
    color4Text?.value && (color4Text.value = '#4895ef');
    color4Opacity?.value && (color4Opacity.value = 1);
    if (opacity4Value) opacity4Value.textContent = '1';

    color5?.value && (color5.value = '#4cc9f0');
    color5Text?.value && (color5Text.value = '#4cc9f0');
    color5Opacity?.value && (color5Opacity.value = 1);
    if (opacity5Value) opacity5Value.textContent = '1';

    angle.value = 135;
    angleValue.textContent = 135;
    angle.dispatchEvent(new Event('input'));

    document.querySelector('.gradient-type button[data-type="linear"]').click();

    animateToggle.checked = false;
    isAnimating = false;
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

      input.style.backgroundImage = `linear-gradient(to right, var(--success) 0%, var(--primary) ${val}%, var(--medium-gray) ${val}%, var(--medium-gray) 100%)`;
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
