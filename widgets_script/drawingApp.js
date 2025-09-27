/** @type {HTMLCanvasElement} */

const canvas = document.querySelector('canvas');
const toolBtns = document.querySelectorAll('.tool');
const fillColor = document.getElementById('fillColor');
const sizeSlider = document.getElementById('sizeSlider');
const colorBtns = document.querySelectorAll('.colors .options');
const colorPicker = document.getElementById('colorPicker');
const clearCanvas = document.querySelector('.clearCanvas');
const saveImage = document.querySelector('.saveImg');
const ctx = canvas.getContext('2d');
const undoButton = document.getElementById('undo');
const redoButton = document.getElementById('redo');

let prevMouseX;
let prevMouseY;
let snapshot;
let isDrawing = false;
let selectedTool = 'pencil';
let brushWidth = 5;
let selectedColor = '#00f';

let history = [];
let historyStop = -1;

const setCanvasBackground = () => {
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = selectedColor;
};

window.addEventListener('load', () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});

toolBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    document.querySelector('.options .active').classList.remove('active');
    btn.classList.add('active');
    selectedTool = btn.id;
    console.log(btn.id);
  });
});

const startDraw = (e) => {
  isDrawing = true;
  prevMouseX = e.offsetX;
  prevMouseY = e.offsetY;

  ctx.beginPath();
  ctx.lineWidth = brushWidth;
  ctx.strokeStyle = selectedColor;
  ctx.fillStyle = selectedColor;
  snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
};

const drawPencil = (e) => {
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.shadowBlur = 0;
  ctx.stroke();
};

const drawRect = (e) => {
  const width = e.offsetX - prevMouseX;
  const height = e.offsetY - prevMouseY;
  if (!fillColor.checked) {
    return ctx.strokeRect(prevMouseX, prevMouseY, width, height);
  }
  ctx.fillRect(prevMouseX, prevMouseY, width, height);
};

const drawCircle = (e) => {
  ctx.beginPath();
  let radius = Math.sqrt(Math.pow(prevMouseX - e.offsetX, 2) + Math.pow(prevMouseY - e.offsetY, 2));
  ctx.arc(prevMouseX, prevMouseY, radius, 0, Math.PI * 2);
  fillColor.checked ? ctx.fill() : ctx.stroke();
};

const drawTriangle = (e) => {
  ctx.beginPath();
  ctx.moveTo(prevMouseX, prevMouseY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
  ctx.closePath();
  fillColor.checked ? ctx.fill() : ctx.stroke();
};

const drawSquare = (e) => {
  const sideLength = Math.abs(prevMouseX - e.offsetX);
  ctx.beginPath();
  ctx.rect(e.offsetX, e.offsetY, sideLength, sideLength);
  fillColor.checked ? ctx.fill() : ctx.stroke();
};

const drawHexagon = (e) => {
  const sideLength = Math.abs(prevMouseX - e.offsetX);
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = ((2 * Math.PI) / 6) * i;
    const x = e.offsetX + sideLength * Math.cos(angle);
    const y = e.offsetY + sideLength * Math.sin(angle);
    ctx.lineTo(x, y);
  }
  ctx.closePath();
  fillColor.checked ? ctx.fill() : ctx.stroke();
};

const drawPentagon = (e) => {
  const sideLength = Math.abs(prevMouseX - e.offsetX);
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const angle = ((2 * Math.PI) / 5) * i - Math.PI / 2;
    const x = e.offsetX + sideLength * Math.cos(angle);
    const y = e.offsetY + sideLength * Math.sin(angle);
    ctx.lineTo(x, y);
  }
  ctx.closePath();
  fillColor.checked ? ctx.fill() : ctx.stroke();
};

const drawLine = (e) => {
  ctx.beginPath();
  ctx.moveTo(prevMouseX, prevMouseY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
};

const drawArrow = (e) => {
  const headLength = 15;
  const angle = Math.atan2(e.offsetY - prevMouseY, e.offsetX - prevMouseX);
  ctx.beginPath();
  ctx.moveTo(prevMouseX, prevMouseY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(
    e.offsetX - headLength * Math.cos(angle - Math.PI / 6),
    e.offsetY - headLength * Math.sin(angle - Math.PI / 6)
  );
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.lineTo(
    e.offsetX - headLength * Math.cos(angle + Math.PI / 6),
    e.offsetY - headLength * Math.sin(angle + Math.PI / 6)
  );
  ctx.closePath();
  ctx.fill();
};

sizeSlider.addEventListener('change', () => {
  brushWidth = sizeSlider.value;
});

colorPicker.addEventListener('change', () => {
  colorPicker.parentElement.style.background = colorPicker.value;
  colorPicker.parentElement.click();
});

colorBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const selectedBtn = document.querySelector('.options .option .selected');
    if (selectedBtn) {
      selectedBtn.classList.remove('selected');
    }
    btn.classList.add('selected');
    selectedColor = window.getComputedStyle(btn).getPropertyValue('background-color');
  });
});

const drawBrush = (e) => {
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.shadowColor = selectedColor;
  ctx.shadowBlur = 15;
  ctx.stroke();
};

const drawing = (e) => {
  if (!isDrawing) return;
  ctx.putImageData(snapshot, 0, 0);

  if ((selectedTool === 'pencil' && selectedTool === 'brush') || selectedTool === 'eraser') {
    ctx.strokeStyle = selectedTool === 'eraser' ? '#fff' : selectedColor;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  } else if (selectedTool === 'rectangle') {
    drawRect(e);
  } else if (selectedTool === 'circle') {
    drawCircle(e);
  } else if (selectedTool === 'triangle') {
    drawTriangle(e);
  } else if (selectedTool === 'square') {
    drawSquare(e);
  } else if (selectedTool === 'hexagon') {
    drawHexagon(e);
  } else if (selectedTool === 'pentagon') {
    drawPentagon(e);
  } else if (selectedTool === 'line') {
    drawLine(e);
  } else if (selectedTool === 'arrow') {
    drawArrow(e);
  } else if (selectedTool === 'curve') {
    drawCurve(e);
  } else if (selectedTool === 'brush') {
    drawBrush(e);
  } else {
    drawPencil(e);
  }

  drawPencil(e);
};

function saveState() {
  history = history.slice(0, historyStop + 1);
  history.push(canvas.toDataURL());
  historyStop++;
}

canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mousemove', drawing);
canvas.addEventListener('mouseup', (e) => {
  isDrawing = false;
  saveState();
});

undoButton.addEventListener('click', () => {
  if (historyStop >= 0) {
    historyStop--;
    const img = new Image();
    img.src = history[historyStop];
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
  }
  if (historyStop == -1) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
});

redoButton.addEventListener('click', () => {
  if (historyStop < history.length - 1) {
    historyStop++;
    const img = new Image();
    img.src = history[historyStop];
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
  }
});
