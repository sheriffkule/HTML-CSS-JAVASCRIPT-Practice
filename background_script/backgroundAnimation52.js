function rain() {
    let number = 100;
    let body = document.querySelector('body');
    let i = 0;
    while (i < number) {
        let drop = document.createElement('div');
        let size = Math.random() * 5;
        let x = Math.floor(Math.random() * window.innerWidth);
        let delay = Math.random() * -20;
        let duration = Math.random() * 5;

        drop.style.width = 0.2 + size + 'px';
        drop.style.left = x + 'px';
        drop.style.animationDelay = delay + 's';
        drop.style.animationDuration = 5 + duration + 's';
        drop.classList.add('drop');
        drop.setAttribute('alt', 'droplet');
        drop.title = 'something';
        body.appendChild(drop);
        i++;
    }
}

rain();