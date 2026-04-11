document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const currentAmountEl = document.getElementById('current-amount');
  const goalAmountEl = document.getElementById('goal-amount');
  const percentageTextEl = document.getElementById('percentage-text');
  const percentageCircleEl = document.getElementById('percentage-circle');
  const waterWaveEl = document.getElementById('water-wave');
  const todayHistoryEl = document.getElementById('today-history');
  const customAmountInput = document.getElementById('custom-amount');
  const addCustomBtn = document.getElementById('add-custom-btn');
  const settingsBtn = document.getElementById('settings-btn');
  const settingsModal = document.getElementById('settings-modal');
  const saveSettingsBtn = document.getElementById('save-settings');
  const dailyGoalInput = document.getElementById('daily-goal');
  const reminderFrequencyInput = document.getElementById('reminder-frequency');
  const wakeUpTimeInput = document.getElementById('wake-up-time');
  const bedtimeInput = document.getElementById('bedtime');
  const themeInput = document.getElementById('theme');
  const viewAllBtn = document.getElementById('view-all-btn');
  const historyModal = document.getElementById('history-modal');
  const historyChartCtx = document.getElementById('history-chart');
  const detailedHistoryEl = document.getElementById('detailed-history');
  const streakDaysEl = document.getElementById('streak-day');
  const weeklyAvgEl = document.getElementById('weekly-avg');
  const completionRateEl = document.getElementById('completion-rate');
  const notificationEl = document.getElementById('reminder-notification');
  const dismissNotificationBtn = document.querySelector('.dismiss-btn');
  const resetBtn = document.getElementById('reset-btn');

  // App state
  let state = {
    currentAmount: 0,
    goalAmount: 2000,
    history: [],
    settings: {
      dailyGoal: 2000,
      reminderFrequency: 60,
      wakeUpTime: '08:00',
      bedtime: '22:00',
      theme: 'blue',
    },
    streak: 0,
    lastEntryDate: null,
  };

  // Initialize the app
  function init() {
    loadData();
    render();
    setupEventListeners();
    updateWaveHeight();
    updatePercentageCircle();
    checkStreak();
    updateStats();
    setupReminders();
    applyTheme();
  }

  // Load data from local storage
  function loadData() {
    const savedState = localStorage.getItem('waterTrackerState');
    if (savedState) {
      state = JSON.parse(savedState);

      // Filter out old history entries (keep only last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      state.history = state.history.filter((entry) => {
        const entryDate = new Date(entry.date);
        return entryDate >= thirtyDaysAgo;
      });
    }

    // Initialize today's current amount
    const today = new Date().toDateString();
    const todayEntries = state.history.filter((entry) => new Date(entry.date).toDateString() === today);
    state.currentAmount = todayEntries.reduce((sum, entry) => sum + entry.amount, 0);
  }

  // Save data to localStorage
  function saveData() {
    localStorage.setItem('waterTrackerState', JSON.stringify(state));
  }

  // Render the app
  function render() {
    currentAmountEl.textContent = state.currentAmount;
    goalAmountEl.textContent = state.goalAmount;

    const percentage = Math.min(Math.round((state.currentAmount / state.goalAmount) * 100), 100);
    percentageTextEl.textContent = `${percentage}%`;

    renderTodayHistory();
  }

  // Render today's history
  function renderTodayHistory() {
    const today = new Date().toDateString();
    const todayEntries = state.history.filter((entry) => new Date(entry.date).toDateString() === today);

    if (todayEntries.length === 0) {
      todayHistoryEl.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-glass-water"></i>
          <p>No entries yet today.</p>
        </div>
      `;
      return;
    }

    todayHistoryEl.innerHTML = '';

    // Show only the last 5 entries
    const entriesToShow = todayEntries.slice(-5).reverse();

    entriesToShow.forEach((entry) => {
      const entryTime = new Date(entry.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const historyItem = document.createElement('div');
      historyItem.className = 'history-item';
      historyItem.innerHTML = `
        <span class="amount">+${entry.amount}</span>
        <span class="time">${entryTime}</span>
      `;

      todayHistoryEl.appendChild(historyItem);
    });

    // Show "view more" if there are more than 5 entries
    if (todayEntries > 5) {
      const viewMoreItem = document.createElement('div');
      viewMoreItem.className = 'history-item view-more';
      viewMoreItem.textContent = `${todayEntries.length - 5} more entries`;
      todayHistoryEl.appendChild(viewMoreItem);
    }
  }

  // Update water wave height based on percentage
  function updateWaveHeight() {
    const percentage = Math.min(state.currentAmount / state.goalAmount, 1);
    waterWaveEl.style.height = `${percentage * 100}%`;
  }

  // Update percentage circle animation
  function updatePercentageCircle() {
    const percentage = Math.min(state.currentAmount / state.goalAmount, 1);
    const circumference = 2 * Math.PI * 15.9155;
    const dashOffset = circumference * (1 - percentage);

    percentageCircleEl.style.strokeDasharray = `${circumference * percentage} ${dashOffset}`;
  }

  // Add water intake
  function addWater(amount) {
    if (isNaN(amount)) return;

    amount = parseInt(amount);
    if (amount <= 0) return;

    const now = new Date();
    state.currentAmount += amount;
    state.history.push({
      amount,
      date: now.toISOString(),
    });

    // Update last entry date for streak calculation
    state.lastEntryDate = now.toDateString();

    saveData();
    render();
    updateWaveHeight();
    updatePercentageCircle();
    updateStats();

    // Show success animation
    animateSuccess();
  }

  function animateSuccess() {
    const waterProgress = document.querySelector('.water-progress');
    waterProgress.classList.add('pulse');

    setTimeout(() => {
      waterProgress.classList.remove('pulse');
    }, 500);
  }

  // Check and update streak
  function checkStreak() {
    if (!state.lastEntryDate) {
      state.streak = 0;
      return;
    }
  }
});
