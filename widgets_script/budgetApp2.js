// 'use strict';

const errorMessage = document.querySelector('.error_message');
const budgetInputEl = document.querySelector('.budget_input');
const expenseDescEl = document.querySelector('.expenses_input');
const expenseAmountEl = document.querySelector('.expenses_amount');
const tableRecordEl = document.querySelector('.table_data');
const cardsContainer = document.querySelector('.cards');

// cards content
const budgetCardEl = document.querySelector('.budget_card');
const expensesCardEl = document.querySelector('.expenses_card');
const balanceCardEl = document.querySelector('.balance_card');

let itemList = [];
let itemId = 0;

// localStorage keys
const STORAGE_BUDGET = 'budgetApp_budget';
const STORAGE_ITEMS = 'budgetApp_items';

function btnEvents() {
  const btnBudgetCal = document.getElementById('btn_budget');
  const btnExpensesCal = document.getElementById('btn_expenses');

  // Budget Event
  btnBudgetCal.addEventListener('click', (e) => {
    e.preventDefault();
    budgetFun();
  });

  btnExpensesCal.addEventListener('click', (e) => {
    e.preventDefault();
    expensesFun();
  });
}

// load saved data and attach events on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  btnEvents();
  loadSavedData();
});

// Expenses Function
function expensesFun() {
  let expensesDescValue = expenseDescEl.value;
  let expenseAmountValue = expenseAmountEl.value;

  if (expensesDescValue == '' || expensesDescValue == '' || budgetInputEl < 0) {
    showErrorMessage('Please Enter Expenses Description and Expense Amount!');
  } else {
    let amount = parseInt(expenseAmountValue);
    expenseAmountEl.value = '';
    expenseDescEl.value = '';

    // store the value inside object
    let expenses = {
      id: itemId,
      title: expensesDescValue,
      amount: amount,
    };
    itemId++;
    itemList.push(expenses);

    // add expenses inside the HTML Page
    addExpenses(expenses);

    // persist items
    localStorage.setItem(STORAGE_ITEMS, JSON.stringify(itemList));

    showBalance();
  }
}

// Add Expenses
function addExpenses(expensesPara) {
  const html = ` <ul class="tbl_tr_content" data-id="${expensesPara.id}">
      <li>${expensesPara.id + 1}</li>
      <li>${expensesPara.title}</li>
      <li><span>$</span>${expensesPara.amount}</li>
      <li>
        <button type="button" class="btn_edit" title="Edit Entry">Edit</button>
        <button type="button" class="btn_delete" title="Delete Entry Permanently">Delete</button>
      </li>
    </ul>
    `;

  tableRecordEl.insertAdjacentHTML('beforeend', html);

  // edit and delete buttons
  const editBtn = document.querySelectorAll('.btn_edit');
  const delBtn = document.querySelectorAll('.btn_delete');

  // btn edit event
  editBtn.forEach((btnEdit) => {
    btnEdit.addEventListener('click', (e) => {
      const element = e.target.closest('.tbl_tr_content');
      if (!element) return;
      const id = parseInt(element.dataset.id, 10);

      // remove element from DOM
      element.remove();

      // find the expense in itemList
      const expenses = itemList.filter(function (item) {
        return item.id === id;
      });

      if (expenses.length > 0) {
        expenseDescEl.value = expenses[0].title;
        expenseAmountEl.value = expenses[0].amount;
      }

      // remove item from itemList
      itemList = itemList.filter(function (item) {
        return item.id !== id;
      });

      // persist items after edit/remove
      localStorage.setItem(STORAGE_ITEMS, JSON.stringify(itemList));

      showBalance();
    });
  });

  // btn delete event
  delBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const element = e.target.closest('.tbl_tr_content');
      if (!element) return;
      const id = parseInt(element.dataset.id, 10);
      element.remove();
      itemList = itemList.filter(function (item) {
        return item.id !== id;
      });

      // persist items after delete
      localStorage.setItem(STORAGE_ITEMS, JSON.stringify(itemList));

      showBalance();
    });
  });
}
// Budget Function
function budgetFun() {
  const budgetValue = budgetInputEl.value;

  if (budgetValue === '' || budgetValue < 0) {
    showErrorMessage('Please Enter Budget Amount | More Than 0!');
  } else {
    budgetCardEl.textContent = budgetValue;
    budgetInputEl.value = '';

    // persist budget
    localStorage.setItem(STORAGE_BUDGET, budgetCardEl.textContent);

    showBalance();
  }
}

function showBalance() {
  const expenses = totalExpenses();
  const total = parseInt(budgetCardEl.textContent) - expenses;
  balanceCardEl.textContent = total;
}

function totalExpenses() {
  let total = 0;

  if (itemList.length > 0) {
    total = itemList.reduce(function (acc, curr) {
      acc += curr.amount;
      return acc;
    }, 0);
  }
  expensesCardEl.textContent = total;

  return total;
}

function showErrorMessage(message) {
  errorMessage.innerHTML = `<p>${message}</p>`;
  errorMessage.classList.add('error');
  setTimeout(() => {
    errorMessage.classList.remove('error');
  }, 2500);
}

// load saved budget and expenses from localStorage
function loadSavedData() {
  const savedBudget = localStorage.getItem(STORAGE_BUDGET);
  if (savedBudget !== null) {
    budgetCardEl.textContent = savedBudget;
  }

  const savedItems = JSON.parse(localStorage.getItem(STORAGE_ITEMS) || '[]');
  if (Array.isArray(savedItems) && savedItems.length > 0) {
    itemList = savedItems;
    // restore next id
    itemId = itemList.reduce((max, it) => Math.max(max, it.id), -1) + 1;
    // populate UI
    itemList.forEach((it) => addExpenses(it));
    showBalance();
  }
}

const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'bx-sun';

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () => (document.body.classList.contains(darkTheme) ? 'dark' : 'light');
const getCurrentIcon = () => (themeButton.classList.contains('bx-sun') ? 'bx-sun' : 'bx-moon');

if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
  if (selectedIcon === 'bx-moon') {
    themeButton.classList.add('bx-moon');
    themeButton.classList.remove('bx-sun');
  } else {
    themeButton.classList.add('bx-sun');
    themeButton.classList.remove('bx-moon');
  }
}

if (themeButton) {
  themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
    if (themeButton.classList.contains('bx-sun')) {
      themeButton.classList.remove('bx-sun');
      themeButton.classList.add('bx-moon');
    } else {
      themeButton.classList.remove('bx-moon');
      themeButton.classList.add('bx-sun');
    }

    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
  });
}

function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');

  if (!yearElement) {
    console.error('Year element not found');
    return;
  }

  if (yearElement) {
    yearElement.setAttribute('datetime', currentYear.toString());
    yearElement.dateTime = currentYear;
    yearElement.textContent = currentYear.toString();
  }
}

window.addEventListener('load', updateYear);
