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

let hsl = [155, 55, 55];
let palette = generateShadesPalette(hsl, 6);
console.log(palette);
