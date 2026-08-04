// Sample data for demonstration
let medicines = JSON.parse(localStorage.getItem('medicines')) || [
  {
    id: 1,
    name: 'Paracetamol',
    type: 'Tablet',
    dosage: '500mg',
    frequency: 'Three times daily',
    time: '08:00',
    startDate: '2026-07-01',
    endDate: '2026-07-10',
    notes: 'take after meals',
    status: 'active',
    nextDose: '08:00',
  },
  {
    id: 2,
    name: 'Vitamin C',
    type: 'Capsule',
    dosage: '1000mg',
    frequency: 'Once daily',
    time: '09:00',
    startDate: '2026-07-01',
    endDate: '',
    notes: 'With breakfast',
    status: 'active',
    nextDose: '09:00',
  },
  {
    id: 3,
    name: 'Amoxicillin',
    type: 'Capsule',
    dosage: '250mg',
    frequency: 'Twice daily',
    time: '20:00',
    startDate: '2026-06-20',
    endDate: '2026-06-30',
    notes: 'Course completed',
    status: 'completed',
    nextDose: '',
  },
];

// DOM Elements
const medicineForm = document.getElementById('medicineForm');
const medicineGrid = document.getElementById('medicineGrid');
const activeMedicineGrid = document.getElementById('activeMedicineGrid');
const completedMedicineGrid = document.getElementById('completedMedicineGrid');
const upcomingReminders = document.getElementById('upcomingReminders');
const totalMedicinesEl = document.getElementById('totalMedicines');
const todayRemindersEl = document.getElementById('todayReminders');
const currentTimeEl = document.getElementById('currentTime');
const notification = document.getElementById('notification');
const notificationMessage = document.getElementById('notificationMessage');
const closeNotification = document.getElementById('closeNotification');
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

// Initialize the app
document.addEventListener('DOMContentLoaded', function () {
  updateCurrentTime();
  setInterval(updateCurrentTime, 60000); // Update time every minute
  renderMedicines();
  renderUpcomingReminders();
  updateStats();
  checkReminders();
  setInterval(checkReminders, 60000); // Check reminders every minute

  // Set today's date as default for start date
  document.getElementById('startDate').valueAsDate = new Date();
});

// Update current time
function updateCurrentTime() {
  const now = new Date();
  currentTimeEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Form submission
medicineForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const medicine = {
    id: medicines.length > 0 ? Math.max(...medicines.map((m) => m.id)) + 1 : 1,
    name: document.getElementById('medicineName').value,
    type: document.getElementById('medicineType').value,
    dosage: document.getElementById('dosage').value,
    frequency: document.getElementById('frequency').value,
    time: document.getElementById('time').value,
    startDate: document.getElementById('startDate').value,
    endDate: document.getElementById('endDate').value,
    notes: document.getElementById('notes').value,
    status: 'active',
    nextDose: document.getElementById('time').value,
  };

  medicines.push(medicine);
  saveToLocalStorage();
  renderMedicines();
  renderUpcomingReminders();
  updateStats();

  // Show success notification
  showNotification('Medicine Added', `${medicine.name} has been added successfully!`, 'success');

  // Reset form
  medicineForm.reset();
  document.getElementById('startDate').valueAsDate = new Date();
});

// Render medicine
function renderMedicines() {
  // Clear existing content
  medicineGrid.innerHTML = '';
  activeMedicineGrid.innerHTML = '';
  completedMedicineGrid.innerHTML = '';

  if (medicines.length === 0) {
    medicineGrid.innerHTML = `
      <div class="">
        <i class="fas fa-pills"></i>
        <h3>No medicines added yer</h3>
        <p>Click the "Add Medicine" button to get started</p>
      </div>
    `;
    return;
  }

  medicines.forEach((medicine) => {
    const medicineCard = createMedicineCard(medicine);

    // Add to all medicines tab
    medicineGrid.appendChild(medicineCard.cloneNode(true));

    // Add to appropriate status bar
    if (medicine.status === 'active') {
      activeMedicineGrid.appendChild(medicineCard.cloneNode(true));
    } else if (medicine.status === 'completed') {
      completedMedicineGrid.appendChild(medicineCard.cloneNode(true));
    }
  });
}

function createMedicineCard(medicine) {
  const card = document.createElement('div');
  card.className = 'medicine-card';
  card.dataset.id = medicine.id;

  card.innerHTML = `
    <div class="medicine-header">
      <div class="medicine-name">${medicine.name}</div>
      <div class="medicine-type">${medicine.type}</div>
    </div>
    <div class="medicine-details">
      <div class="medicine-detail">
        <i class="fas fa-prescription-bottle-alt"></i>
        <span>Dosage: ${medicine.dosage}</span>
      </div>
      <div class="medicine-detail">
        <i class="fas fa-clock"></i>
        <span>Frequency: ${medicine.frequency}</span>
      </div>
      <div class="medicine-detail">
        <i class="fas fa-calendar-day"></i>
        <span>Time: ${formatDate(medicine.time)}</span>
      </div>
      <div class="medicine-detail">
        <i class="fas fa-calendar-alt"></i>
        <span>Start: ${formatDate(medicine.startDate)}</span>
      </div>
      ${
        medicine.endDate
          ? `
            <div class="medicine-detail">
              <i class="fas fa-calendar-times"></i>
              <span>End: ${formatDate(medicine.endDate)}</span>
            </div>
          `
          : ''
      }
    </div>
    <div class="medicine-actions">
      <button class="btn-edit" onclick="editMedicine(${medicine.id})">
        <i class="fas fa-edit"></i> Edit
      </button>
      <button class="btn-delete" onclick="deleteMedicine(${medicine.id})">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `;

  return card;
}

// Render upcoming reminders
function renderUpcomingReminders() {
  upcomingReminders.innerHTML = '';

  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  // Get active medicines with upcoming doses
  const upcoming = medicines
    .filter((medicine) => medicine.status === 'active')
    .map((medicine) => {
      const reminderTime = medicine.time.split(':');
      const reminderMinutes = parseInt(reminderTIme[0]) * 60 + parseInt(reminderTime[1]);

      return { ...medicine, reminderMinutes };
    })
    .filter((medicine) => medicine.reminderMinutes >= currentTime)
    .sort((a, b) => a.reminderMinutes - b.reminderMinutes)
    .slice(0, 3); // Show only next 3 reminders

  if (upcoming.length === 0) {
    upcomingReminders.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-bell-slash"></i>
        <h3>no upcoming reminders</h3>
        <p>All reminders for today are completed.</p>
      </div>
    `;
    return;
  }
}

// Utility functions
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}
