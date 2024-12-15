const hero = document.querySelector('.hero');
const heroTitle = document.querySelectorAll('.hero_title > .ofh > h1');

const settings = {
	isEnabled: false,
	count: 1,
	time: 100,
};

const images = [
	'../images/aristic.jpg',
	'../images/Aurora.jpeg',
	'../images/cityscape.jpg',
	'../images/darkhex.jpg',
	'../images/dreamy-world.jpg',
	'../images/earth.jpg',
	'../images/matrix.jpg',
	'../images/mountains.jpg',
	'../images/tiled-stones.jpg',
	'../images/pexels.jpeg',
];

const initHero = () => {
	gsap.set(heroTitle, { x: '-101%' });
	showHero();
};

const showHero = () => {
	gsap.to(heroTitle, {
		duration: 1.75,
		x: 10,
		ease: 'expo.inOut',
		stagger: 0.025,
	});
};

const preloadImages = () => {
	for (i = 0; i < images.length; i++) {
		let link = document.createElement('link');
		link.rel = 'preload';
		link.as = 'image';
		link.href = images[i];
		document.head.appendChild(link);
	}
};

const calcIndex = (length) => {
	settings.count++;

	if (settings.count == length) {
		settings.count = 0;
	}

	return settings.count;
};

const animateImages = (event) => {
	const image = document.createElement('img');
	const imageSize = 40;

	const countIndex = calcIndex(images.length);

	image.classList.add('hero_media');
	image.setAttribute('src', images[countIndex]);

	image.style.width = `${imageSize}rem`;
	image.style.height = `${imageSize}rem`;
	image.style.top = event.pageY - (imageSize * 10) / 2 + 'px';
	image.style.left = event.pageX - (imageSize * 10) / 2 + 'px';
    image.style.objectFit = 'cover';
    image.style.borderRadius = '2rem';

	hero.appendChild(image);

	const randomDeg = Math.floor(Math.random() * 15);

	window.setTimeout(() => {
		image.style.transform = 'scale(1)';
		image.style.transform = `rotate(${randomDeg}deg)`;
	}, 50);

	window.setTimeout(() => {
		image.style.opacity = 0;
		image.style.filter = 'blur(10px)';
		image.style.transform = 'scale(0.25)';
	}, 1500);

	window.setTimeout(() => {
		hero.removeChild(image);
	}, 2500);
};

window.addEventListener('mousemove', (event) => {
    if (!settings.isEnabled) {
        settings.isEnabled = true;
        
        setTimeout(() => {
            settings.isEnabled = false;
        }, settings.time)

        animateImages(event);
    }
})

window.onload = () => {
	preloadImages();
	initHero();
};
