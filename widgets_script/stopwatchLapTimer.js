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
  const savedTheme = localStorage.getItem('theme');
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
      startTime = Date.now() - elapsedTime;
      timerInterval = setInterval(updateTimer, 10);
      isRunning = true;
      startStopBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
      lapBtn.disabled = false;
    } else {
      clearInterval(timerInterval);
      isRunning = false;
      startStopBtn.innerHTML = '<i class="fas fa-play"></i> Resume';
    }
  }

  function updateTimer() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    const totalMilliseconds = elapsedTime;
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
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
    timerInterval = null;
    isRunning = false;
    elapsedTime = 0;
    lapStartTime = 0;
    laps = [];

    hoursDisplay.textContent = '00';
    minutesDisplay.textContent = '00';
    secondsDisplay.textContent = '00';
    millisecondsDisplay.textContent = '00';

    startStopBtn.innerHTML = '<i class="fas fa-play"></i> Play';
    lapBtn.disabled = true;

    updateLapsList();
    updateLapStats();
  }

  function recordLap() {
    if (!isRunning) return;

    const currentTime = Date.now();
    const currentElapsedTime = currentTime - startTime;
    const lapTime = currentElapsedTime - lapStartTime;
    lapStartTime = currentElapsedTime;

    const lapObj = {
      number: laps.length + 1,
      time: lapTime,
      totalTime: currentElapsedTime,
    };

    laps.unshift(lapObj);
    updateLapsList();
    updateLapStats();
  }

  function updateLapsList() {
    const lapsListHeader = `
      <div class="lap-item lap-header">
        <span class="lap-number">Lap Num</span>
        <span class="lap-time">Lap Time</span>
        <span class="lap-difference">Difference</span>
        <span class="lap-total">Total Time</span>
      </div>
    `;

    if (laps.length === 0) {
      lapsList.innerHTML = lapsListHeader + `
        <div class="empty-state">
          <i class="fas fa-flag"></i>
          <p>Your lap times will appear here.</p>
        </div>
      `;
      return;
    }

    let fastestLap = Math.min(...laps.map((lap) => lap.time));
    let slowestLap = Math.max(...laps.map((lap) => lap.time));

    lapsList.innerHTML = lapsListHeader + laps
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
        <div class="lap-item ${isFastest ? 'fastest' : ''} ${isSlowest ? 'slowest' : ''}">
          <span class="lap-number">Lap ${lap.number}</span>
          <span class="lap-time">${lapTimeFormatted}</span>
          <span class="lap-difference">${difference}</span>
          <span class="lap-total">${totalTimeFormatted}</span>
        </div>
      `;
      })
      .join('');
  }

  function updateLapStats() {
    if (laps.length === 0) {
      fastestLapDisplay.textContent = '--:--:--,--';
      slowestLapDisplay.textContent = '--:--:--,--';
      averageLapDisplay.textContent = '--:--:--,--';
      return;
    }

    const lapTimes = laps.map((lap) => lap.time);
    const fastest = Math.min(...lapTimes);
    const slowest = Math.max(...lapTimes);
    const average = lapTimes.reduce((sum, time) => sum + time, 0) / lapTimes.length;

    fastestLapDisplay.textContent = formatTime(fastest);
    slowestLapDisplay.textContent = formatTime(slowest);
    averageLapDisplay.textContent = formatTime(average);
  }

  function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);

    const ms = Math.floor((milliseconds % 1000) / 10);
    const sec = totalSeconds % 60;
    const min = totalMinutes % 60;
    const hrs = totalHours % 24;

    return `${hrs.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')},${ms.toString().padStart(2, '0')}`;
  }

  function exportToCSV() {
    if (laps.length === 0) return;

    let csvContent = 'Lap Number, Lap Time, Total Time\n';

    laps.forEach((lap) => {
      csvContent += `${lap.number}, ${formatTime(lap.time)}, ${formatTime(lap.totalTime)}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'lap_times.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 200);
  }

  // Event listeners
  startStopBtn.addEventListener('click', startTimer);
  lapBtn.addEventListener('click', recordLap);
  resetBtn.addEventListener('click', resetTimer);
  exportBtn.addEventListener('click', exportToCSV);

  // Keyboard shortcuts
  document.addEventListener('keydown', function (e) {
    if (e.code === 'Space') {
      e.preventDefault();
      startTimer();
    } else if (e.code === 'KeyL' && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      recordLap();
    }
  });

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
});
