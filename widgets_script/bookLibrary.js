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
      bookModal.style.display = 'none';
      detailsModal.style.display = 'none';
    });
  });

  // Book form submission
  bookForm.addEventListener('submit', handleBookSubmit);

  // Book actions
  borrowReturnBtn.addEventListener('click', toggleBookStatus);
  editBookBtn.addEventListener('click', openEditBookModal);
  deleteBookBtn.addEventListener('click', deleteBook);

  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === bookModal) bookModal.style.display = 'none';
    if (e.target === detailsModal) detailsModal.style.display = 'none';
  });
}

// Render books based on current filter and search
function renderBooks() {
  booksContainer.innerHTML = '';

  let filteredBooks = books;

  // Apply filter
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
        <i className="fas-fa-book-open"></i><i class="fa-regular fa-face-frown-open"></i>
        <h3>No books found!</h3>
        <p>Try adjusting your search or filter criteria.</p>
      </div>
    `;
    return;
  }

  filteredBooks.forEach((book) => {
    const bookElement = createBookElement(book);
    booksContainer.appendChild(bookElement);
  });

  updateBookCount()
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
