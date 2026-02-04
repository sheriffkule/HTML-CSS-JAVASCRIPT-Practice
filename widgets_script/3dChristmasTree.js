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
    document.getElementById('loading').classList.remove('hiden');
  }, 1000);
}
