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
  }
});
