let score = 0;
let health = 100;
let shield = 0;
let level = 1;
let gameRunning = false;
let playerSpeed = 10;
let keys = {};
let hitsTaken = 0;
let enemySpawnInterval;
let coinSpawnInterval;
let powerUpSpawnInterval;
let lastLevelUpScore = 0;
let baseCoinValue = 10;

const player = document.getElementById('player');
const gameContainer = document.getElementById('game-container');
const healthBar = document.getElementById('health-bar');
const healthBarText = document.getElementById('health-bar-text');
const shieldBar = document.getElementById('shield-bar');
const shieldBarText = document.getElementById('shield-bar-text');
const scoreDisplay = document.getElementById('score-display');
const levelDisplay = document.getElementById('level-display');
const gameButton = document.getElementById('game-button');
const gameOverScreen = document.getElementById('game-over');
const finalScoreDisplay = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');
const startScreen = document.getElementById('start-screen');
const startButton = document.getElementById('start-button');

let enemies = [];
let coins = [];
let powerUps = [];
let stars = [];

function createStars() {
  const starsContainer = document.getElementById('stars');

  for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.className = 'star';

    const size = Math.random() * 2 + 1;
    const duration = Math.random() * 5 + 3;
    const opacity = Math.random() * 0.7 + 0.3;

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.setProperty('--duration', `${duration}s`);
    star.style.setProperty('--opacity', `${opacity}`);

    starsContainer.appendChild(star);
    stars.push(star);
  }
}

function initPlayer() {
  player.style.left = `${window.innerWidth / 2 - 30}px`;
  player.style.top = `${window.innerHeight / 2 - 30}px`;
}

function setupEventListeners() {
  document.addEventListener('keydown', (e) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'].includes(e.key)) {
      keys[e.key] = true;
    }

    if (e.key === ' ') {
      togglePause();
    }
  });

  document.addEventListener('keyup', (e) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'].includes(e.key)) {
      keys[e.key] = false;
    }
  });

  gameButton.addEventListener('click', togglePause);

  restartButton.addEventListener('click', restartGame);

  startButton.addEventListener('click', startGame);
}

function spawnEnemy() {
  if (!gameRunning) return;

  const enemy = document.createElement('div');
  enemy.className = 'enemy';

  const side = Math.floor(Math.random() * 4);
  let x, y;

  switch (side) {
    case 0:
      x = Math.random() * window.innerWidth;
      y = -50;
      break;
    case 1:
      x = window.innerWidth;
      y = Math.random() * window.innerHeight;
      break;
    case 2:
      x = Math.random() * window.innerWidth;
      y = window.innerHeight;
      break;
    case 3:
      x = -50;
      y = Math.random() * window.innerHeight;
      break;
  }

  enemy.style.left = `${x}px`;
  enemy.style.top = `${y}px`;
  gameContainer.appendChild(enemy);

  const baseSpeed = 1 + level * 0.2;
  const speedVariation = 0.5;

  enemies.push({
    element: enemy,
    x,
    y,
    speedX: (Math.random() * speedVariation + baseSpeed) * (x > window.innerWidth / 2 ? -1 : 1),
    speedY: (Math.random() * speedVariation + baseSpeed) * (y > window.innerHeight / 2 ? -1 : 1),
  });

  setTimeout(() => {
    if (enemy.parentNode) {
      enemy.remove();
      enemies = enemies.filter((e) => e.element !== enemy);
    }
  }, 10000);
}

function spawnCoin() {
  if (!gameRunning) return;

  const coin = document.createElement('div');
  coin.className = 'coin';

  const x = Math.random() * (window.innerWidth - 35);
  const y = Math.random() * (window.innerHeight - 35);

  coin.style.left = `${x}px`;
  coin.style.top = `${y}px`;
  gameContainer.appendChild(coin);

  coins.push({
    element: coin,
    x,
    y,
  });

  setTimeout(() => {
    if (coin.parentNode) {
      coin.remove();
      coins = coins.filter((c) => c.element !== coin);
    }
  }, 10000);
}

