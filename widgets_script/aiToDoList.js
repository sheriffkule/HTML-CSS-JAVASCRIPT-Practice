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
  generateAIInsights();
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

function escapeHtml(value) {
  const element = document.createElement('div');
  element.textContent = value;
  return element.innerHTML;
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
    filteredTasks = tasks.filter((task) => task.category === 'work');
  } else if (currentFilter === 'personal') {
    filteredTasks = tasks.filter((task) => task.category === 'personal');
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
        <div class="task-checkbox ${task.completed ? 'checked' : ''}" data-id="${task.id}">
          ${task.completed ? '<i class="fas fa-check"></i>' : ''}
        </div>
        <div class="task-content">
          <div class="task-title">${escapeHtml(task.title)}</div>
          <div class="task-meta">
            <span class="task-category"><i class="fas fa-tag"></i> ${escapeHtml(task.category)}</span>
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
                  ><i class="fas fa-calendar"></i> ${escapeHtml(formatDate(task.dueDate))}</span
                >`
                : ''
            }
          </div>
          ${task.description ? `<div class="task-description">${escapeHtml(task.description)}</div>` : ''}
        </div>
        <div class="task-actions">
          <button class="edit-btn" data-id="${task.id}" aria-label="Edit task"><i class="fas fa-edit"></i></button>
          <button class="delete-btn" data-id="${task.id}" aria-label="Delete task"><i class="fas fa-trash"></i></button>
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
  generateAIInsights();
  updateTaskCount();
}

// Edit task
function editTask(taskId) {
  const task = tasks.find((t) => t.id === taskId);
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
  generateAIInsights();
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
    generateAIInsights();
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

// AI suggest due
aiSuggestDateBtn.addEventListener('click', () => {
  const title = taskTitle.value.trim();
  if (!title) {
    alert('Please enter a task title first');
    return;
  }

  showAIProcessing();

  // Simulate AI processing with a timeout
  setTimeout(() => {
    const dueDate = suggestDueDate(title);
    taskDue.value = dueDate;
    hideAIProcessing();

    // Show notification
    showAIMessage(`AI suggested due date: ${formatDate(dueDate)}`);
  }, 1500);
});

// Show AI processing
function showAIProcessing() {
  aiProcessing.classList.remove('hidden');
}

// Hide AI Processing
function hideAIProcessing() {
  aiProcessing.classList.add('hidden');
}

// Show AI Message
function showAIMessage(message) {
  // Create a temporary notification
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
  position: fixed;
  top: 20px;
  right: 20px;
  background: var(--primary);
  color: white;
  padding: 12px 20px;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  z-index: 100;
  transition: var(--transition);
  `;

  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Categorize task using AI (simulated)
function categorizeTask(title) {
  const titleLower = title.toLowerCase();

  // Simple keyword-based categorization
  if (
    titleLower.includes('meeting') ||
    titleLower.includes('call') ||
    titleLower.includes('client') ||
    titleLower.includes('project') ||
    titleLower.includes('report') ||
    titleLower.includes('work')
  ) {
    return 'work';
  } else if (
    titleLower.includes('buy') ||
    titleLower.includes('shop') ||
    titleLower.includes('grocery') ||
    titleLower.includes('purchase')
  ) {
    return 'shopping';
  } else if (
    titleLower.includes('exercise') ||
    titleLower.includes('gym') ||
    titleLower.includes('run') ||
    titleLower.includes('walk') ||
    titleLower.includes('doctor') ||
    titleLower.includes('health')
  ) {
    return 'health';
  } else if (
    titleLower.includes('family') ||
    titleLower.includes('friend') ||
    titleLower.includes('party') ||
    titleLower.includes('movie') ||
    titleLower.includes('read') ||
    titleLower.includes('hobby')
  ) {
    return 'personal';
  }

  return 'other';
}

// Suggest due date using AI (simulated)
function suggestDueDate(title) {
  const today = new Date();
  const titleLower = title.toLowerCase();

  // Simple logic for due date suggestions
  if (titleLower.includes('urgent') || titleLower.includes('asap') || titleLower.includes('important')) {
    // Tomorrow for urgent tasks
    today.setDate(today.getDate() + 1);
  } else if (titleLower.includes('meeting') || titleLower.includes('call')) {
    // In 3 days for meetings
    today.setDate(today.getDate() + 3);
  } else if (titleLower.includes('project') || titleLower.includes('report')) {
    // In 1 week for projects
    today.setDate(today.getDate() + 7);
  } else {
    // Default: 2 days from now
    today.setDate(today.getDate() + 2);
  }

  return today.toISOString().split('T')[0];
}

// Generate AI suggestions
function generateAISuggestions() {
  const suggestions = [
    'Plan your week ahead.',
    'Review your goals for the month.',
    'Organize your workspace.',
    'Schedule time for exercise.',
    'Read for 30 minutes.',
    'Call a family member or friend.',
    'Learn a new skill for 15 minutes.',
    'Clean out your email inbox.',
    'Review your budget and expenses.',
  ];

  suggestionsList.innerHTML = suggestions
    .map(
      (suggestion) => `
      <div class="suggestion-item">
        <span>${suggestion}</span>
        <button class="add-suggestion-btn" data-suggestion="${suggestion}">
          <i class="fas fa-plus"></i>
        </button>
      </div>
    `,
    )
    .join('');

  // Add event listeners to suggestion button
  document.querySelectorAll('.add-suggestion-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const suggestion = e.currentTarget.getAttribute('data-suggestion');
      addSuggestionAsTask(suggestion);
    });
  });
}

