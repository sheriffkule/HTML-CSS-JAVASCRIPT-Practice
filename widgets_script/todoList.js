const inputBox = document.querySelector('#inputBox');
const list = document.querySelector('#list');

loadListFromLocalStorage();

inputBox.addEventListener('keyup', handleEnterKeyPress);

function handleEnterKeyPress(event) {
  if (event.key === 'Enter') {
    const inputValue = inputBox.value.trim();
    if (inputValue) {
      addItem(inputValue);
      inputBox.value = '';
    }
  }
}

function addItem(inputValue) {
  const listItem = document.createElement('li');
  listItem.innerHTML = `${inputValue} <i></i>`;

  listItem.addEventListener('click', toggleDoneClass);

  listItem.querySelector('i').addEventListener('click', removeListItem);

  list.appendChild(listItem);

  saveListToLocalStorage();
}

function toggleDoneClass(event) {
  if (event.target.tagName === 'LI') {
    event.target.classList.toggle('done');
    saveListToLocalStorage();
  }
}

function removeListItem(event) {
  event.stopPropagation();
  const listItem = event.target.parentNode;
  listItem.remove();
  saveListToLocalStorage();
}

function loadListFromLocalStorage() {
  const storedList = localStorage.getItem('todoList');
  if (storedList) {
    const listItems = JSON.parse(storedList);
    listItems.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `${item.text} <i></i>`;
      listItem.classList.toggle('done', item.done);
      listItem.addEventListener('click', toggleDoneClass);
      listItem.querySelector('i').addEventListener('click', removeListItem);
      list.appendChild(listItem);
    });
  }
}

function saveListToLocalStorage() {
  const listItems = Array.from(list.children);
  const todoList = listItems.map((item) => ({
    text: item.textContent.replace('<i></i>', ''),
    done: item.classList.contains('done'),
  }));
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

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
  let container = document.querySelector('.container')
  container.appendChild(e);

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

function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');
  yearElement.dateTime = currentYear;
  yearElement.textContent = currentYear;
}

updateYear();
