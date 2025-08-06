'use strict';

const containerEl = document.querySelector('.container');
const btnPlayEl = document.querySelector('.btn_again');
const btnChckEl = document.querySelector('.btn_check');
let hideNumEl = document.querySelector('.hide_num');
const msgEl = document.querySelector('.message');
let inputNumEl = document.querySelector('.input_number');
const highScoreEl = document.querySelector('.high_score');
const scoreEl = document.querySelector('.score');

let secretNum = Math.trunc(Math.random() * 20 + 1);
let score = 20;
let high_score = 0;
console.log(secretNum);

btnChckEl.addEventListener('click', () => {
  const guess = inputNumEl.value;

  if (guess) {
    if (guess != secretNum) {
      if (score > 1) {
        score--;
        scoreEl.textContent = score;
        msgEl.textContent = guess > secretNum ? 'Too high!' : 'Too low!';
        scoreEl.textContent = score;
      } else {
        displayMessage("You've Loosed the Game :(");
        containerEl.style.background = 'red';
        scoreEl.textContent = 0;
      }
    } else {
      hideNumEl.textContent = secretNum;
      hideNumEl.style.width = '50%';
      hideNumEl.style.transition = 'all 0.5s ease-in';
      containerEl.style.background = '#e0d8d3';
      msgEl.style.background = 'rgb(51,204,69)';
      msgEl.style.padding = '5px 15px';
      if (score > high_score) {
        high_score = score;
        highScoreEl.textContent = high_score;
      }
      displayMessage("Congratulation You've Won the Game ☺");
    }
  } else {
    displayMessage('Please Enter the Number :(');
  }
});

const displayMessage = function (message) {
  msgEl.textContent = message;
};

btnPlayEl.addEventListener('click', () => {
  score = 20;
  scoreEl.textContent = 20;
  hideNumEl.textContent = '?';
  hideNumEl.style.width = '25%';
  hideNumEl.style.transition = 'all 0.5s ease-in';
  inputNumEl.value = '';
  containerEl.style.background = 'radial-gradient(ellipse at center, #ddd 60%, #888)';
  displayMessage('Start Guessing............yeah');
  msgEl.style.background = 'none';
});

function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');

  if (yearElement) {
    yearElement.setAttribute('datetime', currentYear.toString());
    yearElement.dateTime = currentYear;
    yearElement.textContent = currentYear.toString();
  }
}

window.addEventListener('load', updateYear);
