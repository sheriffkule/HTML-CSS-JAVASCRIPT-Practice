const container = document.querySelector('.blackhole');
const totalRing = 70;
const spacing = 20;

for(let i = 0; i < totalRing; i++) {
    const ring = document.createElement('div');
    ring.className = 'ring';

    const z = -i * spacing;
    const angle = (i / totalRing) * 360;

    ring.style.setProperty('--z', `${z}px`);
    ring.style.setProperty('--rotateY', `${angle}deg`);
    ring.style.setProperty('--rotateX', `${angle / 2}deg`);
    ring.style.setProperty('--rotateYEnd', `${angle + 180}deg`);
    ring.style.setProperty('--rotateXEnd', `${angle / 2 + 90}deg`);
    ring.style.animationDelay = `${i * 0.09}s`;

    container.appendChild(ring);
}