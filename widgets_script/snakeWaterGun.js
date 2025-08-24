let container = document.querySelector('.container');
let myScoreTxt = document.querySelector('.my_score');
let computerScoreTxt = document.querySelector('.computer_score');
let drawMatch = document.querySelector('.draw_match');
let choicesBox = document.querySelector('.choices');
let myChoiceTxt = document.querySelector('.your_choice');
let computerChoiceTxt = document.querySelector('.computer_choice');
let matchResult = document.querySelector('.match-result');

let computer_score = 0;
let my_score = 0;
let draw_match = 0;

let check = (input) => {
  let choices_object = {
    Snake: {
      Snake: 'draw',
      Water: 'win',
      Gun: 'lose',
    },
    Water: {
      Snake: 'lose',
      Water: 'draw',
      Gun: 'win',
    },
    Gun: {
      Snake: 'win',
      Water: 'lose',
      Gun: 'draw',
    },
  };

  let choices = ['Snake', 'Water', 'Gun'];
  let randomChoice = Math.floor(Math.random() * choices.length);

  computerChoiceTxt.innerHTML = `Computer Choose: <strong>${choices[randomChoice]}</strong>`;
  myChoiceTxt.innerHTML = `You Choose: <strong>${input}</strong>`;

  let computer_choice = choices[randomChoice];

  switch (choices_object[input][computer_choice]) {
    case 'win':
      matchResult.innerText = 'YOU WIN!';
      matchResult.style.cssText = 'background: #32cd32';
      my_score++;
      break;
    case 'lose':
      matchResult.innerText = 'YOU LOSE!';
      matchResult.style.cssText = 'background: red';
      computer_score++;
      break;
    default:
      matchResult.innerText = 'MATCH DRAW!';
      matchResult.style.cssText = 'background: grey';
      draw_match++;
      break;
  }

  myScoreTxt.innerHTML = `You: <strong>${my_score}</strong>`;
  computerScoreTxt.innerHTML = `Computer: <strong>${computer_score}</strong>`;
  drawMatch.innerHTML = `Draw: <strong>${draw_match}</strong>`;
  container.style.height = '340px';
  choicesBox.style.display = 'block';
};

const switchButton = document.getElementById('switch');

window.addEventListener('DOMContentLoaded', () => {
  const mode = localStorage.getItem('mode');
  if (mode === 'dark') {
    document.body.classList.add('dark');
    switchButton.checked = true;
  } else {
    document.body.classList.remove('dark');
    switchButton.checked = false;
  }
});

switchButton.addEventListener('change', (e) => {
  const body = document.body;
  if (e.target.checked) {
    body.classList.add('dark');
    localStorage.setItem('mode', 'dark');
  } else {
    body.classList.remove('dark');
    localStorage.setItem('mode', 'light');
  }
});

document.getElementById('year').innerText = new Date().getFullYear();
