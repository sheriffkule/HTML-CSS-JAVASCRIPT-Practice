document.addEventListener('DOMContentLoaded', function () {
  // Timer functionality
  const timerDisplay = document.getElementById('timer');
  const startBtn = document.getElementById('startBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  const stopBtn = document.getElementById('stopBtn');

  let seconds = 0;
  let minutes = 0;
  let hours = 0;
  let timerInterval = null;
  let isRunning = false;

  // Format time to always show two digits
  function formatTime(value) {
    return value < 10 ? `0${value}` : value;
  }

  // Update timer display
  function updateTimer() {
    seconds++;

    if (seconds >= 60) {
      seconds = 0;
      minutes++;

      if (minutes >= 60) {
        minutes = 0;
        hours++;
      }
    }

    timerDisplay.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
  }

  // Start the timer
  startBtn.addEventListener('click', function () {
    if (!isRunning) {
      timerInterval = setInterval(updateTimer, 1000);
      isRunning = true;
      startBtn.disabled = true;
      pauseBtn.disabled = false;
      stopBtn.disabled = false;
    }
  });

  // Pause the timer
  pauseBtn.addEventListener('click', function() {
    clearInterval(timerInterval)
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    startBtn.innerHTML = '<i class="fas fa-play"></i> Resume'
  });

  // Stop the timer
  stopBtn.addEventListener('click', function() {
    clearInterval(timerInterval);
    isRunning = false;
    seconds = 0;
    minutes = 0;
    hours = 0;
    timerDisplay.textContent = '00:00:00'
    startBtn.disabled = false
    pauseBtn.disabled = true;
    stopBtn.disabled = true
    startBtn.innerHTML = '<i class="fas fa-play"></i> Start'

    // Add to recent activity
    addActivity('Stopped timer', 'Just now')
  })
});
