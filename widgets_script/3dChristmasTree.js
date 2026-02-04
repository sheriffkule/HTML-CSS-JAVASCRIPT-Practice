// Default state
let settings = {
  background: '#111',
  rotationX: 30,
  treeShape: 't => t',
  rotationSpeed: 0.5,
  showFPS: true,
  treeScale: 0.7,
};

// Star settings
let starSettings = {
  color: '#ffd700',
  glowColor: '#ffff00',
  size: 35,
  glowSize: 12,
  opacity: 1,
  rotationSpeed: 0.2,
  pulseSpeed: 1.5,
  pulseAmount: 0.15,
  showStar: true,
  showGlow: true,
};

let chains = [
  {
    bulbRadius: 2,
    bulbCount: 100,
    endColor: '#ffcc00',
    glowOffset: 10,
    opacity: 1,
    startAngle: 0,
    startColor: '#ffcc00',
    turnsCount: 14,
    name: 'Gold Chain',
  },
  {
    bulbRadius: 8,
    bulbCount: 40,
    endColor: '#00ffff',
    glowOffset: 15,
    opacity: 0.8,
    startAngle: 120,
    startColor: '#ffff00',
    turnsCount: 3,
    name: 'Cyan Ribbon',
  },
  {
    bulbRadius: 5,
    bulbCount: 60,
    endColor: '#ffff00',
    glowOffset: 8,
    opacity: 0.9,
    startAngle: 240,
    startColor: '#00ffff',
    turnsCount: -5,
    name: 'Spiral Ribbon',
  },
];

// Global variables
const canvasContainer = document.querySelector('.canvas-container');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let gui = null;
let rotationZ = 0;
let startRotation = 0;
let starPulse = 0;
let isInitialized = false;
let animationId = null;
let lastTime = 0;
let frameCount = 0;
let fps = 60;
let isPaused = false;

// Get canvas dimension from container
function getCanvasDimensions() {
  const rect = canvasContainer.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
  };
}

// Color utilities
const ColorUtils = {
  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  },

  rgbToHex(r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  },

  mixColors(color1, color2, weight) {
    const c1 = this.hexToRgb(color1);
    const c2 = this.hexToRgb(color2);

    const w1 = weight;
    const w2 = 1 - weight;

    const r = Math.round(c1.r * w1 + c2.r * w2);
    const g = Math.round(c1.g * w1 + c2.g * w2);
    const b = Math.round(c1.b * w1 + c2.b * w2);

    return this.rgbToHex(r, g, b);
  },

  withOpacity(hex, opacity) {
    const rgb = this.hexToRgb(hex);
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
  },
};

// Hide loading screen when ready
function hideLoading() {
  document.getElementById('loading').classList.add('hidden');
  setTimeout(() => {
    document.getElementById('loading').style.display = 'none';
  }, 2000);
}

// Toggle info
const openOverlay = document.querySelector('.open-overlay');
const overlay = document.querySelector('.overlay');
const closeOverlay = document.querySelector('.close-overlay');

openOverlay.addEventListener('click', () => {
  overlay.style.visibility = 'visible';
  overlay.style.height = 'auto';
});

closeOverlay.addEventListener('click', () => {
  overlay.style.visibility = 'hidden';
  overlay.style.height = '0';
});

// Customization via dat.GUI
function getRandomChain() {
  const colorPairs = [
    { start: '#ff6b6b', end: '#4ecdc4' },
    { start: '#45b7d1', end: '#96c93d' },
    { start: '#ff9a9a', end: '#fad0c4' },
    { start: '#a1c4fd', end: '#c2e9fb' },
    { start: '#ffd89b', end: '#19547b' },
  ];

  const colors = colorPairs[Math.floor(Math.random() * colorPairs.length)];

  return {
    bulbCount: Math.round(Math.random() * (100 - 20) + 20),
    bulbRadius: Math.round(Math.random() * (15 - 2) + 2),
    glowOffset: Math.random() < 0.5 ? 0 : Math.round(Math.random() * (30 - 5) + 5),
    turnsCount: Math.round(Math.random() * (10 - 3) + 3) + (Math.random() < 0.5 ? -1 : 1),
    startAngle: Math.round(Math.random() * 360),
    startColor: colors.start,
    endColor: colors.end,
    opacity: Math.round(Math.random() * (100 - 60) + 60) / 100,
    name: `Chain ${chains.length + 1}`,
  };
}

