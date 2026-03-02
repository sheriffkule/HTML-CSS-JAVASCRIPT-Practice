document.addEventListener('DOMContentLoaded', function () {
  const bookmarkForm = document.getElementById('bookmark-form');
  const bookmarksGrid = document.getElementById('bookmark-grid');
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  const tagsList = document.getElementById('tags-list');
  const sortSelect = document.getElementById('sort-select');
  const themeToggle = document.getElementById('theme-toggle');
  const importBtn = document.getElementById('import-btn');
  const exportBtn = document.getElementById('export-btn');
  const editModal = document.getElementById('edit-modal');
  const closeModal = document.querySelector('.close-modal');
  const editForm = document.getElementById('edit-form');
  const previewCard = document.getElementById('preview-card');

  // State
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  let currentTagFilter = 'all';
  let currentSearchQuery = '';
  let currentSort = 'newest';

  // Initialize the app
  init();

  function init() {
    // Load saved theme from local storage
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('theme', savedTheme);
    updateThemeIcon(savedTheme);

    // Render bookmarks and tags
    renderBookmarks();
    renderTags();

    // Update stats
    updateStats();

    // Event listeners
    bookmarkForm.addEventListener('submit', addBookmark);
    searchInput.addEventListener('input', handleSearch);
    searchBtn.addEventListener('click', handleSearch);
    tagsList.addEventListener('click', filterByTag);
    sortSelect.addEventListener('change', handleSortChange);
    themeToggle.addEventListener('click', toggleTheme);
    importBtn.addEventListener('click', importBookmarks);
    exportBtn.addEventListener('click', exportBookmarks);
    closeModal.addEventListener('click', () => (editModal.style.display = 'none'));
    editForm.addEventListener('submit', saveEditedBookmark);
    window.addEventListener('click', (e) => {
      if (e.target === editModal) editModal.style.display = 'none';
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        document.getElementById('bookmark-title').focus();
      }
    });

    // Preview card setup
    setupPreviewCard();
  }

  function addBookmark(e) {
    e.preventDefault();

    const title = document.getElementById('bookmark-title').value.trim();
    const url = document.getElementById('bookmark-url').value.trim();
    const tagsInput = document.getElementById('bookmark-tags').value.trim();
    const notes = document.getElementById('bookmark-notes').value.trim();

    // Validate URL
    if (!isValidUrl(url)) {
      alert('Please enter a valid URL (including http:// or https://)');
      return;
    }

    // Process tags
    const tags = tagsInput
      ? tagsInput
          .split(',')
          .map((tag) => tag.trim())
          .filter((tag) => tag)
      : [];

    // Create new bookmark
    const newBookmark = {
      id: Date.now().toString(),
      title,
      url: formatUrl(url),
      tags,
      notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Add to bookmarks array
    bookmarks.unshift(newBookmark);
    saveBookmarks();

    // Reset form
    bookmarkForm.reset();

    // Re-render bookmarks and tags
    renderBookmarks();
    renderTags();
    updateStats();

    // Show feedback
    showToast('Bookmark added successfully!');
  }

  function renderBookmarks() {
    // Filter and sort bookmarks
    let filteredBookmarks = filterBookmarks();
    filteredBookmarks = sortBookmarks(filteredBookmarks);

    // Clear the grid
    bookmarksGrid.innerHTML = '';

    // Update title
    const bookmarksTitle = document.getElementById('bookmarks-title');
    if (currentTagFilter !== 'all') {
      bookmarksTitle.textContent = `Bookmarks tagged with ${currentTagFilter}`;
    } else if (currentSearchQuery) {
      bookmarksTitle.textContent = `Search results for ${currentSearchQuery}`;
    } else {
      bookmarksTitle.textContent = 'All Bookmarks';
    }

    // Display empty state if no bookmarks
    if (filteredBookmarks.length === 0) {
      const emptyState = document.createElement('div');
      emptyState.className = 'empty-state';
      emptyState.innerHTML = `
        <i class="fas fa-bookmark empty-icon"></i>
        <h3>No bookmarks found</h3>
        <p>Try adjusting your search ar filter.</p>
      `;
      bookmarksGrid.appendChild(emptyState);
      return;
    }

    // Create bookmark cards
    filteredBookmarks.forEach((bookmark) => {
      const bookmarkCard = document.createElement('div');
      bookmarkCard.className = 'bookmark-card';
      bookmarkCard.dataset.id = bookmark.id;

      const formattedDate = new Date(bookmark.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      });

      bookmarkCard.innerHTML = `
        <div class="bookmark-header">
          <h3 class="bookmark-title">${bookmark.title}</h3>
          <div class="bookmark-url">${bookmark.url}</div>
        </div>
        <div class="bookmark-content">
          ${bookmark.notes ? `<div class="bookmark-notes">${bookmark.notes}</div>` : ''}
          ${
            bookmark.tags.length > 0
              ? `<div class="bookmark-tags">
        ${bookmark.tags.map((tag) => `<span class="bookmark-tag">${tag}</span>`).join('')}
        </div>
        `
              : ''
          }
        </div>
        <div class="bookmark-footer">
          <div class="bookmark-date">${formattedDate}</div>
          <div class="bookmark-actions">
            <button class="bookmark-action edit-btn" title="Edit">
              <i class="fas fa-edit"></i>
            </button>
            <button class="bookmark-action delete-btn" title="Delete">
              <i class="fas fa-trash"></i>
            </button>
            <a href="${bookmark.url}" target="_blank" class="bookmark-action" title="Visit">
              <i class="fas fa-external-link-alt"></i>
            </a>
          </div>
        </div>
      `;

      bookmarksGrid.appendChild(bookmarkCard);

      // Add event listeners to action buttons
      const editBtn = bookmarkCard.querySelector('.edit-btn');
      const deleteBtn = bookmarkCard.querySelector('.delete-btn');

      editBtn.addEventListener('click', () => openEditModal(bookmark));
      deleteBtn.addEventListener('click', () => deleteEditModal(bookmark.id));
    });
  }
});
