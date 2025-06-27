function createRipple(button) {
  const wrapper = button.parentElement;

  for (let i = 0; i < 3; i++) {
    const ring = document.createElement('span');
    ring.classList.add('ring');

    if (i === 1) ring.classList.add('delay-1');
    if (i === 2) ring.classList.add('delay-2');
    wrapper.appendChild(ring);

    setTimeout(() => {
      ring.remove();
    }, 1200);
  }
}
