let words = [
  {
    word: 'addition',
    hint: 'The process of adding numbers',
  },
  {
    word: 'meeting',
    hint: 'Event in which people come together',
  },
  {
    word: 'number',
    hint: 'Math symbol used for counting',
  },
  {
    word: 'exchange',
    hint: 'The act of trading',
  },
  {
    word: 'canvas',
    hint: 'Piece of fabric for oil painting',
  },
  {
    word: 'garden',
    hint: 'Space for planting flower and plant',
  },
  {
    word: 'position',
    hint: 'Location of someone or something',
  },
  {
    word: 'feather',
    hint: 'Hair like outer covering of bird',
  },
  {
    word: 'comfort',
    hint: 'A pleasant feeling of relaxation',
  },
  {
    word: 'tongue',
    hint: 'The muscular organ of mouth',
  },
  {
    word: 'expansion',
    hint: 'The process of increase or grow',
  },
  {
    word: 'country',
    hint: 'A politically identified region',
  },
  {
    word: 'group',
    hint: 'A number of objects or persons',
  },
  {
    word: 'taste',
    hint: 'Ability of tongue to detect flavour',
  },
  {
    word: 'store',
    hint: 'Large shop where goods are traded',
  },
  {
    word: 'field',
    hint: 'Area of land for farming activities',
  },
  {
    word: 'friend',
    hint: 'Person other than a family member',
  },
  {
    word: 'pocket',
    hint: 'A bag for carrying small items',
  },
  {
    word: 'needle',
    hint: 'A thin and sharp metal pin',
  },
  {
    word: 'expert',
    hint: 'Person with extensive knowledge',
  },
  {
    word: 'statement',
    hint: 'A declaration of something',
  },
  {
    word: 'second',
    hint: 'One-sixtieth of a minute',
  },
  {
    word: 'library',
    hint: 'Place containing collection of books',
  },
  {
    word: 'computer',
    hint: 'Electronic device for processing data',
  },
  {
    word: 'telephone',
    hint: 'Device for making voice calls',
  },
  {
    word: 'dictionary',
    hint: 'Book containing word meanings',
  },
  {
    word: 'guitar',
    hint: 'Musical instrument with strings',
  },
  {
    word: 'bicycle',
    hint: 'Vehicle with two wheels',
  },
  {
    word: 'camera',
    hint: 'Device for capturing images',
  },
  {
    word: 'piano',
    hint: 'Musical instrument with keys',
  },
  {
    word: 'restaurant',
    hint: 'Place where food is served',
  },
  {
    word: 'hospital',
    hint: 'Place where medical care is provided',
  },
  {
    word: 'microscope',
    hint: 'Device for magnifying small objects',
  },
  {
    word: 'telescope',
    hint: 'Device for observing distant objects',
  },
  {
    word: 'stethoscope',
    hint: 'Medical device for listening to heartbeat',
  },
  {
    word: 'binoculars',
    hint: 'Device for observing distant objects with both eyes',
  },
  {
    word: 'compass',
    hint: 'Device for navigation and direction',
  },
  {
    word: 'thermometer',
    hint: 'Device for measuring temperature',
  },
  {
    word: 'barometer',
    hint: 'Device for measuring atmospheric pressure',
  },
  {
    word: 'hygrometer',
    hint: 'Device for measuring humidity',
  },
  {
    word: 'spectrum',
    hint: 'Range of colors or frequencies',
  },
  {
    word: 'galaxy',
    hint: 'Massive collection of stars and planets',
  },
];

function randomText() {
  let text = 'ABCDEFGHIJKLMNOPRQSTUWXYZ';

  letter = text[Math.floor(Math.random() * text.length)];

  return letter;
}

function rain() {
  const fontStyles = ['normal', 'bold', 'italic', 'oblique'];
  let e = document.createElement('div');

  let left = Math.floor(Math.random() * 110);
  let size = Math.random() * 1.8;
  let duration = Math.random() * 115;

  e.classList.add('text');
  e.innerText = randomText();
  document.body.appendChild(e);

  e.style.left = left + '%';
  e.style.fontSize = 0.3 + size + 'em';
  e.style.animationDuration = 30 + duration + 's';
  e.style.color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  e.style.fontStyle = fontStyles[Math.floor(Math.random() * fontStyles.length)];
  e.style.transform = `translateX(${Math.floor(Math.random() * 100)}px)`;

  setTimeout(function () {
    document.body.removeChild(e);
  }, 30000);
}

setInterval(function () {
  rain();
}, 300);

const wordText = document.querySelector('.word');
const hintText = document.querySelector('.hint span');
const timeText = document.querySelector('.time b');
const inputField = document.querySelector('input');
const refreshBtn = document.querySelector('.refresh-word');
const checkBtn = document.querySelector('.check-word');

let correctWord;
let timer = 0;

const initTImer = (maxTime) => {
  timer = setInterval(() => {
    if (maxTime > 0) {
      maxTime--;
      return (timeText.innerText = maxTime);
    }

    clearInterval(timer);
    alert(`Time off! The word was ${correctWord.toUpperCase()}`);
    initGame();
  }, 1000);
};

const initGame = () => {
  clearInterval(timer);
  initTImer(30);

  let randomObj = words[Math.floor(Math.random() * words.length)];
  let wordArray = randomObj.word.split('');

  for (let i = wordArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }

  wordText.innerText = wordArray.join('');
  hintText.innerText = randomObj?.hint;
  correctWord = randomObj.word.toLowerCase();
  inputField.value = '';
  inputField.setAttribute('maxlength', correctWord.length);
};

initGame();

const checkWord = () => {
  let userWord = inputField.value.toLocaleLowerCase();

  if (!userWord) return alert('Please enter a word.');

  if (userWord !== correctWord) {
    alert(`Oops!, ${userWord.toUpperCase()} is not a correct word.`);
  } else {
    alert(`Yaaay!, ${userWord.toUpperCase()} is a correct word.`);
  }

  initGame();
};

inputField.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    checkWord();
  }
});

refreshBtn.addEventListener('click', initGame);
checkBtn.addEventListener('click', checkWord);

function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');

  if (!yearElement) {
    console.error('Year element not found');
    return;
  }

  if (yearElement) {
    yearElement.setAttribute('datetime', currentYear.toString());
    yearElement.dateTime = currentYear;
    yearElement.textContent = currentYear.toString();
  }
}

window.addEventListener('load', updateYear);
