const cardsContainer = document.getElementById('cards');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(
    (entry) => {
      if (entry.isIntersecting) {
        cardsContainer.classList.add('spread');
      } else {
        cardsContainer.classList.remove('spread');
      }
    },
    { threshold: 0.5 }
  );
});

observer.observe(cardsContainer);
