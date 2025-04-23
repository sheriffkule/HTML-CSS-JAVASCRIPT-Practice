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

const year = document.getElementById('year');
const thisYear = new Date().getFullYear();

year.setAttribute('datetime', thisYear);
year.textContent = thisYear;
