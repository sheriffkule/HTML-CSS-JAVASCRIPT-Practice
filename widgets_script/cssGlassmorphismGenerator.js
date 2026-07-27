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

// Updata background
function updateBackground() {
  const bgType = bgTypeSelect.value;

  if (bgType === 'gradient') {
    backgroundPreview.style.background = `linear-gradient(135deg, ${bgColor1.value} 0%, ${bgColor2.value} 100%)`;
  } else if (bgType === 'solid') {
    backgroundPreview.style.background = bgColor1.value;
  } else if (bgType === 'image') {
    backgroundPreview.style.background =
      "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80') center/cover";
  }
}

// Update glass element
function updateGlassElement() {
  const blur = blurSlider.value;
  const transparency = transparencySlider.value / 100;
  const borderWidth = borderWidthSlider.value;
  const borderRadius = borderRadiusSlider.value;
  const glassColor = glassColorPicker.value;
  const borderColor = borderColorPicker.value;

  const rgb = hexToRgb(glassColor);

  glassElement.style.backdropFilter = `blur(${blur}px)`;
  glassElement.style.webkitBackdropFilter = `blur(${blur}px)`;
  glassElement.style.background = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${transparency})`;
  glassElement.style.border = `${borderWidth}px solid ${borderColor}`;
  glassElement.style.borderRadius = `${borderRadius}px`;

  updateCSSCode();
}

// Update CSS code
function updateCSSCode() {
  const blur = blurSlider.value;
  const transparency = transparencySlider.value / 100;
  const borderWidth = borderWidthSlider.value;
  const borderRadius = borderRadiusSlider.value;
  const glassColor = glassColorPicker.value;
  const borderColor = borderColorPicker.value;

  const rgb = hexToRgb(glassColor);

  const css = `.glass-element {
backdrop-filter: blur(${blur}px);
-webkit-backdrop-filter: blur(${blur}px);
background: rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${transparency});
border: ${borderWidth}px solid ${borderColor};
border-radius: ${borderRadius}px;
}`;

  cssCode.textContent = css;
}

// Copy CSS to clipboard
function copyCSSToClipboard() {
  const textArea = document.createElement('textarea');
  textArea.value = cssCode.textContent;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');

  setTimeout(() => {
    document.body.removeChild(textArea);
  }, 200);

  // Show feedback
  const originalText = copyBtn.innerHTML;
  copyBtn.innerHTML = '<i class="fas fa-check"><i/> Copied!';
  setTimeout(() => {
    copyBtn.innerHTML = originalText;
  }, 2000);
}

// Event listeners
blurSlider.addEventListener('input', updateGlassElement);
transparencySlider.addEventListener('input', updateGlassElement);
borderWidthSlider.addEventListener('input', updateGlassElement);
borderRadiusSlider.addEventListener('input', updateGlassElement);
glassColorPicker.addEventListener('input', updateGlassElement);
borderColorPicker.addEventListener('input', updateGlassElement);
bgTypeSelect.addEventListener('change', updateBackground);
bgColor1.addEventListener('input', updateBackground);
bgColor2.addEventListener('input', updateBackground);
copyBtn.addEventListener('click', copyCSSToClipboard);

// Initialize
function init() {
  updateValueDisplays();
  updateBackground();
  updateGlassElement();
  initPresets();
}

// Run initialization
init();

// Handle background type change
bgTypeSelect.addEventListener('change', function () {
  if (this.value === 'solid') {
    bgColorContainer.innerHTML = `
      <div class="color-picker">
        <label for="bgColor1">Color:</label>
        <input type="color" id="bgColor1" value="${bgColor1.value}" />
      </div>
    `;
    // Re-attach event listener
    document.getElementById('bgColor1').addEventListener('input', updateBackground);
  } else if (this.value === 'gradient') {
    bgColorContainer.innerHTML = `
      <div class="color-picker">
        <label for="bgColor1">Color 1:</label>
        <input type="color" id="bgColor1" value="${bgColor1.value}" />
      </div>
      <div class="color-picker">
        <label for="bgColor2">Color 2:</label>
        <input type="color" id="bgColor2" value="${bgColor2.value}" />
      </div>
    `;
    // Re-attach event listeners
    document.getElementById('bgColor1').addEventListener('input', updateBackground);
    document.getElementById('bgColor2').addEventListener('input', updateBackground);
  } else {
    bgColorContainer.innerHTML = '';
  }
  updateBackground();
});

// Changing colors on input type range track
document.querySelectorAll('input[type="range"]').forEach((input) => {
  const updateTrack = () => {
    const val = ((input.value - input.min) / (input.max - input.min)) * 100;
    const thumbWidth = 15; // match your thumb's actual width in px
    const width = input.offsetWidth;
    const ratio = (input.value - input.min) / (input.max - input.min);

    input.style.backgroundImage = `linear-gradient(to right,var(--primary),var(--secondary)${val}%,var(--light) ${val}%)`;
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
