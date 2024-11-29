const celsius = document.getElementById('celsius');
const fahrenheit = document.getElementById('fahrenheit');
const kelvin = document.getElementById('kelvin');
const reset = document.querySelector('.btn button');

// window.addEventListener('load', () => celsius.focus());

celsius.addEventListener('input', () => {
	fahrenheit.value = ((celsius.value * 9) / 5 + 32).toFixed(2);
	kelvin.value = (parseFloat(celsius.value) + 273.15).toFixed(2);
	if (!celsius.value) fahrenheit.value = '';
	if (!celsius.value) kelvin.value = '';
});

fahrenheit.addEventListener('input', () => {
	celsius.value = (((fahrenheit.value - 32) * 5) / 9).toFixed(2);
	kelvin.value = (((fahrenheit.value - 32) * 5) / 9 + 273.15).toFixed(2);
	if (!fahrenheit.value) celsius.value = '';
	if (!fahrenheit.value) kelvin.value = '';
});

kelvin.addEventListener('input', () => {
	celsius.value = (kelvin.value - 273.15).toFixed(2);
	fahrenheit.value = (((kelvin.value - 273.15) * 9) / 5 + 32).toFixed(2);
	if (!kelvin.value) celsius.value = '';
	if (!kelvin.value) fahrenheit.value = '';
});

reset.addEventListener('click', () => {
	celsius.value = '';
	fahrenheit.value = '';
	kelvin.value = '';
});

const year = document.getElementById('year');
const thisYear = new Date().getFullYear();

year.setAttribute('datetime', thisYear);
year.textContent = thisYear;