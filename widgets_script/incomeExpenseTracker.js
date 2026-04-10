document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const themeToggle = document.getElementById('theme-icon');
  const navItems = document.querySelectorAll('menu-nav li');
  const contentSections = document.querySelectorAll('.content-section');

  // Modal elements
  const transactionModal = document.getElementById('transaction-modal');
  const categoryModal = document.getElementById('category-modal');
  const goalModal = document.getElementById('goal-modal');
  const addTransactionBtn = document.getElementById('add-transaction');
  const addCategoryBtn = document.getElementById('add-category');
  const addGoalBtn = document.getElementById('add-goal');
  const closeModalBtns = document.querySelectorAll('.close-modal');

  // Form elements
  const transactionForm = document.getElementById('transaction-form');
  const categoryForm = document.getElementById('category-form');
  const goalForm = document.getElementById('goal-form');

  // Chart elements
  let categoryChart, monthlyChart, incomeExpenseChart, trendsChart;

  // App state
  let state = {
    transactions: [],
    categories: [
      { id: 1, name: 'Food', budget: 300, icon: 'fa-utensils', color: '#FF6384' },
      { id: 2, name: 'Transportation', budget: 150, icon: 'fa-car', color: '#36a2eb' },
      { id: 3, name: 'Housing', budget: 1000, icon: 'fa-home', color: '#ffce56' },
      { id: 4, name: 'Entertainment', budget: 100, icon: 'fa-film', color: '#4bc0c0' },
      { id: 5, name: 'Shopping', budget: 200, icon: 'fa-shopping-cart', color: '#9966ff' },
      { id: 6, name: 'Income', budget: 0, icon: 'fa-money-bill-wave', color: '#00cc99' },
    ],
    goals: [],
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
  };

  // Initialize the app
  function init() {
    loadData();
    setupEventListeners();
    renderDashboard();
    renderCategories();
    updateSummaryCards();
    renderRecentTransactions();
    renderTransactionsTable();
    setCurrentMonthYear();
  }

  // Load data from localStorage
  function loadData() {
    const savedState = localStorage.getItem('budgetPlannerState');
    if (savedState) {
      state = JSON.parse(savedState);
      // Convert date strings back to Date objects for transactions
      state.transactions.forEach((trans) => {
        trans.date = new Date(trans.date);
      });
      // Convert date strings back to Date objects for goals
      state.goals.forEach((goal) => {
        goal.targetDate = new Date(goal.targetDate);
      });
    }
  }

  // Save data to localStorage
  function saveDate() {
    // Convert Date objects to strings for storage
    const transactionsWithStringDates = state.transactions.map((trans) => ({
      ...trans,
      date: trans.date.toISOString(),
    }));

    const goalsWithStringDates = state.goals.map((goal) => ({
      ...goal,
      date: goal.targetDate.toISOString(),
    }));

    const stateToSave = {
      ...state,
      transactions: transactionsWithStringDates,
      goals: goalsWithStringDates,
    };

    localStorage.setItem('budgetPlannerState', JSON.stringify(stateToSave));
  }

  // Setup event listeners
  function setupEventListeners() {
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);

    // Navigation
    navItems.forEach((item) => {
      item.addEventListener('click', () => {
        navItems.forEach((nav) => nav.classList.remove('active'));
        item.classList.add('active');

        const section = item.getAttribute('data-section');
        contentSections.forEach((sec) => sec.classList.remove('active'));
        document.getElementById(section).classList.add('active');

        // Render specific content when section changes
        if (section === 'transactions') {
          renderTransactionsTable();
        } else if (section === 'budgets') {
          renderCategories();
        } else if (section === 'reports') {
          renderCharts();
        } else if (section === 'goals') {
          renderGoals();
        }
      });
    });

    // Modal open buttons
    addTransactionBtn.addEventListener('click', () => openModal('transaction'));
    addCategoryBtn.addEventListener('click', () => openModal('category'));
    addGoalBtn.addEventListener('click', () => openModal('goal'));

    // Modal close buttons
    closeModalBtns.forEach((btn) => {
      btn.addEventListener('click', closeModal);
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal')) {
        closeModal();
      }
    });

    // Form submissions
    transactionForm.addEventListener('submit', handleTransactionSubmit);
    categoryForm.addEventListener('submit', handleCategorySubmit);
    goalForm.addEventListener('submit', handleGoalSubmit);

    // Report period navigation
    document.getElementById('prev-month').addEventListener('click', () => {
      if (state.currentMonth === 0) {
        state.currentMonth = 11;
        state.currentYear--;
      } else {
        state.currentMonth--;
      }
      setCurrentMonthYear();
      renderCharts();
    });

    document.getElementById('next-month').addEventListener('click', () => {
      if (state.currentMonth === 11) {
        state.currentMonth = 0;
        state.currentYear++;
      } else {
        state.currentMonth++;
      }
      setCurrentMonthYear();
      renderCharts();
    });

    // Filter changes
    document.getElementById('transaction-type').addEventListener('change,', renderTransactionsTable);
    document.getElementById('transaction-category').addEventListener('change,', renderTransactionsTable);
    document.getElementById('transaction-month').addEventListener('change,', renderTransactionsTable);
  }

  // Toggle between light and dark themes
  function toggleTheme() {
    const body = document.body;
    if (body.getAttribute('data-theme') === 'dark') {
      body.removeAttribute('data-theme');
      themeToggle.classList.remove('fa-sun');
      themeToggle.classList.add('fa-moon');
    } else {
      body.setAttribute('data-theme', 'dark');
      themeToggle.classList.remove('fa-moon');
      themeToggle.classList.add('fa-sun');
    }
  }

  // Open modal
  function openModal(type) {
    closeModal(); // Close any open modals first

    if (type === 'transaction') {
      prepareTransactionModal();
      transactionModal.classList.add('active');
    } else if (type === 'category') {
      prepareCategoryModal();
      categoryModal.classList.add('active');
    } else if (type === 'goal') {
      prepareGoalModal();
      goalModal.classList.add('active');
    }
  }

  // Close modal
  function closeModal() {
    document.querySelectorAll('.modal').forEach((modal) => modal.classList.remove('active'));
  }

  // Prepare transaction modal for adding or editing
  function prepareTransactionModal() {
    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('trans-date').value = today;

    // Populate category dropdown
    const categorySelect = document.getElementById('trans-category');
    categorySelect.innerHTML = '';

    state.categories.forEach((category) => {
      const option = document.createElement('option');
      option.value = category.id;
      option.textContent = category.name;
      categorySelect.appendChild(option);
    });
  }

  // Prepare category modal for adding or editing
  function prepareCategoryModal() {
    document.getElementById('category-name').value = '';
    document.getElementById('category-budget').value = '';
    document.getElementById('category-icon').value = 'fa-utensils';
  }

  // Prepare goal modal for adding or editing
  function prepareGoalModal() {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const nextMonthFormatted = nextMonth.toISOString().split('T')[0];

    document.getElementById('goal-name').value = '';
    document.getElementById('goal-target').value = '';
    document.getElementById('goal-saved').value = '0';
    document.getElementById('goal-date').value = nextMonthFormatted;
  }

  // Handle transaction form submission
  function handleTransactionSubmit(e) {
    e.preventDefault();

    const type = document.getElementById('trans-type').value;
    const amount = parseFloat(document.getElementById('trans-amount').value);
    const description = document.getElementById('trans-description').value;
    const categoryId = parseInt(document.getElementById('trans-category').value);
    const date = new Date(document.getElementById('trans-date').value);

    const category = state.categories.find((cat) => cat.id === categoryId);

    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    if (date < new Date()) {
      alert('Please select a future date for the goal.');
      return;
    }

    const newTransaction = {
      id: Date.now(),
      type,
      amount,
      description,
      category: category.name,
      categoryId,
      date,
      icon: category.icon,
    };

    state.transactions.push(newTransaction);
    saveDate();

    // Update UI
    closeModal();
    updateSummaryCards();
    renderRecentTransactions();
    renderTransactionsTable();
    renderCharts();

    // Reset form
    transactionForm.reset();
  }

  // Handle category form submission
  function handleCategorySubmit(e) {
    e.preventDefault();

    const name = document.getElementById('category-name').value;
    const budget = parseFloat(document.getElementById('category-budget').value);
    const icon = document.getElementById('category-icon').value;

    // Generate a random color for the category
    const colors = ['#FF6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff', '#00cc99', '#ff9f40'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    if (!name) {
      alert('Please enter a category name.');
      return;
    }

    const newCategory = {
      id: Date.now(),
      name,
      budget: isNaN(budget) ? 0 : budget,
      icon,
      color,
    };

    state.categories.push(newCategory);
    saveDate();

    // Update UI
    closeModal();
    renderCategories();
    renderCharts();

    // Reset form
    categoryForm.reset();
  }

  // Handle goal form submission
  function handleGoalSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('goal-name').value;
    const target = parseFloat(document.getElementById('goal-target').value);
    const saved = parseFloat(document.getElementById('goal-saved').value);
    const date = new Date(document.getElementById('goal-date').value);

    if (!name) {
      alert('Please enter a goal name.');
      return;
    }

    if (isNaN(target) || target <= 0) {
      alert('Please enter a valid target amount.');
      return;
    }

    if (isNaN(saved) || saved < 0) {
      alert('Please enter a valid saved amount.');
      return;
    }

    if (date < new Date()) {
      alert('Please select a future date for the goal.');
      return;
    }

    const newGoal = {
      id: Date.now(),
      name,
      target,
      saved,
      date,
    };

    state.goals.push(newGoal);
    saveDate();

    // Update UI
    closeModal();
    renderGoals();

    // Reset form
    goalForm.reset();
  }

  // Update summary card
  function updateSummaryCards() {
    const now = new Date();
    const currentMont = now.getMonth();
    const currentYear = now.getFullYear();

    // Filter transactions for current month
    const monthlyTransactions = state.transactions.filter((trans) => {
      return trans.date.getMonth() === currentMont && trans.date.getFullYear() === currentYear;
    });

    // Calculate totals
    const income = monthlyTransactions
      .filter((trans) => trans.type === 'income')
      .reduce((sum, trans) => sum + trans.amount, 0);

    const expenses = monthlyTransactions
      .filter((trans) => trans.type === 'expense')
      .reduce((sum, trans) => sum + trans.amount, 0);

    const balance = income - expenses;
    const savingsRate = income > 0 ? (((income - expenses) / income) * 100).toFixed(1) : 0;

    // Update DOM
    document.getElementById('total-balance').textContent = `$${balance.toFixed(2)}`;
    document.getElementById('monthly-income').textContent = `$${income.toFixed(2)}`;
    document.getElementById('monthly-income').textContent = `$${expenses.toFixed(2)}`;
    document.getElementById('savings-rate').textContent = `${savingsRate}%`;

    // Update change indicator
    const changeElement = document.querySelector('#total-balance +  .change');
    if (balance > 0) {
      changeElement.classList.add('positive');
      changeElement.classList.remove('negative');
    } else if (balance < 0) {
      changeElement.classList.add('negative');
      changeElement.classList.remove('positive');
    } else {
      changeElement.classList.remove('positive', 'negative');
    }
  }

  // Render recent transactions
  function renderRecentTransactions() {
    const container = document.getElementById('recent-transactions');
    container.innerHTML = '';

    // Get 5 most recent transactions
    const recentTransactions = [...state.transactions].sort((a, b) => b.date - a.date).slice(0, 5);

    if (recentTransactions.length === 0) {
      container.innerHTML = '<p class="no-transactions">No transactions yet. Add your first transaction!</p>';
      return;
    }

    recentTransactions.forEach((trans) => {
      const transactionEl = document.createElement('div');
      transactionEl.className = 'transaction-item';

      const category = state.categories.find((cat) => cat.id === trans.categoryId);

      transactionEl.innerHTML = `
        <div class="transaction-info">
          <div class="transaction-icon">
            <i class="fas ${trans.icon || 'fa-money-bill-wave'}"></i>
          </div>
          <div class="transaction-details">
            <h4>${trans.description}</h4>
            <p>${category?.name || trans.category} • ${formatDate(trans.date)}</p>
          </div>
        </div>
        <div class="transaction-amount ${trans.type}">
          ${trans.type === 'income' ? '+' : '-'}$${trans.amount.toFixed(2)}
        </div>
      `;

      container.appendChild(transactionEl);
    });
  }

  // Render transaction table
  function renderTransactionsTable() {
    const container = document.getElementById('transactions-list');
    container.innerHTML = '';

    const typeFilter = document.getElementById('transaction-type').value;
    const categoryFilter = document.getElementById('transaction-category').value;
    const monthFilter = document.getElementById('transaction-month').value;

    // Populate category filter
    const categorySelect = document.getElementById('transaction-category');
    if (categorySelect.options.length <= 1) {
      state.categories.forEach((category) => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
      });
    }

    // Populate month filter
    const monthSelect = document.getElementById('transaction-month');
    if (monthSelect.options.length <= 1) {
      const months = [];
      state.transactions.forEach((trans) => {
        const monthYear = `${trans.date.getFullYear()}-${trans.date.getMonth()}`;
        if (!months.includes(monthYear)) {
          months.push(monthYear);

          const option = document.createElement('option');
          option.value = monthYear;
          option.textContent = `${getMonthName(trans.date.getMonth())} ${trans.date.getFullYear()}`;
          monthSelect.appendChild(option);
        }
      });
    }

    // Filter transactions
    let filteredTransactions = [...state.transactions];

    if (typeFilter !== 'all') {
      filteredTransactions = filteredTransactions.filter((trans) => trans.type === typeFilter);
    }

    if (categoryFilter !== 'all') {
      filteredTransactions = filteredTransactions.filter(
        (trans) => trans.categoryId === parseInt(categoryFilter),
      );
    }

    if (monthFilter !== 'all') {
      const [year, month] = monthFilter.split('-').map(Number);
      filteredTransactions = filteredTransactions.filter((trans) => {
        return trans.date.getFullYear() === year && trans.date.getMonth() === month;
      });
    }

    // Sort transactions by date
    filteredTransactions.sort((a, b) => b.date - a.date);

    if (filteredTransactions.length === 0) {
      container.innerHTML = `
        <tr>
          <td colspan="6" class="no-transactions">No transactions found matching your filters.</td>
        </tr>
      `;
      return;
    }

    filteredTransactions.forEach((trans) => {
      const row = document.createElement('tr');
      const category = state.categories.find((cat) => cat.id === trans.categoryId);

      row.innerHTML = `
        <td>${formatDate(trans.date)}</td>
        <td>${formatDate(trans.description)}</td>
        <td>
          <i class="fas ${trans.icon} || 'fa-money-bill-wave"></i>
          ${category?.name || trans.category}
        </td>
        <td>
          <span class="badge ${trans.type === 'income' ? 'income' : 'expense'}">
            ${trans.type === 'income' ? 'Income' : 'Expense'}
          </span>
        </td>
        <td class="${trans.type === 'income' ? 'income' : 'expense'}">
          ${trans.type === 'income' ? '+' : '-'}$${trans.amount.toFixed(2)}
        </td>
        <td class="action-buttons">
          <button class="action-btn edit-btn" data-id="${trans.id}">
            <i class="fas fa-edit"></i>
          </button>
          <button class="action-btn delete-btn" data-id="${trans.id}">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      `;

      container.appendChild(row);
    });

    // Add event listeners for edit and delete buttons
    document.querySelectorAll('.edit-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        editTransaction(id);
      });
    });

    document.querySelectorAll('.delete-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        deleteTransaction(id);
      });
    });
  }

  // Edit transaction
  function editTransaction(id) {
    const transaction = state.transactions.find((trans) => trans.id === id);
    if (!transaction) return;

    openModal('transaction');

    // Populate form with transaction data
    document.getElementById('trans-type').value = transaction.type;
    document.getElementById('trans-amount').value = transaction.amount;
    document.getElementById('trans-description').value = transaction.description;
    document.getElementById('trans-category').value = transaction.categoryId;
    document.getElementById('trans-date').value = transaction.date.toISOString().split('T')[0];

    // Modify form submission to handle edit
    transactionForm.removeEventListener('submit', handleTransactionSubmit);
    transactionForm.addEventListener('submit', function handleEditSubmit(e) {
      e.preventDefault();

      // Update transaction with new values
      transaction.type = document.getElementById('trans-type').value;
      transaction.amount = parseFloat(document.getElementById('trans-amount').value);
      transaction.description = document.getElementById('trans-description').value;
      transaction.categoryId = parseInt(document.getElementById('trans-category').value);
      transaction.date = new Date(document.getElementById('trans-date').value);

      const category = state.categories.find((cat) => cat.id === transaction.categoryId);
      if (category) {
        transaction.category = category.name;
        transaction.icon = category.icon;
      }

      saveDate();

      // Update UI
      closeModal();
      updateSummaryCards();
      renderRecentTransactions();
      renderTransactionsTable();
      renderCharts();

      // Reset form and event listener
      transactionForm.reset();
      transactionForm.removeEventListener('submit', handleEditSubmit);
      transactionForm.addEventListener('submit', handleTransactionSubmit);
    });
  }

  // Delete transaction
  function deleteTransaction(id) {
    if (confirm('Are you sure you want to delete this transaction?')) {
      state.transactions = state.transactions.filter((trans) => trans.id !== id);
      saveDate();

      // Update UI
      updateSummaryCards();
      renderRecentTransactions();
      renderTransactionsTable();
      renderCharts();
    }
  }

  // Render budget categories
  function renderCategories() {
    const container = document.getElementById('budget-categories');
    container.innerHTML = '';

    if (state.categories.length === 0) {
      container.innerHTML = '<p class="no-categories">No categories yet. Add your first category!</p>';
      return;
    }

    // Calculate spent amounts per category
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const categorySpending = {};
    state.transactions
      .filter(
        (trans) =>
          trans.type === 'expense' &&
          trans.date.getMonth() === currentMonth &&
          trans.date.getFullYear() === currentYear,
      )
      .forEach((trans) => {
        if (!categorySpending[trans.categoryId]) {
          categorySpending[trans.categoryId] = 0;
        }
        categorySpending[trans.categoryId] += trans.amount;
      });

    state.categories.forEach((category) => {
      if (category.name === 'Income') return; // Skip income category

      const spent = categorySpending[category.id] || 0;
      const percent = category.budget > 0 ? Math.min((spent / category.budget) * 100, 100) : 0;
      const remaining = category.budget - spent;

      const categoryEl = document.createElement('div');
      categoryEl.className = 'budget-category';

      categoryEl.innerHTML = `
        <div class="budget-category-header">
          <div class="budget-icon" style="background-color: ${category.color || '#4361ee'}">
            <i class="fas ${category.icon}"></i>
          </div>
          <div class="budget-title">
            <h4>${category.name}</h4>
            <p>Budget: $${category.budget.toFixed(2)}</p>
          </div>
        </div>
        <div class="budget-amount">Spent: ${spent.toFixed(2)} / Remaining: $${remaining.toFixed(2)}</div>
        <div class="budget-progress">
          <div
            class="progress-bar"
            style="width: ${percent}%; background-color: ${category.color || '#4361ee'}"></div>
        </div>
        <div class="budget-stats">
          <span>${percent.toFixed(0)}% of budget</span>
          <span>${remaining.toFixed(2)} left</span>
        </div>
      `;

      container.appendChild(categoryEl);
    });
  }

  // Render savings goals
  function renderGoals() {
    const container = document.getElementById('savings-goals');
    container.innerHTML = '';

    if (state.goals.length === 0) {
      container.innerHTML = '<p class="no-goals">No goals yet. Add your first savings goal!</p>';
      return;
    }

    state.goals.forEach((goal) => {
      const percent = (goal.saved / goal.target) * 100;
      const daysLeft = Math.ceil((goal.date - new Date()) / (1000 * 60 * 60 * 24));

      const goalEl = document.createElement('div');
      goalEl.className = 'goal-card';

      goalEl.innerHTML = `
        <div class="goal-header">
          <div class="goal-title">
            <h3>${goal.name}</h3>
            <p>Target: $${goal.target.toFixed(2)}</p>
          </div>
          <span>${daysLeft > 0 ? `${daysLeft} days left` : 'Completed'}</span>
        </div>
        <div class="goal-progress">
          <div class="goal-progress-bar" style="width: ${Math.min(percentage, 100)}"></div>
        </div>
        <div class="goal-details">
          <span class="goal-amount">Saved: $${goal.saved.toFixed(2)} (${percent.toFixed(1)}%)</span>
          <span class="goal-date">${formatDate(goal.date)}</span>
        </div>
      `;

      container.appendChild(goalEl);
    });
  }

  // Render charts
  function renderCharts() {
    renderCategoryChart();
    renderMonthlyChart();
    renderIncomeExpenseChart();
    renderTrendsChart();
    renderTopExpenses();
    renderCategoryBreakdown();
  }

  // Render category chart
  function renderCategoryChart() {
    const ctx = document.getElementById('categoryChart').getContext('2d');

    // Calculate spending by category for current month
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const categorySpending = {};
    state.transactions
      .filter(
        (trans) =>
          trans.type === 'expense' &&
          trans.date.getMonth() === currentMonth &&
          trans.date.getFullYear() === currentYear,
      )
      .forEach((trans) => {
        if (!categorySpending[trans.categoryId]) {
          categorySpending[trans.categoryId] = 0;
        }
        categorySpending[trans.categoryId] += trans.amount;
      });
  }

  // Initialize the app
  init();
});
