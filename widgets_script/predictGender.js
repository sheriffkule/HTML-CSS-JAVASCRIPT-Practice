let nameInput = document.querySelector('.user-input-box input');
let searchBtn = document.querySelector('.predict-btn');
let nameTxt = document.querySelector('.name');
let genderLogo = document.querySelector('.gender-logo');
let gender = document.querySelector('.gender');
let probability = document.querySelector('.probability');
let resultBox = document.querySelector('.result-box');
let bgInput = document.querySelector('.settings input');
let colorHex = document.querySelector('.colorHex');

let predictGender = (name) => {
  let url = 'https://api.genderize.io?name=';
  fetch(url + name)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      nameTxt.innerHTML = data.name;
      gender.innerHTML = data.gender;
      probability.innerHTML = `Probability: ${Math.round(data.probability * 100)}%`;
      if (data.gender == 'female') {
        resultBox.style.background = '#f576ab';
        genderLogo.innerHTML = `<ion-icon name="woman-outline"></ion-icon>`;
        genderLogo.style.color = '#f576ab';
      } else {
        resultBox.style.background = '#5bc4f3';
        genderLogo.innerHTML = `<ion-icon name="man-outline"></ion-icon>`;
        genderLogo.style.color = '#5bc4f3';
      }
    });
  resultBox.style.display = 'block';
};

predictGender();

searchBtn.addEventListener('click', () => {
  if (nameInput.value.length > 0 && /^[A-Za-z]+$/.test(nameInput.value)) {
    predictGender(nameInput.value);
  }
});

nameInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter' && nameInput.value.length > 0 && /^[A-Za-z]+$/.test(nameInput.value)) {
    predictGender(nameInput.value);
  }
});

bgInput.addEventListener('input', () => {
  document.body.style.background = bgInput.value;
  colorHex.textContent = bgInput.value;
});

document.getElementById('year').textContent = new Date().getFullYear();
