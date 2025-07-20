const bookTitleInput = document.getElementById('book-title');
const bookAuthorInput = document.getElementById('book-author');
const addBookBtn = document.getElementById('add-book');
const bookList = document.getElementById('book-list');

addBookBtn.addEventListener('click', () => {
  const title = bookTitleInput.value.trim();
  const author = bookAuthorInput.value.trim();

  if (title === '' || author === '') {
    alert('Please enter both title and author.');
    return;
  }

  addBook(title, author);
  bookTitleInput.value = '';
  bookAuthorInput.value = '';
});

function addBook(title, author) {
  const li = document.createElement('li');

  const details = document.createElement('span');
  details.className = 'details';
  details.textContent = `${title} by ${author}`;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => {
    li.remove();
    saveToLocalStorage();
  });
  li.appendChild(details);
  li.appendChild(deleteBtn);
  bookList.appendChild(li);
  saveToLocalStorage();
}

function exportListAsTxt() {
  const books = Array.from(bookList.children).map((li) => {
    const details = li.querySelector('.details').textContent;
    return details;
  });
  const text = books.join('\n');
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'book-list.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

document.getElementById('export-txt').addEventListener('click', exportListAsTxt);

window.addEventListener('DOMContentLoaded', () => {
  const books = JSON.parse(localStorage.getItem('books')) || [];
  books.forEach((book) => addBook(book.title, book.author));
});

function saveToLocalStorage() {
  const books = Array.from(bookList.children).map((li) => {
    const details = li.querySelector('.details').textContent;
    const [title, author] = details.split(' by ');
    return { title, author };
  });
  localStorage.setItem('books', JSON.stringify(books));
}

function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');

  if (yearElement) {
    yearElement.setAttribute('datetime', currentYear.toString());
    yearElement.dateTime = currentYear;
    yearElement.textContent = currentYear.toString();
  }
}

updateYear();
