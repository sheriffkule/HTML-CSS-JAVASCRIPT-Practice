'use strict';

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

// Calling Btns Events
document.addEventListener('DOMContentLoaded', btnEvents);

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
    showBalance();
  }
}

// Add Expenses
function addExpenses(expensesPara) {
  const html = ` <ul class="tbl_tr_content">
      <li data-id="${expensesPara.id}">${expensesPara.id + 1}</li>
      <li>${expensesPara.title}</li>
      <li><span>$</span>${expensesPara.amount}</li>
      <li>
        <button type="submit" class="btn_edit">Edit</button>
        <button type="submit" class="btn_delete">Delete</button>
      </li>
    </ul>
    `;

  tableRecordEl.insertAdjacentHTML('beforeend', html);

  // edit
  const editBtn = document.querySelectorAll('btn_edit');
  const delBtn = document.querySelectorAll('.btn_delete');
  const content_id = document.querySelectorAll('.tbl_tr_content');

  // btn edit event
  editBtn.forEach((btnEdit) => {
    btnEdit.addEventListener('click', (el) => {
      let id;

      content_id.forEach((ids) => {
        id = ids.firstElementChild.dataset.id;
      });

      let element = el.target.parentElement.parentElement;
      element.remove();

      let expenses = itemList.filter(function (item) {
        return item.id == id;
      });

      expenseDescEl.value = expenses[0].title;
      expenseAmountEl.value = expenses[0].amount;

      let temp_list = itemList.filter(function(item) {
        return item.id !== id;
      })
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
