// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const generateBtn = document.getElementById('generateBtn');
const printBtn = document.getElementById('printBtn');
const downloadBtn = document.getElementById('downloadBtn');
const nextQuestionBtn = document.getElementById('nextQuestionBtn');
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');
const numberInput = document.getElementById('number');
const rangeFromInput = document.getElementById('rangeFrom');
const rangeToInput = document.getElementById('rangeTo');
const tableBody = document.querySelector('#multiplicationTable tbody');
const scoreElement = document.getElementById('score');
const quizQuestionElement = document.getElementById('quizQuestion');
const quizOptionsElement = document.getElementById('quizOptions');

// State variable
let currentScore = 0;
let correctAnswer;
let darkMode = localStorage.getItem('darkMode') === 'true';

// Initial theme
if (darkMode) {
  document.body.classList.add('dark-mode');
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Generate table on load
window.addEventListener('load', () => {
  generateTable();
  generateQuizQuestions();
});

// Theme toggle
themeToggle.addEventListener('click', () => {
  darkMode = !darkMode;
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', darkMode);

  darkMode
    ? (themeToggle.innerHTML = '<i class="fas fa-sun"></i>')
    : (themeToggle.innerHTML = '<i class="fas fa-moon"></i>');
});

// Tab switching
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const tabId = tab.getAttribute('data-tab');

    // Update active tab
    tabs.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');

    // Show active content
    tabContents.forEach((content) => {
      content.classList.remove('active');
      if (content.id === `${tabId}Tab`) {
        content.classList.add('active');
      }
    });
  });
});

// Generate table
generateBtn.addEventListener('click', generateTable);

function generateTable() {
  const number = parseInt(numberInput.value) || 5;
  const from = parseInt(rangeFromInput.value) || 1;
  let to = parseInt(rangeToInput.value) || 10;

  // Validate range
  if (to < from) {
    to = from + 10;
    rangeToInput.value = to;
  }

  // Update print elements
  document.getElementById('printNumber').textContent = number;
  document.getElementById('printDate').textContent = new Date().toLocaleDateString();

  // Generate table rows
  tableBody.innerHTML = '';
  for (let i = from; i <= to; i++) {
    const result = number * i;
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${number} × ${i}</td>
      <td>${result}</td>
    `;

    tableBody.append(row);
  }

  // Add animation
  document.getElementById('tableCard').classList.add('animation-fade-in');
  setTimeout(() => {
    document.getElementById('tableCard').classList.remove('animation-fade-in');
  }, 500);
}

printBtn.addEventListener('click', () => {
  window.print();
});
