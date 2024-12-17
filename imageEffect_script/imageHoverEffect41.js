const section = {
	element: document.querySelector('.section'),
	gallery: document.querySelector('.section_gallery'),
	title: document.querySelector('.section_title'),
	caption: document.querySelector('.section_caption'),
};

let count = 0;

const images = [
	'../images/matrix.jpg',
	'../images/darkhex.jpg',
	'../images/Aurora.jpeg',
	'../images/cityscape.jpg',
	'../images/dreamy-world.jpg',
	'../images/earth.jpg',
	'../images/mountains.jpg',
	'../images/tiled-stones.jpg',
	'../images/glowing_globe.jpg',
	'../images/pexels.jpeg',
];

const calcIndex = (length) => {
	count++;
	if (count === length) count = 0;

	return count;
};

const createImage = (event) => {
	const image = document.createElement('img');
	image.classList.add('section_media');

	const countIndex = calcIndex(images.length);
	image.src = images[countIndex];

	imageWidth = 320;
	imageHeight = 240;

	image.style.width = `${imageWidth}px`;
	image.style.height = `${imageHeight}px`;
	image.style.top = event.clientY - imageHeight / 2 + 'px';
	image.style.left = event.clientX - imageWidth / 2 + 'px';

	section.gallery.appendChild(image);
	image.setAttribute('title', images[countIndex]);

	gsap.set(image, { autoAlpha: 0, scale: 0 });

	animateImage(image);
};
console.log(createImage);

const animateImage = (image) => {
	const randomDeg = Math.floor(Math.random() * 55);
	const tl = gsap.timeline({ defaults: { ease: 'power1.inOut' } });

    tl.to(image, {
        y: 200,
		duration: 1.5,
		scale: 1,
        autoAlpha: 1,
        ease: 'elastic.out(1, 0.3)',
        yoyo: true,

	})
		.to(
			image,
			{
				duration: 6.4,
				yPercent: -400,
                rotate: randomDeg,
                yoyo: true,
			},
			0.5
		)
		.to(image, {
			duration: 3.5,
            autoAlpha: 0,
            ease: 'power1.inOut',
            scale: 0.5,
            yoyo: true,
			onComplete: () => section.gallery.removeChild(image),
        },
            2
        );
};

window.addEventListener('click', (event) => createImage(event));
