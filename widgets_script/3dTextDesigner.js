// DOM Elements
const textInput = document.getElementById('text-input');
const fontFamilySelect = document.getElementById('font-family');
const fontWeightSelect = document.getElementById('font-weight');
const textPreview = document.getElementById('text-preview');
const depthSlider = document.getElementById('depth-slider');
const depthValue = document.getElementById('depth-value');
const rotationSlider = document.getElementById('rotation-slider');
const rotationValue = document.getElementById('rotation-value');
const fontSizeSlider = document.getElementById('font-size');
const fontSizeValue = document.getElementById('font-size-value');
const letterSpacingSlider = document.getElementById('letter-spacing');
const letterSpacingValue = document.getElementById('letter-spacing-value');
const textColorPicker = document.getElementById('text-color');
const shadowXSlider = document.getElementById('shadow-x');
const shadowXValue = document.getElementById('shadow-x-value');
const shadowYSlider = document.getElementById('shadow-y');
const shadowYValue = document.getElementById('shadow-y-value');
const shadowBlurSlider = document.getElementById('shadow-blur');
const shadowBlurValue = document.getElementById('shadow-blur-value');
const shadowColorPicker = document.getElementById('shadow-color');
const outlineWidthSlider = document.getElementById('outline-width');
const outlineWidthValue = document.getElementById('outline-width-value');
const outlineColorPicker = document.getElementById('outline-color');
const effectOptions = document.querySelectorAll('.effect-option');
const downloadBtn = document.getElementById('download-btn');
const resetBtn = document.getElementById('reset-btn');
const textCanvas = document.getElementById('text-canvas');
const canvasCtx = textCanvas.getContext('2d');

// Current settings
let currentEffect = 'gold';

// Initialize the app
function initApp() {
  updateText();
  update3DEffect();
  updateShadow();
  updateOutline();

  // Event listeners
  textInput.addEventListener('input', updateText);
  fontFamilySelect.addEventListener('change', updateTextStyle);
  fontWeightSelect.addEventListener('change', updateTextStyle);
  depthSlider.addEventListener('input', update3DEffect);
  rotationSlider.addEventListener('input', update3DEffect);
  fontSizeSlider.addEventListener('input', updateFontSize);
  letterSpacingSlider.addEventListener('input', updateLetterSpacing);
  textColorPicker.addEventListener('input', updateTextColor);

  shadowXSlider.addEventListener('input', updateShadow);
  shadowYSlider.addEventListener('input', updateShadow);
  shadowBlurSlider.addEventListener('input', updateShadow);
  shadowColorPicker.addEventListener('input', updateShadow);

  outlineWidthSlider.addEventListener('input', updateOutline);
  outlineColorPicker.addEventListener('input', updateOutline);

  effectOptions.forEach((option) => {
    option.addEventListener('click', () => {
      effectOptions.forEach((opt) => opt.classList.remove('active'));
      option.classList.add('active');
      currentEffect = option.getAttribute('data-effect');
      updateTextEffect();
    });
  });

  downloadBtn.addEventListener('click', downloadImage);
  resetBtn.addEventListener('click', resetSettings);
}

// Update text content
function updateText() {
  textPreview.textContent = textInput.value || '3D TEXT';
}

// Update text styling
function updateTextStyle() {
  textPreview.style.fontFamily = fontFamilySelect.value;
  textPreview.style.fontWeight = fontWeightSelect.value;
}

// Update font size
function updateFontSize() {
  const size = fontSizeSlider.value;
  fontSizeValue.textContent = size;
  textPreview.style.fontSize = `${size}rem`;
}

// Update letter spacing
function updateLetterSpacing() {
  const spacing = letterSpacingSlider.value;
  letterSpacingValue.textContent = spacing;
  textPreview.style.letterSpacing = `${spacing}px`;
}

// Update text color
function updateTextColor() {
  textPreview.style.color = textColorPicker.value;
}

// Update 3D effect
function update3DEffect() {
  const depth = depthSlider.value;
  const rotation = rotationSlider.value;

  depthValue.textContent = depth;
  rotationValue.textContent = rotation;

  textPreview.style.transform = `perspective(500px) rotateX(${rotation}deg) rotateY(${rotation}deg)`;
}

