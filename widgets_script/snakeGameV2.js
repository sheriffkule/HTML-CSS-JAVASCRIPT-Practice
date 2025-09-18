const menus = document.querySelectorAll('.menu');
const canvas = document.getElementById('gameCanvas');
const startBtn = document.querySelector('.start-btn');
const difficultyBtns = document.querySelectorAll('.difficulty-btn');
const finalScoreElement = document.getElementById('final-score');
const restartBtns = document.querySelectorAll('.restart-btn');
const resumeBtn = document.getElementById('resume-btn');
const pauseBtn = document.getElementById('pause-btn');
const exitBtn = document.querySelector('.exit-btn');

/** @type {HTMLCanvasElement} */
const ctx = canvas.getContext('2d');

function showMenu(menu) {
  hideAllMenus();
  menus[menu].classList.add('active');
}

function hideAllMenus() {
  menus.forEach((menu) => {
    menu.classList.remove('active');
  });
}

const GRID_SIZE = 50;
const GRID_COLOR = '#12183A';
const LINE_WIDTH = 5;
const SNAKE_OFFSET = 1;
const SNAKE_EYE_SIZE = 5;
const SNAKE_BODY_COLOR = '#00aaff';
const SNAKE_HEAD_COLOR = '#ff6600';
const SNAKE_EYE_COLOR = '#ffffff';
const FOOD_COLORS = ['#ff0000', '#00ff00', '#0000ff'];
const BORDER_RADIUS = GRID_SIZE / 3;
const SCORE_PER_FOOD = 10;
const BIG_FOOD_COUNT = 12;
const INITIAL_SNAKE_SPEED = 5;

let score;
let direction;
let food;
let snake;
let numberOfColumns;
let numberOfRows;
let updateInterval;
let timeInterval;
let turned;
let snakeSpeed;
let mode = 'hard';
let timePlayed = 0;
let gameRunning = false;
let foodSpawnedTimes = 0;

function initGame() {
  showMenu(0);
  ctx.lineWidth = LINE_WIDTH;
  numberOfColumns = Math.floor(window.innerWidth / GRID_SIZE);
  numberOfRows = Math.floor(window.innerHeight / GRID_SIZE);
  canvas.width = numberOfColumns * GRID_SIZE;
  canvas.height = numberOfRows * GRID_SIZE;

  snake = [
    { x: 2, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 0 },
  ];

  direction = 'right';
  score = 0;
  timePlayed = 0;
  food = generateFood();
  foodSpawnedTimes = 0;
  snakeSpeed = INITIAL_SNAKE_SPEED;
  drawGrid();
}

function generateFood() {
  let newFood;
  do {
    newFood = {
      x: Math.floor(Math.random() * numberOfColumns),
      y: Math.floor(Math.random() * numberOfRows),
      color: FOOD_COLORS[Math.floor(Math.random() * FOOD_COLORS.length)],
    };
  } while (isFoodOverlapsSnake(newFood));
  return newFood;
}

function drawGrid() {
  ctx.strokeStyle = GRID_COLOR;
  ctx.lineWidth = LINE_WIDTH;

  for (let x = 0; x < canvas.width; x += GRID_SIZE) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  for (let y = 0; y < canvas.height; y += GRID_SIZE) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    const x = snake[i].x * GRID_SIZE + LINE_WIDTH * SNAKE_OFFSET;
    const y = snake[i].y * GRID_SIZE + LINE_WIDTH * SNAKE_OFFSET;
    const size = GRID_SIZE - 2 * LINE_WIDTH - 2 * SNAKE_OFFSET;

    if (i === 0) {
      drawSquare(SNAKE_HEAD_COLOR, x, y, size, LINE_WIDTH, BORDER_RADIUS);
      drawEyes(x, y, size);
    } else {
      drawSquare(SNAKE_BODY_COLOR, x, y, size, LINE_WIDTH, BORDER_RADIUS);
    }
  }
}

