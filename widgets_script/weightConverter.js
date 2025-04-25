let kgRef = document.getElementById('kg');
let lbRef = document.getElementById('lb');
let ozRef = document.getElementById('oz');

let convertFromKg = () => {
  let kg = kgRef.value;
  lbRef.value = (kg * 2.2046).toFixed(2);
  ozRef.value = (kg * 35.274).toFixed(2);
};

let convertFromLb = () => {
  let lb = lbRef.value;
  kgRef.value = (lb / 2.205).toFixed(2);
  ozRef.value = (lb * 16).toFixed(2);
};

let convertFromOz = () => {
  let oz = ozRef.value;
  kgRef.value = (oz / 35.274).toFixed(2);
  lbRef.value = (oz / 16).toFixed(2);
};

kgRef.addEventListener('input', convertFromKg);
lbRef.addEventListener('input', convertFromLb);
ozRef.addEventListener('input', convertFromOz);
window.addEventListener('load', convertFromKg);

const saveFavoriteButton = document.getElementById('save-favorite');
const favoriteList = document.getElementById('favorite-list');

saveFavoriteButton.addEventListener('click', function (e) {
  let rect = saveFavoriteButton.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;

  let numParticles = 20;

  for (let i = 0; i < numParticles; i++) {
    createParticle(x, y);
  }
});

function createParticle(x, y) {
  let particle = document.createElement('div');
  particle.classList.add('particle');

  particle.style.left = x + 'px';
  particle.style.top = y + 'px';

  let angle = Math.random() * Math.PI * 2;
  let distance = Math.random() * 80 + 20;
  let tx = Math.cos(angle) * distance;
  let ty = Math.sin(angle) * distance;

  particle.style.setProperty('--tx', tx + 'px');
  particle.style.setProperty('--ty', ty + 'px');

  saveFavoriteButton.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 1000);
}

const saveFavorite = () => {
  const kgValue = kgRef.value;
  const lbValue = lbRef.value;
  const ozValue = ozRef.value;
  const favoriteName = prompt('Enter a name for this favorite:');

  if (favoriteName) {
    const favorite = {
      name: favoriteName,
      kg: kgValue,
      lb: lbValue,
      oz: ozValue,
    };

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(favorite);
    localStorage.setItem('favorites', JSON.stringify(favorites));

    updateFavoriteList();
  }
};

const updateFavoriteList = () => {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favoriteList.innerHTML = '';

  favorites.forEach((favorite) => {
    const favoriteListItem = document.createElement('li');
    const copyButton = document.createElement('button');
    copyButton.classList.add('copy_btn');
    copyButton.textContent = 'Copy';
    copyButton.onclick = () => {
      navigator.clipboard.writeText(
        `${favorite.name} - kg: ${favorite.kg}, lb: ${favorite.lb}, oz: ${favorite.oz}`
      );
      setTimeout(() => {
        copyButton.style.color = '#000';
        copyButton.textContent = 'Copy';
      }, 1500);
      copyButton.style.color = '#0f0';
      copyButton.textContent = 'Copied';
    };
    favoriteListItem.textContent = `${favorite.name} - kg: ${favorite.kg}, lb: ${favorite.lb}, oz: ${favorite.oz}`;
    favoriteListItem.appendChild(copyButton);
    favoriteList.appendChild(favoriteListItem);
  });
};

saveFavoriteButton.addEventListener('click', saveFavorite);

favoriteList.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    const favoriteName = e.target.textContent.split(' - ')[0];
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const updatedFavorites = favorites.filter((favorite) => favorite.name !== favoriteName);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    updateFavoriteList();
  }
});

updateFavoriteList();

function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');
  yearElement.dateTime = currentYear;
  yearElement.textContent = currentYear;
}

updateYear();
