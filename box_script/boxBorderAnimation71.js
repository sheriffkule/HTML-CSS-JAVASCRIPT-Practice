const cards = document.querySelectorAll('.card');

cards.forEach((card) => {
  card.addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON') {
      e.stopPropagation();
      return;
    }

    this.querySelector('.card-inner').style.transform = '';
    this.classList.toggle('flipped');
  });

  const button = card.querySelector('.btn');
  if (button) {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      alert('Additional information would appear here!');
    });
  }
});

cards.forEach((card) => {
  const shine = card.querySelector('.shine');
  const cardInner = card.querySelector('.card-inner');

  card.addEventListener('mousemove', (e) => {
    if (!card.classList.contains('flipped')) {
      const { left, top } = card.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;

      const centerX = card.offsetWidth / 2;
      const centerY = card.offsetHeight / 2;

      const angelX = (y - centerX) / 30;
      const angelY = (centerX - x) / 30;

      cardInner.style.transform = `rotateX(${angelX}deg) rotateY(${angelY}deg)`;

      shine.style.background = `linear-gradient(${Math.atan2(y - centerY, x - centerX) * (180 / Math.PI)}deg,
        rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 60%)`;
    }
  });

  card.addEventListener('mouseleave', () => {
    if (!card.classList.contains('flipped')) {
      cardInner.style.transform = '';
    } else {
      cardInner.style.transform = 'rotateY(180deg)';
    }
  });
});

function createParticles() {
  const particles = document.getElementById('particles');
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  particles.innerHTML = '';

  for (let i = 0; i < 120; i++) {
    const size = Math.random() * 10 + 2;

    const left = Math.random() * windowWidth;
    const top = Math.random() * windowHeight;

    const delay = Math.random() * 20;
    const duration = Math.random() * 15 + 10;

    const particle = document.createElement('span');
    particle.classList.add('particle');

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}px`;
    particle.style.top = `${top}px`;
    const moveDirection = Math.floor(Math.random() * 4);
    const moveX = Math.random() * 300 - 10 + 'px';
    const moveY = Math.random() * 300 - 10 + 'px';

    particle.style.setProperty('--move-x', moveX);
    particle.style.setProperty('--move-y', moveY);

    const animations = ['floatUp', 'floatDown', 'floatLeft', 'floatRight'];
    particle.style.animation = `${animations[moveDirection]} ${duration}s linear ${delay}s infinite`;

    particles.appendChild(particle);
  }
}

createParticles();

window.addEventListener('resize', createParticles);