function spawnPowerUp() {
  if (!gameRunning) return;

  if (Math.random() > 0.3) return;

  const powerUp = document.createElement('div');
  const type = Math.random() > 0.5 ? 'health-up' : 'shield';
  powerUp.className = `powerUp ${type}`;

  const x = Math.random() * (window.innerWidth - 40);
  const y = Math.random() * (window.innerHeight - 40);

  powerUp.style.left = `${x}px`;
  powerUp.style.top = `${y}px`;
  gameContainer.appendChild(powerUp);

  powerUps.push({
    element: powerUp,
    x,
    y,
    type: type,
  });

  setTimeout(() => {
    if (powerUp.parentNode) {
      powerUp.remove();
      powerUps = powerUps.filter((p) => p.element !== powerUp);
    }
  }, 8000);
}

function gameLoop() {
  if (!gameRunning) return;

  const playerRect = player.getBoundingClientRect();
  let newX = parseFloat(player.style.left) || 0;
  let newY = parseFloat(player.style.top) || 0;

  if (keys['ArrowUp'] || keys['w']) newY -= playerSpeed;
  if (keys['ArrowDown'] || keys['s']) newY += playerSpeed;
  if (keys['ArrowLeft'] || keys['a']) newX -= playerSpeed;
  if (keys['ArrowRight'] || keys['d']) newX += playerSpeed;

  newX = Math.max(0, Math.min(window.innerWidth - playerRect.width, newX));
  newY = Math.max(0, Math.min(window.innerHeight - playerRect.height, newY));

  player.style.left = `${newX}px`;
  player.style.top = `${newY}px`;

  enemies.forEach((enemy) => {
    enemy.x += enemy.speedX;
    enemy.y += enemy.speedY;

    enemy.element.style.left = `${enemy.x}px`;
    enemy.element.style.top = `${enemy.y}px`;

    if (checkCollision(player, enemy.element)) {
      takeDamage(40);
      createExplosion(enemy.x, enemy.y);
      enemy.element.remove();
      enemies = enemies.filter((e) => e.element !== enemy.element);
    }

    if (
      enemy.x < -100 ||
      enemy.x > window.innerWidth + 100 ||
      enemy.y < -100 ||
      enemy.y > window.innerHeight + 100
    ) {
      enemy.element.remove();
      enemies = enemies.filter((e) => e.element !== enemy.element);
    }
  });

  coins.forEach((coin) => {
    if (checkCollision(player, coin.element)) {
      collectCoin(coin.element);
      coins = coins.filter((c) => c.element !== coin.element);
    }
  });

  powerUps.forEach((powerUp) => {
    if (checkCollision(player, powerUp.element)) {
      collectPowerUp(powerUp);
      powerUps = powerUps.filter((p) => p.element !== powerUp.element);
    }
  });

  if (score >= lastLevelUpScore + 100) {
    levelUp();
    lastLevelUpScore = score;
  }

  requestAnimationFrame(gameLoop);
}

function checkCollision(element1, element2) {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();

  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}

function takeDamage(amount) {
  hitsTaken++;

  if (shield > 0) {
    shield -= amount;
    if (shield < 0) {
      health += shield;
      shield = 0;
    }
    shieldBar.style.width = `${shield}%`;
    shieldBarText.textContent = `${shield}%`;
  } else {
    health -= amount;
  }

  health = Math.max(0, health);
  healthBar.style.width = `${health}%`;

  healthBarText.textContent = `${health}%`;
  healthBar.classList.add('damage');

  player.style.animation = 'none';
  setTimeout(() => {
    player.style.animation = 'pulse 2s infinite ease-in-out, float 4s infinite ease-in-out';
    healthBar.classList.remove('damage');
  }, 300);

  if (hitsTaken >= 30 || health === 0) {
    health = 0;
    healthBar.style.width = '0%';
    gameOver();
  }
}

function collectPowerUp(powerUp) {
  const type = powerUp.type;
  powerUp.element.remove();

  if (type === 'health-up') {
    if (health === 100) {
      shield = Math.min(100, shield + 40);
      shieldBar.style.width = `${shield}%`;
      shieldBarText.textContent = `${shield}%`;
    } else {
      health = Math.min(100, health + 40);
      healthBar.style.width = `${health}%`;
      healthBarText.textContent = `${health}%`;
    }
  } else if (type === 'shield') {
    if (shield === 100) {
      health = Math.min(100, health + 50);
      healthBar.style.width = `${health}%`;
      healthBarText.textContent = `${health}%`;
    } else {
      shield = Math.min(100, shield + 50);
      shieldBar.style.width = `${shield}%`;
      shieldBarText.textContent = `${shield}%`;
    }
  }
}

