const showPopup = document.querySelector('.showPopup');
const backBtn = document.querySelector('.backBtn');
const popUp = document.querySelector('.popUp');

popUp.classList.remove('active');

showPopup.addEventListener('click', () => {
	popUp.classList.add('active');
});

backBtn.addEventListener('click', () => {
	popUp.classList.remove('active');
});

backBtn.style.color = 'black';