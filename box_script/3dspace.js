function createStars() {
  const galaxy = document.getElementById('galaxy');
  const starCount = Math.floor((window.innerWidth * window.innerHeight) / 1000);

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
    star.style.setProperty('--duration', `${duration}s`);
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
    shooter.style.setProperty('--shooter-duration', `${duration}s`);
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

const planetData = {
  mercury: {
    name: 'Mercury',
    diameter: '4,880 km',
    distance: '57.9 million km',
    orbitalPeriod: '88 days',
    temperature: '-173 to 427°C',
    description: 'The smallest planet in our solar system and closest to the Sun.',
  },
  venus: {
    name: 'Venus',
    diameter: '12,104 km',
    distance: '108.2 million km',
    orbitalPeriod: '225 days',
    temperature: '462°C',
    description: 'The hottest planet in our solar system with a thick, toxic atmosphere.',
  },
  earth: {
    name: 'Earth',
    diameter: '12,742 km',
    distance: '149.6 million km',
    orbitalPeriod: '365.25 days',
    temperature: '-88 to 58°C',
    description: 'The only planet known to support life, with vast oceans and diverse ecosystems.',
  },
  mars: {
    name: 'Mars',
    diameter: '6,779 km',
    distance: '227.9 million km',
    orbitalPeriod: '687 days',
    temperature: '-125 to 20°C',
    description: 'Known as the Red Planet, it has the largest volcano and canyon in the solar system.',
  },
  jupiter: {
    name: 'Jupiter',
    diameter: '139,820 km',
    distance: '778.5 million km',
    orbitalPeriod: '12 years',
    temperature: '-145°C',
    description: 'The largest planet in our solar system, known for its Great Red Spot and many moons.',
  },
  saturn: {
    name: 'Saturn',
    diameter: '116,460 km',
    distance: '1.43 billion km',
    orbitalPeriod: '29 years',
    temperature: '-178°C',
    description: 'Famous for its stunning ring system, Saturn is a gas giant with numerous moons.',
  },
  uranus: {
    name: 'Uranus',
    diameter: '50,724 km',
    distance: '2.87 billion km',
    orbitalPeriod: '84 years',
    temperature: '-224°C',
    description: 'An ice giant with a unique sideways rotation and faint ring system.',
  },
  neptune: {
    name: 'Neptune',
    diameter: '49,244 km',
    distance: '4.5 billion km',
    orbitalPeriod: '165 years',
    temperature: '-218°C',
    description: 'The farthest planet from the Sun, known for its deep blue color and strong winds.',
  },
};

function setupPlanetClickEvent() {
  const planets = document.querySelectorAll('.planet');

  planets.forEach((planet) => {
    planet.addEventListener('click', () => {
      const planetName = planet.getAttribute('data-planet');
      const data = planetData[planetName];

      document.querySelector('.planet-name').textContent = data.name;
      document.querySelector('.planet-description').textContent = data.description;

      const stats = document.querySelectorAll('.stat-value');
      stats[0].textContent = data.diameter;
      stats[1].textContent = data.distance;
      stats[2].textContent = data.orbitalPeriod;
      stats[3].textContent = data.temperature;

      planets.forEach((p) => p.classList.remove('selected'));
      planet.classList.add('selected');
    });
  });
}

function setCurrentYear() {
  const yearSpan = document.getElementById('year');
  const currentYear = new Date().getFullYear();
  yearSpan.textContent = currentYear;

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
