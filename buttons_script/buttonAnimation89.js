let box = document.querySelector('.box');

function createParticles() {
    let particle = document.createElement('div');
    particle.classList.add('particle');

    let angle = Math.random() * 2 * Math.PI;
    let distance = Math.random() * 100 + 150;

    let dx = Math.cos(angle) * distance + 'px';
    let dy = Math.sin(angle) * distance + 'px';

    particle.style.setProperty('--dx', dx);
    particle.style.setProperty('--dy', dy);

    particle.style.left = '50%';
    particle.style.top = '50%';
    particle.style.transform = `translate(-50%, -50%)`;

    box.appendChild(particle);
    setTimeout(() => {
        particle.remove();
    }, 2000);
}

setInterval(() => {
    for(let i = 0; i < 3; i++) {
        createParticles();
    }
}, 100);