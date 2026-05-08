document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const themeSwitch = document.getElementById('theme-switch');
  const addTaskBtn = document.getElementById('add-task-btn');
  const addProjectBtn = document.getElementById('add-project-btn');
  const sortTaskBtn = document.getElementById('sort-task-btn');
  const taskModal = document.getElementById('task-modal');
  const projectModal = document.getElementById('project-modal');
  const sortModal = document.getElementById('sort-modal');
  const closeBtns = document.querySelectorAll('.close-btn');
  const taskForm = document.getElementById('task-form');
  const projectForm = document.getElementById('project-form');
  const tasksList = document.getElementById('tasks-list');
  const projectsList = document.getElementById('projects-list');
  const taskProjectSelect = document.getElementById('task-project');
  const priorityFilter = document.getElementById('priority-filter');
  const dateFilter = document.getElementById('date-filter');
  const taskSearch = document.getElementById('task-search');
  const currentViewElement = document.getElementById('current-view');
  const totalTasksCount = document.getElementById('total-task-count');
  const completedTasksCount = document.getElementById('completed-task-count');
  const pendingTasksCount = document.getElementById('pending-task-count');

  // View buttons
  const allTasksBtn = document.getElementById('all-tasks');
  const todayTasksBtn = document.getElementById('today-tasks');
  const importantTasksBtn = document.getElementById('important-tasks');
  const completedTasksBtn = document.getElementById('completed-tasks');

  // Sort modal element
  const applySortBtn = document.getElementById('apply-sort-btn');

  // state
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  let projects = JSON.parse(localStorage.getItem('projects')) || [];
  let currentView = 'all';
  let currentSort = { type: 'dueDate', order: 'asc' };
  let currentFilters = { priority: 'all', dueDate: 'all' };
  let searchQuery = '';

  // Initialize the app
  init();

  function init() {
    // Load theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    themeSwitch.checked = savedTheme === 'dark';

    // Load tasks and projects
    renderTasks();
    renderProjects();
    updateStats();

    // Set up event listeners
    setupEventListeners();
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  function setupEventListeners() {
    // Theme toggle
    themeSwitch.addEventListener('change', function () {
      setTheme(this.checked ? 'dark' : 'light');
    });

    // Modal open buttons
    addTaskBtn.addEventListener('click', () => openTaskModal());
    addProjectBtn.addEventListener('click', () => openProjectModal());
    sortTaskBtn.addEventListener('click', () => openSortModal());

    // Modal close buttons
    closeBtns.forEach((btn) => {
      btn.addEventListener('click', function () {
        const modal = this.closest('.modal');
        modal.style.display = 'none';
      });
    });

    //  Close modal when clicking outside of it
    window.addEventListener('click', function (e) {
      if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
      }
    });

    // Form submission
    taskForm.addEventListener('submit', handleTaskSubmit);
    projectForm.addEventListener('submit', handleProjectSubmit);

    // FIlter and search
    priorityFilter.addEventListener('change', function () {
      currentFilters.priority = this.value;
      renderTasks();
    });

    dateFilter.addEventListener('change', function () {
      currentFilters.date = this.value;
      renderTasks();
    });

    taskSearch.addEventListener('input', function () {
      searchQuery = this.value.toLowerCase();
      renderTasks();
    });

    // View buttons
    allTasksBtn.addEventListener('click', () => setCurrentView('all'));
    todayTasksBtn.addEventListener('click', () => setCurrentView('today'));
    importantTasksBtn.addEventListener('click', () => setCurrentView('important'));
    completedTasksBtn.addEventListener('click', () => setCurrentView('completed'));

    // Sort apply button
    applySortBtn.addEventListener('click', applySort);
  }
});
