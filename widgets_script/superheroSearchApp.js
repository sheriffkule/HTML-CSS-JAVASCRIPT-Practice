let allTabs = document.querySelectorAll('.tab');
let allOptions = document.querySelectorAll('.options span');
let marker = document.querySelector('#marker');
let searchInput = document.querySelector('.userInput');
let superheroImg = document.querySelector('.superheroImg');
let superheroName = document.querySelector('.superheroName');
let powerStatBox = document.querySelector('.powerstats');
let biographyBox = document.querySelector('.biography');
let appearanceBox = document.querySelector('.appearance');
let connectionsBox = document.querySelector('.connections');

let apiKey = '4ee04a4e33b75b3b93b9962a660e524d';

let fetchSuperhero = () => {
  let url = `https://superheroapi.com/api.php/${apiKey}/search/${searchInput.value}`;
  fetch(url)
    .then((res) => res.json())
    .then((superhero) => {
      console.log(superhero);
      if (superhero.response == 'success') {
        let data = superhero.results[0];
        superheroImg.src = data.image.url;
        superheroName.innerHTML = data.name;
        showPowerstats(data.powerstats);
      }
    });
};

let showPowerstats = (powerstats) => {
  powerStatBox.innerHTML = `
    <li>
      <i class="fa-solid fa-shield-halved"></i>
      <span>Combat</span>
      <span>${powerstats.combat}</span>
    </li>
    <li>
      <i class="fa-solid fa-shield-halved"></i>
      <span>Durability</span>
      <span>${powerstats.durability}</span>
    </li>
    <li>
      <i class="fa-solid fa-shield-halved"></i>
      <span>Intelligence</span>
      <span>${powerstats.intelligence}</span>
    </li>
    <li>
      <i class="fa-solid fa-shield-halved"></i>
      <span>Power</span>
      <span>${powerstats.power}</span>
    </li>
    <li>
      <i class="fa-solid fa-shield-halved"></i>
      <span>Speed</span>
      <span>${powerstats.speed}</span>
    </li>
    <li>
      <i class="fa-solid fa-shield-halved"></i>
      <span>Strength</span>
      <span>${powerstats.strength}</span>
    </li>
  `;
};

searchInput.addEventListener('keyup', (e) => {
  if (searchInput.value != '') {
    if (e.key == 'Enter') {
      fetchSuperhero();
    }
  }
});

allOptions.forEach((option, index) => {
  option.addEventListener('click', (e) => {
    indicator(e.target);
    allTabs.forEach((content) => {
      content.classList.remove('active');
    });
    allOptions.forEach((option) => {
      option.classList.remove('active');
    });
    allOptions[index].classList.add('active');
    allTabs[index].classList.add('active');
  });
});

let indicator = (e) => {
  marker.style.left = e.offsetLeft + 'px';
  marker.style.width = e.offsetWidth + 'px';
};

fetchSuperhero('Hulk');
