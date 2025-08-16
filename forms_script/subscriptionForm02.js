'use strict';

const btnSubmit = document.querySelector('.subscribe_btn');
const btnDismiss = document.querySelector('.btn_dismiss');
const formContainer = document.querySelector('.form_container');
const successEl = document.querySelector('.success_message');
const inputEl = document.querySelector('form input');
const errorEl = document.querySelector('.error p');

btnSubmit.addEventListener('click', () => {
  if (inputEl.value !== '') {
    formContainer.classList.add('hide');
    successEl.classList.remove('hide');
    errorEl.textContent = '';
  } else {
    errorEl.textContent = 'Please enter a valid email address';
    errorEl.style.opacity = 1;
    errorEl.style.transform = 'translateY(0)';
    inputEl.classList.add('active');
    inputEl.style.border = '1px dashed red';
  }
});

btnDismiss.addEventListener('click', () => {
  successEl.classList.add('hide');
  formContainer.classList.remove('hide');
  inputEl.value = '';
  inputEl.classList.remove('active');
  inputEl.style.border = '1px solid #ccc';
  errorEl.style.opacity = 0;
  errorEl.style.transform = 'translateY(-20px)';
});

document.querySelector("#year").textContent = new Date().getFullYear();