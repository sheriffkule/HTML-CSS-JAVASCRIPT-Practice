document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const rowsInput = document.getElementById('rows');
  const colsInput = document.getElementById('columns');
  const gapInput = document.getElementById('gap');
  const gapValue = document.getElementById('gap-value');
  const cellMinInput = document.getElementById('cell-min');
  const cellMinValue = document.getElementById('cell-min-value');
  const gridTypeSelect = document.getElementById('grid-type');
  const alignItemsSelect = document.getElementById('align-items');
  const justifyItemsSelect = document.getElementById('justify-items');
  const cellColorInput = document.getElementById('cell-color');
  const cellTextCheckbox = document.getElementById('cell-text');
  const gridPreview = document.getElementById('grid-preview');
  const refreshBtn = document.getElementById('refresh-btn');
  const copyBtn = document.getElementById('copy-btn');
  const exportBtn = document.getElementById('export-btn');
  const addRowBtn = document.getElementById('add-row');
  const removeRowBtn = document.getElementById('remove-row');
  const addColBtn = document.getElementById('add-col');
  const removeColBtn = document.getElementById('remove-col');
  const presetBtns = document.querySelectorAll('.preset-btn');
  const codeTabs = document.querySelectorAll('.code-tab');
  const htmlCode = document.getElementById('html-code').querySelector('code');
  const cssCode = document.getElementById('css-code').querySelector('code');
  const combinedCode = document.getElementById('combined-code').querySelector('code');
  const codeSize = document.getElementById('code-size');
  const codeLines = document.getElementById('code-lines');
  const notification = document.getElementById('notification');

  // Initial values
  let rows = parseInt(rowsInput.value);
  let cols = parseInt(colsInput.value);
  let gap = parseInt(gapInput.value);
  let cellMinHeight = parseInt(cellMinInput.value);
  let gridType = gridTypeSelect.value;
  let alignItems = alignItemsSelect.value;
  let justifyItems = justifyItemsSelect.value;
  let cellColor = cellColorInput.value;
  let showCellText = cellTextCheckbox.checked;

  // Update displayed values
  gapValue.textContent = `${gap}px`;
  cellMinValue.textContent = `${cellMinHeight}`;

  // Changing colors on input type range track
  document.querySelectorAll('input[type="range"]').forEach((input) => {
    const updateTrack = () => {
      const val = ((input.value - input.min) / (input.max - input.min)) * 100;
      input.style.backgroundImage = `linear-gradient(to right, var(--success), var(--primary) ${val}%, var(--light) ${val}%)`;
    };
    input.addEventListener('input', updateTrack);
    updateTrack();
  });

  // Event listeners for inputs
  rowsInput.addEventListener('change', updateGrid);
  colsInput.addEventListener('change', updateGrid);
  gapInput.addEventListener('input', function () {
    gap = parseInt(this.value);
    gapValue.textContent = `${gap}px`;
    updateGrid();
  });

  cellMinInput.addEventListener('input', function () {
    cellMinHeight = parseInt(this.value);
    cellMinValue.textContent = `${cellMinHeight}`;
    updateGrid();
  });

  gridTypeSelect.addEventListener('change', function () {
    gridType = this.value;
    updateGrid();
  });

  alignItemsSelect.addEventListener('change', function () {
    alignItems = this.value;
    updateGrid();
  });

  justifyItemsSelect.addEventListener('change', function () {
    justifyItems = this.value;
    updateGrid();
  });

  cellColorInput.addEventListener('input', function () {
    cellColor = this.value;
    updateGrid();
  });

  cellTextCheckbox.addEventListener('change', function () {
    showCellText = this.checked;
    updateGrid();
  });

  // Button event listeners
  refreshBtn.addEventListener('click', updateGrid);
  copyBtn.addEventListener('click', copyCode);
  exportBtn.addEventListener('click', exportCode);
  addRowBtn.addEventListener('click', () => {
    rows = Math.min(12, rows + 1);
    rowsInput.value = rows;
    updateGrid();
  });

  removeRowBtn.addEventListener('click', () => {
    rows = Math.min(12, rows - 1);
    rowsInput.value = rows;
    updateGrid();
  });

  addColBtn.addEventListener('click', () => {
    cols = Math.min(12, cols + 1);
    colsInput.value = cols;
    updateGrid();
  });

  removeColBtn.addEventListener('click', () => {
    cols = Math.min(12, cols - 1);
    updateGrid();
  });

  // Preset buttons
  presetBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      rows = parseInt(this.dataset.rows);
      cols = parseInt(this.dataset.cols);
      rowsInput.value = rows;
      colsInput.value = cols;
      updateGrid();
    });
  });

  // Code tabs
  codeTabs.forEach((tab) => {
    tab.addEventListener('click', function () {
      const tabName = this.dataset.tab;

      // Update active tab
      codeTabs.forEach((t) => t.classList.remove('active'));
      this.classList.add('active');

      // Show corresponding code
      document.querySelectorAll('.code-content').forEach((content) => {
        content.classList.remove('active');
      });
      document.getElementById(`${tabName}-code`).classList.add('active');
    });
  });

  // Generate grid template based on type
  function getGridTemplate() {
    switch (gridType) {
      case 'static':
        return `repeat(${rows}, ${cellMinHeight}px) / repeat(${cols}), ${cellMinHeight}px)`;
      case 'flexible':
        return `repeat(${rows}, 1fr) / repeat(${cols}, 1fr)`;
      case 'auto':
        return `repeat(auto-fill, minmax(${cellMinHeight}px, 1fr))`;
      case 'mixed':
        return `repeat(${rows}, minmax(${cellMinHeight}px, 1fr)) / repeat(${cols}, minmax(${cellMinHeight}px, 1fr))`;
      default:
        return `repeat(${rows}, 1fr) / repeat(${cols}, 1fr)`;
    }
  }

  // Update grid preview
  function updateGrid() {
    // Clear existing grid
    gridPreview.innerHTML = '';

    // Set grid styles
    gridPreview.style.gap = `${gap}px`;
    gridPreview.style.alignItems = alignItems;
    gridPreview.style.justifyItems = justifyItems;
    gridPreview.style.gridTemplate = getGridTemplate();

    // Create cells
    const cellCount = rows * cols;
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div');
      cell.className = 'grid-cell';
      cell.style.backgroundColor = hexToRgba(cellColor, 0.2);
      cell.style.borderColor = cellColor;
      cell.style.minHeight = `${cellMinHeight}px`;

      if (showCellText) {
        const row = Math.floor(i / cols) + 1;
        const col = (i % cols) + 1;
        cell.textContent = `${row}-${col}`;
      }

      gridPreview.appendChild(cell);
    }

    // Generate code
    generateCode();
  }

  // Generate HTML, CSS, and combined code
  function generateCode() {
    // HTML code
    let html = `<div class="grid-container">\n;`;

    for (let i = 0; i < rows * cols; i++) {
      const row = Math.floor(i / cols) + 1;
      const col = (i % cols) + 1;
      html += `   <div class="grid-item">Item ${row}-${col}</div>\n`;
    }

    // CSS code
    let css = '.grid-container {\n';
    css += `   display: grid;\n`;
    css += `   grid-template: ${getGridTemplate()};\n`;
    css += `   gap: ${gap}px;\n`;
    css += `   align-items: ${alignItems};\n`;
    css += `   justify-items: ${justifyItems}\n`;
    css += `}\n\n`;
    css += `grid-item {\n`;
    css += `   min-height: ${cellMinHeight}px;\n`;
    css += `   background-color: ${hexToRgba(cellColor, 0.2)};\n`;
    css += `   border: 1px solid ${cellColor};\n`;
    css += `   display: flex;\n`;
    css += `   align-items: center;\n`;
    css += `   justify-content: center;\n`;

    // Combined code
    const combined = `<style>\n${css}\n</style>\n\n${html}`;

    // Update code displays
    htmlCode.textContent = html;
    cssCode.textContent = css;
    combinedCode.textContent = combined;

    // Update code metrics
    updateCodeMetrics(combined);
  }

  // Update code size and line count
  function updateCodeMetrics(code) {
    const size = new Blob([code]).size;
    const lines = code.split('\n').length;

    // Format size
    let sizeText;
    if (size < 1024) {
      sizeText = `${size} bytes`;
    } else {
      sizeText = `${(size / 1024).toFixed(2)} KB`;
    }

    codeSize.textContent = sizeText;
    codeLines.textContent = `${lines} lines`;
  }

  // Copy code to clipboard
  function copyCode() {
    const activeTab = document.querySelector('.code-tab.active');
    const tabName = activeTab.dataset.tab;
    const codeElement = document.getElementById(`${tabName}-code`);
    const code = codeElement.textContent;

    navigator.clipboard.writeText(cede).then(() => {
      showNotification();
    });
  }
});