const guiMethods = {
  'ADD CHAIN': () => {
    chains.push(getRandomChain());
    updateDatGui();
  },
  'Save as image': () => {
    try {
      const link = document.createElement('a');
      link.download = 'christmas-tree-' + new Date().getTime() + '.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error saving image: ', error);
      alert('Error saving image! Please try again.');
    }
  },
  'Reset to Default': () => {
    chains = [
      {
        bulbRadius: 2,
        bulbCount: 100,
        endColor: '#ffcc00',
        glowOffset: 10,
        opacity: 1,
        startAngle: 0,
        startColor: '#ffcc00',
        turnsCount: 14,
        name: 'Gold Chain',
      },
      {
        bulbRadius: 8,
        bulbCount: 40,
        endColor: '#00ffff',
        glowOffset: 15,
        opacity: 0.8,
        startAngle: 120,
        startColor: '#ffff00',
        turnsCount: 3,
        name: 'Cyan Ribbon',
      },
      {
        bulbRadius: 5,
        bulbCount: 60,
        endColor: '#ffff00',
        glowOffset: 8,
        opacity: 0.9,
        startAngle: 240,
        startColor: '#00ffff',
        turnsCount: -5,
        name: 'Spiral Ribbon',
      },
    ];

    // Reset star to default
    starSettings.color = '#ffd700';
    starSettings.glowColor = '#ffff00';
    starSettings.size = 35;
    starSettings.glowSize = 12;
    starSettings.opacity = 1;
    starSettings.rotationSpeed = 0.2;
    starSettings.pulseSpeed = 1.5;
    starSettings.pulseAmount = 0.15;
    starSettings.showStar = true;
    starSettings.showGlow = true;

    // Reset tree scale
    settings.treeScale = 0.7;

    updateDatGui();
    render();
  },
  'Pause/Resume': () => {
    isPaused = !isPaused;
    if (!isPaused) animate();
  },
};

function updateDatGui() {
  if (gui) gui.destroy();

  gui = new dat.GUI({ autoPlace: false });
  gui.domElement.classList.add('main');
  document.body.appendChild(gui.domElement);

  // Create chain folders
  chains.forEach((chain, i) => {
    const guiChain = gui.addFolder(chain.name || `Chain ${i + 1}`);
    guiChain.add(chain, 'bulbCount', 10, 500, 1).onChange(render);
    guiChain.add(chain, 'bulbRadius', 1, 50, 1).onChange(render);
    guiChain.add(chain, 'glowOffset', 0, 50, 1).onChange(render);
    guiChain.add(chain, 'turnsCount', -20, 20, 1).onChange(render);
    guiChain.add(chain, 'startAngle', 0, 360, 1).onChange(render);
    guiChain.addColor(chain, 'startColor').onChange(render);
    guiChain.addColor(chain, 'endColor').onChange(render);
    guiChain.add(chain, 'opacity', 0, 1, 0.01).onChange(render);
    guiChain.open();
  });

  // Create Star folder
  const guiStar = gui.addFolder('Star Settings');
  guiStar.add(starSettings, 'showStar').onChange(render);
  guiStar.addColor(starSettings, 'color').onChange(render);
  guiStar.add(starSettings, 'size', 10, 60, 1).onChange(render);
  guiStar.add(starSettings, 'opacity', 0, 1, 0.05).onChange(render);
  guiStar.add(starSettings, 'rotationSpeed', 0, 2, 0.1);
  guiStar.add(starSettings, 'pulseSpeed', 0, 5, 0.1);
  guiStar.add(starSettings, 'pulseAmount', 0, 1, 0.05);

  guiStar.add(starSettings, 'showGlow').onChange(render);
  guiStar.addColor(starSettings, 'glowColor').onChange(render);
  guiStar.add(starSettings, 'glowSize', 5, 30, 1).onChange(render);
  guiStar.open();

  // Create options folder
  const guiOptions = gui.addFolder('Options');
  guiOptions.addColor(settings, 'background').onChange(render);
  guiOptions.add(settings, 'rotationX', 0, 75, 1).onChange(render);
  guiOptions.add(settings, 'rotationSpeed', 0, 2, 0.1).name('Tree Rotation Speed');
  guiOptions.add(settings, 'treeScale', 0.5, 0.9, 0.05).name('Tree Scale').onChange(render);

  // Tree shape function
  const shapes = {
    Linear: 't => t',
    'Ease In Quad': 't => t*t',
    'Ease Out Quad': 't => t*(2-t)',
    'Ease In Out Quad': 't => (t<0.5 ? 2*t*t : -1+(4-2*t)*t)',
    'Ease In Cubic': 't => t*t*t',
  };
  guiOptions.add(settings, 'treeShape', shapes).onChange(render);
  guiOptions.add(settings, 'showFPS').onChange(() => {
    document.getElementById('fpsCounter').style.display = settings.showFPS ? 'block' : 'none';
  });

  // Chain management
  guiOptions.add(guiMethods, 'ADD CHAIN');
  guiOptions.open();

  // Export folder
  const guiExport = gui.addFolder('Export');
  guiExport.add(guiMethods, 'Save as image');
  guiExport.add(guiMethods, 'Reset to Default');
  guiExport.add(guiMethods, 'Pause/Resume');
  guiExport.open();
}

