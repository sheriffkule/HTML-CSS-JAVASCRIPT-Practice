// DOM Elements
const borderWidthSlider = document.getElementById('border-width');
const borderColorPicker = document.getElementById('border-color');
const borderStyleSelect = document.getElementById('border-style');
const bgColorPicker = document.getElementById('bg-color');
const radiusTlSlider = document.getElementById('radius-tl');
const radiusTrSlider = document.getElementById('radius-tr');
const radiusBrSlider = document.getElementById('radius-br');
const radiusBlSlider = document.getElementById('radius-bl');

const previewElement = document.getElementById('preview-element');
const cssCodeElement = document.getElementById('css-code');
const copyButton = document.getElementById('copy-btn');
const resetButton = document.getElementById('reset-btn');
const randomButton = document.getElementById('random-btn');

const widthValueDisplay = document.getElementById('width-value');
const colorHexDisplay = document.getElementById('color-hex');
const bgColorHexDisplay = document.getElementById('bg-color-hex');

const radiusTlValue = document.getElementById('tl-value');
const radiusTrValue = document.getElementById('tr-value');
const radiusBrValue = document.getElementById('br-value');
const radiusBlValue = document.getElementById('bl-value');

const borderStyleOptions = document.querySelectorAll('.border-style-option');
const presetElements = document.querySelectorAll('.preset');

// Initialize default values
let borderWidth = 5;
let borderColor = '#4361ee';
let borderStyle = 'solid';
let bgColor = '#ffffff';
let borderRadius = {
  tl: 15,
  tr: 15,
  br: 15,
  bl: 15,
};

// Update the preview element with current border settings
function updatePreview() {
  // Set border properties
  previewElement.style.borderWidth = `${borderWidth}px`;
  previewElement.style.borderColor = borderColor;
  previewElement.style.borderStyle = borderStyle;
  previewElement.style.backgroundColor = bgColor;

  // Set border radius
  previewElement.style.borderRadius = `${borderRadius.tl}px ${borderRadius.tr}px ${borderRadius.br}px ${borderRadius.bl}px`;

  // Update CSS code display
  updateCssCode();
}

// Generate and update CSS code
function updateCssCode() {
  const borderRadiusValue =
    borderRadius.tl === borderRadius.tr &&
    borderRadius.tr === borderRadius.br &&
    borderRadius.br === borderRadius.bl
      ? `${borderRadius.tl}px`
      : `${borderRadius.tl}px ${borderRadius.tr}px ${borderRadius.br}px ${borderRadius.bl}px`;

  const cssCode = `.box {
    <span class="css-property">border</span>:<span class="css-value">${borderWidth}px ${borderStyle} ${borderColor}</span>
    <span class="css-property">border-radius</span>: <span class="css-value">${borderRadiusValue}</span>
    <span class="css-property">background-color</span>: <span class="css-value">${bgColor}</span>
}`;

  cssCodeElement.innerHTML = cssCode;
}

// Update display values
function updateDisplayValues() {
  widthValueDisplay.textContent = `${borderWidth}px`;
  colorHexDisplay.textContent = borderColor;
  bgColorHexDisplay.textContent = bgColor;

  radiusTlValue.textContent = `${borderRadius.tl}px`;
  radiusTrValue.textContent = `${borderRadius.tr}px`;
  radiusBrValue.textContent = `${borderRadius.br}px`;
  radiusBlValue.textContent = `${borderRadius.bl}px`;
}

// Copy CSS code to clipboard
function copyCssCode() {
  const textToCopy = cssCodeElement.textContent;

  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      copyButton.innerHTML = '<i class="fas fa-check"></i> Copied';
      copyButton.classList.add('copied');

      setTimeout(() => {
        copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy Code';
        copyButton.classList.remove('copied');
      }, 2000);
    })
    .catch((err) => {
      console.error('Failed to copy text: ', err);
      alert('Failed to copy CSS code to clipboard!');
    });
}

function resetToDefault() {
  borderWidth = 5;
  borderColor = '#4361ee';
  borderStyle = 'solid';
  bgColor = '#ffffff';
  borderRadius = {
    tl: 15,
    tr: 15,
    br: 15,
    bl: 15,
  };

  // Update UI elements
  borderWidthSlider.value = borderWidth;
  borderColorPicker.value = borderColor;
  borderStyleSelect.value = borderStyle;
  bgColorPicker.value = bgColor;
  radiusTlSlider.value = borderRadius.tl;
  radiusTrSlider.value = borderRadius.tr;
  radiusBrSlider.value = borderRadius.br;
  radiusBlSlider.value = borderRadius.bl;

  // Update border style options
  borderStyleOptions.forEach((option) => {
    if (option.dataset.style === borderStyle) {
      option.classList.add('active');
    } else {
      option.classList.remove('active');
    }
  });

  updateDisplayValues();
  updatePreview();
}

