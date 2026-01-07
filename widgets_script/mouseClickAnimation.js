// App state
const state = {
  leftClickType: 'circle',
  rightClickType: 'circle',
  leftClickSize: 50,
  rightClickSize: 60,
  leftClickDuration: 0.8,
  rightClickDuration: 1.0,
  colors: {
    left: '#60a5fa',
    right: '#f87171',
  },
  stats: {
    totalClicks: 0,
    leftClicks: 0,
    rightClicks: 0,
    clicksPerMinute: 0,
    clickTimestamps: [],
  },
};

// DOM Elements
const clickZone = document.getElementById('clickZone');
const totalClicksElement = document.getElementById('totalClicks');
const leftClicksElement = document.getElementById('leftClicks');
const rightClicksElement = document.getElementById('rightClicks');

const totalClicksStat = document.getElementById('totalClicksStat');
const leftClicksStat = document.getElementById('leftClicksStat');
const rightClicksStat = document.getElementById('rightClicksStat');
const clicksPerMinuteElement = document.getElementById('clicksPerMinute');

// Color preview element
const leftColorPreview = document.getElementById('leftColorPreview');
const rightColorPreview = document.getElementById('rightColorPreview');

// Color schemes
const colorSchemes = {
  blue: { left: '#60a5fa', right: '#f87171' },
  green: { left: '#4ade80', right: '#fb923c' },
  purple: { left: '#a78bfa', right: '#f472b6' },
};

// Initialize app
function initApp() {
  setupEventListeners();
  updateColorPreview();
  updateStats();
}

// Set up all event listeners
function setupEventListeners() {
  // Click zone event listeners
  clickZone.addEventListener('click', (e) => handleClick(e, 'left'));
  clickZone.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    handleClick(e, 'right');
  });

  // Left click animation type buttons
  document.getElementById('leftCircle').addEventListener('click', () => setLeftClickType('circle'));
  document.getElementById('leftRipple').addEventListener('click', () => setLeftClickType('ripple'));
  document.getElementById('leftParticles').addEventListener('click', () => setLeftClickType('particles'));

  // Right click animation type buttons
  document.getElementById('rightCircle').addEventListener('click', () => setRightClickType('circle'));
  document.getElementById('rightRipple').addEventListener('click', () => setRightClickType('ripple'));
  document.getElementById('rightParticles').addEventListener('click', () => setRightClickType('particles'));

  // Size sliders
  document.getElementById('leftSizeSlider').addEventListener('input', (e) => {
    state.leftClickSize = parseInt(e.target.value);
    document.getElementById('leftSizeValue').textContent = state.leftClickSize;
  });

  document.getElementById('rightSizeSlider').addEventListener('input', (e) => {
    state.rightClickSize = parseInt(e.target.value);
    document.getElementById('rightSizeValue').textContent = state.rightClickSize;
  });

  // Duration sliders
  document.getElementById('leftDurationSlider').addEventListener('input', (e) => {
    state.leftClickDuration = parseFloat(e.target.value);
    document.getElementById('leftDurationValue').textContent = state.leftClickDuration;
  });

  document.getElementById('rightDurationSlider').addEventListener('input', (e) => {
    state.rightClickDuration = parseFloat(e.target.value);
    document.getElementById('rightDurationValue').textContent = state.rightClickDuration;
  });

  // Color scheme buttons
  document.getElementById('colorBlue').addEventListener('click', () => setColorScheme('blue'));
  document.getElementById('colorGreen').addEventListener('click', () => setColorScheme('green'));
  document.getElementById('colorPurple').addEventListener('click', () => setColorScheme('purple'));

  // Reset stats button
  document.getElementById('resetStats').addEventListener('click', resetStats);
}

// Handle click events
function handleClick(event, clickType) {
  // Update statistics
  updateClickStats(clickType);

  // Create animation based on click type
  const x = event.clientX - clickZone.getBoundingClientRect().left;
  const y = event.clientY - clickZone.getBoundingClientRect().top;

  if (clickType === 'left') {
    createAnimation(
      x,
      y,
      state.leftClickType,
      state.leftClickSize,
      state.leftClickDuration,
      state.colors.left
    );
  } else {
    createAnimation(
      x,
      y,
      state.rightClickType,
      state.rightClickSize,
      state.rightClickDuration,
      state.colors.right
    );
  }
}