// Rendering of the tree
function updateScene() {
  const dims = getCanvasDimensions();
  const canvasWidth = dims.width;
  const canvasHeight = dims.height;

  // Update global variables for tree geometry
  window.tiltAngle = (settings.rotationX / 180) * Math.PI;
  window.treeHeight = Math.min(canvasWidth, canvasHeight) * settings.treeScale;
  window.baseRadius = treeHeight * 0.35;

  // Calculate center with proper margins for star
  const topMargin = starSettings.size + starSettings.glowSize + 20;
  const bottomMargin = baseRadius + 20;

  window.baseCenter = {
    x: canvasWidth / 2,
    y: canvasHeight - bottomMargin - treeHeight * 0.5,
  };

  // Ensure star fits within canvas
  const starTop = baseCenter.y - treeHeight;
  if (starTop < topMargin) {
    // Adjust tree position if star would overflow
    window.baseCenter.y += topMargin - starTop;
  }

  // Set canvas dimensions
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
}

// Draw a beautiful star
function drawStar(x, y, radius, points, rotation) {
  const outerRadius = radius;
  const innerRadius = radius * 0.5;

  ctx.beginPath();

  for (let i = 0; i < points * 2; i++) {
    const angle = (i * Math.PI) / points + rotation;
    const r = i % 2 === 0 ? outerRadius : innerRadius;

    const px = x + Math.cos(angle) * r;
    const py = y + Math.sin(angle) * r;

    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  }

  ctx.closePath();
  ctx.fill();

  // Add shine effect
  const shineRadius = radius * 0.3;
  const shineGradient = ctx.createRadialGradient(
    x - radius * 0.2,
    y - radius * 0.2,
    0,
    x - radius * 0.2,
    y - radius * 0.2,
    shineRadius,
  );

  shineGradient.addColorStop(0, 'rgba(255,255,255,0.8)');
  shineGradient.addColorStop(1, 'rgba(255,255,255,0)');

  ctx.fillStyle = shineGradient;
  ctx.beginPath();
  ctx.arc(x - radius * 0.2, y - radius * 0.2, shineRadius, 0, Math.PI);
  ctx.fill();
}

