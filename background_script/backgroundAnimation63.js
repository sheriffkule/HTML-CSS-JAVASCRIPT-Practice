function createBubble() {
  const bubbleWrapper = document.querySelector('.bubble_wrapper');
  const bubble = document.createElement('div');

  bubble.classList.add('bubble');

  const size = Math.random() * 80 + 10;
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;

  bubble.style.left = `${Math.random() * 100}vw`;
  bubble.style.animationDuration = `${Math.random() * 4 + 4}s`;

  bubbleWrapper.appendChild(bubble);

  setTimeout(() => {
    bubble.remove();
  }, 6000);
}

setInterval(createBubble, 200);
