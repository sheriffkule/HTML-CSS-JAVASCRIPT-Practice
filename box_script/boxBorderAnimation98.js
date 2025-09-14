const root = document.documentElement;
const btns = document.querySelectorAll('.toolbar button[data-ratio]');
const card = document.getElementById('card');
const label = document.getElementById('label');
const sizeStat = document.getElementById('sizeStat');
const ratioStat = document.getElementById('ratioStat');

let current = '16/9';

function setRatio(r) {
  current = r;
  root.style.setProperty('--ratio', r);
  label.textContent = `aspect-ratio ${r}`;
  btns.forEach((b) => 
    b.setAttribute('aria-pressed', String(b.dataset.ratio === r))
  );
  updateRatioStats()
}

function updateRatioStats() {
    const [a, b] = current.split('/').map(Number)
    const val = a && b ? a / b : NaN;
    ratioStat.textContent = isFinite(val) ? `ratio ${val.toFixed(2)}` : 'ratio -'
}

btns.forEach((btn) => {
    btn.addEventListener('click', () => setRatio(btn.dataset.ratio))
})

const ro = new ResizeObserver(entries => {
  for (let entry of entries) {
    const cr = entry.contentRect
    sizeStat.textContent = `${Math.round(cr.width)} × ${Math.round(cr.height)}`;
  }
});

ro.observe(card);
updateRatioStats();