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
        card.style.transform = translateX(0);
      }, 50);
    }, 50);
  }
}, 5000);
