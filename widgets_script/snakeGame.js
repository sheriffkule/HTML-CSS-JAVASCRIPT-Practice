const playBoard = document.querySelector('.play-board');
const scoreElement = document.querySelector('.score');
const highScoreElement = document.querySelector('.high-score');
const controls = document.querySelectorAll('.controls i');
const skinContainer = document.getElementById('skin-container');
const foodColorContainer = document.getElementById('food-color-container');

let gameOver = false;
let foodX = 18;
let foodY = 18;
let snakeX = 5;
let snakeY = 10;
let velocityX = 0;
let snakeBody = [];
let velocityY = 0;
let setIntervalId;
let score = 0;
let head = '#60cbff';
let foodColor = 'red';

let highScore = localStorage.getItem('high-score') || 0;
highScoreElement.innerText = `High Score: ${highScore * 10}`;

const changeFoodPosition = () => {
  foodX = Math.floor(Math.random() * 29) + 1;
  foodY = Math.floor(Math.random() * 29) + 1;
};

const handleGameOver = () => {
  clearInterval(setIntervalId);
  alert(`Game Over! Your score is ${score * 10}. Press OK to restart...`);
  location.reload();
};

const changeDirection = (e) => {
  switch (e.key) {
    case 'ArrowUp':
      if (velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
      }
      break;
    case 'ArrowDown':
      if (velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
      }
      break;
    case 'ArrowLeft':
      if (velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
      }
      break;
    case 'ArrowRight':
      if (velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
      }
      break;
    default:
      break;
  }
};

controls.forEach((key) => {
  key.addEventListener('click', () => changeDirection({ key: key.dataset.key }));
});

const initGame = () => {
  if (gameOver) return handleGameOver();
  let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}; background-color: ${foodColor};"></div>`;

  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
    snakeBody.push([foodX, foodY]);
    score++;

    highScore = score >= highScore ? score : highScore;
    localStorage.setItem('high-score', highScore);
    scoreElement.innerText = `Score: ${score * 10}`;
    highScoreElement.innerText = `High Score: ${highScore * 10}`;
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  snakeBody[0] = [snakeX, snakeY];

  snakeX += velocityX;
  snakeY += velocityY;

  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    gameOver = true;
  }

  for (let i = 0; i < snakeBody.length; i++) {
    htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
      gameOver = true;
    }
  }
  playBoard.innerHTML = htmlMarkup;
};

changeFoodPosition();
setIntervalId = setInterval(initGame, 180);

document.addEventListener('keydown', changeDirection);

const pauseElement = document.createElement('div');
pauseElement.classList.toggle('paused');
pauseElement.textContent = 'PAUSED';

document.body.appendChild(pauseElement);

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
  changeDirection(e);
  if (e.key === ' ') {
    if (setIntervalId) {
      clearInterval(setIntervalId);
      setIntervalId = null;
      pauseElement.style.display = 'block';
    } else {
      setIntervalId = setInterval(initGame, 180);
      pauseElement.style.display = 'none';
    }
  }
});

const snakeSkins = [
  { name: 'Default', color: '#60cbff' },
  { name: 'Green', color: 'rgb(38,217,59)' },
  { name: 'Pink', color: 'rgb(242,13,175)' },
  { name: 'Blue', color: 'rgb(0,30,255)' },
  { name: 'Yellow', color: 'rgb(242,255,0)' },
  { name: 'Silver', color: 'silver' },
  { name: 'White', color: 'white' },
  { name: 'Black', color: 'black' },
  { name: 'Transparent', color: 'transparent' },
];

function createSkinButton(skin) {
  const button = document.createElement('button');
  button.classList.add('btn');
  button.setAttribute('data-ripple', ' ');
  const buttonSpan = document.createElement('span');
  buttonSpan.textContent = skin.name;
  button.appendChild(buttonSpan);
  button.style.backgroundColor = skin.color;
  button.addEventListener('click', () => {
    updateHeadElements(skin.color);
  });
  return button;
}

function updateHeadElements(color) {
  const headElements = document.querySelectorAll('.head');
  headElements.forEach((head) => {
    head.style.backgroundColor = color;
  });

  requestAnimationFrame(() => {
    updateHeadElements(color);
  });
}

snakeSkins.forEach((skin) => {
  const button = createSkinButton(skin);
  skinContainer.appendChild(button);
});

const foodColors = [
  { name: 'Default', color: foodColor },
  { name: 'Green', color: 'rgb(38,217,59)' },
  { name: 'Pink', color: 'rgb(242,13,175)' },
  { name: 'Blue', color: 'rgb(0,30,255)' },
  { name: 'Yellow', color: 'rgb(242,255,0)' },
  { name: 'Silver', color: 'silver' },
  { name: 'White', color: 'white' },
  { name: 'Black', color: 'black' },
  { name: 'Orange', color: 'orange' },
];

function updateFoodColor(color) {
  const foodElement = document.querySelector('.food');
  if (foodElement) {
    foodElement.style.backgroundColor = color;
  } else {
    console.error('Food element not found.');
  }

  foodColor = color;
}


function createFoodColorButton(color) {
  const button = document.createElement('button');
  button.classList.add('btn');
  button.setAttribute('data-ripple', ' ');
  const buttonSpan = document.createElement('span');
  buttonSpan.textContent = color.name;
  button.appendChild(buttonSpan);
  button.style.backgroundColor = color.color;
  button.addEventListener('click', () => {
    updateFoodColor(color.color);
  });
  return button;
}

foodColors.forEach((color) => {
  const button = createFoodColorButton(color);
  foodColorContainer.appendChild(button);
});

document.body.addEventListener('mousemove', function (e) {
  if (e.target.matches('.btn[data-ripple]')) {
    const btn = e.target;
    const x = e.pageX - btn.offsetLeft;
    const y = e.pageY - btn.offsetTop;

    btn.style.setProperty('--x', x + 'px');
    btn.style.setProperty('--y', y + 'px');
  }
});

const skinTitles = document.querySelectorAll('.skin_title');

skinTitles.forEach((title) => {
  title.addEventListener('click', () => {
    const skinContainer = title.nextElementSibling;
    const icon = title.querySelector('i');
    skinContainer.classList.toggle('visible');
    icon.classList.toggle('rotate-180');
    skinContainer.classList.contains('visible')
      ? (title.style.color = '#4169e1')
      : (title.style.color = '#b8c6dc');
  });
});

function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');
  yearElement.dateTime = currentYear;
  yearElement.textContent = currentYear;
}

updateYear();