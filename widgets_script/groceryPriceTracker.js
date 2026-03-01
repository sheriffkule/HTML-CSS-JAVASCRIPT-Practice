document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const groceryForm = document.getElementById('groceryForm');
  const groceryItemContainer = document.getElementById('groceryItems');
  const addItemBtn = document.getElementById('addItemBtn');
  const itemModal = document.getElementById('itemModal');
  const closeBtn = document.querySelector('.close-btn');
  const searchInput = document.getElementById('searchInput');
  const storeFilter = document.getElementById('storeFilter');
  const sortBy = document.getElementById('sortBy');
  const themeToggle = document.getElementById('themeToggle');

  // Stats elements
  const totalItemsEl = document.getElementById('totalItems');
  const totalCostEl = document.getElementById('totalCost');
  const remainingItemsEl = document.getElementById('remainingItems');

  // Grocery items array
  let groceryItems = JSON.parse(localStorage.getItem('groceryItems')) || [];

  // Initialize the app
  function init() {
    renderGroceryItems();
    updateStats();

    // Check for saved theme preferences
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    document.body.className = savedTheme;
    themeToggle.checked = savedTheme === 'dark-mode';
  }

  // Render grocery items to the DOM
  function renderGroceryItems(filteredItems = null) {
    const itemRender = filteredItems || groceryItems;

    if (itemsToRender.length === 0) {
      groceryItemContainer.innerHTML =
        '<div class="empty-state">No grocery items found. Add some items to get started!</div>';
      return;
    }

    groceryItemContainer.innerHTML = '';

    itemsToRender.forEach((item) => {
      const groceryItem = document.createElement('div');
      groceryItem.className = `grocery-item ${item.purchased ? 'purchased' : ''}`;
      groceryItem.dataset.id = item.id;

      groceryItem.innerHTML = `
        <div class="item-name">
          <input type="checkbox" class="item-checkbox ${item.purchased ? 'checked' : ''}" />
          <span>${item.name}</span>
          ${item.notes ? '<i class="fas fa-sticky-note" title="' + item.notes + '"></i>' : ''}
        </div>
        <div class="item-price">$${item.price.toFIxed(2)}</div>
        <div class="item-store">
          <span className="store-icon">${item.store.charAt(0)}</span>
        </div>
        <div class="item-date">${formatDate(item.date)}</div>
        <div class="item-actions">
          <button class="action-btn edit-btn" title="Edit"><i class="fas fa-edit"></i></button>
          <button class="action-btn delete-btn" title="Delete"><i class="fas fa-trash-alt"></i></button>
        </div>
      `;

      groceryItemContainer.appendChild(groceryItem);
    });

    // Add event listeners to checkboxes
    document.querySelectorAll('.item-checkbox').forEach((checkbox) => {
      checkbox.addEventListener('change', function () {
        const itemId = this.closest('.grocery-item').dataset.id;
        togglePurchasedStatus(itemId, this.checked);
      });
    });

    // Add event listener to edit buttons
    document.querySelectorAll('.edit-btn').forEach((btn) => {
      btn.addEventListener('click', function () {
        const itemId = this.closest('grocery-item').dataset.id;
        editItem(itemId);
      });
    });

    // Add event listener to delete buttons
    document.querySelectorAll('.delete-btn').forEach((btn) => {
      btn.addEventListener('click', function () {
        const itemId = this.closest('grocery-item').dataset.id;
        deleteItem(itemId);
      });
    });
  }

  // Format date for display
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  // Add a new grocery item
  function addItem(e) {
    e.preventDefault();

    const id = Date.now().toString();
    const name = document.getElementById('itemName').value;
    const price = parseFloat(document.getElementById('itemPrice').value);
    const store = document.getElementById('itemStore').value;
    const notes = document.getElementById('itemNotes').value;
    const purchased = document.getElementById('itemPurchased').checked;
    const date = new Date().toISOString();

    const newItem = {
      id,
      name,
      price,
      store,
      notes,
      purchased,
      date,
    };

    groceryItems.unshift(newItem);
    saveToLocalStorage();
    renderGroceryItems();
    updateStats();
    closeModal();
  }

  // Edit an existing item
  function editItem(itemId) {
    const item = groceryItems.find((item) => item.id === itemId);
    if (!item) return;

    document.getElementById('modalTitle').textContent = 'Edit Grocery Item';
    document.getElementById('itemId').value = item.id;
    document.getElementById('itemName').value = item.name;
    document.getElementById('itemPrice').value = item.price;
    document.getElementById('itemStore').value = item.store;
    document.getElementById('itemNotes').value = item.notes || '';
    document.getElementById('itemPurchased').checked = item.checked;

    openModal();
  }
});
