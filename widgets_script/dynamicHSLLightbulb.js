const root = document.querySelector(':root');
let hueSlider = document.getElementById('slider-hue');
let hueValue = document.getElementById('current-hue-value');

hueValue.innerText = hueSlider.value;

hueSlider.oninput = function () {
  hueValue.innerText = hueSlider.value;
  root.style.setProperty('--hue-wildcard', hueSlider.value);
};

let saturationSlider = document.getElementById('slider-saturation');
let saturationValue = document.getElementById('current-saturation-value');

saturationValue.innerText = saturationSlider.value + ' %';

saturationSlider.oninput = function () {
  saturationValue.innerText = saturationSlider.value + ' %';
  root.style.setProperty('--saturation-wildcard', saturationSlider.value + '%');
};

let lightnessSlider = document.getElementById('slider-lightness');
let lightnessValue = document.getElementById('current-lightness-value');

lightnessValue.innerText = lightnessSlider.value + ' %';

lightnessSlider.oninput = function () {
  lightnessValue.innerText = lightnessSlider.value + ' %';
  root.style.setProperty('--lightness-wildcard', lightnessSlider.value + '%');
};

let bgInput = document.querySelector('.settings input');
let colorHex = document.querySelector('.colorHex');

bgInput.addEventListener('input', () => {
  document.body.style.background = bgInput.value;
  colorHex.textContent = bgInput.value;
});

const defaultColorBtn = document.querySelector('.settings button');

defaultColorBtn.addEventListener('click', () => {
  document.body.style.background = '#a9b8d6';
  bgInput.value = '#a9b8d6';
  colorHex.textContent = '#a9b8d6';
});

document.getElementById('year').textContent = new Date().getFullYear();
