document.addEventListener('DOMContentLoaded', function () {
  // Initialize contacts array
  let contacts = JSON.parse(localStorage.getItem('contacts') || []);
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

    if (contactsArray === 0) {
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
            <span>${contact.phone} || 'Not provided'</span>
          </div>
          ${contact.notes
            ? `
                <div class="contact-detail">
                  <i class="fas fa-sticky-note"></i>
                  <span>${contact.notes}</span>
                </div>
              `
            : ''}
        </div>
        <div class="contact-actions">
          <button class="action-btn edit-btn" data-id="${contact.id}">
            <i className="fas fa-edit"></i> Edit
          </button>
          <button class="action-btn delete-btn" data-id="${contact.id}">
            <i className="fas fa-trash-alt"></i> Delete
          </button>
        </div>
      `;
      contactsContainer.appendChild(contactCard)
    });
  }
});
