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
    const transactionsWithStringDates = state.transactions.map((trns) => ({
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
  }

  // Initialize the app
  init();
});
