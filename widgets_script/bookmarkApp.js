document.addEventListener('DOMContentLoaded', function () {
  const bookmarkForm = document.getElementById('bookmark-form');
  const bookmarksGrid = document.getElementById('bookmarks-grid');
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

  function renderTags() {
    // Get all unique tags from bookmarks
    const allTags = getAllTags();

    // Clear the tags list (except the 'All' button)
    tagsList.innerHTML = '<button class="tag active" data-tag="all">All</button>';

    // Add each tag to the list
    allTags.forEach((tag) => {
      const tagElement = document.createElement('button');
      tagElement.className = 'tag';
      if (tag === currentTagFilter) {
        tagElement.classList.add('active');
      }
      tagElement.textContent = tag;
      tagElement.dataset.tag = tag;
      tagsList.appendChild(tagElement);
    });
  }

  function filterBookmarks() {
    return bookmarks.filter((bookmark) => {
      // Filter by tag
      const tagMatch = currentTagFilter === 'all' || bookmark.tags.includes(currentTagFilter);

      // Filter by search query
      const searchMatch =
        !currentSearchQuery ||
        bookmark.title.toLowerCase().includes(currentSearchQuery.toLowerCase()) ||
        bookmark.url.toLowerCase().includes(currentSearchQuery.toLowerCase()) ||
        bookmark.notes.toLowerCase().includes(currentSearchQuery.toLowerCase()) ||
        bookmark.tags.some((tag) => tag.toLowerCase().includes(currentSearchQuery.toLowerCase()));

      return tagMatch && searchMatch;
    });
  }

  function sortBookmarks(bookmarksToSort) {
    switch (currentSort) {
      case 'newest':
        return [...bookmarksToSort].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'oldest':
        return [...bookmarksToSort].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'title-asc':
        return [...bookmarksToSort].sort((a, b) => a.title.localeCompare(b.title));
      case 'title-desc':
        return [...bookmarksToSort].sort((a, b) => b.title.localeCompare(a.title));
      default:
        return bookmarksToSort;
    }
  }

  function getAllTags() {
    const tags = new Set();
    bookmarks.forEach((bookmark) => {
      bookmark.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }

  function filterByTag(e) {
    if (e.target.classList.contains('tag')) {
      // Update active tag
      document.querySelectorAll('.tag').forEach((tag) => tag.classList.remove('active'));
      e.target.classList.add('active');

      // Set current filter and re-render
      currentTagFilter = e.target.dataset.tag;
      renderBookmarks();
    }
  }

  function handleSearch() {
    currentSearchQuery = searchInput.value.trim();
    renderBookmarks();
  }

  function handleSortChange(e) {
    currentSort = e.target.value;
    renderBookmarks();
  }

  function openEditModal(bookmark) {
    document.getElementById('edit-id').value = bookmark.id;
    document.getElementById('edit-title').value = bookmark.title;
    document.getElementById('edit-url').value = bookmark.url;
    document.getElementById('edit-tags').value = bookmark.tags.join(', ');
    document.getElementById('edit-notes').value = bookmark.notes;
    editModal.style.display = 'flex';
  }

  function saveEditedBookmark(e) {
    e.preventDefault();

    const id = document.getElementById('edit-id').value;
    const title = document.getElementById('edit-title').value.trim();
    const url = document.getElementById('edit-url').value.trim();
    const tagsInput = document.getElementById('edit-tags').value.trim();
    const notes = document.getElementById('edit-notes').value.trim();

    // Validate URL
    if (!isValidUrl(url)) {
      alert('Please enter a valid URL (including http::// or https://');
      return;
    }

    //Process tags
    const tags = tagsInput
      ? tagsInput
          .split(',')
          .map((tag) => tag.trim())
          .filter((tag) => tag)
      : [];

    // Find and update the bookmark
    const index = bookmarks.findIndex((b) => b.id === id);
    if (index !== -1) {
      bookmarks[index] = {
        ...bookmarks[index],
        title,
        url: formatUrl(url),
        tags,
        notes,
        updatedAt: new Date().toISOString(),
      };

      saveBookmarks();
      renderBookmarks();
      renderTags();
      editModal.style.display = 'none';

      showToast('Bookmark updated successfully!');
    }
  }

  function deleteBookmark(id) {
    if (confirm('Are you sure you want to delete this bookmark?')) {
      bookmarks = bookmarks.filter((bookmark) => bookmark.id !== id);
      saveBookmarks();
      renderBookmarks();
      renderTags();
      updateStats();

      showToast('Bookmark deleted successfully!');
    }
  }

  function saveBookmarks() {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  function updateStats() {
    document.getElementById('total-bookmarks').textContent = bookmarks.length;
    document.getElementById('total-tags').textContent = getAllTags().length;
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  }

  function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (!icon) return;
    if (theme === 'light') {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    } else {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    }
  }

  function exportBookmarks() {
    const dataStr = JSON.stringify(bookmarks, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportName = `bookmarks-${new Date().toISOString().slice(0, 10)}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportName);
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);

    showToast('Bookmarks exported successfully!');
  }

  function importBookmarks() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const importedBookmarks = JSON.parse(event.target.result);

          if (!Array.isArray(importBookmarks())) {
            throw new Error('Invalid Bookmarks format');
          }

          // Validate each bookmark
          const validBookmarks = importBookmarks.filter((b) => b.id && b.title && b.url && isValidUrl(b.url));

          if (validBookmarks.length === 0) {
            throw new Error('No valid bookmarks found in the file');
          }

          // Add imported bookmarks (avoid duplicates by ID)
          const existingIds = bookmarks.map((b) => b.id);
          const newBookmarks = validBookmarks.filter((b) => !existingIds.includes(b.id));

          if (newBookmarks.length === 0) {
            showToast('All bookmarks in the file already exist', 'Warning');
            return;
          }

          bookmarks = [...newBookmarks, ...bookmarks];
          saveBookmarks();
          renderBookmarks();
          renderTags();
          updateStats();

          showToast(`Imported ${newBookmarks.length} bookmarks successfully!`);
        } catch (error) {
          alert(`Error importing bookmarks: ${error.message}`);
        }
      };

      reader.readAsText(file);
    };

    input.click();
  }

  function setupPreviewCard() {
    // Show preview card on hover
    document.addEventListener('mouseover', (e) => {
      const bookmarkCard = e.target.closest('.bookmark-card');
      if (bookmarkCard) {
        const id = bookmarkCard.dataset.id;
        const bookmark = bookmarks.find((b) => b.id === id);

        if (bookmark) {
          showPreview(bookmark, e.clientX, e.clientY);
        }
      }
    });

    // Hide preview card when not hovering over a bookmark
    document.addEventListener('mouseout', (e) => {
      if (!e.relatedTarget || !e.relatedTarget.closest('.bookmark-card')) {
        hidePreview();
      }
    });

    // Move preview card with mouse
    document.addEventListener('mousemove', (e) => {
      if (previewCard && previewCard.classList && previewCard.classList.contains('visible')) {
        positionPreview(e.clientX, e.clientY);
      }
    });
  }

  function showPreview(bookmark, x, y) {
    if (!previewCard) return;
    const previewTitle = previewCard.querySelector('.preview-title');
    const previewUrl = previewCard.querySelector('.preview-url');
    const previewNotes = previewCard.querySelector('.preview-notes');
    const previewTags = previewCard.querySelector('.preview-tags');

    if (previewTitle) previewTitle.textContent = bookmark.title;
    if (previewUrl) previewUrl.textContent = bookmark.url;
    if (previewNotes) previewNotes.textContent = bookmark.notes || 'No notes available';

    if (previewTags) {
      previewTags.innerHTML = '';
      if (bookmark.tags.length > 0) {
        bookmark.tags.forEach((tag) => {
          const tagElement = document.createElement('span');
          tagElement.className = 'preview-tag';
          tagElement.textContent = tag;
          previewTags.appendChild(tagElement);
        });
      } else {
        previewTags.innerHTML = '<span class="preview-tag">No tags</span>';
      }
    }

    positionPreview(x, y);
    if (previewCard && previewCard.classList) {
      previewCard.classList.add('visible');
    }
  }

  function hidePreview() {
    if (previewCard && previewCard.classList) {
      previewCard.classList.remove('visible');
    }
  }

  function positionPreview(x, y) {
    // Position the preview card slightly offset from the cursor
    const offset = 20;
    const cardWidth = previewCard.offsetWidth;
    const cardHeight = previewCard.offsetHeight;
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    // Adjust position if near the right or bottom edge of the window
    let left = x + offset;
    let top = y + offset;

    if (left + cardWidth > windowWidth) {
      left = x - cardWidth - offset;
    }

    if (top + cardHeight > windowHeight) {
      top = y - cardHeight - offset;
    }

    previewCard.style.left = `${left}px`;
    previewCard.style.top = `${top}px`;
  }

  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 100);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }

  // Helper function
  function isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  }

  function formatUrl(url) {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    return url;
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
});
