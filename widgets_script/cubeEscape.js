const cube = document.getElementById('cube');
const goal = document.getElementById('goal');
const gameContainer = document.getElementById('game-container');
const info = document.getElementById('info');
const livesDisplay = document.getElementById('lives');

const containerSize = 400;
const cubeSize = 40;
let positionX = 0;
let positionY = 0;
let keys = [];
let gameRunning = true;

let level = 1;
const maxLevel = 10;
let lives = 3;

let speed = 3;
let obstacleCount = 4;
let obstacles = [];
let movingObstacles = [];

let invincible = false; // prevent instant repeated deaths

// === COLLISION CHECK ===
function isColliding(a, b) {
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();

  return !(
    aRect.top >= bRect.bottom ||
    aRect.bottom <= bRect.top ||
    aRect.left >= bRect.right ||
    aRect.right <= bRect.left
  );
}

function createObstacles() {
  obstacles.forEach((o) => o.remove());
  obstacles = [];
  movingObstacles = [];

  while (obstacles.length < obstacleCount) {
    const obs = document.createElement('div');
    obs.classList.add('obstacle');

    const x = Math.floor(Math.random() * (containerSize - 70));
    const y = Math.floor(Math.random() * (containerSize - 70));

    // Avoid start or goal area
    if ((x < 100 && y < 100) || (x > containerSize - 100 && y > containerSize - 100)) continue;
    
    obs.style.left = `${x}px`;
    obs.style.top = `${y}px`;
    gameContainer.appendChild(obs);
    obstacles.push(obs);

    // Randomly make some obstacles moving
    if (Math.random() < 0.5) {
      movingObstacles.push({
        el: obs,
        x,
        y,
        dx: Math.random() < 0.5 ? 2 : -2,
        dy: Math.random() < 0.5 ? 2 : -2,
      });
    }
  }
}

function startGame() {
    info.textContent = `Level ${level} - Speed: ${speed} - Obstacles: ${obstacleCount}`;
    createObstacles();
}
startGame();