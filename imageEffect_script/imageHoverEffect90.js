const animateBtn = document.getElementById('animateBtn');
const pixelBox = document.getElementById('pixel')
let w = 40;
let h = 40;

let isAnimating = false;

function createPixels() {
  pixelBox.innerHTML = '';

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      let span = document.createElement('span');
      let random = Math.random();
      let randomFixed = random.toFixed(2);

      pixelBox.appendChild(span);
      span.style.left = j * 10 + 'px';
      span.style.top = i * 10 + 'px';
      span.style.backgroundPosition = -j * 10 + 'px ' + -i * 10 + 'px, center';
      span.style.animationDelay = randomFixed + 's';
      span.classList.add('pixel-cell');
    }
  }
}

function startAnimation() {
  if (isAnimating) return;
  createPixels();
  isAnimating = true;
  animateBtn.textContent = 'Stop Animation';
}

function stopAnimation() {
  if (!isAnimating) return;
  pixelBox.innerHTML = '';
  isAnimating = false;
  animateBtn.textContent = 'Start Animation';
}

animateBtn.addEventListener('click', () => {
  if (isAnimating) stopAnimation();
  else startAnimation();
});

stopAnimation();