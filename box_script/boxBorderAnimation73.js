let cards = document.querySelectorAll('.cards');

cards.forEach((card) => {
  let pixelContainer = card.querySelector('.pixel-container');
  let pixelSize = 20;
  let cardWidth = card.offsetWidth;
  let cardHeight = card.offsetHeight;

  let cols = Math.floor(cardWidth / pixelSize);
  let rows = Math.floor(cardHeight / pixelSize);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let pixel = document.createElement('div');
      pixel.classList.add('pixel');
      pixel.style.left = `${col * pixelSize}px`;
      pixel.style.top = `${row * pixelSize}px`;

      let tx = (Math.random() - 0.5) * 100;
      let ty = (Math.random() - 0.5) * 100;

      let delay = Math.random() * 0.5;
      pixel.style.transitionDelay = `${delay}s`;

      pixel.style.setProperty('--tx', `${tx}px`);
      pixel.style.setProperty('--ty', `${ty}px`);
      pixelContainer.appendChild(pixel);
    }
  }
});
