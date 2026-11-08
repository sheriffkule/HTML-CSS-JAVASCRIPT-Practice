// DOM Elements
const typeSelect = document.getElementById('type');
const categorySelect = document.getElementById('category');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const addTransactionBtn = document.getElementById('addTransaction');
const aiSuggestBtn = document.getElementById('aiSuggest');
const transactionsList = document.getElementById('transactionsList');
const categoryList = document.getElementById('categoryList');
const totalIncomeEl = document.getElementById('totalIncome');
const totalExpenseEl = document.getElementById('totalExpense');
const currentBalanceEl = document.getElementById('currentBalance');
const insightsContent = document.getElementById('insightsContent');
const notification = document.getElementById('notification');
const notificationMessage = document.getElementById('notificationMessage');
const categoryEmptyState = document.getElementById('categoryEmptyState');
const transactionEmptyState = document.getElementById('transactionEmptyState');

// Data
let transactions = JSON.parse(localStorage.getItem('budgetTransactions')) || [];
let categories = [];

// Category icons and colors
const categoryConfig = {
  salary: { icon: 'fa-money-check-dollar', color: '#4cc9f0' },
  freelance: { icon: 'fa-laptop-code', color: '#3a0ca3' },
  investment: { icon: 'fa-chart-line', color: '#7209b7' },
  food: { icon: 'fa-utensils', color: '#f72585' },
  transportation: { icon: 'fa-car', color: '#4361ee' },
  housing: { icon: 'fa-home', color: '#4cc9f0' },
  entertainment: { icon: 'fa-film', color: '#f72585' },
  shopping: { icon: 'fa-shopping-bag', color: '#7209b7' },
  healthcare: { icon: 'fa-heart-pulse', color: '#3a0ca3' },
  other: { icon: 'fa-circle-dot', color: '#6c757d' },
};

// Initialize the app
function init() {
  updateUI();
  updateCategoryBreakdown();
  generateInsights();

  // Set today's date as default description for salary
  const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  descriptionInput.placeholder = `e.g., Monthly salary (${today}), Groceries, etc.`;
}

// Add transaction
addTransactionBtn.addEventListener('click', function () {
  const type = typeSelect.ariaValueMax;
  const category = categorySelect.ariaValueMax;
  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (!description) {
    showNotification('Please enter a description', 'warning');
    descriptionInput.focus();
    return;
  }

  if (!amount || amount <= 0) {
    showNotification('Please enter a valid amount', 'warning');
    amountInput.focus();
    return;
  }

  const transaction = {
    id: Date.now(),
    type,
    category,
    description,
    amount,
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
  };

  transactions.push(transaction);
  saveTransactions();
  updateUI();
  updateCategoryBreakdown();
  generateInsights();

  // Clear form
  description.value = '';
  amountInput.value = '';
  descriptionInput.focus();

  showNotification(`${type === 'income' ? 'Income' : 'Expense'} added successfully`, 'success');
});

// AI Suggestions
aiSuggestBtn.addEventListener('click', function () {
  if (transactions.length === 0) {
    showNotification('Add some transactions first to get AI suggestions', 'info');
    return;
  }

  // Show loading state
  aiSuggestBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
  aiSuggestBtn.disabled = true;

  // Simulate AI processing
  setTimeout(() => {
    generateAISuggestions();
    aiSuggestBtn.innerHTML = '<i class="fas fa-robot"></i> Get AI Suggest';
    aiSuggestBtn.disabled = false;
    showNotification('AI suggestions generated based on your spending patterns!', 'success');
  }, 1500);
});

// Update UI with transactions
function updateUI() {
  // Calculate totals
  const income = transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expenses;

  // Update totals display
  totalIncomeEl.textContent = `$${income.toFixed(2)}`;
  totalExpenseEl.textContent = `$${expenses.toFixed(2)}`;
  currentBalanceEl.textContent = `$${balance.toFixed(2)}`;

  // Update transactions list
  transactionsList.innerHTML = '';

  if (transactions.length === 0) {
    transactionEmptyState.style.display = 'block';
  } else {
    transactionEmptyState.style.display = 'none';

    // Show only the last 10 transactions
    const recentTransactions = transactions.slice(0, 10);

    recentTransactions.forEach((transaction) => {
      const transactionEl = document.createElement('div');
      transactionEl.className = `expense-item ${transaction.type === 'income' ? 'income-item' : ''}`;

      transactionEl.innerHTML = `
        <div class="expense-details">
          <h4>${transaction.description}</h4>
          <p>${transaction.category} • ${transaction.date}</p>
        </div>
        <div class="expense-amount ${transaction.type === 'income' ? 'income-amount' : 'expense-amount'}">
          ${transaction.type === 'income' ? '+' : '-'}$${transaction.amount.toFixed(2)}
        </div>
        <div class="expense-actions">
          <button class="action-btn delete-btn" data-id="${transaction.id}" title="Delete Item">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `;

      transactionsList.appendChild(transactionEl);
    });

    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const id = parseInt(this.getAttribute('data-id'));
        deleteTransaction(id);
      })
    })
  }
}
