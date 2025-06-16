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
  {
    numb: 6,
    question: 'What does JavaScript stand for?',
    answer: 'B. Just Scripting And You',
    options: [
      'A. Java Super Active Yield',
      'B. Just Scripting And You',
      'C. Java Scripting And Yield',
      'D. Java Syntax And Yield',
    ],
  },
  {
    numb: 7,
    question: 'What does JSON stand for?',
    answer: 'C. JavaScript Object Notation',
    options: [
      'A. Java Scripting Object Notation',
      'B. Java Syntax Object Notation',
      'C. JavaScript Object Notation',
      'D. Java Syntax Object Network',
    ],
  },
  {
    numb: 8,
    question: 'What does AJAX stand for?',
    answer: 'D. Asynchronous JavaScript And XML',
    options: [
      'A. Asynchronous Java And XML',
      'B. Active JavaScript And XML',
      'C. Advanced JavaScript And XML',
      'D. Asynchronous JavaScript And XML',
    ],
  },
  {
    numb: 9,
    question: 'What does API stand for?',
    answer: 'A. Application Programming Interface',
    options: [
      'A. Application Programming Interface',
      'B. Active Programming Interface',
      'C. Advanced Programming Interface',
      'D. Application Protocol Interface',
    ],
  },
  {
    numb: 10,
    question: 'What does DOM stand for?',
    answer: 'C. Document Object Model',
    options: [
      'A. Document Oriented Model',
      'B. Dynamic Object Model',
      'C. Document Object Model',
      'D. Data Object Model',
    ],
  },
  {
    numb: 11,
    question: 'What does HTTP stand for?',
    answer: 'C. HyperText Transfer Protocol',
    options: [
      'A. HyperText Transfer Procedure',
      'B. HyperText Transmission Protocol',
      'C. HyperText Transfer Protocol',
      'D. HyperText Transmission Procedure',
    ],
  },
  {
    numb: 12,
    question: 'What does FTP stand for?',
    answer: 'D. File Transfer Protocol',
    options: [
      'A. File Transmission Procedure',
      'B. File Transmission Protocol',
      'C. File Transfer Procedure',
      'D. File Transfer Protocol',
    ],
  },
  {
    numb: 13,
    question: 'What does SVG stand for?',
    answer: 'B. Scalable Vector Graphics',
    options: [
      'A. Scalable Visual Graphics',
      'B. Scalable Vector Graphics',
      'C. Scalable Vector Images',
      'D. Scalable Visual Images',
    ],
  },
  {
    numb: 14,
    question: 'What does CSS3 stand for?',
    answer: 'A. Cascading Style Sheets 3',
    options: [
      'A. Cascading Style Sheets 3',
      'B. Cascading Style Sheets 2',
      'C. Cascading Style Sheets 4',
      'D. Cascading Style Sheets 1',
    ],
  },
  {
    numb: 15,
    question: 'What does HTML5 stand for?',
    answer: 'A. HyperText Markup Language 5',
    options: [
      'A. HyperText Markup Language 5',
      'B. HyperText Markup Language 4',
      'C. HyperText Markup Language 3',
      'D. HyperText Markup Language 2',
    ],
  },
  {
    numb: 16,
    question: 'What does VPN stand for?',
    answer: 'B. Virtual Private Network',
    options: [
      'A. Virtual Public Network',
      'B. Virtual Private Network',
      'C. Virtual Protected Network',
      'D. Virtual Personal Network',
    ],
  },
  {
    numb: 17,
    question: 'What does SEO stand for?',
    answer: 'D. Search Engine Optimization',
    options: [
      'A. Search Engine Organizer',
      'B. Search Engine Operation',
      'C. Search Engine Optimization Tool',
      'D. Search Engine Optimization',
    ],
  },
  {
    numb: 18,
    question: 'What does GUI stand for?',
    answer: 'C. Graphical User Interface',
    options: [
      'A. Graphical User Insight',
      'B. Graphical User Interaction',
      'C. Graphical User Interface',
      'D. Graphical User Input',
    ],
  },
  {
    numb: 19,
    question: 'What does RAM stand for?',
    answer: 'A. Random Access Memory',
    options: [
      'A. Random Access Memory',
      'B. Read Access Memory',
      'C. Run Access Memory',
      'D. Rapid Access Memory',
    ],
  },
  {
    numb: 20,
    question: 'What does CPU stand for?',
    answer: 'B. Central Processing Unit',
    options: [
      'A. Central Power Unit',
      'B. Central Processing Unit',
      'C. Central Power Unit',
      'D. Central Power Unit',
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
  headerScore();
};

tryAgainBtn.onclick = () => {
  quizBox.classList.add('active');
  resultBox.classList.remove('active');
  nextBtn.classList.remove('active');

  questionCount = 0;
  questionNumb = 1;
  userScore = 0;
  showQuestions(questionCount);
  questionCounter(questionNumb);

  headerScore();
};

goHomeBtn.onclick = () => {
  quizSection.classList.remove('active');
  resultBox.classList.remove('active');
  nextBtn.classList.remove('active');

  questionCount = 0;
  questionNumb = 1;
  userScore = 0;
  showQuestions(questionCount);
  questionCounter(questionNumb);
};

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const nextBtn = document.querySelector('.next-btn');

nextBtn.onclick = () => {
  if (questionCount < questions.length - 1) {
    questionCount++;
    showQuestions(questionCount);

    questionNumb++;
    questionCounter(questionNumb);

    nextBtn.classList.remove('active');
  } else {
    showResultBox();
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
  let allOptions = optionList.children.length;

  if (userAnswer == correctAnswer) {
    answer.classList.add('correct');
    userScore += 1;
    headerScore();
  } else {
    answer.classList.add('incorrect');

    for (let i = 0; i < allOptions; i++) {
      if (optionList.children[i].textContent == correctAnswer) {
        optionList.children[i].setAttribute('class', 'option correct');
      }
    }
  }

  for (let i = 0; i < allOptions; i++) {
    optionList.children[i].classList.add('disabled');
  }

  nextBtn.classList.add('active');
}

function questionCounter(index) {
  const questionTotal = document.querySelector('.question-total');
  questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

function headerScore() {
  const headerScoreText = document.querySelector('.header-score');
  headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}

function showResultBox() {
  quizBox.classList.remove('active');
  resultBox.classList.add('active');

  const scoreText = document.querySelector('.score-text');
  scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;

  const circularProgress = document.querySelector('.circular-progress');
  const progressValue = document.querySelector('.progress-value');
  let progressStartValue = -1;
  let progressEndValue = (userScore / questions.length) * 100;
  let speed = 20;

  let progress = setInterval(() => {
    progressStartValue++;
    progressValue.textContent = `${progressStartValue}%`;
    circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(255,
    255, 255, 0.1) 0deg)`;

    if (progressStartValue == progressEndValue) {
      clearInterval(progress);
    }
  }, speed);
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
