const questions = [
  {
    category: 'programming',
    questions: [
      {
        question: 'What does HTML stand for?',
        options: [
          'Hyper Text Pre Processor',
          'Hyper Text Markup Language',
          'Hyper Text Multiple Language',
          'Hyper Tool Multi Language',
        ],
        correctAnswer: 1,
      },
      {
        question: 'Which of the following is a correct way to declare a variable in JavaScript?',
        options: ['var x = 10;', 'variable x = 10;', 'int x = 10;', 'let 10 = x;'],
        correctAnswer: 0,
      },
      {
        question: 'How do you write comment in Python?',
        options: [
          '// This is a comment',
          '# This is a comment',
          '/* This is a comment */',
          '<!-- This is a comment -->',
        ],
        correctAnswer: 1,
      },
      {
        question: 'What does CSS stand for?',
        options: [
          'Cascading Style Sheets',
          'Colorful Style Sheets',
          'Computer Style Sheets',
          'Cascading Simple Sheets',
        ],
        correctAnswer: 0,
      },
      {
        question: 'In JavaScript, how do you create a function?',
        options: [
          'create function myFunction()',
          'def function myFunction()',
          'func myFunction()',
          'function myFunction()',
        ],
        correctAnswer: 3,
      },
      {
        question: "What does the 'typeof' operator do in JavaScript?",
        options: [
          'Checks the type of a variable',
          'Declares a variable',
          'Assigns a value to a variable',
          'Converts a variable to another type',
        ],
        correctAnswer: 0,
      },
      {
        question: 'In C, how do you define a function?',
        options: ['function myFunction()', 'def myFunction()', 'void myFunction()', 'func myFunction()'],
        correctAnswer: 2,
      },
      {
        question: 'Which of the following is a characteristic of Python?',
        options: ['Compiled language', 'Dynamic typing', 'Low-level language', 'Static typing'],
        correctAnswer: 3,
      },
      {
        question: 'Which language is used for Android development?',
        options: ['Python', 'Java', 'JavaScript', 'C++'],
        correctAnswer: 1,
      },
      {
        question: "What is the purpose of the 'forEach()' method in JavaScript?",
        options: [
          'Removes duplicate elements from an array',
          'Filters elements in an array',
          'Sorts an array',
          'Iterates through each element in an array',
        ],
        correctAnswer: 3,
      },
      {
        question: "What does the 'return' keyword do in a function?",
        options: [
          'Ends the function and returns a value',
          'Continues the function',
          'Exits the function without value',
          'Ends the program execution',
        ],
        correctAnswer: 0,
      },
      {
        question: 'Which of the following is NOT a semantic HTML element?',
        options: ['<header>', '<footer>', '<div>', '<article>'],
        correctAnswer: 2,
      },
      {
        question: "What is the primary purpose of a 'for' loop in programming?",
        options: [
          'Repeat code for a specified number of times',
          'Repeat code until a condition is true',
          'Define a function',
          'Evaluate conditions in the loop',
        ],
        correctAnswer: 0,
      },
      {
        question: 'Which data structure is ideal for LIFO (Last In First Out)?',
        options: ['Queue', 'Stack', 'Linked list', 'Array'],
        correctAnswer: 1,
      },
      {
        question: 'Which command is used in Git to store changes in the repository?',
        options: ['git commit', 'git push', 'git pull', 'git add'],
        correctAnswer: 0,
      },
      {
        question: "What does the 'map()' function do in JavaScript?",
        options: [
          'Sorts an array',
          'Filters out items',
          'Creates a new array',
          'Modifies the original array',
        ],
        correctAnswer: 2,
      },
      {
        question: 'What is an IDE?',
        options: [
          'An Integrated Development Environment',
          'A function for code execution',
          'An interpreter',
          'An input method for writing code',
        ],
        correctAnswer: 0,
      },
      {
        question: 'Which of the following is a feature of object-oriented programming?',
        options: ['Encapsulation', 'Modularity', 'Recursion', 'Memory Management'],
        correctAnswer: 0,
      },
      {
        question: 'What does SQL stand for?',
        options: [
          'Simple Question Language',
          'Systematic Query Language',
          'Standard Question Language',
          'Structured Query Language',
        ],
        correctAnswer: 3,
      },
      {
        question: 'Which of these is an example of a non-relational database?',
        options: ['MongoDB', 'MySQL', 'PostgreSQL', 'Oracle'],
        correctAnswer: 0,
      },
      {
        question: 'How do you write comment in CSS?',
        options: [
          '// This is a comment',
          '/* This is a comment */',
          '# This is a comment',
          '<!-- This is a comment -->',
        ],
        correctAnswer: 1,
      },
      {
        question: 'Which of the following algorithms is used to sort an array by comparing elements?',
        options: ['Bubble sort', 'Insertion sort', 'Quick sort', 'Merge sort'],
        correctAnswer: 0,
      },
      {
        question: "What does the 'finally' block in Java do?",
        options: [
          'Handles all exceptions',
          'Attempts to handle runtime exceptions',
          'Executes code after try-catch',
          'Defines execution start point',
        ],
        correctAnswer: 2,
      },
      {
        question: 'Which data structure is best for searching elements quickly?',
        options: ['Binary search tree', 'Array', 'Linked list', 'Queue'],
        correctAnswer: 0,
      },
      {
        question: 'What is the correct syntax for a JavaScript if statement?',
        options: ['if (condition) {}', 'if condition {}', 'if {} else', 'if {condition}'],
        correctAnswer: 0,
      },
    ],
  },

  {
    category: 'geography',
    questions: [
      {
        question: 'Which is the longest river in the world?',
        options: ['Amazon River', 'Nile River', 'Yangtze River', 'Mississippi River'],
        correctAnswer: 1,
      },
      {
        question: 'Which country is known as the Land of the Rising Sun?',
        options: ['China', 'South Korea', 'Japan', 'Thailand'],
        correctAnswer: 2,
      },
      {
        question: 'What is the largest ocean in the world?',
        options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
        correctAnswer: 3,
      },
      {
        question: 'Which country has the largest population in the world?',
        options: ['India', 'China', 'United States', 'Indonesia'],
        correctAnswer: 1,
      },
      {
        question: 'Which country is known for the Great Barrier Reef?',
        options: ['Australia', 'United States', 'South Africa', 'New Zealand'],
        correctAnswer: 0,
      },
      {
        question: 'Which is the smallest country in the world?',
        options: ['Monaco', 'Liechtenstein', 'Vatican City', 'San Marino'],
        correctAnswer: 2,
      },
      {
        question: 'Which is the tallest mountain in the world?',
        options: ['K2', 'Mount Kilimanjaro', 'Mount Everest', 'Mount Fuji'],
        correctAnswer: 2,
      },
      {
        question: 'What is the capital of Canada?',
        options: ['Ottawa', 'Toronto', 'Vancouver', 'Montreal'],
        correctAnswer: 0,
      },
      {
        question: 'Which desert is the largest hot desert in the world?',
        options: ['Gobi Desert', 'Atacama Desert', 'Sahara Desert', 'Karakum Desert'],
        correctAnswer: 2,
      },
      {
        question: 'Which country is known as the Land of the Midnight Sun?',
        options: ['Sweden', 'Finland', 'Norway', 'Denmark'],
        correctAnswer: 2,
      },
      {
        question: 'What is the longest mountain range in the world?',
        options: ['Himalayas', 'Rocky Mountains', 'Andes', 'Alps'],
        correctAnswer: 2,
      },
      {
        question: 'Which river flows through Egypt?',
        options: ['Amazon River', 'Yangtze River', 'Nile River', 'Ganges River'],
        correctAnswer: 2,
      },
      {
        question: 'Which is the largest island in the world?',
        options: ['Greenland', 'New Guinea', 'Borneo', 'Madagascar'],
        correctAnswer: 0,
      },
      {
        question: 'What is the capital of Japan?',
        options: ['Beijing', 'Seoul', 'Tokyo', 'Hong Kong'],
        correctAnswer: 2,
      },
      {
        question: 'Which country has the most time zones?',
        options: ['United States', 'Russia', 'Canada', 'Australia'],
        correctAnswer: 1,
      },
      {
        question: 'Which country is known for the Eiffel Tower?',
        options: ['Germany', 'Italy', 'Spain', 'France'],
        correctAnswer: 3,
      },
      {
        question: 'Which is the most populous city in the world?',
        options: ['Tokyo', 'Shanghai', 'New York City', 'Delhi'],
        correctAnswer: 0,
      },
      {
        question: 'Which mountain range is located in South America?',
        options: ['Himalayas', 'Rocky Mountains', 'Appalachian Mountains', 'Andes'],
        correctAnswer: 3,
      },
      {
        question: "Which continent is known as the 'Dark Continent'?",
        options: ['Asia', 'Africa', 'South America', 'Europe'],
        correctAnswer: 1,
      },
      {
        question: 'What is the capital of Brazil?',
        options: ['Buenos Aires', 'Rio de Janeiro', 'Brasília', 'Sao Paulo'],
        correctAnswer: 2,
      },
      {
        question: 'What is the official language of Brazil?',
        options: ['Spanish', 'English', 'Portuguese', 'French'],
        correctAnswer: 2,
      },
      {
        question: 'Which country has the most volcanoes?',
        options: ['Japan', 'Indonesia', 'United States', 'Italy'],
        correctAnswer: 1,
      },
      {
        question: 'Which city is known as the Big Apple?',
        options: ['Los Angeles', 'New York City', 'Chicago', 'San Francisco'],
        correctAnswer: 1,
      },
      {
        question: 'Which ocean is located to the east of Africa?',
        options: ['Indian Ocean', 'Pacific Ocean', 'Southern Ocean', 'Atlantic Ocean'],
        correctAnswer: 3,
      },
      {
        question: 'Which is the second largest continent by area?',
        options: ['Asia', 'Africa', 'North America', 'Europe'],
        correctAnswer: 1,
      },
    ],
  },

  {
    category: 'mathematics',
    questions: [
      {
        question: 'What is the square root of 144?',
        options: ['10', '11', '12', '13'],
        correctAnswer: 2,
      },
      {
        question: 'What is 15 × 13?',
        options: ['180', '185', '195', '200'],
        correctAnswer: 2,
      },
      {
        question: 'What is the value of 8³?',
        options: ['512', '216', '256', '128'],
        correctAnswer: 0,
      },
      {
        question: 'What is 48 ÷ 6?',
        options: ['7', '8', '9', '10'],
        correctAnswer: 1,
      },
      {
        question: 'What is the value of 3 + 5 × 4?',
        options: ['20', '22', '24', '23'],
        correctAnswer: 3,
      },
      {
        question: 'What is the sum of the angles in a triangle?',
        options: ['180°', '360°', '90°', '270°'],
        correctAnswer: 0,
      },
      {
        question: 'What is the perimeter of a square with a side length of 4 cm?',
        options: ['12 cm', '16 cm', '20 cm', '24 cm'],
        correctAnswer: 1,
      },
      {
        question: 'What is 11²?',
        options: ['121', '131', '141', '111'],
        correctAnswer: 3,
      },
      {
        question: 'What is 9 × 12?',
        options: ['105', '110', '108', '120'],
        correctAnswer: 2,
      },
      {
        question: 'What is the value of 16 ÷ 4?',
        options: ['2', '3', '4', '5'],
        correctAnswer: 2,
      },
      {
        question: 'What is 25% of 200?',
        options: ['30', '40', '50', '60'],
        correctAnswer: 2,
      },
      {
        question: 'What is the area of a rectangle with length 5 cm and width 8 cm?',
        options: ['40 cm²', '50 cm²', '55 cm²', '60 cm²'],
        correctAnswer: 0,
      },
      {
        question: 'What is the value of 10 ÷ 2 + 3?',
        options: ['8', '7', '9', '6'],
        correctAnswer: 1,
      },
      {
        question: 'What is 3 × 7 + 2?',
        options: ['20', '21', '22', '23'],
        correctAnswer: 1,
      },
      {
        question: 'What is the greatest common divisor (GCD) of 24 and 36?',
        options: ['4', '6', '8', '12'],
        correctAnswer: 3,
      },
      {
        question: 'What is the least common multiple (LCM) of 6 and 8?',
        options: ['24', '32', '48', '56'],
        correctAnswer: 0,
      },
      {
        question: 'What is the value of 2³ × 3?',
        options: ['12', '15', '18', '24'],
        correctAnswer: 0,
      },
      {
        question: 'What is the value of 10 × (5 + 3)?',
        options: ['80', '70', '60', '50'],
        correctAnswer: 1,
      },
      {
        question: 'What is the value of 14 × 14?',
        options: ['186', '196', '206', '216'],
        correctAnswer: 1,
      },
      {
        question: 'What is the sum of the first 10 positive integers?',
        options: ['50', '55', '60', '65'],
        correctAnswer: 1,
      },
      {
        question: 'What is 12 × 15?',
        options: ['150', '160', '170', '180'],
        correctAnswer: 3,
      },
      {
        question: 'What is the area of a circle with a radius of 3 cm? (Use π = 3.14)',
        options: ['28.26 cm²', '31.42 cm²', '36.14 cm²', '39.14 cm²'],
        correctAnswer: 0,
      },
      {
        question: 'What is the value of (8 + 2) × 3?',
        options: ['30', '32', '34', '28'],
        correctAnswer: 3,
      },
      {
        question: 'What is the value of 50% of 80?',
        options: ['30', '35', '40', '45'],
        correctAnswer: 2,
      },
      {
        question: 'What is the value of 25 ÷ 5 × 3?',
        options: ['12', '15', '18', '20'],
        correctAnswer: 1,
      },
    ],
  },

  {
    category: 'entertainment',
    questions: [
      {
        question: 'Who won the Academy Award for Best Actor in 2022?',
        options: ['Leonardo DiCaprio', 'Will Smith', 'Joaquin Phoenix', 'Matthew McConaughey'],
        correctAnswer: 1,
      },
      {
        question: 'Which movie won the Academy Award for Best Picture in 2021?',
        options: ['Parasite', '1917', 'The Shape of Water', 'Nomadland'],
        correctAnswer: 3,
      },
      {
        question: 'Who played the character of Jack Dawson in the movie Titanic?',
        options: ['Leonardo DiCaprio', 'Brad Pitt', 'Johnny Depp', 'Tom Hanks'],
        correctAnswer: 0,
      },
      {
        question: 'Which TV show featured the characters Daenerys Targaryen and Jon Snow?',
        options: ['Breaking Bad', 'Game of Thrones', 'The Witcher', 'Vikings'],
        correctAnswer: 1,
      },
      {
        question: "Who is known as the 'King of Pop'?",
        options: ['Michael Jackson', 'Prince', 'Whitney Houston', 'Elvis Presley'],
        correctAnswer: 0,
      },
      {
        question: "Which superhero is known for saying, 'I am Iron Man'?",
        options: ['Black Panther', 'Captain America', 'Thor', 'Iron Man'],
        correctAnswer: 3,
      },
      {
        question: 'Which movie franchise includes a character named Luke Skywalker?',
        options: ['Guardians of the Galaxy', 'Star Wars', 'The Matrix', 'Star Trek'],
        correctAnswer: 1,
      },
      {
        question: 'Who played the character of Hermione Granger in the Harry Potter film series?',
        options: ['Emma Watson', 'Anne Hathaway', 'Maggie Smith', 'Natalie Portman'],
        correctAnswer: 0,
      },
      {
        question: "Who directed the movie 'Inception'?",
        options: ['James Cameron', 'Steven Spielberg', 'Christopher Nolan', 'Martin Scorsese'],
        correctAnswer: 2,
      },
      {
        question: "Which artist released the album 'Lover' in 2019?",
        options: ['Billie Eilish', 'Taylor Swift', 'Ed Sheeran', 'Ariana Grande'],
        correctAnswer: 1,
      },
      {
        question: 'What was the first video game to feature Mario?',
        options: ['Mario Kart', 'Super Mario Bros.', 'Donkey Kong', 'The Legend of Zelda'],
        correctAnswer: 2,
      },
      {
        question: "Which movie features the famous line, 'Here's looking at you, kid'?",
        options: ['Casablanca', 'Citizen Kane', 'The Godfather', 'Gone with the Wind'],
        correctAnswer: 0,
      },
      {
        question: 'Which country won the FIFA World Cup in 2018?',
        options: ['France', 'Germany', 'Argentina', 'Brazil'],
        correctAnswer: 0,
      },
      {
        question: 'Who created the comic book character Spider-Man?',
        options: ['Jack Kirby', 'Stan Lee', 'Steve Ditko', 'John Romita'],
        correctAnswer: 1,
      },
      {
        question: 'In which movie did Heath Ledger portray the Joker?',
        options: ['The Dark Knight', 'Batman Begins', 'The Dark Knight Rises', 'Joker'],
        correctAnswer: 0,
      },
      {
        question: "Which band is known for the hit song 'Bohemian Rhapsody'?",
        options: ['The Rolling Stones', 'Led Zeppelin', 'Queen', 'The Beatles'],
        correctAnswer: 2,
      },
      {
        question: "Which actress starred as Katniss Everdeen in 'The Hunger Games'?",
        options: ['Kristen Stewart', 'Shailene Woodley', 'Jennifer Lawrence', 'Emma Stone'],
        correctAnswer: 2,
      },
      {
        question: "Who played the role of the Joker in the 2019 movie 'Joker'?",
        options: ['Heath Ledger', 'Johnny Depp', 'Joaquin Phoenix', 'Jared Leto'],
        correctAnswer: 2,
      },
      {
        question: "Which Disney animated film features the song 'A Whole New World'?",
        options: ['Cinderella', 'Aladdin', 'Beauty and the Beast', 'The Little Mermaid'],
        correctAnswer: 1,
      },
      {
        question: 'Which TV series features the characters of Walter White and Jesse Pinkman?',
        options: ['Narcos', 'Better Call Saul', 'The Sopranos', 'Breaking Bad'],
        correctAnswer: 3,
      },
      {
        question: "Who sang the hit song 'Shape of You'?",
        options: ['Justin Bieber', 'Ariana Grande', 'Sam Smith', 'Ed Sheeran'],
        correctAnswer: 3,
      },
      {
        question: 'Which film won the Academy Award for Best Picture in 2020?',
        options: ['The Irishman', 'Once Upon a Time in Hollywood', 'Parasite', '1917'],
        correctAnswer: 2,
      },
      {
        question: "What year did the movie 'The Matrix' release?",
        options: ['1997', '1998', '2000', '1999'],
        correctAnswer: 3,
      },
      {
        question: 'Which actor played Tony Stark/Iron Man in the Marvel Cinematic Universe?',
        options: ['Mark Ruffalo', 'Chris Evans', 'Robert Downey Jr.', 'Chris Hemsworth'],
        correctAnswer: 2,
      },
      {
        question: "Which singer is known as the 'Queen of Pop'?",
        options: ['Mariah Carey', 'Lady Gaga', 'Whitney Houston', 'Madonna'],
        correctAnswer: 3,
      },
    ],
  },
];

