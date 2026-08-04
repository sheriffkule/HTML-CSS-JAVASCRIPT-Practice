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
const totalMedicineEl = document.getElementById('totalMedicine');
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
