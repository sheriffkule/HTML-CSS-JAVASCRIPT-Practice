document.querySelectorAll('.box').forEach((box, index, boxes) => {
  box.addEventListener('mouseover', () => {
    boxes.forEach((b, i) => {
      let className = i < index ? 'prev' : i === index ? 'hovered' : 'next';
      b.classList.remove('prev', 'hovered', 'next');
      b.classList.add(className);
    });
  });
  box.addEventListener('mouseleave', () => {
    boxes.forEach((b) => b.classList.remove('prev', 'hovered', 'next'));
  });
});