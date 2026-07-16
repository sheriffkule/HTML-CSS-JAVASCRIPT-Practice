document.addEventListener('DOMContentLoaded', function () {
  // Initialize contacts array
  let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  let currentDeleteId = null;

  // DOM Elements
  const contactsContainer = document.getElementById('contactsContainer');
  const contactForm = document.getElementById('contactForm');
  const searchInput = document.getElementById('searchInput');
  const notification = document.getElementById('notification');
  const notificationText = document.getElementById('notificationText');
  const deleteModal = document.getElementById('deleteModal');
  const deleteContactName = document.getElementById('deleteContactName');
  const cancelDelete = document.getElementById('cancelDelete');
  const confirmDelete = document.getElementById('confirmDelete');
  const closeBtn = document.querySelector('.close-btn');
  const editId = document.getElementById('editId');
  const formTitle = document.getElementById('formTitle');
  const submitText = document.getElementById('submitText');
  const cancelEdit = document.getElementById('cancelEdit');

  // Render contacts
  function renderContacts(contactsArray) {
    contactsContainer.innerHTML = '';

    if (contactsArray.length === 0) {
      contactsContainer.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-user-plus"></i>
          <p>No contacts found!</p>
        </div>
      `;
      return;
    }

    contactsArray.forEach((contact) => {
      const firstLetter = contact.name.charAt(0).toUpperCase();
      const categoryClass = `category-${contact.category}`;

      const contactCard = document.createElement('div');
      contactCard.classList.add('contact-card', categoryClass);
      contactCard.innerHTML = `
        <div class="contact-header">
          <div class="contact-avatar">${firstLetter}</div>
          <div>
            <div class="contact-name">${contact.name}</div>
            <div class="contact-title">${contact.title}</div>
            <span class="category-badge ${categoryClass}">${contact.category}</span>
          </div>
        </div>
        <div class="contact-details">
          <div class="contact-detail">
            <i class="fas fa-envelope"></i>
            <span>${contact.email}</span>
          </div>
          <div class="contact-detail">
            <i class="fas fa-phone"></i>
            <span>${contact.phone || 'Not provided'}</span>
          </div>
          ${
            contact.notes
              ? `
                <div class="contact-detail">
                  <i class="fas fa-sticky-note"></i>
                  <span>${contact.notes}</span>
                </div>
              `
              : ''
          }
        </div>
        <div class="contact-actions">
          <button class="action-btn edit-btn" data-id="${contact.id}">
            <i class="fas fa-edit"></i> Edit
          </button>
          <button class="action-btn delete-btn" data-id="${contact.id}">
            <i class="fas fa-trash-alt"></i> Delete
          </button>
        </div>
      `;
      contactsContainer.appendChild(contactCard);
    });

    // Add event listeners to edit and delete buttons
    document.querySelectorAll('.edit-btn').forEach((btn) => {
      btn.addEventListener('click', function () {
        const id = this.getAttribute('data-id');
        editContact(id);
      });
    });

    document.querySelectorAll('.delete-btn').forEach((btn) => {
      btn.addEventListener('click', function () {
        const id = this.getAttribute('data-id');
        showDeleteModal(id);
      });
    });
  }

  // Generate a unique ID
  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  // Add new contact
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const notes = document.getElementById('notes').value;
    const id = editId.value || generateId();

    if (!name || !email) {
      showNotification('Please fill in required fields', true);
      return;
    }

    const contact = {
      id,
      name,
      email,
      phone,
      title,
      category,
      notes,
    };

    if (editId.value) {
      // Update existing contact
      const index = contacts.findIndex((c) => c.id === editId.value);
      if (index !== -1) {
        contacts[index] = contact;
        showNotification('Contact updated successfully!');
      }
    } else {
      // Add new contact
      contacts.push(contact);
      showNotification('Contact added successfully');
    }

    // Save to localStorage
    localStorage.setItem('contacts', JSON.stringify(contacts));

    // Reset form and re-render contacts
    contactForm.reset();
    cancelEdit.style.display = 'none';
    editId.value = '';
    formTitle.innerHTML = '<i class="fas fa-plus-circle"></i> Add New Contact';
    submitText.textContent = 'Add Contact';
    renderContacts(contacts);
  });

  // Edit contact
  function editContact(id) {
    const contact = contacts.find((c) => c.id === id);
    if (contact) {
      document.getElementById('name').value = contact.name;
      document.getElementById('email').value = contact.email;
      document.getElementById('phone').value = contact.phone || '';
      document.getElementById('title').value = contact.title || '';
      document.getElementById('category').value = contact.category;
      document.getElementById('notes').value = contact.notes || '';
      editId.value = contact.id;

      // Change form to edit mode
      formTitle.innerHTML = '<i class="fas fa-edit"></i> Edit Contact';
      submitText.textContent = 'Update Contact';
      cancelEdit.style.display = 'block';

      // Scroll to form
      document.querySelector('.contact-form').scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Cancel edit
  cancelEdit.addEventListener('click', function () {
    contactForm.reset();
    editId.value = '';
    cancelEdit.style.display = 'none';
    formTitle.innerHTML = '<i class="fas fa-plus-circle"></i> Add New Contact';
    submitText.textContent = 'Add Contact';
  });

  // Show delete confirmation modal
  function showDeleteModal(id) {
    const contact = contacts.find((c) => c.id === id);
    if (contact) {
      currentDeleteId = id;
      deleteContactName.textContent = contact.name;
      deleteModal.classList.add('show');
    }
  }

  // Close modal functions
  closeBtn.addEventListener('click', function () {
    deleteModal.classList.remove('show');
  });

  cancelDelete.addEventListener('click', function () {
    deleteModal.classList.remove('show');
  });

  // Confirm delete
  confirmDelete.addEventListener('click', function () {
    if (currentDeleteId) {
      contacts = contacts.filter((c) => c.id !== currentDeleteId);
      localStorage.setItem('contacts', JSON.stringify(contacts));
      renderContacts(contacts);
      showNotification('Contact deleted successfully');
      deleteModal.classList.remove('show');
      currentDeleteId = null;
    }
  });

  // Close modal when clicking outside
  window.addEventListener('click', function (e) {
    if (e.target === deleteModal) {
      deleteModal.classList.remove('show');
    }
  });

  // Search functionality
  searchInput.addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const filteredContacts = contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchTerm) ||
        contact.email.toLowerCase().includes(searchTerm) ||
        (contact.title && contact.title.toLowerCase().includes(searchTerm)) ||
        contact.category.toLowerCase().includes(searchTerm),
    );

    renderContacts(filteredContacts);
  });

  // Show notification
  function showNotification(message, isError = false) {
    notificationText.textContent = message;
    notification.classList.remove('error');

    if (isError) {
      notification.classList.add('error');
      notification.querySelector('i').className = 'fas fa-exclamation-circle';
    } else {
      notification.querySelector('i').className = 'fas fa-check-circle';
    }

    notification.classList.add('show');

    setTimeout(() => {
      notification.classList.remove('show');
    }, 3000);
  }

  // Initial render
  renderContacts(contacts);

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
