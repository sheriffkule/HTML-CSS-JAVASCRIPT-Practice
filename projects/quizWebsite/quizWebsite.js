let questions = [
  {
    numb: 1,
    question: 'What does HTML stand for?',
    answer: 'C. Hyper Text Markup Language',
    options: [
      'A. Hyper Type Multi Language',
      'B. Hyper Text Multiple Language',
      'C. Hyper Text Markup Language',
      'D. Home Text Multi Language',
    ],
  },
  {
    numb: 2,
    question: 'What does CSS stand for?',
    answer: 'A. Cascading Style Sheet',
    options: [
      'A. Cascading Style Sheet',
      'B. Cute Style Sheet',
      'C. Computer Style Sheet',
      'D. Codehal Style Sheet',
    ],
  },
  {
    numb: 3,
    question: 'What does PHP stand for?',
    answer: 'A. Hypertext Preprocessor',
    options: [
      'A. Hypertext Preprocessor',
      'B. Hometext Programming',
      'C. Hypertext Preprogramming',
      'D. Programming Hypertext Preprocessor',
    ],
  },
  {
    numb: 4,
    question: 'What does SQL stand for?',
    answer: 'D. Structured Query Language',
    options: [
      'A. Strength Query Language',
      'B. Stylesheet Query Language',
      'C. Science Question Language',
      'D. Structured Query Language',
    ],
  },
  {
    numb: 5,
    question: 'What does XML stand for?',
    answer: 'D. Extensible Markup Language',
    options: [
      'A. Excellent Multiple Language',
      'B. Explore Multiple Language',
      'C. Extra Markup Language',
      'D. Extensible Markup Language',
    ],
  },
];

const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');

startBtn.onclick = () => {
  popupInfo.classList.add('active');
  main.classList.add('active');
};

exitBtn.onclick = () => {
  popupInfo.classList.remove('active');
  main.classList.remove('active');
};

continueBtn.onclick = () => {
  quizSection.classList.add('active');
  popupInfo.classList.remove('active');
  main.classList.remove('active');
  quizBox.classList.add('active');

  showQuestions(0);
  questionCounter(1);
};

let questionCount = 0;
let questionNumb = 0;

const nextBtn = document.querySelector('.next-btn');

nextBtn.onclick = () => {
  if (questionCount < questions.length - 1) {
    questionCount++;
    showQuestions(questionCount);

    questionNumb++;
    questionCounter(questionNumb);
  } else {
    console.log('question end');
  }
};

const optionList = document.querySelector('.option-list');

function showQuestions(index) {
  const questionText = document.querySelector('.question-text');
  questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

  let optionTag = `
    <div class="option"><span>${questions[index].options[0]}</span></div>
    <div class="option"><span>${questions[index].options[1]}</span></div>
    <div class="option"><span>${questions[index].options[2]}</span></div>
    <div class="option"><span>${questions[index].options[3]}</span></div>
  `;

  optionList.innerHTML = optionTag;

  const option = document.querySelectorAll('.option');
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute('onclick', 'optionSelected(this)');
  }
}

function optionSelected(answer) {
  let userAnswer = answer.textContent;
  let correctAnswer = questions[questionCount].answer;

  if (userAnswer == correctAnswer) {
    console.log('correct');
  } else {
    console.log('incorrect');
  }
}

function questionCounter(index) {
  const questionTotal = document.querySelector('.question-total');
  questionTotal.textContent = `${index} of ${questions.length} Questions`;
}
