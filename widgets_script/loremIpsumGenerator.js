const baseSentences = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  'Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.',
  'Sed nisi. Nulla quis sem at nibh elementum imperdiet.',
  'Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.',
  'Mauris massa. Vestibulum lacinia arcu eget nulla.',
  'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
];

const paragraphInput = document.getElementById('paragraphs');
const lengthSelect = document.getElementById('length');
const customWordsInput = document.getElementById('customWords');
const generateBtn = document.getElementById('generate');
const copyBtn = document.getElementById('copy');
const clearBtn = document.getElementById('clear');
const darkModeBtn = document.getElementById('darkMode');
const output = document.getElementById('output');
const paraCount = document.getElementById('paraCount');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateParagraph(length, customWords) {
  let numSentences;
  switch (length) {
    case 'short':
      numSentences = getRandomInt(2, 3);
      break;
    case 'medium':
      numSentences = getRandomInt(4, 6);
      break;
    case 'long':
      numSentences = getRandomInt(7, 10);
      break;
    default:
      numSentences = 4;
  }

  let sentencesPool = [...baseSentences];
  if (customWords.length > 0) {
    const customSentences = customWords.map((word) => `This paragraph contains the word "${word.trim()}".`);
    sentencesPool.push(...customSentences);
  }

  let paragraph = '';
  for (let i = 0; i < numSentences; i++) {
    const randomIndex = getRandomInt(0, sentencesPool.length - 1);
    paragraph += sentencesPool[randomIndex] + ' ';
  }
  return paragraph.trim();
}

paragraphInput.addEventListener('input', () => {
  paraCount.textContent = paragraphInput.value;
});

function livePreview() {
  output.innerHTML = '';
  const numParagraphs = parseInt(paragraphInput.value);
  const length = lengthSelect.value;
  const customWords = customWordsInput.value ? customWordsInput.value.split(',') : [];
  for (let i = 0; i < numParagraphs; i++) {
    const p = document.createElement('p');
    p.textContent = generateParagraph(length, customWords);
    output.appendChild(p);
  }
  output.scrollTop = output.scrollHeight;
}

paragraphInput.addEventListener('change', livePreview);
lengthSelect.addEventListener('change', livePreview);
customWordsInput.addEventListener('input', livePreview);
generateBtn.addEventListener('click', livePreview);

copyBtn.addEventListener('click', () => {
  const text = output.innerText;
  if (text.trim() === '') {
    alert('Nothing To copy!');
    return;
  }
  navigator.clipboard.writeText(text).then(() => alert('Copied to clipboard!'));
});

clearBtn.addEventListener('click', () => (output.innerHTML = ''));
darkModeBtn.addEventListener('click', () => document.body.classList.toggle('dark'));

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

updateYear()
