let container = document.querySelector('.container');

for (let i = 1; i <= 2000; i++){
    let box = document.createElement('div');
    box.classList.add('box');
    box.id = 'box-' + i;
    box.style.setProperty('--i', i);
    container.appendChild(box);
    box.addEventListener('click', function() {
        this.classList.toggle('active');

        setTimeout(() => {
            this.classList.remove('active');
            box.style.transition = '.2s';
        }, 2000);
    });

    let text = document.createElement('p');
    text.textContent = i;
    box.appendChild(text);
}