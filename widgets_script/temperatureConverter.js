const temperatureFields = {
  celsius: document.getElementById('celsius'),
  fahrenheit: document.getElementById('fahrenheit'),
  kelvin: document.getElementById('kelvin'),
};

const resetButton = document.querySelector('.btn button');

const convertToCelsius = (value) => {
  switch (true) {
    case temperatureFields.fahrenheit.value === value:
      return (((value - 32) * 5) / 9).toFixed(2);
    case temperatureFields.kelvin.value === value:
      return (value - 273.15).toFixed(2);
    default:
      return value;
  }
};

const convertToFahrenheit = (value) => {
  switch (true) {
    case temperatureFields.celsius.value === value:
      return ((value * 9) / 5 + 32).toFixed(2);
    case temperatureFields.kelvin.value === value:
      return (((value - 273.15) * 9) / 5 + 32).toFixed(2);
    default:
      return value;
  }
};

const convertToKelvin = (value) => {
  switch (true) {
    case temperatureFields.celsius.value === value:
      return (parseFloat(value) + 273.15).toFixed(2);
    case temperatureFields.fahrenheit.value === value:
      return (((value - 32) * 5) / 9 + 273.15).toFixed(2);
    default:
      return value;
  }
};

const updateTemperatureFields = (field, value) => {
  if (!value) {
    Object.values(temperatureFields).forEach((field) => (field.value = ''));
    return;
  }

  switch (field) {
    case temperatureFields.celsius:
      temperatureFields.fahrenheit.value = convertToFahrenheit(value);
      temperatureFields.kelvin.value = convertToKelvin(value);
      break;
    case temperatureFields.fahrenheit:
      temperatureFields.celsius.value = convertToCelsius(value);
      temperatureFields.kelvin.value = convertToKelvin(value);
      break;
    case temperatureFields.kelvin:
      temperatureFields.celsius.value = convertToCelsius(value);
      temperatureFields.fahrenheit.value = convertToFahrenheit(value);
      break;
    default:
      break;
  }
};

window.addEventListener('load', () => temperatureFields.celsius.focus());

Object.values(temperatureFields).forEach((field) =>
  field.addEventListener('input', (e) => updateTemperatureFields(field, e.target.value))
);

resetButton.addEventListener('click', () => {
  Object.values(temperatureFields).forEach((field) => (field.value = ''));
});

const saveFavoriteButton = document.getElementById('save-favorite');
const favoriteList = document.getElementById('favorite-list');

const saveFavorite = () => {
  const celsiusValue = celsius.value;
  const fahrenheitValue = fahrenheit.value;
  const kelvinValue = kelvin.value;
  const favoriteName = prompt('Enter a name for this favorite:');

  if (favoriteName) {
    const favorite = {
      name: favoriteName,
      celsius: celsiusValue,
      fahrenheit: fahrenheitValue,
      kelvin: kelvinValue,
    };

    const favoritesTemp = JSON.parse(localStorage.getItem('favoritesTemp')) || [];
    favoritesTemp.push(favorite);
    localStorage.setItem('favoritesTemp', JSON.stringify(favoritesTemp));

    updateFavoriteList();
  }
};

const updateFavoriteList = () => {
  const favoritesTemp = JSON.parse(localStorage.getItem('favoritesTemp')) || [];
  favoriteList.innerHTML = '';
  
  favoritesTemp.forEach((favorite) => {
    const favoriteListItem = document.createElement('li');
    const data = document.createElement('span');
    const copyButton = document.createElement('button');
    copyButton.classList.add('copy_btn');
    copyButton.textContent = 'Copy';
    copyButton.onclick = () => {
      navigator.clipboard.writeText(
        `${favorite.name} - Celsius: ${favorite.celsius}, Fahrenheit: ${favorite.fahrenheit}, Kelvin: ${favorite.kelvin}`
      );
      setTimeout(() => {
        copyButton.style.color = '#fff';
        copyButton.textContent = 'Copy';
      }, 1500);
      copyButton.style.color = '#0f0';
      copyButton.style.fontWeight = 600;
      copyButton.textContent = 'Copied';
    };
    data.textContent = `${favorite.name} - Celsius: ${favorite.celsius}°, Fahrenheit: ${favorite.fahrenheit}°F, Kelvin: ${favorite.kelvin} K`;
    favoriteListItem.appendChild(data);
    favoriteListItem.appendChild(copyButton);
    favoriteList.appendChild(favoriteListItem);
  });
};

saveFavoriteButton.addEventListener('click', saveFavorite);

favoriteList.addEventListener('click', handleFavoriteListClick);

function handleFavoriteListClick(event) {
  if (event.target.tagName === 'LI') {
    const favoriteName = event.target.textContent.split(' - ')[0];

    const favorites = JSON.parse(localStorage.getItem('favoritesTemp')) || [];
    const updatedFavorites = favorites.filter((favorite) => favorite.name !== favoriteName);

    localStorage.setItem('favoritesTemp', JSON.stringify(updatedFavorites));

    updateFavoriteList();
  }
}

updateFavoriteList();

const year = document.getElementById('year');
const thisYear = new Date().getFullYear();

year.setAttribute('datetime', thisYear);
year.textContent = thisYear;
