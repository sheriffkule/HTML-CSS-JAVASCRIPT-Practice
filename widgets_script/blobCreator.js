let outputCode = document.getElementById('css-code');
let sliders = document.querySelectorAll('.range');
sliders.forEach(function (slider) {
	slider.addEventListener('input', createBlob);
});

let inputs = document.querySelectorAll('.number');
inputs.forEach(function (inp) {
	inp.addEventListener('change', createBlob);
});

function createBlob() {
	let radiusOne = sliders[0].value;
	let radiusTwo = sliders[1].value;
	let radiusThree = sliders[2].value;
	let radiusFour = sliders[3].value;

	let blobHeight = inputs[0].value;
	let blobWidth = inputs[1].value;

	let borderRadius = `${radiusOne}% ${100 - radiusOne}% ${radiusThree}% ${
		100 - radiusThree
	}% / ${radiusFour}% ${radiusTwo}% ${100 - radiusTwo}% ${100 - radiusFour}%`;

	document.querySelector(
		'.blob'
	).style.cssText = `border-radius: ${borderRadius};  height: ${blobHeight}px; width: ${blobWidth}px;`;

	outputCode.value = `border-radius: ${borderRadius};`;
}

const copyButton = document.getElementById('copy');
document.getElementById('copy').addEventListener('click', function () {
	outputCode.select();
	document.execCommand('copy');
	copyButton.innerText = 'Copied!';
	copyButton.style.background = '#03c03c';

	setTimeout(() => {
		copyButton.innerText = 'Copied';
		copyButton.style.background = '';
		copyButton.innerText = 'Copy';
	}, 2000);
});

createBlob();