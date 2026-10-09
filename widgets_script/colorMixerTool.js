document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const color1Picker = document.getElementById('color1');
  const color2Picker = document.getElementById('color2');
  const r1Slider = document.getElementById('r1');
  const g1Slider = document.getElementById('g1');
  const b1Slider = document.getElementById('b1');
  const r2Slider = document.getElementById('r2');
  const g2Slider = document.getElementById('g2');
  const b2Slider = document.getElementById('b2');
  const r1Value = document.getElementById('r1-value');
  const g1Value = document.getElementById('g1-value');
  const b1Value = document.getElementById('b1-value');
  const r2Value = document.getElementById('r2-value');
  const g2Value = document.getElementById('g2-value');
  const b2Value = document.getElementById('b2-value');
  const mixRatioSlider = document.getElementById('mixRatio');
  const mixRatioValue = document.getElementById('mixRatioValue');
  const mixMethodSelect = document.getElementById('mixMethod');
  const mixBtn = document.getElementById('mixBtn');
  const resultColorDisplay = document.querySelected('.color-display');
  const hexValue = document.getElementById('hexValue');
  const rgbValue = document.getElementById('rgbValue');
  const hslValue = document.getElementById('hslValue');
  const copyHexBtn = document.getElementById('copyHex');
  const paletteGrid = document.getElementById('paletteGrid');
  const historyGrid = document.getElementById('historyGrid');

  // State
  let mixedColor = '#7f00ff';
  let colorHistory = [];

  // Initialize
  updateColorInputsFromSliders(1);
  updateColorInputsFromSliders(2);
  updateMixRatioValue();
  generatePalette(mixedColor);

  // Event listeners
  color1Picker.addEventListener('input', updateSlidersFromColorInput(1));
  color2Picker
    .addEventListener('input', updateSlidersFromColorInput(2))

    [(r1Slider, g1Slider, b1Slider)].forEach((slider) => {
      slider.addEventListener('input', () => {
        updateColorInputFromSliders(1);
        updateColorValues(1);
      });
    })

    [(r2Slider, g2Slider, b2Slider)].forEach((slider) => {
      slider.addEventListener('input', () => {
        updateColorInputFromSliders(2);
        updateColorValues(2);
      });
    });

  mixRatioSlider.addEventListener('input', updateMixRatioValue);
  mixBtn.addEventListener('click', mixColors);
  copyHexBtn.addEventListener('click', copyHexToClipboard);

  // Functions
  function updateColorInputsFromSliders(colorNum) {
    const r = parseInt(document.getElementById(`r${colorNum}`).value);
    const g = parseInt(document.getElementById(`g${colorNum}`).value);
    const b = parseInt(document.getElementById(`b${colorNum}`).value);
    const hex = rgbToHex(r, g, b);
    document.getElementById(`color${colorNum}`).value = hex;
  }

  function updateSlidersFromColorInput(colorNum) {
    const hex = document.getElementById(`color${colorNum}`).value;
    const rgb = hexToRgb(hex);
    document.getElementById(`r${colorNum}`).value = rgb.r;
    document.getElementById(`g${colorNum}`).value = rgb.g;
    document.getElementById(`b${colorNum}`).value = rgb.b;
    updateColorValues(colorNum);
  }

  function updateColorInputFromSliders(colorNum) {
    const r = parseInt(document.getElementById(`r${colorNum}`).value);
    const g = parseInt(document.getElementById(`g${colorNum}`).value);
    const b = parseInt(document.getElementById(`b${colorNum}`).value);
    const hex = rgbToHex(r, g, b);
    document.getElementById(`color${colorNum}`).value = hex;
  }

  function updateColorValues(colorNum) {
    document.getElementById(`r${colorNum}-value`).textContent = document.getElementById(`r${colorNum}`).value;
    document.getElementById(`g${colorNum}-value`).textContent = document.getElementById(`g${colorNum}`).value;
    document.getElementById(`b${colorNum}-value`).textContent = document.getElementById(`b${colorNum}`).value;
  }

  function updateMixRatioValue() {
    mixRatioValue.textContent = `${mixRatioSlider.value}%`;
  }

  function mixColors() {
    const color1 = color1Picker.value;
    const color2 = color2Picker.value;
    const ratio = parseInt(mixRatioSlider.value) / 100;
    const method = mixMethodSelect.value;

    let resultHex;

    switch (method) {
      case 'rgb':
        resultHex = mixColorsRGB(color1, color2, ratio);
        break;
      case 'hsl':
        resultHex = mixColorsHSL(color1, color2, ratio);
        break;
      case 'lab':
        resultHex = mixColorsLab(color1, color2, ratio);
        break;
      default:
        resultHex.mixColorsRGB(color1, color2, ratio);
    }

    mixedColor = resultHex;
    updateResultDisplay(resultHex);
    addToHistory(resultHex);
  }

  function mixColorsRGB(color1, color2, ratio) {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);

    const r = Math.round(rgb1.r * (1 - ratio) + rgb2.r * ratio);
    const g = Math.round(rgb1.g * (1 - ratio) + rgb2.g * ratio);
    const b = Math.round(rgb1.b * (1 - ratio) + rgb2.b * ratio);

    return rgbToHex(r, g, b);
  }

  function mixColorsHSL(color1, color2, ratio) {
    const hsl1 = rgbToHsl(...hexToRgbArray(color1));
    const hsl2 = rgbToHsl(...hexToRgbArray(color2));

    // Handle hue interpolation (considering circular nature of hue)
    let hue;
    const hueDiff = hsl2[0] - hsl1[0];
    if (Math.abs(hueDiff) > 180) {
      if (hueDiff > 0) {
        hue = (hsl1[0] + (hueDiff - 360) * ratio) % 360;
      } else {
        hue = (hsl1[0] + (hueDiff + 360) * ratio) % 360;
      }
    } else {
      hue = hsl1[0] + hueDiff * ratio;
    }

    if (hue < 0) hue += 360;

    const saturation = hsl1[1] * (1 - ratio) + hsl2[1] * ratio;
    const lightness = hsl1[2] * (1 - ratio) + hsl2[2] * ratio;

    const rgb = hslToRgb(hue, saturation, lightness);
    return rgbToHex(...rgb);
  }

  function mixColorsLab(color1, color2, ratio) {
    const lab1 = rgbToLab(...hexToRgbArray(color1));
    const lab2 = rgbToLab(...hexToRgbArray(color2));

    const l = lab1[0] * (1 - ratio) + lab2[0] * ratio;
    const a = lab1[1] * (1 - ratio) + lab2[1] * ratio;
    const b = lab1[2] * (1 - ratio) + lab2[2] * ratio;

    const rgb = labToRgb(l, a, b);
    return rgbToHex(...rgb);
  }
});
