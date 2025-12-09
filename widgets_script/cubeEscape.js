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
    obs.textContent = '😠';

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

// === Moving Obstacles ===
function moveObstacles() {
  movingObstacles.forEach((m) => {
    m.x += m.dx;
    m.y += m.dy;

    if (m.x <= 0 || m.x >= containerSize - 60) m.dx *= -1;
    if (m.y <= 0 || m.y >= containerSize - 60) m.dy *= -1;

    m.el.style.left = `${m.x}px`;
    m.el.style.top = `${m.y}px`;
  });
}

// === RESET PLAYER ===
function resetCube() {
  positionX = 0;
  positionY = 0;
  cube.style.left = '0px';
  cube.style.top = '0px';
}

// === UPDATE LIVES DISPLAY ===
function updateLivesDisplay() {
  livesDisplay.textContent = `❤️ Lives: ${lives}`;
}

// === LOSE LIFE (now non-blocking) ===
function loseLife() {
  if (invincible || !gameRunning) return; // prevent double hit

  lives--;
  updateLivesDisplay();

  if (lives <= 0) {
    gameRunning = false;
    showOverlay('GAME OVER! <br><br>Try Again?');
    return;
  }

  // flash & respawn safely
  invincible = true;
  cube.style.backgroundColor = 'orange';
  resetCube();

  // blink effect to show invincibility
  let blinkCount = 0;
  const blink = setInterval(() => {
    cube.style.visibility = cube.style.visibility === 'hidden' ? 'visible' : 'hidden';
    blinkCount++;
    if (blinkCount > 10) {
      clearInterval(blink);
      cube.style.visibility = 'visible';
      cube.style.backgroundColor = 'orangered';
      invincible = false;
    }
  }, 100);
}

function moveCube() {
  if (!gameRunning) return;

  moveObstacles();

  let nextX = positionX;
  let nextY = positionY;

  if (keys['ArrowLeft']) nextX -= speed;
  if (keys['ArrowRight']) nextX += speed;
  if (keys['ArrowUp']) nextY -= speed;
  if (keys['ArrowDown']) nextY += speed;

  nextX = Math.max(0, Math.min(nextX, containerSize - cubeSize));
  nextY = Math.max(0, Math.min(nextY, containerSize - cubeSize));

  cube.style.left = nextX + 'px';
  cube.style.top = nextY + 'px';

  if (!invincible) {
    for (let obs of obstacles) {
      if (isColliding(cube, obs)) {
        loseLife();
        break;
      }
    }
  }

  positionX = nextX;
  positionY = nextY;

  if (isColliding(cube, goal)) {
    nextLevel();
    return;
  }

  requestAnimationFrame(moveCube);
}

// === NEXT LEVEL ===
function nextLevel() {
  gameRunning = false;
  cube.style.backgroundColor = 'gold';

  if (level < maxLevel) {
    setTimeout(() => {
      level++;
      speed += 0.5;
      obstacleCount += 1;
      info.textContent = `Level ${level} - Speed: ${speed.toFixed(1)}, Obstacles: ${obstacleCount}`;
      resetCube();
      createObstacles();
      gameRunning = true;
      moveCube();
    }, 800);
  } else {
    showOverlay('YOU WIN! 🏆 <br><br></br>Play Again?');
  }
}

// === SHOW OVERLAY ===
function showOverlay(message) {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  overlay.innerHTML = ` ${message} <button onclick="location.reload()">Restart</button> `;
  document.body.appendChild(overlay)
}

// === CONTROLS ===
document.addEventListener('keydown', e => (keys[e.key] = true))
document.addEventListener('keyup', e => (keys[e.key] = false))

function startGame() {
  info.textContent = `Level ${level} - Speed: ${speed} - Obstacles: ${obstacleCount}`;
  createObstacles();
  updateLivesDisplay();
  moveCube();
}
startGame();

function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');

  if (!yearElement) {
    console.error('Year element not found');
    return;
  }

  if (yearElement) {
    yearElement.setAttribute('datetime', currentYear.toString());
    yearElement.dateTime = currentYear.toString();
    yearElement.textContent = currentYear.toString();
  }
}

updateYear();