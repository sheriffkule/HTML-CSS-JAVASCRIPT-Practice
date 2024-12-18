const section = document.querySelector('.section');
const sectionListItem = section.querySelectorAll('.section_list_item');
const sectionListItemText = section.querySelectorAll('.section_list_item > h1');
const sectionListFigure = section.querySelectorAll('.section_list_item_figure');
const sectionMedia = section.querySelectorAll('.section_media');

const clipPath = {
	top: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
	bottom: 'polygon(0 100%, 100% 100%, 100% 0, 0 100%)',
	full: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
};

gsap.set(sectionMedia, { clipPath: clipPath.top });

const initAnimation = () => {
	gsap.set(sectionListItemText, { y: '100%' });

	const tlText = gsap.timeline({
		defaults: { duration: 1.5, ease: 'expo.inOut' },
	});
	tlText
		.to(sectionListItemText, {
			y: 0,
			stagger: 0.15,
		})
		.from(
			sectionListFigure,
			{
				width: 0,
				stagger: 0.1,
			},
			0.8
		);

	addEventListeners();
};

const addEventListeners = () => {
	sectionListItem.forEach((item, index) => {
		const images = sectionMedia[index]?.children;

		item.addEventListener('mouseenter', () => {
			for (let i = 0; i < images.length; i++) {
				gsap.timeline({
					defaults: {
						duration: 0.5,
						ease: 'expo.inOut',
						overwrite: true,
					},
				}).to(sectionMedia[index], {
					clipPath: clipPath.full,
				});
			}
			sectionListItem.forEach((otherItem) => {
				otherItem === item
					? (otherItem.style.color = 'orange')
					: (otherItem.style.opacity = 0.5);
			});
		});

		item.addEventListener('mouseleave', () => {
			for (let i = 0; i < images.length; i++) {
				gsap.timeline({
					defaults: {
						duration: 0.5,
						ease: 'expo.inOut',
						overwrite: true,
					},
				}).to(sectionMedia[index], {
					clipPath: clipPath.bottom,
					onComplete: () => {
						gsap.set(sectionMedia[index], {
							clipPath: clipPath.top,
						});
					},
				});
			}

			sectionListItem.forEach((otherItem) => {
				otherItem === item
					? (otherItem.style.color = '#080')
					: (otherItem.style.opacity = 1);
			});
		});
	});
};

initAnimation();
