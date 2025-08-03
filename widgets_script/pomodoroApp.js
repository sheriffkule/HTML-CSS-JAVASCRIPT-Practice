let allTypes = document.querySelectorAll('.container .time-options button');
let timer = document.querySelector('.progress-bar-value');
let startBtn = document.querySelector('.start-btn');
let stopBtn = document.querySelector('.stop-btn');
let resetBtn = document.querySelector('.reset-btn');
let circularProgressBar = document.querySelector('.progress-bar');

const audio = new Audio('../thumb/alarm.mp3');

let getType = (elem, type) => {
  for (x of allTypes) {
    x.classList.remove('active');
  }

  elem.classList.add('active');
  pomodoroType = type;
  resetTimer();
};

const timer_type_pomodoro = 'Pomodoro';
const timer_type_shortbreak = 'Shortbreak';
const timer_type_longbreak = 'Longbreak';
let pomodoroType = timer_type_pomodoro;

const pomodoroTimeInSec = 1500;
const shortBreakTimeInSec = 300;
const longBreakTimeInSec = 900;
let timerValue = pomodoroTimeInSec;
let multipleFactor = 360 / timerValue;
let progressInterval;

let resetTimer = () => {
  clearInterval(progressInterval);
  startBtn.style.display = 'block';
  stopBtn.style.display = 'none';
  if (pomodoroType === 'Pomodoro') {
    timerValue = pomodoroTimeInSec;
  } else if (pomodoroType === 'Shortbreak') {
    timerValue = shortBreakTimeInSec;
  } else {
    timerValue = longBreakTimeInSec;
  }
  multipleFactor = 360 / timerValue;
  timerProgress();
  audio.stop();
};

let formatedNumberInMinutes = (number) => {
  let minutes = Math.trunc(number / 60)
    .toString()
    .padStart(2, '0');
  let seconds = Math.trunc(number % 60)
    .toString()
    .padStart(2, '0');

  return `${minutes} : ${seconds}`;
};

let timerProgress = () => {
  if (timerValue == 0) {
    stopTimer();
    audio.play();
  }
  timer.innerHTML = `${formatedNumberInMinutes(timerValue)}`;
  circularProgressBar.style.background = `conic-gradient(#664efe ${
    timerValue * multipleFactor
  }deg, #422f66 0deg)`;
};

let startTimer = () => {
  progressInterval = setInterval(() => {
    timerValue--;
    timerProgress();
  }, 1000);
  startBtn.style.display = 'none';
  stopBtn.style.display = 'block';
};

let stopTimer = () => {
  clearInterval(progressInterval);
  startBtn.style.display = 'block';
  stopBtn.style.display = 'none';
};

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);

function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');

  if (yearElement) {
    yearElement.setAttribute('datetime', currentYear.toString());
    yearElement.dateTime = currentYear;
    yearElement.textContent = currentYear.toString();
  }
}

window.addEventListener('load', updateYear);