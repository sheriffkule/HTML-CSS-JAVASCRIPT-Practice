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
    title: 'API Fetch Helper',
    description: 'Helper function for fetching data from API with error handling',
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
    return;
  }

  filteredSnippets.forEach((snippet) => {
    const snippetCard = document.createElement('div');
    snippetCard.className = 'snippet-card';
    snippetCard.innerHTML = `
      <div class="snippet-header">
        <div>
          <h3 class="snippet-title">${snippet.title}</h3>
          <span class="snippet-language">${snippet.language}</span>
        </div>
        <div style="color: var(--gray-300); font-size: 14px">${formatDate(snippet.createdAt)}</div>
      </div>
      <p class="snippet-description">${snippet.description}</p>
      <div class="snippet-code">${escapeHtml(snippet.code)}</div>
      <div class="snippet-actions">
        <button class="action-btn view" data-id="${snippet.id}"><i class="fas fa-eye"></i> View</button>
        <button class="action-btn edit" data-id="${snippet.id}"><i class="fas fa-edit"></i> Edit</button>
        <button class="action-btn delete" data-id="${snippet.id}"><i class="fas fa-trash"></i> Delete</button>
      </div>
    `;

    snippetsContainer.appendChild(snippetCard);
  });

  // Add event listeners to action buttons
  document.querySelectorAll('.action-btn.view').forEach((btn) => {
    btn.addEventListener('click', (e) => viewSnippet(e.target.dataset.id));
  });

  document.querySelectorAll('.action-btn.edit').forEach((btn) => {
    btn.addEventListener('click', (e) => openEditModal(e.target.dataset.id));
  });

  document.querySelectorAll('.action-btn.delete').forEach((btn) => {
    btn.addEventListener('click', (e) => deleteSnippet(e.target.dataset.id));
  });
}

// Update Statistics
function updateStats() {
  totalSnippetsEl.textContent = snippets.length;

  // Count unique languages
  const languages = new Set(snippets.map((snippet) => snippet.language));
  totalLanguagesEl.textContent = languages.size;

  // Get most recent snippet
  if (snippets.length > 0) {
    const latest = snippets.reduce((latest, snippet) =>
      new Date(snippet.createdAt) > new Date(latest.createdAt) ? snippet : latest,
    );
    lastAddedEl.textContent = formatDate(latest.createdAt);
  } else {
    lastAddedEl.textContent = '';
  }
}

// Populate category select in modal
function populateCategorySelect() {
  const categories = ['JavaScript', 'Python', 'CSS', 'HTML', 'Algorithms', 'Utilities'];
  snippetCategorySelect.innerHTML = '';

  categories.forEach((category) => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    snippetCategorySelect.appendChild(option);
  });
}

// Open modal for adding a new snippet
function openAddModal() {
  editingSnippetId = null;
  document.getElementById('modalTitle').textContent = 'Add New Snippet';
  snippetForm.reset();
  snippetModal.classList.add('active');
  document.getElementById('snippetCode').value = '';
}

// Open modal for editing a snippet
function openEditModal(id) {
  editingSnippetId = id;
  const snippet = snippets.find((s) => s.id == id);

  if (!snippet) return;

  document.getElementById('modalTitle').textContent = 'Edit Snippet';
  document.getElementById('snippetTitle').value = snippet.title;
  document.getElementById('snippetDescription').value = snippet.description;
  document.getElementById('snippetCategory').value = snippet.category;
  document.getElementById('snippetLanguage').value = snippet.language;
  document.getElementById('snippetCode').value = snippet.code;

  snippetModal.classList.add('active');
}

// View snippet details
function viewSnippet(id) {
  const snippet = snippets.find((s) => s.id == id);

  if (!snippet) return;

  document.getElementById('snippetTitle').textContent = snippet.title;
  document.getElementById('snippetDescription').textContent = snippet.description;
  document.getElementById('snippetCategory').textContent = snippet.category;
  document.getElementById('snippetLanguage').textContent = snippet.language;

  // Format and display code
  const codeElement = document.getElementById('viewSnippetCode');
  codeElement.textContent = snippet.code;

  // Store current snippet ID for edit button
  editSnippetBtn.dataset.id = id;

  viewSnippetModal.classList.add('active');
}