const quizContainer = document.querySelector('.quiz-container');
const configContainer = document.querySelector('.config-container');
const answerOptions = document.querySelector('.answer-options');
const nextQuestionBtn = document.querySelector('.next-question-btn');
const questionStatus = document.querySelector('.question-status');
const timerDisplay = document.querySelector('.time-duration');
const resultContainer = document.querySelector('.result-container');

const QUIZ_TIME_LIMIT = 30;
let currentTIme = QUIZ_TIME_LIMIT;
let quizCategory = 'programming';
let numberOfQuestions = 5;
let currentQuestion = null;
let timer = null;
const questionIndexHistory = [];
let correctAnswerCount = 0;

const showQuizResult = () => {
  quizContainer.style.display = 'none';
  resultContainer.style.display = 'block';

  const resultText = `You answered <b>${correctAnswerCount}</b> out of
    <b>${numberOfQuestions}</b> questions correctly, Great effort!`;
  document.querySelector('.result-message').innerHTML = resultText;
};

const resetTimer = () => {
  clearInterval(timer);
  currentTIme = QUIZ_TIME_LIMIT;
  timerDisplay.textContent = `${currentTIme}s`;
};

const startTimer = () => {
  timer = setInterval(() => {
    currentTIme--;
    timerDisplay.textContent = `${currentTIme}s`;

    if (currentTIme <= 0) {
      clearInterval(timer);
      highlightCorrectAnswer();
      setTimeout(() => {
        nextQuestionBtn.style.transition = '0.3s ease-In';
        nextQuestionBtn.style.opacity = 1;
        nextQuestionBtn.style.visibility = 'visible';
      }, 300);
      quizContainer.querySelector('.quiz-timer').style.background = '#c31402';
      quizContainer.querySelector('.quiz-timer').style.boxShadow = '0 0 10px #c31402';

      answerOptions
        .querySelectorAll('.answer-option')
        .forEach((option) => (option.style.pointerEvents = 'none'));
    }
  }, 1000);
};

