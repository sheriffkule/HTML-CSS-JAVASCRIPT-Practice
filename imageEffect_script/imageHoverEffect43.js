const galleryImages = document.querySelectorAll('.section_gallery_figure');
const progress = [];

const init = () => {
	galleryImages.forEach((image, index) => {
		progress[index] = -200 * index;
	});

	animateGallery();
};

const animateGallery = () => {
    galleryImages.forEach((image, index) => {
        const windowHeight = window.innerHeight;
        const mediaHeight = image.getBoundingClientRect().height;

        progress[index] += 0.5;

        if (progress[index] > windowHeight + mediaHeight) {
            progress[index] = -mediaHeight -300;
        }

        image.style.transform = `translate3D(${getXPos(index)}vw, ${progress[index]}px, ${getZPos(index)}vw)`
    })

    requestAnimationFrame(animateGallery);
};

const getXPos = (index) => {
	const positions = [15, 70, 55, 25, 40, 5, 33, 12];
	return positions[index];
};

const getZPos = (index) => {
	const positions = [0, 5, -18, 5, -15, 0, 34, 12];
	return positions[index];
};

window.addEventListener('load', init);
