const subtitle = document.querySelector('.card-subtitle');

const createWord = (text, index) => {
  const word = document.createElement('span');
  word.textContent = text;
  word.classList.add('card-subtitle-word');
  word.style.transitionDelay = `${index * 50}ms`;
  return word;
};

const addWord = (word, index) => subtitle.appendChild(createWord(word, index));

const createSubtitle = (text) => {
  const words = text.split(' ');
  words.forEach(addWord);
};

createSubtitle("But in a much more real sense, I have no idea what I'm doing.");
