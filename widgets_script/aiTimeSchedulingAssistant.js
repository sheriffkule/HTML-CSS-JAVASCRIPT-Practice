// Sample task data
const STORAGE_KEY = 'aiTimeSchedulingAssistantTasks';

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

function loadTasks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return tasks;
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : tasks;
  } catch (error) {
    console.warn('Could not load saved tasks:', error);
    return tasks;
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

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

  // Load tasks from storage and render
  tasks = loadTasks();
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
  const startTime = document.getElementById('startTime').value;
  const endTime = document.getElementById('endTime').value;
  const category = document.getElementById('taskCategory').value;

  // Get selected priority
  const selectedOption = document.querySelector('.priority-option.selected');
  const selectedPriority = selectedOption ? selectedOption.getAttribute('data-value') : 'high';

  // Create new task
  const newTask = {
    id: tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1,
    title,
    description,
    startTime,
    endTime,
    priority: selectedPriority,
    category,
  };

  // Add task to array and persist
  tasks.push(newTask);
  saveTasks();

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
  generateAISuggestions();
  aiSuggestionsPanel.style.display = 'block';
  aiSuggestionsPanel.scrollIntoView({ behavior: 'smooth' });
});

// Clear all button
clearBtn.addEventListener('click', function () {
  if (tasks.length > 0 && confirm('Are you sure you want to clear all tasks?')) {
    tasks = [];
    saveTasks();
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
    return;
  }

  // Sort tasks by start time
  tasks.sort((a, b) => {
    return a.startTime.localeCompare(b.startTime);
  });

  let tasksHTML = '';

  tasks.forEach((task) => {
    const startTimeFormatted = formatTime(task.startTime);
    const endTImeFOrmatted = formatTime(task.endTime);

    tasksHTML += `
      <div class="schedule-item" data-id="${task.id}">
        <div class="schedule-item-header">
          <div class="schedule-title">${task.title}</div>
          <div class="schedule-time">${startTimeFormatted} - ${endTImeFOrmatted}</div>
        </div>
        <div class="schedule-desc">${task.description}</div>
        <div class="schedule-priority priority-${task.priority}">${task.priority.toUpperCase()} PRIORITY</div>
        <button class="delete-btn" onclick="deleteTask(${task.id})">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;
  });

  scheduleList.innerHTML = tasksHTML;
}

// Render time slots visualization
function renderTimeSlots() {
  let timeSlotsHTML = '';

  // Create time slots from 6 AM to 10 PM
  for (let hour = 6; hour <= 22; hour++) {
    const timeLabel = `${hour.toString().padStart(2, '0')}:00`;
    const slotStart = hour * 60;
    const slotEnd = slotStart + 60;

    // Check if there's a task at this time
    const taskAtThisTime = tasks.find((task) => {
      const taskStartMinutes = parseTimeToMinutes(task.startTime);
      const taskEndMinutes = parseTimeToMinutes(task.endTime);
      return slotStart < taskEndMinutes && slotEnd > taskStartMinutes;
    });

    let slotClass = 'empty';
    let slotContent = 'Free';

    if (taskAtThisTime) {
      slotClass = `priority-${taskAtThisTime.priority}`;
      slotContent = taskAtThisTime.title;
    }

    timeSlotsHTML += `
      <div class="time-slot">
        <div class="time-label">${formatTime(timeLabel)}</div>
        <div class="slot-content ${slotClass}">${slotContent}</div>
      </div>
    `;
  }

  timeSlots.innerHTML = timeSlotsHTML;
}

// General AI suggestions
function generateAISuggestions() {
  const suggestions = [
    {
      id: 1,
      title: 'Optimize Schedule Gaps',
      description:
        'You have a 2-hour gap between meetings at 2 PM. Consider adding a focused work session or a short break.',
      impact: 'High',
      timeSave: '45 min',
    },
    {
      id: 2,
      title: 'Batch SImilar Tasks',
      description: 'Group your reading and research tasks together to improve focus and efficiency',
      impact: 'Medium',
      timeSave: '30 min',
    },
    {
      id: 3,
      title: 'Add Buffer Time',
      description: 'Schedule 15-minute buffers between meetings to prevent overruns and reduce stress.',
      impact: 'High',
      timeSave: '1 Hour',
    },
    {
      id: 4,
      title: 'Schedule Deep Work',
      description:
        'Reserve your most productive hours (9-11AM) for important, focused work without interruptions',
      impact: 'High',
      timeSave: '2 hours',
    },
  ];

  let suggestionsHTML = '';

  suggestions.forEach((suggestion) => {
    suggestionsHTML += `
      <div class="suggestion-card">
        <div class="suggestion-header">
          <div class="suggestion-title">${suggestion.title}</div>
          <div class="suggestion-ai-badge">AI Suggestion</div>
        </div>
        <div class="suggestion-desc">${suggestion.description}</div>
        <div class="suggestion-stats">
          <div><strong>Impact:</strong> ${suggestion.impact}</div>
          <div><strong>Time Save:</strong> ${suggestion.timeSave}</div>
        </div>
      </div>
    `;
  });

  suggestionsContainer.innerHTML = suggestionsHTML;
}

// Delete a task
function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  saveTasks();
  renderTasks();
  renderTimeSlots();
  updateStats();
  showNotification('Task deleted successfully!');
}

// Update statistics
function updateStats() {
  // Total tasks
  totalTaskEl.textContent = tasks.length;

  // Busy hours
  let busyMinutes = 0;
  tasks.forEach((task) => {
    const startMinutes = parseTimeToMinutes(task.startTime);
    const endMinutes = parseTimeToMinutes(task.endTime);
    busyMinutes += Math.max(0, endMinutes - startMinutes);
  });

  const busyHours = busyMinutes / 60;
  busyHoursEl.textContent = Number.isInteger(busyHours) ? busyHours : busyHours.toFixed(1);

  // Free hours
  const freeHours = Math.max(0, 24 - busyHours);
  freeHoursEl.textContent = Number.isInteger(freeHours) ? freeHours : freeHours.toFixed(1);

  // High priority tasks
  const highPriorityTasks = tasks.filter((task) => task.priority === 'high').length;
  highPriorityEl.textContent = highPriorityTasks;
}

function parseTimeToMinutes(time24) {
  const [hours, minutes] = time24.split(':').map(Number);
  return hours * 60 + minutes;
}

// Show notification
function showNotification(message) {
  notification.textContent = message;
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

// Format time from 24h to 12h format
function formatTime(time24) {
  const [hours, minutes] = time24.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
}

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
