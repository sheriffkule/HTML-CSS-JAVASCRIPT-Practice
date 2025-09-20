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
let msg = document.querySelector('.msg');
let resultBox = document.querySelector('.result');

let apiKey = '4ee04a4e33b75b3b93b9962a660e524d';

let fetchSuperhero = () => {
  let url = `https://superheroapi.com/api.php/${apiKey}/search/${searchInput.value}`;
  fetch(url)
    .then((res) => res.json())
    .then((superhero) => {
      console.log(superhero);
      if (superhero.response == 'success') {
        resultBox.style.display = 'block';
        msg.style.display = 'none';
        let data = superhero.results[0];
        superheroImg.src = data.image.url;
        superheroName.innerHTML = data.name;
        showPowerstats(data.powerstats);
        showBiography(data.biography);
        showAppearance(data.appearance);
        showConnections(data.connections);
      } else {
        resultBox.style.display = 'none';
        msg.style.display = 'block';
      }
    })
    .catch((error) => console.error('Error:', error));
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

let showBiography = (biography) => {
  biographyBox.innerHTML = `
    <li><span>Full Name: </span>${biography['full-name']}</li>
    <li><span>Alter-Egos: </span>${biography['alter-egos']}</li>
    <li><span>First-Appearance: </span>$${biography['first-appearance']}</li>
    <li><span>Place-of-birth: </span>${biography['place-of-birth']}</li>
    <li class="publisher"><span>Publisher: </span>${biography['publisher']}</li>
    <li class="aliases"><span>Aliases: </span>${biography['aliases']}</li>
  `;
};

let showAppearance = (appearance) => {
  appearanceBox.innerHTML = `
    <li>
      <i class="fa-solid fa-star"></i>
      <span>Eye-Color</span>
      <div>${appearance['eye-color']}</div>
    </li>
    <li>
      <i class="fa-solid fa-star"></i>
      <span>Gender</span>
      <div>${appearance['gender']}</div>
    </li>
    <li>
      <i class="fa-solid fa-star"></i>
      <span>Hair-Color</span>
      <div>${appearance['hair-color']}</div>
    </li>
    <li>
      <i class="fa-solid fa-star"></i>
      <span>Height</span>
      <div>${appearance.height[1]}</div>
    </li>
    <li>
      <i class="fa-solid fa-star"></i>
      <span>Race</span>
      <div>${appearance.race}</div>
    </li>
    <li>
      <i class="fa-solid fa-star"></i>
      <span>Weight</span>
      <div>${appearance.weight[1]}</div>
    </li>
  `;
};

let showConnections = (connections) => {
  connectionsBox.innerHTML = `
    <h2>Group-Affiliations</h2>
    <span>${connections['group-affiliation']}</span>
    <h2>Relatives</h2>
    <span>${connections['relatives']}</span>
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

fetchSuperhero();

document.getElementById('year').textContent = new Date().getFullYear();
