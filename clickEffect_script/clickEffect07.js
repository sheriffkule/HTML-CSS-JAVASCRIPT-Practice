const viewBtn = document.querySelector(`.view_modal`);
const popup = document.querySelector('.popup');
const close = popup.querySelector('.close');
const field = popup.querySelector('.field');
const input = field.querySelector('input');
const copy = field.querySelector('button');

viewBtn.onclick = () => {
	popup.classList.toggle(`show`);
};
close.onclick = () => {
	viewBtn.click();
};

document.addEventListener('click', (event) => {
	if (event.target == document.body) popup.classList.remove(`show`);
});

copy.onclick = () => {
	input.select();
	if (document.execCommand('copy')) {
		field.classList.add('active');
		copy.innerText = 'Copied';
		setTimeout(() => {
			window.getSelection().removeAllRanges();
			field.classList.remove('active');
			copy.innerText = 'Copy';
		}, 1000);
	}
};