function createExplosion(x, y) {
  const explosion = document.createElement('div');
  explosion.className = 'explosion';
  explosion.style.left = `${x}px`;
  explosion.style.top = `${y}px`;
  gameContainer.appendChild(explosion);

  setTimeout(() => {
    explosion.remove();
  }, 600);
}

function collectCoin(coin) {
  coin.remove();

  const points = Math.round(baseCoinValue);
  score += points;

  scoreDisplay.textContent = `SCORE: ${score}`;

  gameButton.classList.add('pressed');
  setTimeout(() => {
    gameButton.classList.remove('pressed');
  }, 300);
}

function levelUp() {
  level++;
  levelDisplay.textContent = `LEVEL: ${level}`;

  clearInterval(enemySpawnInterval);
  enemySpawnInterval = setInterval(spawnEnemy, Math.max(500, 1000 - level * 100));

  const levelUpEffect = document.createElement('div');
  levelUpEffect.style.position = 'absolute';
  levelUpEffect.style.top = '0';
  levelUpEffect.style.left = '0';
  levelUpEffect.style.width = '100%';
  levelUpEffect.style.height = ' 100%';
  levelUpEffect.style.backgroundColor = 'rgba(33, 150, 243, 0.3)';
  levelUpEffect.style.zIndex = '100';
  levelUpEffect.style.pointerEvents = 'none';
  levelUpEffect.style.animation = 'fadeOut 1s forwards';

  document.body.appendChild(levelUpEffect);

  setTimeout(() => {
    levelUpEffect.remove();
  }, 1000);
}

function togglePause() {
  gameRunning = !gameRunning;

  if (gameRunning) {
    gameButton.textContent = 'Pause';
    document.querySelectorAll('.parallax-layer').forEach((layer) => {
      layer.style.animationPlayState = 'running';
    });
    gameLoop();
  } else {
    gameButton.textContent = 'Resume';
    document.querySelectorAll('.parallax-layer').forEach((layer) => {
      layer.style.animationPlayState = 'paused';
    });
  }
}

function gameOver() {
  gameRunning = false;
  finalScoreDisplay.textContent = `SCORE: ${score}`;
  gameOverScreen.style.display = 'flex';

  clearInterval(enemySpawnInterval);
  clearInterval(coinSpawnInterval);
  clearInterval(powerUpSpawnInterval);
}

function startGame() {
  startScreen.style.display = 'none';

  score = 0;
  health = 100;
  shield = 50;
  level = 1;
  lastLevelUpScore = 0;
  gameRunning = true;

  scoreDisplay.textContent = `SCORE: ${score}`;
  levelDisplay.textContent = `LEVEL: ${level}`;
  healthBar.style.width = '100%';
  shieldBar.style.width = '50%';
  healthBarText.textContent = '100%';
  shieldBarText.textContent = '50%';
  gameOverScreen.style.display = 'none';
  gameButton.textContent = 'Pause';

  enemies.forEach((enemy) => enemy.element.remove());
  coins.forEach((coin) => coin.element.remove());
  powerUps.forEach((powerUp) => powerUp.element.remove());
  enemies = [];
  coins = [];
  powerUps = [];

  initPlayer();

  document.querySelectorAll('.parallax-layer').forEach((layer) => {
    layer.style.animationPlayState = 'running';
  });

  enemySpawnInterval = setInterval(spawnEnemy, 2000);
  coinSpawnInterval = setInterval(spawnCoin, 3000);
  powerUpSpawnInterval = setInterval(spawnPowerUp, 10000);

  gameLoop();
}

function restartGame() {
  gameOverScreen.style.display = 'none';
  startGame();
}

function updateYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('year');
    yearElement.dateTime = currentYear;
    yearElement.textContent = currentYear;
  }
  
  updateYear();

createStars();
initPlayer();
setupEventListeners();

startScreen.style.display = 'grid';
