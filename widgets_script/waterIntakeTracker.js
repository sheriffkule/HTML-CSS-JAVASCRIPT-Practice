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
  const streakDaysEl = document.getElementById('streak-days');
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

    // Show only the last 4 entries
    const entriesToShow = todayEntries.slice(-4).reverse();

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

    // Show "view more" if there are more than 4 entries
    if (todayEntries > 4) {
      const viewMoreItem = document.createElement('div');
      viewMoreItem.className = 'history-item view-more';
      viewMoreItem.textContent = `${todayEntries.length - 4} more entries`;
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

    const today = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    if (state.lastEntryDate === today) {
      // No need to update if already logged today
      return;
    } else if (state.lastEntryDate === yesterdayStr) {
      // Increment streak if logged yesterday
      state.streak++;
    } else {
      // Reset streak if missed a day
      state.streak = 1;
    }

    state.lastEntryDate = today;
    saveData();
  }

  // Update stats cards
  function updateStats() {
    streakDaysEl.textContent = state.streak;

    // Calculate weekly average
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const weeklyEntries = state.history.filter((entry) => {
      return new Date(entry.date) >= oneWeekAgo;
    });

    const weeklyTotal = weeklyEntries.reduce((sum, entry) => sum + entry.amount, 0);
    const weeklyDays = new Set(weeklyEntries.map((entry) => new Date(entry.date).toDateString())).size;

    const weeklyAverage = weeklyDays > 0 ? Math.round(weeklyTotal / weeklyDays) : 0;
    weeklyAverage.textContent = `${weeklyAverage}ml`;

    // Calculate completion rate (days where goal was met)
    const completedDays = state.history.reduce((count, entry) => {
      const entryDate = new Date(entry.date).toDateString();
      const dayEntries = state.history.filter((e) => new Date(e.date).toDateString() === entryDate);
      const dayTotal = dayEntries.reduce((sum, e) => sum + e.amount, 0);

      return dayTotal >= state.goalAmount ? count + 1 : count;
    }, 0);

    const totalTrackedDays = new Set(state.history.map((entry) => new Date(entry.date).toDateString())).size;
    const completionRate = totalTrackedDays > 0 ? Math.round((completedDays / totalTrackedDays) * 100) : 0;

    completionRateEl.textContent = `${completionRate}%`;
  }

  // Setup event listeners
  function setupEventListeners() {
    // Quick add buttons
    document.querySelectorAll('.intake-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const amount = parseInt(btn.getAttribute('data-amount'));
        addWater(amount);
      });
    });

    // Custom add button
    addCustomBtn.addEventListener('click', () => {
      const amount = parseInt(customAmountInput.value);
      if (!isNaN(amount) && amount > 0) {
        addWater(amount);
        customAmountInput.value = '';
      }
    });

    // Allow Enter key to submit custom amount
    customAmountInput.addEventListener('keypress', (e) => {
      if ((e.key = 'Enter')) {
        const amount = parseInt(customAmountInput.value);
        if (!isNaN(amount) && amount > 0) {
          addWater(amount);
          customAmountInput.value = '';
        }
      }
    });

    // Settings modal
    settingsBtn.addEventListener('click', () => {
      // Populate settings form with current values
      dailyGoalInput.value = state.settings.dailyGoal;
      reminderFrequencyInput.value = state.settings.reminderFrequency;
      wakeUpTimeInput.value = state.settings.wakeUpTime;
      bedtimeInput.value = state.settings.bedtime;
      themeInput.value = state.settings.theme;

      settingsModal.style.display = 'flex';
    });

    // Save settings
    saveSettingsBtn.addEventListener('click', () => {
      state.settings.dailyGoal = parseInt(dailyGoalInput.value) || 2000;
      state.settings.reminderFrequency = parseInt(reminderFrequencyInput.value) || 0;
      state.settings.wakeUpTime = wakeUpTimeInput.value;
      state.settings.bedtime = bedtimeInput.value;
      state.settings.theme = themeInput.value;

      state.goalAmount = state.settings.dailyGoal;

      saveData();
      render();
      updateWaveHeight();
      updatePercentageCircle();
      applyTheme();
      setupReminders();

      settingsModal.style.display = 'none';
    });

    // Close modal
    document.querySelectorAll('.close-modal').forEach((btn) => {
      btn.addEventListener('click', () => {
        settingsModal.style.display = 'none';
        historyModal.style.display = 'none';
      });
    });

    // Click outside modal to close
    window.addEventListener('click', (e) => {
      if (e.target === settingsModal) {
        settingsModal.style.display = 'none';
      }
      if (e.target === historyModal) {
        historyModal.style.display = 'none';
      }
    });

    // View all history
    viewAllBtn.addEventListener('click', () => {
      openHistoryModal();
    });

    // Period buttons in history modal
    document.querySelectorAll('.period-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.period-btn').forEach((b) => b.classList.remove(active));
        btn.classList.add('active');

        const period = btn.getAttribute('data-period');
        updateHistoryChart(period);
        renderDetailedHistory(period);
      });
    });

    // Dismiss notification
    dismissNotificationBtn.addEventListener('click', () => {
      notificationEl.style.display = 'none';
    });
  }

  // Open history modal
  function openHistoryModal() {
    historyModal.style.display = 'flex';
    updateHistoryChart('today');
    renderDetailedHistory('today');
  }

  // Update history chart
  function updateHistoryChart(period) {
    let labels = [];
    let data = [];
    const now = new Date();

    if (period === 'today') {
      // Group by hour for today
      const todayEntries = state.history.filter((entry) => {
        return new Date(entry.date).toDateString() === now.toDateString();
      });

      // Initialize hours array
      for (let i = 0; i < 24; i++) {
        labels.push(`${i}:00`);
        data.push(0);
      }

      // Sum amounts by hour
      todayEntries.forEach((entry) => {
        const hour = new Date(entry.date).getHours();
        data[hour] += entry.amount;
      });
    } else if (period === 'week') {
      // Group by day for this week
      const oneWeekAgo = new Date(now);
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);

      // Initialize days array
      for (let i = 0; i < 7; i++) {
        const date = new Date(oneWeekAgo);
        date.setDate(date.getDate() + i);
        labels.push(date.toLocaleDateString([], { weekday: 'short' }));
        data.push(0);
      }

      // Sum amounts by day
      state.history.forEach((entry) => {
        const entryDay = new Date(entry.date);
        if (entryDay >= oneWeekAgo) {
          const dayIndex = Math.floor((entryDay - oneWeekAgo) / (1000 * 60 * 60 * 24));
          if (dayIndex >= 0 && dayIndex <= 7) data[dayIndex] += entry.amount;
        }
      });
    } else if (period === 'month') {
      // Group by day for this month
    }
  }

  // Initialize the app
  init();
});
