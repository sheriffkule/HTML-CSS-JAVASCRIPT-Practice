'use strict';

const inputDisableEl = document.querySelector('.disabled');
const inputEnableEl = document.querySelector('.captcha');
const btnRefreshEl = document.querySelector('.btn-icon');
const messageEl = document.querySelector('.message');
const btnSubmitEl = document.querySelector('.btn-submit');

let captchaTxt = null;

function generateCaptcha() {
  const randomString = Math.random().toString(36).substring(2, 8);
  const captchaString = randomString
    .split('')
    .map((char) => char.toUpperCase())
    .join(' ');
  captchaTxt = randomString;
  if (inputDisableEl) inputDisableEl.value = captchaString;
  if (inputEnableEl) inputEnableEl.value = '';
  if (messageEl) messageEl.classList.remove('active');
  messageEl.value = captchaTxt;
}

function submitBtn() {
  if (!messageEl || !inputEnableEl) return;

  messageEl.classList.add('active');

  if (inputEnableEl.value.toUpperCase() === captchaTxt.toUpperCase()) {
    messageEl.textContent = "You've entered correct captcha.";
    messageEl.style.color = '#28b463';
  } else {
    messageEl.textContent = "You've entered invalid captcha.";
    messageEl.style.color = '#c70039';
    messageEl.style.textDecoration = '1px solid underline #c70039';
  }
}

inputEnableEl.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    submitBtn();
  }
});

const refreshBtn = () => {
  generateCaptcha();
  submitBtn();
  inputEnableEl.value = '';
  messageEl.classList.remove('active');
};

btnRefreshEl.addEventListener('click', generateCaptcha);
btnSubmitEl.addEventListener('click', submitBtn);
generateCaptcha();

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
