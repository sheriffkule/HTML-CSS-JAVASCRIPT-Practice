const startScreen = document.getElementById('start-screen');
const endScreen = document.getElementById('end-screen');
const startBtn = document.getElementById('start-btn');
const balloonContainer = document.getElementById('balloon-container');
const scoreboard = document.getElementById('scoreboard');
const timeDisplay = document.getElementById('time');
const scoreDisplay = document.getElementById('score');
const finalScore = document.getElementById('final-score');

let gameInterval;
let timeInterval;
let timeLeft = 60;
let score = 0;

let gameRunning = false;

function createBalloon() {
  if (!gameRunning) return;
  const balloon = document.createElement('div');
  balloon.classList.add('balloon');
  balloon.innerHTML = `<ion-icon name="balloon-outline"></ion-icon>`;

  balloon.style.left = Math.random() * (window.innerWidth - 50) + 'px';

  const duration = Math.random() * 8 + 4;
  balloon.style.animationDuration = duration + 's';

  balloon.addEventListener('click', () => {
    balloon.remove();
    score++;
    scoreDisplay.textContent = score;
  });

  balloon.addEventListener('animationend', () => {
    balloon.remove();
  });

  balloonContainer.appendChild(balloon);
}

function startGame() {
  startScreen.style.display = 'none';
  scoreboard.style.display = 'block';
  gameRunning = true;

  gameInterval = setInterval(createBalloon, 400);

  timeInterval = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  gameRunning = false;
  clearInterval(gameInterval);
  clearInterval(timeInterval);

  scoreboard.style.display = 'none';
  endScreen.style.display = 'flex';
  finalScore.textContent = score;
}

startBtn.addEventListener('click', startGame);

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