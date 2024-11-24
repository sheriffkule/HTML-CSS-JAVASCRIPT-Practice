const navs = document.querySelectorAll('.nav-list li');
const cube = document.querySelector('.box');
const sections = document.querySelectorAll('.section');
const resumeList = document.querySelectorAll('.resume-list');
const resumeBoxes = document.querySelectorAll('.resume-box');
const portfolioList = document.querySelectorAll('.portfolio-list');
const portfolioBoxes = document.querySelectorAll('.portfolio-box');

navs.forEach((nav, idx) => {
	nav.addEventListener('click', () => {
		document.querySelector('.nav-list li.active').classList.remove('active');
		nav.classList.add('active');

        cube.style.transform = `rotateY(${idx * -90}deg)`;

        document.querySelector('.section.active').classList.remove('active');
		sections[idx].classList.add('active');

        const array = Array.from(sections);
        const arrSecs = array.slice(1, -1);
        arrSecs.forEach(arrSecs => {
            if (arrSecs.classList.contains('active')) {
                sections[4].classList.add('action-contact');
            }
        });
        if (sections[0].classList.contains('active')) {
            sections[4].classList.remove('action-contact');
        }
	});
});

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

setTimeout(() => {
    sections[4].classList.remove('active')
}, 1500);