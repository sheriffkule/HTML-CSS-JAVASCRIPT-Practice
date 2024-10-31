const container = document.querySelector('.container');

for (let i = 1; i < 30; i++) {
    let span = document.createElement('span');
    span.style.setProperty('--i', i);
    container.appendChild(span);
    span.classList.add('run');
}