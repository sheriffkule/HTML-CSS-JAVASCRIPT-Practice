const cardObjectDefinition = [
  { id: 1, imagePath: '/images/card-KingHearts.png' },
  { id: 2, imagePath: '/images/card-JackClubs.png' },
  { id: 3, imagePath: '/images/card-QueenDiamonds.png' },
  { id: 4, imagePath: '/images/card-AceSpades.png' },
];

const cardBackImgPath = '/images/card-back-blue.png';

const cardContainerElem = document.querySelector('.card-container');

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

  addSrcToImageElem(cardBackElem, cardBackImgPath);

  addSrcToImageElem(cardFrontElem, cardItem.imagePath);

  addClassToElement(cardFrontImg, 'card-img');

  addClassToElement(cardBackImg, 'card-img');

  addChildElement(cardFrontElem, cardFrontImg);

  addChildElement(cardBackElem, cardBackImg);

  addChildElement(cardInnerElem, cardFrontElem);

  addChildElement(cardInnerElem, cardBackElem);

  addChildElement(cardElem, cardInnerElem);

  
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
