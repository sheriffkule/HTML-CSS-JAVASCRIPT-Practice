const container = document.querySelector('.container');

for (let i = 0; i <= 13; i++) {
    let div = document.createElement('div');
    div.style.setProperty('--i', i);
    div.classList.add('item');
    container.appendChild(div);
}