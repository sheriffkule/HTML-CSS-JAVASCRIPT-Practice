const container = document.querySelector('.container');
const size = document.getElementById('size');
const gapSlider = document.getElementById('gap');
const modeBtn = document.getElementById('mode');
const shapeBtn = document.getElementById('shape');
const colorBtn = document.getElementById('color');
const colorPicker = document.getElementById('color-picker');
const randomBtn = document.getElementById('random-color');
const clearBtn = document.getElementById('clear');
const saveBtn = document.getElementById('save');
const hideBtn = document.getElementById('hide');

let spanBg = '#1e1f26';
let shape = 'square'; //square, circle, triangle, diamond, star, pentagon
let mode = 'draw';
let color = '#ff0000';
let singleColor = false;

let colors = [
  '#ff0000',
  '#ff4000',
  '#ff8000',
  '#ffbf00',
  '#ffff00',
  '#bfff00',
  '#80ff00',
  '#40ff00',
  '#00ff00',
  '#00ff40',
  '#00ff80',
  '#00ffbf',
  '#00ffff',
  '#00bfff',
  '#0080ff',
  '#0040ff',
  '#0000ff',
  '#4000ff',
  '#8000ff',
  '#bf00ff',
  '#ff00ff',
  '#ff00bf',
  '#ff0080',
  '#ff0040',
  '#ff0000',
];

function createGrid() {
  container.innerHTML = '';
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  const spanWidth = parseInt(size.value);
  const spanHeight = parseInt(size.value);
  const gap = parseInt(gapSlider.value);

  const columns = Math.round(containerWidth / (spanWidth + gap));
  const rows = Math.round(containerHeight / (spanHeight + gap));

  for (let i = 0; i < rows; i++) {
    const row = document.createElement('div');
    row.classList.add('row');

    for (let j = 0; j < columns; j++) {
      const span = document.createElement('span');
      span.style.width = `${spanWidth}px`;
      span.style.height = `${spanHeight}px`;
      span.style.margin = `${gap / 2}px`;
      span.style.backgroundColor = spanBg;

      if (shape === 'circle') {
        span.style.borderRadius = '50%';
      }

      if (shape === 'triangle') {
        span.style.width = 0;
        span.style.height = 0;
        span.style.backgroundColor = 'transparent';
        span.style.borderLeft = `${spanWidth / 2}px solid transparent`;
        span.style.borderRight = `${spanWidth / 2}px solid transparent`;
        span.style.borderBottom = `${spanHeight}px solid ${spanBg}`;
      }

      if (shape === 'diamond') {
        span.style.transform = 'rotate(45deg)';
      }

      if (shape === 'star') {
        span.style.clipPath =
          'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
      }

      if (shape === 'pentagon') {
        span.style.clipPath = 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)';
      }

      row.appendChild(span);
    }

    container.appendChild(row);
  }
}

createGrid();

window.addEventListener('resize', () => {
  createGrid();
});

document.addEventListener('mousedown', function () {
  document.addEventListener('mousemove', mouseMoveHandler);
});

document.addEventListener('mouseup', function () {
  document.removeEventListener('mousemove', mouseMoveHandler);
});

function mouseMoveHandler(event) {
  const target = event.target;

  if (target.tagName === 'SPAN') {
    if (mode === 'draw') {
      draw(target);
    } else {
      erase(target);
    }
  }
}

document.addEventListener('touchstart', function () {
  document.addEventListener('touchmove', touchMoveHandler);
});

document.addEventListener('touchend', function () {
  document.addEventListener('touchmove', touchMoveHandler);
});

function touchMoveHandler(e) {
  let touch = e.touches[0];
  let targetElement = document.elementFromPoint(touch.clientX, touch.clientY);

  if (targetElement.tagName === 'SPAN') {
    if (mode === 'draw') {
      draw(targetElement);
    } else {
      erase(targetElement);
    }
  }
}

function draw(target) {
  let randomColor = singleColor ? color : colors[Math.floor(Math.random() * colors.length)];

  if (
    shape === 'square' ||
    shape === 'circle' ||
    shape === 'diamond' ||
    shape === 'star' ||
    shape === 'pentagon'
  ) {
    target.style.backgroundColor = randomColor;
  }

  if (shape === 'triangle') {
    const spanHeight = parseInt(size.value);
    target.style.borderBottom = `${spanHeight}px solid ${randomColor}`;
  }

  if (shape !== 'triangle') {
    target.style.boxShadow = `0 0 2px ${randomColor}, 0 0 10px ${randomColor}`;
  }
}

function erase(target) {
  if (
    shape === 'square' ||
    shape === 'circle' ||
    shape === 'diamond' ||
    shape === 'star' ||
    shape === 'pentagon'
  ) {
    target.style.backgroundColor = spanBg;
  }

  if (shape === 'triangle') {
    const spanHeight = parseInt(size.value);
    target.style.borderBottom = `${spanHeight}px solid ${spanBg}`;
  }

  target.style.boxShadow = 'none';
}

modeBtn.addEventListener('click', () => {
  mode = mode === 'draw' ? 'erase' : 'draw';
  modeBtn.textContent = mode;
});

shapeBtn.addEventListener('click', () => {
  const shapes = ['square', 'circle', 'triangle', 'diamond', 'star', 'pentagon'];
  const index = shapes.indexOf(shape);

  if (index < shapes.length - 1) {
    shape = shapes[index + 1];
  } else {
    shape = shapes[0];
  }

  shapeBtn.textContent = shape;

  createGrid();
});

colorBtn.addEventListener('click', () => {
  colorPicker.click();
});

colorPicker.addEventListener('change', (e) => {
  color = e.target.value;
  colorBtn.style.backgroundColor = color;

  singleColor = true;
});

randomBtn.addEventListener('click', () => {
  singleColor = false;
  colorBtn.style.backgroundColor = '#0080ff';
});

size.addEventListener('input', () => {
  createGrid();
});

gapSlider.addEventListener('input', () => {
  createGrid();
});

function clear() {
  const spans = document.querySelectorAll('span');

  spans.forEach((span) => {
    draw(span);
    setTimeout(() => {
      erase(span);
    }, 1000);
  });
  colorBtn.style.backgroundColor = '#0080ff';
}

clearBtn.addEventListener('click', clear);

function download() {
  html2canvas(container).then(function (canvas) {
    let link = document.createElement('a');
    link.download = 'SheriffKule.png';
    link.href = canvas.toDataURL();
    link.click();
  });
}

saveBtn.addEventListener('click', download);

hideBtn.addEventListener('click', () => {
  const btns = document.querySelector('.btns');
  btns.classList.toggle('hide');
  hideBtn.textContent = btns.classList.contains('hide') ? 'Show Panel' : 'Hide Panel';
});

document.getElementById('year').textContent = new Date().getFullYear();
