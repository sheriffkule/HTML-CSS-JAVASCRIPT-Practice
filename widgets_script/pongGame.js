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

window.onload = function () {
  board = document.getElementById('board');
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext('2d');

  context.fillStyle = player1.color;
  context.fillRect(player1.x, player1.y, player1.width, player1.height);
  context.strokeStyle = 'black';

  requestAnimationFrame(update);
  document.addEventListener('keyup', movePlayer);
};

function update() {
  requestAnimationFrame(update);
  context.clearRect(0, 0, boardWidth, boardHeight);

  context.fillStyle = player1.color;
//   player1.y += player1.velocityY;
let nextPlayer1Y = player1.y + player1.velocityY;

    if (!outOfBounds(nextPlayer1Y)) {
        player1.y = nextPlayer1Y;
    }
    
  context.fillRect(player1.x, player1.y, player1.width, player1.height);

  context.fillStyle = player2.color;
  player2.y += player2.velocityY;
  context.fillRect(player2.x, player2.y, player2.width, player2.height);
}

function outOfBounds(yPosition) {
    return (yPosition < 0 || yPosition + playerHeight > boardHeight);
}

function movePlayer(e) {
    if (e.code == 'KeyW' || e.code == 'ArrowUp') {
        player1.velocityY = -5;
    } else if (e.code == 'KeyS' || e.code == 'ArrowDown') {
        player1.velocityY = 5;
    }
}