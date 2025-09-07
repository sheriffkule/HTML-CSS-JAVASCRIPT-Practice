let input = document.querySelector('.search-box input');
let pokemonImg = document.querySelector('.info-box img');
let pokemonName = document.querySelector('.pokemon-name');
let pokemonId = document.querySelector('.pokemon-id');
let pokeTypeBox = document.querySelector('.pokemon-types');

let getPokemon = (pokemon) => {
  let url = `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => renderPokemon(data));
};

let renderPokemon = (data) => {
  const sprite = data.sprites.other.dream_world.front_default;
  const name = data.name;
  const pokeId = data.id;
  pokemonImg.src = sprite;
  pokemonName.innerHTML = name;
  pokemonId.innerHTML = '#' + pokeId;
  getPokemonTypes(data.types);
};

let getPokemonTypes = (types) => {
  types.forEach((typ) => {
    let span = document.createElement('span');
    span.innerHTML = typ.type.name;
    pokeTypeBox.appendChild(span);
    span.classList.add('types-style');
  });
};

input.addEventListener('keyup', (e) => {
  if ((e.target = 'Enter')) {
    getPokemon(input.value);
  }
});

getPokemon('magneton');
