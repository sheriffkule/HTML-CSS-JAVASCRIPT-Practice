const container = document.querySelector('.container');
if (!container) {
  throw new Error('Container element not found');
}

const numDots = 61;
if (typeof numDots !== 'number' || numDots <= 0) {
  throw new Error('Invalid number of dots');
}

try {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < numDots; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.style.setProperty('--i', i);
    fragment.appendChild(dot);
  }
  container.appendChild(fragment);
} catch (error) {
  console.error('Error creating dots:', error);
}