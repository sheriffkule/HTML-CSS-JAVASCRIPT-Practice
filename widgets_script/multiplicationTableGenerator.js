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
  if (themeToggle) {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
}

// Generate table on load
window.addEventListener('load', () => {
  generateTable();
  generateQuizQuestion();
});

// Theme toggle
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', darkMode);

    darkMode
      ? (themeToggle.innerHTML = '<i class="fas fa-sun"></i>')
      : (themeToggle.innerHTML = '<i class="fas fa-moon"></i>');
  });
}

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
if (generateBtn) {
  generateBtn.addEventListener('click', generateTable);
}

function generateTable() {
  const number = parseInt(numberInput.value) || 10;
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
  document.querySelector('.card').classList.add('animation-fade-in');
  setTimeout(() => {
    document.getElementById('tableCard').classList.remove('animation-fade-in');
    document.querySelector('.card').classList.remove('animation-fade-in');
  }, 500);
}

if (printBtn) {
  printBtn.addEventListener('click', () => {
    window.print();
  });
}

// Download as pdf
if (downloadBtn) {
  downloadBtn.addEventListener('click', () => {
    // In a real app, you would use a library like jsPDF
    alert(
      ' implementation, this would download a PDF version of your table. For now, you can use the print function to save as PDF',
    );
  });
}

// Quiz functionality
function generateQuizQuestion() {
  // Generate random numbers for the question
  const num1 = Math.floor(Math.random() * 12) + 1;
  const num2 = Math.floor(Math.random() * 12) + 1;
  correctAnswer = num1 * num2;

  // Display the question
  quizQuestionElement.textContent = `${num1} × ${num2} = ?`;

  // Generate options (one correct, three incorrect
  const options = [correctAnswer];
  while (options.length < 4) {
    // Generate a wrong answer that's not too far from the correct one
    const wrongAnswer = correctAnswer + Math.floor(Math.random() * 20) - 10;
    if (wrongAnswer !== correctAnswer && wrongAnswer > 0 && !options.includes(wrongAnswer)) {
      options.push(wrongAnswer);
    }
  }

  // Shuffle options
  options.sort(() => Math.random() - 0.5);

  // Create option elements
  quizOptionsElement.innerHTML = '';
  options.forEach((option) => {
    const optionElement = document.createElement('div');
    optionElement.className = 'quiz-option';
    optionElement.textContent = option;

    optionElement.addEventListener('click', () => {
      // Check if answer is correct
      if (parseInt(optionElement.textContent) === correctAnswer) {
        optionElement.classList.add('correct');
        currentScore++;
        scoreElement.textContent = currentScore;
      } else {
        optionElement.classList.add('incorrect');
        // Highlight correct answer
        document.querySelectorAll('.quiz-option').forEach((opt) => {
          if (parseInt(opt.textContent) === correctAnswer) {
            opt.classList.add('correct');
          }
        });
      }

      // DIsable all options after selection
      document.querySelectorAll('.quiz-option').forEach((opt) => {
        opt.style.pointerEvents = 'none';
      });
    });

    quizOptionsElement.appendChild(optionElement);
  });

  // Enable options
  document.querySelectorAll('.quiz-option').forEach((opt) => {
    opt.style.pointerEvents = 'auto';
  });
}

if (nextQuestionBtn) {
  nextQuestionBtn.addEventListener('click', () => {
    generateQuizQuestion();
  });
}

// Input validation
[numberInput, rangeFromInput, rangeToInput]
  .filter(Boolean)
  .forEach((input) => {
    input.addEventListener('change', () => {
      const parsedValue = parseInt(input.value, 10);
      if (Number.isNaN(parsedValue) || parsedValue < 1) {
        input.value = '1';
      }
    });
  });

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
