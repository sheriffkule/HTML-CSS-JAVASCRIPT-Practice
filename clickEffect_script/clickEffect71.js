// DOM Elements
const testArea = document.getElementById('testArea');
const instruction = document.getElementById('instruction');
const reactionTimeDisplay = document.getElementById('reactionTime');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const lastTimeDisplay = document.getElementById('lastTime');
const bestTimeDisplay = document.getElementById('bestTime');
const avgTimeDisplay = document.getElementById('avgTime');
const totalTestsDisplay = document.getElementById('totalTests');
const historyList = document.getElementById('historyList');

// App state
let state = 'waiting'; // waiting, ready, success, to-soon
let startTime;
let endTime;
let timeoutId;
let tests = [];

// Load saved data from localStorage
function loadData() {
  const savedData = localStorage.getItem('reactionTimeData');
  if (savedData) {
    try {
      tests = JSON.parse(savedData);
      // Ensure tests is an array
      if (!Array.isArray(tests)) tests = [];
    } catch (e) {
      tests = [];
    }
  }
  updateStats();
  updateHistory();
}

// Save data to localStorage
function saveData() {
  localStorage.setItem('reactionTimeData', JSON.stringify(tests));
}

// Initialize the app
function init() {
  loadData();
  setupEventListeners();
}

// Set up event listeners
function setupEventListeners() {
  testArea.addEventListener('click', handleTestAreaClick);
  startBtn.addEventListener('click', startTest);
  resetBtn.addEventListener('click', resetStats);
}

// Handle test area click
function handleTestAreaClick() {
  if (state === 'waiting') {
    startTest();
  } else if (state === 'ready') {
    react();
  } else if (state === 'success' || state === 'to-soon') {
    resetTest();
  }
}

// Start a new test
function startTest() {
  // Clear any existing timeout
  if (timeoutId) clearTimeout(timeoutId);

  // Reset test area
  testArea.className = 'test-area ready';
  instruction.textContent = 'Wait for color change...';
  reactionTimeDisplay.textContent = '';
  state = 'ready';

  // Set random delay between 1 - 5 seconds
  const randomDelay = Math.random() * 4000 + 1000;
  timeoutId = setTimeout(() => {
    if (state === 'ready') {
      testArea.className = 'test-area waiting';
      instruction.textContent = 'CLICK NOW!';
      startTime = Date.now();
    }
  }, randomDelay);
}

// User reacts to the color change
function react() {
  if (state !== 'ready') {
    // User clicked too soon
    testArea.className = 'test-area too-soon';
    instruction.textContent = 'Too Soon! :( !!! Click to try again.';
    state = 'too-soon';
    return;
  }

  endTime = Date.now();
  const reactionTime = endTime - startTime;
  state = 'success';

  // Update display
  testArea.className = 'test-area success';
  reactionTimeDisplay.textContent = `${reactionTime} ms`;
  instruction.textContent = 'Click to test again.';

  // Save the results
  saveResult(reactionTime);
}

// Save test result
function saveResult(time) {
  const now = new Date();
  const testResult = {
    time,
    date: now.toISOString(),
    formattedDate: now.toLocaleString(),
  };

  tests.push(testResult);
  updateStats();
  updateHistory();
  saveData();
}

// Updata statistics
function updateStats() {
  if (tests.length === 0) {
    lastTimeDisplay.textContent = '--';
    bestTimeDisplay.textContent = '--';
    avgTimeDisplay.textContent = '--';
    totalTestsDisplay.textContent = '0';
    return;
  }

  const lastTest = tests[tests.length - 1];
  lastTimeDisplay.textContent = `${lastTest.time} ms`;

  const bestTime = Math.min(...tests.map((t) => t.time));
  bestTimeDisplay.textContent = `${bestTime} ms`;

  const avgTime = Math.round(tests.reduce((sum, test) => sum + test.time, 0) / tests.length);
  avgTimeDisplay.textContent = `${avgTime} ms`;

  totalTestsDisplay.textContent = tests.length;
}

// Update history list
function updateHistory() {
  historyList.innerHTML = '';

  // Show only the last 10 tests
  const recentTests = [...tests].reverse().slice(0, 10);

  if (recentTests.length === 0) {
    const emptyItem = document.createElement('li');
    emptyItem.className = 'history-item';
    emptyItem.textContent = 'No tests yet';
    historyList.appendChild(emptyItem);
    return;
  }

  recentTests.forEach((test) => {
    const historyItem = document.createElement('li');
    historyItem.className = 'history-item';

    const timeSpan = document.createElement('span');
    timeSpan.className = 'history-time';
    timeSpan.textContent = `${test.time} ms`;

    const dateSpan = document.createElement('span');
    dateSpan.className = 'history-date';
    dateSpan.textContent = test.formattedDate;

    historyItem.appendChild(timeSpan);
    historyItem.appendChild(dateSpan);
    historyList.appendChild(historyItem);
  });
}

// Reset the current test
function resetTest() {
  if (timeoutId) clearTimeout(timeoutId);

  testArea.className = 'test-area waiting';
  instruction.textContent = 'Click to start test';
  reactionTimeDisplay.textContent = '';
  state = 'waiting';
}

// Reset all statistics
function resetStats() {
  if (confirm('Are you sure you want to reset all statistics?')) {
    tests = [];
    updateStats();
    updateHistory();
    saveData();
    resetTest();
  }
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

// Start the app
window.addEventListener('DOMContentLoaded', init);