function drawEyes(x, y, size) {
  ctx.fillStyle = SNAKE_EYE_COLOR;
  ctx.beginPath();
  ctx.arc(x + size / 4, y + size / 4, SNAKE_EYE_SIZE, 0, 2 * Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x + (3 * size) / 4, y + size / 4, SNAKE_EYE_SIZE, 0, 2 * Math.PI);
  ctx.fill();

  ctx.fillStyle = SNAKE_HEAD_COLOR;
  ctx.beginPath();
  ctx.arc(x + size / 4, y + size / 4, SNAKE_EYE_SIZE / 2, 0, 2 * Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x + (3 * size) / 4, y + size / 4, SNAKE_EYE_SIZE / 2, 0, 2 * Math.PI);
  ctx.fill();
}

function drawFood() {
  const x = food.x * GRID_SIZE + LINE_WIDTH + SNAKE_OFFSET;
  const y = food.y * GRID_SIZE + LINE_WIDTH + SNAKE_OFFSET;
  const size = GRID_SIZE - 2 * LINE_WIDTH - 2 * SNAKE_OFFSET;
  drawSquare(food.color, x, y, size, LINE_WIDTH, BORDER_RADIUS);
}

function drawSquare(color, x, y, size, LINE_WIDTH, BORDER_RADIUS) {
  ctx.lineWidth = LINE_WIDTH;
  ctx.strokeStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 20;

  ctx.beginPath();
  ctx.moveTo(x + BORDER_RADIUS, y);
  ctx.lineTo(x + size - BORDER_RADIUS, y);
  ctx.quadraticCurveTo(x + size, y, x + size, y + BORDER_RADIUS);
  ctx.lineTo(x + size, y + size - BORDER_RADIUS);
  ctx.quadraticCurveTo(x + size, y + size, x + size - BORDER_RADIUS, y + size);
  ctx.lineTo(x + BORDER_RADIUS, y + size);
  ctx.quadraticCurveTo(x, y + size, x, y + size - BORDER_RADIUS);
  ctx.lineTo(x, y + BORDER_RADIUS);
  ctx.quadraticCurveTo(x, y, x + BORDER_RADIUS, y);
  ctx.closePath();
  ctx.stroke();

  ctx.lineWidth = 2;
  ctx.strokeStyle = '#ffffff';

  ctx.beginPath();
  ctx.moveTo(x + BORDER_RADIUS, y);
  ctx.lineTo(x + size - BORDER_RADIUS, y);
  ctx.quadraticCurveTo(x + size, y, x + size, y + BORDER_RADIUS);
  ctx.lineTo(x + size, y + size - BORDER_RADIUS);
  ctx.quadraticCurveTo(x + size, y + size, x + size - BORDER_RADIUS, y + size);
  ctx.lineTo(x + BORDER_RADIUS, y + size);
  ctx.quadraticCurveTo(x, y + size, x, y + size - BORDER_RADIUS);
  ctx.lineTo(x, y + BORDER_RADIUS);
  ctx.quadraticCurveTo(x, y, x + BORDER_RADIUS, y);
  ctx.closePath();
  ctx.stroke();

  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
}

function drawScore() {
  const time =
    Math.floor(timePlayed / 60) + ':' + (timePlayed % 60 < 10 ? '0' + (timePlayed % 60) : timePlayed % 60);
  ctx.fillStyle = '#fff';
  ctx.font = '20px Varela Round';
  ctx.fillText(`Score: ${score}`, 10, 30);
  ctx.fillText(`Difficulty: ${mode[0].toUpperCase() + mode.slice(1)}`, 10, 60);
  ctx.fillText(`Time: ${time}`, 10, 90);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  snake.pop();

  const headX = snake[0].x;
  const headY = snake[0].y;

  if (direction === 'right') {
    snake.unshift({ x: headX + 1, y: headY });
  } else if (direction === 'left') {
    snake.unshift({ x: headX - 1, y: headY });
  } else if (direction === 'up') {
    snake.unshift({ x: headX, y: headY - 1 });
  } else if (direction === 'down') {
    snake.unshift({ x: headX, y: headY + 1 });
  }

  if (mode === 'hard') {
    if (isSnakeCollidingWithWall() || isSnakeCollidingWithItself()) {
      stop();
    }
  } else if (mode === 'medium') {
    if (isSnakeCollidingWithItself()) {
      stop();
    }
  }

  snake[0].x = (snake[0].x + numberOfColumns) % numberOfColumns;
  snake[0].y = (snake[0].y + numberOfRows) % numberOfRows;

  drawGrid();
  drawSnake();
  drawFood();
  foodEaten();
  drawScore();
}

