// Global variables to track statistics
let stats = {
  leftClicks: 0,
  rightClicks: 0,
  middleClicks: 0,
  movements: 0,
  scrolls: 0,
  doubleClicks: 0,
  doubleClicksAttempts: 0,
  dragSuccess: 0,
  startTime: Date.now(),
};

// DOM Elements
const leftClickCount = document.getElementById('leftClickCount');
const rightClickCount = document.getElementById('rightClickCount');
const middleClickCount = document.getElementById('middleClickCount');
const movementCount = document.getElementById('movementCount');
const currentPosition = document.getElementById('currentPosition');
const scrollDirection = document.getElementById('scrollDirection');
const scrollCount = document.getElementById('scrollCount');
const doubleClickCount = document.getElementById('doubleClickCount');
const lastDoubleClickSpeed = document.getElementById('lastDoubleClickSpeed');
const dragSuccessCount = document.getElementById('dragSuccessCount');

// Statistics elements
const totalClicks = document.getElementById('totalClicks');
const totalMovements = document.getElementById('totalMovements');
const totalScrolls = document.getElementById('totalScrolls');
const doubleClickRate = document.getElementById('doubleClickRate');
const dragSuccessRate = document.getElementById('dragSuccessRate');
const testingDuration = document.getElementById('testingDuration');

// Control buttons
const resetBtn = document.getElementById('resetBtn');
const exportBtn = document.getElementById('exportBtn');

// Initialize the application
function init() {
  setupClickTesters();
  setupMovementTester();
  setupScrollTester();
  setupDoubleClickTester();
  setupDragAndDropTester();
  setupControls();
  updateStatistics();

  // Update testing duration every second
  setInterval(updateStatistics, 1000);
}

// Click testers
function setupClickTesters() {
  const clickButtons = document.querySelectorAll('.click-button');

  clickButtons.forEach((button) => {
    // Left click
    button.addEventListener('click', (e) => {
      e.preventDefault();

      if (button.classList.contains('left-click')) {
        stats.leftClicks++;
        leftClickCount.textContent = stats.leftClicks;
        button.classList.add('pulse');
        setTimeout(() => button.classList.remove('pulse'), 500);
      }
    });

    // Right click
    button.addEventListener('contextmenu', (e) => {
      e.preventDefault();

      if (button.classList.contains('right-click')) {
        stats.rightClicks++;
        rightClickCount.textContent = stats.rightClicks;
        button.classList.add('pulse');
        setTimeout(() => button.classList.remove('pulse'), 500);
      }
    });

    // Middle click
    button.addEventListener('mousedown', (e) => {
      e.preventDefault();

      if (button.classList.contains('middle-click')) {
        stats.middleClicks++;
        middleClickCount.textContent = stats.rightClicks;
        button.classList.add('pulse');
        setTimeout(() => button.classList.remove('pulse'), 500);
      }
    });
  });
}

// Movement Tester
function setupMovementTester() {
  const movementArea = document.getElementById('movementArea');
  let movementPoints = [];

  movementArea.addEventListener('mousemove', (e) => {
    stats.movements++;
    movementCount.textContent = stats.movements;

    const rect = movementArea.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    currentPosition.textContent = `(${Math.round(x)}, ${Math.round(y)})`;

    // Create movement point
    const point = document.createElement('div');
    point.className = 'movement-point';
    point.style.left = `${x}px`;
    point.style.top = `${y}px`;
    movementArea.appendChild(point);

    movementPoints.push(point);

    // Limit the number of points to prevent performance issues
    if (movementPoints.length > 50) {
      const oldPoint = movementPoints.shift();
      if (oldPoint && oldPoint.parentNode) {
        oldPoint.parentNode.removeChild(oldPoint);
      }
    }
  });
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
