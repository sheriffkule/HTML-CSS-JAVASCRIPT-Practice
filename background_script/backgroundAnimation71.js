let grid = document.getElementById('grid');

for (let i = 0; i < 144; i++) {
  let cell = document.createElement('div');
  cell.classList.add('grid-cell');
  grid.appendChild(cell);
}

grid.addEventListener('mousemove', (e) => {
  let cells = grid.querySelectorAll('.grid-cell');
  let rect = grid.getBoundingClientRect();
  let mouseX = e.clientX - rect.left;
  let mouseY = e.clientY - rect.top;

  cells.forEach((cell) => {
    let cellRect = cell.getBoundingClientRect();
    let cellX = cellRect.left - rect.left + cellRect.width / 2;
    let cellY = cellRect.top - rect.top + cellRect.height / 2;
    let distance = Math.hypot(mouseX - cellX, mouseY - cellY);

    if (distance < 150) {
      cell.classList.add('active');
      let angle = (Math.atan2(mouseY - cellY, mouseX - cellX) * 180) / Math.PI;
      cell.style.transform = `rotate(${angle}deg)`;
    } else {
      cell.classList.remove('active');
      cell.style.transform = '';
    }
  });
});

grid.addEventListener('mouseleave', () => {
  let cells = grid.querySelectorAll('.grid-cell');

  cells.forEach((cell) => {
    cell.classList.remove('active');
    cell.style.transform = '';
    cell.style.transition = '0.5s';
  });
});
