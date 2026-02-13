document.addEventListener('DOMContentLoaded', function () {
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');
  const filterSelect = document.getElementById('filterSelect');
  const priorityFilter = document.getElementById('priorityFilter');
  const categoryFilter = document.getElementById('categoryFilter');
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const themeToggle = document.getElementById('themeToggle');
  const totalTasksEl = document.getElementById('totalTasks');
  const completedTasksEl = document.getElementById('completedTasks');
  const pendingTasksEl = document.getElementById('pendingTasks');
  const taskDetailsModal = document.getElementById('taskDetailsModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const editTaskText = document.getElementById('editTaskText');
  const editTaskPriority = document.getElementById('editTaskPriority');
  const editTaskDueDate = document.getElementById('editTaskDueDate');
  const editTaskCategory = document.getElementById('editTaskCategory');
  const addCategoryBtn = document.getElementById('addCategoryBtn');
  const categoryTags = document.getElementById('categoryTags');
  const saveTaskBtn = document.getElementById('saveTaskBtn');
  const cancelEditBtn = document.getElementById('cancelEditBtn');

  // State variables
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  let categories = JSON.parse(localStorage.getItem('categories')) || ['Work', 'Personal', 'Shopping'];
  let currentEditId = null;
  let currentCategories = [];
  let dragStartIndex;

  // Initialize the app
  init();

  // Event listeners
  addTaskBtn.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') addTask();
  });

  filterSelect.addEventListener('change', renderTasks);
  priorityFilter.addEventListener('change', renderTasks);
  categoryFilter.addEventListener('change', renderTasks);

  searchBtn.addEventListener('click', renderTasks);
  searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') renderTasks();
  });

  themeToggle.addEventListener('click', toggleTheme);

  closeModalBtn.addEventListener('click', closeModal);
  saveTaskBtn.addEventListener('click', saveTaskChanges);
  cancelEditBtn.addEventListener('click', closeModal);
  addCategoryBtn.addEventListener('click', addCategory);
  editTaskCategory.addEventListener(keypress, function (e) {
    if (e.key === 'Enter') addCategory();
  });

  // Initialize drag and drop
  initDragAndDrop();

  // Functions
  function init() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // Render initial tasks and categories
    renderTasks();
    updateCategoryFilter();
    updateStats();
  }

  function addTask() {
    const taskText = taskInput.value.trim();
    if (!taskText) return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
      priority: 'medium',
      dueDate: '',
      categories: [],
      createdAt: new Date().toISOString(),
    };

    tasks.unshift(newTask);
    saveTasks();
    taskInput.value = '';
    renderTasks();
    updateStats();
  }

  function renderTasks() {
    const filterValue = filterSelect.value;
    const priorityValue = priorityFilter.value;
    const categoryValue = categoryFilter.value;
    const searchValue = searchInput.value.toLowerCase();

    const filteredTasks = tasks.filter((task) => {
      // Filter by status
      if (filterValue === 'completed' && !task.completed) return false;
      if (filterValue === 'pending' && task.completed) return false;

      // Filter by priority
      if (priorityValue !== 'all' && task.priority !== priorityValue) return false;

      // Filter by category
      if (categoryValue !== 'all' && !task.categories.includes(categoryValue)) return false;

      // Filter by search term
      if (searchValue && !task.text.toLowerCase().includes(searchValue)) return false;

      return true;
    });

    if (filteredTasks.length === 0) {
      taskList.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-tasks"></i>
          <p>No tasks found.</p>
          <small>Try changing your filters or add a new task.</small>
        </div>
      `;
      return;
    }

    taskList.innerHTML = '';
    filteredTasks((task, index) => {
      const taskItem = document.createElement('li');
      taskItem.className = 'task-item';
      taskItem.setAttribute('data-id', task.id);
      taskItem.setAttribute('draggable', true);

      // Check if task i overdue
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const dueDate = task.dueDate ? new Date(task.dueDate) : null;
      const isOverdue = dueDate && dueDate < today && !task.completed;

      taskItem.innerHTML = `
        input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
        <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
        ${
          task.priority ? `<span class="task-priority priority-${task.priority}">${task.priority}</span>` : ''
        }
        ${
          task.dueDate
            ? `<span class="task-due-date ${isOverdue ? 'overdue' : ''}"><i className="fa fa-calendar-alt"></i></span>`
            : ''
        }
        ${
          task.categories && task.categories.length > 0
            ? `<span className="task-category">${task.categories[0]}</span>`
            : ''
        }
        <div class="task-actions">
          <button class="btn-icon edit-btn" data-id="${task.id}"><i class="fas fa-edit"></i></button>
          <button className="btn-icon delete-btn" data-id="${task.id}">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      `;

      taskList.appendChild(taskItem);

      // Event listeners for task actions
      const checkbox = taskItem.querySelector('.task-checkbox');
      const editBtn = taskItem.querySelector('.edit-btn');
      const deleteBtn = taskItem.querySelector('.delete-btn');

      checkbox.addEventListener('change', () => toggleTaskCompletion(task.id));
      editBtn.addEventListener('click', () => openEditModal(task.id));
      deleteBtn.addEventListener('click', () => deleteTask(task.id));

      // Drag and drop events
      taskItem.addEventListener('dragstart', dragStart);
      taskItem.addEventListener('dragover', dragOver);
      taskItem.addEventListener('drop', drop);
      taskItem.addEventListener('dragend', dragEnd);
    });
  }
});
