const wordList = [
  {
    word: 'guitar',
    hint: 'A musical instrument with strings.',
  },
  {
    word: 'oxygen',
    hint: 'A colorless, odorless gas essential for life.',
  },
  {
    word: 'mountain',
    hint: "A large natural elevation of the Earth's surface.",
  },
  {
    word: 'painting',
    hint: 'An art form using colors on a surface to create images or expression.',
  },
  {
    word: 'astronomy',
    hint: 'The scientific study of celestial objects and phenomena.',
  },
  {
    word: 'football',
    hint: 'A popular sport played with a spherical ball.',
  },
  {
    word: 'chocolate',
    hint: 'A sweet treat made from cocoa beans.',
  },
  {
    word: 'butterfly',
    hint: 'An insect with colorful wings and a slender body.',
  },
  {
    word: 'history',
    hint: 'The study of past events and human civilization.',
  },
  {
    word: 'pizza',
    hint: 'A savory dish consisting of a round, flattened base with toppings.',
  },
  {
    word: 'jazz',
    hint: 'A genre of music characterized by improvisation and syncopation.',
  },
  {
    word: 'camera',
    hint: 'A device used to capture and record images or videos.',
  },
  {
    word: 'diamond',
    hint: 'A precious gemstone known for its brilliance and hardness.',
  },
  {
    word: 'adventure',
    hint: 'An exciting or daring experience.',
  },
  {
    word: 'science',
    hint: 'The systematic study of the structure and behavior of the physical and natural world.',
  },
  {
    word: 'bicycle',
    hint: 'A human-powered vehicle with two wheels.',
  },
  {
    word: 'sunset',
    hint: 'The daily disappearance of the sun below the horizon.',
  },
  {
    word: 'coffee',
    hint: 'A popular caffeinated beverage made from roasted coffee beans.',
  },
  {
    word: 'dance',
    hint: 'A rhythmic movement of the body often performed to music.',
  },
  {
    word: 'galaxy',
    hint: 'A vast system of stars, gas, and dust held together by gravity.',
  },
  {
    word: 'orchestra',
    hint: 'A large ensemble of musicians playing various instruments.',
  },
  {
    word: 'volcano',
    hint: 'A mountain or hill with a vent through which lava, rock fragments, hot vapor, and gas are ejected.',
  },
  {
    word: 'novel',
    hint: 'A long work of fiction, typically with a complex plot and characters.',
  },
  {
    word: 'sculpture',
    hint: 'A three-dimensional art form created by shaping or combining materials.',
  },
  {
    word: 'symphony',
    hint: 'A long musical composition for a full orchestra, typically in multiple movements.',
  },
  {
    word: 'architecture',
    hint: 'The art and science of designing and constructing buildings.',
  },
  {
    word: 'ballet',
    hint: 'A classical dance form characterized by precise and graceful movements.',
  },
  {
    word: 'astronaut',
    hint: 'A person trained to travel and work in space.',
  },
  {
    word: 'waterfall',
    hint: 'A cascade of water falling from a height.',
  },
  {
    word: 'technology',
    hint: 'The application of scientific knowledge for practical purposes.',
  },
  {
    word: 'rainbow',
    hint: 'A meteorological phenomenon that is caused by reflection, refraction, and dispersion of light.',
  },
  {
    word: 'universe',
    hint: 'All existing matter, space, and time as a whole.',
  },
  {
    word: 'piano',
    hint: 'A musical instrument played by pressing keys that cause hammers to strike strings.',
  },
  {
    word: 'vacation',
    hint: 'A period of time devoted to pleasure, rest, or relaxation.',
  },
  {
    word: 'rainforest',
    hint: 'A dense forest characterized by high rainfall and biodiversity.',
  },
  {
    word: 'theater',
    hint: 'A building or outdoor area in which plays, movies, or other performances are staged.',
  },
  {
    word: 'telephone',
    hint: 'A device used to transmit sound over long distances.',
  },
  {
    word: 'language',
    hint: 'A system of communication consisting of words, gestures, and syntax.',
  },
  {
    word: 'desert',
    hint: 'A barren or arid land with little or no precipitation.',
  },
  {
    word: 'sunflower',
    hint: 'A tall plant with a large yellow flower head.',
  },
  {
    word: 'fantasy',
    hint: 'A genre of imaginative fiction involving magic and supernatural elements.',
  },
  {
    word: 'telescope',
    hint: 'An optical instrument used to view distant objects in space.',
  },
  {
    word: 'breeze',
    hint: 'A gentle wind.',
  },
  {
    word: 'oasis',
    hint: 'A fertile spot in a desert where water is found.',
  },
  {
    word: 'photography',
    hint: 'The art, process, or practice of creating images by recording light or other electromagnetic radiation.',
  },
  {
    word: 'safari',
    hint: 'An expedition or journey, typically to observe wildlife in their natural habitat.',
  },
  {
    word: 'planet',
    hint: 'A celestial body that orbits a star and does not produce light of its own.',
  },
  {
    word: 'river',
    hint: 'A large natural stream of water flowing in a channel to the sea, a lake, or another such stream.',
  },
  {
    word: 'tropical',
    hint: 'Relating to or situated in the region between the Tropic of Cancer and the Tropic of Capricorn.',
  },
  {
    word: 'mysterious',
    hint: 'Difficult or impossible to understand, explain, or identify.',
  },
  {
    word: 'enigma',
    hint: 'Something that is mysterious, puzzling, or difficult to understand.',
  },
  {
    word: 'paradox',
    hint: 'A statement or situation that contradicts itself or defies intuition.',
  },
  {
    word: 'puzzle',
    hint: 'A game, toy, or problem designed to test ingenuity or knowledge.',
  },
  {
    word: 'whisper',
    hint: 'To speak very softly or quietly, often in a secretive manner.',
  },
  {
    word: 'shadow',
    hint: 'A dark area or shape produced by an object blocking the light.',
  },
  {
    word: 'secret',
    hint: 'Something kept hidden or unknown to others.',
  },
  {
    word: 'curiosity',
    hint: 'A strong desire to know or learn something.',
  },
  {
    word: 'unpredictable',
    hint: 'Not able to be foreseen or known beforehand; uncertain.',
  },
  {
    word: 'obfuscate',
    hint: 'To confuse or bewilder someone; to make something unclear or difficult to understand.',
  },
  {
    word: 'unveil',
    hint: 'To make known or reveal something previously secret or unknown.',
  },
  {
    word: 'illusion',
    hint: 'A false perception or belief; a deceptive appearance or impression.',
  },
  {
    word: 'moonlight',
    hint: 'The light from the moon.',
  },
  {
    word: 'vibrant',
    hint: 'Full of energy, brightness, and life.',
  },
  {
    word: 'nostalgia',
    hint: 'A sentimental longing or wistful affection for the past.',
  },
  {
    word: 'brilliant',
    hint: 'Exceptionally clever, talented, or impressive.',
  },
];

