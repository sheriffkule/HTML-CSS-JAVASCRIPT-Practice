const body = document.querySelector('body');

class Particle {
  constructor(x, y) {
    this.element = document.createElement('div');
    this.element.classList.add('particle');

    this.element.style.left = `${x}px`;
    this.element.style.top = `${y}px`;

    this.moveX = (Math.random() - 0.5) * 1400;
    this.moveY = (Math.random() - 0.5) * 1400;

    this.element.style.setProperty('--move-x', `${this.moveX}px`);
    this.element.style.setProperty('--move-y', `${this.moveY}px`);

    this.size = Math.random() * 16 + 2;
    this.element.style.width = `${this.size}px`;
    this.element.style.height = `${this.size}px`;

    this.duration = Math.random() * 3 + 2;
    this.element.style.animationDuration = `${this.duration}s`;

    body.appendChild(this.element);

    this.element.addEventListener('animationend', () => {
      this.remove();
    });
  }

  remove() {
    this.element.remove();
  }
}

document.addEventListener('mousemove', (e) => {
  new Particle(e.clientX, e.clientY);
});
