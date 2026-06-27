document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const groceryForm = document.getElementById('groceryForm');
  const groceryItemsContainer = document.getElementById('groceryItems');
  const addItemBtn = document.getElementById('addItemBtn');
  const exportBtn = document.getElementById('exportBtn');
  const importBtn = document.getElementById('importBtn');
  const itemModal = document.getElementById('itemModal');
  const importModal = document.getElementById('importModal');
  const closeBtns = document.querySelectorAll('.close-btn');
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const sortBy = document.getElementById('sortBy');
  const themeToggle = document.getElementById('themeToggle');
  const successAlert = document.getElementById('successAlert');
  const errorAlert = document.getElementById('errorAlert');
  const emptyState = document.querySelector('.empty-state');

  // Initialize with 10 dummy products
  let groceryItems = (() => {
    try {
      return JSON.parse(localStorage.getItem('groceryItems'));
    } catch {
      localStorage.removeItem('groceryItems');
      return null;
    }
  })() || [
    { id: '1', upc: '123456789', name: 'Whole Milk', category: 'Dairy', price: 3.99 },
    { id: '2', upc: '234567891', name: 'Whole Wheat Bread', category: 'Bakery', price: 2.5 },
    { id: '3', upc: '345678912', name: 'Fresh Eggs', category: 'Dairy', price: 4.25 },
    { id: '4', upc: '456789123', name: 'Bananas', category: 'Produce', price: 0.59 },
    { id: '5', upc: '567891234', name: 'Ground Beef', category: 'Meat', price: 5.99 },
    { id: '6', upc: '678912345', name: 'Cheddar Cheese', category: 'Dairy', price: 3.75 },
    { id: '7', upc: '789123456', name: 'Tomatoes', category: 'Produce', price: 1.99 },
    { id: '8', upc: '891234567', name: 'Chicken Breast', category: 'Meat', price: 7.49 },
    { id: '9', upc: '901234567', name: 'Potatoes', category: 'Produce', price: 2.99 },
    { id: '10', upc: '012345678', name: 'Orange Juice', category: 'Beverages', price: 3.25 },
  ];
  let categories = [];

  // Initialize the app
  function init() {
    saveToLocalStorage();
    renderGroceryItems();
    updateCategories();
    loadThemePreference();

    // Show empty state if no items
    groceryItems.length === 0 ? (emptyState.style.display = 'block') : (emptyState.style.display = 'none');
  }

  // Render grocery items to the DOM
  function renderGroceryItems(items = null) {
    const itemsToRender = items || groceryItems;
    groceryItemsContainer.innerHTML = '';

    if (itemsToRender.length === 0) {
      emptyState.style.display = 'block';
      return;
    } else {
      emptyState.style.display = 'none';
    }

    itemsToRender.forEach((item) => {
      const groceryItem = document.createElement('div');
      groceryItem.className = 'grocery-item';
      groceryItem.dataset.id = item.id;
      groceryItem.innerHTML = `
        <div class="item-upc">${item.upc}</div>
        <div class="item-name">${item.name}</div>
        <div class="item-category">${item.category || ''}</div>
        <div class="item-price">${item.price.toFixed(2)}</div>
        <div class="item-actions">
          <button class="action-btn edit-btn" title="Edit">
            <i class="fas fa-edit"></i>
          </button>
          <button class="action-btn delete-btn" title="Delete">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      `;

      groceryItemsContainer.appendChild(groceryItem);
    });

    // Add event listeners to edit button
    document.querySelectorAll('.edit-btn').forEach((btn) => {
      btn.addEventListener('click', function () {
        const itemId = this.closest('.grocery-item').dataset.id;
        editItem(itemId);
      });
    });

    document.querySelectorAll('.delete-btn').forEach((btn) => {
      btn.addEventListener('click', function () {
        const itemId = this.closest('.grocery-item').dataset.id;
        deleteItem(itemId);
      });
    });
  }

  // Update categories list
  function updateCategories() {
    categories = [...new Set(groceryItems.map((item) => item.category).filter(Boolean))];
    categoryFilter.innerHTML = '<option value="">All Categories</option>';
    const categoriesDataList = document.getElementById('categories');
    categoriesDataList.innerHTML = '';

    categories.forEach((cat) => {
      categoryFilter.innerHTML += `<option value="${cat}">${cat}</option>`;
      categoriesDataList.innerHTML += `<option value="${cat}">`;
    });
  }

  // Save to localStorage
  function saveToLocalStorage() {
    localStorage.setItem('groceryItems', JSON.stringify(groceryItems));
  }

  // Show alert message
  function showAlert(message, type = 'success') {
    const alert = type === 'success' ? successAlert : errorAlert;
    alert.textContent = message;
    alert.style.display = 'block';

    setTimeout(() => {
      alert.style.display = 'none';
    }, 5000);
  }

  // Add new grocery item
  function addItem(e) {
    e.preventDefault();

    const id = Date.now().toString();
    const upc = document.getElementById('upc').value;
    const name = document.getElementById('name').value;
    const price = parseFloat(document.getElementById('price').value);
    const category = document.getElementById('category').value;

    // Validate UPC uniqueness
    const upcExists = groceryItems.some((item) => item.upc === upc);

    if (upcExists) {
      showAlert('Item with this UPC already exists!', 'error');
      return;
    }

    const newItem = { id, upc, name, price, category };

    groceryItems.unshift(newItem);
    saveToLocalStorage();
    renderGroceryItems();
    updateCategories();
    closeModal();
    showAlert('Item added successfully!');
  }

  // Edit an existing item
  function editItem(itemId) {
    const item = groceryItems.find((item) => item.id === itemId);
    if (!item) return;

    document.getElementById('modalTitle').textContent = 'Edit Item';
    document.getElementById('itemId').value = item.id;
    document.getElementById('upc').value = item.upc;
    document.getElementById('name').value = item.name;
    document.getElementById('category').value = item.category || '';
    document.getElementById('price').value = item.price;

    openModal();
  }

  // Update item
  function updateItem(e) {
    e.preventDefault();

    const id = document.getElementById('itemId').value;
    const upc = document.getElementById('upc').value;
    const name = document.getElementById('name').value;
    const price = parseFloat(document.getElementById('price').value);
    const category = document.getElementById('category').value;

    const itemIndex = groceryItems.findIndex((item) => item.id === id);

    if (itemIndex !== -1) {
      // Check if UPC already exists (excluding current item)
      const upcExists = groceryItems.some((item) => item.upc === upc && item.id !== id);

      if (upcExists) {
        showAlert('Item with this UPC already exists!', 'error');
        return;
      }

      groceryItems[itemIndex] = {
        ...groceryItems[itemIndex],
        upc,
        name,
        price,
        category,
      };

      saveToLocalStorage();
      renderGroceryItems();
      updateCategories();
      closeModal();
      showAlert('Item updated successfully!');
    }
  }

  // Delete an item
  function deleteItem(itemId) {
    if (confirm('Are you sure you want to delete this item?')) {
      groceryItems = groceryItems.filter((item) => item.id !== itemId);
      saveToLocalStorage();
      renderGroceryItems();
      updateCategories();
      showAlert('Item deleted successfully!');
    }
  }

  // Filter and sort items
  function filterAndSortItems() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const [sortField, sortOrder] = sortBy.value.split('_');

    let filteredItems = [...groceryItems];

    // Apply search filter
    if (searchTerm) {
      filteredItems = filteredItems.filter(
        (item) =>
          item.upc.toLowerCase().includes(searchTerm) ||
          item.name.toLowerCase().includes(searchTerm) ||
          (item.category && item.category.toLowerCase().includes(searchTerm)),
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filteredItems = filteredItems.filter((item) => item.category === selectedCategory);
    }

    // Apply sorting
    filteredItems.sort((a, b) => {
      let comparison = 0;

      if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else {
        comparison = a.price - b.price;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    renderGroceryItems(filteredItems);
  }

  // Export to CSV
  function exportToCSV() {
    if (groceryItems.length === 0) {
      showAlert('No items to export!', 'error');
      return;
    }

    let csv = 'UPC, Product Name, Category, Price\n';

    groceryItems.forEach((item) => {
      csv += `${item.upc}, "${item.name}", "${item.category || ''}", ${item.price}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset-utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'grocery_items_export.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showAlert('Items exported successfully!');
  }

  // Import from csv
  function importFromCSV(e) {
    e.preventDefault();

    const csvData = document.getElementById('csvData').value;
    const overwriteChecked = document.getElementById('overwrite').checked;

    if (!csvData) {
      showAlert('Please paste CSV data!', 'error');
      return;
    }

    try {
      const lines = csvData.split('\n');
      const headers = lines[0].split(',').map((h) => h.trim());

      // Validate headers
      if (
        headers.length < 4 ||
        headers[0].toLowerCase() !== 'upc' ||
        headers[1].toLowerCase() !== 'product name' ||
        headers[2].toLowerCase() !== 'category' ||
        headers[3].toLowerCase() !== 'price'
      ) {
        showAlert('Invalid CSV format. Please correct format: UPC,Product Name,Category,Price', 'error');
        return;
      }

      let importedItems = [];
      let duplicates = 0;
      let importedCount = 0;

      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;

        const values = lines[i].split(',').map((v) => v.trim().replace(/^"|"$/g, ''));
        if (values.length < 4) continue;

        const upc = values[0];
        const name = values[1];
        const category = values[2];
        const price = parseFloat(values[3]);

        if (!upc || !name || isNaN(price)) continue;

        const existingItemIndex = groceryItems.findIndex((item) => item.upc === upc);

        if (existingItemIndex !== -1) {
          if (overwriteChecked) {
            groceryItems[existingItemIndex] = {
              ...groceryItems[existingItemIndex],
              upc,
              name,
              price,
              category,
            };
            importedCount++;
          } else {
            duplicates++;
          }
        } else {
          importedItems.push({
            id: Date.now().toString() + i,
            upc,
            name,
            price,
            category,
          });
          importedCount++;
        }
      }

      if (importedItems.length > 0) {
        groceryItems = [...importedItems, ...groceryItems];
      }

      saveToLocalStorage();
      renderGroceryItems();
      updateCategories();
      closeImportModal();

      showAlert(
        `Imported ${importedCount} items successfully! ${duplicates > 0 ? `${duplicates} duplicates skipped.` : ''}`,
      );
    } catch (error) {
      showAlert('Error importing items: ' + error.message, 'error');
    }
  }

  // Modal functions
  function openModal() {
    itemModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    itemModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    groceryForm.reset();
    document.getElementById('itemId').value = '';
    document.getElementById('modalTitle').textContent = 'Add New Item';
  }

  function openImportModal() {
    importModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function closeImportModal() {
    importModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('csvData').value = '';
    document.getElementById('overwrite').checked = false;
  }

  // Theme toggle
  function loadThemePreference() {
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    document.body.className = savedTheme;
    themeToggle.checked = savedTheme === 'dark-mode';
  }

  function toggleTheme() {
    if (themeToggle.checked) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light-mode');
    }
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

  // Event listeners
  addItemBtn.addEventListener('click', openModal);
  exportBtn.addEventListener('click', exportToCSV);
  importBtn.addEventListener('click', openImportModal);

  closeBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      if (itemModal.style.display === 'block') closeModal();
      if (importModal.style.display === 'block') closeImportModal();
    });
  });

  window.addEventListener('click', function (e) {
    if (e.target === itemModal) closeModal();
    if (e.target === importModal) closeImportModal();
  });

  groceryForm.addEventListener('submit', function (e) {
    const itemId = document.getElementById('itemId').value;
    itemId ? updateItem(e) : addItem(e);
  });

  document.getElementById('importForm').addEventListener('submit', importFromCSV);

  searchInput.addEventListener('input', filterAndSortItems);
  categoryFilter.addEventListener('change', filterAndSortItems);
  sortBy.addEventListener('change', filterAndSortItems);
  themeToggle.addEventListener('change', toggleTheme);

  init();
});
