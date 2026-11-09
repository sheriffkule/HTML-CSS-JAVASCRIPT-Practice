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
    document.querySelectorAll('.delete-btn').forEach((btn) => {
      btn.addEventListener('click', function () {
        const id = parseInt(this.getAttribute('data-id'));
        deleteTransaction(id);
      });
    });
  }
}

// Update category breakdown
function updateCategoryBreakdown() {
  categoryList.innerHTML = '';
  categories = {};

  // Calculate expenses by category
  transactions
    .filter((t) => t.type === 'expense')
    .forEach((transaction) => {
      if (!categories[transaction.category]) {
        categories[transaction.category] = 0;
      }
      categories[transaction.category] += transaction.amount;
    });

  // Get total expenses
  const totalExpenses = Object.values(categories).reduce((sum, amount) => sum + amount, 0);

  // Display categories
  if (totalExpenses === 0) {
    categoryEmptyState.style.display = 'block';
    return;
  } else {
    categoryEmptyState.style.display = 'none';
  }

  // Sort categories by amount (descending)
  const sortedCategories = Object.entries(categories).sort((a, b) => b[1] - a[1]);

  sortedCategories.forEach(([category, amount]) => {
    const percentage = totalExpenses > 0 ? ((amount / totalExpenses) * 100).toFixed(1) : 0;
    const config = categoryConfig[category] || categoryConfig.other;

    const categoryEl = document.createElement('li');
    categoryEl.className = 'category-item';
    categoryEl.innerHTML = `
      <div class="category-name">
        <div class="category-icon" style="background-color: ${config.color}">
          <i class="fas ${config.icon}" style="color: ${config.color}"></i>
        </div>
        <span>${category.charAt(0).toUpperCase() + category.slice(1)}</span>
      </div>
      <div>
        <span>$${amount.toFixed(2)}</span>
        <span style="color: var(--gray); margin-left: 10px;">${percentage}%</span>
      </div>
    `;

    categoryList.appendChild(categoryEl);
  });
}

// Generate AI Suggestions
function generateInsights() {
  insightsContent.innerHTML = '';

  if (transactions.length === 0) {
    insightsContent.innerHTML = `
      <div class="insight-item">
        <div class="insight-icon">
          <i class="fas fa-robot"></i>
        </div>
        <div class="insight-text">
          <h4>Welcome to Your AI Budget Planner!</h4>
          <p>
            Start adding your income and expenses to receive personalized AI insights and recommendations for
            better financial management.
          </p>
        </div>
      </div>
    `;
    return;
  }

  const income = transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expenses;

  // Insight 1: Balance status
  let balanceInsight = '';
  let balanceIcon = 'fa-smile';
  let balanceColor = '#4cc9f0';

  if (balance > income * 0.3) {
    balanceInsight = 'Excellent! You have a healthy balance. Consider investing some of your savings';
    balanceIcon = 'fa-gem';
    balanceColor = '#4cc9f0';
  } else if (balance > 0) {
    balanceInsight = "Good Job! You're spending less than you earn. Try to maintain this positive balance.";
    balanceIcon = 'fa-thumbs-up';
    balanceColor = '#3a0ca3';
  } else {
    balanceInsight = 'Warning: Your expenses exceed your income. Review your spending habits!';
    balanceIcon = 'fa-exclamation-triangle';
    balanceColor = '#f72585';
  }

  // Insight 2: Spending by category
  const largestCategory = Object.entries(categories).sort((a, b) => b[1] - a[0])[0];
  let categoryInsight = '';

  if (largestCategory) {
    const [category, amount] = largestCategory;
    const percentage = ((amount / expenses) * 100).toFixed(1);
    categoryInsight = `You spend the most on <strong>${category}</strong> (${percentage}% of total
      expenses). Consider reviewing this category for potential savings.`;
  }

  // Insight 3: Savings rate
  const savingsRate = income > 0 ? (((income - expenses) / income) * 100).toFixed(1) : 0;
  let savingsInsight = '';
  let savingsIcon = 'fa-piggy-bank';

  if (savingsRate > 20) {
    savingsInsight = `Great job! Excellent savings rate of ${savingsRate} You are saving more than 20% of
    your income. Keep up the excellent work!`;
  } else if (savingsRate > 10) {
    savingsInsight = `Good effort! Your savings rate is ${savingsRate}%. Consider increasing this to build a stronger financial cushion.`;
  } else if (savingsRate > 0) {
    savingsInsight = `Your savings rate is ${savingsRate}%. It's important to aim for at least 10-20% savings to ensure financial stability.`;
  } else {
    savingsInsight =
      'Your expenses exceed your income. Focus on reducing spending or increasing income to achieve positive savings.';
    savingsIcon = 'fa-exclamation-circle';
  }

  /// Add insights to the DOM
  const insights = [
    {
      title: 'Financial Health',
      text: balanceInsight,
      icon: balanceIcon,
      color: balanceColor,
    },
    {
      title: 'Spending Analysis',
      text: categoryInsight || 'Add more expenses to see category analysis.',
      icon: 'fa-chart-pie',
      color: '#7209b7',
    },
    {
      title: 'Savings Rate',
      text: savingsInsight,
      icon: savingsIcon,
      color: savingsRate > 20 ? '#4cc9f0' : savingsRate > 10 ? '#3a0ca3' : '#f72585',
    },
  ];

  insights.forEach((insight) => {
    if (!insight.text) return;

    const insightEl = document.createElement('div');
    insightEl.className = 'insight-item';
    insightEl.innerHTML = `
      <div class="insight-icon" style="background-color: ${insight.color}20; color: ${insight.color}">
        <i class="fas ${insight.icon}"></i>
      </div>
      <div class="insight-text">
        <h4>${insight.title}</h4>
        <p>${insight.text}</p>
      </div>
    `;

    insightsContent.appendChild(insightEl);
  });
}

