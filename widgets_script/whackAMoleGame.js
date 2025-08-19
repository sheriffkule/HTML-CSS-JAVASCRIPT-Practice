let startGameBtn = document.querySelector('.start-game-btn');
let container = document.querySelector('.container');
let allItems = document.querySelectorAll('.all-items .item');
let scoreText = document.querySelector('.score span');
let timerText = document.querySelector('.timer span');
let gameOverBox = document.querySelector('.game-over');
let gameOverScore = document.querySelector('.game-over-score');
let exitGameBtn = document.querySelector('.exit-game-btn');
let playAgainBtn = document.querySelector('.play-again-btn');

let score = 0;
let globalStartGame;

container.addEventListener('click', (e) => {
  if (e.target.classList.contains('mole-clicked')) {
    score++;
    scoreText.textContent = score;
    let hole = e.target.parentElement.parentElement;
    let whackText = document.createElement('span');
    whackText.textContent = 'WHACK!';
    whackText.classList.add('whack-text');
    hole.appendChild(whackText);
    setTimeout(() => {
      whackText.remove();
    }, 500);
  }
});

let startGame = () => {
  startTimer(60);
  globalStartGame = setInterval(() => {
    showMole();
  }, 1000);
  startGameBtn.style.display = 'none';
  container.style.height = '530px';
};

let showMole = () => {
  let randomIndex = Math.floor(Math.random() * allItems.length);
  let moleAppeared = allItems[randomIndex].querySelector('.hole img');
  moleAppeared.classList.add('mole-appeared');
  hideMole(moleAppeared);
};

let hideMole = (moleItem) => {
  setTimeout(() => {
    moleItem.classList.remove('mole-appeared');
  }, 1000);
};

let startTimer = (time) => {
  timer = setInterval(() => {
    if (time > 0) {
      time--;
      timerText.textContent = time;
    }
    if (time == 0) {
      clearInterval(globalStartGame);
      clearInterval(timer);
      gameOverBox.style.display = 'block';
      gameOverScore.textContent = score;
    }
  }, 1000);
};

exitGameBtn.addEventListener('click', () => {
  score = 0;
  scoreText.textContent = score;
  timerText.textContent = 60;
  gameOverBox.style.display = 'none';
  startGameBtn.style.display = 'block';
  container.style.height = '580px';
});

playAgainBtn.addEventListener('click', () => {
  score = 0;
  scoreText.textContent = score;
  timerText.textContent = 60;
  gameOverBox.style.display = 'none';
  startGame();
});

startGameBtn.addEventListener('click', startGame);

document.getElementById('year').textContent = new Date().getFullYear();
