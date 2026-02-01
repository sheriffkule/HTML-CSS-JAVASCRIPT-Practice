// DOM Elements
const textInput = document.getElementById('text-input');
const fontFamilySelect = document.getElementById('font-family');
const fontWeightSelect = document.getElementById('font-weight');
const textPreview = document.getElementById('text-preview');
const depthSlider = document.getElementById('depth-slider');
const depthValue = document.getElementById('depth-value');
const rotationSlider = document.getElementById('rotation-value');
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
const resetBtn = document.getElementById('resetBtn');
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

  textPreview.style.textShadow = `${x}px ${y} ${blur} ${color}`;
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
  const fontSize = parseFloat(fontSizeSlider.value) * 20; // Convert rem to px
  const fontFamily = fontFamilySelect.value;
  const fontWeight = parseInt(letterSpacingSlider.value);
  const letterSpacing = parseInt(letterSpacingSlider.value);
  const depth = parseInt(depthSlider.value);
  const rotation = parseInt(rotationSlider.value);
  const shadowX = parseInt(shadowXSlider.value);
  const shadowY = parseInt(shadowYSlider.value);
  const shadowBlur = parseInt(shadowBlurSlider.value);
  const shadowColor = shadowColorPicker.value;
  const outlineWidth = parseInt(outlineWidthSlider.value);
  const outlineColor = outlineColorPicker.value;

  // Set font
  canvasCtx = `${fontWeight} ${fontSize} ${fontFamily}`;
  canvasCtx.textAlign = 'center';
  canvasCtx.textBaseline = 'middle';

  // Calculate text position
  const x = textCanvas / 2;
  const y = textCanvas / 2;

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
    canvasCtx.lineWidth = outlineColor;
    canvasCtx.strokeStyle(text, 0, 0);
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
  }
}
