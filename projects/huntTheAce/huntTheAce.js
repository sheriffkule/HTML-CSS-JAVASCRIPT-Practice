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
const collapsedGridAreaTemplate = '"a b" "c d"';
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

let gameObj = {};

const localStorageGameKey = 'HTA';

loadGame();

function gameOver() {
  updateStatusElement(scoreContainerElem, 'none');
  updateStatusElement(roundContainerElem, 'none');

  const gameOverMessage = `Game Over! Final Score - <span class="badge">${score},</span> Click 'Play Game
    button to play again'`;

  updateStatusElement(currentGameStatusElem, 'block', primaryColor, gameOverMessage);

  gameInProgress = false;
  playGameButtonElem.disabled = false;
}

function endRound() {
  setTimeout(() => {
    if (roundNum == maxRounds) {
      gameOver();
      return;
    } else {
      startRound();
    }
  }, 3000);
}

function choseCard(card) {
  if (canChooseCard()) {
    evaluateCardChoice(card);
    saveGameObjectToLocalStorage(score, roundNum);
    flipCard(card, false);

    setTimeout(() => {
      flipCards(false);
      updateStatusElement(currentGameStatusElem, 'block', primaryColor, 'Card positions revealed');

      endRound();
    }, 3000);
    cardsRevealed = true;
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
  updateStatusElement(scoreElem, 'block', primaryColor, `Score <span class="badge">${score}</span>`);
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

  cardFlyInEffect();

  playGameButtonElem.addEventListener('click', () => startGame());

  updateStatusElement(scoreContainerElem, 'none');
  updateStatusElement(roundContainerElem, 'none');
}

function checkForIncompleteGame() {
  const serializedGameObj = getLocalStorageItemValue(localStorageGameKey);
  if (serializedGameObj) {
    gameObj = getObjectFromJSON(serializedGameObj);

    if (gameObj.round >= maxRounds) {
      removeLocalStorageItem(localStorageGameKey);
    } else {
      if (confirm('Would you like to continue with your last game?')) {
        score = gameObj.score;
        round = gameObj.round;
      }
    }
  }
}

function startGame() {
  initializeNewGame();
  startRound();
}

function initializeNewGame() {
  score = 0;
  roundNum = 0;

  checkForIncompleteGame();

  shufflingInProgress = false;

  updateStatusElement(scoreContainerElem, 'flex');
  updateStatusElement(roundContainerElem, 'flex');

  updateStatusElement(scoreElem, 'block', primaryColor, `Score <span class="badge">${score}</span>`);
  updateStatusElement(roundElem, 'block', primaryColor, `Round <span class="badge">${roundNum}</span>`);
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
  updateStatusElement(roundElem, 'block', primaryColor, `Round <span class="badge">${roundNum}</span>`);
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

function cardFlyInEffect() {
  const id = setInterval(flyIn, 5);
  let cardCount = 0;
  let count = 0;

  function flyIn() {
    count++;
    if (cardCount == numCards) {
      clearInterval(id);
      playGameButtonElem.style.display = 'inline-block';
    }
    if (count == 1 || count == 250 || count == 500 || count == 700) {
      cardCount++;
      let card = document.getElementById(cardCount);
      card.classList.remove('fly-in');
    }
  }
}

function removeShuffleClasses() {
  cards.forEach((card) => {
    card.classList.remove('shuffle-left');
    card.classList.remove('shuffle-right');
  });
}

function animateShuffle(shuffleCount) {
  const random1 = Math.floor(Math.random() * numCards) + 1;
  const random2 = Math.floor(Math.random() * numCards) + 1;

  let card1 = document.getElementById(random1);
  let card2 = document.getElementById(random2);

  if (shuffleCount % 4 == 0) {
    card1.classList.toggle('shuffle-left');
    card1.style.zIndex = 100;
  }
  if (shuffleCount % 10 == 0) {
    card2.classList.toggle('shuffle-right');
    card2.style.zIndex = 200;
  }
}

function shuffleCards() {
  let shuffleCount = 0;
  const id = setInterval(shuffle, 12);

  function shuffle() {
    randomizeCardPositions();
    animateShuffle(shuffleCount);

    if (shuffleCount == 500) {
      clearInterval(id);
      shufflingInProgress = false;
      removeShuffleClasses();
      dealCards();
      updateStatusElement(
        currentGameStatusElem,
        'block',
        primaryColor,
        'Please click the card that you think is the Ace of Spades...'
      );
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
  addCardsToAppropriateCell();
  const areasTemplate = returnGridAreasMappedToCardPos();

  transformGridArea(areasTemplate);
}

function returnGridAreasMappedToCardPos() {
  cardPositions.forEach((cardId, idx) => {
    const card = document.getElementById(cardId);
    const cellClass = mapIndexToGridCell(idx);
    const cellElem = document.querySelector(cellClass);
    cellElem.appendChild(card);
  });
  const areasTemplate = returnGridAreasMappedToCardPos();
  transformGridArea(areasTemplate);
}

function mapIndexToGridCell(idx) {
  if (idx === 0) return '.card-pos-a';
  if (idx === 1) return '.card-pos-b';
  if (idx === 2) return '.card-pos-c';
  if (idx === 3) return '.card-pos-d';
}

function addCardsToAppropriateCell() {
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
  addClassToElement(cardElem, 'fly-in');
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

  attachClickEventHandlerToCard(cardElem);
}

function attachClickEventHandlerToCard(card) {
  card.addEventListener('click', () => choseCard(card));
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
  if (card.id == 1) {
    return '.card-pos-a';
  } else if (card.id == 2) {
    return '.card-pos-b';
  } else if (card.id == 3) {
    return '.card-pos-c';
  } else if (card.id == 4) {
    return '.card-pos-d';
  }
}

function getSerializedObjectAsJSON(obj) {
  return JSON.stringify(obj);
}

function getObjectFromJSON(json) {
  return JSON.parse(json);
}

function updateLocalStorageItem(key, value) {
  localStorage.setItem(key, value);
}

function removeLocalStorageItem(key) {
  localStorage.removeItem(key);
}

function getLocalStorageItemValue(key) {
  return localStorage.getItem(key);
}

function updateGameObject(score, round) {
  gameObj.score = score;
  gameObj.round = round;
}

function saveGameObjectToLocalStorage(score, round) {
  updateGameObject(score, round);
  updateLocalStorageItem(localStorageGameKey, getSerializedObjectAsJSON(gameObj));
}
