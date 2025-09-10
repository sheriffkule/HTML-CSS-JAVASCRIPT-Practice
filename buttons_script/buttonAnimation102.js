const buttons = document.querySelectorAll('.button');

buttons.forEach((button) => {
  button.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const offsetX = x - centerX;
    const offsetY = y - centerY;

    const shadowX = offsetX / 5;
    const shadowY = offsetY / 1.5;

    const insetX = offsetX / 22;
    const insetY = offsetY / 8;

    button.style.boxShadow = `inset ${-insetX}px ${-insetY}px 2px var(--dark-color),
                              inset ${insetX}px ${insetY}px 2px var(--white-color),
                              ${shadowX}px ${shadowY}px 14px -14px var(--white-color),
                              ${shadowX * 3}px ${shadowY * 3}px 48px hsla(235, 32%, 4%, 0.6)`;
  });
});

buttons.forEach((button) => {
  button.addEventListener('mouseleave', () => {
    button.style.boxShadow = `inset 0 -2px 2px var(--dark-color),
                              inset 0 2px 2px var(--white-color),
                              0 18px 14px -14px var(--white-color),
                              -24px 40px 48px hsla(235, 32%, 4%, 0.6)`;
  });
});

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const body = document.body;
    body.classList.toggle('dark-mode');
  });
});