const keyboard = document.querySelector('.keyboard');
const guessesText = document.querySelector('.guesses-text b');
const wordDisplay = document.querySelector('.word-display');
const hangmanImage = document.querySelector('.hangman-box img');
const gameModal = document.querySelector('.game-modal');
const playAgainBtn = document.querySelector('.play-again');

let currentWord,
  correctLetters = [],
  wrongGuessCount = 0,
  clickedButtons = [];
const maxGuesses = 6;

const resetGame = () => {
  correctLetters = [];
  wrongGuessCount = 0;

  wordDisplay.innerHTML = currentWord
    .split('')
    .map(() => `<li class="letter"></li>`)
    .join('');
  hangmanImage.src = `../icons/hangmanGame/hangman-${wrongGuessCount}.svg`;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
  keyboard.querySelectorAll('button').forEach((btn) => (btn.disabled = false));
  gameModal.classList.remove('show');
};

const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;

  document.querySelector('.hint-text b').innerText = hint;
  resetGame();
};

const gameOver = (isVictory) => {
  setTimeout(() => {
    const modalText = isVictory ? 'Congratulations! You won!' : 'The correct word was:';
    gameModal.querySelector('img').src = `../icons/hangmanGame/${isVictory ? 'victory' : 'lost'}.gif`;
    gameModal.querySelector('h4').innerText = `${isVictory ? 'Congratulations!' : 'Game Over!'}`;
    gameModal.querySelector('p').innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add('show');
    clickedButtons.forEach((button) => {
      button.disabled = false;
    });
    clickedButtons = [];
  }, 300);
};