// Generate AI Suggestions
function generateAISuggestions() {
  // Clear previous insights
  insightsContent.innerHTML = '';

  // Analyze spending patterns
  const expensesByCategory = { ...categories };
  const totalExpenses = Object.values(expensesByCategory).reduce((sum, amount) => sum + amount, 0);
  const income = transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);

  // Suggestion 1: Based on highest spending category
  const highestCategory = Object.entries(expensesByCategory).sort((a, b) => b[1] - a[0])[0];

  if (highestCategory) {
    const [category, amount] = highestCategory;
    const percentage = ((amount / totalExpenses) * 100).toFixed(1);

    const suggestion1 = document.createElement('div');
    suggestion1.className = 'insight-item';
    suggestion1.innerHTML = `
      <div class="insight-icon" style="background-color: #f7258520; color: #f72585">
        <i class="fas fa-lightbulb"></i>
      </div>
      <div class="insight-text">
        <h4>AI Recommendation: Reduce ${category} spending.</h4>
        <p>
          You're spending ${percentage}% your income on <strong>${category}</strong>. Consider reviewing this
          category for potential savings or reallocation. Consider setting a monthly limit for this category
          to save more money.
        </p>
        <div class="progress-container">
          <div class="progress-bar">
            <div class="progress-fill expense-progress" style="width= ${Math.min(percentage, 100)}%"></div>
          </div>
        </div>
      </div>
    `;
    insightsContent.appendChild(suggestion1);
  }

  // Suggestion 2: Budget allocation
  const suggestedBudget = {
    needs: income * 0.5,
    wants: income * 0.3,
    savings: income * 0.2,
  };

  const suggestion2 = document.createElement('div');
  suggestion2.className = 'insight-item';
  suggestion2.innerHTML = `
    <div class="insight-icon" style="background-color: #3a0ca320; color: #3a0ca3">
      <i class="fas fa-chart-line"></i>
    </div>
    <div class="insight-text">
      <h4>AI Recommendation: Optimize your budget allocation, try the 50/30/20 rule.</h4>
      <p>
        Adjust your spending to match these guidelines for better financial health. For optimal budgeting,
        allocate 50% to needs, 30% to wants, and 20% to savings.
      </p>
      <div className="progress-container">
        <p>Needs (50%): $${suggestedBudget.needs.toFixed(2)}</p>
        <div class="progress-bar">
          <div class="progress-fill budget-progress" style="width: 50%"></div>
        </div>
        <p>Wants (30%): $${suggestedBudget.wants.toFixed(2)}</p>
        <div class="progress-bar">
          <div class="progress-fill expense-progress" style="width: 30%"></div>
        </div>
        <p>Savings (20%): $${suggestedBudget.savings.toFixed(2)}</p>
        <div class="progress-bar">
          <div class="progress-fill" style="20%; background-color: #4cc9f0"></div>
        </div>
      </div>
    </div>
  `;
  insightsContent.appendChild(suggestion2);

  // Suggestion 3: Based on recent spending trends
  const lastWeekExpenses = transactions
    .filter((t) => t.type === 'expense')
    .slice(0, 7)
    .reduce((sum, t) => sum + t.amount, 0);

  if (lastWeekExpenses > 0) {
    const dailyAverage = lastWeekExpenses / 7;
    const monthlyProjection = dailyAverage * 30;

    const suggestion3 = document.createElement('div');
    suggestion3.className = 'insight-item';
    suggestion3.innerHTML = `
      <div class="insight-icon" style="background-color: #4361ee20; color: #4361ee">
        <i class="fas fa-calendar-alt"></i>
      </div>
      <div class="insight-text">
        <h4>AI Prediction: Monthly expenses projection.</h4>
        <p>
          Based on your recent spending, you might spend around $${monthlyProjection.toFixed(2)} this month.
          Consider setting a monthly spending limit to avoid overspending.
          ${
            monthlyProjection > income
              ? 'This exceeds your income. Consider reducing daily expenses.'
              : 'This is within your income. Good job!'
          }
        </p>
      </div>
    `;
    insightsContent.appendChild(suggestion3);
  }
}

// Delete transaction
function deleteTransaction(id) {
  transactions = transactions.filter((t) => t.id !== id);
  saveTransactions();
  updateUI();
  updateCategoryBreakdown();
  generateInsights();
  showNotification('Transaction deleted successfully', 'info');
}

// Save transactions to localStorage
function saveTransactions() {
  localStorage.setItem('budgetTransactions', JSON.stringify(transactions));
}

// Show notification
function showNotification(message, type) {
  let icon = 'fa-info-circle';
  if (type === 'success') icon = 'fa-check-circle';
  if (type === 'warning') icon = 'fa-exclamation-triangle';

  notification.className = `notification ${type} show`;
  notification.innerHTML = `<i class="fas ${icon}"></i> ${message}`;

  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
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
