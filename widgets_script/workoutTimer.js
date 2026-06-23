document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const timeDisplay = document.getElementById('time');
  const progressBar = document.getElementById('progress-bar');
  const timerMode = document.getElementById('timer-mode');
  const roundsDisplay = document.getElementById('rounds-display');
  const startBtn = document.getElementById('start-btn');
  const pauseBtn = document.getElementById('pause-btn');
  const resetBtn = document.getElementById('reset-btn');
  const lapBtn = document.getElementById('lap-btn');
  const lapTimes = document.getElementById('lap-times');
  const themeSwitch = document.getElementById('theme-switch');
  const soundToggle = document.getElementById('sound-toggle');
  const vibrationToggle = document.getElementById('vibration-toggle');
  const endSoundSelect = document.getElementById('end-sound');
  const presetButtons = document.querySelectAll('.preset-btn');
  const tabButtons = document.querySelectAll('.tab-btn');
  const tabContent = document.querySelectAll('.tab-content');

  // Audio elements
  const bellSound = document.getElementById('bell-sound');
  const beepSound = document.getElementById('beep-sound');
  const hornSound = document.getElementById('horn-sound');
  const chimeSound = document.getElementById('chime-sound');
  const tickSound = document.getElementById('tick-sound');

  // Timer variables
  let timer;
  let timeLeft = 0;
  let totalTime = 0;
  let isRunning = false;
  let currentMode = 'stopwatch'; // 'interval', 'tabata', 'stopwatch', 'countdown'
  let currentPhase = 'work'; // 'work' or 'reset'
  let currentRound = 1;
  let workTime = 30;
  let resetTime = 10;
  let startTime;
  let lapTimeArray = [];

  // Initialize the app
  init();

  function init() {
    // Load saved theme preferences
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.body.setAttribute('data-theme', savedTheme);
      themeSwitch.checked = savedTheme === 'dark';
    }

    // Load saved settings
    const savedSound = localStorage.getItem('soundEnabled');
    if (savedSound) {
      soundToggle.checked = savedSound === 'true';
    }

    const savedVibration = localStorage.getItem('vibrationEnabled');
    if (savedVibration) {
      vibrationToggle.checked = savedVibration === 'true';
    }

    const savedEndSound = localStorage.getItem('endSound');
    if (savedEndSound) {
      endSoundSelect.value = savedEndSound;
    }

    // Set up event listeners
    themeSwitch.addEventListener('change', toggleTheme);
    soundToggle.addEventListener('change', saveSettings);
    vibrationToggle.addEventListener('change', saveSettings);
    endSoundSelect.addEventListener('change', saveSettings);
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
    lapBtn.addEventListener('click', recordLapTime);

    // Preset buttons
    presetButtons.forEach((btn) => {
      btn.addEventListener('click', () => loadPreset(btn.dataset.preset));
    });

    // Tab buttons
    tabButtons.forEach((btn) => {
      btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // Update Display
    updateDisplay();
  }

  function toggleTheme() {
    if (themeSwitch.checked) {
      document.body.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }

  function saveSettings() {
    localStorage.setItem('soundEnabled', soundToggle.checked);
    localStorage.setItem('vibrationEnabled', vibrationToggle.checked);
    localStorage.setItem('endSound', endSoundSelect.value);
  }

  function loadPreset(preset) {
    switch (preset) {
      case 'tabata':
        document.getElementById('tabata-work').value = 20;
        document.getElementById('tabata-rest').value = 10;
        document.getElementById('tabata-rounds').value = 8;
        switchTab('tabata');
        break;
      case 'hiit':
        document.getElementById('work-time').value = 40;
        document.getElementById('rest-time').value = 20;
        document.getElementById('rounds').value = 10;
        switchTab('interval');
        break;
      case 'amrap':
        document.getElementById('countdown-minutes').value = 20;
        document.getElementById('countdown-seconds').value = 0;
        switchTab('countdown');
        break;
      case 'emom':
        document.getElementById('countdown-minutes').value = 1;
        document.getElementById('countdown-seconds').value = 0;
        switchTab('countdown');
        break;
    }
  }

  function switchTab(tab) {
    // Update tab buttons
    tabButtons.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.tab === tab);
    });

    // Update tab content
    tabContent.forEach((content) => {
      content.classList.toggle('active', content.id === `${tab}-tab`);
    });

    // Set current mode
    currentMode = tab;
    resetTimer();
  }
});
