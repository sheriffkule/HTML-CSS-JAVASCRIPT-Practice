// Sample book data
let books = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    year: 1925,
    pages: 180,
    description:
      'A classic novel of the Jazz Age, telling the story of the mysterious millionaire Jay Gatsby and his obsession with the beautiful Daisy Buchanan.',
    cover:
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    status: 'available',
    rating: 4.5,
  },
  {
    id: 2,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    year: 1960,
    pages: 281,
    description:
      'A gripping, heart-wrenching tale of race and identity in the American South, told through the eyes of a young girl.',
    cover:
      'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?q=80&w=1212&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D=80',
    status: 'borrowed',
    rating: 4.8,
  },
  {
    id: 3,
    title: '1984',
    author: 'George Orwell',
    genre: 'Science Fiction',
    year: 1949,
    pages: 328,
    description:
      'A dystopian social science fiction novel that examines the consequences of totalitarianism, mass surveillance, and repressive regimentation.',
    cover:
      'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80',
    status: 'available',
    rating: 4.7,
  },
  {
    id: 4,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    year: 1813,
    pages: 432,
    description:
      'A romantic novel of manners that depicts the emotional development of protagonist Elizabeth Bennet.',
    cover:
      'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80',
    status: 'available',
    rating: 4.6,
  },
  {
    id: 5,
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    year: 1937,
    pages: 310,
    description:
      'A fantasy novel about the adventures of hobbit Bilbo Baggins, who is hired as a burglar by a group of dwarves.',
    cover:
      'https://plus.unsplash.com/premium_photo-1677013622212-2cd4260dee5c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D=80',
    status: 'borrowed',
    rating: 4.9,
  },
  {
    id: 6,
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    genre: 'Non-Fiction',
    year: 2014,
    pages: 443,
    description:
      'A book that explores the history of humankind from the evolution of archaic human species in the Stone Age up to the twenty-first century.',
    cover:
      'https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    status: 'available',
    rating: 4.4,
  },
];

// DOM Elements
const booksContainer = document.getElementById('booksContainer');
const bookCount = document.getElementById('bookCount');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const filterBtns = document.querySelectorAll('.filter-btn');
const addBookBtn = document.getElementById('addBookBtn');
const bookModal = document.getElementById('bookModal');
const detailsModal = document.getElementById('detailsModal');
const bookForm = document.getElementById('bookForm');
const cancelBtn = document.getElementById('cancelBtn');
const closeModalBtns = document.querySelectorAll('.close-modal');
const borrowReturnBtn = document.getElementById('borrowReturnBtn');
const editBookBtn = document.getElementById('editBookBtn');
const deleteBookBtn = document.getElementById('deleteBookBtn');

// Current filter and search term
let currentFilter = 'all';
let currentSearchTerm = '';
let currentBookId = null;

// Initialize the app
function init() {
  renderBooks();
  setupEventListeners();
  updateBookCount();
}

// Set up event listeners
function setupEventListeners() {
  // Filter buttons
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderBooks();
    });
  });

  // Search functionality
  searchBtn.addEventListener('click', performSearch);
  searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') performSearch();
  });

  // Modal controls
  addBookBtn.addEventListener('click', openAddBookModal);
  cancelBtn.addEventListener('click', closeBookModal);
  closeModalBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      bookModal.close();
      detailsModal.close();
    });
  });

  // Book form submission
  bookForm.addEventListener('submit', handleBookSubmit);

  // Book actions
  borrowReturnBtn.addEventListener('click', () => toggleBookStatus());
  editBookBtn.addEventListener('click', openEditBookModal);
  deleteBookBtn.addEventListener('click', deleteBook);

  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === bookModal) bookModal.close();
    if (e.target === detailsModal) detailsModal.close();
  });
}