// Generate New Suggestions
generateSuggestionsBtn.addEventListener('click', () => {
  showAIProcessing();

  // Simulate AI processing width timeout
  setTimeout(() => {
    generateAISuggestions();
    hideAIProcessing();
    showAIMessage('AI generated new task suggestions!');
  }, 1500);
});

// Generate AI insights
function generateAIInsights() {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Find most common category
  const categoryCounts = {};
  tasks.forEach((task) => {
    categoryCounts[task.category] = (categoryCounts[task.category] || 0) + 1;
  });

  let mostCommonCategory = 'None';
  let maxCount = 0;
  for (const category in categoryCounts) {
    if (categoryCounts[category] > maxCount) {
      mostCommonCategory = category;
      maxCount = categoryCounts[category];
    }
  }

  // Find overdue tasks
  const today = new Date().toISOString().split('T')[0];
  const overdueTasks = tasks.filter((task) => task.dueDate && !task.completed && task.dueDate < today).length;

  insightsContent.innerHTML = `
    <div class="insight-item">
      <div class="insight-title"><i class="fas fa-tachometer-alt"></i> Productivity Score</div>
      <div class="insight-details">
        Your completion rate is ${completionRate}% (${completedTasks}/${totalTasks} tasks completed)
      </div>
    </div>
    <div class="insight-item">
      <div class="insight-title"><i class="fas fa-tags"></i> Most Common Category</div>
      <div class="insight-details">You have the most tasks in the "${mostCommonCategory}" category</div>
    </div>
    <div class="insight-item">
      <div class="insight-title"><i class="fas fa-exclamation-triangle"></i> Overdue Tasks</div>
      <div class="insight-details">
        You have ${overdueTasks} overdue task${overdueTasks !== 1 ? 's' : ''} that need attention
      </div>
    </div>
    <div class="insight-item">
      <div class="insight-title"><i class="fas fa-bolt"></i> AI Recommendation</div>
      <div class="insight-details">
        ${
          completionRate < 50
            ? 'Try breaking down larger tasks into smaller, manageable steps'
            : 'Great job! Consider setting more challenging goals to maintain momentum'
        }
      </div>
    </div>
  `;
}

// Generate new insights
generateInsightsBtn.addEventListener('click', () => {
  showAIProcessing();

  // Simulate AI processing with a timeout
  setTimeout(() => {
    generateAIInsights();
    hideAIProcessing();
    showAIMessage('AI generated new productivity insights!');
  }, 1500);
});

// Add suggestion as task
function addSuggestionAsTask(suggestion) {
  taskTitle.value = suggestion;
  document.querySelector('.add-task-form').scrollIntoView({ behavior: 'smooth' });
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

// Initialize the app
init();
