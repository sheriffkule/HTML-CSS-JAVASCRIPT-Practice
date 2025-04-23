document.addEventListener('DOMContentLoaded', () => {
  const circles = document.querySelectorAll('.circle');

  circles.forEach((circle) => {
    const targetDegree = parseInt(circle.getAttribute('data-degree'));
    const color = circle.getAttribute('data-color');
    const numberElement = circle.querySelector('.number');

    let degree = 0;

    const intervalId = setInterval(() => {
      degree++;

      if (degree > targetDegree) {
        clearInterval(intervalId);
        return;
      }

      circle.style.background = `conic-gradient(${color} ${degree}%, #222 0%)`;
      numberElement.innerHTML = `${degree}<span>%</span>`;
      numberElement.style.color = color;
    }, 50);
  });
});