const hero = {
	element: document.querySelector('.hero'),
	titles: document.querySelectorAll('.hero_title_row_text'),
	media: document.querySelectorAll('.hero_media'),
	mediaImages: document.querySelectorAll('.hero_media_image'),
};

const init = () => {
	gsap.set(hero.titles, { autoAlpha: 0, yPercent: -101 });
	gsap.set(hero.media, { autoAlpha: 0, xPercent: -110, yPercent: -25 });
	gsap.set(hero.mediaImages, { xPercent: -100 });

	gsap.set('.nav_item_text', { yPercent: -100 });
	gsap.set('.hero_title_row:nth-child(3)', { xPercent: -100, x: 'unset' });

	animateHero();
};

const animateHero = () => {
	const tl = gsap.timeline({ defaults: { duration: 2, ease: 'expo.inOut' } });

	tl.to('.nav_item_text', {
		yPercent: 0,
	})
		.to(
			hero.media,
			{
				autoAlpha: 1,
				xPercent: 0,
			},
			0
		)
		.to(
			hero.mediaImages,
			{
				xPercent: 0,
				stagger: 0.02,
			},
			0.2
		)
		.to(
			hero.titles,
			{
				autoAlpha: 1,
				yPercent: 0,
				stagger: 0.02,
			},
			2
		)
		.to(
			hero.media,
			{
				yPercent: 0,
			},
			2
		);
};

window.addEventListener('DOMContentLoaded', init);