// Draw star on top of the tree
function drawStarOnTree() {
  if (!starSettings.showStar) return;

  ctx.save();

  // Calculate star position (top of the tree)
  const starX = baseCenter.x;
  const starY = baseCenter.y - treeHeight;

  // Add pulse effect
  const pulseScale = 1 + Math.sin(starPulse) * starSettings.pulseAmount;
  const currentSize = starSettings.size * pulseScale;

  // Draw glow/halo if enabled
  if (starSettings.showGlow) {
    ctx.globalAlpha = starSettings.opacity * 0.7;
    const glowGradient = ctx.createRadialGradient(
      starX,
      starY,
      0,
      starX,
      starY,
      currentSize + starSettings.glowSize,
    );
    glowGradient.addColorStop(0, ColorUtils.withOpacity(starSettings.glowColor, 0.6));
    glowGradient.addColorStop(1, ColorUtils.withOpacity(starSettings.glowColor, 0));
    ctx.fillStyle = glowGradient;
    ctx.beginPath();
    ctx.arc(starX, starY, currentSize + starSettings.glowSize, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw the star
  ctx.globalAlpha = starSettings.opacity;
  ctx.fillStyle = starSettings.color;
  drawStar(starX, starY, currentSize, 5, startRotation);

  ctx.restore();
}

function renderChain(props) {
  if (!props.bulbCount || props.bulbCount <= 0) return;

  const easing = eval(settings.treeShape);

  for (let i = 0; i < props.bulbCount; i++) {
    let progress = i / (props.bulbCount - 1);

    // Adjust progress for better distribution
    progress = Math.pow(progress, Math.sqrt(progress) + 0.5);

    const turnProgress = (progress * props.turnsCount) % 1;
    const sectionRadius = baseRadius * (1 - easing(progress));
    const sectionAngle =
      (((turnProgress * 360 + props.startAngle + rotationZ) / 180) * Math.PI) % (Math.PI * 2);

    // Calculate bulb position
    const X = baseCenter.x + Math.sin(sectionAngle) * sectionRadius;
    const Y =
      baseCenter.y -
      progress * treeHeight * Math.sin(((90 - settings.rotationX) / 180) * Math.PI) +
      sectionRadius * Math.sin(tiltAngle) * Math.cos(sectionAngle);

    const bulbRadius = Math.max(1, (props.bulbRadius * treeHeight) / 1000);
    const glowRadius = bulbRadius + (props.glowOffset * treeHeight) / 1000;

    // Mix colors based on progress
    const currentColor = ColorUtils.mixColors(props.startColor, props.endColor, progress);

    // Set global alpha for this chain
    ctx.globalAlpha = props.opacity;

    // Draw glow effect
    if (props.glowOffset > 0 && glowRadius > bulbRadius) {
      const gradient = ctx.createRadialGradient(X, Y, bulbRadius, X, Y, glowRadius);

      gradient.addColorStop(0, ColorUtils.withOpacity(currentColor, 0.8));
      gradient.addColorStop(0.5, ColorUtils.withOpacity(currentColor, 0.4));
      gradient.addColorStop(1, ColorUtils.withOpacity(currentColor, 0));

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(X, Y, glowRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw bulb
    ctx.fillStyle = currentColor;
    ctx.beginPath();
    ctx.arc(X, Y, bulbRadius, 0, Math.PI * 2);
    ctx.fill();

    // Add subtle highlight
    if (bulbRadius > 3) {
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.beginPath();
      ctx.arc(X - bulbRadius * 0.3, Y - bulbRadius * 0.3, bulbRadius * 0.4, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function render() {
  if (!isInitialized) return;

  updateScene();

  // Clear canvas with background
  ctx.fillStyle = settings.background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Reset global alpha
  ctx.globalAlpha = 1;

  // Render all chains
  chains.forEach((chain) => renderChain(chain));

  // Draw the star on top
  drawStarOnTree();

  // Update FPS counter
  frameCount++;
  const now = performance.now();
  if (now - lastTime >= 1000) {
    fps = frameCount;
    frameCount = 0;
    lastTime = now;
    document.getElementById('fpsCounter').textContent = `FPS: ${fps}`;
  }
}

function animate(currentTime) {
  if (!isPaused) {
    rotationZ = (rotationZ - settings.rotationSpeed) % 360;
    startRotation = (startRotation + starSettings.rotationSpeed * 0.05) % (Math.PI * 2);
    starPulse = (starPulse + starSettings.pulseSpeed * 0.05) % (Math.PI * 2);
    render();
  }
  animationId = requestAnimationFrame(animate);
}

// Initialize the application
function init() {
  // Check for required libraries
  if (typeof dat === 'undefined') {
    alert('Error: dat.GUI library failed to load! Please refresh the page.');
    return;
  }

  updateDatGui();
  updateScene();
  render();

  // Start animation
  lastTime = performance.now();
  animate();

  isInitialized = true;
  hideLoading();

  // Handle window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateScene();
      render();
    }, 100);
  });

  // Add keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'r' || e.key === 'R') {
      guiMethods['Reset to Default']();
    } else if (e.key === 's' || e.key === 'S') {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        guiMethods['Save as image']();
      }
    } else if (e.key === ' ') {
      e.preventDefault();
      isPaused = !isPaused;
      if (!isPaused) animate();
    }
  });

  // Add canvas click to pause/resume animation
  canvas.addEventListener('click', () => {
    isPaused = !isPaused;
    if (!isPaused) animate();
  });

  // Hide click hint after 5 seconds
  setTimeout(() => {
    const clickHint = document.getElementById('clickHint');
    if (clickHint) {
      clickHint.style.opacity = '0';
      setTimeout(() => {
        clickHint.style.display = 'none';
      }, 500);
    }
  }, 5000);
}

// Start initialization
setTimeout(() => {
    init();
}, 1800);

// Update year in footer
function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');

  if (!yearElement) {
    console.error('Year element not found');
    return;
  }

  yearElement.setAttribute('datetime', currentYear.toString());
  yearElement.dateTime = currentYear.toString();
  yearElement.textContent = currentYear.toString();
}
updateYear();
