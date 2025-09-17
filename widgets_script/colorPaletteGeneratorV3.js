const searchInput = document.querySelector('#search-input');
const searchColor = document.querySelector('.search-color');
const searchImage = document.querySelector('#search-image');
const typeSelect = document.querySelector('#palette-type');
const typeText = document.querySelector('#type-text');
const countSelect = document.querySelector('#palette-count');
const randomBtn = document.querySelector('#random-btn');
const paletteContainer = document.querySelector('#palette');
const relatedContainer = document.querySelector('#related');
const imageColorsContainer = document.querySelector('#image-colors');
const imageColorsWrapper = document.querySelector('.image-colors-wrapper');

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

  if (type === 'image-colors') {
    palette = imageColors;
  } else {
    palette = generatePalette(hsl, type, count);
  }

  palette.forEach((color) => {
    if (type != 'image-colors') {
      color = hslToHex(color);
    }
    const colorEl = document.createElement('div');
    colorEl.classList.add('color');
    colorEl.style.backgroundColor = color;

    colorEl.innerHTML = `
        <div class="overlay">
          <div class="icons">
            <div class="copy-color" title="Copy color code">
              <i class="fas fa-copy"></i>
            </div>
            <div class="generate-palette" title="Generate Palette">
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
      toast(`Color ${color} Copied to Clipboard`);
    }

    if (target.classList.contains('generate-palette')) {
      searchInput.value = color;
      searchColor.style.backgroundColor = color;
      currentColor = color;

      generatePaletteHtml(currentType, paletteContainer);
      generatePaletteHtml('related', relatedContainer);

      toast('Palette generated for ' + color);
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

function toast(message) {
  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('show');
  }, 20);

  setTimeout(() => {
    toast.classList.remove('show');
    toast.addEventListener('transitionend', () => {
      toast.remove();
    });
  }, 2000);
}

searchImage.addEventListener('change', (e) => {
  const file = e.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      const image = new Image();
      image.src = reader.result;
      image.onload = function () {
        extractColorsFromImage(image);
      };
    };
  }
});

function extractColorsFromImage(image) {
  colorjs.prominent(image, { amount: 6, format: 'hex' }).then((color) => {
    imageColors = [];
    imageColors.push(...color);
    generatePaletteHtml('image-colors', imageColorsContainer);

    imageColorsWrapper.classList.remove('hidden');
  });
}

const downloadBtn = document.querySelector('#download-btn');
const downloadFormat = document.querySelector('#download-format');
const downloadName = document.querySelector('#download-name');

downloadBtn.addEventListener('click', () => {
  const format = downloadFormat.value;
  let name = downloadName.value;

  name = name == '' ? 'palette' : name;
  downloadPalette(format, name);
});

function downloadPalette(format, name) {
  const palette = document.querySelector('#palette');
  const paletteColors = palette.querySelectorAll('.color');
  const colors = [];
  paletteColors.forEach((color) => {
    colors.push(color.style.backgroundColor);
  });

  switch (format) {
    case 'png':
      downloadPalettePng(colors, name);
      break;
    case 'svg':
      downloadPaletteSvg(colors, name);
      break;
    case 'css':
      downloadPaletteCss(colors, name);
      break;
    case 'json':
      downloadPaletteJson(colors, name);
      break;
    case 'txt':
      downloadPaletteTxt(colors, name);
      break;
    default:
      break;
  }
}

function downloadPalettePng(colors, name) {
  const canvas = document.createElement('canvas');
  canvas.width = colors.length * 200;
  canvas.height = 1000;
  const ctx = canvas.getContext('2d');

  colors.forEach((color, index) => {
    ctx.fillStyle = color;
    ctx.fillRect(index * 200, 0, 200, 1000);
  });

  const link = document.createElement('a');
  link.download = name + '.png';
  link.href = canvas.toDataURL();
  link.click();
}

function downloadPaletteSvg(colors, name) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svg.setAttribute('viewBox', '0 0 100 100');
  svg.setAttribute('preserveAspectRatio', 'none');

  colors.forEach((color, index) => {
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    const width = 100 / colors.length;
    rect.setAttribute('x', index * width);
    rect.setAttribute('y', 0);
    rect.setAttribute('width', width);
    rect.setAttribute('height', 100);
    rect.setAttribute('fill', color);
    svg.appendChild(rect);
  });

  const svgData = new XMLSerializer().serializeToString(svg);
  const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const svgUrl = URL.createObjectURL(svgBlob);
  const downloadLink = document.createElement('a');
  downloadLink.download = name + '.svg';
  downloadLink.href = svgUrl;
  downloadLink.click();
}

function downloadPaletteCss(colors, name) {
  const css = `:root {
    ${colors.map((color, index) => `--color-${index + 1}: ${color}`).join('\n')}}`;
  const blob = new Blob([css], { type: 'text/css' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = name + '.css';
  link.href = url;
  link.click();
}

function downloadPaletteJson(colors, name) {
  const json = JSON.stringify(colors);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = name + '.json';
  link.href = url;
  link.click();
}

function downloadPaletteTxt(colors, name) {
  const text = colors.join('\n');
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = name + '.txt';
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}

const toggle = document.querySelector('#toggle');

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('colorPaletteTheme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    toggle.checked = true;
  } else {
    document.body.classList.remove('dark');
    toggle.checked = false;
  }
});

toggle.addEventListener('change', (e) => {
  if (e.target.checked) {
    document.body.classList.add('dark');
    localStorage.setItem('colorPaletteTheme', 'dark');
  } else {
    document.body.classList.remove('dark');
    localStorage.setItem('colorPaletteTheme', 'light');
  }
});
