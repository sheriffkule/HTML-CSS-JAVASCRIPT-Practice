const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// let gradient = ctx.createRadialGradient(
//   canvas.width / 2,
//   canvas.height / 2,
//   0,
//   canvas.width / 2,
//   canvas.height / 2,
//   canvas.width * 0.7
// );

let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, '#bbddff');
gradient.addColorStop(0.5, '#009dc4');
gradient.addColorStop(1, '#030aa7');
ctx.fillStyle = gradient;

class Particle {
  constructor(effect) {
    this.effect = effect;
    this.radius = Math.floor(Math.random() * 8 + 8);
    this.minRadius = this.radius;
    this.maxRadius = this.radius * 6;
    this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2.05);
    this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2.05);
    this.vx = Math.random() * 0.2 - 0.1;
    this.vy = Math.random() * 0.2 - 0.1;
  }

  draw(context) {
    context.fillStyle = gradient;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    context.fillStyle = 'white';
    context.beginPath();
    context.arc(this.x - this.radius * 0.2, this.y - this.radius * 0.3, this.radius * 0.4, 0, Math.PI * 2);
    context.fill();
  }

  update() {
    if (this.effect.mouse.pressed && this.radius < this.maxRadius) {
      const dx = this.x - this.effect.mouse.x;
      const dy = this.y - this.effect.mouse.y;
      const distance = Math.hypot(dx, dy);

      if (distance < this.effect.mouse.radius) {
        this.radius += 5;
      }
    }

    if (this.radius > this.minRadius) this.radius -= 0.1;

    this.x += this.vx;
    this.y += this.vy;

    if (this.x < this.radius) {
      this.x = this.radius;
      this.vx *= -1;
    } else if (this.x > this.effect.width - this.radius) {
      this.x = this.effect.width - this.radius;
      this.vx *= -1;
    }

    if (this.y < this.radius) {
      this.y = this.radius;
      this.vy *= -1;
    } else if (this.y > this.effect.height - this.radius) {
      this.y = this.effect.height - this.radius;
      this.vy *= -1;
    }
  }

  reset() {
    this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2.05);
    this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2.05);
  }
}

class Effect {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.particles = [];
    this.numberOfParticles = 500;
    this.createParticles();

    this.mouse = {
      x: 0,
      y: 0,
      pressed: false,
      radius: 60,
    };

    window.addEventListener('resize', (e) => {
      this.resize(e.target.window.innerWidth, e.target.window.innerHeight);
    });

    window.addEventListener('mousemove', (e) => {
      if (this.mouse.pressed) {
        this.mouse.x = e.x;
        this.mouse.y = e.y;
      }
    });

    window.addEventListener('mousedown', (e) => {
      this.mouse.pressed = true;
      this.mouse.x = e.x;
      this.mouse.y = e.y;
    });

    window.addEventListener('mouseup', (e) => {
      this.mouse.pressed = false;
    });
  }

  createParticles() {
    for (let i = 0; i < this.numberOfParticles; i++) {
      this.particles.push(new Particle(this));
    }
  }

  handleParticles(context) {
    this.particles.forEach((particle) => {
      particle.draw(context);
      particle.update();
    });
  }
  
  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = width;
    this.height = height;
    this.context.fillStyle = 'blue';

    gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#bbddff');
    gradient.addColorStop(0.5, '#009dc4');
    gradient.addColorStop(1, '#030aa7');
    this.context.fillStyle = gradient;
    this.particles.forEach((particle) => {
      particle.reset();
    });
  }
}

const effect = new Effect(canvas, ctx);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  effect.handleParticles(ctx);
  requestAnimationFrame(animate);
}
animate();
