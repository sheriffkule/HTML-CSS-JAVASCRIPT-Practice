document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const previewText = document.getElementById('preview-text');
  const previewContainer = document.getElementById('preview-container');
  const textInput = document.getElementById('text-input');
  const fontFamily = document.getElementById('font-family');
  const fontSize = document.getElementById('font-size');
  const fontSizeValue = document.getElementById('font-size-value');
  const fontWeight = document.getElementById('font-weight');
  const fontWeightValue = document.getElementById('font-weight-value');
  const lineHeight = document.getElementById('line-height');
  const lineHeightValue = document.getElementById('line-height-value');
  const letterSpacing = document.getElementById('letter-spacing');
  const letterSpacingValue = document.getElementById('letter-spacing-value');
  const textColor = document.getElementById('text-color');
  const textAlignBtns = document.querySelectorAll('.align-btn');
  const textTransform = document.getElementById('text-transform');
  const fontStyle = document.getElementById('font-style');

  // Effects
  const textShadowToggle = document.getElementById('text-shadow-toggle');
  const shadowControls = document.getElementById('shadow-controls');
  const shadowH = document.getElementById('shadow-h');
  const shadowHValue = document.getElementById('shadow-h-value');
  const shadowV = document.getElementById('shadow-v');
  const shadowVValue = document.getElementById('shadow-v-value');
  const shadowBlur = document.getElementById('shadow-blur');
  const shadowBlurValue = document.getElementById('shadow-blur-value');
  const shadowColor = document.getElementById('shadow-color');

  const textOutlineToggle = document.getElementById('text-outline-toggle');
  const outlineControls = document.getElementById('outline-controls');
  const outlineWidth = document.getElementById('outline-width');
  const outlineWidthValue = document.getElementById('outline-width-value');
  const outlineColor = document.getElementById('outline-color');

  const textGradientToggle = document.getElementById('text-gradient-toggle');
  const gradientControls = document.getElementById('gradient-controls');
  const gradientType = document.getElementById('gradient-type');
  const gradientDirection = document.getElementById('gradient-direction');
  const gradientDirectionValue = document.getElementById('gradient-direction-value');
  const gradientColors = document.getElementById('gradient-colors');
  const addGradientColor = document.getElementById('add-gradient-color');

  // Background
  const bgColor = document.getElementById('bg-color');
  const bgGradientToggle = document.getElementById('bg-gradient-toggle');
  const bgGradientControls = document.getElementById('bg-gradient-controls');
  const bgGradientType = document.getElementById('bg-gradient-type');
  const bgGradientDirection = document.getElementById('bg-gradient-direction');
  const bgGradientDirectionValue = document.getElementById('bg-gradient-direction-value');
  const bgGradientColors = document.getElementById('bg-gradient-colors');
  const addBgGradientColor = document.getElementById('add-bg-gradient-color');
  const bgPadding = document.getElementById('bg-padding');
  const bgPaddingValue = document.getElementById('bg-padding-value');
  const bgBorderRadius = document.getElementById('bg-border-radius');
  const bgBorderRadiusValue = document.getElementById('bg-border-radius-value');
  const bgBorderToggle = document.getElementById('bg-border-toggle');
  const borderControls = document.getElementById('border-controls');
  const borderWidth = document.getElementById('border-width');
  const borderWidthValue = document.getElementById('border-width-value');
  const borderColor = document.getElementById('border-color');
  const borderStyle = document.getElementById('border-style');

  // Presets
  const presetName = document.getElementById('preset-name');
  const savePreset = document.getElementById('save-preset');
  const presetsList = document.getElementById('presets-list');

  // Code
  const generatedCss = document.getElementById('generated-css');
  const copyCss = document.getElementById('copy-css');

  // Theme
  const themeToggle = document.querySelector('.theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  // Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContent = document.querySelectorAll('.tab-content');

  // Initialize
  updatePreview();
  updateCssCode();

  // Event Listeners
  // Text controls
  textInput.addEventListener('input', updatePreview);
  fontFamily.addEventListener('change', updatePreview);
  fontSize.addEventListener('input', function () {
    fontSizeValue.textContent = `${this.value}px`;
    updatePreview();
  });

  fontWeight.addEventListener('input', function () {
    fontWeightValue.textContent = this.value;
    updatePreview;
  });

  lineHeight.addEventListener('input', function () {
    lineHeightValue.textContent = this.value;
    updatePreview;
  });

  letterSpacing.addEventListener('input', function () {
    letterSpacingValue.textContent = `${this.value}px`;
  });

  textColor.addEventListener('input', updatePreview);

  textAlignBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      textAlignBtns.forEach((b) => b.classList.remove('active'));
      this.classList.add('active');
      updatePreview();
    });
  });

  textTransform.addEventListener('change', updatePreview);
  fontStyle.addEventListener('change', updatePreview);

  //   // Effects - toggle control panels visibility
  //   [
  //     [textShadowToggle, shadowControls],
  //     [textOutlineToggle, outlineControls],
  //     [textGradientToggle, gradientControls],
  //     [bgGradientToggle, bgGradientControls],
  //     [bgBorderToggle, borderControls],
  //   ].forEach(([toggle, panel]) => {
  //     panel.style.display = toggle.checked ? 'block' : 'none';
  //     toggle.addEventListener('change', function () {
  //       panel.style.display = this.checked ? 'block' : 'none';
  //       updatePreview();
  //     });
  //   });

  textShadowToggle.addEventListener('change', updatePreview);
  shadowH.addEventListener('input', function () {
    shadowHValue.textContent = `${this.value}px`;
    updatePreview();
  });

  shadowV.addEventListener('input', function () {
    shadowVValue.textContent = `${this.value}px`;
    updatePreview();
  });

  shadowBlur.addEventListener('input', function () {
    shadowBlurValue.textContent = `${this.value}px`;
    updatePreview();
  });

  shadowColor.addEventListener('input', updatePreview);
  textOutlineToggle.addEventListener('change', updatePreview);

  outlineWidth.addEventListener('input', function () {
    outlineWidthValue.textContent = `${this.value}px`;
    updatePreview();
  });

  outlineColor.addEventListener('input', updatePreview);
  textGradientToggle.addEventListener('change', updatePreview);
  gradientType.addEventListener('change', updatePreview);

  gradientDirection.addEventListener('input', function () {
    gradientDirectionValue.textContent = `${this.value}°`;
    updatePreview();
  });

  // Gradient color management
  addGradientColor.addEventListener('click', function () {
    const colorDiv = document.createElement('div');
    colorDiv.className = 'gradient-color';
    colorDiv.innerHTML = `
      <input type="color" class="gradient-color-input" value="#00ff00" />
      <button class="remove-gradient-color">
        <span class="material-symbols-outlined">close</span>
      </button>
    `;
    gradientColors.appendChild(colorDiv);

    const colorInput = colorDiv.querySelector('.gradient-color-input');
    const removeBtn = colorDiv.querySelector('.remove-gradient-color');

    colorInput.addEventListener('input', updatePreview);
    removeBtn.addEventListener('click', function () {
      gradientColors.removeChild(colorDiv);
      updatePreview();
    });
  });

  // Initialize gradient color event listeners
  document.querySelectorAll('.gradient-color-input').forEach((input) => {
    input.addEventListener('input', updatePreview);
  });

  document.querySelectorAll('.remove-gradient-color').forEach((btn) => {
    btn.addEventListener('click', function () {
      if (gradientColors.children.length > 1) {
        gradientColors.removeChild(this.parentElement);
        updatePreview();
      }
    });
  });

  // Background controls
  bgColor.addEventListener('input', updatePreview);
  bgGradientToggle.addEventListener('change', updatePreview);
  bgGradientType.addEventListener('change', updatePreview);

  bgGradientDirection.addEventListener('input', function () {
    bgGradientDirectionValue.textContent = `${this.value}°`;
    updatePreview();
  });

  bgPadding.addEventListener('input', function () {
    bgPaddingValue.textContent = `${this.value}px`;
    updatePreview();
  });

  bgBorderRadius.addEventListener('input', function () {
    bgBorderRadius.textContent = `${this.value}px`;
    updatePreview();
  });

  bgBorderToggle.addEventListener('change', updatePreview);

  borderWidth.addEventListener('input', function () {
    borderWidthValue.textContent = `${this.value}px`;
    updatePreview();
  });

  borderColor.addEventListener('input', updatePreview);
  borderStyle.addEventListener('change', updatePreview);

  // Background gradient color management
  addBgGradientColor.addEventListener('click', function () {
    const colorDiv = document.createElement('div');
    colorDiv.className = 'gradient-color';
    colorDiv.innerHTML = `
      <input type="color" class="bg-gradient-color-input" value="#cccccc" />
      <button class="remove-bg-gradient-color">
        <span class="material-symbols-outlined">close</span>
      </button>
    `;
    gradientColors.appendChild(colorDiv);

    const colorInput = colorDiv.querySelector('.bg-gradient-color-input');
    const removeBtn = colorDiv.querySelector('.remove-bg-gradient-color');

    colorInput.addEventListener('input', updatePreview);
    removeBtn.addEventListener('click', function () {
      if (bgGradientColors.children.length > 1) {
        bgGradientColors.removeChild(colorDiv);
        updatePreview();
      }
    });
  });

  // Initialize background gradient color event listeners
  document.querySelectorAll('.bg-gradient-color-input').forEach((input) => {
    input.addEventListener('input', updatePreview);
  });

  document.querySelectorAll('.remove-bg-gradient-color').forEach((btn) => {
    btn.addEventListener('click', function () {
      if (bgGradientColors.children.length > 1) {
        bgGradientColors.removeChild(this.parentElement);
        updatePreview();
      }
    });
  });

  // Presets
  savePreset.addEventListener('click', saveCurrentPreset);

  // Code
  copyCss.addEventListener('click', copyCssToClipboard);

  // Theme
  themeToggle.addEventListener('click', toggleTheme);

  // Tabs
  tabBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      const tabId = this.getAttribute('data-tab');

      // Update active tab button
      tabBtns.forEach((btn) => btn.classList.remove('active'));
      this.classList.add('active');

      // Show corresponding content
      tabContent.forEach((content) => content.classList.remove('active'));
      document.getElementById(`${tabId}-tab`).classList.add('active');
    });
  });

  // Functions
  function updatePreview() {
    // Update text content
    previewText.textContent = textInput.value;

    // Text styles
    previewText.style.fontFamily = fontFamily.value;
    previewText.style.fontSize = `${fontSize.value}px`;
    previewText.style.fontWeight = fontWeight.value;
    previewText.style.lineHeight = lineHeight.value;
    previewText.style.letterSpacing = `${letterSpacing.value}px`;
    previewText.style.color = textColor.value;

    // Text alignment
    const activeAlignBtn = document.querySelector('.align-btn.active');
    if (activeAlignBtn) previewText.style.textAlign = activeAlignBtn.value;

    // Text transform
    previewText.style.textTransform = textTransform.value;

    // Font style
    previewText.style.fontStyle = fontStyle.value;

    // Text shadow
    if (textShadowToggle.checked) {
      previewText.style.textShadow = `${shadowH.value}px ${shadowV.value}px ${shadowBlur.value}px
      ${shadowColor.value}`;
    } else {
      previewText.style.textShadow = 'none';
    }

    // Text outline
    if (textOutlineToggle.checked) {
      previewText.style.webkitTextStroke = `${outlineWidth.value}px ${outlineColor.value}`;
      previewText.style.textStroke = `${outlineWidth.value}px ${outlineColor.value}`;
    } else {
      previewText.style.webkitTextStroke = '';
      previewText.style.textStroke = '';
    }

    // Text gradient
    if (textGradientToggle.checked) {
      const colors = Array.from(document.querySelectorAll('.gradient-color-input')).map(
        (input) => input.value,
      );
      if (colors.length > 1) {
        let gradient;
        if (gradientType.value === 'linear') {
          gradient = `linear-gradient(${gradientDirection.value}deg, ${colors.join(', ')})`;
        } else {
          gradient = `radial-gradient(${colors.join(', ')})`;
        }
        previewText.style.background = gradient;
        previewText.style.webkitBackgroundClip = 'text';
        previewText.style.backgroundClip = 'text';
        previewText.style.color = 'transparent';
      }
    } else {
      previewText.style.background = '';
      previewText.style.webkitBackgroundClip = '';
      previewText.style.backgroundClip = '';
      previewText.style.color = textColor.value;
    }

    // Background styles
    if (bgGradientToggle.checked) {
      const colors = Array(document.querySelectorAll('.bg-gradient-color-input')).map((input) => input.value);
      if (colors.length > 1) {
        let gradient;
        if (bgGradientType.value === 'linear') {
          gradient = `linear-gradient(${bgGradientDirection.value}deg, ${colors.join(', ')})`;
        } else {
          gradient = `radial-gradient(${colors.join(', ')})`;
        }
        previewContainer.style.background = gradient;
      }
    } else {
      previewContainer.style.background = bgColor.value;
    }

    // Container styles
    previewContainer.style.padding = `${bgPadding.value}pg`;
    previewContainer.style.borderRadius = `${bgBorderRadius.value}px`;

    // Border styles
    if (bgBorderToggle.checked) {
      previewContainer.style.border = `${borderWidth.value}px ${borderStyle.value} ${borderColor.value}`;
    } else {
      previewContainer.style.border = '';
    }

    // Update CSS code
    updateCssCode();
  }

  function updateCssCode() {
    let cssCode = `/* Text Styles */\n`;
    cssCode += `.your-text {\n`;
    cssCode += `  font-family: ${fontFamily.value};\n`;
    cssCode += `  font-size: ${fontSize.value}px;\n`;
    cssCode += `  font-weight: ${fontWeight.value};\n`;
    cssCode += `  line-height: ${lineHeight.value};\n`;
    cssCode += `  letter-spacing: ${letterSpacing.value}px'\n`;

    if (textGradientToggle.checked) {
      const colors = Array.from(document.querySelectorAll('.gradient-color-input')).map(
        (input) => input.value,
      );
      if (colors.length > 1) {
        let gradient;
        if (gradientType.value === 'linear') {
          gradient = `linear-gradient(${gradientDirection.value}deg, ${colors.join(', ')})`;
        } else {
          gradient = `radial-gradient(${colors.join(', ')})`;
        }
        cssCode += `  background: ${gradient};\n`;
        cssCode += `  -webkit-background-clip: text;\n`;
        cssCode += `  background-clip: text;\n`;
        cssCode += `  color: transparent;\n`;
      }
    } else {
      cssCode += `  color: ${textColor.value}`;
    }

    const activeAlignBtn = document.querySelector('.align-btn.active');
    if (activeAlignBtn) {
      cssCode += `  text-align: ${activeAlignBtn.value};\n`;
    }

    cssCode += `  text-transform: ${textTransform.value};\n`;
    cssCode += `  font-style: ${fontStyle.value};\n`;

    if (textShadowToggle.checked) {
      cssCode += ` text-shadow: ${shadowH.value}px ${shadowV.value}px ${shadowBlur.value}px
      ${shadowColor.value}`;
    }

    if (textOutlineToggle.checked) {
      cssCode += `  -webkit-text-stroke: ${outlineWidth.value}px ${outlineColor.value};\n`;
      cssCode += `  text-stroke: ${outlineWidth.value}px ${outlineColor.value};\n`;
    }

    cssCode += `}\n\n`;

    cssCode += `/* Container Styles */\n`;
    cssCode += `.your-container {\n`;

    if (bgGradientToggle.checked) {
      const colors = Array.from(document.querySelectorAll('.bg-gradient-color-input')).map(
        (input) => input.value,
      );
      if (colors.length > 1) {
        let gradient;
        if (bgGradientType.value === 'linear') {
          gradient = `linear-gradient(${bgGradientDirection.value}deg, ${colors.join(', ')})`;
        } else {
          gradient = `radial-gradient(${colors.join(', ')})`;
        }
        cssCode += `  background: ${gradient};\n`;
      }
    } else {
      cssCode += `  color: ${bgColor.value}`;
    }

    cssCode += `  padding: ${bgPadding.value}px;\n`;
    cssCode += `  border-radius: ${bgBorderRadius.value}px;\n`;

    if (bgBorderToggle.checked) {
      cssCode += `  border: ${borderWidth.value}px ${borderStyle.value} ${borderColor.value};\n`;
    }

    cssCode += `}`;

    generatedCss.textContent = cssCode;
  }

  function copyCssToClipboard() {
    const cssText = generatedCss.textContent;
    navigator.clipboard
      .writeText(cssText)
      .then(() => {
        const originalText = copyCss.innerHTML;
        copyCss.innerHTML = '<span class="material-symbols-outlined">check</span> Copied!';
        setTimeout(() => {
          copyCss.innerHTML = originalText;
        }, 2000);
      })
      .catch((err) => {
        console.error('Failed to copy CSS: ', err);
        alert('Failed to copy CSS: ', err);
      });
  }

  function saveCurrentPreset() {
    const name = presetName.value.trim();
    if (!name) {
      alert('Please enter a name for your preset.');
      return;
    }

    const preset = {
      name,
      text: textInput.value,
      fontFamily: fontFamily.value,
      fontSize: fontSize.value,
      fontWeight: fontWeight.value,
      lineHeight: lineHeight.value,
      letterSpacing: letterSpacing.value,
      textColor: textColor.value,
      textAlign: document.querySelector('.align-btn.active')?.value || 'left',
      textTransform: textTransform.value,
      fontStyle: fontStyle.value,
      textShadow: {
        enabled: textShadowToggle.checked,
        h: shadowH.value,
        v: shadowV.value,
        blur: shadowBlur.value,
        color: shadowColor.value,
      },
      textOutline: {
        enabled: textOutlineToggle.checked,
        width: outlineWidth.value,
        color: outlineColor.value,
      },
      textGradient: {
        enabled: textGradientToggle.checked,
        type: gradientType.value,
        direction: gradientDirection.value,
        colors: Array.from(document.querySelectorAll('.gradient-color-input')).map((input) => input.value),
      },
      background: {
        color: bgColor.value,
        gradient: {
          enabled: bgGradientToggle.checked,
          type: bgGradientType.value,
          direction: bgGradientDirection.value,
          colors: Array.from(document.querySelectorAll('.bg-gradient-color-input')).map(
            (input) => input.value,
          ),
        },
        padding: bgPadding.value,
        borderRadius: bgBorderRadius.value,
        border: {
          enabled: bgBorderToggle.checked,
          width: borderWidth.value,
          color: borderColor.value,
          style: borderStyle.value,
        },
      },
    };

    let presets = JSON.parse(localStorage.getItem('fontPresets') || '[]');
    presets.push(preset);
    localStorage.setItem('fontPresets', JSON.stringify(presets));

    presetName.value = '';
    loadPresets();
  }

  // Changing colors on input type range track
  document.querySelectorAll('input[type="range"]').forEach((input) => {
    const updateTrack = () => {
      const min = parseFloat(input.min) || 0;
      const max = parseFloat(input.max) || 100;
      const value = parseFloat(input.value);
      const ratio = Math.min(Math.max((value - min) / (max - min), 0), 1);
      const val = ratio * 100;

      input.style.backgroundImage = `linear-gradient(to right, var(--primary) 0%, var(--success) ${val}%, var(--surface) ${val}%, var(--surface) 100%)`;
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
