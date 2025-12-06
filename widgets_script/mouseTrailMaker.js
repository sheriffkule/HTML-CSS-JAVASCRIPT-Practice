const previewArea = document.getElementById('previewArea');
const sizeSlider = document.getElementById('size-slider');
const lengthSlider = document.getElementById('length-slider');
const opacitySlider = document.getElementById('opacity-slider');
const sizeValue = document.getElementById('size-value');
const lengthValue = document.getElementById('length-value');
const opacityValue = document.getElementById('opacity-value');
const colorOptions = document.querySelectorAll('.color-option');
const shapeOptions = document.querySelectorAll('.shape-option');
const toggleTrailBtn = document.getElementById('toggle-trail');
const clearTrailBtn = document.getElementById('clear-trail');
const randomModeBtn = document.getElementById('random-mode');

// Trail configuration
let config = {
  size: 20,
  length: 15,
  opacity: 0.7,
  color: '#ff3e3e',
  shape: 'circle',
  enabled: true,
  randomMode: false,
  trailElements: [],
};
