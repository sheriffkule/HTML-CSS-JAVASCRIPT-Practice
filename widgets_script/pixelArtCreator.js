document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const currentColorEl = document.getElementById('currentColor');
  const colorPaletteEl = document.getElementById('colorPalette');
  const pixelCanvasEl = document.getElementById('pixelCanvas');
  const canvasSizeSlider = document.getElementById('canvasSize');
  const sizeValueEl = document.getElementById('sizeValue');
  const resizeBtn = document.getElementById('resizeBtn');
  const clearBtn = document.getElementById('clearBtn');
  const saveBtn = document.getElementById('saveBtn');
  const pixelSizeInput = document.getElementById('pixelSize');
  const applyPixelSizeBtn = document.getElementById('applyPixelSize');
  const addColorBtn = document.getElementById('addColorBtn');
  const toolButtons = document.querySelectorAll('.tool-btn');

  // App state
  let currentColor = '#ff3e80';
  let currentTool = 'pencil';
  let isDrawing = false;
  let canvasSize = 16;
  let pixelSize = 25;

  // Default color pallette
  const defaultColors = [
    '#ff3e80',
    '#00bcd4',
    '#4caf50',
    '#ffeb3b',
    '#9c27b0',
    '#2196f3',
    '#8bc34a',
    '#ff9800',
    '#e91e63',
    '#03a9f4',
    '#cddc39',
    '#ff5722',
    '#673ab7',
    '#00bcd4',
    '#ffc107',
    '#795548',
    '#000000',
    '#555555',
    '#aaaaaa',
    '#ffffff',
  ];

  // Initialize the app
  function init() {
    renderColorPalette();
    updateCurrentColorDisplay();
    createCanvas();
    setupEventListeners();
  }

  // Render color palette
  function renderColorPalette() {
    colorPaletteEl.innerHTML = '';
    defaultColors.forEach((color) => {
      const colorCell = document.createElement('div');
      colorCell.className = 'color-cell';
      colorCell.style.backgroundColor = color;
      colorCell.dataset.color = color;
      colorPaletteEl.appendChild(colorCell);
    });
  }

  // Update current color display
  function updateCurrentColorDisplay() {
    currentColorEl.style.backgroundColor = currentColor;
  }

  // Create the canvas with pixels
  function createCanvas() {
    pixelCanvasEl.innerHTML = '';
    pixelCanvasEl.style.gridTemplateColumns = `repeat(${canvasSize}, 1fr)`;

    for (let i = 0; i < canvasSize * canvasSize; i++) {
      const pixel = document.createElement('div');
      pixel.className = 'pixel';
      pixel.style.width = `${pixelSize}px`;
      pixel.style.height = `${pixelSize}px`;
      pixelCanvasEl.appendChild(pixel);
    }
  }

  // Set up event listeners
  function setupEventListeners() {
    // Color palette selection
    colorPaletteEl.addEventListener('click', function (e) {
      if (e.target.classList.contains('color-cell')) {
        currentColor = e.target.dataset.color;
        updateCurrentColorDisplay();

        // Update active color cell
        document.querySelectorAll('.color-cell').forEach((cell) => {
          cell.classList.remove('active');
        });
        e.target.classList.add('active');
      }
    });

    // Canvas drawing
    pixelCanvasEl.addEventListener('mousedown', startDrawing);
    pixelCanvasEl.addEventListener('mousemove', draw);
    pixelCanvasEl.addEventListener('mouseup', stopDrawing);

    // Prevent drag issues
    pixelCanvasEl.addEventListener('dragstart', (e) => e.preventDefault());

    // Tool selection
    toolButtons.forEach((btn) => {
      btn.addEventListener('click', function () {
        toolButtons.forEach((b) => b.classList.remove('active'));
        this.classList.add('active');
        currentTool = this.dataset.color;
      });
    });

    // Canvas size slider
    canvasSizeSlider.addEventListener('input', function () {
      const size = this.value;
      sizeValueEl.textContent = `${size}x${size}`;
      canvasSize = parseInt(size);
    });
  }

  // Initialize the app
  init();
});
