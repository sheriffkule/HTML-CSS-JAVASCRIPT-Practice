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
  }

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

  // Apply presets
  presetCards.forEach((preset) => {
    preset.addEventListener('click', function () {
      presetCards.forEach((p) => p.classList.remove('active'));
      this.classList.add('active');

      const presetType = this.dataset.preset;
      resetToDefault();

      switch (presetType) {
        case 'business':
          // Business preset
          cardFront.style.background = 'linear-gradient(135deg, #3a0ca3, #4361ee)';
          cardFront.querySelector('.card-icon i').className = 'fas fa-briefcase';
          cardFront.querySelector('.card-title').textContent = 'Business Card';
          cardBack.querySelector('.card-icon i').className = 'fas fa-address-card';
          cardBack.querySelector('card-title').textContent = 'Contact Info';
          cardBack.querySelector('.card-desc').innerHTML =
            'John Doe<br>CEO, Company Inc.<br>john@example.com<br>(123) 456-7890';
          break;
        case 'social':
          // Social preset
          cardFront.style.background = 'linear-gradient(135deg, #f72585, #7209b7)';
          cardFront.querySelector('.card-icon i').className = 'fas fa-user-friends';
          cardFront.querySelector('.card-title').textContent = 'Social Profile';
          cardBack.querySelector('.card-icon i').className = 'fas fa-instagram';
          cardBack.querySelector('card-title').textContent = '@username';
          cardBack.querySelector('.card-desc').innerHTML =
            'Follow me for daily updates!<br><br><i class="fab fa-twitter"></i> @username<br><i class="fab fa-facebook"></i> /username';
          break;
        case 'gaming':
          // Gaming preset
          cardFront.style.background = 'linear-gradient(135deg, #4361ee, #4cc9f0)';
          cardFront.querySelector('.card-icon i').className = 'fas fa-gamepad';
          cardFront.querySelector('.card-title').textContent = 'Gamer Tag';
          cardBack.querySelector('.card-icon i').className = 'fas fa-trophy';
          cardBack.querySelector('card-title').textContent = 'Achievements';
          cardBack.querySelector('.card-desc').innerHTML =
            'Level: 99<br>Rank: Master<br>K/D Ratio: 3.5<br>Top 1% Players<br>Main: Support';
          break;
        case 'creative':
          // Creative preset
          cardFront.style.background = 'linear-gradient(135deg, #f8961e, #f94144)';
          cardFront.querySelector('.card-icon i').className = 'fas fa-palette';
          cardFront.querySelector('.card-title').textContent = 'Creative Portfolio';
          cardBack.querySelector('.card-icon i').className = 'fas fa-link';
          cardBack.querySelector('card-title').textContent = 'My Work';
          cardBack.querySelector('.card-desc').innerHTML =
            'Check out my portfolio: <br><br>www.myportfolio.com<br><br>Available for freelance work!';
          break;
      }
    });
  });

  // Copy CSS to clipboard
  copyCssBtn.addEventListener('click', function () {
    const cardStyles = window.getComputedStyle(card);
    const fontStyles = window.getComputedStyle(cardFront);
    const backStyle = window.getComputedStyle(cardBack);
    const cssCode = `
/* Card Container */
.card-wrapper {
  width: 300px;
  height: 400px;
  position: relative;
  transform-style: ${cardStyles.transformStyle};
  transition: transform ${cardStyles.transitionDuration}
  cursor: pointer;
}

.card-wrapper.flipped {
transform: rotateY(180deg);
}

/* Card Faces */
.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: ${frontStyles.boxShadow};
}

.card-front {
background: ${frontStyles.background};
color: white;
transform: rotateY(0deg);
}

.card-back {
background: ${backStyles.background};
color: 212529;
transform: rotateY(180deg);
padding: 1.5rem;
}

/* Perspective Container*/
.card-display {
  perspective: ${document.querySelector('.card-display').style.perspective};
}
    `;

    navigator.clipboard.writeText(css).then(() => {
      const originalText = this.innerHTML;
      this.innerHTML = '<i class="fas fa-check"></i> Copied!';

      setTimeout(() => {
        this.innerHTML = originalText;
      }, 2000);
    });
  });

  // Reset to default
  function resetDefault() {
    // Reset styles
    card.style = '';
    cardFront.style = '';
    cardBack.style = '';
    document.querySelector('.card-display').style.perspective = '1000px';

    // Reset controls
    styleButtons[0].click();
    colorOptions[0].click();
    durationSlider.value = 0.6;
    durationValue.textContent = '0.6';
    perspectiveSlider.value = 1000;
    perspectiveValue.textContent = '1000';
    threeDEffect.checked = true;
    shadowToggle.checked = true;

    // Reset card content
    cardFront.querySelector('.card-icon i').className = 'fas fa-credit-card';
    cardFront.querySelector('.card-title').textContent = 'Front Side';
    cardBack.querySelector('.card-icon i').textContent = 'Click to flip the card';
    cardBack.querySelector('.card-icon i').className = 'fas fa info-circle';
    cardBack.querySelector('.card-title').textContent = 'Back Side';
    cardBack.querySelector('.card-desc').textContent =
      'This is the back side of the card with some additional information.';

    // Reset presets
    presetCards.forEach((p) => p.classList.remove('active'));
  }

  // Update year in footer
  function updateYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('year');

    if (!yearElement) {
      console.error('Year element not found');
      return;
    }
    yearElement.setAttribute('datetime', currentYear.toString());
    yearElement.textContent = currentYear.toString();
  }
  updateYear();
});
