if (CSS && CSS.registerProperty) {
  CSS.registerProperty({
    name: '--wave-offset',
    syntax: '<number>',
    inherits: 'false',
    initialValue: '0',
  });
} else {
  document.querySelector('.hint').textContent = "Your browser doesn't support CSS custom properties";
}

const letters = document.querySelectorAll('.animated-text span');
let time = 0;

function animate() {
  time += 0.1;

  letters.forEach((letter, i) => {
    const offset = Math.sin(time + i * 0.5) * (15 + Math.sin(i * 0.9) * 5);
    letter.style.setProperty('--wave-offset', offset);
  });

  requestAnimationFrame(animate);
}

animate();
