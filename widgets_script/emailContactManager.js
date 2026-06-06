document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const themeToggle = document.getElementById('theme-toggle');
  const addContactBtn = document.getElementById('add-contact-btn');
  const emptyAddBtn = document.getElementById('empty-add-btn');
  const searchInput = document.getElementById('search-contacts');
  const sortSelect = document.getElementById('sort-contacts');
  const bulkActionsBtn = document.getElementById('bulk-actions-btn');
  const contactsContainer = document.getElementById('contacts-container');
  const contactsTitle = document.getElementById('contacts-title');
  const allCount = document.getElementById('all-count');
  const favCount = document.getElementById('fav-count');
  const sidebarItems = document.querySelectorAll('sidebar-menu li');
  const contactForm = document.getElementById('contact-form');
  const contactModal = document.getElementById('contact-modal');
  const detailsModal = document.getElementById('details-modal');
  const bulkModal = document.getElementById('bulk-modal');
  const closeButtons = document.querySelectorAll('.close-button');
  const modalTitle = document.getElementById('modal-title');
  const contactIdInput = document.getElementById('contact-id');
  const selectedTagsContainer = document.getElementById('selected-tags');
  const tagsInput = document.getElementById('tags-input');
  const tagsDropdown = document.getElementById('tags-dropdown');
  const addTagBtn = document.getElementById('add-tag-btn');

  // State
  let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  let selectedFilter = 'all';
  let selectedSort = 'name-asc';
  let selectedContacts = [];
  let isEditing = false;
  let currentContactId = null;

  // Available tags
  const availableTags = [
    { id: 'tag-work', name: 'Work', color: '#4caf50' },
    { id: 'tag-family', name: 'Family', color: '#2196f3' },
    { id: 'tag-friends', name: 'Friends', color: '#ff9800' },
    { id: 'tag-business', name: 'Business', color: '#9c27b0' },
    { id: 'tag-important', name: 'Important', color: '#f44336' },
  ];

  // Initialize the app
  function init() {
    renderContacts();
    updateCounts();
    setupEventListeners();
    checkEmptyState();

    // Set theme from localStorage or prefer-color-scheme
    const savedTheme =
      localStorage.getItem('them') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);
  }

  // Set up event listeners
  function setupEventListeners() {
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);

    // Add contact buttons
    addContactBtn.addEventListener('click', () => openContactModal());
    emptyAddBtn.addEventListener('click', () => openContactModal());

    // Search input
    searchInput.addEventListener('input', () => {
      renderContacts();
      checkEmptyState();
    });

    // Sort select
    sortSelect.addEventListener('change', (e) => {
      selectedSort = e.target.value;
      renderContacts();
    });

    //  Sidebar filters
    sidebarItems.forEach((item) => {
      item.addEventListener('click', () => {
        sidebarItems.forEach((i) => i.classList.remove('active'));
        item.classList.add('active');
        selectedFilter = item.dataset.filter;
        contactsTitle.textContent = item.textContent.trim();
        renderContacts();
        checkEmptyState();
      });
    });

    // Bulk actions
    bulkActionsBtn.addEventListener('click', () => {
      bulkModal.classList.add('active');
    });

    // Modal close buttons
    closeButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        contactModal.classList.remove('active');
        detailsModal.classList.remove('active');
        bulkModal.classList.remove('active');
      });
    });

    // Contact form submission
    contactForm.addEventListener('submit', handleContactSubmit);

    // Tags input
    tagsInput.addEventListener('focus', showTagsDropdown);
    tagsInput.addEventListener('input', filterTagsDropdown);
    tagsInput.addEventListener('keydown', handleTagInputKeydown);

    // Add tag button
    addTagBtn.addEventListener('click', () => {
      const tagName = prompt('Enter a new tag name:');
      if (tagName && tagName.trim()) {
        const newTag = {
          id: `tag-${tagName.toLowerCase().replace(/\s+/g, '-')}`,
          name: tagName.trim(),
          color: getRandomColor(),
        };
        availableTags.push(newTag);
        renderTagsDropdown(availableTags);
      }
    });

    // Bulk actions modal
    document.querySelectorAll('.bulk-option').forEach((option) => {
      option.addEventListener('click', () => {
        const action = option.dataset.action;
        handleBulkAction(action);
      });
    });

    // Click outside modal to close
    window.addEventListener('click', (e) => {
      if (e.target === contactModal) contactModal.classList.remove('active');
      if (e.target === detailsModal) detailsModal.classList.remove('active');
      if (e.target === bulkModal) bulkModal.classList.remove('active');
    });
  }
});
