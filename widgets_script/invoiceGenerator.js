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
