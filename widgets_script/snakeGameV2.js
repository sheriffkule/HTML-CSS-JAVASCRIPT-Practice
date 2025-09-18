const menus = document.querySelectorAll('.menu');
const canvas = document.getElementById('gameCanvas');
const startBtn = document.querySelector('.start-btn');
const difficultyBtns = document.querySelectorAll('.difficulty-btn');
const finalScoreElement = document.getElementById('final-score');
const restartBtns = document.querySelectorAll('.restart-btn');
const resumeBtn = document.getElementById('resume-btn');

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
const SNAKE_HEAD_COLOR = '#006600';
const SNAKE_EYE_COLOR = '#ffffff';
const FOOD_COLORS = ['#ff000', '#00ff00', '#0000ff'];
const BORDER_SIZE = GRID_SIZE / 3;
const SCORE_PER_FOOD = 10;
const BIG_FOOD_COUNT = 6;
const INITIAL_SNAKE_SPEED = 6;

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
let mode = 'easy';
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

  (direction = 'right'), (score = 0);
  timePlayed = 0;
  //   food = generateFood();
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
  {
  }
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

initGame();
