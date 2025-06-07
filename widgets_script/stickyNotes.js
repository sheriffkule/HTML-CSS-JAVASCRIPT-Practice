const createBox = document.getElementsByClassName('createBox')[0];
const notes = document.getElementsByClassName('notes')[0];
const input = document.getElementById('userInput');
let i = 0;
const storageKey = 'notes';

input.addEventListener('keydown', content);

document.getElementById('create').addEventListener('click', function () {
  createBox.style.display = 'block';
});

function loadNotes() {
  const storedNotes = localStorage.getItem(storageKey);
  if (storedNotes) {
    const notesArray = JSON.parse(storedNotes);
    notesArray.forEach((noteText) => {
      if (noteText && noteText.trim() !== '') {
        divStyle(noteText);
      }
    });
  }
}

function saveNotes() {
  const notesArray = Array.from(notes.children)
    .map((note) => {
      const h3 = note.querySelector('h3');
      return h3 ? h3.textContent : '';
    })
    .filter((note) => note != '');
  localStorage.setItem(storageKey, JSON.stringify(notesArray));
}

function content(e) {
  if (e.key === 'Enter') {
    const text = input.value.trim();
    divStyle(text);
    input.value = '';
    createBox.style.display = 'none';
    saveNotes();
  }
}

function color() {
  let randomColors = ['#8BC34A', '#03A9F4', '#FFC107', '#9C27B0', '#fe4b74', '#ff5909'];

  if (i > randomColors.length - 1) {
    i = 0;
  }
  return randomColors[i++];
}

function divStyle(text) {
  const div = document.createElement('div');
  div.className = 'note';
  div.setAttribute('draggable', 'true');
  div.innerHTML = `
  <div class="details">
    <h3>${text}</h3>
  </div>`;

  const h3 = div.querySelector('h3');
  h3.contentEditable = 'true';
  h3.addEventListener('blur', saveNotes);
  h3.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      h3.blur();
    }
  });

  div.addEventListener('dblclick', () => {
    div.remove();
    saveNotes();
  });

  div.setAttribute('style', 'background: ' + color() + '');

  div.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', Array.from(notes.children).indexOf(div));
    div.classList.add('dragging');
  });

  div.addEventListener('dragend', () => {
    div.classList.remove('dragging');
  });

  div.addEventListener('dragover', (e) => {
    e.preventDefault();
    div.classList.add('drag-over');
  });

  div.addEventListener('dragleave', () => {
    div.classList.remove('drag-over');
  });

  div.addEventListener('drop', (e) => {
    e.preventDefault();
    div.classList.remove('drag-over');
    const fromIndex = e.dataTransfer.getData('text/plain');
    const toIndex = Array.from(notes.children).indexOf(div);
    if (fromIndex === toIndex) return;

    const noteNodes = Array.from(notes.children);
    const dragged = noteNodes[fromIndex];
    if (fromIndex < toIndex) {
      notes.insertBefore(dragged, noteNodes[toIndex].nextSibling);
    } else {
      notes.insertBefore(dragged, noteNodes[toIndex]);
    }
    saveNotes();
  });

  notes.appendChild(div);
}

function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');
  yearElement.dateTime = currentYear;
  yearElement.textContent = currentYear;
}

updateYear();
loadNotes();

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
