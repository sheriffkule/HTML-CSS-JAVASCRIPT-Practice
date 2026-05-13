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
        textColor.value = '#00ffff';
        shadowColor.value = '#00ffff';
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
      case 'gradient':
        gradientColors: [
          { color: '#ff0000', stop: 0 },
          { color: '#ffff00', stop: 50 },
          { color: '#00ff00', stop: 100 },
        ];
        updateGradientColorsUI();
        gradientType.value = 'linear';
        gradientAngle.value = 90;
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
    valueElement.textContent = rangeInput.value + suffix;
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

  fontFamily.addEventListener('change', updateTextPreview);
  textColor.addEventListener('input', updateTextPreview);
  bgColor.addEventListener('input', updateTextPreview);
  shadowColor.addEventListener('input', updateTextPreview);
  shadowMultiple.addEventListener('change', updateTextPreview);
  gradientType.addEventListener('change', updateTextPreview);
  outlineColor.addEventListener('input', updateTextPreview);
  outlineStyle.addEventListener('change', updateTextPreview);
  animationColor.addEventListener('change', updateTextPreview);
  animationIteration.addEventListener('change', updateTextPreview);
  animationColor.addEventListener('input', updateTextPreview);

  // Show/hide animation color based on animation type
  animationType.addEventListener('change', function () {
    this.value === 'color-change'
      ? (animationColor.style.display = 'block')
      : (animationColor.style.display = 'none');
    updateTextPreview();
  });

  // Update text preview with all styles
  function updateTextPreview() {
    // Basic styles
    textPreview.style.fontFamily = fontFamily.value;
    textPreview.style.fontSize = `${fontSize.value}px`;
    textPreview.style.color = textColor.value;
    document.querySelector('.preview-container').style.backgroundColor = bgColor.value;

    // Shadow effect
    const shadowOpacityValue = shadowOpacity.value / 100;
    const shadowColorValue = hexToRgba(shadowColor.value, shadowOpacityValue);

    if (shadowMultiple.checked) {
      textPreview.style.textShadow = `
        ${shadowHOffset.value}px ${shadowVOffset.value}px ${shadowBlur.value}px ${shadowColorValue},
        ${-shadowHOffset.value}px ${-shadowVOffset.value}px ${shadowBlur.value}px ${shadowColorValue}
      `;
    } else {
      textPreview.style.textShadow = `${shadowHOffset.value}px ${shadowVOffset.value}px ${shadowBlur.value}px ${shadowColorValue}`;
    }

    // Gradient effect
    if (gradientType.value === 'none') {
      textPreview.style.background = 'none';
      textPreview.style.backgroundClip = '';
      textPreview.style.webkitBackgroundClip = '';
      textPreview.style.color = textColor.value;
    } else {
      const gradientStops = gradientColors.map((c) => `${c.color} ${c.stop}%`).join(', ');
      textPreview.style.background =
        gradientType.value === 'linear'
          ? `linear-gradient(${gradientAngle.value}deg, ${gradientStops})`
          : `radial-gradient(circle, ${gradientStops})`;
      textPreview.style.backgroundClip = 'text';
      textPreview.style.webkitBackgroundClip = 'text';
      textPreview.style.color = 'transparent';
    }

    // Outline Effect
    textPreview.style.webkitTextStroke = `${outlineWidth.value}px ${outlineColor.value}`;
    textPreview.style.textStroke = `${outlineWidth.value}px ${outlineColor.value}`;

    // Animation
    textPreview.classList.remove(
      'pulse-animation',
      'glow-animation',
      'shake-animation',
      'color-change-animation',
    );

    if (animationType.value !== 'none') {
      textPreview.classList.add(`${animationType.value}-animation`);
      textPreview.style.animationDuration = `${animationDuration.value}s`;
      textPreview.style.animationIterationCount =
        animationIteration.value === 'infinite' ? 'infinite' : animationIteration.value;

      if (animationType.value === 'color-change') {
        document.documentElement.style.setProperty('--animation-color', animationColor.value);
      }
    }

    updateCssOutput();
  }

  // Convert hex colors to rgba
  function hexToRgba(hex, opacity) {
    let r = 0;
    let g = 0;
    let b = 0;

    // 3 digits
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    }
    // 6 digits
    if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  // Update CSS output
  function updateCssOutput() {
    let css = `/* Text Styles */\n`;
    css += `.text-effect {\n}`;
    css += `   font-family: ${fontFamily.value};\n`;
    css += `   font-size: ${fontSize.value}px;\n`;
    css += `   color: ${textColor.value};\n`;

    // Shadow
    const shadowOpacityValue = shadowOpacity.value / 100;
    const shadowColorValue = hexToRgba(shadowColor.value, shadowOpacityValue);

    if (shadowMultiple.checked) {
      css += `   text-shadow: \n`;
      css += `   ${shadowHOffset.value}px ${shadowVOffset.value}px ${shadowBlur.value}px ${shadowColor.value};\n`;
      css += `   ${-shadowHOffset.value}px ${-shadowVOffset.value}px ${shadowBlur.value}px ${shadowColor.value};\n`;
    } else {
      css += `   text-shadow: ${shadowHOffset.value}px ${shadowVOffset.value}px ${shadowBlur.value}px ${shadowColor.value};\n`;
    }

    // Gradient
    if (gradientType.value !== 'none') {
      const gradientStops = gradientColors.map((c) => `${c.color} ${c.stop}%`).join(', ');
      css +=
        gradientType.value === 'linear'
          ? `   background: linear-gradient(${gradientAngle.value}deg, ${gradientStops});\n`
          : `   background: radial-gradient(circle, ${gradientStops});\n`;
      css += `   -webkit-background-clip: text;\n`;
      css += `   background-clip: text;\n`;
      css += `   color: transparent;\n`;
    }

    // Outline
    css += `   -webkit-text-stroke: ${outlineWidth.value}px ${outlineStyle.value} ${outlineColor.value};\n`;
    css += `   text-stroke: ${outlineWidth.value}px ${outlineStyle.value} ${outlineColor.value};\n`;

    // Animation
    if (animationType !== 'none') {
      css += `   animation: ${animationType.value}-animation ${animationDuration.value}s ${animationIteration.value === 'infinite' ? 'infinite' : animationIteration.value};\n`;
    }

    css += `}\n\n`;

    // Animation keyframes
    if (animationType.value !== 'none') {
      css += `/* Animation Keyframes */\n`;
      switch (animationType.value) {
        case 'pulse':
          css += `@keyframes pulse-animation {\n`;
          css += `   0% { transform: scale(1); }\n`;
          css += `   50% { transform: scale(1.05); }\n`;
          css += `   100% { transform: scale(1); }\n`;
          css += `}\n`;
          break;
        case 'glow':
          css += `@keyframes glow-animation {\n`;
          css += `   0% { text-shadow: 0 0 5px currentColor; }\n`;
          css += `   50% { text-shadow: 0 0 20px currentColor; }\n`;
          css += `   100% { text-shadow: 0 0 5px currentColor; }\n`;
          css += `}\n`;
          break;
        case 'shake':
          css += `@keyframes shake-animation {\n`;
          css += `   0%, 100% { transform: translateX(0); }\n`;
          css += `   20% { transform: translateX(-5px); }\n`;
          css += `   40% { transform: translateX(5px); }\n`;
          css += `   60% { transform: translateX(-5px); }\n`;
          css += `   80% { transform: translateX(5px); }\n`;
          css += `}\n`;
          break;
        case 'float':
          css += `@keyframes float-animation {\n`;
          css += `   0%, 100% { transform: translateY(0); }\n`;
          css += `   50% { transform: translate(-10px); };\n`;
          css += `}\n`;
          break;
        case 'color-change':
          css += `@keyframes color-change-animation {\n`;
          css += `   0% { color: currentColor; }\n`;
          css += `   50% { color: ${animationColor.value}; }\n`;
          css += `   100% { color: currentColor; }\n`;
          css += `}\n`;
          break;
      }
    }

    cssOutput.value = css;
  }

  // Copy CSS to clipboard
  copyCssBtn.addEventListener('click', () => {
    cssOutput.select();
    document.execCommand('copy');

    // Show tooltip
    tooltip.style.opacity = '1';
    setTimeout(() => {
      tooltip.style.opacity = '0';
    }, 2000);
  });

  // Download as image
  downloadImgBtn.addEventListener('click', () => {
    const preview = document.querySelector('.preview-container');
    const textElement = document.getElementById('text-preview');

    // Get computed style
    const styles = window.getComputedStyle(textElement);
    const fontSize = styles.getPropertyValue('font-size');
    const fontFamily = styles.getPropertyValue('font-family');
    const color = styles.getPropertyValue('color');
    const textShadow = styles.getPropertyValue('text-shadow');
    const background = styles.getPropertyValue('background');
    const backgroundClip = styles.getPropertyValue('background-clip');
    const webkitTextStroke = styles.getPropertyValue('-webkit-text-stroke');

    // Set canvas dimensions
    canvas.width = preview.offsetWidth;
    canvas.height = preview.offsetHeight;

    // Draw background
    ctx.fillStyle = bgColor.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set text styles
    ctx.font = `${fontSize} ${fontFamily}`;

    // Handle gradient fill
    if (gradientType !== 'none') {
      let gradient;

      if (gradientType.value === 'linear') {
        gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      } else {
        gradient = ctx.createRadialGradient(
          canvas.width / 2,
          canvas.height,
          0,
          canvas.width / 2,
          canvas.height / 2,
          Math.max(canvas.width, canvas.height) / 2,
        );
      }

      gradientColors.forEach((colorObj) => {
        gradient.addColorStop(colorObj.stop / 100, colorObj.color);
      });

      ctx.fillStyle = gradient;
    } else {
      ctx.fillStyle = color;
    }

    // Handle text shadow
    if (textShadow !== 'none') {
      const shadows = textShadow.split(', ');
      shadows.forEach((shadow) => {
        const parts = shadow.split(' ');
        const x = parseInt(parts[0]);
        const y = parseInt(parts[1]);
        const blur = parseInt(parts[2]);
        const shadowColor = parts.slice(3).join(' ');

        ctx.shadowOffsetX = x;
        ctx.shadowOffsetY = y;
        ctx.shadowBlur = blur;
        ctx.shadowColor = shadowColor;
      });
    }

    // Handle outline
    if (webkitTextStroke !== 'none') {
      const parts = webkitTextStroke.split(' ');
      const width = parseFloat(parts[0]);
      const strokeColor = parts.slice(1).join(' ');

      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = width * 2;
      ctx.strokeText(textElement.textContent, canvas.width / 2, canvas.height / 2);
    }

    // Draw text
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(textElement.textContent, canvas.width / 2, canvas.height / 2);

    // Create download link
    const link = document.createElement('a');
    link.download = 'text-effect.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });

  // Initialize
  updateGradientColorsUI();
  updateTextPreview();
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
