const calculateBtn = document.getElementById('calculateBtn');
const resetBtn = document.getElementById('resetBtn');
const operationBtns = document.querySelectorAll('.operation-btn');
const darkModeToggle = document.getElementById('darkModeToggle');
const hours1 = document.getElementById('hours1');
const minutes1 = document.getElementById('minutes1');
const seconds1 = document.getElementById('seconds1');
const hours2 = document.getElementById('hours2');
const minutes2 = document.getElementById('minutes2');
const seconds2 = document.getElementById('seconds2');
const resultValue = document.getElementById('resultValue');

let currentOperation = 'add';

operationBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    operationBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    currentOperation = btn.dataset.operation;
  });
});

calculateBtn.addEventListener('click', () => {
  if (!hours1 || !minutes1 || !seconds1 || !hours2 || !minutes2 || !seconds2 || !resultValue) {
    console.error('One or more required elements are missing');
    return;
  }

  const t1 = Number(hours1.value) * 3600 + Number(minutes1.value) * 60 + Number(seconds1.value);
  const t2 = Number(hours2.value) * 3600 + Number(minutes2.value) * 60 + Number(seconds2.value);
  let result = 0;

  if (currentOperation === 'add') result = t1 + t2;
  if (currentOperation === 'subtract') result = t1 - t2;
  if (currentOperation === 'difference') result = Math.abs(t1 - t2);
  if (currentOperation === 'multiply') result = t1 * 2;
  if (currentOperation === 'divide') result = t1 / 2;

  const total = Math.round(Math.abs(result));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;

  resultValue.textContent = `${result < 0 ? '-' : ''}${h} Hours, ${m} Minutes, ${s} Seconds`;
});

resetBtn.onclick = () => location.reload();

if (darkModeToggle) {
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = darkModeToggle.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-sun');
      icon.classList.toggle('fa-moon');
    }
  });
}

function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');

  if (!yearElement) {
    console.error('Year element not found');
    return;
  }

  yearElement.setAttribute('datetime', currentYear.toString());
  yearElement.dateTime = currentYear.toString();
  yearElement.textContent = currentYear.toString();
}
updateYear();
