const searchInput = document.querySelector('.search-input');
const searchColor = document.querySelector('.search-color');
const searchImage = document.querySelector('#search-image');
const typeSelect = document.querySelector('#palette-type');
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
