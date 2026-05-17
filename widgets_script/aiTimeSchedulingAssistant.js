// Sample task data
let tasks = [
  {
    id: 1,
    title: 'Weekly sync with the development team',
    startTime: '09:00',
    endTime: '10:00',
    priority: 'high',
    category: 'work',
  },
  {
    id: 2,
    title: 'Workout at the fitness center',
    startTime: '17:00',
    endTime: '18:30',
    priority: 'medium',
    category: 'health',
  },
  {
    id: 3,
    title: 'Learn JavaScript',
    startTime: '20:00',
    endTime: '21:30',
    priority: 'medium',
    category: 'learning',
  },
];

// DOM Elements
const taskForm = document.getElementById('taskForm');
const scheduleList = document.getElementById('scheduleList');
const timeSlots = document.getElementById('timeSlots');
const aiSuggestBtn = document.getElementById('aiSuggestBtn');
const clearBtn = document.getElementById('clearBtn');
const aiSuggestionsPanel = document.getElementById('aiSuggestionsPanel');
const suggestionsContainer = document.getElementById('suggestionsContainer');
const notification = document.getElementById('notification');
const priorityOptions = document.querySelectorAll('.priority-option');

// Stats elements
const totalTaskEl = document.getElementById('totalTasks');
const busyHoursEl = document.getElementById('busyHours');
const freeHoursEl = document.getElementById('freeHours');
const highPriorityEl = document.getElementById('highPriority');

// Initialize the app
document.addEventListener('DOMContentLoaded', function () {
  // Set default time values
  const now = new Date();
  const currHour = now.getHours().toString().padStart(2, '0');
  const nextHour = (now.getHours() + 1).toString().padStart(2, '0');

  document.getElementById('startTime').value = `${currHour}:00`;
  document.getElementById('endTime').value = `${nextHour}:00`;

  // Load tasks and render
  renderTasks();
  renderTimeSlots();
  updateStats();

  // Priority selection
  priorityOptions.forEach((option) => {
    option.addEventListener('click', function () {
      priorityOptions.forEach((opt) => opt.classList.remove('selected'));
      this.classList.add('selected');
    });
  });
});

// Form submission
taskForm.addEventListener('submit', function (e) {
  e.preventDefault();

  // Get form values
  const title = document.getElementById('taskTitle').value;
  const description = document.getElementById('taskDescription').value;
  const startTIme = document.getElementById('startTime').value;
  const endTime = document.getElementById('endTime').value;
  const category = document.getElementById('taskCategory').value;

  // Get selected priority
  const selectedPriority = document.querySelector('.priority-option.selected').getAttribute('data-value');

  // Create new task
  const newTask = {
    id: tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1,
    title,
    description,
    startTIme,
    endTime,
    priority: selectedPriority,
    category,
  };

  // Add tasks to array
  tasks.push(newTask);

  // Re-render tasks and update UI
  renderTasks();
  renderTimeSlots();
  updateStats();

  // Show notification
  showNotification('Task added successfully to your schedule!');

  // Reset form
  taskForm.reset();

  // Reset time to current hour
  const now = new Date();
  const currHour = now.getHours().toString().padStart(2, '0');
  const nextHour = (now.getHours() + 1).toString().padStart(2, '0');

  document.getElementById('startTime').value = `${currHour}:00`;
  document.getElementById('endTime').value = `${nextHour}:00`;

  // Reset priority to high
  priorityOptions.forEach((opt) => opt.classList.remove('selected'));
  document.querySelector('.priority-option.high').classList.add('selected');
});

// AI suggestions button
aiSuggestBtn.addEventListener('click', function () {
  generateAISugestions();
  aiSuggestionsPanel.style.display = 'block';
  aiSuggestionsPanel.scrollIntoView({ behavior: 'smooth' });
});

// Clear all button
clearBtn.addEventListener('click', function () {
  if (tasks.length > 0 && confirm('Are you sure you want to clear all tasks?')) {
    tasks = [];
    renderTasks();
    renderTimeSlots();
    updateStats();
    showNotification('All tasks cleared!');
  }
});

// Render tasks to the schedule list
function renderTasks() {
  if (tasks.length === 0) {
    scheduleList.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-calendar-plus"></i>
        <h3>No tasks scheduled</h3>
        <p>Add your first task using the form on the left.</p>
      </div>
    `;
    return
  }

  // Sort tasks by start time
  tasks.sort((a, b) => {
    return a.startTime.localeCompare(b.startTime)
  })

  let tasksHTML = ''

  tasks.forEach(task => {
    const startTimeFormatted = formatTime(task.startTime)
    const endTImeFOrmatted = formatTime(task.endTime)

    tasksHTML += html`
    <div class="schedule-item" data-id="${task.id}">
      <div class="schedule-item-header">
        <div class="schedule-title"${task.title}></div>
        <div class="schedule-time">${startTimeFormatted} - ${endTImeFOrmatted}</div>
      </div>
    </div>
    `
  })
}
