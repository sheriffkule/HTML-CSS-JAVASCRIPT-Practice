document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.game_grid');
  const restartBtn = document.getElementById('restart_btn');
  const moveCounter = document.getElementById('move_counter');
  const timer = document.getElementById('timer');

  const symbols = ['❤', '☀', '♫', '♜', '❄', '☯', '★', '☂'];
  let cards = [...symbols, ...symbols];
  let flippedCards = [];
  let moves = 0;
  let time = 0;
  let timerInterval;

  function shuffleCards() {
    cards.sort(() => Math.random() - 0.5);
  }

  function createBoard() {
    grid.innerHTML = '';
    shuffleCards();
    cards.forEach((symbol) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.symbol = symbol;
      card.innerHTML = '?';
      card.addEventListener('click', flipCard);
        grid.appendChild(card);
    });
  }

  function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
      this.classList.add('flipped');
      this.innerHTML = this.dataset.symbol;
      flippedCards.push(this);

      if (flippedCards.length === 2) {
        setTimeout(checkMatch(), 500);
      }
    }
  }

  function checkMatch() {
    moves++;
    moveCounter.textContent = moves;
    if (flippedCards[0].dataset.symbol === flippedCards[1].dataset.symbol) {
      matchedPairs++;
      flippedCards = [];
      if (matchedPairs === symbols.length) {
        clearInterval(timerInterval);
        setTimeout(() => alert(`After ${moves} moves You won! Yeeheey ✅✅✅`), 500);
      }
    } else {
      flippedCards.forEach((card) => {
        setTimeout(() => {
          card.classList.remove('flipped');
          card.innerHTML = '?';
        }, 500);
      });
      flippedCards = [];
    }
  }

  function startGame() {
    document.querySelectorAll('.card').forEach((card) => {
      card.classList.add('flipped');
      card.style.pointerEvents = 'none';
    });
    setTimeout(() => {
      document.querySelectorAll('.card').forEach((card) => {
        card.classList.remove('flipped');
        card.innerHTML = '?';
      });
      setTimeout(() => {
        moves = 0;
        moveCounter.textContent = moves;
        matchedPairs = 0;
        time = 0;
        timer.textContent = '00 : 00';
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
          time++;
          let minutes = String(Math.floor(time / 60)).padStart(2, '0');
          let seconds = String(time % 60).padStart(2, '0');
          timer.textContent = `${minutes} : ${seconds}`;
        }, 1000);
        createBoard();

        setTimeout(() => {
          document.querySelectorAll('.card').forEach((card) => {
            card.style.pointerEvents = 'auto';
          });
        }, 500);
      }, 500);
    }, 1000);
  }
  restartBtn.addEventListener('click', startGame);
  startGame();
});

document.getElementById('year').textContent = new Date().getFullYear();