const box = document.querySelector('.box');

for (let i = 0; i <= 15; i++) {
    let span = document.createElement('span')
    span.style.setProperty('--i', i);
    span.classList.add('item');
    box.appendChild(span);
}