const getRandomQuestion = () => {
  const categoryQuestions =
    questions.find((cat) => cat.category.toLowerCase() === quizCategory.toLowerCase()).questions || [];

  if (questionIndexHistory.length >= Math.min(categoryQuestions.length, numberOfQuestions)) {
    // clearInterval(timer);
    // nextQuestionBtn.style.visibility = 'hidden';
    return showQuizResult();
  }

  const availableQuestions = categoryQuestions.filter((_, index) => !questionIndexHistory.includes(index));
  const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];

  questionIndexHistory.push(categoryQuestions.indexOf(randomQuestion));
  return randomQuestion;
};

const highlightCorrectAnswer = () => {
  const correctOption = answerOptions.querySelectorAll('.answer-option')[currentQuestion.correctAnswer];
  correctOption.classList.add('correct');
  const iconHTML = `<span class="material-symbols-rounded">check_circle</span>`;
  correctOption.insertAdjacentHTML('beforeend', iconHTML);
};

const handleAnswer = (option, answerIndex) => {
  clearInterval(timer);

  const isCorrect = currentQuestion.correctAnswer === answerIndex;
  option.classList.add(isCorrect ? 'correct' : 'incorrect');
  !isCorrect ? highlightCorrectAnswer() : correctAnswerCount++;

  const iconHTML = `<span class="material-symbols-rounded"
    >${isCorrect ? 'check_circle' : 'cancel'}</span
  >`;
  option.insertAdjacentHTML('beforeend', iconHTML);

  answerOptions.querySelectorAll('.answer-option').forEach((option) => (option.style.pointerEvents = 'none'));

  setTimeout(() => {
    nextQuestionBtn.style.transition = '0.3s ease-In';
    nextQuestionBtn.style.opacity = 1;
    nextQuestionBtn.style.visibility = 'visible';
  }, 300);
};

