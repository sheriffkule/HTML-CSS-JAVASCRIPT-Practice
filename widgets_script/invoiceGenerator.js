document.addEventListener('DOMContentLoaded', function () {
  // Initialize the app
  initApp();
});

function initApp() {
  // Set current date as default
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('invoiceDate').value = today;

  // Set due date to 15 days from now
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 15);
  document.getElementById('dueDate').value = dueDate.toISOString().split('T')[0];

  // Generate a random invoice number
  document.getElementById('invoiceNumber').value = 'INV-' + Math.floor(1000 + Math.random() + 9000);

  // Theme toggle functionality
  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('change', themeToggle);

  // Check for saved theme preferences
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeToggle.checked = savedTheme === 'dark';

  // Add event listeners to form inputs
  setupFormListeners();

  // Add first item row by default
  addItemRow();

  // Set up button event listeners
  document.getElementById('addItem').addEventListener('click', addItemRow);
  document.getElementById('generatePdf').addEventListener('click', generatePdf);
  document.getElementById('printInvoice').addEventListener('click', printInvoice);
  document.getElementById('clearAll').addEventListener('click', clearAll);

  // Initial preview update
  updateInvoicePreview();
}

function toggleTheme() {
  const newTheme = this.checked ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', newTheme)
  localStorage.setItem('theme', newTheme)
}

function setupFormListeners() {
  // Company info
  document.getElementById('companyName').addEventListener('input', updateInvoicePreview)
  document.getElementById('companyEmail').addEventListener('input', updateInvoicePreview)
  document.getElementById('companyAddress').addEventListener('input', updateInvoicePreview)
  document.getElementById('companyPhone').addEventListener('input', updateInvoicePreview)

  // Client info
  document.getElementById('clientName').addEventListener('input', updateInvoicePreview)
  document.getElementById('clientEmail').addEventListener('input', updateInvoicePreview)
  document.getElementById('clientAddress').addEventListener('input', updateInvoicePreview)
  document.getElementById('clientPhone').addEventListener('input', updateInvoicePreview)

  // Invoice details
  document.getElementById('invoiceNumber').addEventListener('input', updateInvoicePreview)
  document.getElementById('invoiceDate').addEventListener('input', updateInvoicePreview)
  document.getElementById('dueDate').addEventListener('input', updateInvoicePreview)

  // Notes
  document.getElementById('notes').addEventListener('input', updateInvoicePreview)

  // Totals
  document.getElementById('taxRate').addEventListener('input', calculateTotals)
  document.getElementById('discount').addEventListener('input', calculateTotals)
}