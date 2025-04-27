let score = 0;
let health = 100;
let shield = 0;
let level = 1;
let gameRunning = false;
let playerSpeed = 6;
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
const shieldBar = document.getElementById('shield-bar');
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

createStars();