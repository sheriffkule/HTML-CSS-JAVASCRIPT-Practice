document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const visitorForm = document.getElementById('visitor-form');
  const visitorTableBody = document.getElementById('visitor-table-body');
  const searchInput = document.getElementById('search');
  const filterPurpose = document.getElementById('filter-purpose');
  const filterStatus = document.getElementById('filter-status');
  const statsBtn = document.getElementById('stats-btn');
  const exportBtn = document.getElementById('export-btn');
  const statsModal = document.getElementById('stats-modal');
  const detailsModal = document.getElementById('details-modal');
  const checkoutBtn = document.getElementById('checkout-btn');
  const printBtn = document.getElementById('print-details');
  const closeButtons = document.querySelectorAll('.close');

  // Visitor data
  let visitors = JSON.parse(localStorage.getItem('visitors')) || [];
  let currentVisitorId = null;

  // Initialize the app
  init();

  function init() {
    setupEventListeners();
    renderVisitorTable();
  }

  function setupEventListeners() {
    // Form submission
    visitorForm.addEventListener('submit', function (e) {
      e.preventDefault();
      addVisitor();
    });

    // Search and filter
    searchInput.addEventListener('input', renderVisitorTable);
    filterPurpose.addEventListener('change', renderVisitorTable);
    filterStatus.addEventListener('change', renderVisitorTable);

    // Modal buttons
    statsBtn.addEventListener('click', showStatsModal);
    exportBtn.addEventListener('click', exportVisitors);

    // Close modals
    closeButtons.forEach((btn) => {
      btn.addEventListener('click', function () {
        const modal = this.closest('.modal');
        closeModal(modal);
      });
    });

    // Close modals when clicking outside
    window.addEventListener('click', function (e) {
      if (e.target === statsModal) {
        closeModal(statsModal);
      }
      if (e.target === detailsModal) {
        closeModal(detailsModal);
      }
    });

    // Checkout button
    checkoutBtn.addEventListener('click', function () {
      if (currentVisitorId) {
        checkoutVisitor(currentVisitorId);
        closeModal(detailsModal);
      }
    });

    // Print button
    printBtn.addEventListener('click', function () {
      window.print();
    });
  }

  function addVisitor() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const company = document.getElementById('company').value;
    const purpose = document.getElementById('purpose').value;
    const host = document.getElementById('host').value;
    const notes = document.getElementById('notes').value;

    const newVisitor = {
      id: Date.now(),
      name,
      phone,
      email,
      company,
      purpose,
      host,
      notes,
      checkIn: new Date().toISOString(),
      checkOut: null,
    };

    visitors.unshift(newVisitor);
    saveVisitors();
    renderVisitorTable();
    visitorForm.reset();

    // Show success feedback
    showToast('Visitor added successfully!');
  }

  function checkoutVisitor(visitorId) {
    const visitor = visitors.find((v) => v.id === visitorId);
    if (visitor) {
      visitor.checkOut = new Date().toISOString();
      saveVisitors();
      renderVisitorTable();

      // Show success feedback
      showToast('Visitor checked out successfully!');
    }
  }

  function renderVisitorTable() {
    const searchTerm = searchInput.value.toLowerCase();
    const purposeFilter = filterPurpose.value;
    const statusFilter = filterStatus.value;

    const filteredVisitors = visitors.filter((visitor) => {
      const matchesSearch =
        (visitor.name || '').toLowerCase().includes(searchTerm) ||
        (visitor.company || '').toLowerCase().includes(searchTerm) ||
        (visitor.host || '').toLowerCase().includes(searchTerm) ||
        (visitor.purpose || '').toLowerCase().includes(searchTerm);

      const matchesPurpose = purposeFilter ? (visitor.purpose || '') === purposeFilter : true;

      const matchesStatus =
        statusFilter === 'all'
          ? true
          : statusFilter === 'checked-in'
            ? !visitor.checkOut
            : statusFilter === 'checked-out'
              ? visitor.checkOut
              : false;

      return matchesSearch && matchesPurpose && matchesStatus;
    });

    visitorTableBody.innerHTML = '';

    if (filteredVisitors.length === 0) {
      const row = document.createElement('tr');
      row.innerHTML = `<td colspan="8" style="text-align: center; padding: 30px;color: var(--gray)">
        No visitors found.
      </td>`;
      visitorTableBody.appendChild(row);
      return;
    }

    filteredVisitors.forEach((visitor) => {
      const row = document.createElement('tr');

      const checkInTime = formatDateTime(visitor.checkIn);
      const checkOutTime = visitor.checkOut ? formatDateTime(visitor.checkOut) : 'N/A';

      const statusBadge = visitor.checkOut
        ? `<span class="status-badge status-checked-out">Checked Out</span>`
        : `<span class="status-badge status-checked-in">Checked In</span>`;

      row.innerHTML = `
        <td>${visitor.name}</td>
        <td>${visitor.company || 'N/A'}</td>
        <td>${visitor.purpose || 'N/A'}</td>
        <td>${visitor.host || 'N/A'}</td>
        <td>${checkInTime}</td>
        <td>${checkOutTime}</td>
        <td>${statusBadge}</td>
        <td>
          <button class="action-btn view-btn" data-id="${visitor.id}" title="View Details">
            <i class="fas fa-eye"></i>
          </button>
          ${
            !visitor.checkOut
              ? `
                <button class="action-btn checkout-btn" data-id="${visitor.id}" title="Check Out">
                  <i class="fas fa-sign-out-alt"></i>
                </button>
              `
              : ''
          }
          <button class="action-btn delete-btn" data-id="${visitor.id}" title="Delete">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      `;

      visitorTableBody.appendChild(row);
    });

    // Add event listeners to action buttons
    document.querySelectorAll('.view-btn').forEach((btn) => {
      btn.addEventListener('click', function () {
        const id = parseInt(this.getAttribute('data-id'));
        showVisitorDetails(id);
      });
    });

    document.querySelectorAll('.checkout-btn').forEach((btn) => {
      btn.addEventListener('click', function () {
        const id = parseInt(this.getAttribute('data-id'));
        checkoutVisitor(id);
      });
    });

    document.querySelectorAll('.delete-btn').forEach((btn) => {
      btn.addEventListener('click', function () {
        const id = parseInt(this.getAttribute('data-id'));
        deleteVisitor(id);
      });
    });
  }

  function showVisitorDetails(id) {
    const visitor = visitors.find((v) => v.id === id);
    if (!visitor) return;

    currentVisitorId = id;

    document.getElementById('detail-name').textContent = visitor.name;
    document.getElementById('detail-company').textContent = visitor.company || 'N/A';
    document.getElementById('detail-phone').textContent = visitor.phone || 'N/A';
    document.getElementById('detail-email').textContent = visitor.email || 'N/A';
    document.getElementById('detail-purpose').textContent = visitor.purpose;
    document.getElementById('detail-host').textContent = visitor.host || 'N/A';
    document.getElementById('detail-status').textContent = visitor.checkOut ? 'Checked Out' : 'Checked In';
    document.getElementById('detail-checkin').textContent = formatDateTime(visitor.checkIn, true);
    document.getElementById('detail-checkout').textContent = visitor.checkOut
      ? formatDateTime(visitor.checkOut, true)
      : 'N/A';
    document.getElementById('detail-notes').textContent = visitor.notes || 'N/A';

    // Show/Hide checkout button based on status
    checkoutBtn.style.display = visitor.checkOut ? 'none' : 'flex';

    openModal(detailsModal);
  }

  function deleteVisitor(id) {
    if (confirm('Are you sure you want to delete this visitor record?')) {
      visitors = visitors.filter((v) => v.id !== id);
      saveVisitors();
      renderVisitorTable();

      // Show feedback
      showToast('Visitor record deleted!');
    }
  }

  function showStatsModal() {
    // Calculate stats
    const today = new Date().toISOString().split('T')[0];
    const todayVisitors = visitors.filter((v) => v.checkIn && v.checkIn.split('T')[0] === today).length;
    const currentVisitors = visitors.filter((v) => !v.checkOut).length;
    const totalVisitors = visitors.length;

    document.getElementById('today-count').textContent = todayVisitors;
    document.getElementById('current-count').textContent = currentVisitors;
    document.getElementById('total-count').textContent = totalVisitors;

    // Render charts
    renderPurposeChart();
    renderTimeChart();

    openModal(statsModal);
  
    function renderPurposeChart() {
    const ctx = document.getElementById('purposeChart').getContext('2d');

    // Group visitors by purpose
    const purposeCounts = {};
    visitors.forEach((v) => {
      purposeCounts[v.purpose] = (purposeCounts[v.purpose] || 0) + 1;
    });

    const purposes = Object.keys(purposeCounts);
    const counts = Object.values(purposeCounts);

    // Destroy previous chart if it exists
    if (window._purposeChart) {
      window._purposeChart.destroy();
    }

    window._purposeChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: purposes,
        datasets: [
          {
            data: counts,
            backgroundColor: ['#4361ee', '#3f37c9', '#4895ef', '#4cc9f0', '#f72585', '#b5179e', '#7209b7'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Visitors by Purpose',
            font: {
              size: 16,
            },
          },
          legend: {
            position: 'right',
          },
        },
      },
    });
  }
}

  function renderTimeChart() {
    const ctx = document.getElementById('timeChart').getContext('2d');

    // Group visitors by hour of check-in
    const hours = Array(24)
      .fill(0)
      .map((_, i) => i);
    const hourCounts = Array(24).fill(0);

    visitors.forEach((v) => {
      const hour = new Date(v.checkIn).getHours();
      hourCounts[hour]++;
    });

    // Destroy previous chart if it exist
    if (window._timeChart) {
      window._timeChart.destroy();
    }

    window._timeChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: hours.map((h) => `${h}:00`),
        datasets: [
          {
            label: 'Visitors per hour',
            data: hourCounts,
            backgroundColor: '#4361ee',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'VIsitors by Check In Time',
            font: {
              size: 16,
            },
          },
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0,
            },
          },
        },
      },
    });
  }

  function exportVisitors() {
    const dataStr = JSON.stringify(visitors, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = `visitors_${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

    showToast('Export started!');
  }

  function saveVisitors() {
    localStorage.setItem('visitors', JSON.stringify(visitors));
  }

  function formatDateTime(dateString, full = false) {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) {
      return 'N/A';
    }

    if (full) return date.toLocaleString();

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const timeStr = date.toLocaleDateString([], { hour: '2-digit', minute: '2-digit' });

    if (date >= today) {
      return `Today, ${timeStr}`;
    } else if (date >= yesterday) {
      return `Yesterday, ${timeStr}`;
    } else {
      return date.toLocaleDateString() + ', ' + timeStr;
    }
  }

  function hideAllModals() {
    const modals = [statsModal, detailsModal];
    modals.forEach((m) => {
      if (m) {
        clearTimeout(m._closeTimeout);
        m.style.display = 'none';
        m.classList.remove('active', 'closing');
      }
    });
  }

  function openModal(modal) {
    if (!modal) return;
    hideAllModals();
    clearTimeout(modal._closeTimeout);
    modal.classList.remove('closing');
    modal.style.display = 'flex';
    // Force a reflow so the browser registers the display change and
    // animates from the current state.
    void modal.offsetWidth;
    modal.classList.add('active');
  }

  function closeModal(modal, onDone) {
    if (!modal) return;
    // If the modal is already hidden, nothing to animate.
    if (modal.style.display === 'none') {
      if (typeof onDone === 'function') onDone();
      return;
    }
    modal.classList.remove('active');
    modal.classList.add('closing');
    // Keep it rendered while the closing transition plays, then hide it.
    clearTimeout(modal._closeTimeout);
    modal._closeTimeout = setTimeout(() => {
      modal.classList.remove('closing');
      modal.style.display = 'none';
      if (typeof onDone === 'function') onDone();
    }, 500);
  }

  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
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
});
