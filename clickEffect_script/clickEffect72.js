// COnfiguration
const countsNeeded = 20;
let counts = 0;
let isOpen = false;

// DOM Elements
const present = document.querySelector('.present');
const clickCountElement = document.getElementById('clickCount');
const successMessage = document.getElementById('successMessage');
const resetButton = document.getElementById('resetButton');
const presentMessage = document.getElementById('presentMessage');
const presentSubMessage = document.getElementById('presentSubMessage');

// Christmas message for inside the present
const christmasMessages = [
  {
    message: 'Merry Christmas!',
    subMessage: 'Wishing you joy & happiness',
    icon: '🎁',
  },
  {
    message: 'Joy to the World!',
    subMessage: 'May your holidays shine bright',
    icon: '🌟',
  },
  {
    message: "Season's Greetings!",
    subMessage: 'Pease, love & laughter',
    icon: '🕊️',
  },
  {
    message: 'Happy Holidays!',
    subMessage: 'Warmest wishes to you',
    icon: '🔥',
  },
  {
    message: 'Winter Wonderland!',
    subMessage: 'May your days be magical',
    icon: '❄️',
  },
  {
    message: 'Christmas Cheer!',
    subMessage: 'Spread love everywhere',
    icon: '🎄',
  },
  {
    message: 'Feliz Navidad!',
    subMessage: 'Prospero año y felicidad',
    icon: '🎅',
  },
  {
    message: 'Ho Ho Ho!',
    subMessage: "Santa's special delivery",
    icon: '🤶',
  },
];

// Function to get a random Christmas message
function getRandomChristmasMessage() {
  return christmasMessages[Math.floor(Math.random() * christmasMessages.length)];
}

// Client handler for present
present.addEventListener('click', () => {
  if (isOpen) return;

  counts += 1;
  clickCountElement.textContent = counts;
  present.style.setProperty('--count', Math.ceil(counts / 2));
  present.classList.add('animate');

  // Remove animation class after it completes
  setTimeout(() => {
    present.classList.remove('animate');
  }, 300);

  if (counts >= countsNeeded) {
    isOpen = true;
    present.classList.add('open');

    // Set a random message inside the present
    const randomMessage = getRandomChristmasMessage();
    presentMessage.textContent = randomMessage.message;
    presentSubMessage.textContent = randomMessage.subMessage;
    document.querySelector('.present-message-icon').textContent = randomMessage.icon;

    showSuccessMessage();
    createConfetti();
    updateSnowflakes(100); // More snowflakes when opened

    // Special effect for the message
    animateMessageAppearance();
  }
});

// Animate the message appearance
function animateMessageAppearance() {
  const messageContainer = document.querySelector('.present-message-container');
  const message = document.querySelector('.present-message');

  // Reset any previous animations
  messageContainer.style.opacity = '0';
  message.style.transform = 'translate(-50%, -50%) scale(0.5)';

  // Animate in
  setTimeout(() => {
    messageContainer.style.opacity = '1';
    message.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    message.style.transform = 'translate(-50%, -50%) scale(1)';
  }, 500);
}

// Reset button handler
resetButton.addEventListener('click', resetAnimation);
