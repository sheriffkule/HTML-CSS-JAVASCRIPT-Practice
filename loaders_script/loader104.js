let i = 0;
const number = document.querySelector('.number');
const percentBar = document.querySelector('.percentBar');
const loader = document.querySelector('.loader');

let interval = setInterval(function () {
  number.innerHTML = i + '<span> %</span>';
  percentBar.style.width = i + '%';
  i++;
  if (i == 101) {
    clearInterval(interval);
    setTimeout(function () {
      loader.style.opacity = '0';
      loader.style.visibility = 'hidden';
      loader.style.transition = '0.4s ease-Out';
    }, 500);
  }
}, 50);
