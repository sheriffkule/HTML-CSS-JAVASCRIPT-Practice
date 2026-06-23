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
  const presetButtons = document.querySelectorAll('.preset-btn');
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContent = document.querySelectorAll('.tab-content');

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

  function startTimer() {
    if (isRunning) return;

    // Get settings based on current mode
    switch (currentMode) {
      case 'interval':
        workTime = parseInt(document.getElementById('work-time').value);
        restTime = parseInt(document.getElementById('rest-time').value);
        totalRounds = parseInt(document.getElementById('rounds').value);
        timeLeft = workTime;
        totalTime = workTime;
        currentPhase = 'work';
        currentRound = 1;
        break;
      case 'tabata':
        workTime = parseInt(document.getElementById('tabata-time').value);
        restTime = parseInt(document.getElementById('tabata-time').value);
        totalRounds = parseInt(document.getElementById('tabata-rounds').value);
        timeLeft = workTime;
        totalTime = workTime;
        currentPhase = 'work';
        currentRound = 1;
        break;
      case 'stopwatch':
        timeLeft = 0;
        totalTime = 0;
        startTime = Date.now();
        break;
      case 'countdown':
        const minutes = parseInt(document.getElementById('countdown-minutes').value);
        const seconds = parseInt(document.getElementById('countdown-seconds').value);
        timeLeft = minutes * 60 + seconds;
        totalTime = timeLeft;
        break;
    }

    isRunning = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    lapBtn.disabled = currentMode !== 'stopwatch';

    if (currentMode === 'stopwatch') {
      timer = setInterval(updateStopwatch, 10);
    } else {
      timer = setInterval(updateTimer, 1000);
      updateTimerModeDisplay();
    }

    updateDisplay();
  }

  function pauseTimer() {
    if (!isRunning) return;

    clearInterval(timer);
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    updateDisplay();
  }

  function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = 0;
    totalTime = 0;
    currentRound = 1;
    currentPhase = 'work';
    lapTimeArray = [];
    lapTimes.innerHTML = '';

    if (currentMode === 'stopwatch') {
      timeDisplay.textContent = '00:00';
      timerMode.textContent = 'Stopwatch';
    } else {
      timeDisplay.textContent = formatTime(timeLeft);
      updateTimerModeDisplay();
    }

    progressBar.style.width = '0%';
    roundsDisplay.textContent = '';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
  }

  function updateTimer() {
    timeLeft--;

    // Play tick sound for the last 3 seconds
    if (timeLeft <= 3 && timeLeft > 0 && soundToggle.checked) {
      tickSound.currentTime = 0;
      tickSound.play().catch((e) => console.log('Sound play error: ', e));
    }

    // Update progress bar
    const progressPercent = ((totalTime - timeLeft) / totalTime) * 100;
    progressBar.style.width = `${progressPercent}%`;

    if (timeLeft <= 0) {
      // Timer finished for current phase
      playEndSound();
      if (vibrationToggle.checked && navigator.vibrate) {
        navigator.vibrate(500);
      }

      if (currentMode === 'interval' || currentMode === 'tabata') {
        if (currentPhase === 'work') {
          // Switch to rest phase
          currentPhase === 'rest';
          timeLeft = restTime;
          totalTime = restTime;
        } else {
          // switch to work phase for next round
          currentPhase === 'work';
          timeLeft = workTime;
          totalTime = workTime;
          currentRound++;

          if (currentRound > totalRounds) {
            // All rounds completed
            clearInterval(timer);
            isRunning = false;
            startBtn.disabled = false;
            pauseBtn.disabled = true;
            timerMode.textContent = 'Completed';
            return;
          }
        }
        updateTimerModeDisplay();
      } else if (currentMode === 'countdown') {
        // Countdown finished
        clearInterval(timer);
        isRunning = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        timerMode.textContent = "Time's up!";
        return;
      }
    }

    updateDisplay();
  }

  function updateStopwatch() {
    const elapsed = Date.now() - startTime;
    timeDisplay.textContent = formatTime(Math.floor(elapsed / 1000));
  }
});
