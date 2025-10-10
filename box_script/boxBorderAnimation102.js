for (let i = 0; i < 60; i++) {
  let box = document.createElement('div');
  box.classList.add('box');
  document.querySelector('.container').appendChild(box);
}

let randomColorBlock = document.querySelectorAll('.box');

function addColor() {
  randomColorBlock.forEach((e) => {
    e.style.background = randomColor();
  });
}

function randomColor() {
  let chars = '1234567890abcdef';
  let colorLength = 6;
  let color = '';

  for (let i = 1; i <= colorLength; i++) {
    let randomColors = Math.floor(Math.random() * chars.length);
    color += chars.substring(randomColors, randomColors + 1);
  }

  return '#' + color;
}

addColor();

let boxes = document.querySelectorAll('.box');

function scrollTrigger() {
  boxes.forEach((box) => {
    if (box.offsetTop < window.scrollY) {
      box.classList.add('active');
    } else {
      box.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', scrollTrigger);
