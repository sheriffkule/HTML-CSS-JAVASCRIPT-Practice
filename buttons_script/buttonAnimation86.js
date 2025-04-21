const btnContainer = document.querySelector('.btn-container');
const button = document.querySelector('.glow-btn');
let interval;
let spawnDistance = 50;

function createParticles() {
  const particles = document.createElement('div');
  particles.classList.add('particles');
  let btnWidth = button.offsetWidth;
  let btnHeight = button.offsetHeight;

  let angle = Math.random() * 2 * Math.PI;
  let x = btnWidth / 2 + Math.cos(angle) * spawnDistance;
  let y = btnHeight / 2 + Math.sin(angle) * spawnDistance;

  let dx = Math.cos(angle) * 150;
  let dy = Math.sin(angle) * 150;

  particles.style.left = `${x}px`;
  particles.style.top = `${y}px`;
  particles.style.setProperty('--dx', `${dx}px`);
  particles.style.setProperty('--dy', `${dy}px`);

  btnContainer.appendChild(particles);
  setTimeout(() => {
    particles.remove();
  }, 2000);
}

button.addEventListener('mouseenter', () => {
  interval = setInterval(createParticles, 50);
});

button.addEventListener('mouseleave', () => {
  clearInterval(interval);
});
