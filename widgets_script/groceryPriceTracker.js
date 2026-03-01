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
  }
});
