document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.button');
  const gradientContainer = button.querySelector('.blob-container');

  const defaultX = 91;
  const offset = 150;

  button.addEventListener('mousemove', handleMouseMove);
  button.addEventListener('mouseleave', handleMouseLeave);

  function handleMouseMove(e) {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;

    gradientContainer.style.transition = 'transform 0.1s';
    gradientContainer.style.transform = `translateX(${x - offset}px) translateZ(0px)`;
  }

  function handleMouseLeave() {
    gradientContainer.style.transition = 'transform 0.8s';
    gradientContainer.style.transform = `translateX(${defaultX}px) translateZ(0px)`;
  }
});
