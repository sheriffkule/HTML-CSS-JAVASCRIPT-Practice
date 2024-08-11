let btn = document.querySelector('#btn');
let sidebar = document.querySelector('.sidebar');
let listItem = document.querySelectorAll('.list-item');

btn.onclick = function () {
	sidebar.classList.toggle('active');
};

function activeLink() {
	listItem.forEach((item) => item.classList.remove('active'));
	this.classList.add('active');
}

listItem.forEach((item) => (item.onclick = activeLink));

const navigation = document.querySelector('.navigation');

document.querySelector('.toggle').onclick = function () {
	this.classList.toggle('dropMenu');
	navigation.classList.toggle('dropMenu');
};

document.body.addEventListener('click', function (e) {
	if (
		e.target !== document.querySelector('.toggle') &&
		e.target !== document.querySelector('.navigation') &&
		document.querySelector('.toggle').classList.contains('dropMenu')
	) {
		document.querySelector('.toggle').classList.remove('dropMenu');
		document.querySelector('.navigation').classList.remove('dropMenu');
	}
});

const sr = ScrollReveal({
	origin: 'top',
	distance: '120px',
	duration: 2000,
	opacity: 0.5,
	delay: 200,
	reset: true,
	mobile: true,
});

sr.reveal('.card', {
	interval: 200,
});

const year = document.getElementById('year');
const thisYear = new Date().getFullYear();

year.setAttribute('datetime', thisYear);
year.textContent = thisYear;
