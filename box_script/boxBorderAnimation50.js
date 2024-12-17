const bento = document.querySelector('.bento');
const bentoBoxes = document.querySelectorAll('.bento_box');
const bentoBoxesSpan = document.querySelectorAll('.bento_box_text > span');
const bentoIntro = document.querySelectorAll(
	'.bento_intro > .bento_intro_row > h1'
);

const init = () => {
	gsap.set(bentoBoxes, { scaleY: 0, transformOrigin: 'bottom' });
	gsap.set(bentoBoxesSpan, { y: '110%' });

	splitText();
};

const splitText = () => {
	Splitting({
		target: bentoIntro,
		by: 'chars',
		key: null,
	});

	gsap.set('.bento_intro .char', { y: '100%' });

	animateIntro();
};

const animateIntro = () => {
	gsap.timeline({
		defaults: { duration: 1.6, ease: 'expo.inOut', stagger: 0.04 },
	})
		.to('.bento_intro .char', {
			y: '0',
			onComplete: () => {
				animateBoxes();
			},
		})
		.to('.bento_intro .char', {
			y: '-100%',
			onComplete: () => {
				document.querySelector('.bento_intro').remove();
			},
		});
};

const animateBoxes = () => {
	gsap.timeline()
		.to(bentoBoxes, {
			duration: 2.6,
			scaleY: '100%',
			ease: 'expo.inOut',
			stagger: 0.02,
			onComplete: () => {
				addEventListeners();
			},
		})
		.to(
			bentoBoxesSpan,
			{
				duration: 1.6,
				y: '0',
				ease: 'expo.inOut',
				stagger: 0.05,
			},
			1
		);
};

const animateInnerText = (data) => {
    gsap.timeline({ defaults: {duration: 0.35 } })
        .to(data, {
        y: '-200%',
        ease: 'expo.in',
        overwrite: true,
        })
        .set(data, { y: '200%' })
        .to(data, {
            y: '0',
            ease: 'expo.out'
    })
}

const addEventListeners = () => {
    bentoBoxes.forEach((box) => {
        box.addEventListener('mouseenter', (e) => {
            const dataSpan = e.target.children[0].children[0];

            e.target.classList.add('active');
            animateInnerText(dataSpan);
        });
    });

    bentoBoxes.forEach((box) => {
        box.addEventListener('mouseout', (e) => {
            e.target.classList.remove('active');
        })
    })
};

init();