// Update shadow
function updateShadow() {
  const x = shadowXSlider.value;
  const y = shadowYSlider.value;
  const blur = shadowBlurSlider.value;
  const color = shadowColorPicker.value;

  shadowXValue.textContent = x;
  shadowYValue.textContent = y;
  shadowBlurValue.textContent = blur;

  textPreview.style.textShadow = `${x}px ${y}px ${blur}px ${color}`;
}

// Update outline
function updateOutline() {
  const width = outlineWidthSlider.value;
  const color = outlineColorPicker.value;

  outlineWidthValue.textContent = width;

  width > 0
    ? (textPreview.style.webkitTextStroke = `${width} ${color}`)
    : (textPreview.style.webkitTextStroke = 'none');
}

// Update text effect
function updateTextEffect() {
  // Remove all effect classes
  textPreview.classList.remove(
    'gold-effect',
    'neon-effect',
    'fire-effect',
    'metal-effect',
    'graffiti-effect',
    'glitter-effect',
    'rainbow-effect',
    'chrome-effect',
  );

  // Add the current effect class
  textPreview.classList.add(`${currentEffect}-effect`);

  // For effects that have their own color, override the color picker
  if (currentEffect !== 'neon' && currentEffect !== 'graffiti') {
    textPreview.style.color = textColorPicker.value;
  }
}

// Render text to canvas for download
function renderTextToCanvas() {
  // Clear canvas
  canvasCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);

  // Set canvas background
  canvasCtx.fillStyle = '#1a1a2e';
  canvasCtx.fillRect(0, 0, textCanvas.width, textCanvas.height);

  // Get text properties
  const text = textInput.value || '3D TEXT';
  const fontSize = parseFloat(fontSizeSlider.value) * 16; // Convert rem to px (1rem = 16px)
  const fontFamily = fontFamilySelect.value;
  const fontWeight = fontWeightSelect.value || 'normal';
  const letterSpacing = parseFloat(letterSpacingSlider.value) || 0;
  const depth = parseInt(depthSlider.value);
  const rotation = parseInt(rotationSlider.value);
  const shadowX = parseInt(shadowXSlider.value);
  const shadowY = parseInt(shadowYSlider.value);
  const shadowBlur = parseInt(shadowBlurSlider.value);
  const shadowColor = shadowColorPicker.value;
  const outlineWidth = parseInt(outlineWidthSlider.value);
  const outlineColor = outlineColorPicker.value;

  // Set font
  canvasCtx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  canvasCtx.textAlign = 'center';
  canvasCtx.textBaseline = 'middle';
  // letterSpacing is not natively supported on canvas; can be implemented if needed

  // Calculate text position
  const x = textCanvas.width / 2;
  const y = textCanvas.height / 2;

  // Apply 3D effect (shadow for depth)
  if (depth > 0) {
    canvasCtx.save();
    canvasCtx.translate(x, y);
    canvasCtx.rotate((rotation * Math.PI) / 180);

    // Draw shadow layers for 3D effect
    for (let i = depth; i > 0; i--) {
      canvasCtx.save();
      canvasCtx.translate(i, i);
      canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      canvasCtx.fillText(text, 0, 0);
      canvasCtx.restore();
    }

    canvasCtx.restore();
  }

  // Draw main text with effect
  canvasCtx.save();
  canvasCtx.translate(x, y);
  canvasCtx.rotate((rotation * Math.PI) / 180);

  // Apply shadow
  canvasCtx.shadowOffsetX = shadowX;
  canvasCtx.shadowOffsetY = shadowY;
  canvasCtx.shadowBlur = shadowBlur;
  canvasCtx.shadowColor = shadowColor;

  // Apply outline if needed
  if (outlineWidth > 0) {
    canvasCtx.strokeStyle = outlineColor;
    canvasCtx.lineWidth = outlineWidth;
    canvasCtx.strokeText(text, 0, 0);
  }

  // Apply selected effect
  switch (currentEffect) {
    case 'gold':
      const goldGradient = canvasCtx.createLinearGradient(-200, -50, 200, 50);
      goldGradient.addColorStop(0, '#bf953f');
      goldGradient.addColorStop(0.3, '#fcf6ba');
      goldGradient.addColorStop(0.5, '#b38728');
      goldGradient.addColorStop(0.7, '#fbf5b7');
      goldGradient.addColorStop(1, '#aa771c');
      canvasCtx.fillStyle = goldGradient;
      break;

    case 'neon':
      canvasCtx.fillStyle = textColorPicker.value;
      canvasCtx.shadowColor = textColorPicker.value;
      canvasCtx.shadowBlur = 20;
      break;

    case 'fire':
      const fireGradient = canvasCtx.createLinearGradient(-200, -50, 200, 50);
      fireGradient.addColorStop(0, '#ff8a00');
      fireGradient.addColorStop(0.5, '#ff2070');
      fireGradient.addColorStop(1, '#ff00cc');
      canvasCtx.fillStyle = fireGradient;
      canvasCtx.shadowColor = '#ff3333';
      canvasCtx.shadowBlur = 15;
      break;

    case 'metal':
      const metalGradient = canvasCtx.createLinearGradient(-200, -50, 200, 50);
      metalGradient.addColorStop(0, '#757575');
      metalGradient.addColorStop(0.3, '#9e9e9e');
      metalGradient.addColorStop(0.5, '#e0e0e0');
      metalGradient.addColorStop(0.7, '#9ee9e9');
      metalGradient.addColorStop(1, '#616161');
      canvasCtx.fillStyle = metalGradient;
      break;

    case 'graffiti':
      canvasCtx.fillStyle = textColorPicker.value;
      canvasCtx.strokeStyle = '#000';
      canvasCtx.lineWidth = 4;
      canvasCtx.strokeText(text, 0, 0);
      break;

    case 'glitter':
    case 'rainbow':
      const rainbowGradient = canvasCtx.createLinearGradient(-200, -50, 200, 50);
      rainbowGradient.addColorStop(0, '#ff0000');
      rainbowGradient.addColorStop(0.14, '#ff9900');
      rainbowGradient.addColorStop(0.28, '#ffff00');
      rainbowGradient.addColorStop(0.42, '#00ff00');
      rainbowGradient.addColorStop(0.57, '#00ffff');
      rainbowGradient.addColorStop(0.71, '#0000ff');
      rainbowGradient.addColorStop(0.85, '#9900ff');
      rainbowGradient.addColorStop(1, '#ff00ff');
      canvasCtx.fillStyle = rainbowGradient;
      break;

    case 'chrome':
      const chromeGradient = canvasCtx.createLinearGradient(-200, -50, 200, 50);
      chromeGradient.addColorStop(0, '#8e9eab');
      chromeGradient.addColorStop(0.5, '#eef2f3');
      chromeGradient.addColorStop(1, '#8e9eab');
      canvasCtx.fillStyle = chromeGradient;
      break;

    default:
      canvasCtx.fillStyle = textColorPicker.value;
  }

  canvasCtx.fillText(text, 0, 0);
  canvasCtx.restore();
}

