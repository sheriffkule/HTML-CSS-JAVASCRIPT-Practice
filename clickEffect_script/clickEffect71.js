// DOM Elements
const testArea = document.getElementById('testArea');
const instruction = document.getElementById('instruction');
const reactionTimeDisplay = document.getElementById('reactionTime');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const lastTimeDisplay = document.getElementById('lastTime');
const bestTimeDisplay = document.getElementById('bestTime');
const avtTimeDisplay = document.getElementById('avtTime');
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
