let canvas = document.getElementById('field');
let ctx = canvas.getContext('2d');
let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;

canvas.addEventListener('mousemove', (e) => {
  let rect = canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
});

function drawField() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#0f0';
  ctx.lineWidth = 1;

  for (let y = 0; y < canvas.height; y += 20) {
    ctx.beginPath();
    for (let x = 0; x < canvas.width; x += 5) {
      let dx = mouseX - x;
      let dy = mouseY - y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      let force = Math.min(50 / dist, 10);
      let offsetX = dx * force;
      let offsetY = dy * force;
      ctx.lineTo(x + offsetX, y + offsetY);
    }
    ctx.stroke();
  }
  requestAnimationFrame(drawField);
}
drawField();
