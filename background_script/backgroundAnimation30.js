let container = document.querySelector('.container');

for (let i = 1; i <= 100; i++){
    let dot = document.createElement('div')
    dot.classList.add('element');
    container.appendChild(dot);
}

let dotAll = document.querySelectorAll('.element');
let animation = anime.timeline({
    targets: dotAll,
    easing: 'easeInOutExpo',
    loop: true,
    delay: anime.stagger(300, { grid: [10, 10], from: 'center' }),
    direction: 'alternate',
});

animation.add({
	rotateZ: 180,
	translateY: anime.stagger(-20, { grid: [10, 10], from: 'center', axis: 'y' }),
    translateX: anime.stagger(-20, { grid: [10, 10], from: 'center', axis: 'x' }),
    opacity: 1,
});

animation.add({
    borderRadius: 50,
});

animation.add({
    scale: 0.2,
    opacity: 0.2,
});

animation.add({
	rotateZ: 180,
	translateY: anime.stagger(0, { grid: [10, 10], from: 'center', axis: 'y' }),
	translateX: anime.stagger(0, { grid: [10, 10], from: 'center', axis: 'x' }),
	opacity: 1,
});

animation.add({
	scale: 1,
	borderRadius: 0,
});

animation.add({
	rotateZ: -90,
});