// Create animation at position
function createAnimation(x, y, type, size, duration, color) {
  const animation = document.createElement('div');
  animation.className = 'click-animation';
  animation.style.left = `${x}px`;
  animation.style.top = `${y}px`;

  // Set animation style based on type
  if (type === 'circle') {
    animation.style.width = `${size}px`;
    animation.style.height = `${size}px`;
    animation.style.borderRadius = '50%';
    animation.style.backgroundColor = color;
    animation.style.opacity = '0.8';

    // Animation
    animation.animate(
      [
        { transform: 'scale(0)', opacity: 0.8 },
        { transform: 'scale(1.5)', opacity: 0 },
      ],
      {
        duration: duration * 1000,
        easing: 'ease-out',
      }
    );
  } else if (type === 'ripple') {
    animation.style.width = `${size}px`;
    animation.style.height = `${size}px`;
    animation.style.borderRadius = '50%';
    animation.style.border = `3px solid ${color}`;
    animation.style.backgroundColor = 'transparent';

    // Animation
    animation.animate(
      [
        { transform: 'scale(0)', opacity: 1 },
        { transform: 'scale(2.5)', opacity: 0 },
      ],
      {
        duration: duration * 1000,
        easing: 'ease-out',
      }
    );
  } else if (type === 'particles') {
    // Create multiple small particles
    const particleCount = 12;
    for (let i = 0; i < particleCount; i++) {
      createParticle(x, y, size, duration, color, i);
    }
    // No central element for particles
    return;
  }

  clickZone.appendChild(animation);

  // Remove element after animation completes
  setTimeout(() => {
    if (animation.parentNode) {
      animation.parentNode.removeChild(animation);
    }
  }, duration * 1000);
}

// Create particle for particles animation
function createParticle(x, y, size, duration, color, index) {
  const particle = document.createElement('div');
  particle.className = 'click-animation';
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;
  particle.style.width = `${size / 4}px`;
  particle.style.height = `${size / 4}px`;
  particle.style.borderRadius = '50%';
  particle.style.backgroundColor = color;

  // Calculate angle and distance for particle
  const angle = (index / 12) * Math.PI * 2;
  const distance = size;

  // Animation
  particle.animate(
    [
      { transform: `translate(0, 0) scale(1)`, opacity: 1 },
      {
        transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
        opacity: 0,
      },
    ],
    {
      duration: duration * 1000,
      easing: 'ease-out',
    }
  );

  clickZone.appendChild(particle);

  // Remove particle after animation completes
  setTimeout(() => {
    if (particle.parentNode) {
      particle.parentNode.removeChild(particle);
    }
  }, duration * 1000);
}

// Update click statistics
function updateClickStats(clickType) {
  // Update counts
  state.stats.totalClicks++;
  if (clickType === 'left') {
    state.stats.leftClicks++;
  } else {
    state.stats.rightClicks++;
  }

  // Add timestamp for clicks per minute calculation
  const now = Date.now();
  state.stats.clickTimestamps.push(now);

  // Remove timestamps older than 1 minute
  state.stats.clickTimestamps = state.stats.clickTimestamps.filter((timestamp) => {
    return now - timestamp < 60000;
  });

  // Calculate clicks per minute
  state.stats.clicksPerMinute = state.stats.clickTimestamps.length;

  // Update UI
  updateStats();
}

// Update statistics display
function updateStats() {
  totalClicksElement.textContent = state.stats.totalClicks;
  leftClicksElement.textContent = state.stats.leftClicks;
  rightClicksElement.textContent = state.stats.rightClicks;

  totalClicksStat.textContent = state.stats.totalClicks;
  leftClicksStat.textContent = state.stats.leftClicks;
  rightClicksStat.textContent = state.stats.rightClicks;
  clicksPerMinuteElement.textContent = state.stats.clicksPerMinute;
}

// Reset statistics
function resetStats() {
  state.stats = {
    totalClicks: 0,
    leftClicks: 0,
    rightClicks: 0,
    clicksPerMinute: 0,
    clickTimestamps: [],
  };

  updateStats();
}

// Set left click type
function setLeftClickType(type) {
  state.leftClickType = type;

  // Update button states
  document.getElementById('leftCircle').classList.remove('active');
  document.getElementById('leftRipple').classList.remove('active');
  document.getElementById('leftParticles').classList.remove('active');
  document.getElementById(`left${type.charAt(0).toUpperCase() + type.slice(1)}`).classList.add('active');
}

// Set right click type
function setRightClickType(type) {
  state.rightClickType = type;

  // Update button states
  document.getElementById('rightCircle').classList.remove('active');
  document.getElementById('rightRipple').classList.remove('active');
  document.getElementById('rightParticles').classList.remove('active');
  document.getElementById(`right${type.charAt(0).toUpperCase() + type.slice(1)}`).classList.add('active');
}

// Set color scheme
function setColorScheme(scheme) {
  state.colors = colorSchemes[scheme];

  // Update button states
  document.getElementById('colorBlue').classList.remove('active');
  document.getElementById('colorGreen').classList.remove('active');
  document.getElementById('colorPurple').classList.remove('active');
  document.getElementById(`color${scheme.charAt(0).toUpperCase() + scheme.slice(1)}`).classList.add('active');

  // Update preview
  updateColorPreview();
}

// Update color preview circles
function updateColorPreview() {
  leftColorPreview.style.backgroundColor = state.colors.left;
  rightColorPreview.style.backgroundColor = state.colors.right;
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);

// Update year in footer
function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');

  if (!yearElement) {
    console.error('Year element not found');
    return;
  }

  if (yearElement) {
    yearElement.setAttribute('datetime', currentYear.toString());
    yearElement.dateTime = currentYear.toString();
    yearElement.textContent = currentYear.toString();
  }
}
updateYear();