// Render books based on current filter and search
function renderBooks() {
  booksContainer.innerHTML = '';

  let filteredBooks = books;

  // Apply filter
  if (currentFilter !== 'all') {
    filteredBooks = filteredBooks.filter((book) => {
      const normalizedGenre = book.genre.toLowerCase();
      switch (currentFilter) {
        case 'available':
          return book.status === 'available';
        case 'borrowed':
          return book.status === 'borrowed';
        case 'fiction':
          return normalizedGenre === 'fiction';
        case 'non-fiction':
          return normalizedGenre === 'non-fiction' || normalizedGenre === 'nonfiction';
        default:
          return true;
      }
    });
  }

  if (currentSearchTerm) {
    const term = currentSearchTerm.toLowerCase();
    filteredBooks = filteredBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term) ||
        book.genre.toLowerCase().includes(term),
    );
  }

  if (filteredBooks.length === 0) {
    booksContainer.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-book-open"></i>
        <i class="fa-regular fa-face-frown-open"></i>
        <h3>No books found!</h3>
        <p>Try adjusting your search or filter criteria.</p>
      </div>
    `;
    updateBookCount();
    return;
  }

  filteredBooks.forEach((book) => {
    const bookElement = createBookElement(book);
    booksContainer.appendChild(bookElement);
  });

  requestAnimationFrame(() => {
    booksContainer.querySelectorAll('.book-card').forEach((card) => {
      const desc = card.querySelector('.book-description');
      const btn = card.querySelector('.btn-read-more');
      const lineHeight = parseFloat(getComputedStyle(desc).lineHeight);
      const clampedHeight = lineHeight * 2;
      desc.style.maxHeight = `${clampedHeight}px`;
      if (desc.scrollHeight <= clampedHeight) btn.style.display = 'none';
    });
  });

  updateBookCount();
}

// Create book card element
function createBookElement(book) {
  const bookElement = document.createElement('div');
  bookElement.className = 'book-card';
  bookElement.innerHTML = `
    <div class="book-cover" style="background-image: url('${book.cover}')">
      <span class="book-status ${book.status === 'available' ? 'status-available' : 'status-borrowed'}">
        ${book.status === 'available' ? 'Available' : 'Borrowed'}
      </span>
    </div>
    <div class="book-info">
      <h3 class="book-title">${book.title}</h3>
      <address class="book-author">${book.author}</address>
      <p class="book-description">${book.description}</p>
      <button class="btn-read-more">Read more</button>
      <div class="book-meta">
        <span>Year: ${book.year} • Pages: ${book.pages}</span>
        <span class="book-rating"> <i class="fas fa-star"></i> ${book.rating} </span>
      </div>
      <div class="book-actions">
        <button class="btn-borrow" data-id="${book.id}">
          ${book.status === 'available' ? 'Borrow' : 'Return'}
        </button>
        <button class="btn-details" data-id="${book.id}">Details</button>
      </div>
    </div>
  `;

  // Add event listeners to action buttons
  const readMoreBtn = bookElement.querySelector('.btn-read-more');
  const description = bookElement.querySelector('.book-description');
  const borrowBtn = bookElement.querySelector('.btn-borrow');
  const detailsBtn = bookElement.querySelector('.btn-details');

  readMoreBtn.addEventListener('click', () => {
    const isExpanded = description.classList.toggle('expanded');
    if (isExpanded) {
      description.style.maxHeight = `${description.scrollHeight}px`;
    } else {
      const lineHeight = parseFloat(getComputedStyle(description).lineHeight);
      description.style.maxHeight = `${lineHeight * 2}px`;
    }
    readMoreBtn.textContent = isExpanded ? 'Read less' : 'Read more';
  });

  borrowBtn.addEventListener('click', () => {
    toggleBookStatus(book.id);
  });

  detailsBtn.addEventListener('click', () => {
    openBookDetails(book.id);
  });

  return bookElement;
}

// Update book count display
function updateBookCount() {
  const totalBooks = books.length;
  let displayedBooks = 0;

  if (currentFilter === 'all' && !currentSearchTerm) {
    displayedBooks = totalBooks;
  } else {
    displayedBooks = booksContainer.querySelectorAll('.book-card').length;
  }

  bookCount.textContent = `${displayedBooks} of ${totalBooks} books`;
}

// Perform search
function performSearch() {
  currentSearchTerm = searchInput.value.trim();
  renderBooks();
}

// Open add book modal
function openAddBookModal() {
  currentBookId = null;
  document.getElementById('modalTitle').textContent = 'Add New Book';
  bookForm.reset();
  document.getElementById('bookId').value = '';
  bookModal.showModal();
}
function openEditBookModal() {
  const book = books.find((b) => b.id === currentBookId);
  if (!book) return;

  document.getElementById('modalTitle').textContent = 'Edit Book';
  document.getElementById('bookId').value = book.id;
  document.getElementById('bookTitle').value = book.title;
  document.getElementById('bookAuthor').value = book.author;
  document.getElementById('bookGenre').value = book.genre;
  document.getElementById('bookYear').value = book.year;
  document.getElementById('bookPages').value = book.pages;
  document.getElementById('bookDescription').value = book.description;
  document.getElementById('bookCover').value = book.cover;

  detailsModal.close();
  bookModal.showModal();
}

// Close book modal
function closeBookModal() {
  bookModal.close();
}

// Handle book form submission
function handleBookSubmit(e) {
  e.preventDefault();

  const id = document.getElementById('bookId').value;
  const title = document.getElementById('bookTitle').value;
  const author = document.getElementById('bookAuthor').value;
  const genre = document.getElementById('bookGenre').value;
  const year = parseInt(document.getElementById('bookYear').value);
  const pages = parseInt(document.getElementById('bookPages').value);
  const description = document.getElementById('bookDescription').value;
  const cover = document.getElementById('bookCover').value;

  if (id) {
    // Edit existing book
    const bookIndex = books.findIndex((b) => b.id === parseInt(id));
    if (bookIndex !== -1) {
      books[bookIndex] = {
        ...books[bookIndex],
        title,
        author,
        genre,
        year,
        pages,
        description,
        cover,
      };
    }
  } else {
    // Add new book
    const newBook = {
      id: books.length > 0 ? Math.max(...books.map((b) => b.id)) + 1 : 1,
      title,
      author,
      genre,
      year,
      pages,
      description,
      cover,
      status: 'available',
      rating: parseFloat((4 + Math.random()).toFixed(1)), // Random rating between 4.0 and 5.0
    };
    books.push(newBook);
  }

  renderBooks();
  closeBookModal();
}

// Open book details modal
function openBookDetails(id) {
  const book = books.find((b) => b.id === id);
  if (!book) return;

  currentBookId = id;

  document.getElementById('detailsTitle').textContent = book.title;
  document.getElementById('detailsBookTitle').textContent = book.title;
  document.getElementById('detailsAuthor').textContent = `by ${book.author}`;
  document.getElementById('detailsGenre').textContent = book.genre;
  document.getElementById('detailsYear').textContent = book.year;
  document.getElementById('detailsPages').textContent = `${book.pages} pages`;
  document.getElementById('detailsStatus').textContent =
    book.status === 'available' ? 'Available' : 'Borrowed';
  document.getElementById('detailsDescription').textContent = book.description;
  document.getElementById('detailsCover').setAttribute('style', `background-image: url('${book.cover}')`);

  borrowReturnBtn.textContent = book.status === 'available' ? 'Borrow' : 'Return';

  detailsModal.showModal();
}

// Toggle book status (borrow/return)
function toggleBookStatus(id = null) {
  const bookId = id || currentBookId;
  const book = books.find((b) => b.id === bookId);
  if (!book) return;

  book.status = book.status === 'available' ? 'borrowed' : 'available';

  // If we're in the details modal, update the button text
  if (detailsModal.open) {
    borrowReturnBtn.textContent = book.status === 'available' ? 'Borrow' : 'Return';
    document.getElementById('detailsStatus').textContent =
      book.status === 'available' ? 'Available' : 'Borrowed';
  }

  renderBooks();
}

// Delete book
function deleteBook() {
  if (!confirm('Are you sure you want to delete this book?')) return;

  books = books.filter((b) => b.id !== currentBookId);
  detailsModal.close();
  renderBooks();
}

// Update year in footer
function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');

  if (!yearElement) {
    console.error('Year element not found');
    return;
  }
  yearElement.setAttribute('datetime', currentYear.toString());
  yearElement.textContent = currentYear.toString();
}
updateYear();

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
