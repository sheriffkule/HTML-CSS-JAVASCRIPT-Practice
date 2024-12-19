const loader = {
	element: document.querySelector('.loader'),
	counter: document.getElementById('loader-counter'),
	items: document.querySelectorAll('.loader_item > h2'),
};

const header = {
	media: document.querySelector('.header_media'),
	mediaImage: document.querySelector('.header_media_image'),
	sideLines: document.querySelectorAll('.header_nav-side-line'),
	menu: document.querySelector('.header_menu'),
};

const tl = gsap.timeline({ defaults: { duration: 2.2, ease: 'power4.inOut' } });

const isMobile = window.matchMedia('(max-width: 768px').matches;

const initLoader = () => {
	gsap.set(loader.items, { yPercent: 200 });
	gsap.set(header.media, { width: '0%', scale: 0.16 });
	gsap.set(header.sideLines, { scaleY: 0 });

	gsap.set(header.sideLines[0], { x: '60rem' });
	gsap.set(header.sideLines[1], { x: '-60rem' });
	gsap.set(header.menu, { autoAlpha: 0 });

	animateLoader();
};

const animateLoader = () => {
	tl.addLabel('init').to(loader.items, { yPercent: 0 });

	tl.addLabel('counter')
		.to(header.media, { width: '100%', onUpdate: onUpdate }, 'counter')
		.to(header.sideLines, { scaleY: 0.16 }, 'counter');

	tl.addLabel('scaling')
		.to(header.media, { scale: 1 }, 'scaling')
		.to(header.menu, { autoAlpha: 1 }, 'scaling');

	if (!isMobile) {
		tl.to(header.sideLines, { x: 0, scale: 1 }, 'scaling');
	} else {
		tl.to(header.sideLines, { autoAlpha: 0 }, 'scaling');
	}
};

function onUpdate() {
	let progress = this.progress();
	let percent = (progress * 100).toFixed();

	loader.counter.innerHTML = `${Math.round(percent)}%`;

	if (progress === 1) {
		setTimeout(() => {
			destroyLoader();
		}, 1000);
	}
}

const destroyLoader = () => {
	gsap.to(
		loader.items,
		{
			duration: 0.6,
			yPercent: -200,
			ease: 'expo.inOut',
			onComplete: () => loader.element.remove(),
		},
		'-=0.5'
	);
};

const menu = {
	element: document.querySelector('.menu'),
	cols: document.querySelectorAll('.menu_col'),
	line: document.querySelector('.menu_line'),
	pages: document.querySelectorAll('.menu_pages > li > a'),
	SVGs: document.querySelectorAll('.menu_shapes_icon'),
	open: document.querySelector('.menu-open'),
};

const setting = {
	duration: 1.6,
	ease: 'expo.inOut',
	isEnabled: false,
};

const tlMenu = gsap.timeline({
	paused: true,
	defaults: {
		duration: setting.duration,
		ease: setting.ease,
	},
});

const initMenu = (isMobile) => {
	gsap.set(menu.element, { pointerEvents: 'none' });
	gsap.set(menu.cols, { yPercent: -101 });
	gsap.set(menu.line, { scaleY: 0 });
	gsap.set(menu.SVGs, { scale: 0, rotate: 45 });
	gsap.set(menu.pages, { yPercent: 100 });

	tlMenu
		.to(menu.element, { pointerEvents: 'auto' })
		.to(menu.cols, { yPercent: 0, stagger: 0.08 }, 0)
		.to(menu.open, { rotate: 45 }, 0)
		.to(menu.pages, { yPercent: 0, stagger: 0.032 }, 0.48);

	if (!isMobile) {
		tlMenu
			.to(menu.SVGs[0], { scale: 1, rotate: 0 }, 0.48)
			.to(menu.line, { scaleY: 1 }, 0.48);
	}

	addEventListeners(isMobile);
};

const animateIn = (index) => {
	gsap.to(menu.SVGs[index], {
		scale: 1,
		rotate: 0,
		ease: 'expo.inOut',
		duration: 0.8,
	});
};

const animateOut = (index) => {
	gsap.to(menu.SVGs[index], {
		duration: 0.8,
		scale: 0,
		rotate: 60,
		ease: 'expo.inOut',
	});
};

const animatePagesText = (page, state) => {
	page.style.opacity = state === 'on' ? 0.64 : 1;
	page.style.transition = 'opacity 0.64s ease-in-out';
};

const addEventListeners = (isMobile) => {
	menu.open.addEventListener('click', () => {
		!setting.isEnabled ? tlMenu.play() : tlMenu.reverse();
		setting.isEnabled = !setting.isEnabled;
	});

	if (isMobile) return;

	menu.pages.forEach((page, index) => {
		page.addEventListener('mouseenter', () => {
			animatePagesText(page, 'on');
			animateIn(index);
			if (index != 0) animateOut(0);
		});

		page.addEventListener('mouseleave', () => {
			animatePagesText(page, 'off');
			animateOut(index);
			animateIn(0);
		});
	});
};

const init = () => {
	initLoader(isMobile);
	initMenu(isMobile);
};

window.addEventListener('DOMContentLoaded', init);
