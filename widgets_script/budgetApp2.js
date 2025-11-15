'use strict';

const errorMessage = document.querySelector('.error_message');
const budgetInputEl = document.querySelector('.budget_input');
const expenseDelEl = document.querySelector('.expenses_input');
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
    console.log('expenses');
  });
}

// Calling Btns Events
document.addEventListener('DOMContentLoaded', btnEvents);

// Budget Function
function budgetFun() {
  const budgetValue = budgetInputEl.value;

  if (budgetValue === '' || budgetValue < 0) {
      showErrorMessage()
  } else {
  }
}

function showErrorMessage() {
  errorMessage.style.visibility = 'visible';
  errorMessage.style.height = 'auto';
  setTimeout(() => {
    errorMessage.style.visibility = 'hidden';
    errorMessage.style.height = 0;
  }, 2500);
}
