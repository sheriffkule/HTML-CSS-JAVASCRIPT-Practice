// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const searchInput = document.getElementById('searchInput');
const filterSelect = document.getElementById('filterSelect');
const taskTitle = document.getElementById('taskTitle');
const taskCategory = document.getElementById('taskCategory');
const taskPriority = document.getElementById('taskPriority');
const taskDue = document.getElementById('taskDue');
const taskDescription = document.getElementById('taskDescription');
const addTaskBtn = document.getElementById('addTaskBtn');
const tasksList = document.getElementById('tasksList');
const taskCount = document.getElementById('taskCount');
const suggestionsList = document.getElementById('suggestionsList');
const insightsContent = document.getElementById('insightsContent');
const aiCategorizeBtn = document.getElementById('aiCategorizeBtn');
const aiSuggestDateBtn = document.getElementById('aiSuggestDateBtn');
const generateSuggestionsBtn = document.getElementById('generateSuggestionsBtn');
const generateInsightsBtn = document.getElementById('generateInsightsBtn');
const aiProcessing = document.getElementById('aiProcessing');

// State
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';
let currentSearch = '';

// Initialize the app
function init() {
  renderTasks();
  generateAISuggestions();
  generateAIInsights();
  updateTaskCount();

  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];
  taskDue.min = today;
}

// Theme Toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const icon = themeToggle.querySelector('i');
  if (document.body.classList.contains('dark-mode')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
});

// Add Task
addTaskBtn.addEventListener('click', () => {
  const title = taskTitle.value.trim();
  if (!title) {
    alert('Please enter a task title!');
    return;
  }

  const newTask = {
    id: Date.now(),
    title: title,
    category: taskCategory.value,
    priority: taskPriority.value,
    dueDate: taskDue.value,
    description: taskDescription.value,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.unshift(newTask);
  saveTasks();
  renderTasks();
  updateTaskCount();
  resetForm();
});

// Reset Form
function resetForm() {
  taskTitle.value = '';
  taskCategory.value = 'personal';
  taskPriority.value = 'medium';
  taskDue.value = '';
  taskDescription.value = '';
}

// Save tasks to local storage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render Tasks
function renderTasks() {
  let filteredTasks = tasks;

  // Apply filter
  if (currentFilter === 'active') {
    filteredTasks = tasks.filter((task) => !task.completed);
  } else if (currentFilter === 'completed') {
    filteredTasks = tasks.filter((task) => task.completed);
  } else if (currentFilter === 'high') {
    filteredTasks = tasks.filter((task) => task.priority === 'high');
  } else if (currentFilter === 'work') {
    filteredTasks = tasks.filter((task) => task.priority === 'work');
  } else if (currentFilter === 'personal') {
    filteredTasks = tasks.filter((task) => task.priority === 'personal');
  }

  // Apply search
  if (currentSearch) {
    filteredTasks = filteredTasks.filter(
      (task) =>
        task.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(currentSearch.toLowerCase())),
    );
  }

  if (filteredTasks.length === 0) {
    tasksList.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-clipboard-list"></i>
        <h3>No tasks found.</h3>
        <p>Try changing your search of filter.</p>
      </div>
    `;
    return;
  }

  tasksList.innerHTML = filteredTasks
    .map(
      (task) => `
      <div class="task-item ${task.completed ? 'task-completed' : ''}" data-id="${task.id}">
        <div class="task checkbox ${task.completed ? 'checked' : ''}" data-id="${task.id}">
          ${task.completed ? '<i class="fas fa-check"></i>' : ''}
        </div>
        <div class="task-content">
          <div class="task-title">${task.title}</div>
          <div class="task-meta">
            <span class="task-category"><i class="fas fa-tag"></i> ${task.category}</span>
            <span
              class="task-priority ${
                task.priority === 'high'
                  ? 'priority-high'
                  : task.priority === 'medium'
                    ? 'priority-medium'
                    : 'priority-low'
              }"></span>
            ${
              task.dueDate
                ? `<span class="task-due"
                  ><i class="fas fa-calendar"></i> ${formatDate(task.dueDate)}</span
                >`
                : ''
            }
          </div>
          ${task.description ? `<div class="task-description">${task.description}</div>` : ''}
        </div>
        <div class="task-actions">
          <button class="edit-btn" data-id="$task.id"><i class="fas fa-edit"></i></button>
          <button class="delete-btn" data-id="$task.id"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    `,
    )
    .join('');

  // Add event listener to task actions
  document.querySelectorAll('.task-checkbox').forEach((checkbox) => {
    checkbox.addEventListener('click', (e) => {
      const taskId = parseInt(e.currentTarget.getAttribute('data-id'));
      toggleTaskCompletion(taskId);
    });
  });

  document.querySelectorAll('.edit-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const taskId = parseInt(e.currentTarget.getAttribute('data-id'));
      editTask(taskId);
    });
  });

  document.querySelectorAll('.delete-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const taskId = parseInt(e.currentTarget.getAttribute('data-id'));
      deleteTask(taskId);
    });
  });
}

// Toggle Task Completion
function toggleTaskCompletion(taskId) {
  tasks = tasks.map((task) => {
    if (task.id === taskId) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });
  saveTasks();
  renderTasks();
  updateTaskCount();
}

// Edit task
function editTask(taskId) {
  const task = task.find((t) => t.id === taskId);
  if (!task) return;

  // For simplicity, it will just populate with task data
  taskTitle.value = task.title;
  taskCategory.value = task.category;
  taskPriority.value = task.priority;
  taskDue.value = task.dueDate;
  taskDescription.value = task.description || '';

  // Remove the task and update UI
  tasks = tasks.filter((t) => t.id !== taskId);
  saveTasks();
  renderTasks();
  updateTaskCount();

  // Scroll to form
  document.querySelector('.add-task-form').scrollIntoView({ behavior: 'smooth' });
}

// Delete task
function deleteTask(taskId) {
  if (confirm('Are you sure you want to delete this task?')) {
    tasks = tasks.filter((task) => task.id !== taskId);
    saveTasks();
    renderTasks();
    updateTaskCount();
  }
}

// Update task count
function updateTaskCount() {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  taskCount.textContent = `${completedTasks}/${totalTasks} completed`;
}

// Format date
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Filter tasks
filterSelect.addEventListener('change', (e) => {
  currentFilter = e.target.value;
  renderTasks();
});

// Search tasks
searchInput.addEventListener('input', (e) => {
  currentSearch = e.target.value;
  renderTasks();
});

// AI categorize task
aiCategorizeBtn.addEventListener('click', () => {
  const title = taskTitle.value.trim();
  if (!title) {
    alert('Please enter a task title first.');
    return;
  }

  showAIProcessing();
  // Simulate AI processing with a timeout
  setTimeout(() => {
    const category = categorizeTask(title);
    taskCategory.value = category;
    hideAIProcessing();

    // Show notification
    showAIMessage(`AI categorized your task as: ${category}`);
  }, 1500);
});

// Initialize the app
init();
