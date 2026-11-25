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

function resetAnimation() {
  counts = 0;
  isOpen = false;
  clickCountElement.textContent = counts;
  present.classList.remove('open', 'animate');
  successMessage.style.opacity = '0';

  // Hide the present message
  document.querySelector('.present-message-container').style.opacity = '0';

  updateSnowflakes(50); // Reset snowflake density
}

function showSuccessMessage() {
  const messages = [
    '🎉 Present opened! 🎉',
    '🎁 You found the gift! 🎁',
    '✨ Surprise inside! ✨',
    '🌟 Christmas magic! 🌟',
  ];

  successMessage.textContent = messages[Math.floor(Math.random() * messages.length)];
  successMessage.style.opacity = '1';

  // Hide message after 5 seconds
  setTimeout(() => {
    successMessage.style.opacity = '0';
  }, 5000);
}

function createConfetti() {
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff9900', '#ff66cc'];
  const confettiCount = 100;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.top = `${Math.random() * 100}%`;
    confetti.style.width = `${Math.random() * 10 + 5}px`;
    confetti.style.height = `${Math.random() * 10 + 5}px`;
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    document.appendChild(confetti);

    // Animate confetti
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 3 + 2;
    const angleX = Math.cos(angle) * velocity;
    const angleY = Math.sin(angle) * velocity;

    let opacity = 1;
    let posX = parseFloat(confetti.style.left);
    let posY = parseFloat(confetti.style.top);

    const animateConfetti = () => {
      opacity -= 0.02;
      posX += angleX;
      posY += angleY + 0.1;

      confetti.style.opacity = opacity;
      confetti.style.left = `${posX}%`;
      confetti.style.top = `${posY}%`;

      opacity > 0 ? requestAnimationFrame(animateConfetti) : confetti.remove();
    };

    // Start animation
    requestAnimationFrame(animateConfetti);
  }
}

// Snowflake animation
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let width;
let height;
let lastNow;
let snowflakes;
let maxSnowflakes = 50;

const rand = (min, max) => min + Math.random() * (max - min);

class Snowflake {
  constructor() {
    this.spawn(true);
  }

  spawn(anyY = false) {
    this.x = rand(0, width);
    this.y = anyY === true ? rand(-50, height + 50) : rand(-50, -10);
    this.xVel = rand(-0.05, 0.05);
    this.yVel = rand(0.02, 0.1);
    this.angle = rand(0, Math.PI * 2);
    this.angleVel = rand(-0.001, 0.001);
    this.size = rand(3, 12);
    this.sizeOsc = rand(0.01, 0.5);
    this.wobble = rand(0, Math.PI * 2);
    this.wobbleSpeed = rand(0.01, 0.05);
    this.color = `rgba(255, 255, 255, ${rand(0.5, 0.9)})`;
  }

  update(elapsed, now) {
    const xForce = rand(-0.001, 0.001);

    if (Math.abs(this.xVel + xForce) < 0.075) this.xVel += xForce;

    this.x += this.xVel * elapsed;
    this.y += this.yVel * elapsed;
    this.angle += this.xVel * 0.05 * elapsed;
    this.wobble += this.wobbleSpeed;

    if (this.y - this.size > height || this.x + this.size < 0 || this.x - this.size > width) this.spawn;

    this.render(now);
  }
}
