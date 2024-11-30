let ul = document.querySelector('.tags-input ul');
let input = document.querySelector('.tags-input ul input');
let removeAll = document.querySelector('.removeAll button');

let tags = ['Enter Tag'];

function showTags() {
	document.querySelectorAll('.tags-input li').forEach((li) => li.remove());
	tags.forEach((value, key) => {
		let newLi = document.createElement('li');
		newLi.innerText = value;
		let newRemove = document.createElement('div');
		newRemove.classList.add('remove');
		newRemove.setAttribute('onclick', `removeItem(${key})`);
		newRemove.innerHTML = `<i class="ri-close-line"></i>`;
		newLi.appendChild(newRemove);
		ul.appendChild(newLi);
	});
}

showTags();

function removeItem(key) {
	delete tags[key];
	showTags();
}

removeAll.addEventListener('click', function () {
	tags = [];
	showTags();
});

input.addEventListener('keyup', function (event) {
	if (event.key === 'Enter') {
		if (this.value.trim() !== '') {
			tags.push(this.value.trim());
			showTags();
			this.value = '';
		}
	}
});

let darkTheme = document.querySelector('.ri-moon-line');

darkTheme.addEventListener('click', function () {
    document.body.classList.toggle('dark-theme');
    darkTheme.classList.toggle('ri-sun-line');
    localStorage.setItem('dark-theme', darkTheme.classList.contains('active'));
});
    
let storedDarkTheme = localStorage.getItem('dark-theme');
if (storedDarkTheme === 'true') {
    document.body.classList.add('dark-theme');
    darkTheme.classList.add('active');
}

const year = document.getElementById('year');
const thisYear = new Date().getFullYear();

year.setAttribute('datetime', thisYear);
year.textContent = thisYear;