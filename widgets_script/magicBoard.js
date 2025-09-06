const container = document.querySelector('.container');
const size = document.getElementById('size');
const gapSlider = document.getElementById('gap');

let spanBg = '#1e1f26';
let shape = 'square';
let mode = 'draw';
let color = '#ff0000';
let singleColor = false;

let colors = [
  '#ff0000',
  '#ff4000',
  '#ff8000',
  '#ffbf00',
  '#ffff00',
  '#bfff00',
  '#80ff00',
  '#40ff00',
  '#00ff00',
  '#00ff40',
  '#00ff80',
  '#00ffbf',
  '#00ffff',
  '#00bfff',
  '#0080ff',
  '#0040ff',
  '#0000ff',
  '#4000ff',
  '#8000ff',
  '#bf00ff',
  '#ff00ff',
  '#ff00bf',
  '#ff0080',
  '#ff0040',
  '#ff0000',
];

function createGrid() {
  container.innerHTML = '';
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  const spanWidth = parseInt(size.value);
  const spanHeight = parseInt(size.value);
  const gap = parseInt(gapSlider.value);

  const columns = Math.round(containerWidth / (spanWidth + gap));
  const rows = Math.round(containerHeight / (spanHeight + gap));

  for (let i = 0; i < rows; i++) {
    const row = document.createElement('div');
    row.classList.add('row');

    for (let j = 0; j < columns; j++) {
      const span = document.createElement('span');
      span.style.width = `${spanWidth}px`;
      span.style.height = `${spanHeight}px`;
      span.style.margin = `${gap / 2}px`;
      span.style.backgroundColor = spanBg;

      row.appendChild(span);
    }

    container.appendChild(row);
  }
}

createGrid();

window.addEventListener('resize', () => {
    createGrid()
})