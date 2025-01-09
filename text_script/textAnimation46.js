let textElement = document.querySelector('.text');

textElement.innerHTML = textElement.textContent.replace(/\S/g, '<span>$&</span>');

let spans = document.querySelectorAll('.text span');

textElement.addEventListener('mouseover', () => {
    anime({
        targets: spans,
        translateX: () => anime.random(-250,250),
        translateY: () => anime.random(-250,250),
        rotate: () => anime.random(-180,180),
        scale: () => anime.random(0.5,1.5),
        duration: 500,
        easing: 'easeInSine',
    })
})

textElement.addEventListener('mouseout', () => {
    anime({
        targets: spans,
        translateX: 0,
        translateY: 0,
        rotate: 0,
        scale: 1,
        duration: 500,
        easing: 'easeInSine',
    })
})