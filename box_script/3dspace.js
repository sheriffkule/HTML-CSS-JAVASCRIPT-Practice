function createStars() {
  const galaxy = document.getElementById('galaxy');
  const starCount = Math.floor((window.innerWidth * window.innerHeight) / 500);

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    const size = Math.random() * 3 + 0.5;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const duration = Math.random() * 10 + 5;
    const delay = Math.random() * 5;
    const opacity = Math.random() * 0.8 + 0.2;

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${posX}%`;
    star.style.top = `${posY}%`;
    star.style.opacity = opacity;
    star.style.setProperty('--duration', `${duration}`);
    star.style.setProperty('--opacity', `${opacity}`);
    star.style.animationDelay = `${delay}`;

    galaxy.appendChild(star);
  }

  for (let i = 0; i < 15; i++) {
    const shooter = document.createElement('div');
    shooter.classList.add('shooting-star');

    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 15;
    const length = Math.random() * 100 + 50;
    const width = Math.random() * 2 + 1;

    shooter.style.width = `${length}px`;
    shooter.style.height = `${width}px`;
    shooter.style.left = `${posX}%`;
    shooter.style.top = `${posY}%`;
    shooter.style.setProperty('--shooter-duration', `${duration}`);
    shooter.style.animationDelay = `${delay}`;

    galaxy.appendChild(shooter);
  }
}

function addParallax() {
  document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    document.getElementById('galaxy').style.transform = `translate(${x * 20 - 10}px, ${y * 20 - 10}px)`;
  });
}

window.addEventListener('load', () => {
  createStars();
  addParallax();
  setupPlanetClickEvent();
  setCurrentYear();
});

window.addEventListener('resize', () => {
  document.getElementById('galaxy').innerHTML = '';
  createStars();
});
