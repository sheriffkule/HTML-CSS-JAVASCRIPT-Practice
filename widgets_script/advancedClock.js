// DOM Elements
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Clock Elements
const currentTimeEl = document.getElementById('current-time');
const currentDateEl = document.getElementById('current-data');
const worldClocksEl = document.getElementById('world-clocks');

// Alarm addEventOnElements
const alarmForm = document.getElementById('alarm-form');
const alarmTimeInput = document.getElementById('alarm-time');
const alarmSoundSelect = document.getElementById('alarm-sound');
const alarmLabelInput = document.getElementById('alarm-label');
const alarmsListEl = document.getElementById('alarms-list');
const alarmSound = document.getElementById('alarm-sound');

// Stopwatch Elements
const stopwatchDisplay = document.getElementById('stopwatch-display');
const stopwatchStartBtn = document.getElementById('stopwatch-start');
const stopwatchStopBtn = document.getElementById('stopwatch-stop');
const stopwatchResetBtn = document.getElementById('stopwatch-reset');
const stopwatchLapBtn = document.getElementById('stopwatch-lap');
const stopwatchLapsEl = document.getElementById('stopwatch-laps');

// Timer Elements
const timerDisplay = document.getElementById('timer-display');
const timerHoursInput = document.getElementById('timer-hours');
const timerMinutesInput = document.getElementById('timer-minutes');
const timerSecondsInput = document.getElementById('timer-seconds');
const timerStartBtn = document.getElementById('timer-start');
const timerPauseBtn = document.getElementById('timer-pause');
const timerResetBtn = document.getElementById('timer-reset');

// Settings Elements
const settingsForm = document.getElementById('settings-form');
const timeFormatSelect = document.getElementById('time-format');
const themeSelect = document.getElementById('theme');
const defaultTabSelect = document.getElementById('default-tab');

// Notification addEventOnElements
const notificationEl = document.getElementById('notification');
const notificationMessageEl = document.getElementById('notification-message');
const notificationCloseBtn = document.getElementById('notification-close');

// App state
let alarms = JSON.parse(localStorage.getItem('alarms')) || [];
let settings = JSON.parse(localStorage.getItem('settings')) || {
  timeFormat: '24',
  theme: 'dark',
  defaultTab: 'clock',
};

let stopWatchInterval;
let stopwatchTime = 0;
let stopwatchRunning = false;
let laps = '';

let timerInterval;
let timerTime = 0;
let timerRunning = false;

// World clocks configuration
const worldClocks = [
  { city: 'New York', timezone: 'America/New York' },
  { city: 'London', timezone: 'Europe/London' },
  { city: 'Tokyo', timezone: 'Asia/Tokyo' },
  { city: 'Sydney', timezone: 'Australia/Sydney' },
  { city: 'Dubai', timezone: 'Asia/Dubai' },
  { city: 'Paris', timezone: 'Europe/Paris' },
];

// Initialize App
function init() {
  // Load settings
  loadSettings();

  // Set up tabs
  setupTabs();

  // Initialize clock
  updateClock();
  setInterval(updateClock, 1000);

  // Initialize world clocks
  updateWorldClocks();
  setInterval(updateWorldClocks, 1000);

  // Render alarms
  renderAlarms();

  // Set up event listeners
  setupEventLIsteners();
}