const initGame = (button, clickedLetter) => {
  if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
        wordDisplay.querySelectorAll('li')[index].innerHTML = letter;
        wordDisplay.querySelectorAll('li')[index].classList.add('guessed');
      }
    });
  } else {
    wrongGuessCount++;
    hangmanImage.src = `../icons/hangmanGame/hangman-${wrongGuessCount}.svg`;
  }
  button.disabled = true;
  clickedButtons.push(button);
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

  if (wrongGuessCount === maxGuesses) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
};

const fragment = document.createDocumentFragment();

for (let i = 97; i <= 122; i++) {
  const button = document.createElement('button');
  button.classList.add('pixel-btn');

  const buttonSpan = document.createElement('span');
  buttonSpan.textContent = String.fromCharCode(i);
  button.appendChild(buttonSpan);

  button.addEventListener('click', (e) => initGame(button, String.fromCharCode(i)));

  const pixelContainer = document.createElement('div');
  pixelContainer.classList.add('pixel-container');
  button.appendChild(pixelContainer);

  fragment.appendChild(button);
}

keyboard.appendChild(fragment);

getRandomWord();
playAgainBtn.addEventListener('click', getRandomWord);

let buttons = document.querySelectorAll('.pixel-btn');

buttons.forEach((button) => {
  let pixelContainer = button.querySelector('.pixel-container');
  let pixelSize = 10;
  let btnWidth = button.offsetWidth;
  let btnHeight = button.offsetHeight;
  let cols = Math.floor(btnWidth / pixelSize + 2);
  let rows = Math.floor(btnHeight / pixelSize + 1);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let pixel = document.createElement('div');

      pixel.classList.add('pixel');
      pixel.style.left = `${col * pixelSize}px`;
      pixel.style.top = `${row * pixelSize}px`;

      let delay = Math.random() * 1;

      pixel.style.transitionDelay = `${delay}s`;
      pixelContainer.appendChild(pixel);
    }
  }
});

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let canvasOffset = {
  x0: ctx.canvas.offsetLeft,
  y0: ctx.canvas.offsetTop,
  x1: ctx.canvas.offsetLeft + ctx.canvas.width,
  y1: ctx.canvas.offsetTop + ctx.canvas.height,
};

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
class Particle {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = 1.5;
    this.color = '#fff';
    this.vx = Math.random() * 0.5;
    this.vy = Math.random() * 0.5;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }
}

let circle = [];
for (let i = 0; i < 200; i++) {
  circle.push(new Particle(ctx));
}

function animate() {
  clearCanvas();
  circle.forEach((item) => {
    item.draw();

    item.x += item.vx;
    item.y += item.vy;

    if (item.x + item.size > canvas.width || item.x - item.size < 0) {
      item.vx *= -1;
    }
    if (item.y + item.size > canvas.height || item.y - item.size < 0) {
      item.vy *= -1;
    }
  });
  requestAnimationFrame(animate);
}

function handleResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  circle.forEach((item) => {
    item.x = Math.random() * canvas.width;
    item.y = Math.random() * canvas.height;
  });
}

window.addEventListener('resize', handleResize);
animate();

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
