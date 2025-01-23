const cards = document.querySelectorAll('.card');

function handleMouseMove(e) {
  const card = e.target;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const cardWidth = card.clientWidth;
  const cardHeight = card.clientHeight;
  const transX = x - cardWidth / 2;
  const transY = y - cardHeight / 2;

  card.style.transform = `translate(${transX / -1}px, ${transY / -1}px)`;
  card.style.boxShadow = `${transX}px ${transY}px 0 #0005`;
}

function handleMouseOut() {
  const card = this;
  card.style.transform = '';
  card.style.boxShadow = '';
}

cards.forEach((card) => {
  card.addEventListener('mousemove', handleMouseMove);
  card.addEventListener('mouseout', handleMouseOut);
});