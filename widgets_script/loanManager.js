document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const loanTableBody = document.getElementById('loanTableBody');
  const addLoanBtn = document.getElementById('addLoanBtn');
  const addLoanModal = document.getElementById('addLoanModal');
  const loanDetailsModal = document.getElementById('loanDetailsModal');
  const makePaymentModal = document.getElementById('makePaymentModal');
  const loanForm = document.getElementById('loanForm');
  const paymentForm = document.getElementById('paymentForm');
  const loanSearch = document.getElementById('loanSearch');
  const themeToggle = document.getElementById('themeToggle');
  const totalLoansEl = document.getElementById('totalLoans');
  const totalBalanceEl = document.getElementById('totalBalance');
  const upcomingPaymentEl = document.getElementById('upcomingPayment');

  // State
  let loans = JSON.parse(localStorage.getItem('loans')) || [];
  let currentLoanId = null;

  // Initialize the app
  init();

  function init() {
    renderLoanTable();
    updateStats();
    setupEventListeners();
    checkThemePreferences();
  }
});
