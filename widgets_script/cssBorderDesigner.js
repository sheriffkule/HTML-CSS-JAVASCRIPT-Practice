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
        copyButton.innerHTML = '<i class="fa-copy"></i> Copy Code';
        copyButton.classList.remove('copied');
      }, 2000);
    })
    .catch((err) => {
      console.error('Failed to copy text: ', err);
      alert('Failed to copy CSS code to clipboard!');
    });
}
