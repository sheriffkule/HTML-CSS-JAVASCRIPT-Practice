let nameInput = document.querySelector('input');
let searchBtn = document.querySelector('.predict-btn');
let nameTxt = document.querySelector('.name');
let genderLogo = document.querySelector('.gender-logo');
let gender = document.querySelector('.gender');
let probability = document.querySelector('.probability');
let resultBox = document.querySelector('.result-box');

let predictGender = (name) => {
  let url = 'https://api.genderize.io?name=';
  fetch(url + name)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      nameTxt.innerHTML = data.name;
      gender.innerHTML = data.gender;
      probability.innerHTML = `Probability: ${data.probability}`;
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
    resultBox.style.displa = 'block';
};

predictGender('gicule');

searchBtn.addEventListener('click', () => {
  if (nameInput.value.length > 0 && /^[A-Za-z]+$/.test(nameInput.value)) {
    predictGender(nameInput.value);
  }
});

document.getElementById('year').textContent = new Date().getFullYear()