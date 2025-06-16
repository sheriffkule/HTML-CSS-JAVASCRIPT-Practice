const cardObjectDefinition = [
  { id: 1, imagePath: 'images/card-KingHearts.png' },
  { id: 2, imagePath: 'images/card-JackClubs.png' },
  { id: 3, imagePath: 'images/card-QueenDiamonds.png' },
  { id: 4, imagePath: 'images/card-AceSpades.png' },
];

const aceId = 4;
const cardBackImgPath = 'images/card-back-Blue.png';
const cardContainerElem = document.querySelector('.card-container');
const playGameButtonElem = document.getElementById('playGame');
const collapsedGridAreaTemplate = '"a a" "a a"';
const cardCollectionCellClass = '.card-pos-a';
const numCards = cardObjectDefinition.length;

let cards = [];
let cardPositions = [];

let gameInProgress = false;
let shufflingInProgress = false;
let cardsRevealed = false;

const currentGameStatusElem = document.querySelector('.current-status');
const scoreContainerElem = document.querySelector('.header-score-container');
const scoreElem = document.querySelector('.score');
const roundContainerElem = document.querySelector('.header-round-container');
const roundElem = document.querySelector('.round');

const winColor = '#0f0';
const loseColor = '#f00';
const primaryColor = 'white';

let roundNum = 0;
let maxRounds = 4;
let score = 0;
let round = 1;

loadGame();

function choseCard(card) {
  if (canChooseCard()) {
    evaluateCardChoice(card);
  }
}

function calculateScoreToAdd(roundNum) {
  if (roundNum == 1) {
    return 100;
  } else if (roundNum == 2) {
    return 50;
  } else if (roundNum == 3) {
    return 25;
  } else {
    return 10;
  }
}

function calculateScore() {
  const scoreToAdd = calculateScoreToAdd(roundNum);
  score = score + scoreToAdd;
}

function updateScore() {
  calculateScore();
}

function updateStatusElement(elem, display, color, innerHTML) {
  elem.style.display = display;

  if (arguments.length > 2) {
    elem.style.color = color;
    elem.innerHTML = innerHTML;
  }
}

function outputChoiceFeedBack(hit) {
  if (hit) {
    updateStatusElement(currentGameStatusElem, 'block', winColor, 'Hit!! - Well Done!! :)');
  } else {
    updateStatusElement(currentGameStatusElem, 'block', loseColor, 'Missed!! :(');
  }
}

function evaluateCardChoice(card) {
  if (card.id == aceId) {
    updateScore();
    outputChoiceFeedBack(true);
  } else {
    outputChoiceFeedBack(false);
  }
}

function canChooseCard() {
  return gameInProgress == true && !shufflingInProgress && !cardsRevealed;
}

function loadGame() {
  createCards();

  cards = document.querySelectorAll('.card');

  playGameButtonElem.addEventListener('click', () => startGame());
}

function startGame() {
  initializeNewGame();
  startRound();
}

function initializeNewGame() {
  score = 0;
  roundNum = 0;

  shufflingInProgress = false;

  updateStatusElement(scoreContainerElem, 'flex');
  updateStatusElement(roundContainerElem, 'flex');

  updateStatusElement(scoreElem, 'block', primaryColor, `Score <span class="badge">${score}</span>`);
  updateStatusElement(roundElem, 'block', primaryColor, `Round <span class="badge">${round}</span>`);
}

function collectCards() {
  transformGridArea(collapsedGridAreaTemplate);
  addCardsToGridAreaCell(cardCollectionCellClass);
}

function transformGridArea(areas) {
  cardContainerElem.style.gridTemplateAreas = areas;
}

function addCardsToGridAreaCell(cellPositionClassName) {
  const cellPositionElem = document.querySelector(cellPositionClassName);

  cards.forEach((card, index) => {
    addChildElement(cellPositionElem, card);
  });
}

function startRound() {
  initializeNewRound();
  collectCards();
  flipCards(true);
  shuffleCards();
}

function initializeNewRound() {
  roundNum++;
  playGameButtonElem.disabled = true;

  gameInProgress = true;
  shufflingInProgress = true;
  cardsRevealed = false;

  updateStatusElement(currentGameStatusElem, 'block', primaryColor, 'Shuffling...');
  updateStatusElement(roundElem, 'block', primaryColor, `Round <span class="badge">${round}</span>`);
}

