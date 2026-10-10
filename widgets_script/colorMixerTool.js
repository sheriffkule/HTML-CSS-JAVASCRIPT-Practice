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
  const resultColorDisplay = document.querySelector('.color-display');
  const hexValue = document.getElementById('hexValue');
  const rgbValue = document.getElementById('rgbValue');
  const hslValue = document.getElementById('hslValue');
  const copyHexBtn = document.getElementById('copyHex');
  const paletteGrid = document.getElementById('paletteGrid');
  const historyGrid = document.getElementById('historyGrid');

  // State
  let mixedColor = '#7f00ff';
  let colorHistory = loadColorHistory();

  // Initialize
  updateColorInputsFromSliders(1);
  updateColorInputsFromSliders(2);
  updateMixRatioValue();
  generatePalette(mixedColor);
  updateHistoryDisplay();

  // Event listeners
  color1Picker.addEventListener('input', () => updateSlidersFromColorInput(1));
  color2Picker.addEventListener('input', () => updateSlidersFromColorInput(2));

  [r1Slider, g1Slider, b1Slider].forEach((slider) => {
    slider.addEventListener('input', () => {
      updateColorInputFromSliders(1);
      updateColorValues(1);
    });
  });

  [r2Slider, g2Slider, b2Slider].forEach((slider) => {
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
    if (mixRatioValue) {
      mixRatioValue.textContent = `${mixRatioSlider.value}%`;
    }
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
        resultHex = mixColorsRGB(color1, color2, ratio);
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

  function updateResultDisplay(hex) {
    // Update the display color
    resultColorDisplay.style.setProperty('--result-color', hex);

    // Update the color values
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    hexValue.value = hex.toUpperCase();
    rgbValue.value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    hslValue.value = `hsl(${Math.round(hsl[0])}, ${Math.round(hsl[1] * 100)}%, ${Math.round(hsl[2] * 100)}%)`;

    // Generate palette
    generatePalette(hex);
  }

  function generatePalette(baseColor) {
    paletteGrid.innerHTML = '';
    const rgb = hexToRgb(baseColor);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    // Generate analogous colors
    const analogous1 = hslToRgb((hsl[0] + 30) % 360, hsl[1], hsl[2]);
    const analogous2 = hslToRgb((hsl[0] + 30 + 360) % 360, hsl[1], hsl[2]);

    // Generate complementary
    const complementary = hslToRgb((hsl[0] + 180) % 360, hsl[1], hsl[2]);

    // Generate triadic
    const triadic1 = hslToRgb((hsl[0] + 120) % 360, hsl[1], hsl[2]);
    const triadic2 = hslToRgb((hsl[0] + 240) % 360, hsl[1], hsl[2]);

    // Create shades and tints
    const shade = hslToRgb(hsl[0], hsl[1], Math.max(0, hsl[2] - 0.2));
    const tint = hslToRgb(hsl[0], hsl[1], Math.min(1, hsl[2] + 0.2));

    // Generate saturated and desaturated
    const saturated = hslToRgb(hsl[0], Math.min(1, hsl[1] + 0.3), hsl[2]);
    const desaturated = hslToRgb(hsl[0], Math.max(0, hsl[1] - 0.3), hsl[2]);

    const paletteColors = [
      baseColor,
      rgbToHex(...analogous1),
      rgbToHex(...analogous2),
      rgbToHex(...complementary),
      rgbToHex(...triadic1),
      rgbToHex(...triadic2),
      rgbToHex(...shade),
      rgbToHex(...tint),
      rgbToHex(...saturated),
      rgbToHex(...desaturated),
    ];

    paletteColors.forEach((color) => {
      const colorDiv = document.createElement('div');
      colorDiv.className = 'palette-color';
      colorDiv.style.backgroundColor = color;
      colorDiv.setAttribute('data-hex', color.toUpperCase());
      colorDiv.addEventListener('click', () => {
        navigator.clipboard.writeText(color.toUpperCase());
        showTooltip(colorDiv, 'Copied');
      });
      paletteGrid.appendChild(colorDiv);
    });
  }

  function showTooltip(element, message) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = message;
    element.appendChild(tooltip);

    setTimeout(() => {
      tooltip.remove();
    }, 1000);
  }

  function addToHistory(color) {
    if (colorHistory.includes(color)) {
      colorHistory = colorHistory.filter((c) => c !== color);
    }

    colorHistory.unshift(color);
    if (colorHistory.length > 12) {
      colorHistory.pop();
    }

    saveColorHistory();
    updateHistoryDisplay();
  }

  function loadColorHistory() {
    try {
      const savedHistory = localStorage.getItem('colorMixerHistory');
      if (savedHistory === null) {
        return [];
      }

      const parsedHistory = JSON.parse(savedHistory);
      if (!Array.isArray(parsedHistory)) {
        console.warn('Saved color history is not an array; ignoring it.');
        return [];
      }

      const validColors = parsedHistory
        .filter((color) => typeof color === 'string' && /^#[\da-f]{6}$/i.test(color))
        .map((color) => color.toUpperCase());

      return [...new Set(validColors)].slice(0, 12);
    } catch (error) {
      console.warn('Unable to load saved color history from localStorage.', error);
      return [];
    }
  }

  function saveColorHistory() {
    try {
      localStorage.setItem('colorMixerHistory', JSON.stringify(colorHistory));
    } catch (error) {
      console.error('Unable to save color history to localStorage.', error);
    }
  }

  function updateHistoryDisplay() {
    historyGrid.innerHTML = '';

    colorHistory.forEach((color) => {
      const historyItem = document.createElement('div');
      historyItem.className = 'history-item';
      historyItem.style.backgroundColor = color;
      historyItem.addEventListener('click', () => {
        // Set as color1 when clicked
        color1Picker.value = color;
        updateSlidersFromColorInput(1);
      });
      historyGrid.appendChild(historyItem);
    });
  }

  function copyHexToClipboard() {
    navigator.clipboard.writeText(hexValue.value);

    // Change button text temporarily
    const originalText = copyHexBtn.textContent;
    copyHexBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';

    setTimeout(() => {
      copyHexBtn.innerHTML = originalText;
    }, 2000);
  }

  // Helper functions
  function hexToRgb(hex) {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return { r, g, b };
  }

  function hexToRgbArray(hex) {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return [r, g, b];
  }

  function rgbToHex(r, g, b) {
    const toHex = (value) => value.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  }

  function rgbToHsl(r, g, b) {
    ((r /= 255), (g /= 255), (b /= 255));
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h *= 60;
    }

    return [h, s, l];
  }

  function hslToRgb(h, s, l) {
    let r, g, b;

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h / 360 + 1 / 3);
      g = hue2rgb(p, q, h / 360);
      b = hue2rgb(p, q, h / 360 - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }

  function rgbToLab(r, g, b) {
    const srgb = [r / 255, g / 255, b / 255].map((channel) => {
      const value = channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
      return value;
    });

    const x = srgb[0] * 0.4124 + srgb[1] * 0.3576 + srgb[2] * 0.1805;
    const y = srgb[0] * 0.2126 + srgb[1] * 0.7152 + srgb[2] * 0.0722;
    const z = srgb[0] * 0.0193 + srgb[1] * 0.1192 + srgb[2] * 0.9505;

    const xRef = 0.95047;
    const yRef = 1;
    const zRef = 1.08883;

    const fx = x / xRef > 0.008856 ? (x / xRef) ** (1 / 3) : 7.787 * (x / xRef) + 16 / 116;
    const fy = y / yRef > 0.008856 ? (y / yRef) ** (1 / 3) : 7.787 * (y / yRef) + 16 / 116;
    const fz = z / zRef > 0.008856 ? (z / zRef) ** (1 / 3) : 7.787 * (z / zRef) + 16 / 116;

    return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
  }

  function labToRgb(l, a, b) {
    const fy = (l + 16) / 116;
    const fx = fy + a / 500;
    const fz = fy - b / 200;

    const x = fx ** 3 > 0.008856 ? fx ** 3 : (116 * fx - 16) / 903.3;
    const y = l > 8 ? fy ** 3 : l / 903.3;
    const z = fz ** 3 > 0.008856 ? fz ** 3 : (116 * fz - 16) / 903.3;

    const xRgb = x * 3.2406 + y * -1.5372 + z * -0.4986;
    const yRgb = x * -0.9689 + y * 1.8758 + z * 0.0415;
    const zRgb = x * 0.0557 + y * -0.204 + z * 1.057;

    const toSrgb = (value) => {
      const linear = value <= 0.0031308 ? 12.92 * value : 1.055 * value ** (1 / 2.4) - 0.055;
      return Math.min(1, Math.max(0, linear));
    };

    const r = toSrgb(xRgb) * 255;
    const g = toSrgb(yRgb) * 255;
    const bChannel = toSrgb(zRgb) * 255;

    return [Math.round(r), Math.round(g), Math.round(bChannel)];
  }

  // Changing colors on input type range track
  document.querySelectorAll('input[type="range"]').forEach((input) => {
    const updateTrack = () => {
      const min = Number.parseFloat(input.min) || 0;
      const max = Number.parseFloat(input.max) || 100;
      const value = Number.parseFloat(input.value);
      const ratio = Math.min(Math.max((value - min) / (max - min), 0), 1);
      const val = ratio * 100;

      input.style.backgroundImage = `linear-gradient(to right, var(--success) 0%, var(--primary) ${val}%, #a0a0c0 ${val}%, #a0a0c0 100%)`;
    };

    input.addEventListener('mousedown', updateTrack);
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
});
