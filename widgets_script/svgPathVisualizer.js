document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const pathInput = document.getElementById('path-input');
  const pathNameInput = document.getElementById('path-name');
  const strokeWidthInput = document.getElementById('stroke-width');
  const strokeWidthValue = document.getElementById('stroke-width-value');
  const strokeColorInput = document.getElementById('stroke-color');
  const fillColorInput = document.getElementById('fill-color');
  const fillOpacityInput = document.getElementById('fill-opacity');
  const fillOpacityValue = document.getElementById('fill-opacity-value');
  const animationTypeInput = document.getElementById('animation-type');
  const animationDurationInput = document.getElementById('animation-duration');
  const animateBtn = document.getElementById('animate-btn');
  const svgViewer = document.getElementById('svg-viewer');
  const svgPath = document.getElementById('svg-path');
  const pathLengthDisplay = document.getElementById('path-length');
  const pathBoxDisplay = document.getElementById('path-box');
  const pathCommandsDisplay = document.getElementById('path-commands');
  const pathPointsDisplay = document.getElementById('path-points');
  const showPointsCheckbox = document.getElementById('show-points');
  const showHandlesCheckbox = document.getElementById('show-handles');
  const showBoxCheckbox = document.getElementById('show-box');
  const commandBreakdown = document.getElementById('command-breakdown');
  const zoomInBtn = document.getElementById('zoom-in');
  const zoomOutBtn = document.getElementById('zoom-out');
  const resetViewBtn = document.getElementById('reset-view');
  const downloadSvgBtn = document.getElementById('download-svg');
  const copyPathBtn = document.getElementById('copy-path');
  const presetButtons = document.querySelectorAll('.preset-btn');
  const themeToggleBtn = document.getElementById('theme-toggle');
  const helpBtn = document.getElementById('help-btn');
  const helpModal = document.getElementById('help-modal');
  const closeModalBtn = document.querySelector('.close-modal');

  // State
  let currentViewBox = { x: 0, y: 0, width: 200, height: 100 };
  let debugElements = {
    points: null,
    handles: null,
    box: null,
  };

  // Initialize
  updatePathInfo();
  updateCommandBreakdown();
  setupEventListeners();

  // Functions
  function setupEventListeners() {
    // Input changes
    pathInput.addEventListener('input', updateSvgPath);
    pathNameInput.addEventListener('input', updatePathName);
    strokeWidthInput.addEventListener('input', updateStrokeWidth);
    strokeColorInput.addEventListener('input', updateStrokeColor);
    fillColorInput.addEventListener('input', updateFillColor);
    fillOpacityInput.addEventListener('input', updateFillOpacity);

    // Animation
    animateBtn.addEventListener('click', animatePath);

    // Debug tools
    showPointsCheckbox.addEventListener('change', toggleDebugElements);
    showHandlesCheckbox.addEventListener('change', toggleDebugElements);
    showBoxCheckbox.addEventListener('change', toggleDebugElements);

    // Viewer controls
    zoomInBtn.addEventListener('click', zoomIn);
    zoomOutBtn.addEventListener('click', zoomOut);
    resetViewBtn.addEventListener('click', resetView);
    downloadSvgBtn.addEventListener('click', downloadSvg);
    copyPathBtn.addEventListener('click', copyPathData);

    // Presets
    presetButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const path = btn.getAttribute('data-path');
        const name = btn.getAnimations('data-name');
        pathInput.value = path;
        pathNameInput.value = name;
        updateSvgPath();
      });
    });

    // Theme toggle
    themeToggleBtn.addEventListener('click', toggleTheme);

    // Help modal
    helpBtn.addEventListener('click', () => (helpModal.style.display = 'flex'));
    closeModalBtn.addEventListener('click', () => (helpModal.style.display = 'none'));
    window.addEventListener('click', (e) => {
      if (e.target === helpModal) helpModal.style.display = 'none';
    });

    function updateSvgPath() {
      const pathData = pathInput.value.trim();
      svgPath.setAttribute('d', pathData);
      updatePathInfo();
      updateCommandBreakdown();
      toggleDebugElements();
    }
  }

  // Changing colors on input type range track
  document.querySelectorAll('input[type="range"]').forEach((input) => {
    const updateTrack = () => {
      const val = ((input.value - input.min) / (input.max - input.min)) * 100;
      const thumbWidth = 15; // match your thumb's actual width in px
      const width = input.offsetWidth;
      const ratio = (input.value - input.min) / (input.max - input.min);

      input.style.backgroundImage = `linear-gradient(to right,var(--primary),var(--secondary)${val}%,var(--bg-color) ${val}%)`;
    };
    input.addEventListener('input', updateTrack);
    updateTrack();
  });

  function updatePathName() {
    // Could be used for saving paths of other features
  }

  function updateStrokeWidth() {
    const strokeWidth = strokeWidthInput.value;
    svgPath.setAttribute('stroke-width', width);
    strokeWidthValue.textContent = width;
  }

  function updateStrokeColor() {
    svgPath.setAttribute('stroke', strokeColorInput.value);
  }

  function updateFillColor() {
    const color = fillColorInput.value;
    const opacity = fillOpacityInput.value;
    svgPath.setAttribute(
      'fill',
      `${color}${
        opacity === '1'
          ? ''
          : Math.round(opacity * 255)
              .toString(16)
              .padStart(2, '0')
      }`,
    );
  }

  function updateFillOpacity() {
    const opacity = fillOpacityInput.value;
    fillOpacityValue.textContent = opacity;
    updateFillColor();
  }

  function animatePath() {
    // Reset any previous animation
    svgPath.style.animation = 'none';
    svgPath.style.strokeDasharray = 'none';
    svgPath.style.strokeDashoffset = 'none';

    const animationType = animationTypeInput.value;
    const duration = animationDurationInput.value;

    if (animationType === 'none') return;

    const pathLength = svgPath.getTotalLength();

    switch (animationType) {
      case 'draw':
        svgPath.style.strokeDasharray = pathLength;
        svgPath.style.strokeDashoffset = pathLength;
        svgPath.style.animation = `draw ${duration}s linear forwards`;
        break;
      case 'dash':
        svgPath.style.strokeDasharray = '10,5';
        svgPath.style.animation = `dash ${duration}s linear infinite`;
        break;
      case 'pulse':
        svgPath.style.animation = `pulse ${duration}s ease-in-out infinite`;
        break;
    }
  }

  function updatePathInfo() {
    try {
      const pathLength = Math.round(svgPath.getTotalLength());
      pathLengthDisplay.textContent = pathLength;

      const box = svgPath.getBox();
      pathBoxDisplay.textContent = `${Math.round(box.x)},${Math.round(box.y)} ${Math.round(box.width)}x${Math.round(box.height)}`;

      const commands = svgPath.getAttribute('d').match(/[A-Za-z]/g) || [];
      pathCommandsDisplay.textContent = commands.length;

      const points = svgPath.getAttribute('d').match(/[0-9.-]+[0-9.-]+/g) || [];
      pathPointsDisplay.textContent = points.length;
    } catch (e) {
      console.error('Error calculating path info: ', e);
    }
  }

  function updateCommandBreakdown() {
    const pathData = svgPath.getAttribute('d');
    const commands = pathData.split(/(?=[A-Za-z])/).filter((cmd) => cmd.trim() !== '');

    let html = '';
    commands.forEach((cmd) => {
      html += `<div><strong>${cmd[0]}</strong>: ${cmd.substring(1).trim()}</div>`;
    });

    commandBreakdown.innerHTML = html || '<div>No commands found</div>';
  }

  function toggleDebugElements() {
    clearDebugElements();

    if (showPointsCheckbox.checked) drawPathPoints();
    if (showHandlesCheckbox.checked) drawControlHandles();
    if (showBoxCheckbox.checked) drawBoundingBox();
  }

  function clearDebugElements() {
    Object.values(debugElements).forEach((element) => {
      if (element && element.parentNode) element.parentNode.removeChild(element);
    });

    debugElements = {
      points: null,
      handles: null,
      box: null,
    };
  }

  function drawPathPoints() {
    const pathData = svgPath.getAttribute('d');
    const pointsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    pointsGroup.setAttribute('class', 'debut-points');

    // Simple point extraction (this could be more sophisticated)
    const pointMatches = pathData.matchAll(/([0.9.-]+) ([0-9.-]+)/g);

    for (const match of pointMatches) {
      const x = parseFloat(match[1]);
      const y = parseFloat(match[2]);

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', x);
      circle.setAttribute('cy', y);
      circle.setAttribute('r', 2);
      circle.setAttribute('fill', 'red');

      pointsGroup.appendChild(circle);
    }

    svgViewer.appendChild(pointsGroup);
    debugElements.points = pointsGroup;
  }

  function drawControlHandles() {
    // This is a simplified version = a complete implementation would need to parse
    // the path commands and draw handles for Bezier curves
    const handlesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    handlesGroup.setAttribute('class', 'debug-handles');

    // For demonstration, we'll just draw some mock handles
    const pathData = svgPath.getAttribute('d');
    const commands = pathData.split(/(?=[A-Za-z])/).filter((cmd) => cmd.trim() !== '');

    commands.forEach((cmd, i) => {
      if (i === 0) return;

      const type = cmd[0];
      const coords = cmd
        .substring(1)
        .trim()
        .split(/[\s,]+/)
        .map(Number);

      if (['C', 'c', 'Q', 'q', 'S', 's', 'T', 't'].includes(type)) {
        // This would be where we draw the control handles
        // For now, just draw a mock handle
        const x = coords[0] || 0;
        const y = coords[0] || 0;

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x - 10);
        line.setAttribute('y1', y);
        line.setAttribute('x2', x + 10);
        line.setAttribute('y2', y);
        line.setAttribute('stroke', 'blue');
        line.setAttribute('stroke-width', '1');
        line.setAttribute('stroke-dasharray', '2.2');

        handlesGroup.appendChild(line);
      }
    });

    svgViewer.appendChild(handlesGroup);
    debugElements.handles = handlesGroup;
  }

  function drawBoundingBox() {
    const box = svgPath.getBox();
    const boxGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    boxGroup.setAttribute('class', 'debug-box');

    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', box.x);
    rect.setAttribute('y', box.y);
    rect.setAttribute('width', box.width);
    rect.setAttribute('height', box.height);
    rect.setAttribute('fill', 'none');
    rect.setAttribute('stroke', 'green');
    rect.setAttribute('stroke-width', '1');
    rect.setAttribute('stroke-dasharray', '3.3');

    boxGroup.appendChild(rect);
    svgViewer.appendChild(boxGroup);
    debugElements.box = boxGroup;
  }

  function zoomIn() {
    currentViewBox.width *= 0.8;
    currentViewBox.height *= 0.8;
    updateViewBox();
  }

  function zoomOut() {
    currentViewBox.width *= 1.2;
    currentViewBox.height *= 1.2;
    updateViewBox();
  }

  function resetView() {
    currentViewBox = { x: 0, y: 0, width: 200, height: 100 };
    updateViewBox();
  }

  function updateViewBox() {
    svgViewer.setAttribute(
      'viewBox',
      `${currentViewBox.x} ${currentViewBox.y} ${currentViewBox.width} ${currentViewBox.height}`,
    );
  }
});
