let imgBx = document.querySelectorAll('.imgBx');
let gridSize = 10;
let cellSize = 300 / gridSize;

imgBx.forEach(imgBx => {
    for(let row = 0; row < gridSize; row++){
        for(let col = 0; col < gridSize; col++){
            let dot = document.createElement('i');
            dot.style.backgroundPosition = `${-col * cellSize}px ${-row * cellSize}px`;
            imgBx.appendChild(dot)
        }
    }
});

let dots = document.querySelectorAll('i');

imgBx.forEach(imgBox => {
    imgBox.addEventListener('mouseover', (event) => {
        if(event.target.tagName === 'I') {
            anime({
                targets: imgBox.querySelectorAll('i'),
                translateX: () => anime.random(-250, 250),
                translateY: () => anime.random(-250, 250),
                rotate: () => anime.random(-180,180),
                scale: () => Math.random() * (1 - 0.25) + 0.25,
                duration: 500,
                easing: 'easeInSine'
            })
        }
    })

    imgBox.addEventListener('mouseout', (event) => {
        if(event.target.tagName === 'I') {
            anime({
                targets: imgBox.querySelectorAll('i'),
                translateX: 0,
                translateY: 0,
                rotate: 0,
                scale: 1,
                duration: 500,
                easing: 'easeInSine'
            })
        }
    })
})