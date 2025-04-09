const boxes = [...document.querySelectorAll('.box')];

boxes.forEach((box) => {
  box.addEventListener('mousemove', (e) => {
    const cursorPosition = e.clientX - box.getBoundingClientRect().left;
    const width = box.getBoundingClientRect().width;

    if (cursorPosition > width / 2) {
      !box.classList.contains('leftEffect') && box.classList.add('rightEffect');
    } else {
      !box.classList.contains('rightEffect') && box.classList.add('leftEffect');
    }
  });

  box.addEventListener('mouseleave', () => {
    box.classList.remove('leftEffect');
    box.classList.remove('rightEffect');
  });
});
