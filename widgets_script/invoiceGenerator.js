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
  document.getElementById('invoiceNumber').value = 'INV-' + Math.floor(1000 + Math.random() * 9000);

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
  const newTheme = this.checked ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

function setupFormListeners() {
  // Company info
  document.getElementById('companyName').addEventListener('input', updateInvoicePreview);
  document.getElementById('companyEmail').addEventListener('input', updateInvoicePreview);
  document.getElementById('companyAddress').addEventListener('input', updateInvoicePreview);
  document.getElementById('companyPhone').addEventListener('input', updateInvoicePreview);

  // Client info
  document.getElementById('clientName').addEventListener('input', updateInvoicePreview);
  document.getElementById('clientEmail').addEventListener('input', updateInvoicePreview);
  document.getElementById('clientAddress').addEventListener('input', updateInvoicePreview);
  document.getElementById('clientPhone').addEventListener('input', updateInvoicePreview);

  // Invoice details
  document.getElementById('invoiceNumber').addEventListener('input', updateInvoicePreview);
  document.getElementById('invoiceDate').addEventListener('input', updateInvoicePreview);
  document.getElementById('dueDate').addEventListener('input', updateInvoicePreview);

  // Notes
  document.getElementById('notes').addEventListener('input', updateInvoicePreview);

  // Totals
  document.getElementById('taxRate').addEventListener('input', calculateTotals);
  document.getElementById('discount').addEventListener('input', calculateTotals);
}

function addItemRow() {
  const itemsContainer = document.getElementById('itemsContainer');
  const itemId = Date.now();

  const itemRow = document.createElement('div');
  itemRow.className = 'item-row';
  itemRow.dataset.id = itemId;

  itemRow.innerHTML = `
    <div class="item-col description">
      <input type="text" class="item-desc" placeholder="Item description" />
    </div>
    <div class="item-col quantity">
      <input type="number" class="item-qty" value="1" min="1" step="1" />
    </div>
    <div class="item-col price">
      <input type="number" class="item-price" value="0" min="0" step="0.00" />
    </div>
    <div class="item-col tax">
      <select className="item-tax">
        <option value="0">0</option>
        <option value="10" selected>10%</option>
        <option value="20">20%</option>
        <option value="other">Other</option>
      </select>
    </div>
    <div class="item-col amount">
      <span class="item-amount">$0.00</span>
    </div>
    <div class="item-col action">
      <button class="remove-item" data-id="${itemId}">&times;</button>
    </div>
  `;

  itemsContainer.appendChild(itemRow);

  // Add event listeners to new item inputs
  const descInput = itemRow.querySelector('.item-desc');
  const qtyInput = itemRow.querySelector('.item-qty');
  const priceInput = itemRow.querySelector('.item-price');
  const taxSelect = itemRow.querySelector('.item-tax');
  const removeBtn = itemRow.querySelector('.remove-item');

  descInput.addEventListener('input', updateInvoicePreview);
  qtyInput.addEventListener('input', () => {
    calculateItemTotal(itemRow);
    calculateTotals();
    updateInvoicePreview();
  });

  priceInput.addEventListener('input', () => {
    calculateItemTotal(itemRow);
    calculateTotals();
    updateInvoicePreview();
  });

  taxSelect.addEventListener('change', () => {
    calculateItemTotal(itemRow);
    calculateTotals();
    updateInvoicePreview();
  });

  removeBtn.addEventListener('click', () => {
    itemRow.remove();
    calculateTotals();
    updateInvoicePreview();
  });

  // Focus on the description field
  descInput.focus();
}

function calculateItemTotal(itemRow) {
  const qty = parseFloat(itemRow.querySelector('.item-qty').value) || 0;
  const price = parseFloat(itemRow.querySelector('.item-price').value) || 0;
  const taxSelect = itemRow.querySelector('.item-tax');
  let taxRate = parseFloat(taxSelect.value) || 0;

  const subtotal = qty * price;
  const taxAmount = subtotal * (taxRate / 100);
  const total = subtotal + taxAmount;

  itemRow.querySelector('.item-amount').textContent = formatCurrency(total);
}

function calculateTotals() {
  const itemRows = document.querySelectorAll('#itemsContainer .item-row');
  const taxRate = parseFloat(document.getElementById('taxRate').value) || 0;
  const discount = parseFloat(document.getElementById('discount').value) || 0;

  let subtotal = 0;
  let totalTax = 0;

  itemRows.forEach((row) => {
    const qty = parseFloat(row.querySelector('.item-qty').value) || 0;
    const price = parseFloat(row.querySelector('.item-price').value) || 0;
    const rowTaxRate = parseFloat(row.querySelector('.item-tax').value) || 0;

    const rowSubtotal = qty * price;
    subtotal += rowSubtotal;

    const rowTax = rowSubtotal * (rowTaxRate / 100);
    totalTax += rowTax;
  });

  const total = subtotal + totalTax - discount;
}
