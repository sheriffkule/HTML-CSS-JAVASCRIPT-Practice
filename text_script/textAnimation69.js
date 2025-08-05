/**@type{HTMLCanvasElement}*/
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particles = [];

let colors = [
    '#FF69B4',
    '#33CC33',
    '#66CCCC',
    '#FF9900',
    '#CC33CC',
    '#66CC00',
    '#CC0000',
    '#00CC00',
    '#0000CC',
]

const settings = {
  text: 'SheriffKule',
  color: colors[Math.floor(Math.random() * colors.length)],
  fontSize: 120,
  gap: 4,
  radius: 1.5,
};

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function generateParticlesFromText() {
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');

  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;

  tempCtx.fillStyle = '#fff';
  tempCtx.textAlign = 'center';
  tempCtx.font = `bold ${settings.fontSize}px Bungee, sans-serif`;
  tempCtx.fillText(settings.text, tempCanvas.width / 2, tempCanvas.height / 2 + settings.fontSize / 3);

  const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
  particles = [];

  for (let y = 0; y < tempCanvas.height; y += settings.gap) {
    for (let x = 0; x < tempCanvas.width; x += settings.gap) {
      const index = (y * tempCanvas.width + x) * 4;

      if (imageData.data[index + 3] > 128) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          tx: x,
          ty: y,
          radius: settings.radius,
          color: settings.color,
        });
      }
    }
  }
}

function animateParticles() {
  gsap.to(particles, {
    duration: 3,
    x: (index) => particles[index].tx,
    y: (index) => particles[index].ty,
    ease: 'power3.out',
    stagger: {
      amount: 2,
    },
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle) => {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.fill();
  });
  requestAnimationFrame(drawParticles);
}

function startAnimation() {
  resizeCanvas();
  generateParticlesFromText();
  animateParticles();
  drawParticles();
}

document.fonts.ready.then(() => {
  startAnimation();
});
