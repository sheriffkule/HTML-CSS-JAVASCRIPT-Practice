let text = document.querySelector('.second-text');

const textLoad = () => {
	setTimeout(() => {
		text.textContent = 'Freelancer';
	}, 4000);

	setTimeout(() => {
		text.textContent = 'Web Developer';
	}, 8000);
};

textLoad();
setInterval(textLoad, 12000);
