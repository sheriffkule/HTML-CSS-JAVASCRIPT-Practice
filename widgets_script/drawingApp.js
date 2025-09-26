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

const drawRect = (e) => {};

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

function saveState() {}

canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mousemove', drawing);
canvas.addEventListener('mouseup', () => (isDrawing = false), saveState());

undoButton.addEventListener('click', () => {})

redoButton.addEventListener('click', () => {})