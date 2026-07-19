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
    fillOpacityValue.textContent = opacity
    updateFillColor()
  }
});
