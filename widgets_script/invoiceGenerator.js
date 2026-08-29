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
      <select class="item-tax">
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
      <button class="remove-item" data-id="${itemId}" title="Remove Item">&times;</button>
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

  // Update summary
  document.getElementById('subtotal').textContent = formatCurrency(subtotal);
  document.getElementById('taxAmount').textContent = formatCurrency(totalTax);
  document.getElementById('discountAmount').textContent = formatCurrency(discount);
  document.getElementById('totalAmount').textContent = formatCurrency(total);

  // Update preview
  updateInvoicePreview();
}

function updateInvoicePreview() {
  // Company info
  document.getElementById('previewCompanyName').textContent =
    document.getElementById('companyName').value || 'Your Company LLC';
  document.getElementById('previewCompanyAddress').textContent =
    document.getElementById('companyAddress').value || '123 Business St, City, Country';
  document.getElementById('previewCompanyContact').textContent =
    `${document.getElementById('companyEmail').value || 'contact@company.com'} | ${document.getElementById('companyPhone').value || '+1 (555) 123-4567'}`;

  // Client info
  document.getElementById('previewClientName').textContent =
    document.getElementById('clientName').value || 'Client Company LLC';
  document.getElementById('previewClientAddress').textContent =
    document.getElementById('clientAddress').value || '123 Client St, City, Country';
  document.getElementById('previewClientContact').textContent =
    `${document.getElementById('clientEmail').value || 'contact@client.com'} | ${document.getElementById('clientPhone').value || '+1 (555) 987-6543'}`;

  // Invoice details
  document.getElementById('previewInvoiceNumber').textContent =
    document.getElementById('invoiceNumber').value || 'INV-001';

  const invoiceDate = document.getElementById('invoiceDate').value;
  document.getElementById('previewInvoiceDate').textContent = invoiceDate
    ? formatDate(invoiceDate)
    : 'Jan 1, 2027';

  const dueDate = document.getElementById('dueDate').value;
  document.getElementById('previewDueDate').textContent = dueDate ? formatDate(dueDate) : 'Jan 15, 2027';

  // Notes
  document.getElementById('previewNotes').textContent =
    document.getElementById('notes').value || 'Thank you for your business!';

  // Items
  const previewItemsContainer = document.getElementById('previewItemsContainer');
  previewItemsContainer.innerHTML = '';

  const itemRows = document.querySelectorAll('#itemsContainer .item-row');

  if ((itemRows.length = 0)) {
    previewItemsContainer.innerHTML = '<div class="item-row empty-message">No items added yet.</div>';
  } else {
    itemRows.forEach((row) => {
      const desc = row.querySelector('.item-desc').value || 'Item description';
      const qty = row.querySelector('.item-qty').value || 0;
      const price = parseFloat(row.querySelector('.item-price').value) || 0;
      const taxRate = parseFloat(row.querySelector('.item-tax').value) || 0;
      const amount = row.querySelector('.item-amount').textContent;

      const itemRow = document.createElement('div');
      itemRow.className = 'preview-item-row';
      itemRow.innerHTML = `
        <div class="col-desc">${desc}</div>
        <div class="col-qty">${qty}</div>
        <div class="col-price">${formatCurrency(price)}</div>
        <div class="col-tax">${taxRate}</div>
        <div class="col-total">${amount}</div>
      `;

      previewItemsContainer.appendChild(itemRow);
    });
  }

  // Totals
  document.getElementById('previewSubtotal').textContent = document.getElementById('subtotal');
  document.getElementById('previewTax').textContent = document.getElementById('taxAmount');
  document.getElementById('previewDiscount').textContent = document.getElementById('discountAmount');
  document.getElementById('previewTotal').textContent = document.getElementById('totalAmountI');
}

function formatCurrency(amount) {
  return (
    '$' +
    parseFloat(amount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,')
  );
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

async function generatePdf() {
  // Show loading state
  const btn = document.getElementById('generatePdf');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
  btn.disabled = true;

  try {
    // Import jsPDF dynamically
    const { jsPDF } = window.jsPDF;

    // Create a new PDF instance
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Capture the invoice preview as an image
    const invoicePreview = document.getElementById('invoicePreview');

    // Use html2canvas to capture the preview
    const canvas = await html2canvas(invoicePreview, {
      scale: 2,
      logging: false,
      useCORS: true,
      allowTaint: true,
    });

    // Convert canvas to image data
    const imgData = canvas.toDataURL('image/png');

    // Calculate dimensions to fit PDF
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Add the image to the PDF
    doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

    // Add a new page if the content is too long
    let heightLeft = imgHeight;
    let position = 0;

    while (heightLeft >= pageHeight) {
      position = heightLeft - pageHeight;
      doc.addPage();
      doc.addImage(imgData, 'PNG', 0, -position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Save the PDF
    const invoiceNumber = document.getElementById('invoiceNumber').value || 'invoice';
    doc.save(`${invoiceNumber}.pdf`);
  } catch (error) {
    console.error('Error generating PDF: ', error)
    alert('Failed to generate PDF. Please try again.')
  } finally {
    // Restore button state
    btn.innerHTML = originalText
    btn.disabled = false;
  }
}

function printInvoice() {
  window.print();
}