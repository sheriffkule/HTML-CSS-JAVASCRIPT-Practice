let startGameBtn = document.querySelector('.start-game-btn');
let container = document.querySelector('.container');
let allItems = document.querySelectorAll('.all-items .item');
let scoreText = document.querySelector('.score span');

let score = 0;

container.addEventListener('click', (e) => {
  if (e.target.classList.contains('mole-clicked')) {
    score++;
    scoreText.textContent = score;
  }
});

let startGame = () => {
  setInterval(() => {
    showMole();
  }, 1000);
  startGameBtn.style.display = 'none';
  container.style.height = '530px';
};

let showMole = () => {
  let randomIndex = Math.floor(Math.random() * allItems.length);
  let moleAppeared = allItems[randomIndex].querySelector('.hole img');
  moleAppeared.classList.add('mole-appeared');
  hideMole(moleAppeared);
};

let hideMole = (moleItem) => {
  setTimeout(() => {
    moleItem.classList.remove('mole-appeared');
  }, 800);
};

startGameBtn.addEventListener('click', startGame);
