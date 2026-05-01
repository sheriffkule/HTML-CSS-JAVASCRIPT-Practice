// DOM Elements
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Clock Elements
const currentTimeEl = document.getElementById('current-time');
const currentDateEl = document.getElementById('current-date');
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
  { city: 'New York', timezone: 'America/New_York' },
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

// Load settings from localStorage
function loadSettings() {
  if (settings) {
    timeFormatSelect.value = settings.timeFormat;
    themeSelect.value = settings.theme;
    defaultTabSelect.value = settings.defaultTab;

    // Apply theme
    applyTheme(settings.theme);

    // Activate default tab
    const defaultTabBtn = document.querySelector(`.tab-btn[data-tab="${settings.defaultTab}"]`);
    if (defaultTabBtn) {
      document.querySelector('.tab-btn.active').classList.remove('active');
      document.querySelector('.tab-content.active').classList.remove('active');

      defaultTabBtn.classList.add('active');
      document.getElementById(settings.defaultTab).classList.add('active');
    }
  }
}

// Apply theme
function applyTheme(theme) {
  document.body.className = '';
  document.body.classList.add(theme + '-theme');
}

// Set up tabs
function setupTabs() {
  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');

      // Remove active class from all buttons and contents
      tabBtns.forEach((b) => b.classList.remove('active'));
      tabContents.forEach((c) => c.classList.remove('active'));

      // Add active class to clicked button and corresponding content
      btn.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });
}

// Update main clock
function updateClock() {
  const now = new Date();

  // Format time based on settings
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  let timeString;
  if (settings.timeFormat === '12') {
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    timeString = `${String(hours).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;
  } else {
    timeString = `${String(hours).padStart(2, '0')}:${minutes}:${seconds}`;
  }

  currentTimeEl.textContent = timeString;

  // Format date
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  currentDateEl.textContent = now.toLocaleDateString(undefined, options) + '.';

  // Check alarms
  // checkAlarms(now);
}

// Update world clocks
function updateWorldClocks() {
  worldClocksEl.innerHTML = '';

  worldClocks.forEach((clock) => {
    const now = new Date();
    let timeString;

    try {
      timeString = now.toLocaleTimeString(undefined, {
        timeZone: clock.timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: settings.timeFormat === '12',
      });

      const dateString = now.toLocaleDateString(undefined, {
        timeZone: clock.timezone,
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });

      const clockEl = document.createElement('div');
      clockEl.className = 'world-clock';
      clockEl.innerHTML = `
        <div class="city">${clock.city}</div>
        <div class="time">${timeString}</div>
        <div class="date">${dateString}</div>
      `;

      worldClocksEl.appendChild(clockEl);
    } catch (e) {
      console.error(`Error displaying time for ${clock.city}:`, e);
    }
  });
}

// Set up event listeners
function setupEventListeners() {
  // Alarm form submission
  alarmForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const time = alarmTimeInput.value;
    const sound = alarmSoundSelect.value;
    const label = alarmLabelInput.value || 'Alarm';

    // Create alarm object
    const alarm = {
      id: Date.now(),
      time,
      sound,
      label,
      active: true,
    };

    // Add to alarms array
    alarms.push(alarm);

    // Save to localStorage
    localStorage.setItem('alarms', JSON.stringify(alarms));

    // Render alarms
    renderAlarms();

    // Reset form
    alarmForm.reset();

    // Show notification
    showNotification('Alarm aded successfully');
  });
}

// Initialize the app
document.addEventListener('DOMContentLoaded', init);
