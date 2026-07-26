// DOM Elements
const glassElement = document.getElementById('glassElement');
const backgroundPreview = document.getElementById('backgroundPreview');
const presetsGrid = document.getElementById('presetsGrid');
const cssCode = document.getElementById('cssCode');
const copyBtn = document.getElementById('copyBtn');

// Control Elements
const blurSlider = document.getElementById('blur');
const transparencySlider = document.getElementById('transparency');
const borderWidthSlider = document.getElementById('borderWidth');
const borderRadiusSlider = document.getElementById('borderRadius');
const glassColorPicker = document.getElementById('glassColor');
const borderColorPicker = document.getElementById('borderColor');
const bgTypeSelect = document.getElementById('bgType');
const bgColor1 = document.getElementById('bgColor1');
const bgColor2 = document.getElementById('bgColor2');
const bgColorContainer = document.getElementById('bgColorContainer');

// Value Display Elements
const blurValue = document.getElementById('blurValue');
const transparencyValue = document.getElementById('transparencyValue');
const borderWidthValue = document.getElementById('borderWidthValue');
const borderRadiusValue = document.getElementById('borderRadiusValue');

// Presets

const presets = [
  {
    name: 'Frosted',
    blur: 15,
    transparency: 15,
    borderWidth: 1,
    borderRadius: 20,
    glassColor: '#ffffff',
    borderColor: '#ffffff',
  },
  {
    name: 'Smoky',
    blur: 25,
    transparency: 30,
    borderWidth: 0,
    borderRadius: 12,
    glassColor: '#f0f0f0',
    borderColor: '#ffffff',
  },
  {
    name: 'Crystal',
    blur: 8,
    transparency: 10,
    borderWidth: 2,
    borderRadius: 25,
    glassColor: '#ffffff',
    borderColor: '#e0e0e0',
  },
  {
    name: 'Icy',
    blur: 20,
    transparency: 25,
    borderWidth: 1,
    borderRadius: 30,
    glassColor: '#e6f7ff',
    borderColor: '#b3e0ff',
  },
  {
    name: 'Soft',
    blur: 12,
    transparency: 18,
    borderWidth: 1,
    borderRadius: 16,
    glassColor: '#f8f8f8',
    borderColor: '#f0f0f0',
  },
  {
    name: 'Dark',
    blur: 15,
    transparency: 20,
    borderWidth: 1,
    borderRadius: 10,
    glassColor: '#1a1a1a',
    borderColor: '#333333',
  },
];

// Initialize presets
function initPresets() {
  presetsGrid.innerHTML = '';
  presets.forEach((preset, index) => {
    const presetElement = document.createElement('div');
    presetElement.className = 'preset';
    presetElement.textContent = preset.name;
    presetElement.style.background = `rgba(${hexToRgb(preset.glassColor).r},
    ${hexToRgb(preset.glassColor).g}, ${hexToRgb(preset.borderColor).b}, ${preset.transparency / 100})`;
    presetElement.style.backdropFilter = `blur(${preset.blur}px)`;
    presetElement.style.border = `${preset.borderWidth}px solid ${preset.borderColor}`;
    presetElement.style.borderRadius = `${preset.borderRadius}px`;

    presetElement.addEventListener('click', () => {
      applyPreset(preset);
    });

    presetsGrid.appendChild(presetElement);
  });
}

// Apply preset values
function applyPreset(preset) {
  blurSlider.value = preset.blur;
  transparencySlider.value = preset.transparency;
  borderWidthSlider.value = preset.borderWidth;
  borderRadiusSlider.value = preset.borderRadius;
  glassColorPicker.value = preset.glassColor;
  borderColorPicker.value = preset.borderColor;

  updateGlassElement();
  updateValueDisplays();
}

// Convert hex to RGB
function hexToRgb(hex) {
  const result = /^#??([a-f/d]{2})([a-f/d]{2})([a-f/d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 255, g: 255, b: 255 };
}

// Update value displays
function updateValueDisplays() {
  blurValue.textContent = `${blurSlider.value}px`;
  transparencyValue.textContent = `${transparencySlider.value}%`;
  borderWidthValue.textContent = `${borderWidthSlider.value}px`;
  borderRadiusValue.textContent = `${borderRadiusSlider.value}px`;
}
