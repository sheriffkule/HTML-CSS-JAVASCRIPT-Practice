document.addEventListener('DOMContentLoaded', () => {
  const submitBookingBtn = document.getElementById('submitBookingBtn');
  const bookingList = document.querySelector('#bookingList tbody');
  const deleteModal = document.querySelector('#deleteModal');
  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
  const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
  let bookings = [];
  let editIndex = -1;
  let deleteIndex = -1;
  const loadBookings = () => {
    const storedBookings = localStorage.getItem('bookings');
    if (storedBookings) bookings = JSON.parse(storedBookings);
    renderBookings();
  };
  const saveBookings = () => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  };
  const renderBookings = () => {
    bookingList.innerHTML = '';
    bookings.forEach((booking, index) => {
      const row = document.createElement('tr');
      row.innerHTML = ` <td>${booking.name}</td>
        <td>${booking.email}</td>
        <td>${booking.bookingDate}</td>
        <td>
          <button class="btn btn-primary edit_btn" data-index="${index}">Edit</button>
          <button class="btn delete_btn primary_btn" data-index="${index}">Delete</button>
        </td>`;
      bookingList.appendChild(row);
    });
  };
  const clearForm = () => {
    document.querySelector('#name').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#bookingDate').value = '';
    editIndex = -1;
  };
  submitBookingBtn.onclick = () => {
    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const bookingDate = document.querySelector('#bookingDate').value.trim();
    if (name && email && bookingDate) {
      if (editIndex === -1) {
        bookings.push({ name, email, bookingDate });
      } else {
        bookings[editIndex] = { name, email, bookingDate };
        editIndex = -1;
      }
      saveBookings();
      renderBookings();
      clearForm();
    }
  };
  bookingList.onclick = (e) => {
    const index = parseInt(e.target.dataset.index, 10);
    if (e.target.classList.contains('delete_btn')) {
        deleteIndex = index;
        deleteModal.style.display = 'flex';
    } else if (e.target.classList.contains('edit_btn')) {
      const booking = bookings[index];
      document.querySelector('#name').value = booking.name;
      document.querySelector('#email').value = booking.email;
      document.querySelector('#bookingDate').value = booking.bookingDate;
      editIndex = index;
    }
  };
  confirmDeleteBtn.onclick = () => {
    bookings.splice(deleteIndex, 1);
    saveBookings();
    renderBookings();
    deleteModal.style.display = 'none';
  }
    cancelDeleteBtn.onclick = () => {
        deleteModal.style.display = 'none';
        deleteIndex = -1;
    };
    loadBookings();
});
