const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const setBtn = document.getElementById('setBtn');

const daysInput = document.getElementById('daysInput');
const hoursInput = document.getElementById('hoursInput');
const minutesInput = document.getElementById('minsInput');
const secondsInput = document.getElementById('secsInput');

let countdownDate;
let timerInterval;
let isRunning = false;
let remainingTime = 0;
let isPaused = false;

function initTimer() {
  daysElement.textContent = '00';
  hoursElement.textContent = '00';
  minutesElement.textContent = '00';
  secondsElement.textContent = '00';
  isRunning = false;
}

function startTimer() {
  if (isRunning) return;

  const days = parseInt(daysInput.value) || 0;
  const hours = parseInt(hoursInput.value) || 0;
  const minutes = parseInt(minutesInput.value) || 0;
  const seconds = parseInt(secondsInput.value) || 0;

  remainingTime = (days * 24 * 60 * 60 + hours * 3600 + minutes * 60 + seconds) * 1000;
  countdownDate = Date.now() + remainingTime;

  timerInterval = setInterval(updateTimer, 1000);
  isRunning = true;

  document.querySelectorAll('.time-unit').forEach((unit) => {
    unit.classList.add('active');
  });
}

function updateTimer() {
  const now = Date.now();
  const distance = countdownDate - now;

  if (distance < 0) {
    clearInterval(timerInterval);
    isRunning = false;
    initTimer();
    document.querySelectorAll('.time-unit').forEach((unit) => {
      unit.classList.remove('active');
    });
    alert('Countdown finished!');
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  daysElement.textContent = String(days).padStart(2, '0');
  hoursElement.textContent = String(hours).padStart(2, '0');
  minutesElement.textContent = String(minutes).padStart(2, '0');
  secondsElement.textContent = String(seconds).padStart(2, '0');
}

function pauseTimer() {
  if (!isRunning) return;

  clearInterval(timerInterval);

  remainingTime = countdownDate - Date.now();
  isRunning = false;
}

function resetTimer() {
  clearInterval(timerInterval);
  initTimer();
}

function pauseOrResumeTimer() {
  if (isRunning && !isPaused) {
    clearInterval(timerInterval);
    remainingTime = countdownDate - Date.now();
    isPaused = true;
    isRunning = false;
    pauseBtn.textContent = 'Resume';
  } else if (isPaused) {
    countdownDate = Date.now() + remainingTime;
    timerInterval = setInterval(updateTimer, 1000);
    isPaused = false;
    isRunning = true;
    pauseBtn.textContent = 'Pause';
  }
}

function setTimer() {
  const days = parseInt(daysInput.value) || 0;
  const hours = parseInt(hoursInput.value) || 0;
  const minutes = parseInt(minutesInput.value) || 0;
  const seconds = parseInt(secondsInput.value) || 0;

  remainingTime = (days * 24 * 60 * 60 + hours * 3600 + minutes * 60 + seconds) * 1000;
  countdownDate = Date.now() + remainingTime;

  updateTimer();
}

startBtn.addEventListener('click', startTimer);
pauseBtn.removeEventListener('click', pauseTimer);
pauseBtn.addEventListener('click', pauseOrResumeTimer);
resetBtn.addEventListener('click', resetTimer);
setBtn.addEventListener('click', setTimer);

document.addEventListener('DOMContentLoaded', initTimer);
