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
  }
});
