let board;
let boardWidth = 600;
let boardHeight = 600;
let context;

let playerWidth = 10;
let playerHeight = 80;
let playerVelocityY = 0;

let player1 = {
  x: 10,
  y: boardHeight / 2 - 30,
  width: playerWidth,
  height: playerHeight,
  color: 'orangered',
  velocityY: playerVelocityY,
};

let player2 = {
  x: boardWidth - playerWidth - 10,
  y: boardHeight / 2 - 30,
  width: playerWidth,
  height: playerHeight,
  color: 'orangered',
  velocityY: playerVelocityY,
};

let ballWidth = 10;
let ballHeight = 10;
let ball = {
  x: boardWidth / 2,
  y: boardHeight / 2,
  width: ballWidth,
  height: ballHeight,
  velocityX: 2,
  velocityY: 3,
  radius: 50,
};

let player1Score = 0;
let player2Score = 0;

let isPaused = false;

window.onload = function () {
  board = document.getElementById('board');
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext('2d');

  context.fillStyle = player1.color;
  context.fillRect(player1.x, player1.y, player1.width, player1.height);
  context.strokeStyle = 'black';

  requestAnimationFrame(update);

  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);

  document.addEventListener('keydown', function (e) {
    if (e.code === 'Space') {
      isPaused = !isPaused;
    }
  });
};

function update() {
  requestAnimationFrame(update);

  if (isPaused) {
    context.clearRect(0, 0, boardWidth, boardHeight);
    context.font = '2rem sans-serif';
    context.fillStyle = 'skyblue';
    context.textAlign = 'center';
    context.fillText('Paused', boardWidth / 2, boardHeight / 2);
    context.textAlign = 'start'; 
    return;
  }
  context.clearRect(0, 0, boardWidth, boardHeight);

  context.fillStyle = player1.color;
  let nextPlayer1Y = player1.y + player1.velocityY;

  if (!outOfBounds(nextPlayer1Y)) {
    player1.y = nextPlayer1Y;
  }

  context.fillRect(player1.x, player1.y, player1.width, player1.height);

  context.fillStyle = player2.color;
  let nextPlayer2Y = player2.y + player2.velocityY;

  if (!outOfBounds(nextPlayer2Y)) {
    player2.y = nextPlayer2Y;
  }

  context.fillRect(player2.x, player2.y, player2.width, player2.height);

  context.fillStyle = '#0f0';
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;
  context.beginPath();
  context.arc(ball.x, ball.y, ball.width / 2, 0, 2 * Math.PI);
  context.fill();

  if (ball.y <= 0 || ball.y + ball.height >= boardHeight) {
    ball.velocityY *= -1;
  }

  if (detectCollision(ball, player1)) {
    if (ball.x <= player1.x + player1.width) {
      ball.velocityX *= -1;
    }
  } else if (detectCollision(ball, player2)) {
    if (ball.x + ballWidth >= player2.x) {
      ball.velocityX *= -1;
    }
  }

  if (ball.x < 0) {
    player2Score++;
    resetGame(1);
  } else if (ball.x + ballWidth > boardWidth) {
    player1Score++;
    resetGame(-1);
  }

  context.fillStyle = 'white';
  context.font = '45px sans-serif';
  context.fillText(player1Score, boardWidth / 5, 45);
  context.fillText(player2Score, boardWidth - (boardWidth * 1) / 5 - 45, 45);

  for (let i = 2; i < board.height; i += 10) {
    context.fillRect(board.width / 2 - 10, i, 5, 5);
  }
}

function outOfBounds(yPosition) {
  return yPosition < 0 || yPosition + playerHeight > boardHeight;
}

function handleKeyDown(e) {
  if (e.code == 'ArrowUp') {
    player2.velocityY = -5;
  } else if (e.code == 'ArrowDown') {
    player2.velocityY = 5;
  }

  if (e.code == 'KeyW') {
    player1.velocityY = -5;
  } else if (e.code == 'KeyS') {
    player1.velocityY = 5;
  }
}

function handleKeyUp(e) {
  if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
    player2.velocityY = 0;
  }
  if (e.code === 'KeyW' || e.code === 'KeyS') {
    player1.velocityY = 0;
  }
}

function detectCollision(a, b) {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}

function resetGame(direction) {
  ball = {
    x: boardWidth / 2,
    y: boardHeight / 2,
    width: ballWidth,
    height: ballHeight,
    velocityX: direction,
    velocityY: 2.25,
    radius: 50,
  };
}

function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');

  if (!yearElement) {
    console.error('Year element not found');
    return;
  }

  if (yearElement) {
    yearElement.setAttribute('datetime', currentYear.toString());
    yearElement.dateTime = currentYear;
    yearElement.textContent = currentYear.toString();
  }
}

window.addEventListener('load', updateYear);