function updateFoodPosition() {
  food = generateFood();
}

function isSnakeCollidingWithItself() {
  for (let i = 1; i < snake.length; i++) {
    if (isOverlap(snake[0], snake[i])) {
      return true;
    }
  }
  return false;
}

function isSnakeCollidingWithWall() {
  const headX = snake[0].x;
  const headY = snake[0].y;

  if (headX < 0 || headX >= numberOfColumns || headY < 0 || headY >= numberOfRows) {
    return true;
  }
  return false;
}

function isFoodOverlapsSnake(food) {
  return snake.some((segment) => isOverlap(segment, food));
}

function isOverlap(point1, point2) {
  return point1.x === point2.x && point1.y === point2.y;
}

function foodEaten() {
  if (isFoodOverlapsSnake(food)) {
    updateFoodPosition();
    foodSpawnedTimes++;

    if (foodSpawnedTimes % BIG_FOOD_COUNT === 0) {
      foodSpawnedTimes = 0;
      score += SCORE_PER_FOOD * BIG_FOOD_COUNT;
      changeSpeed(snakeSpeed + 1);
    } else {
      score += SCORE_PER_FOOD;
    }

    snake.push({
      x: snake[snake.length - 1].x,
      y: snake[snake.length - 1].y,
    });
  }
}

function changeMode(newMode) {
  mode = newMode;
}

function changeSpeed(newSpeed) {
  snakeSpeed = newSpeed;
  clearInterval(updateInterval);
  updateInterval = setInterval(update, 1000 / snakeSpeed);
}

function startGame() {
  gameRunning = true;
  updateInterval = setInterval(update, 1000 / snakeSpeed);
  timeInterval = setInterval(() => {
    timePlayed++;
  }, 1000);
  pauseBtn.classList.add('active');
}

function stop() {
  clearInterval(updateInterval);
  clearInterval(timeInterval);
  gameRunning = false;
  showMenu(2);
  finalScoreElement.innerHTML = score;
  pauseBtn.classList.remove('active');
}

function pauseGame() {
  clearInterval(updateInterval);
  clearInterval(timeInterval);
  gameRunning = false;
  showMenu(3);
  pauseBtn.classList.remove('active');
}

function resumeGame() {
  startGame();
  hideAllMenus();
}

startBtn.addEventListener('click', () => {
  showMenu(1);
});

difficultyBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    changeMode(btn.id);
    hideAllMenus();
    startGame();
  });
});

restartBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    initGame();
  });
});

resumeBtn.addEventListener('click', resumeGame);

pauseBtn.addEventListener('click', pauseGame);

exitBtn.addEventListener('click', () => {
  showMenu(0);
  initGame()
});

function handleArrowKeyPress(event) {
  switch (event.key) {
    case 'ArrowRight':
      if (direction !== 'left') {
        direction = 'right';
      }
      break;
    case 'ArrowLeft':
      if (direction !== 'right') {
        direction = 'left';
      }
      break;
    case 'ArrowUp':
      if (direction !== 'down') {
        direction = 'up';
      }
      break;
    case 'ArrowDown':
      if (direction !== 'up') {
        direction = 'down';
      }
      break;
  }
}

document.addEventListener('keydown', handleArrowKeyPress);

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden' && gameRunning) {
    pauseGame();
  }
});

initGame();

window.addEventListener('resize', () => {
  const oldSnake = [...snake];
  const oldDirection = direction;
  const oldScore = score;
  const oldMode = mode;
  const oldSnakeSpeed = snakeSpeed;
  const oldTimePlayed = timePlayed;
  const oldFoodSpawnedTimes = foodSpawnedTimes;

  initGame();

  if (gameRunning) {
    snake = oldSnake;
    direction = oldDirection;
    score = oldScore;
    mode = oldMode;
    snakeSpeed = oldSnakeSpeed;
    timePlayed = oldTimePlayed;
    foodSpawnedTimes = oldFoodSpawnedTimes;
    drawGrid();
    drawSnake();
    drawFood();
    drawScore();
  }
});

document.getElementById('year').textContent = new Date().getFullYear();
