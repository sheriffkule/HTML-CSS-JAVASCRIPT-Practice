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

  function openTaskModal(task = null) {
    const modalTitle = document.getElementById('modal-title');
    const taskIdInput = document.getElementById('task-id');
    const taskTitleInput = document.getElementById('task-title');
    const taskDescriptionInput = document.getElementById('task-description');
    const taskDueDateInput = document.getElementById('task-due-date');
    const taskPriorityInput = document.getElementById('task-priority');
    const taskProjectInput = document.getElementById('task-project');
    const taskLabelInput = document.getElementById('task-labels');

    // Reset form
    taskForm.reset();

    if (task) {
      // Edit modal
      modalTitle.textContent = 'Edit Task';
      taskIdInput.value = task.id;
      taskTitleInput.value = task.title;
      taskDescriptionInput.value = task.description || '';
      taskDueDateInput.value = task.dueDate || '';
      taskPriorityInput.value = task.priority || '';
      taskProjectInput.value = task.project || '';
      taskLabelInput.value = task.labels ? task.labels.join(', ') : '';
    } else {
      // Add mode
      modalTitle = 'Add New Task';
      taskIdInput.value = '';
      // Set default due date to today
      const day = new Date().toISOString().split('T')[0];
      taskDueDateInput.value = day;
    }

    // Populate projects dropdown
    populateProjectDropdown();

    taskModal.style.display = 'flex';
  }

  function openProjectModal() {
    projectForm.reset();
    projectModal.style.display = 'flex';
  }

  function openSortModal() {
    // Set current sort options
    document.querySelector(`input[name="sort"][value="${currentSort.by}"]`).checked = true;
    document.querySelector(`input[name="order"][value="${currentSort.order}"]`).checked = true;

    sortModal.style.display = 'flex';
  }

  function applySort() {
    const sortBy = document.querySelector('input[name="sort"]:checked').value;
    const sortOrder = document.querySelector('input[name="order"]:checked').value;

    currentSort = { by: sortBy, order: sortOrder };
    renderTasks();
    sortModal.style.display = 'none';
  }

  function populateProjectDropdown() {
    taskProjectSelect.innerHTML = '<option value="">No Project</option>';

    projects.forEach((project) => {
      const option = document.createElement('option');
      option.value = project.id;
      option.textContent = project.name;
      taskProjectSelect.appendChild(option);
    });
  }

  function handleTaskSubmit(e) {
    e.preventDefault();

    const taskId = document.getElementById('task-id').value;
    const title = document.getElementById('task-title').value.trim();
    const description = document.getElementById('task-description').value.trim();
    const dueDate = document.getElementById('task-due-date').value;
    const priority = document.getElementById('task-priority').value;
    const projectId = document.getElementById('task-project').value;
    const labels = document
      .getElementById('task-labels')
      .value.split(',')
      .map((label) => label.trim())
      .filter((label) => label);

    if (!title) {
      alert('Task title is required!');
      return;
    }

    const project = projects.find((p) => p.id === projectId);

    const taskData = {
      title,
      description,
      dueDate: dueDate || null,
      priority,
      project: project ? project.id : null,
      projectName: project ? project.name : null,
      projectColor: project ? project.color : null,
      labels,
      isCompleted: false,
      isImportant: false,
      createdAt: new Date().toISOString(),
    };

    if (taskId) {
      // Update existing task
      const existingTask = tasks.find((t) => t.id === taskId);
      if (existingTask) {
        Object.assign(existingTask, {
          ...taskData,
          isCompleted: existingTask.isCompleted,
          isImportant: existingTask.isImportant,
          id: existingTask.id,
        });
      }
    } else {
      // Add new task
      taskData.id = generateId();
      tasks.push(taskData);
    }

    saveTasks();
    renderTasks();
    updateStats();
    taskModal.style.display = 'none';
  }
});
