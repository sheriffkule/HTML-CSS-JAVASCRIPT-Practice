const cardObjectDefinition = [
  { id: 1, imagePath: 'images/card-KingHearts.png' },
  { id: 2, imagePath: 'images/card-JackClubs.png' },
  { id: 3, imagePath: 'images/card-QueenDiamonds.png' },
  { id: 4, imagePath: 'images/card-AceSpades.png' },
];

const cardBackImgPath = 'images/card-back-Blue.png';
const cardContainerElem = document.querySelector('.card-container');
const playGameButtonElem = document.getElementById('playGame');
const collapsedGridAreaTemplate = '"a a" "a a"';
const cardCollectionCellClass = '.card-pos-a';
const numCards = cardObjectDefinition.length;

let cards = [];
let cardPositions = [];

loadGame();

function loadGame() {
  createCards();

  cards = document.querySelectorAll('.card');

  playGameButtonElem.addEventListener('click', () => startGame());
}

function startGame() {
  initializeNewGame();
  startRound();
}

function initializeNewGame() {}

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
}

function initializeNewRound() {}

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

function mapCardIdToGridCell(card) {
  const cardPositions = {
    1: '.card-pos-a',
    2: '.card-pos-b',
    3: '.card-pos-c',
    4: '.card-pos-d',
  };
  return cardPositions[card.id];
}
