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
    document.getElementById('loading').classList.remove('hidden');
  }, 1000);
}

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
    guiChain.add(chain, 'bulbsCount', 10, 500, 1).onChange(render);
    guiChain.add(chain, 'bulbRadius', 1, 50, 1).onChange(render);
    guiChain.add(chain, 'glowOffset', 0, 50, 1).onChange(render);
    guiChain.add(chain, 'turnsCount', -20, 20, 1).onChange(render);
    guiChain.add(chain, 'startAngle', 0, 360, 1).onChange(render);
    guiChain.addColor(chain, 'startColor').onChange(render);
    guiChain.addColor(chain, 'endColor').onChange(render);
    guiChain.add(chain, 'opacity', 0, 1, 0.01).onChange(render);
    guiChain.open();
  });
}
