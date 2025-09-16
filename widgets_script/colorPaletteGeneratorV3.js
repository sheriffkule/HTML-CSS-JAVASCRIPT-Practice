const searchInput = document.querySelector('#search-input');
const searchColor = document.querySelector('.search-color');
const searchImage = document.querySelector('#search-image');
const typeSelect = document.querySelector('#palette-type');
const typeText = document.querySelector('#type-text');
const countSelect = document.querySelector('#palette-count');
const randomBtn = document.querySelector('#random-btn');
const paletteContainer = document.querySelector('#palette');
const relatedContainer = document.querySelector('#related');

let currentColor = 'skyblue';
let currentType = 'analogous';
let currentCount = 6;
let imageColors = [];

function generateAnalogousPalette(hsl, count) {
  const palette = [];
  const [hue, saturation, lightness] = hsl;

  for (let i = 0; i < count; i++) {
    let newHue = hue + 30 * i;
    if (newHue > 360) {
      newHue -= 360;
    }

    palette.push([newHue, saturation, lightness]);
  }

  return palette;
}

function generateMonochromaticPalette(hsl, count) {
  const palette = [];
  const [hue, saturation, lightness] = hsl;

  for (let i = 0; i < count; i++) {
    let newLightness = lightness + 10 * i;
    if (newLightness > 100) newLightness -= 100;

    palette.push([hue, saturation, newLightness]);
  }

  return palette;
}

function generateTriadicPalette(hsl, count) {
  const palette = [];
  let [hue, saturation, lightness] = hsl;

  for (let i = 0; i < count; i++) {
    let newHue = hue + 120 * i;
    if (newHue > 360) {
      newHue -= 360 * Math.floor(newHue / 360);
    }

    palette.push([newHue, saturation, lightness]);
  }

  return palette;
}

function generateCompoundPalette(hsl, count) {
  const palette = [];
  let [hue, saturation, lightness] = hsl;

  for (let i = 0; i < count; i++) {
    let newHue = hue + 150 * i;
    if (newHue > 360) {
      newHue -= 360 * Math.floor(newHue / 360);
    }

    palette.push([newHue, saturation, lightness]);
  }

  return palette;
}

function generateShadesPalette(hsl, count) {
  const palette = [];
  let [hue, saturation, lightness] = hsl;

  for (let i = 0; i < count; i++) {
    let newSaturation = saturation + 10 * i;
    if (newSaturation > 100) newSaturation -= 100;

    palette.push([hue, newSaturation, lightness]);
  }

  return palette;
}

function generateTetradicPalette(hsl, count) {
  const palette = [];
  let [hue, saturation, lightness] = hsl;

  for (let i = 0; i < count; i++) {
    let newHue = hue + 90 * i;
    if (newHue > 360) {
      newHue -= 360 * Math.floor(newHue / 360);
    }

    palette.push([newHue, saturation, lightness]);
  }

  return palette;
}

function generateSquarePalette(hsl, count) {
  const palette = [];
  let [hue, saturation, lightness] = hsl;

  for (let i = 0; i < count; i++) {
    let newHue = hue + 60 * i;
    if (newHue > 360) {
      newHue -= 360 * Math.floor(newHue / 360);
    }

    palette.push([newHue, saturation, lightness]);
  }

  return palette;
}

function generateRelatedColorPalette(hsl, count) {
  const palette = [];
  let [hue, saturation, lightness] = hsl;

  palette.push([hue, (saturation + 20) % 100, lightness]);
  palette.push([hue, (saturation - 20) % 100, lightness]);
  palette.push([hue, saturation, (lightness + 20) % 100]);
  palette.push([hue, saturation, (lightness - 20) % 100]);
  palette.push([(hue + 20) % 360, saturation, lightness]);
  palette.push([(hue - 20) % 360, saturation, lightness]);

  for (let i = palette.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [palette[i], palette[j]] = [palette[j], palette[i]];
  }

  return palette;
}

function generatePalette(hsl, type, count) {
  switch (type) {
    case 'analogous':
      return generateAnalogousPalette(hsl, count);
    case 'monochromatic':
      return generateMonochromaticPalette(hsl, count);
    case 'triadic':
      return generateTriadicPalette(hsl, count);
    case 'compound':
      return generateCompoundPalette(hsl, count);
    case 'shades':
      return generateShadesPalette(hsl, count);
    case 'tetradic':
      return generateTetradicPalette(hsl, count);
    case 'square':
      return generateSquarePalette(hsl, count);
    case 'related':
      return generateRelatedColorPalette(hsl, count);
  }
}

