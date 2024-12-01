const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
const btn = document.getElementById('btn');
const bkg = document.getElementById('bkg');
const color = document.getElementById('color');
const container = document.querySelector('.container');
const header = document.querySelector('header');

btn.addEventListener('click', function () {
    let hexColor = '#';
    
    for (let i = 0; i < 6; i++) {
        hexColor += hex[randomIndex()];
    }
    color.textContent = hexColor;
    color.style.color = hexColor;

    container.style.borderColor = hexColor;
    container.style.boxShadow = '0 0 20px' + hexColor;

    btn.style.borderColor = hexColor;
    
    bkg.addEventListener('click', function () {
        bkg.style.borderColor = hexColor;
        header.style.background = hexColor;
        header.style.boxShadow = '0 0 20px' + hexColor;
    })
});


function randomIndex() {
    return Math.floor(Math.random() * hex.length);
}

const words = ['Fantastic', 'Excellent', 'Wonderful', 'Amazing', 'Terrific', 'Incredible', 'Outstanding', 'Fabulous', 'Marvelous', 'Spectacular', 'Remarkable', 'Brilliant', 'Phenomenal', 'Splendid', 'Exceptional', 'Delightful', 'Impressive', 'Extraordinary', 'Radiant', 'Joyful'];

function randomWord() {
	return Math.floor(Math.random() * words.length);
}

const word = document.querySelector('.word');
setInterval(function () {
    word.textContent = words[randomWord()];
}, 3000);