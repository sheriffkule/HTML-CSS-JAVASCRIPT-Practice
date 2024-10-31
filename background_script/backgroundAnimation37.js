function randomText() {
    let text = 'ABCDEFGHIJKLMNOPRQSTUWXYZ';

    letter = text[Math.floor(Math.random() * text.length)];

    return letter;
}

function rain() {
    let e = document.createElement('div');

    let left = Math.floor(Math.random() * 110);
    let size = Math.random() * 1.8;
    let duration = Math.random() * 5;

    e.classList.add('text');
    e.innerText = randomText();
    document.body.appendChild(e);

    e.style.left = left + '%';
    e.style.fontSize = 0.3 + size + 'em';
    e.style.animationDuration = 10 + duration + 's';

    setTimeout(function () {
        document.body.removeChild(e);
    }, 4000);
}

setInterval(function () {
    rain();
}, 20)