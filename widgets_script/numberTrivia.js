let userInput = document.querySelector('input');
let searchBtn = document.querySelector('button');
let searchedNumber = document.querySelector('.fact-box h1');
let fact = document.querySelector('.fact-box p');

let getFact = (number) => {
  const url = 'https://numbersapi.com/';
  fetch(url + number, {
    headers: {
      'X-Requested-With':'text/plain',
    },
  })
    .then((res) => res.text())
    .then((data) => {
      fact.innerHTML = data;
      searchedNumber.innerHTML = number;
      console.log(data);
    });
};

getFact('46');

searchBtn.addEventListener('click', () => {
  if (userInput.value != '') {
    getFact(userInput.value);
  }
});

userInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter' && userInput.value !== '') {
    getFact(userInput.value);
  }
});

document.getElementById('year').textContent = new Date().getFullYear();
