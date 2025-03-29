const buttons = document.querySelectorAll('.pixel-btn');

const PIXEL_SIZE = 10;

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function createPixelElement(container, x, y) {
  const pixel = document.createElement('div');
  pixel.classList.add('pixel');
  pixel.style.left = `${x}px`;
  pixel.style.top = `${y}px`;

  const delay = getRandomNumber(0, 0.5);
  pixel.style.transitionDelay = `${delay}s`;
  const tx = getRandomNumber(-80, 80);
  const ty = getRandomNumber(-80, 80);
  pixel.style.setProperty('--tx', `${tx}px`);
  pixel.style.setProperty('--ty', `${ty}px`);

  container.appendChild(pixel);
}

buttons.forEach((button) => {
  const pixelContainer = button.querySelector('.pixel-container');

  const cols = Math.floor(button.offsetWidth / PIXEL_SIZE);
  const rows = Math.floor(button.offsetHeight / PIXEL_SIZE);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      createPixelElement(pixelContainer, col * PIXEL_SIZE, row * PIXEL_SIZE);
    }
  }
});