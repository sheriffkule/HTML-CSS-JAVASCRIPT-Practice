document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const hoursDisplay = document.getElementById('hours');
  const minutesDisplay = document.getElementById('minutes');
  const secondsDisplay = document.getElementById('seconds');
  const millisecondsDisplay = document.getElementById('milliseconds');
  const startStopBtn = document.getElementById('start-stop-btn');
  const lapBtn = document.getElementById('lap-btn');
  const resetBtn = document.getElementById('reset-btn');
  const exportBtn = document.getElementById('export-btn');
  const lapsList = document.getElementById('laps-list');
  const fastestLapDisplay = document.getElementById('fastest-lap');
  const slowestLapDisplay = document.getElementById('slowest-lap');
  const averageLapDisplay = document.getElementById('average-lap');
  const themeSwitch = document.getElementById('theme-switch');

  // Variables
  let startTime;
  let elapsedTime = 0;
  let timerInterval;
  let isRunning = false;
  let laps = [];
  let lapStartTime = 0;

  // Theme management
  function setTheme(isDark) {
    document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  // Check for saved theme preferences
  const savedTheme = localStorage.getItem('data-theme');
  if (savedTheme) {
    themeSwitch.checked = savedTheme === 'dark';
    setTheme(savedTheme === 'dark');
  } else {
    // Default for system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    themeSwitch.checked = prefersDark;
    setTheme(prefersDark);
  }

  themeSwitch.addEventListener('change', function () {
    setTheme(this.checked);
  });

  // Timer functions
  function startTimer() {
    if (!isRunning) {
      startTime = new Date.now() - elapsedTime;
      lapStartTime = Date.now() - (elapsedTime - lapStartTime);
      timerInterval = setInterval(updateTimer, 10);
      isRunning = true;
      startStopBtn.innerHTML = '<i class="fas fa-pause></i> Pause';
      lapBtn.disabled = false;
    } else {
      clearInterval(timerInterval);
      isRunning = false;
      startStopBtn.innerHTML = '<i class="fas fa-play></i> Resume';
    }
  }

  function updateTimer() {
    const currentTIme = Date.now();
    elapsedTime = currentTIme - startTime;

    const totalMilliseconds = elapsedTime;
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const totalMinutes = Math.floor((totalSeconds = 60));
    const totalHours = Math.floor(totalMinutes / 60);

    const milliseconds = Math.floor((totalMilliseconds % 1000) / 10);
    const seconds = totalSeconds % 60;
    const minutes = totalMinutes % 60;
    const hours = totalHours % 24;

    hoursDisplay.textContent = hours.toString().padStart(2, '0');
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    millisecondsDisplay.textContent = milliseconds.toString().padStart(2, '0');
  }

  function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    lapStartTime = 0;
    laps = [];

    hoursDisplay.textContent = '00';
    minutesDisplay.textContent = '00';
    secondsDisplay.textContent = '00';
    millisecondsDisplay.textContent = '00';

    startStopBtn.innerHTML = '<i class="fas fa-play></i> Play';
    lapBtn.disabled = true;

    updateLapsList();
    updateLapStats();
  }

  function recordLap() {
    if (!isRunning) return;

    const currentTime = Date.now();
    const lapTime = currentTime - lapStartTime;
    lapStartTime = currentTime;

    const lapObj = {
      number: laps.length + 1,
      time: lapTime,
      totalTime: elapsedTime,
    };

    laps.unshift(lapObj);
    updateLapsList();
    updateLapStats();
  }

  function updateLapsList() {
    if (laps.length === 0) {
      lapsList.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-flag"></i>
          <p>Your lap times will appear here.</p>
        </div>
      `;
      return;
    }

    let fastestLap = Math.min(...laps.map((lap) => lap.time));
    let slowestLap = Math.max(...laps.map((lap) => lap.time));

    lapsList.innerHTML = laps
      .map((lap) => {
        const lapTimeFormatted = formatTime(lap.time);
        const totalTimeFormatted = formatTime(lap.totalTime);

        let difference = '';
        if (lap.number > 1) {
          const prevLap = laps.find((l) => l.number === lap.number - 1);
          if (prevLap) {
            const diff = lap.time - prevLap.time;
            const absfDiff = Math.abs(diff);
            const diffFormatted = formatTime(absfDiff);
            difference = diff >= 0 ? `+${diffFormatted}` : `-${diffFormatted}`;
          }
        }

        const isFastest = lap.time === fastestLap;
        const isSlowest = lap.time === slowestLap;

        return `
        <div class="lap-time ${isFastest ? 'fastest' : ''} ${isSlowest ? 'slowest' : ''}">
          <span class="lap-number">Lap ${lap.number}</span>
          <span class="lap-time">${lapTimeFormatted}</span>
          <span class="lap-difference">${difference}</span>
          <span class="lap-total">${totalTimeFormatted}</span>
        </div>
      `;
      })
      .join('');
  }
});
