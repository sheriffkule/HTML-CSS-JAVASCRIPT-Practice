let text = document.getElementById('text');

function randomPosition(max){
    return Math.random() * max;
}

function moveText(){
    let newX = randomPosition(window.innerWidth - text.offsetWidth);
    let newY = randomPosition(window.innerHeight - text.offsetHeight);
    text.style.left = `${newX}px`;
    text.style.top = `${newY}px`;
}

moveText();
text.addEventListener('mouseenter', moveText);