// Generate random border settings
function generateRandom() {
  // Random border with between 1 and 20
  borderWidth = Math.floor(Math.random() * 20) + 1;

  // Random color
  borderColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

  //  // Apply colors
  // animatedBox.style.background = bgColor.value;
  // animatedBox.style.color = textColor.value;

  // Random style
  const styles = ['solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset'];
  borderStyle = styles[Math.floor(Math.random() * styles.length)];

  // Random background color
  const bgHue = Math.floor(Math.random() * 360);
  bgColor = `hsl(${bgHue}, 70%, 95%)`;

  // Random border radius (0-50px)
  borderRadius.tl = Math.floor(Math.random() * 51);
  borderRadius.tr = Math.floor(Math.random() * 51);
  borderRadius.br = Math.floor(Math.random() * 51);
  borderRadius.bl = Math.floor(Math.random() * 51);

  // Update UI elements
  borderWidthSlider.value = borderWidth;
  borderColorPicker.value = borderColor;
  borderStyleSelect.value = borderStyle;
  bgColorPicker.value = bgColor;
  radiusTlSlider.value = borderRadius.tl;
  radiusTrSlider.value = borderRadius.tr;
  radiusBrSlider.value = borderRadius.br;
  radiusBlSlider.value = borderRadius.bl;

  // Update border style options
  borderStyleOptions.forEach((option) => {
    if (option.dataset.style === borderStyle) {
      option.classList.add('active');
    } else {
      option.classList.remove('active');
    }
  });

  updateDisplayValues();
  updatePreview();
}

// Apply preset border settings
function applyPreset(presetName) {
  switch (presetName) {
    case 'modern':
      borderWidth = 3;
      borderColor = '#4361ee';
      borderStyle = 'solid';
      borderRadius.tl = 20;
      borderRadius.tr = 20;
      borderRadius.br = 20;
      borderRadius.bl = 20;
      break;

    case 'rounded':
      borderWidth = 8;
      borderColor = '#2ec4bd';
      borderStyle = 'solid';
      borderRadius.tl = 50;
      borderRadius.tr = 50;
      borderRadius.br = 50;
      borderRadius.bl = 50;
      break;

    case 'dashed':
      borderWidth = 4;
      borderColor = '#ff9f1c';
      borderStyle = 'dashed';
      borderRadius.tl = 10;
      borderRadius.tr = 10;
      borderRadius.br = 10;
      borderRadius.bl = 10;
      break;

    case 'double':
      borderWidth = 10;
      borderColor = '#3a0ca3';
      borderStyle = 'double';
      borderRadius.tl = 5;
      borderRadius.tr = 5;
      borderRadius.br = 5;
      borderRadius.bl = 5;
      break;

    case 'mixed':
      // For mixed borders all sides need to be set separately
      previewElement.style.border = 'none';
      previewElement.style.borderTop = '6px solid #e71d36';
      previewElement.style.borderRight = '6px dotted #4cc9f0';
      previewElement.style.borderBottom = '6px dashed #ff9f1c';
      previewElement.style.borderBottom = '6px groove #2ec4b6';
      borderRadius.tl = 30;
      borderRadius.tr = 5;
      borderRadius.br = 30;
      borderRadius.bl = 5;

      // Update CSS code for mixed borders
      const mixedCssCode = `.box {
<span class="css-property">border-top</span>: <span class="css-value">6px solid #e71d36</span>
<span class="css-property">border-right</span>: <span class="css-value">6px dotted #4cc9f0</span>
<span class="css-property">border-bottom</span>: <span class="css-value">6px dashed #ff9f1c</span>
<span class="css-property">border-left</span>: <span class="css-value">6px groove #2ec4b6</span>
<span class="css-property">border-radius</span>: <span class="css-value">30px 5px 30px 5px</span>
<span class="css-property">background-color</span>: <span class="css-value">${bgColor}</span>
}`;

      cssCodeElement.innerHTML = mixedCssCode;

      // Update UI elements
      borderWidthSlider.value = 6;
      borderColorPicker.value = '#e71d36';
      borderStyleSelect.value = 'solid';
      radiusTlSlider.value = 30;
      radiusTrSlider.value = 5;
      radiusBrSlider.value = 30;
      radiusBlSlider.value = 5;

      updateDisplayValues();

      // Set border style options
      borderStyleOptions.forEach((option) => {
        if (option.dataset.style === 'solid') {
          option.classList.add('active');
        } else {
          option.classList.remove('active');
        }
      });

      return;

    case 'none':
      borderWidth = 0;
      borderColor = '#ffffff';
      borderStyle = 'solid';
      borderRadius.tl = 0;
      borderRadius.tr = 0;
      borderRadius.br = 0;
      borderRadius.bl = 0;
      break;
  }

  // Reset border to uniform style (for non-mixed presets)
  previewElement.style.border = '';
  previewElement.style.borderTop = '';
  previewElement.style.borderRight = '';
  previewElement.style.borderBottom = '';
  previewElement.style.borderLeft = '';
  previewElement.style.boxShadow = 'none';

  // Update UI elements
  borderWidthSlider.value = borderWidth;
  borderColorPicker.value = borderColor;
  borderStyleSelect.value = borderStyle;
  bgColorPicker.value = bgColor;
  radiusTlSlider.value = borderRadius.tl;
  radiusTrSlider.value = borderRadius.tr;
  radiusBrSlider.value = borderRadius.br;
  radiusBlSlider.value = borderRadius.bl;

  borderStyleOptions.forEach((option) => {
    if (option.dataset.style === borderStyle) {
      option.classList.add('active');
    } else {
      option.classList.remove('active');
    }
  });

  updateDisplayValues();
  updatePreview();
}

