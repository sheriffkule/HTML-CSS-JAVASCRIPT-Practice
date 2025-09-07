let input = document.querySelector('.search-box input');
let pokemonImg = document.querySelector('.info-box img');
let pokemonName = document.querySelector('.pokemon-name');
let pokemonId = document.querySelector('.pokemon-id');
let pokeTypeBox = document.querySelector('.pokemon-types');
let colorBox = document.querySelector('.color-box');
let pokeStatsBox = document.querySelector('.pokemon-stats');

const typeColor = {
  bug: '#26de81',
  dragon: '#ffeaa7',
  electric: '#fed330',
  fairy: '#FF0069',
  fighting: '#30336b',
  fire: '#f0932b',
  flying: '#81ecec',
  grass: '#00b894',
  ground: '#EFB549',
  ghost: '#a55eea',
  ice: '#74b9ff',
  normal: '#95afc0',
  poison: '#6c5ce7',
  psychic: '#a29bfe',
  rock: '#2d3436',
  water: '#0190FF',
};

let getPokemon = (pokemon) => {
  let url = `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => renderPokemon(data))
    .catch(() => {
      alert('Pokemon Not Found!');
    });
};

let renderPokemon = (data) => {
  const sprite = data.sprites.other.dream_world.front_default;
  const name = data.name;
  const pokeId = data.id;
  const themeColor = typeColor[data.types[0].type.name];

  pokemonImg.src = sprite;
  pokemonName.innerHTML = name;
  pokemonId.innerHTML = '#' + pokeId;

  getPokemonTypes(data.types);
  styleCard(themeColor);
  getPokemonStats(data.stats);
};

let getPokemonTypes = (types) => {
  pokeTypeBox.innerHTML = '';

  types.forEach((typ) => {
    let span = document.createElement('span');
    span.innerHTML = typ.type.name;
    pokeTypeBox.appendChild(span);
    span.classList.add('types-style');
  });
};

let styleCard = (color) => {
  colorBox.style.background = color;
  pokeTypeBox.querySelectorAll('span').forEach((typeColor) => (typeColor.style.background = color));
};

let getPokemonStats = (stats) => {
  pokeStatsBox.innerHTML = '';
  stats.forEach((pokeStats) => {
    let statElem = document.createElement('div');
    let statElemName = document.createElement('span');
    let statElemValue = document.createElement('span');

    statElemName.innerHTML = pokeStats.stat.name;
    statElemValue.innerHTML = pokeStats.base_stat;

    statElem.appendChild(statElemName);
    statElem.appendChild(statElemValue);

    statElem.classList.add('stat-elem');
    statElemName.classList.add('stat-name');
    statElemValue.classList.add('stat-value');

    pokeStatsBox.appendChild(statElem);
  });
};

input.addEventListener('keyup', (e) => {
  if ((e.target = 'Enter')) {
    getPokemon(input.value);
  }
});

getPokemon(input.value);

document.getElementById('year').textContent = new Date().getFullYear();
