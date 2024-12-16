const sliderText = document.querySelectorAll('.swiper-slide_text');
const sliderFigure = document.querySelector('.swiper-slide_figure');
const sliderImage = document.querySelector('.swiper-slide_image');

const arrowNext = document.querySelector('.swiper-button-next');
const arrowPrev = document.querySelector('.swiper-button-prev');

let swiper = new Swiper('.swiper', {
	loop: true,
	direction: 'vertical',
	allowTouchMove: false,
	parallax: true,
	speed: '1000',
});

Splitting({
	target: sliderText,
	by: 'chars',
	matching: 'ofh',
});

gsap.set('.char', { y: '101%' });

const init = () => {
	gsap.from(sliderFigure, {
		duration: 2,
		height: 0,
		ease: 'expo.inOut',
		onStart: slideAnimation,
	});
};

const handleArrows = (opacity, pointerEvents) => {
	arrowNext.style.pointerEvents = pointerEvents;
	arrowNext.style.opacity = opacity;

	arrowPrev.style.pointerEvents = pointerEvents;
	arrowPrev.style.opacity = opacity;
};

const slideAnimation = () => {
	const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

	handleArrows(0.5, 'none');

	return new Promise((resolve) => {
		tl.to('.char', {
			duration: 1,
			y: '-101%',
			stagger: {
				from: 'random',
				amount: 0.4,
			},
			onComplete: resolve,
		}).to(
			'.char',
			{
				duration: 1,
				y: '0',
				stagger: {
					from: 'random',
					amount: 0.4,
				},
				onComplete: () => handleArrows(1, 'auto'),
			},
			2
		);
	});
};

const slideNext = async () => {
	await slideAnimation();
	swiper.slideNext();
};

const slidePrev = async () => {
	await slideAnimation();
	swiper.slidePrev();
};

const addEventListeners = () => {
	arrowNext.addEventListener('click', slideNext);
	arrowPrev.addEventListener('click', slidePrev);
};

window.onload = () => {
    init();
    addEventListeners();
}
