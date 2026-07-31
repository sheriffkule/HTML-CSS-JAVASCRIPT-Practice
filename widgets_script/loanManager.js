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
  const loanFilter = document.getElementById('loanFilter');
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
    // renderLoanTable();
    // updateStats();
    setupEventListeners();
    checkThemePreferences();
  }

  function setupEventListeners() {
    // Modal open/close
    addLoanBtn.addEventListener('click', () => {
      addLoanModal.style.display = 'block';
      addLoanModal.classList.add('active');
    });
    document.querySelectorAll('.close-modal').forEach((btn) => {
      btn.addEventListener('click', () => {
        addLoanModal.style.display = 'none';
        addLoanModal.classList.remove('active');
        loanDetailsModal.style.display = 'none';
        loanDetailsModal.classList.remove('active');
        makePaymentModal.style.display = 'none';
        makePaymentModal.classList.remove('active');
      });
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
      if (e.target === addLoanModal) {
        addLoanModal.style.display = 'none';
        addLoanModal.classList.remove('active');
      }
      if (e.target === loanDetailsModal) {
        loanDetailsModal.style.display = 'none';
        loanDetailsModal.classList.remove('active');
      }
      if (e.target === makePaymentModal) {
        makePaymentModal.style.display = 'none';
        makePaymentModal.classList.remove('active');
      }
    });
    // Form submission
    loanForm.addEventListener('submit', handleAddLoan);
    // paymentForm.addEventListener('submit', handleMakePayment);

    // Search and filter
    // loanSearch.addEventListener('input', renderLoanTable);
    // loanFilter.addEventListener('change', renderLoanTable);

    // Theme toggle
    themeToggle.addEventListener('change', toggleTheme);
  }

  function checkThemePreferences() {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    themeToggle.checked = darkMode;
    document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }

  function toggleTheme() {
    const isDark = themeToggle.checked;
    document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('darkMode', isDark);
  }

  // Loan functions
  function handleAddLoan(e) {
    e.preventDefault();

    const loanName = document.getElementById('loanName').value;
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const loanTerm = parseInt(document.getElementById('loanTerm').value);
    const startDate = document.getElementById('startDate').value;

    const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, loanTerm);
    const paymentSchedule = generatePaymentSchedule(loanAmount, interestRate, loanTerm, startDate);

    const newLoan = {
      id: Date.now().toString(),
      name: loanName,
      originalAmount: loanAmount,
      remainingBalance: loanAmount,
      interestRate: interestRate,
      monthlyPayment: monthlyPayment,
      term: loanTerm,
      startDate: startDate,
      status: 'active',
      payments: [],
      paymentSchedule: paymentSchedule,
    };

    loans.push(newLoan);
    // saveLoans()
    // renderLoanTable()
    // updateStats()

    // Reset form and close modal
    loanForm.reset();
    addLoanModal.style.display = 'none';
    addLoanModal.classList.remove('active');
  }

  function calculateMonthlyPayment(amount, rate, term) {
    const monthlyRate = rate / 100 / 12;
    const payment =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) / Math.pow(1 + monthlyRate, term);
    return parseFloat(payment.toFixed(2));
  }

  function generatePaymentSchedule(amount, rate, term, startDate) {
    const schedule = [];
    const monthlyRate = rate / 100 / 12;
    let balance = amount;
    const start = new Date(startDate);

    for (let i = 1; i <= term; i++) {
      const interest = balance * monthlyRate;
      const principal = calculateMonthlyPayment(amount, rate, term) - interest;
      balance -= principal;

      // Calculate payment data
      const paymentDate = new Date(start);
      paymentDate.setMonth(start.getMonth() + 1);

      schedule.push({
        paymentNumber: 1,
        date: paymentDate.toISOString().split('T')[0],
        payment: calculateMonthlyPayment(amount, rate, term),
        principal: parseFloat(principal.toFixed(2)),
        interest: parseFloat(interest.toFixed(2)),
        remainingBalance: Math.max(0, parseFloat(balance.toFixed(2))),
      });
    }

    return schedule;
  }
});
