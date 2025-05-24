const card = document.getElementById('card');

card.addEventListener('mousemove', (e) => {
  const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
  const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
  card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) translateZ(30px)`;
  card.style.boxShadow = `
    ${-xAxis * 5}px ${yAxis * 5}px 30px rgba(255, 112, 206, 0.3),
    ${yAxis * 5}px ${-xAxis * 5}px 30px rgba(1, 205, 254, 0.3)`;
});

card.addEventListener('mouseleave', () => {
  card.style.transform = 'rotateY(0deg) rotateX(0deg) translateZ(0px)';
  card.style.boxShadow = `
    0 0 20px rgba(255, 112, 206, 0.2),
    0 0 40px rgba(1, 205, 254, 0.3),
    0 0 60px rgba(150, 120, 255, 0.1)`;
});

setInterval(() => {
  if (Math.random() > 0.9) {
    card.style.transform = 'translateX(5px)';
    setTimeout(() => {
      card.style.transform = 'translateX(5px)';
      setTimeout(() => {
        card.style.transform = 'translateX(0px)';
      }, 50);
    }, 50);
  }
}, 5000);

document.querySelectorAll('.color-box').forEach((box) => {
  box.addEventListener('click', () => {
    const color = box.style.backgroundColor;
    document.body.style.backgroundColor = color;
    setTimeout(() => {
      document.body.style.backgroundColor = 'var(--dark-bg)';
    }, 500);

    const ripple = document.createElement('div');
    ripple.style.position = 'fixed';
    ripple.style.width = '10px';
    ripple.style.height = '10px';
    ripple.style.backgroundColor = color;
    ripple.style.borderRadius = '50%';
    ripple.style.pointerEvents = 'none';
    ripple.style.transform = 'translate(-50%, -50%) scale(0)';
    ripple.style.opacity = '0.8';
    ripple.style.zIndex = '100';
    ripple.style.transition = 'transform 1s ease, opacity 1s ease';

    const rect = box.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    document.body.appendChild(ripple);

    setTimeout(() => {
      ripple.style.transform = 'translate(-50%, -50%) scale(30)';
      ripple.style.opacity = '0';
    }, 20);

    setTimeout(() => {
      document.body.removeChild(ripple);
    }, 1000);
  });
});

function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');
  yearElement.dateTime = currentYear;
  yearElement.textContent = currentYear;
}

updateYear();
