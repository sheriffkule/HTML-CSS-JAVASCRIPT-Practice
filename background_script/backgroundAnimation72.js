for ( let i = 1; i <= 100; i++) {
    let sizeW = Math.random() * 10;
    let box = document.createElement('div');
    box.classList.add('box');
    box.style.left = Math.random() * + innerWidth + 'px';
    box.style.top = Math.random() * + innerHeight + 'px';
    box.style.fontSize = 10 + sizeW + 'px';
    document.querySelector('.sec').appendChild(box);
}

function animateBox() {
    let boxes = document.querySelectorAll('.box');
    let num = Math.floor(Math.random() * boxes.length);
    boxes[num].classList.toggle('animate');
}

setInterval(animateBox, 50);