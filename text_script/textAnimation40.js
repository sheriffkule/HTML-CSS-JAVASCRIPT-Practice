const rollingTexts = document.querySelectorAll('.r-text');

const cloneText = () => {
	rollingTexts.forEach((text) => {
		const data = text.dataset.text;

		for (let i = 0; i < data.length; i++) {
			const inner = document.createElement('span');
			inner.classList.add('r-inner');

			text.appendChild(inner);

			const letter = document.createElement('span');
			letter.classList.add('r-letter');

			letter.textContent = data[i];
			inner.appendChild(letter);

			for (let i = 0; i < 6; i++) {
				clone = letter.cloneNode(true);
				letter.after(clone);
			}
		}
	});

    animateText();
};

const animateText = () => {
	const rollingInners = document.querySelectorAll('.r-inner');

	gsap.set(rollingInners, {
		y: '700%',
	});

	const tl = gsap.timeline({
		paused: true,
		defaults: { ease: 'power4.inOut' },
	});

	tl.to(rollingInners, {
		duration: 4,
		y: '0',
		stagger: {
			grid: 'auto',
			from: 'random',
			ease: 'power4.inOut',
			amount: 1.2,
		},
	}).fromTo(
		'r-letter',
		{
			filter: 'brightness(0.5)',
		},
		{
			duration: 3,
			filter: 'brightness(1)',
			stagger: {
				grid: 'auto',
				ease: 'power4.inOut',
				amount: 0.8,
			},
		},
		0
	);

	tl.play();

	document.querySelector('.re-roll').addEventListener('click', () => {
		tl.reverse().then(() => {
			tk.play();
		});
	});
};

cloneText();
