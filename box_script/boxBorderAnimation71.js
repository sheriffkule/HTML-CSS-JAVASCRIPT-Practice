const cards = document.querySelectorAll('.card');

cards.forEach((card) => {
  card.addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON') {
      e.stopPropagation();
      return;
    }

    this.querySelector('.card-inner').style.transform = '';
    this.classList.toggle('flipped');
  });

  const button = card.querySelector('.btn');
  if (button) {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      alert('Additional information would appear here!');
    });
  }
});

cards.forEach((card) => {
  const shine = card.querySelector('.shine');
  const cardInner = card.querySelector('.card-inner');

  card.addEventListener('mousemove', (e) => {
    if (!card.classList.contains('flipped')) {
      const { left, top } = card.getBoundingClientRect();
    }
  });
});