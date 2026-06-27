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

// Double click variables
let lastClickTime = 0;
let doubleClickThreshold = 500;

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
      // Only count middle-button presses (button === 1)
      if (button.classList.contains('middle-click') && e.button === 1) {
        e.preventDefault();
        stats.middleClicks++;
        middleClickCount.textContent = stats.middleClicks;
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

  // Clear instructions when user start moving
  movementArea.addEventListener('mouseenter', () => {
    const instructions = movementArea.querySelector('.instructions');
    if (instructions) {
      instructions.style.opacity = '0';
      setTimeout(() => {
        if (instructions.parentNode) {
          instructions.parentNode.removeChild(instructions);
        }
      }, 500);
    }
  });
}

// Scroll Tester
function setupScrollTester() {
  const scrollArea = document.getElementById('scrollArea');
  const scrollItems = document.querySelectorAll('.scroll-item');
  let lastScrollTop = scrollArea ? scrollArea.scrollTop : 0;
  let activeIndex = 0;

  // Ensure there is an initial active item
  if (scrollItems.length > 0) {
    scrollItems.forEach((it) => it.classList.remove('active'));
    if (scrollItems[0]) scrollItems[0].classList.add('active');
  }

  scrollArea.addEventListener('scroll', (e) => {
    const scrollTop = scrollArea.scrollTop;
    const direction = scrollTop > lastScrollTop ? 'Down' : 'Up';

    scrollDirection.textContent = direction;
    stats.scrolls++;
    scrollCount.textContent = stats.scrolls;

    lastScrollTop = scrollTop;

    // Update active item based on scroll position
    const newActiveIndex = Math.min(Math.max(0, Math.floor(scrollTop / 200)), scrollItems.length - 1);

    if (newActiveIndex !== activeIndex) {
      if (scrollItems[activeIndex]) scrollItems[activeIndex].classList.remove('active');
      if (scrollItems[newActiveIndex]) scrollItems[newActiveIndex].classList.add('active');
      activeIndex = newActiveIndex;
    }
  });
}

// Double Click Tester
function setupDoubleClickTester() {
  const doubleClickArea = document.getElementById('doubleClickArea');

  doubleClickArea.addEventListener('click', (e) => {
    stats.doubleClicksAttempts++;
    const currentTime = new Date().getTime();

    if (currentTime - lastClickTime < doubleClickThreshold) {
      // Successful double click
      stats.doubleClicks++;
      doubleClickCount.textContent = stats.doubleClicks;
      lastDoubleClickSpeed.textContent = currentTime - lastClickTime + ' ms';

      doubleClickArea.style.background = 'var(--success)';
      doubleClickArea.style.color = 'white';

      setTimeout(() => {
        doubleClickArea.style.background = '';
        doubleClickArea.style.color = '';
      }, 300);
    }

    lastClickTime = currentTime;
  });
}

// Drag and Drop Tester
function setupDragAndDropTester() {
  const dragItem = document.getElementById('dragItem');
  const dropZone = document.getElementById('dropZone');

  dragItem.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', 'dragItem');
    setTimeout(() => {
      dragItem.style.opacity = '0.4';
    }, 0);
  });

  dragItem.addEventListener('dragend', (e) => {
    dragItem.style.opacity = '1';
  });

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('active');
  });

  dropZone.addEventListener('dragleave', (e) => {
    dropZone.classList.remove('active');
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('active');

    const data = e.dataTransfer.getData('text/plain');
    if (data === 'dragItem') {
      stats.dragSuccess++;
      dragSuccessCount.textContent = stats.dragSuccess;

      // Visual feedback
      dropZone.style.background = 'var(--success)';
      dropZone.style.color = 'white';

      setTimeout(() => {
        dropZone.style.background = '';
        dropZone.style.color = '';
      }, 500);

      // Reset drag item position
      dragItem.style.position = 'static';
    }
  });
}

// Controls
function setupControls() {
  resetBtn.addEventListener('click', resetAllTests);
  exportBtn.addEventListener('click', exportResults);
}

// Reset all tests
function resetAllTests() {
  // Reset statistics
  stats = {
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

  leftClickCount.textContent = '0';
  rightClickCount.textContent = '0';
  middleClickCount.textContent = '0';
  movementCount.textContent = '0';
  currentPosition.textContent = '(0, 0)';
  scrollDirection.textContent = 'None';
  scrollCount.textContent = '0';
  doubleClickCount.textContent = '0';
  lastDoubleClickSpeed.textContent = '-';
  dragSuccessCount.textContent = '0';

  // Clear movement points
  const movementArea = document.getElementById('movementArea');
  const points = movementArea.querySelectorAll('.movement-point');
  points.forEach((point) => point.remove());

  // Reset scroll position
  const scrollArea = document.getElementById('scrollArea');
  if (scrollArea) scrollArea.scrollTop = 0;

  // Reset double click area
  const doubleClickArea = document.getElementById('doubleClickArea');
  doubleClickArea.style.background = '';
  doubleClickArea.style.color = '';

  // Update statistics
  updateStatistics();
}

// Export results
function exportResults() {
  const duration = Math.floor((Date.now() - stats.startTime) / 1000);
  const results = `
Mouse Tester Tool = Test Results
Generated on: ${new Date().toLocaleString()}
Test duration: ${duration} seconds

CLICK STATISTICS:
- Left Clicks: ${stats.leftClicks}
- Right Clicks: ${stats.rightClicks}
- Middle Clicks: ${stats.middleClicks}
- Total Clicks: ${stats.leftClicks + stats.rightClicks + stats.middleClicks}

MOVEMENT STATISTICS:
- Total Movements: ${stats.movements}

SCROLL STATISTICS:
- Total Scrolls: ${stats.scrolls}

DOUBLE CLICKS STATISTICS:
- Successful Double Clicks: ${stats.doubleClicks}
- Attempted Double Clicks: ${stats.doubleClicksAttempts}
- Success Rate: ${stats.doubleClicksAttempts > 0 ? Math.round((stats.doubleClicks / stats.doubleClicksAttempts) * 100) : 0}%

DRAG & DROP STATISTICS:
- Successful Drops: ${stats.dragSuccess}
    `;

  const blob = new Blob([results], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'mouse-tester-results.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Update statistics panel
function updateStatistics() {
  const duration = Math.floor((Date.now() - stats.startTime) / 1000);

  totalClicks.textContent = stats.leftClicks + stats.rightClicks + stats.middleClicks;
  totalMovements.textContent = stats.movements;
  totalScrolls.textContent = stats.scrolls;

  const rate =
    stats.doubleClicksAttempts > 0 ? Math.round((stats.doubleClicks / stats.doubleClicksAttempts) * 100) : 0;
  doubleClickRate.textContent = `${rate}%`;

  dragSuccessRate.textContent = stats.dragSuccess;
  testingDuration.textContent = `${duration}s`;
}

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

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