const renderQuestion = () => {
  currentQuestion = getRandomQuestion();
  if (!currentQuestion) return;

  resetTimer();
  startTimer();

  answerOptions.innerHTML = '';
  nextQuestionBtn.style.visibility = 'hidden';
  quizContainer.querySelector('.quiz-timer').style.background = '#32313c';
  nextQuestionBtn.style.opacity = 0;
  document.querySelector('.question-text').textContent = currentQuestion.question;
  questionStatus.innerHTML = `<b>${questionIndexHistory.length}</b> of <b>${numberOfQuestions}</b> Questions`;

  currentQuestion.options.forEach((option, index) => {
    const li = document.createElement('li');
    li.classList.add('answer-option');
    li.textContent = option;
    answerOptions.appendChild(li);
    li.addEventListener('click', () => handleAnswer(li, index));
  });
};

const startQuiz = () => {
  configContainer.style.display = 'none';
  quizContainer.style.display = 'block';

  quizCategory = configContainer.querySelector('.category-option.active').textContent;
  numberOfQuestions = parseInt(configContainer.querySelector('.question-option.active').textContent);

  renderQuestion();
};

document.querySelectorAll('.category-option, .question-option').forEach((option) => {
  option.addEventListener('click', () => {
    option.parentNode.querySelector('.active').classList.remove('active');
    option.classList.add('active');
  });
});

