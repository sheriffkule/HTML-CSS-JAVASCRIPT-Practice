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