// Edit current viewer snippet
function editCurrentSnippet() {
  closeViewModal();
  openEditModal(editSnippetBtn.dataset.id);
}

// Close add/edit modal
function closeModal() {
  snippetModal.classList.remove('active');
  editingSnippetId = null;
}

// Close view modal
function closeViewModal() {
  viewSnippetModal.classList.remove('active');
}

// Save snippet (add or update)
function saveSnippet() {
  const title = document.getElementById('snippetTitle').value.trim();
  const description = document.getElementById('snippetDescription').value.trim();
  const category = document.getElementById('snippetCategory').value;
  const language = document.getElementById('snippetLanguage').value;
  const code = document.getElementById('snippetCode').value.trim();

  if (!title || !description || !category || !language || !code) {
    showToast('Please fill in all fields!', 'error');
    return;
  }

  if (editingSnippetId) {
    // Update existing snippet
    const index = snippets.findIndex((s) => (s.id = editingSnippetId));
    snippets[index] = {
      ...snippets[index],
      title,
      description,
      category,
      language,
      code,
    };

    showToast('Snippet updated successfully');
  } else {
    // Add new snippet
    const newId = snippets.length > 0 ? Math.max(...snippets.map((s) => s.id)) + 1 : 1;
    const newSnippet = {
      id: newId,
      title,
      description,
      category,
      language,
      code,
      createdAt: new Date().toISOString().split('T')[0],
    };

    snippets.push(newSnippet);
    showToast('Snippet added successfully');
  }

  // Save to localStorage
  localStorage.setItem('codeSnippets', JSON.stringify(snippets));

  // Update UI
  renderCategories();
  renderSnippets();
  updateStats();
  closeModal();
}

// Delete snippet
function deleteSnippet(id) {
  if (!confirm('Are you sure you want to delete this snippet?')) return;

  snippets = snippets.filter((s) => s.id != id);
  localStorage.setItem('codeSnippets', JSON.stringify(snippets));

  renderCategories();
  renderSnippets();
  updateStats();
  showToast('Snippet deleted successfully', 'warning');
}

function handleSearch(e) {
  searchQuery = e.target.value.toLowerCase();
  renderSnippets();
}

// Handle search
function copyCodeToClipboard() {
  const code = document.getElementById('viewSnippetCode').textContent;
  navigator.clipboard
    .writeText(code)
    .then(() => showToast('Code copied to clipboard'))
    .catch((err) => showToast('Failed to copy code', 'error'));
}

// Show toast notification
function showToast(message, type = 'success') {
  toastMessage.textContent = message;
  toast.className = 'toast';
  toast.classList.add(type, 'show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Utility functions
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Export and import functionality (simplified)
document.getElementById('exportBtn').addEventListener('click', () => {
  const dataStr = JSON.stringify(snippets, null, 2);
  const dataUri = 'data:application/json:charset=utf-8,' + encodeURIComponent(dataStr);

  const exportFileDefaultName = 'code-snippets.json';

  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();

  showToast('Snippets exported successfully');
});

document.getElementById('importBtn').addEventListener('click', () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';

  input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedSnippets = JSON.parse(event.target.result);

        // Add imported snippets with new IDs
        const maxId = snippets.length > 0 ? Math.max(...snippets.map((s) => s.id)) : 0;
        importedSnippets.forEach((snippet, index) => {
          snippet.id = maxId + index + 1;
          if (!snippet.createdAt) snippet.createdAt = new Date().toISOString().split('T')[0];
        });

        snippets = [...snippet, ...importedSnippets];
        localStorage.setItem('codeSnippets', JSON.stringify(snippets));

        renderCategories();
        renderSnippets();
        updateStats();

        showToast(`${importedSnippets.length} snippets imported successfully`);
      } catch (error) {
        showToast('Failed to import snippets. Invalid file format.', 'error');
      }
    };

    reader.readAsText(file);
  });

  input.click();
});

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
document.addEventListener('DOMContentLoaded', initApp);