const resetQuiz = () => {
  resetTimer();
  correctAnswerCount = 0;
  questionIndexHistory.length = 0;
  configContainer.style.display = 'block';
  resultContainer.style.display = 'none';
};

nextQuestionBtn.addEventListener('click', renderQuestion);
document.querySelector('.try-again-btn').addEventListener('click', resetQuiz);
document.querySelector('.start-quiz-btn').addEventListener('click', startQuiz);

const buttons = document.querySelectorAll('button');

buttons.forEach((btn) => {
  btn.addEventListener('mousemove', function (e) {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const numParticles = 10;

    for (let i = 0; i < numParticles; i++) {
      createParticle(btn, x, y);
    }
  });
});

function createParticle(button, x, y) {
  const particle = document.createElement('div');
  particle.classList.add('particle');

  particle.style.left = x + 'px';
  particle.style.top = y + 'px';

  const angle = Math.random() * Math.PI * 2;
  const distance = Math.random() * 80 + 20;
  const tx = Math.cos(angle) * distance;
  const ty = Math.sin(angle) * distance;

  particle.style.setProperty('--tx', tx + 'px');
  particle.style.setProperty('--ty', ty + 'px');

  button.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 500);
}

function randomText() {
  let text = 'ABCDEFGHIJKLMNOPRQSTUWXYZ`~!@#$%^&*()-_=+/?.>,<';

  letter = text[Math.floor(Math.random() * text.length)];

  return letter;
}

function rain() {
  const fontStyles = ['normal', 'bold', 'italic', 'oblique'];
  let e = document.createElement('div');

  let left = Math.floor(Math.random() * 110);
  let size = Math.random() * 1.8;
  let duration = Math.random() * 115;

  e.classList.add('text');
  e.innerText = randomText();
  document.body.appendChild(e);

  e.style.left = left + '%';
  e.style.fontSize = 0.3 + size + 'em';
  e.style.animationDuration = 30 + duration + 's';
  e.style.color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  e.style.fontStyle = fontStyles[Math.floor(Math.random() * fontStyles.length)];
  e.style.transform = `translateX(${Math.floor(Math.random() * 100)}px)`;

  setTimeout(function () {
    document.body.removeChild(e);
  }, 30000);
}

setInterval(function () {
  rain();
}, 300);

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
