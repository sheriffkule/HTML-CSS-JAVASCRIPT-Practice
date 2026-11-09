document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const card = document.getElementById('card');
  const cardFront = document.getElementById('card-front');
  const cardBack = document.getElementById('card-back');
  const flipBtn = document.getElementById('flip-btn');
  const styleButtons = document.querySelectorAll('[data-style]');
  const colorOptions = document.querySelectorAll('.color-option');
  const durationSlider = document.getElementById('duration');
  const durationValue = document.getElementById('duration-value');
  const perspectiveSlider = document.getElementById('perspective');
  const perspectiveValue = document.getElementById('perspective-value');
  const threeDEffect = document.getElementById('3d-effect');
  const shadowToggle = document.getElementById('shadow');
  const presetCards = document.querySelectorAll('.preset-card');
  const copyCssBtn = document.getElementById('copy-css');
  const resetBtn = document.getElementById('reset');

  // Flip card onclick
  card.addEventListener('click', flipCard);
  flipBtn.addEventListener('click', flipCard);

  function flipCard() {
    card.classList.toggle('flipped');
  }

  // Change card style
  styleButtons.forEach((button) => {
    button.addEventListener('click', function () {
      styleButtons.forEach((btn) => btn.classList.remove('active'));
      this.classList.add('active');

      const style = this.dataset.style;
      cardFront.className = 'card-face card-front';
      cardBack.className = 'card-face card-back';

      switch (style) {
        case 'minimal':
          cardFront.classList.add('minimal');
          cardBack.classList.add('minimal');
          break;
        case 'gradient':
          cardFront.classList.add('gradient');
          break;
        case 'neumorphic':
          cardFront.classList.add('neumorphic');
          cardBack.classList.add('neumorphic');
          break;
        default:
          // Default style
          break;
      }
    });
  });

  // Change color
  colorOptions.forEach((option) => {
    option.addEventListener('click', function () {
      colorOptions.forEach((opt) => opt.classList.remove('selected'));
      this.classList.add('selected');

      const color = this.dataset.color;
      cardFront.style.backgroundColor = `linear-gradient(135deg, ${color}, ${darkenColor(color, 20)})`;
    });
  });

  function darkenColor(color, percentage) {
    // Simple color darkening function
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = ((num >> 8) & 0x00ff) - amt;
    const B = (num & 0x0000ff) - amt;
    return (
      '#' +
      (0x1000000 + (R < 0 ? 0 : R) * 0x10000 + (G < 0 ? 0 : G) * 0x100 + (B < 0 ? 0 : B))
        .toString(16)
        .slice(1)
    );

    // Update animation duration
    durationSlider.addEventListener('input', function () {
      const duration = this.value;
      durationValue.textContent = duration;
      card.style.transition = `transform ${duration}s`;
    });

    // Update perspective
    perspectiveSlider.addEventListener('input', function () {
      const perspective = this.value;
      perspectiveValue.textContent = perspective;
      document.querySelector('.card-display').style.perspective = `${perspective}px`;
    });

    // Toggle 3D effect
    threeDEffect.addEventListener('change', function () {
      this.checked ? (card.style.transformStyle = 'preserve-3d') : (card.style.transformStyle = 'flat');
    });

    // Toggle shadow
    shadowToggle.addEventListener('change', function () {
      if (this.checked) {
        cardFront.style.boxShadow = '0 5px 15px rgb(0 0 0 / 0.2)';
        cardBack.style.boxShadow = '0 5px 15px rgb(0 0 0 / 0.2)';
      } else {
        cardFront.style.boxShadow = 'none';
        cardBack.style.boxShadow = 'none';
      }
    });
  }
});
