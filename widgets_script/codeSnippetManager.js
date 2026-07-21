// Sample data for initial snippets
const initialSnippets = [
  {
    id: 1,
    title: 'Fibonacci Sequence',
    description: 'Generate Fibonacci sequence up to n terms',
    category: 'Algorithms',
    language: 'python',
    code: 'def fibonacci(n):\n      sequence = [0, 1]\n     for i in range(2, n):\n     sequence.append(sequence[i-1] + sequence[i-2])      return sequence\n\n# Example usage\nprint(fibonacci(10))',
    createdAt: '2026-10-15',
  },
  {
    id: 2,
    title: 'Array Shuffle',
    description: 'Fisher-Yates algorithm for shuffling an array',
    category: 'JavaScript',
    language: 'javascript',
    code: 'function shuffleArray(array) {\n     for (let i = array.length - 1; i > 0; i--) {\n      const j = Math.floor(Math.random() * (i + 1));\n        [array[i], array[j], array[i];\n    }\n     return array;\n}\n\n// Example usage\nconst myArray = [1, 2, 3, 4, 5];\nconsole.log(shuffleArray(myArray));',
    createdAt: '2026-10-10',
  },
  {
    id: 3,
    title: 'Responsive Navbar',
    description: 'CSS for a responsive navigation bar',
    category: 'CSS',
    language: 'css',
    code: '.navbar {\n      display: flex;\n        justify-content: space-between:\n       align-items: center;\n      padding: 1rem 2rem;\n       background-color: #333;\n       color: white;\n}\n\n.nav-links {\n      display: flex;\n    gap: 2rem;\n}\n\n@media (max-width: 768px) {\n      .nav-links {\n      display: none;\n    }\n     \n      .mobile-menu-btn {\n        display: block;\n   }/n}',
    createdAt: '2026-10-05',
  },
  {
    id: 4,
    title: 'Helper function for fetching data from API with error handling',
    category: 'JavaScript',
    language: 'javascript',
    code: "async function fetchData(url, options = {}) {\n      try {\n     const response = await fetch(url, {\n       headers: {\n        'Content-type': 'application/json',\n        ...options.headers\n        },\n        ...options\n        });\n       \n      if (!response.ok) {\n       throw new Error(`HTTP error! Status: ${response.status}`);\n        }\n     \n      return await response.json();\n     } catch (error) {\n     console.error('Fetch error:', error);\n     throw error;\n      }\n}\n\n// Example usage\nconst data = await fetchData('https://api.example.com/data');",
    createdAt: '2026-10-01',
  },
];

// Application state
let snippets = JSON.parse(localStorage.getItem('codeSnippets')) || initialSnippets;
let currentCategory = 'all';
let editingSnippetId = null;
let searchQuery = '';

// DOM Elements
const snippetsContainer = document.getElementById('snippetsContainer');
const categoriesList = document.getElementById('categoriesList');
const snippetModal = document.getElementById('snippetModal');
const viewSnippetModal = document.getElementById('viewSnippetModal');
const addSnippetBtn = document.getElementById('addSnippetBtn');
const closeModalBtn = document.getElementById('closeModal');
const closeViewModalBtn = document.getElementById('closeViewModal');
const cancelBtn = document.getElementById('cancelBtn');
const saveSnippetBtn = document.getElementById('saveSnippetBtn');
const snippetForm = document.getElementById('snippetForm');
const searchInput = document.getElementById('searchInput');
const snippetCategorySelect = document.getElementById('snippetCategory');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');
const totalSnippetsEl = document.getElementById('totalSnippets');
const totalLanguagesEl = document.getElementById('totalLanguages');
const lastAddedEl = document.getElementById('lastAdded');
const currentCategoryEl = document.getElementById('currentCategory');
const copyCodeBtn = document.getElementById('copyCodeBtn');
const closeViewBtn = document.getElementById('closeViewBtn');
const editSnippetBtn = document.getElementById('editSnippetBtn');

// Initialize the app\
function initApp() {
  renderCategories();
  renderSnippets();
  updateStats();
  populateCategorySelect();

  // Event listeners
  addSnippetBtn.addEventListener('click', openAddModal);
  closeModalBtn.addEventListener('click', closeModal);
  closeViewModalBtn.addEventListener('click', closeViewModal);
  cancelBtn.addEventListener('click', closeModal);
  saveSnippetBtn.addEventListener('click', saveSnippet);
  searchInput.addEventListener('input', handleSearch);
  copyCodeBtn.addEventListener('click', copyCodeToClipboard);
  closeViewBtn.addEventListener('click', closeViewModal);
  editSnippetBtn.addEventListener('click', editCurrentSnippet);

  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === snippetModal) closeModal();
    if (e.target === viewSnippetModal) closeViewModal();
  });
}

// Render categories in sidebar
function renderCategories() {
  const categories = ['all', 'JavaScript', 'Python', 'CSS', 'HTML', 'Algorithms', 'Utilities'];
  const categoryCounts = {};

  // Counts snippets per category
  snippets.forEach((snippet) => {
    categoryCounts[snippet.category] = (categoryCounts[snippet.category] || 0) + 1;
  });

  categoriesList.innerHTML = '';

  categories.forEach((category) => {
    const count = category === 'all' ? snippets.length : categoryCounts[category] || 0;
    const isActive = category === currentCategory ? 'active' : '';

    const categoryItem = document.createElement('li');
    categoryItem.className = `category-item ${isActive}`;
    categoryItem.innerHTML = `
      <span>${category === 'all' ? 'All Snippets' : category}</span>
      <span class="category-count">${count}</span>
    `;

    categoryItem.addEventListener('click', () => {
      currentCategory = category;
      currentCategoryEl.textContent = category === 'all' ? 'All Snippets' : category;
      document.querySelectorAll('.category-item').forEach((item) => item.classList.remove('active'));
      categoryItem.classList.add('active');
      renderSnippets();
    });

    categoriesList.appendChild(categoryItem);
  });
}

// Render snippets based on current category and search
function renderSnippets() {
  let filteredSnippets = snippets;

  // Filter by category
  if (currentCategory !== 'all') {
    filteredSnippets = filteredSnippets.filter((snippet) => snippet.category === currentCategory);
  }

  // Filter by search query
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredSnippets = filteredSnippets.filter(
      (snippet) =>
        snippet.title.toLowerCase().includes(query) ||
        snippet.description.toLowerCase().includes(query) ||
        snippet.code.toLowerCase().includes(query) ||
        snippet.language.toLowerCase().includes(query),
    );
  }

  snippetsContainer.innerHTML = '';

  if (filteredSnippets.length === 0) {
    snippetsContainer.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-code"></i>
        <h3>No snippets fond.</h3>
        <p>
          ${searchQuery} ? 'Try a different search term' : 'Click "Add Snippet" to create your first code
          snippet.'
        </p>
        ${
          !searchQuery
            ? '<button class="btn btn-primary" id="addFirstSnippetBtn"><i class="addFirstSnippetBtn"></i> Add your First Snippet</button>'
            : ''
        }
      </div>
    `;

    if (!searchQuery) {
      document.getElementById('addFirstSnippetBtn').addEventListener('click', openAddModal);
    }
    return
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
