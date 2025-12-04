const colorPicker = document.getElementById('color-picker');
colorPicker.value = '#06020f';

function hexToRgb(input) {
  let hex = input.slice(1);
  let arrBuff = new ArrayBuffer(4);
  let vw = new DataView(arrBuff);
  vw.setUint32(0, parseInt(hex, 16), false);
  let arrByte = new Uint8Array(arrBuff);

  return arrByte[1] + ',' + arrByte[2] + ',' + arrByte[3];
}

function hexToHSL(H) {
  let r = 0;
  let g = 0;
  let b = 0;
  if (H.length == 4) {
    r = '0x' + H[1] + H[1];
    g = '0x' + H[2] + H[2];
    b = '0x' + H[3] + H[3];
  } else if (H.length == 7) {
    r = '0x' + H[1] + H[2];
    g = '0x' + H[3] + H[4];
    b = '0x' + H[5] + H[6];
  }
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b);
  let cmax = Math.max(r, g, b);
  let delta = cmax - cmin;
  let h = 0;
  let s = 0;
  let l = 0;

  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return 'hsl(' + h + ',' + s + '%,' + l + '%)';
}

const hexValue = document.getElementById('hex-value')
const rgbValue = document.getElementById('rgb-value')
const hslValue = document.getElementById('hsl-value')

colorPicker.addEventListener('input', () => {
  const colorSelected = colorPicker.value;
  document.body.style.background = colorSelected;
  hexValue.textContent = colorSelected;
  rgbValue.textContent = 'rgb(' + hexToRgb(colorSelected) + ')';
  hslValue.textContent = hexToHSL(colorSelected);
});

function hex() {
    navigator.clipboard.writeText(hexValue.textContent)
    alert('Copied to Clipboard')
}

function rgb() {
    navigator.clipboard.writeText(rgbValue.textContent)
    alert('Copied to Clipboard')
}

function hsl() {
    navigator.clipboard.writeText(hslValue.textContent)
    alert('Copied to Clipboard')
}