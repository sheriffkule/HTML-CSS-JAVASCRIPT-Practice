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
  if (addTaskBtn) addTaskBtn.addEventListener('click', addTask);
  if (taskInput) {
    taskInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') addTask();
    });
  }

  if (filterSelect) filterSelect.addEventListener('change', renderTasks);
  if (priorityFilter) priorityFilter.addEventListener('change', renderTasks);
  if (categoryFilter) categoryFilter.addEventListener('change', renderTasks);

  if (searchBtn) searchBtn.addEventListener('click', renderTasks);
  if (searchInput) {
    searchInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') renderTasks();
    });
  }

  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (saveTaskBtn) saveTaskBtn.addEventListener('click', saveTaskChanges);
  if (cancelEditBtn) cancelEditBtn.addEventListener('click', closeModal);
  if (addCategoryBtn) addCategoryBtn.addEventListener('click', addCategory);
  if (editTaskCategory) {
    editTaskCategory.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') addCategory();
    });
  }

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
    filteredTasks.forEach((task, index) => {
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
        <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
        <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
        ${
          task.priority ? `<span class="task-priority priority-${task.priority}">${task.priority}</span>` : ''
        }
        ${
          task.dueDate
            ? `<span class="task-due-date ${isOverdue ? 'overdue' : ''}"><i class="fa fa-calendar-alt"></i></span>`
            : ''
        }
        ${
          task.categories && task.categories.length > 0
            ? `<span class="task-category">${task.categories[0]}</span>`
            : ''
        }
        <div class="task-actions">
          <button class="btn-icon edit-btn" data-id="${task.id}"><i class="fas fa-edit"></i></button>
          <button class="btn-icon delete-btn" data-id="${task.id}">
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

  function toggleTaskCompletion(id) {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      task.completed = !task.completed;
      saveTasks();
      updateStats();
    }
  }

  function deleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
      tasks = tasks.filter((task) => task.id !== id);
      saveTasks();
      renderTasks();
      updateStats();
    }
  }

  function openEditModal(id) {
    const task = tasks.find((task) => task.id === id);
    if (!task) return;

    currentEditId = id;
    currentCategories = [...task.categories];

    editTaskText.value = task.text;
    editTaskPriority.value = task.priority;
    editTaskDueDate.value = task.dueDate || '';

    // Render categories
    renderCategoryTags();

    taskDetailsModal.style.display = 'flex';
  }

  function closeModal() {
    taskDetailsModal.style.display = 'none';
    currentEditId = null;
    currentCategories = [];
  }

  function saveTaskChanges() {
    if (!currentEditId) return;

    const task = tasks.find((task) => task.id === currentEditId);
    if (!task) return;

    task.text = editTaskText.value.trim();
    task.priority = editTaskPriority.value;
    task.dueDate = editTaskDueDate.value || '';
    task.categories = [...currentCategories];

    saveTasks();
    renderTasks();
    updateCategoryFilter();
    closeModal();
  }

  function addCategory() {
    const category = editTaskCategory.value.trim();
    if (!category || currentCategories.includes(category)) return;

    currentCategories.push(category);

    // Add to global categories if not exist
    if (!categories.includes(category)) {
      categories.push(category);
      localStorage.setItem('categories', JSON.stringify(categories));
      updateCategoryFilter();
    }

    editTaskCategory.value = '';
    renderCategoryTags();
  }

  function removeCategory(category) {
    currentCategories = currentCategories.filter((cat) => cat !== category);
    renderCategoryTags();
  }

  function renderCategoryTags() {
    categoryTags.innerHTML = '';
    currentCategories.forEach((category) => {
      const tag = document.createElement('span');
      tag.className = 'category-tag';
      tag.innerHTML = `
        ${category}
        <button onclick="removeCategory('${category}')">
          <i class="fas fa-times"></i>
        </button>
      `;
      categoryTags.appendChild(tag);
    });
  }

  function updateCategoryFilter() {
    categoryFilter.innerHTML = `
      <option value="all">All Categories</option>
      ${categories
        .map(
          (category) => `
      <option value="${category}">${category}</option>`,
        )
        .join('')}
    `;
  }

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function updateStats() {
    totalTasksEl.textContent = tasks.length;
    completedTasksEl.textContent = tasks.filter((task) => task.completed).length;
    pendingTasksEl.textContent = tasks.filter((task) => !task.completed).length;
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  }

  function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  // Drag and drop functions
  function initDragAndDrop() {
    const listItems = document.querySelectorAll('.task-item');

    listItems.forEach((item) => {
      item.addEventListener('dragstart', dragStart);
      item.addEventListener('dragover', dragOver);
      item.addEventListener('drop', drop);
      item.addEventListener('dragend', dragEnd);
    });
  }

  function dragStart(e) {
    dragStartIndex = +this.closest('li').getAttribute('data-id');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
    this.classList.add('dragging');
  }

  function dragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
  }

  function drop(e) {
    e.stopPropagation();
    e.preventDefault();

    const dragEndIndex = +this.getAttribute('data-id');
    if (dragStartIndex === dragEndIndex) return;

    // Reorder tasks array
    const startIdx = tasks.findIndex((task) => task.id === dragStartIndex);
    const endIdx = tasks.findIndex((task) => task.id === dragEndIndex);

    if (startIdx === -1 || endIdx === -1) return;

    const [removed] = tasks.splice(startIdx, 1);
    tasks.splice(endIdx, 0, removed);

    saveTasks();
    renderTasks();
  }

  function dragEnd() {
    this.classList.remove('dragging');
  }

  // Make removeCategory available globally for the category tags
  window.removeCategory = removeCategory;

  // Update year in footer
  function updateYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('year');

    if (!yearElement) {
      console.error('Year element not found');
      return;
    }

    yearElement.setAttribute('datetime', currentYear.toString());
    yearElement.dateTime = currentYear.toString();
    yearElement.textContent = currentYear.toString();
  }
  updateYear();
});
