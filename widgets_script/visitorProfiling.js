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
        statsModal.style.display = 'none';
        detailsModal.style.display = 'none';
      });
    });

    // Close modals when clicking outside
    window.addEventListener('click', function (e) {
      if (e.target === statsModal) {
        statsModal.style.display = 'none';
      }
      if (e.target === detailsModal) {
        detailsModal.style.display = 'none';
      }
    });

    // Checkout button
    checkoutBtn.addEventListener('click', function () {
      if (currentVisitorId) {
        checkoutVisitor(currentVisitorId);
        detailsModal.style.display = 'none';
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
        visitor.name.toLowerCase().includes(searchTerm) ||
        visitor.company.toLowerCase().includes(searchTerm) ||
        visitor.host.toLowerCase().includes(searchTerm) ||
        visitor.purpose.toLowerCase().includes(searchTerm);

      const matchesPurpose = purposeFilter ? visitor.purpose === purposeFilter : true;

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
      row.innerHTML = `<td colspan="8" style="text-align: center; padding: 30px;color: var(--gray-color)">
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
        ? `<span class="badge checked-out">Checked Out</span>`
        : `<span class="badge checked-in">Checked In</span>`;

      row.innerHTML = `
        <td>${visitor.name}</td>
        <td>${visitor.company}</td>
        <td>${visitor.purpose}</td>
        <td>${visitor.host}</td>
        <td>${checkInTime}</td>
        <td>${checkOutTime}</td>
        <td>
          <button class="action-btn view-btn" data-id="${visitor.id}" title="View Details">
            <i class="fas fa-eye"></i>
          </button>
          ${
            !visitor.checkOut
              ? `
                <button className="action-btn checkout-btn" data-id="${visitor.id}" title="Check Out">
                  <i className="fas fa-sign-out-alt"></i>
                </button>
              `
              : ''
          }
          <button className="action-btn delete-btn" data-id="${visitor.id}" title="Delete">
            <i className="fas fa-trash"></i>
          </button>
        </td>
      `;

      visitorTableBody.appendChild(row);
    });

    // Add event listeners to action buttons
    document.querySelectorAll('view-btn').forEach((btn) => {
      btn.addEventListener('click', function () {
        const id = parseInt(this.getAttribute('data-id'));
        showVisitorDetails(id);
      });
    });

    document.querySelectorAll('checkout-btn').forEach((btn) => {
      btn.addEventListener('click', function () {
        const id = parseInt(this.getAttribute('data-id'));
        checkOutVisitor(id);
      });
    });

    document.querySelectorAll('delete-btn').forEach((btn) => {
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
    document.getElementById('detail-checkin').textContent = formatDateTime(visitor.checkIn, true);
    document.getElementById('detail-checkout').textContent = visitor.checkOut
      ? formatDateTime(visitor.checkOut, true)
      : 'N/A';
    document.getElementById('detail-notes').textContent = visitor.notes || 'N/A';

    // Show/Hide checkout button based on status
    checkoutBtn.style.display = visitor.checkOut ? 'none' : 'flex';

    detailsModal.style.display = 'block';
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
    const todayVisitors = visitors.filter((v) => v.checkIn.split('T')[0] === today).length;
    const currentVisitors = visitors.filter((v) => !v.checkOut).length;
    const totalVisitors = visitors.length;

    document.getElementById('today-count').textContent = todayVisitors;
    document.getElementById('current-count').textContent = currentVisitors;
    document.getElementById('total-count').textContent = totalVisitors;

    // Render charts
    renderPurposeChart();
    renderTimeChart();

    statsModal.style.display = 'block';
  }

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
    if (window.purposeChart) {
      window.purposeChart.destroy();
    }

    window.purposeChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: purposes,
        dataset: [
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
});
