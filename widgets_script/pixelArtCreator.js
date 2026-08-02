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
      if (color.toLowerCase() === currentColor.toLowerCase()) {
        colorCell.classList.add('active');
      }
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
        currentTool = this.dataset.tool;
      });
    });

    // Ensure drawing stops if mouse is released outside canvas
    document.addEventListener('mouseup', stopDrawing);
    pixelCanvasEl.addEventListener('mouseleave', stopDrawing);

    // Canvas size slider
    canvasSizeSlider.addEventListener('input', function () {
      const size = this.value;
      sizeValueEl.textContent = `${size}x${size}`;
      canvasSize = parseInt(size);
    });

    // Resize canvas
    resizeBtn.addEventListener('click', createCanvas);

    // Clear canvas
    clearBtn.addEventListener('click', function () {
      if (confirm('Are you sure you want to clear the canvas?')) {
        document.querySelectorAll('.pixel').forEach((pixel) => {
          pixel.style.backgroundColor = '#333355';
        });
      }
    });

    // Save canvas as image
    saveBtn.addEventListener('click', function () {
      const canvas = document.createElement('canvas');
      canvas.width = canvasSize * pixelSize;
      canvas.height = canvasSize * pixelSize;
      const ctx = canvas.getContext('2d');

      document.querySelectorAll('.pixel').forEach((pixel, index) => {
        const x = (index % canvasSize) * pixelSize;
        const y = Math.floor(index / canvasSize) * pixelSize;
        ctx.fillStyle = pixel.style.backgroundColor || '#333355';
        ctx.fillRect(x, y, pixelSize, pixelSize);
      });

      const link = document.createElement('a');
      link.download = 'pixel-art.png';
      link.href = canvas.toDataURL();
      link.click();
    });

    // Apply pixel size
    applyPixelSizeBtn.addEventListener('click', function () {
      const newSize = parseInt(pixelSizeInput.value);
      if (newSize > 0) {
        pixelSize = newSize;
        createCanvas();
      } else {
        alert('Pixel size must be a positive number.');
      }
    });

    // Add custom color
    addColorBtn.addEventListener('click', function () {
      const customColor = prompt('Enter a hex color code (e.g., #ff5733):');
      if (customColor && /^#([0-9A-F]{3}){1,2}$/i.test(customColor)) {
        defaultColors.push(customColor);
        renderColorPalette();
      } else {
        alert('Invalid color code. Please enter a valid hex color.');
      }
    });
  }

  // Drawing function
  function startDrawing(e) {
    if (e.button !== 0) return; // Only respond to left mouse button
    isDrawing = true;
    draw(e);
  }

  function draw(e) {
    if (!isDrawing) return;

    const pixel = e.target;
    if (!pixel.classList.contains('pixel')) return;

    if (currentTool === 'pencil') {
      pixel.style.backgroundColor = currentColor;
    } else if (currentTool === 'eraser') {
      pixel.style.backgroundColor = '#333355';
    } else if (currentTool === 'fill') {
      const targetColor = getPixelColor(pixel);
      const fillColor = normalizeColor(currentColor);
      if (targetColor !== fillColor) {
        floodFill(pixel, targetColor, fillColor);
      }
    } else if (currentTool === 'lighten') {
      const currentColorValue = getPixelColor(pixel);
      const newColor = lightenColor(currentColorValue, 20);
      pixel.style.backgroundColor = newColor;
    }
  }

  function stopDrawing() {
    isDrawing = false;
  }

  function getPixelColor(pixel) {
    const color = pixel.style.backgroundColor;
    if (color) return normalizeColor(color);
    return normalizeColor(window.getComputedStyle(pixel).backgroundColor || '#333355');
  }

  function normalizeColor(color) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000';
    ctx.fillStyle = color;
    const computed = ctx.fillStyle;
    if (computed.startsWith('rgb')) {
      return computed.replace(/\s+/g, '');
    }
    // Force a stable rgb string when canvas returns hex values
    const imageData = ctx.getImageData(0, 0, 1, 1).data;
    return `rgb(${imageData[0]},${imageData[1]},${imageData[2]})`;
  }

  function lightenColor(color, percent) {
    const normalized = normalizeColor(color);
    const match = normalized.match(/rgb\((\d+),(\d+),(\d+)\)/i);
    if (!match) return color;

    const r = parseInt(match[1], 10);
    const g = parseInt(match[2], 10);
    const b = parseInt(match[3], 10);
    const lighten = (value) => Math.min(255, Math.round(value + (255 - value) * (percent / 100)));

    return `rgb(${lighten(r)},${lighten(g)},${lighten(b)})`;
  }

  function floodFill(startPixel, targetColor, fillColor) {
    const pixels = Array.from(document.querySelectorAll('.pixel'));
    const width = canvasSize;
    const visited = new Set();
    const startIndex = pixels.indexOf(startPixel);
    if (startIndex === -1) return;

    const normalizedTarget = normalizeColor(targetColor);
    const normalizedFill = normalizeColor(fillColor);
    if (normalizedTarget === normalizedFill) return;

    const stack = [startIndex];

    while (stack.length) {
      const index = stack.pop();
      if (visited.has(index)) continue;
      visited.add(index);

      const pixel = pixels[index];
      if (normalizeColor(getPixelColor(pixel)) !== normalizedTarget) continue;
      pixel.style.backgroundColor = normalizedFill;

      const row = Math.floor(index / width);
      const col = index % width;
      if (col > 0) stack.push(index - 1);
      if (col < width - 1) stack.push(index + 1);
      if (row > 0) stack.push(index - width);
      if (row < width - 1) stack.push(index + width);
    }
  }

  // Initialize the app
  init();

  // Changing colors on input type range track
  document.querySelectorAll('input[type="range"]').forEach((input) => {
    const updateTrack = () => {
      const min = parseFloat(input.min) || 0;
      const max = parseFloat(input.max) || 100;
      const value = parseFloat(input.value);
      const ratio = Math.min(Math.max((value - min) / (max - min), 0), 1);
      const val = ratio * 100;

      input.style.backgroundImage = `linear-gradient(to right, #2575fc 0%, #0034cf ${val}%, #a0a0c0 ${val}%, #a0a0c0 100%)`;
    };
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
