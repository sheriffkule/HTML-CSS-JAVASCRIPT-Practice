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
    localStorage.setItem('waterTrackerState', JSON.stringify(state))
  }
});
