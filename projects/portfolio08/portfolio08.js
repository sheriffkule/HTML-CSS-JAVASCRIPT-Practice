const resumeList = document.querySelectorAll('.resume-list');
const resumeBoxes = document.querySelectorAll('.resume-box');
const portfolioList = document.querySelectorAll('.portfolio-list');
const portfolioBoxes = document.querySelectorAll('.portfolio-box');

resumeList.forEach((list, idx) => {
	list.addEventListener('click', () => {
		document.querySelector('.resume-list.active').classList.remove('active');
		list.classList.add('active');

		document.querySelector('.resume-box.active').classList.remove('active');
		resumeBoxes[idx].classList.add('active');
	});
});

portfolioList.forEach((list, idx) => {
	list.addEventListener('click', () => {
		document.querySelector('.portfolio-list.active').classList.remove('active');
		list.classList.add('active');

        document.querySelector('.portfolio-box.active').classList.remove('active');
		portfolioBoxes[idx].classList.add('active');
	});
});