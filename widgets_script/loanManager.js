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
  let loansChart = null;
  let loansStatusChart = null;

  // Initialize the app
  init();

  function init() {
    renderLoanTable();
    updateStats();
    setupEventListeners();
    checkThemePreferences();
    hideAllModals();
    initCharts();
  }

  function hideAllModals() {
    const modals = [addLoanModal, loanDetailsModal, makePaymentModal];
    modals.forEach((m) => {
      if (m) {
        m.style.display = 'none';
        m.classList.remove('active');
      }
    });
  }
  
  // Chart functions (uses Chart.js included in the page)
  function initCharts() {
    const canvas = document.getElementById('loansChart');
    if (canvas && typeof Chart !== 'undefined') {
      const ctx = canvas.getContext('2d');
      loansChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [],
          datasets: [
            {
              label: 'Remaining Balance',
              data: [],
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function (value) {
                  return '$' + value.toLocaleString();
                },
              },
            },
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return '$' + (context.parsed.y || context.parsed).toLocaleString();
                },
              },
            },
          },
        },
      });
    }

    const statusCanvas = document.getElementById('loansStatusChart');
    if (statusCanvas && typeof Chart !== 'undefined') {
      const ctx2 = statusCanvas.getContext('2d');
      loansStatusChart = new Chart(ctx2, {
        type: 'doughnut',
        data: {
          labels: ['Active', 'Paid'],
          datasets: [
            {
              data: [0, 0],
              backgroundColor: ['rgba(54,162,235,0.8)', 'rgba(75,192,192,0.8)'],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom' },
          },
        },
      });
    }

    updateCharts();
  }

  function updateCharts() {
    if (loansChart) {
      const labels = loans.map((l) => l.name || `Loan ${l.id}`);
      const data = loans.map((l) => Number(l.remainingBalance) || 0);
      loansChart.data.labels = labels;
      loansChart.data.datasets[0].data = data;
      loansChart.update();
    }

    if (loansStatusChart) {
      const activeCount = loans.filter((l) => l.status === 'active').length;
      const paidCount = loans.filter((l) => l.status === 'paid').length;
      loansStatusChart.data.datasets[0].data = [activeCount, paidCount];
      loansStatusChart.update();
    }
  }

  function setupEventListeners() {
    // Modal open/close
    if (addLoanBtn) {
      addLoanBtn.addEventListener('click', () => {
        if (addLoanModal) {
          addLoanModal.style.display = 'flex';
          addLoanModal.classList.add('active');
        }
      });
    }
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
    if (loanForm) loanForm.addEventListener('submit', handleAddLoan);
    if (paymentForm) paymentForm.addEventListener('submit', handleMakePayment);

    // Search and filter
    if (loanSearch) loanSearch.addEventListener('input', renderLoanTable);
    if (loanFilter) loanFilter.addEventListener('change', renderLoanTable);

    // Theme toggle
    if (themeToggle) themeToggle.addEventListener('change', toggleTheme);
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
    saveLoans();
    renderLoanTable();
    updateStats();

    // Reset form and close modal
    loanForm.reset();
    addLoanModal.style.display = 'none';
    addLoanModal.classList.remove('active');
  }

  function calculateMonthlyPayment(amount, rate, term) {
    const monthlyRate = rate / 100 / 12;
    if (term <= 0) return 0;
    if (monthlyRate === 0) {
      return parseFloat((amount / term).toFixed(2));
    }
    const payment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
    return parseFloat(payment.toFixed(2));
  }

  function generatePaymentSchedule(amount, rate, term, startDate) {
    const schedule = [];
    const monthlyRate = rate / 100 / 12;
    let balance = amount;
    const start = new Date(startDate);

    const monthlyPayment = calculateMonthlyPayment(amount, rate, term);
    for (let i = 1; i <= term; i++) {
      const interest = parseFloat((balance * monthlyRate).toFixed(10));
      const principal = monthlyPayment - interest;
      balance = parseFloat((balance - principal).toFixed(10));

      // Calculate payment date by adding (i-1) months to start
      const paymentDate = new Date(start);
      paymentDate.setMonth(start.getMonth() + i - 1);

      schedule.push({
        paymentNumber: i,
        date: paymentDate.toISOString().split('T')[0],
        payment: monthlyPayment,
        principal: parseFloat(principal.toFixed(2)),
        interest: parseFloat(interest.toFixed(2)),
        remainingBalance: Math.max(0, parseFloat(balance.toFixed(2))),
      });
    }

    return schedule;
  }

  function renderLoanTable() {
    const searchTerm = loanSearch.value.toLowerCase();
    const filterValue = loanFilter.value;

    const filteredLoans = loans.filter((loan) => {
      const matchesSearch = loan.name.toLowerCase().includes(searchTerm);
      const matchesFilter =
        filterValue === 'all' ||
        (filterValue === 'active' && loan.status === 'active') ||
        (filterValue === 'paid' && loan.status === 'paid');
      return matchesSearch && matchesFilter;
    });

    loanTableBody.innerHTML = '';

    if (filteredLoans.length === 0) {
      loanTableBody.innerHTML = `
        <tr>
          <td colspan="7" class="no-loans">No loans found. Add a new loan to get started.</td>
        </tr>
      `;
      return;
    }

    filteredLoans.forEach((loan) => {
      const row = document.createElement('tr');
      row.dataset.id = loan.id;

      row.innerHTML = `
        <td>${loan.name}</td>
        <td>
          ${loan.originalAmount.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </td>
        <td>
          ${loan.remainingBalance.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </td>
        <td>${loan.interestRate}</td>
        <td>
          ${loan.monthlyPayment.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </td>
        <td>
          <span class="status-badge ${loan.status}">${loan.status === 'active' ? 'Active' : 'Paid Off'}</span>
        </td>
        <td>
          <div class="action-btns">
            <button class="action-btn view-loan" title="View Details"><i class="fas fa-eye"></i></button>
            <button class="action-btn delete-loan" title="Delete Loan"><i class="fas fa-trash"></i></button>
          </div>
        </td>
      `;

      loanTableBody.appendChild(row);
    });

    // Add event listeners to action buttons
    document.querySelectorAll('.view-loan').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const loanId = e.target.closest('tr').dataset.id;
        viewLoanDetails(loanId);
      });
    });

    document.querySelectorAll('.delete-loan').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const loanId = e.target.closest('tr').dataset.id;
        deleteLoan(loanId);
      });
    });
  }

  function viewLoanDetails(loanId) {
    currentLoanId = loanId;
    const loan = loans.find((l) => l.id === loanId);

    if (!loan) return;

    // Update modal header
    document.getElementById('detailLoanName').textContent = loan.name;
    document.getElementById('detailLoanStatus').className = `loan-status-badge ${loan.status}`;
    document.getElementById('detailLoanStatus').textContent =
      loan.status === 'active' ? 'Active' : 'Paid Off';

    // Update summary
    document.getElementById('detailOriginalAmount').textContent = `$${loan.originalAmount.toLocaleString(
      'en-US',
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    )}`;
    document.getElementById('detailRemainingBalance').textContent = `$${loan.remainingBalance.toLocaleString(
      'en-US',
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    )}`;
    document.getElementById('detailInterestRate').textContent = `${loan.interestRate}%`;
    document.getElementById('detailMonthlyPayment').textContent = `$${loan.monthlyPayment.toLocaleString(
      'en-US',
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    )}`;
    document.getElementById('detailLoanTerm').textContent = `${loan.term} months`;
    document.getElementById('detailStartDate').textContent = new Date(loan.startDate).toLocaleDateString();

    // Update payment schedule
    const paymentScheduleBody = document.getElementById('paymentScheduleBody');
    paymentScheduleBody.innerHTML = '';

    loan.paymentSchedule.forEach((payment) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${payment.paymentNumber}</td>
        <td>${new Date(payment.date).toLocaleDateString()}</td>
        <td>$${payment.payment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
        <td>$${payment.principal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
        <td>$${payment.interest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
        <td>$${payment.remainingBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
      `;
      paymentScheduleBody.appendChild(row);
    });

    // Set up action buttons (use onclick to avoid duplicate listeners)
    const makePaymentBtnEl = document.getElementById('makePaymentBtn');
    if (makePaymentBtnEl) {
      makePaymentBtnEl.onclick = () => {
        loanDetailsModal.style.display = 'none';
        makePaymentModal.style.display = 'flex';
      };
    }

    const deleteLoanBtnEl = document.getElementById('deleteLoanBtn');
    if (deleteLoanBtnEl) {
      deleteLoanBtnEl.onclick = () => {
        if (confirm('Are you sure you want to delete this loan? This cannot be undone.')) {
          deleteLoan(loanId);
          loanDetailsModal.style.display = 'none';
        }
      };
    }

    // Show the modal
    loanDetailsModal.style.display = 'flex';
  }

  function handleMakePayment(e) {
    e.preventDefault();

    const paymentAmount = parseFloat(document.getElementById('paymentAmount').value);
    const paymentDate = document.getElementById('paymentDate').value;
    const paymentNote = document.getElementById('paymentNote').value;

    const loanIndex = loans.findIndex((l) => l.id === currentLoanId);
    if (loanIndex === -1) return;

    const loan = loans[loanIndex];

    // Record payment
    loan.payments.push({
      amount: paymentAmount,
      date: paymentDate,
      note: paymentNote,
    });

    // Update remaining balance
    loan.remainingBalance = Math.max(0, loan.remainingBalance - paymentAmount);

    // Update status if paid off
    if (loan.remainingBalance <= 0) {
      loan.status = 'paid';
    }

    // Save and update UI
    saveLoans();
    renderLoanTable();
    updateStats();

    // Reset form and close modal
    paymentForm.reset();
    makePaymentModal.style.display = 'none';
    loanDetailsModal.style.display = 'flex';
    viewLoanDetails(currentLoanId);
  }

  function deleteLoan(loanId) {
    loans = loans.filter((loan) => loan.id !== loanId);
    saveLoans();
    renderLoanTable();
    updateStats();
  }

  function updateStats() {
    const totalLoans = loans.length;
    const totalBalance = loans.reduce((sum, loan) => sum + loan.remainingBalance, 0);

    // Find the next payment date (simplified = in a real app, you'd want more complex logic)
    let upcomingPayment = 0;
    const activeLoans = loans.filter((loan) => loan.status === 'active');
    if (activeLoans.length > 0) {
      upcomingPayment = activeLoans[0].monthlyPayment;
    }

    totalLoansEl.textContent = totalLoans;
    totalBalanceEl.textContent = `$${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    upcomingPaymentEl.textContent = `$${upcomingPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  function saveLoans() {
    localStorage.setItem('loans', JSON.stringify(loans));
    // Refresh charts when loans change
    updateCharts();
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
});
