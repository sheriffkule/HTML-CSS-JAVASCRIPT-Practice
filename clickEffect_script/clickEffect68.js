function calculateFriendship() {
  const name1 = document.getElementById('name1').value.trim().toLowerCase();
  const name2 = document.getElementById('name2').value.trim().toLowerCase();
  const resultDiv = document.getElementById('result');
  const progressBar = document.getElementById('progress');

  if (name1 === "" || name2 === "") {
    resultDiv.classList.add('show')
    resultDiv.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Please enter both names!`;
    progressBar.style.width = '0%';
    return;
  }

  // Combine names
  const combined = name1 + name2;

  // Convert to char codes sum
  let sum = 0;
  for (let i = 0; i < combined.length; i++) {
    sum += combined.charCodeAt(i);
  }

  // Scale result
  const percentage = sum % 101;

  // Friendship message
  let message = '';
  if (percentage > 80) {
    message = `<i class="fa-solid fa-face-grin-hearts"></i> Best Friends Forever!`;
  } else if (percentage > 50) {
    message = `<i class="fa-solid fa-face-laugh"></i> Great Friends!`;
  } else if (percentage > 30) {
    message = `<i class="fa-solid fa-face-smile"></i> Good friendship!`;
  } else {
    message = `<i class="fa-solid fa-face-grin-tears"></i> Could use more bonding!`;
  }

  // Display result
  resultDiv.classList.add('show')
  resultDiv.style.display = 'block';
  resultDiv.innerHTML = `
  <i class="fa-solid fa-wand-sparkles"></i> Friendship between <b>${name1}</b> and <b>${name2}</b> is
  <span class="percentage">${percentage}%</span> <br /><br />${message}
`;

  // Animate progress bar
  progressBar.style.width = '0%';
  setTimeout(() => {
    progressBar.style.width = percentage + '%';
  }, 200);

  // Spawn floating hearts
  spawnHearts();
}

function spawnHearts() {
  for (let i = 0; i < 10; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = `<i class="fa-solid fa-heart"></i>`;
    heart.style.left = Math.random() * window.innerHeight + 'px';
    heart.style.top = window.innerHeight - 100 + 'px';
    heart.style.color = '#ff4081';
    document.body.appendChild(heart);

    // Remove heart after animation
    setTimeout(() => {
      heart.remove();
    }, 4000);
  }
}

const btnContainer = document.querySelector('.btn-container');
const button = document.querySelector('.glow-btn');
let interval;
let spawnDistance = 50;

function createParticles() {
  const particles = document.createElement('div');
  particles.classList.add('particles');
  let btnWidth = button.offsetWidth;
  let btnHeight = button.offsetHeight;

  let angle = Math.random() * 2 * Math.PI;
  let x = btnWidth / 2 + Math.cos(angle) * spawnDistance;
  let y = btnHeight / 2 + Math.sin(angle) * spawnDistance;

  let dx = Math.cos(angle) * 150;
  let dy = Math.sin(angle) * 150;

  particles.style.left = `${x}px`;
  particles.style.top = `${y}px`;
  particles.style.setProperty('--dx', `${dx}px`);
  particles.style.setProperty('--dy', `${dy}px`);

  btnContainer.appendChild(particles);
  setTimeout(() => {
    particles.remove();
  }, 2000);
}

button.addEventListener('mouseenter', () => {
  interval = setInterval(createParticles, 50);
});

button.addEventListener('mouseleave', () => {
  clearInterval(interval);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') button.click();
});