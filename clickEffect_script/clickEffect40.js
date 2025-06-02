let x = 0;
let output = document.getElementById('output');
let meter = document.getElementById('meter');
output.innerHTML = x;

function plus() {
  if (x >= 10) {
    return false;
  }

  if (x >= 7) {
    meter.style.background = '#f00';
    meter.style.filter = 'drop-shadow(0 0 3px #f00) drop-shadow(0 0 10px #f00)';
  }
  output.innerHTML = ++x;
  meter.style.height = x * 10 + '%';
  updateMaxCircleDisplay();
}

function minus() {
  if (x <= 0) {
    return false;
  }
  if (x <= 7) {
    meter.style.background = '#0f0';
    meter.style.filter = 'drop-shadow(0 0 3px #0f0) drop-shadow(0 0 10px #0f0)';
  }
  output.innerHTML = --x;
  meter.style.height = x * 10 + '%';
  updateMaxCircleDisplay();
}

const maxCircle = document.createElement('div');
maxCircle.classList.add('max-circle');
maxCircle.style.position = 'absolute';
maxCircle.style.top = '-10px';
maxCircle.style.left = '-5px';
maxCircle.style.width = '20px';
maxCircle.style.height = '20px';
maxCircle.style.borderRadius = '50%';
maxCircle.style.background = 'orange';
maxCircle.style.transform = 'scale(0)'
meter.appendChild(maxCircle);

function updateMaxCircleDisplay() {
  maxCircle.style.transform = x === 10 ? 'scale(1)' : 'scale(0)';
}

updateMaxCircleDisplay();
