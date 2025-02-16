let container = document.querySelector('.container');

for (let i = 0; i < 12; i++) {
    let row = document.createElement('div');
    row.className = 'row';
    for (let j = 0; j < 20; j++) {
        let box = document.createElement('div');
        box.classList.add('box');
        box.style.filter = `hue-rotate(${i * 36}deg)`
        row.appendChild(box);
    }
    container.appendChild(row);
}