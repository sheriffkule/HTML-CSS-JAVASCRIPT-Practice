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
  loadPresets();

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

  // Effects
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
});