function flipCard(card, flipToBack) {
  const innerCardElem = card.firstChild;

  if (flipToBack && !innerCardElem.classList.contains('flip-it')) {
    innerCardElem.classList.add('flip-it');
  } else if (innerCardElem.classList.contains('flip-it')) {
    innerCardElem.classList.remove('flip-it');
  }
}

function flipCards(flipToBack) {
  cards.forEach((card, index) => {
    setTimeout(() => {
      flipCard(card, flipToBack);
    }, index * 100);
  });
}

function shuffleCards() {
  const id = setInterval(shuffle, 12);
  let shuffleCount = 0;

  function shuffle() {
    randomizeCardPositions();

    if (shuffleCount == 500) {
      clearInterval(id);
      dealCards();
    } else {
      shuffleCount++;
    }
  }
}

function randomizeCardPositions() {
  const random1 = Math.floor(Math.random() * numCards) + 1;
  const random2 = Math.floor(Math.random() * numCards) + 1;

  const temp = cardPositions[random1 - 1];

  cardPositions[random1 - 1] = cardPositions[random2 - 1];
  cardPositions[random2 - 1] = temp;
}

function dealCards() {
  AddCardsToAppropriateCell();
  const areasTemplate = returnGridAreasMappedToCardPos();

  transformGridArea(areasTemplate);
}

function returnGridAreasMappedToCardPos() {
  let firstPart = '';
  let secondPart = '';
  let areas = '';

  cards.forEach((card, index) => {
    if (cardPositions[index] == 1) {
      areas = areas + 'a ';
    } else if (cardPositions[index] == 2) {
      areas = areas + 'b ';
    } else if (cardPositions[index == 3]) {
      areas = areas + 'c ';
    } else if (cardPositions[index] == 4) {
      areas = areas + 'd ';
    }
    if (index == 1) {
      firstPart = areas.substring(0, areas.length - 1);
      areas = '';
    } else if (index == 3) {
      secondPart = areas.substring(0, areas.length - 1);
    }

    return `"${firstPart}" "${secondPart}"`;
  });
}

function AddCardsToAppropriateCell() {
  cards.forEach((card) => {
    addCardToGridCell(card);
  });
}

function createCards() {
  cardObjectDefinition.forEach((cardItem) => {
    createCard(cardItem);
  });
}

function createCard(cardItem) {
  const cardElem = document.createElement('div');
  const cardInnerElem = document.createElement('div');
  const cardFrontElem = document.createElement('div');
  const cardBackElem = document.createElement('div');

  const cardFrontImg = createElement('img');
  const cardBackImg = createElement('img');

  addClassToElement(cardElem, 'card');
  addIdToElement(cardElem, cardItem.id);

  addClassToElement(cardInnerElem, 'card-inner');

  addClassToElement(cardFrontElem, 'card-front');

  addClassToElement(cardBackElem, 'card-back');

  addSrcToImageElem(cardBackImg, cardBackImgPath);

  addSrcToImageElem(cardFrontImg, cardItem.imagePath);

  addClassToElement(cardBackImg, 'card-img');

  addClassToElement(cardFrontImg, 'card-img');

  addChildElement(cardFrontElem, cardFrontImg);

  addChildElement(cardBackElem, cardBackImg);

  addChildElement(cardInnerElem, cardFrontElem);

  addChildElement(cardInnerElem, cardBackElem);

  addChildElement(cardElem, cardInnerElem);

  addCardToGridCell(cardElem);

  initializeCardPositions(cardElem);
}

function initializeCardPositions(card) {
  cardPositions.push(card.id);
}

function createElement(elemType) {
  return document.createElement(elemType);
}

function addClassToElement(elem, className) {
  elem.classList.add(className);
}

function addIdToElement(elem, id) {
  elem.id = id;
}

function addSrcToImageElem(imgElem, src) {
  imgElem.src = src;
}

function addChildElement(parentElem, childElem) {
  parentElem.appendChild(childElem);
}

function addCardToGridCell(card) {
  const cardPositionClassName = mapCardIdToGridCell(card);
  const cardPosElem = document.querySelector(cardPositionClassName);
  addChildElement(cardPosElem, card);
}

function mapCardIdToGridCell(card){
   
    if(card.id == 1)
    {
        return '.card-pos-a'
    }
    else if(card.id == 2)
    {
        return '.card-pos-b'
    }
    else if(card.id == 3)
    {
        return '.card-pos-c'
    }
    else if(card.id == 4)
    {
        return '.card-pos-d'
    }
}
