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
  import { favorite } from '../projects/stockPlatform/js/favorite';

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

  // Theme functions
  function toggleTheme() {
    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }

  function setTheme(theme) {
    document.body.classList.toggle('dark-mode', theme === 'dark');
    localStorage.setItem('theme', theme);

    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }

  function openContactModal(contact = null) {
    isEditing = contact !== null;
    currentContactId = contact ? contact.id : null;

    modalTitle.textContent = isEditing ? 'Edit Contact' : 'Add New Contact';
    contactIdInput.value = isEditing ? contact.id : '';
    document.getElementById('name').value = isEditing ? contact.name : '';
    document.getElementById('email').value = isEditing ? contact.email : '';
    document.getElementById('phone').value = isEditing ? contact.phone || '' : '';
    document.getElementById('company').value = isEditing ? contact.company || '' : '';
    document.getElementById('notes').value = isEditing ? contact.notes || '' : '';
    document.getElementById('favorite').checked = isEditing ? contact.favorite || false : false;

    // Clear and render selected tags
    selectedTagsContainer.innerHTML = '';
    if (isEditing && contact.tags) {
      contact.tags.forEach((tagId) => {
        const tag = availableTags.find((t) => t.id === tagId);
        if (tag) addTagToSelected(tag);
      });
    }

    contactModal.classList.add('active')
  }
});
