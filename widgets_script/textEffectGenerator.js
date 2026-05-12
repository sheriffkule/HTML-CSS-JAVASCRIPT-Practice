document.addEventListener('DOMContentLoaded', function () {
  const textPreview = document.getElementById('text-preview');
  const textInput = document.getElementById('text-input');
  const fontFamily = document.getElementById('font-family');
  const fontSize = document.getElementById('font-size');
  const fontSizeValue = document.getElementById('font-size-value');
  const textColor = document.getElementById('text-color');
  const bgColor = document.getElementById('bg-color');
  const shadowColor = document.getElementById('shadow-color');
  const shadowHOffset = document.getElementById('shadow-h-offset');
  const shadowHOffsetValue = document.getElementById('shadow-h-offset-value');
  const shadowVOffset = document.getElementById('shadow-v-offset');
  const shadowVOffsetValue = document.getElementById('shadow-v-offset-value');
  const shadowBlur = document.getElementById('shadow-blur');
  const shadowBlurValue = document.getElementById('shadow-blur-value');
  const shadowOpacity = document.getElementById('shadow-opacity');
  const shadowOpacityValue = document.getElementById('shadow-opacity-value');
  const shadowMultiple = document.getElementById('shadow-multiple');
  const gradientType = document.getElementById('gradient-type');
  const gradientAngle = document.getElementById('gradient-angle');
  const gradientAngleValue = document.getElementById('gradient-angle-value');
  const outlineColor = document.getElementById('outline-color');
  const outlineWidth = document.getElementById('outline-width');
  const outlineWidthValue = document.getElementById('outline-width-value');
  const outlineStyle = document.getElementById('outline-style');
  const animationType = document.getElementById('animation-type');
  const animationDuration = document.getElementById('animation-duration');
  const animationDurationValue = document.getElementById('animation-duration-value');
  const animationIteration = document.getElementById('animation-iteration');
  const animationColor = document.getElementById('animation-color');
  const animationColorGroup = document.getElementById('animation-color-group');
  const addGradientColorBtn = document.getElementById('add-gradient-color');
  const removeGradientColorBtn = document.getElementById('remove-gradient-color');
  const copyCssBtn = document.getElementById('copy-css');
  const downloadImgBtn = document.getElementById('download-img');
  const cssOutput = document.getElementById('css-output');
  const tooltip = document.querySelector('.tooltip');
  const themeSwitch = document.getElementById('theme-switch');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  // Tab functionality
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');

      // Remove active class from all buttons and contents
      tabBtns.forEach((b) => b.classList.remove('active'));
      tabContents.forEach((c) => c.classList.remove('active'));

      // Add active class to clicked button and corresponding content
      btn.classList.add('active');
      document.getElementById(`${tabId}-tab`).classList.add('active');
    });
  });

  // Initialize gradient colors array
  let gradientColors = [
    { color: '#ff0000', stop: 0 },
    { color: '#ffff00', stop: 50 },
    { color: '#00ff00', stop: 100 },
  ];

  // Update gradient colors UI
  function updateGradientColorsUI() {
    const gradientColorsContainer = document.querySelector('.gradient-colors');
    gradientColorsContainer.innerHTML = '';

    gradientColors.forEach((colorObj, index) => {
      const colorDiv = document.createElement('div');
      colorDiv.className = 'gradient-color';

      const colorInput = document.createElement('input');
      colorInput.type = 'color';
      colorInput.id = `gradient-color-${index + 1}`;
      colorInput.value = colorObj.color;

      const stopInput = document.createElement('input');
      stopInput.type = 'range';
      stopInput.className = 'gradient-stop';
      stopInput.min = '0';
      stopInput.max = '100';
      stopInput.value = colorObj.stop;

      const stopValue = document.createElement('span');
      stopValue.textContent = `${colorObj.stop}%`;

      colorInput.addEventListener('change', () => {
        gradientColors[index].color = colorInput.value;
        updateTextPreview();
      });

      stopInput.addEventListener('input', () => {
        gradientColors[index].stop = parseInt(stopInput.value);
        stopValue.textContent = `${stopInput.value}%`;
        updateTextPreview();
      });

      colorDiv.appendChild(colorInput);
      colorDiv.appendChild(stopInput);
      colorDiv.appendChild(stopValue);
      gradientColorsContainer.appendChild(colorDiv);
    });
  }

  // Changing colors on input type range track
  document.querySelectorAll('input[type="range"]').forEach((input) => {
    const updateTrack = () => {
      const val = ((input.value - input.min) / (input.max - input.min)) * 100;
      input.style.backgroundImage = `linear-gradient(to right, var(--primary), var(--success) ${val}%,
      var(--secondary) ${val}%)`;
    };
    input.addEventListener('input', updateTrack);
    updateTrack();
  });

  // Add gradient color
  addGradientColorBtn.addEventListener('click', () => {
    if (gradientColors.length < 5) {
      const lastStop = gradientColors[gradientColors.length - 1].stop;
      const newStop = lastStop + (100 - lastStop) / 2;

      gradientColors.push({
        color: '#0000ff',
        stop: Math.min(Math.round(newStop), 100),
      });

      updateGradientColorsUI();
      updateTextPreview();
    }
  });

  // Remove gradient color
  removeGradientColorBtn.addEventListener('click', () => {
    if (gradientColors.length > 2) {
      gradientColors.pop();
      updateGradientColorsUI();
      updateTextPreview();
    }
  });

  // Preset functionality
  const presets = document.querySelectorAll('.preset');
  presets.forEach((preset) => {
    preset.addEventListener('click', () => {
      const presetType = preset.getAttribute('data-preset');
      applyPreset(presetType);
    });
  });

  function applyPreset(presetType) {
    // Reset all animation first
    textPreview.classList.remove(
      'pulse-animation',
      'glow-animation',
      'shake-animation',
      'color-change-animation',
    );

    switch (presetType) {
      case 'neon':
        textColor.value = '#0ff';
        shadowColor.value = '#0ff';
        shadowHOffset.value = '0';
        shadowVOffset.value = '0';
        shadowBlur.value = '20';
        shadowOpacity.value = '100';
        shadowMultiple.checked = true;
        animationType.value = 'glow';
        break;
      case 'vintage':
        textColor.value = '#8b4513';
        shadowColor.value = '#000000';
        shadowHOffset.value = '2';
        shadowVOffset.value = '3';
        shadowBlur.value = '4';
        shadowOpacity.value = '50';
        shadowMultiple.checked = false;
        break;
      case '3d':
        textColor.value = '#ffffff';
        shadowColor.value = '#999999';
        shadowHOffset.value = '2';
        shadowVOffset.value = '2';
        shadowBlur.value = '0';
        shadowOpacity.value = '100';
        shadowMultiple.checked = true;
        break;
      case 'outline':
        outlineColor.value = '#000000';
        outlineWidth.value = '2';
        outlineStyle.value = 'solid';
        break;
      case 'fire':
        textColor.value = '#ff4500';
        shadowColor.value = 'ff4500';
        shadowHOffset.value = '0';
        shadowVOffset.value = '0';
        shadowBlur.value = '10';
        shadowOpacity.value = '100';
        shadowMultiple.checked = true;
        animationType.value = 'glow';
        break;
    }

    updateTextPreview();
  }

  // Theme switcher
  themeSwitch.addEventListener('change', function () {
    if (this.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  });

  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeSwitch.checked = true;
  }

  // Update range value displays
  function updateRangeValueDisplay(rangeInput, valueElement, suffix = '') {
    valueElement.textColor = rangeInput.value + suffix;
  }

  // Event listeners for range inputs
  fontSize.addEventListener('input', () => {
    updateRangeValueDisplay(fontSize, fontSizeValue, 'px');
    updateTextPreview();
  });

  shadowHOffset.addEventListener('input', () => {
    updateRangeValueDisplay(shadowHOffset, shadowHOffsetValue, 'px');
    updateTextPreview();
  });

  shadowVOffset.addEventListener('input', () => {
    updateRangeValueDisplay(shadowVOffset, shadowVOffsetValue, 'px');
    updateTextPreview();
  });

  shadowBlur.addEventListener('input', () => {
    updateRangeValueDisplay(shadowBlur, shadowBlurValue, 'px');
    updateTextPreview();
  });

  shadowOpacity.addEventListener('input', () => {
    updateRangeValueDisplay(shadowOpacity, shadowOpacityValue, '%');
    updateTextPreview();
  });

  gradientAngle.addEventListener('input', () => {
    updateRangeValueDisplay(gradientAngle, gradientAngleValue, '°');
    updateTextPreview();
  });

  outlineWidth.addEventListener('input', () => {
    updateRangeValueDisplay(outlineWidth, outlineWidthValue, 'px');
    updateTextPreview();
  });

  animationDuration.addEventListener('input', () => {
    updateRangeValueDisplay(animationDuration, animationDurationValue, 's');
  });

  // Event listeners for other inputs
  textInput.addEventListener('input', () => {
    textPreview.textContent = textInput.value;
    updateCssOutput();
  });

  textPreview.addEventListener('input', () => {
    textInput.value = textPreview.textContent;
    updateCssOutput();
  });
});
