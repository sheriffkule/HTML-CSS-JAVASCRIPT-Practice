let cells = document.querySelectorAll('.cell');
let turnIndicator = document.querySelector('.turn_indicator');
let preContainer = document.querySelector('.pre-container');
let resultBox = document.querySelector('.result-box');
let winnerMsg = document.querySelector('.winner-msg');
let changeTurn = false;

cells.forEach((cell) => {
  cell.addEventListener('click', () => {
    if (changeTurn == false) {
      cell.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
      cell.style.pointerEvents = 'none';
      turnIndicator.style.marginLeft = '150px';
      cell.id = 'X';
      changeTurn = true;
    } else {
      cell.innerHTML = `<i class="fa-solid fa-o"></i>`;
      cell.style.pointerEvents = 'none';
      turnIndicator.style.marginLeft = '0px';
      cell.id = 'O';
      changeTurn = false;
    }
    winning();
    Draw();
  });
});

let winCombo = [
  [0, 3, 6],
  [6, 7, 8],
  [3, 4, 5],
  [0, 1, 2],
  [2, 5, 8],
  [1, 4, 7],
  [2, 4, 6],
  [0, 4, 8],
];

let winning = () => {
  for (let a = 0; a <= 7; a++) {
    let b = winCombo[a];
    if (cells[b[0]].id == '' || cells[b[1]].id == '') {
      continue;
    } else if (cells[b[0]].id == 'X' && cells[b[1]].id == 'X' && cells[b[2]].id == 'X') {
      resultBox.style.display = 'block';
      preContainer.style.display = 'none';
      winnerMsg.innerHTML = `Player X Won <i class="fa-solid fa-check-double"></i>`;
    } else if (cells[b[0]].id == 'O' && cells[b[1]].id == 'O' && cells[b[2]].id == 'O') {
      resultBox.style.display = 'block';
      preContainer.style.display = 'none';
      winnerMsg.innerHTML = `Player O Won <i class="fa-solid fa-check-double"></i>`;
    } else {
      continue;
    }
  }
};

let Draw = () => {
  if (
    cells[0].id != '' &&
    cells[1].id != '' &&
    cells[2].id != '' &&
    cells[3].id != '' &&
    cells[4].id != '' &&
    cells[5].id != '' &&
    cells[6].id != '' &&
    cells[7].id != '' &&
    cells[8].id != ''
  ) {
    resultBox.style.display = 'block';
    preContainer.style.display = 'none';
    winnerMsg.innerHTML = `Match Draw! <i class="fa-regular fa-face-meh"></i>`;
  }
};

document.getElementById('year').textContent = new Date().getFullYear()