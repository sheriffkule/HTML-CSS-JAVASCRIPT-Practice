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
});
