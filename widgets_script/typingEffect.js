const typingElement = document.getElementById('typingElement');
const textInput = document.getElementById('textInput');
const speedInput = document.getElementById('speedInput');
const fontSelect = document.getElementById('fontSelect');
const colorInput = document.getElementById('colorInput');
const colorValue = document.getElementById('colorValue');
const charCount = document.getElementById('charCount');
const typingCursor = document.querySelector('.typing-cursor');

const MAX_CHARS = 70;

function updateCharCount() {
  const remaining = MAX_CHARS - textInput.value.length;
  charCount.textContent = `${textInput.value.length}/${MAX_CHARS}`;
  charCount.style.color = remaining < 10 ? '#e74c3c' : '#777';
}

function applySettings() {
  let text = textInput.value;
  if (text.length > MAX_CHARS) {
    text = text.substring(0, MAX_CHARS);
    textInput.value = text;
  }

  const speed = parseFloat(speedInput.value);
  const font = fontSelect.value;
  const color = colorInput.value;

  const tempSpan = document.createElement('span');
  tempSpan.style.visibility = 'hidden';
  tempSpan.style.whiteSpace = 'nowrap';
  tempSpan.style.fontFamily = font;
  tempSpan.style.fontSize = window.getComputedStyle(typingElement).fontSize;
  tempSpan.textContent = text;
  document.body.appendChild(tempSpan);

  const textWidth = tempSpan?.offsetWidth;
  document.body.removeChild(tempSpan);

  typingElement.textContent = text;
  typingElement.style.fontFamily = font;
  typingElement.style.setProperty('--text-width', `${textWidth}px`);

  typingElement.style.animation = 'none';
  void typingElement.offsetWidth;
  typingElement.style.animation = `typing ${speed}s steps(${text.length}) forwards`;

  typingCursor.style.backgroundColor = color;

  updateThemeColor(color);
  updateCharCount();
}

function updateThemeColor(color) {
  const r = parseInt(color.substr(1, 2), 16);
  const g = parseInt(color.substr(3, 2), 16);
  const b = parseInt(color.substr(5, 2), 16);

  const primary = color;
  const secondary = `rgb(${Math.max(0, r - 30)}, ${Math.max(0, g - 30)}, ${Math.max(0, b - 30)})`;
  const accent = `rgb(${Math.min(255, r + 30)}, ${Math.min(255, g + 30)}, ${Math.min(255, b + 20)})`;

  document.documentElement.style.setProperty('--primary', primary);
  document.documentElement.style.setProperty('--secondary', secondary);
  document.documentElement.style.setProperty('--accent', accent);

  colorValue.textContent = primary;
}

document.addEventListener('DOMContentLoaded', function () {
  textInput.addEventListener('input', updateCharCount);
  updateCharCount();

  applySettings();
});

function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');
  yearElement.dateTime = currentYear;
  yearElement.textContent = currentYear;
}

updateYear();

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
  let wrapper = document.querySelector('.wrapper')
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