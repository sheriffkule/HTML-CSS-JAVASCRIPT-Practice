let btn = document.getElementById('btn');

btn.addEventListener('click', function (e) {
  let rect = btn.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;

  let numParticles = 20;

  for (let i = 0; i < numParticles; i++) {
    createParticle(x, y);
  }
});

function createParticle(x, y) {
    let particle = document.createElement('div');
    particle.classList.add('particle');

    particle.style.left = x + 'px';
    particle.style.top = y + 'px';

    let angle = Math.random() * Math.PI * 2;
    let distance = Math.random() * 80 + 20;
    let tx = Math.cos(angle) * distance;
    let ty = Math.sin(angle) * distance;

    particle.style.setProperty('--tx', tx + 'px');
    particle.style.setProperty('--ty', ty + 'px');

    btn.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 1000)
}
