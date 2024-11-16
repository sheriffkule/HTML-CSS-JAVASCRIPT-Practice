let container = document.querySelector('.container');

for (let i = 1; i < 145; i++) {
    let dot = document.createElement('div');
    dot.classList.add('element');
    dot.id = 'box-' + i;
    dot.style.setProperty('--i', i);
    container.appendChild(dot);

    let text = document.createElement('p');
    text.textContent = i;
    dot.appendChild(text);
}

let dotAll = document.querySelectorAll('.element');
let animation = anime.timeline({
    targets: dotAll,
    easing: 'easeInOutExpo',
    loop: true,
    delay: anime.stagger(20),
})

animation
	.add({
		scale: 0.1,
		duration: function () {
			return anime.random(500, 3000);
		},
	})

	.add({
		scale: 1,
		duration: function () {
			return anime.random(500, 3000);
		},
	});