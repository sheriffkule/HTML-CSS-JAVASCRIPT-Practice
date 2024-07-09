let colorOne = document.getElementById('color-a');
let colorTwo = document.getElementById('color-b');
let currentDirection = 'to bottom';
let outputCode = document.getElementById('code');

function setDirection(value, _this) {
	let direction = document.querySelectorAll('.buttons button');
	for (let i of direction) {
		i.classList.remove('active');
	}

	_this.classList.add('active');
	currentDirection = value;
}

function generateCode() {
	outputCode.value = `background-image: linear-gradient(${currentDirection}, ${colorOne.value}, ${colorTwo.value})`;
	document.getElementsByTagName(
		'BODY'
	)[0].style.backgroundImage = `linear-gradient(${currentDirection}, ${colorOne.value}, ${colorTwo.value})`;
}

function copyText() {
	let copyBtn = document.querySelector('.ri-file-copy-line');
	outputCode.select();
	document.execCommand('copy');
	copyBtn.style.color = '#00B74F';
	alert('Gradient Copied!');
	setTimeout(() => {
		copyBtn.style.color = '';
	}, 2000);
}
generateCode();