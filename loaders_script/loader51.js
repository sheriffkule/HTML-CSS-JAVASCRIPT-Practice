const num = 45;
const anim = document.querySelector('.anim');

for (let i = 0; i < num; i++){
    const inner = document.createElement('div');
    inner.classList.add('inner');
    const delay = (3000 / num) * i;
    const rotate = (360 / num) * i;
    inner.style.color = `hsl(${rotate}, 50%, 50%)`;
    inner.style.animationDelay = `${delay}ms`;
    anim.appendChild(inner);
}