// Event Listeners
borderWidthSlider.addEventListener('input', () => {
  borderWidth = parseInt(borderWidthSlider.value);
  updateDisplayValues();
  updatePreview();
});

borderColorPicker.addEventListener('input', () => {
  borderColor = borderColorPicker.value;
  updateDisplayValues();
  updatePreview();
});

borderStyleSelect.addEventListener('change', () => {
  borderStyle = borderStyleSelect.value;

  // Update border style options
  borderStyleOptions.forEach((option) => {
    if (option.dataset.style === borderStyle) {
      option.classList.add('active');
    } else {
      option.classList.remove('active');
    }
  });

  updatePreview();
});

// Background color picker event listener
bgColorPicker.addEventListener('input', () => {
  bgColor = bgColorPicker.value;
  updateDisplayValues();
  updatePreview();
});

radiusTlSlider.addEventListener('input', () => {
  borderRadius.tl = parseInt(radiusTlSlider.value);
  updateDisplayValues();
  updatePreview();
});

radiusTrSlider.addEventListener('input', () => {
  borderRadius.tr = parseInt(radiusTrSlider.value);
  updateDisplayValues();
  updatePreview();
});

radiusBrSlider.addEventListener('input', () => {
  borderRadius.br = parseInt(radiusBrSlider.value);
  updateDisplayValues();
  updatePreview();
});

radiusBlSlider.addEventListener('input', () => {
  borderRadius.bl = parseInt(radiusBlSlider.value);
  updateDisplayValues();
  updatePreview();
});

// Border style options click events
borderStyleOptions.forEach((option) => {
  option.addEventListener('click', () => {
    borderStyle = option.dataset.style;
    borderStyleSelect.value = borderStyle;

    borderStyleOptions.forEach((opt) => {
      if (opt === option) {
        opt.classList.add('active');
      } else {
        opt.classList.remove('active');
      }
    });

    updatePreview();
  });
});

// Preset click events
presetElements.forEach((preset) => {
  preset.addEventListener('click', () => {
    applyPreset(preset.dataset.preset);
  });
});

// Update year in footer
function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');

  if (!yearElement) {
    console.error('Year element not found');
    return;
  }

  if (yearElement) {
    yearElement.setAttribute('datetime', currentYear.toString());
    yearElement.dateTime = currentYear.toString();
    yearElement.textContent = currentYear.toString();
  }
}
updateYear();

// Button click events
copyButton.addEventListener('click', copyCssCode);
resetButton.addEventListener('click', resetToDefault);
randomButton.addEventListener('click', generateRandom);

// Initialize the app
resetToDefault();
