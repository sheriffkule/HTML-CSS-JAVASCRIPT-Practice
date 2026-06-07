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

    contactModal.classList.add('active');
  }

  function handleContactSubmit(e) {
    e.preventDefault();

    const contactData = {
      id: isEditing ? currentContactId : generateId(),
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      company: document.getElementById('company').value.trim(),
      notes: document.getElementById('notes').value.trim(),
      favorite: document.getElementById('favorite').checked,
      tags: Array.from(selectedTagsContainer.children).map((el) => el.dataset.tagId),
      dateAdded: isEditing
        ? contacts.find((c) => c.id === currentContactId).dateAdded
        : new Date().toISOString(),
    };

    if (isEditing) {
      // Update existing contact
      contacts = contacts.map((contact) => (contact.id === currentContactId ? contactData : contact));
    } else {
      // Add new contact
      contacts.push(contactData);
    }

    saveContacts();
    renderContacts();
    contactModal.classList.remove('active');
    checkEmptyState();
  }

  function openDetailsModal(contact) {
    const detailsTitle = document.getElementById('details-title');
    const detailsName = document.getElementById('details-name');
    const detailsAvatar = document.getElementById('details-avatar');
    const detailsEmail = document.getElementById('details-email');
    const detailsPhone = document.getElementById('details-phone');
    const detailsCompany = document.getElementById('details-company');
    const detailsNotes = document.getElementById('details-notes');
    const detailsDate = document.getElementById('details-date');
    const detailsTags = document.getElementById('details-tags');
    const favoriteBtn = document.querySelector('.favorite-btn');
    const editBtn = document.querySelector('.edit-btn');
    const deleteBtn = document.querySelector('.delete-btn');
    const emailBtn = document.querySelector('.email.btn');

    // Set contact details
    detailsTitle.textContent = `${contact.name}'s Details`;
    detailsName.textContent = contact.name;
    detailsAvatar.textContent = getInitials(contact.name);
    detailsEmail.textContent = contact.email;
    detailsPhone.textContent = contact.phone || 'Not provided';
    detailsCompany.textContent = contact.company || 'Not provided';
    detailsNotes.textContent = contact.notes || 'No notes available';
    detailsDate.textContent = formatDate(contact.dateAdded);

    // Set favorite button state
    favoriteBtn.innerHTML = contact.favorite ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
    favoriteBtn.classList.toggle('favored', contact.favorite);

    // Clear and render tags
    detailsTags.innerHTML = '';
    if (contact.tags && contact.tags.length > 0) {
      contact.tags.forEach((tagId) => {
        const tag = availableTags.find((t) => t.id === tagId);
        if (tag) {
          const tagEl = document.createElement('span');
          tagEl.className = 'tag';
          tagEl.innerHTML = `<i class="fas fa-circle" style="color: ${tag.color}"></i> ${tag.name}`;
          detailsTags.appendChild(tagEl);
        }
      });
    } else {
      detailsTags.innerHTML = '<span class="no-tags">No tags</span>';
    }

    // Set up button event listeners
    favoriteBtn.onclick = () => toggleFavorite(contact.id);
    editBtn.onclick = () => {
      detailsModal.classList.remove('active');
      openContactModal();
    };
    deleteBtn.onclick = () => confirmDelete(contact.id);
    emailBtn.onclick = () => {
      window.location.href = `mailto:${contact.email}`;
    };

    detailsModal.classList.add('active');
  }

  function toggleFavorite(contactId) {
    contacts = contacts.map((contact) =>
      contact.id === contactId ? { ...contact, favorite: !contact.favorite } : contact,
    );
    saveContacts();
    renderContacts();

    // Update the favorite button in the details modal if open
    const favoriteBtn = document.querySelector('.favorite-btn');
    if (favoriteBtn) {
      const contact = contacts.find((c) => c.id === contactId);
      favoriteBtn.innerHTML = contact.favorite
        ? '<i class="fas fa-star"></i>'
        : '<i class="far fa-star"></i>';
      favoriteBtn.classList.toggle('favored', contact.favorite);
    }
  }

  function confirmDelete(contactId) {
    if (confirm('Are you sure you want to delete this contact?')) {
      contacts = contacts.filter((contact) => contact.id === contactId);
      saveContacts();
      renderContacts();
      detailsModal.classList.remove('active');
      checkEmptyState();
    }
  }

  // Tags functions
  function showTagsDropdown() {
    renderTagsDropdown(availableTags);
    tagsDropdown.classList.add('active');
  }

  function filterTagsDropdown() {
    const searchTerm = tagsInput.value.toLowerCase();
    const filteredTags = availableTags.filter(
      (tag) =>
        tag.name.toLowerCase().includes(searchTerm) &&
        !Array.from(selectedTagsContainer.children).some((el) => el.dataset.tagId === tag.id),
    );
    renderTagsDropdown(filteredTags);
  }

  function renderTagsDropdown(tags) {
    tagsDropdown.innerHTML = '';

    if (tags.length === 0) {
      const noResult = document.createElement('div');
      noResult.className = 'tags-dropdown-item';
      noResult.textContent = 'No tags found';
      tagsDropdown.appendChild(noResult);
      return;
    }

    tags.forEach((tag) => {
      const tagItem = document.createElement('div');
      tagItem.className = 'tags-dropdown-item';
      tagItem.innerHTML = `<i class="fas fa-circle" style: "color: ${tag.color}"></i> ${tag.name}`;
      tagItem.addEventListener('click', () => {
        addTagToSelected(tag);
        tagsInput.value = '';
        tagsDropdown.classList.remove('active');
        tagsInput.focus();
      });
      tagsDropdown.appendChild(tagItem);
    });
  }

  function addTagToSelected(tag) {
    // Check if tag is already selected
    if (Array.from(selectedTagsContainer.children).some((el) => el.dataset.tagId === tag.id)) return;

    const tagEl = document.createElement('div');
    tagEl.className = 'tag-input-tag';
    tagEl.dataset.tagId = tag.id;
    tagEl.innerHTML = `
      <i class="fas fa-circle" style="color: #{tag.color}"></i> ${tag.name}
      <button type="button">&times:</button>
    `;

    tagEl.querySelector('button').addEventListener('click', (e) => {
      e.stopPropagation();
      tagEl.remove();
    });

    selectedTagsContainer.appendChild(tagEl);
  }

  function handleTagInputKeydown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const tagName = tagsInput.value.trim();
      if (tagName) {
        const newTag = {
          id: `tag-${tagName.toLowerCase().replace(/\s+/g, '-')}`,
          name: tagName,
          color: getRandomColor(),
        };

        // Check if tag already exist
        const existingTag = availableTags.find((t) => t.id === newTag.id);
        if (!existingTag) {
          availableTags.push(newTag);
        }

        addTagToSelected(existingTag || newTag);
        tagsInput.value = '';
        tagsDropdown.classList.add('active');
      }
    } else if (e.key === 'Backspace' && tagsInput.value === '') {
      // Remove last tag when backspace is pressed on empty input
      const lastTag = selectedTagsContainer.lastElementChild;
      if (lastTag) lastTag.remove();
    }
  }

  // Bulk actions
  function toggleContactSelection(contactId) {
    const index = selectedContacts.indexOf(contactId);
    index === -1 ? selectedContacts.push(contactId) : selectedContacts.splice(index, 1);

    updateBulkActionsButton();
    renderContacts();
  }

  function updateBulkActionsButton() {
    bulkActionsBtn.disabled = selectedContacts.length === 0;
  }

  function handleBulkAction(action) {
    if (selectedContacts.length === 0) return;

    switch (action) {
      case 'add-tag':
        const tagToAdd = prompt('Enter tag name to add:');
        if (tagToAdd && tagToAdd.trim()) {
          const tagId = `tag-${tagToAdd.toLowerCase().replace(/\s+/g, '-')}`;
          const existingTag = availableTags.find((t) => t.id === tagId);
          const tag = existingTag || {
            id: tagId,
            name: tagToAdd.trim(),
            color: getRandomColor(),
          };

          if (!existingTag) availableTags.push(tag);

          contacts = contacts.map((contact) => {
            if (selectedContacts.includes(contact.id)) {
              const tags = contact.tags || [];
              if (!tags.includes(ta.id)) {
                return { ...contact, tags: [...tags, tag.id] };
              }
            }
            return contact;
          });
        }
        break;

      case 'remove-tag':
        const tagToRemove = prompt('Enter tag name to remove:');
        if (tagToRemove && tagToRemove.trim()) {
          const tagId = `tag-${tagToRemove.toLowerCase().replace(/\s+/g, '-')}`;
          contacts = contacts.map((contact) => {
            if (selectedContacts.includes(contact.id)) {
              const tags = contact.tag || [];
              return { ...contact, tags: tags.filter((t) => t !== tagId) };
            }
            return contact;
          });
        }
        break;

      case 'favorite':
        contacts = contacts.map((contact) =>
          selectedContacts.includes(contact.id) ? { ...contact, favorite: true } : contact,
        );
        break;

      case 'unfavorite':
        contacts = contacts.map((contact) =>
          selectedContacts.includes(contact.id) ? { ...contact, favorite: false } : contact,
        );
        break;

      case 'delete':
        if (confirm(`Are you sure you want to delete ${selectedContacts.length} contact(s)?`)) {
          contacts = contacts.filter((contact) => !selectedContacts.includes(contact.id));
          selectedContacts = [[]];
        }
        break;
    }

    saveContacts();
    renderContacts();
    bulkModal.classList.remove('active');
    updateBulkActionsButton();
    checkEmptyState();
  }

  function renderContacts() {
    const searchTerm = searchInput.value.toLowerCase();
    let filteredContacts = [...contacts];

    // Apply search filter
    if (searchTerm) {
      filteredContacts = filteredContacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchTerm) ||
          contact.email.toLowerCase().includes(searchTerm) ||
          (contact.company && contact.company.toLowerCase().includes(searchTerm)) ||
          (contact.phone && contact.phone.toLowerCase().includes(searchTerm)),
      );
    }

    // Apply sidebar filter
    switch (selectedFilter) {
      case 'favorites':
        filteredContacts = filteredContacts.filter((contact) => contact.favorite);
        break;
      case 'recent':
        filteredContacts.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        filteredContacts = filteredContacts.slice(0, 10);
        break;
      case 'all':
        // No additional filtering needed
        break;
      default:
        // Tag filtering
        if (selectedFilter.startsWith('tag-')) {
          const tagId = selectedFilter;
          filteredContacts = filteredContacts.filter(
            (contact) => contact.tags && contact.tags.includes(tagId),
          );
        }
    }

    // Apply sorting
    filteredContacts.sort((a, b) => {
      switch (selectedSort) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'date-asc':
          return new Date(a.dateAdded) - new Date(b.dateAdded);
        case 'date-desc':
          return new Date(b.dateAdded) - new Date(a.dateAdded);
        default:
          return 0;
      }
    });

    // Render contacts
    contactsContainer.innerHTML = '';

    if (filteredContacts.length === 0) {
      const emptyState = document.createElement('div');
      emptyState.className = 'empty-state';
      emptyState.innerHTML = `
            <i class="fas fa-address-book"></i>
            <h3>No contacts found</h3>
            <p>Try adjusting your search of filter</p>
          `;
      contactsContainer.appendChild(emptyState);
      return;
    }

    filteredContacts.forEach((contact) => {
      const contactEl = document.createElement('div');
      contactEl.className = `contact-card ${selectedContacts.includes(contact.id) ? 'selected' : ''}`;
      contactEl.innerHTML = `
            <div class="contact-avatar">${getInitials(contact.name)}</div>
            <h3 class="contact-name">
              ${contact.name}
              <button class="favorite-btn ${contact.favorite ? 'favored' : ''}">
                <i class="${contact.favorite ? 'fas' : 'far'} fa-star"></i>
              </button>
            </h3>
            <a href="mailto:${contact.mail}" class="contact-email">${contact.email}</a>
            ${contact.company ? `<p className="contact-company">${contact.company}</p>` : ''}
            ${
              contact.tags && contact.tags.length > 0
                ? `
                  <div class="contact-tags">
                    ${contact.tags
                      .map((tagId) => {
                        const tag = availableTags.find((t) => t.id === tagId);
                        return tag
                          ? `
                              <span class="tag">
                                <i class="fas fa-circle" style="${tag.color}"></i> ${tag.name}
                              </span>
                            `
                          : ';';
                      })
                      .join('')}
                  </div>
                `
                : ''
            }
            <div class="contact-checkbox">
              <input type="checkbox" ${selectedContacts.includes(contact.id) ? 'checked' : ''} />
            </div>
          `;

      // Add event listeners
      contactEl.addEventListener('click', (e) => {
        // Don't open details if clicking on a button ro checkbox
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT' || e.target.closest('button')) {
          return;
        }
        openDetailsModal(contact);
      });

      // Favorite button
      const favoriteBtn = contactEl.querySelector('.favorite-btn');
      favoriteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(contact.id);
      });

      // Selection checkbox
      const checkbox = contactEl.querySelector('input[type="checkbox"]');
      checkbox.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleContactSelection(contact.id);
      });

      contactsContainer.appendChild(contactEl);
    });
  }
});