// Download image
function downloadImage() {
  // Render text to canvas
  renderTextToCanvas();

  // Create download link
  const link = document.createElement('a');
  link.download = '3d-text-design.png';
  link.href = textCanvas.toDataURL('image/png');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Reset settings
function resetSettings() {
  textInput.value = '3D TEXT';
  fontFamilySelect.value = 'Arial, sans-serif';
  fontWeightSelect.value = 'bold';
  depthSlider.value = 5;
  rotationSlider.value = 5;
  fontSizeSlider.value = 4;
  letterSpacingSlider.value = 0;
  textColorPicker.value = '#ffffff';
  shadowXSlider.value = 5;
  shadowYSlider.value = 5;
  shadowBlurSlider.value = 10;
  shadowColorPicker.value = '#000000';
  outlineWidthSlider.value = 0;
  outlineColorPicker.value = '#ffffff';

  effectOptions.forEach((opt) => opt.classList.remove('active'));
  document.querySelector('.effect-option[data-effect="gold"]').classList.add('active');
  currentEffect = 'gold';

  updateText();
  updateTextStyle();
  updateFontSize();
  updateLetterSpacing();
  updateTextColor();
  update3DEffect();
  updateShadow();
  updateOutline();
  updateTextEffect();
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);

function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');

  if (!yearElement) {
    console.error('Year element not found');
    return;
  }

  yearElement.setAttribute('datetime', currentYear.toString());
  yearElement.dateTime = currentYear.toString();
  yearElement.textContent = currentYear.toString();
}
updateYear();