function generatePaletteHtml(type, container) {
  let color = currentColor;
  let count = currentCount;
  const hsl = getHslFromColor(color);

  if (!hsl) return;
  let palette = [];
  container.innerHTML = '';
  palette = generatePalette(hsl, type, count);
  palette.forEach((color) => {
    color = hslToHex(color);
    const colorEl = document.createElement('div');
    colorEl.classList.add('color');
    colorEl.style.backgroundColor = color;

    colorEl.innerHTML = `
        <div class="overlay">
          <div class="icons">
            <div class="copy-color" title="Copy">
              <i class="fas fa-copy"></i>
            </div>
            <div class="generate-palette" title="Generate">
              <i class="fas fa-palette"></i>
            </div>
          </div>
          <div class="code">${color}</div>
        </div>
    `;

    container.appendChild(colorEl);
  });
}

function getHslFromColor(color) {
  let hsl;
  if (isValidColor(color)) {
    let tempDiv = document.createElement('div');
    tempDiv.style.color = color;
    document.body.appendChild(tempDiv);

    let style = window.getComputedStyle(tempDiv, null);
    let rgb = style.getPropertyValue('color');
    document.body.removeChild(tempDiv);

    rgb = removeRGB(rgb);

    hsl = rgbToHsl(rgb);
  }
  return hsl;
}

function isValidColor(color) {
  return CSS.supports('color', color);
}

function removeRGB(rgb) {
  return rgb.replace('rgb(', '').replace(')', '').split(', ');
}

function rgbToHsl(rgb) {
  let r = parseInt(rgb[0]) / 255;
  let g = parseInt(rgb[1]) / 255;
  let b = parseInt(rgb[2]) / 255;

  let cMax = Math.max(r, g, b);
  let cMin = Math.min(r, g, b);
  let delta = cMax - cMin;
  let h = 0;
  let s = 0;
  let l = (cMax + cMin) / 2;

  if (delta === 0) {
    h = 0;
    s = 0;
  } else if (cMax === r) {
    h = ((g - b) / delta) % 6;
  } else if (cMax === g) {
    h = (b - r) / delta + 2;
  } else {
    h = (r - g) / delta + 4;
  }

  h = Math.round(h * 60);
  if (h < 0) h += 360;

  if (delta !== 0) {
    s = Math.round((delta / (1 - Math.abs(2 * l - 1))) * 100);
  }
  l = Math.round(l * 100);

  return [h, s, l];
}

function hslToHex(hsl) {
  let h = hsl[0];
  let s = hsl[1];
  let l = hsl[2];
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

generatePaletteHtml(currentType, paletteContainer);
generatePaletteHtml('related', relatedContainer);
searchColor.style.backgroundColor = currentColor;

searchInput.addEventListener('keyup', (e) => {
  const value = e.target.value;

  if (isValidColor(value)) {
    searchColor.style.backgroundColor = value;
    currentColor = value;

    generatePaletteHtml(currentType, paletteContainer);
    generatePaletteHtml('related', relatedContainer);
  }
});

typeSelect.addEventListener('change', (e) => {
  const value = e.target.value;
  currentType = value;
  typeText.textContent = value + ' Palette';

  generatePaletteHtml(currentType, paletteContainer);
});

countSelect.addEventListener('change', (e) => {
  const value = e.target.value;
  currentCount = value;
  generatePaletteHtml(currentType, paletteContainer);
});

randomBtn.addEventListener('click', () => {
  const randomColor = getRandomColor();
  searchInput.value = randomColor;
  searchColor.style.backgroundColor = randomColor;
  currentColor = randomColor;
  generatePaletteHtml(currentType, paletteContainer);
  generatePaletteHtml('related', relatedContainer);
});

const palettes = document.querySelectorAll('.palette');

palettes.forEach((palette) => {
  palette.addEventListener('click', (e) => {
    const target = e.target;
    const color = target.parentElement.parentElement.children[1].textContent;

    if (target.classList.contains('copy-color')) {
      copyToClipboard(color);
      toast(`Color ${color} Copied to Clipboard`)
    }
  });
});

function copyToClipboard(text) {
  const input = document.createElement('input');
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  input.remove();
}
