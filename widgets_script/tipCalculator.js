const ui = {
	form: document.querySelector('.calculator'),
	tips: document.querySelector('.tips'),
	tipAmount: document.querySelector('.tip-amount'),
	tipPerGuest: document.querySelector('.tip-guest'),
	totalPerGuest: document.querySelector('.total-guest'),
};

function initApp() {
    ui.form.addEventListener('submit', onFormSubmit);
	ui.form.addEventListener('reset', onFormReset);
    document.addEventListener('DOMContentLoaded', onFormReset)
}

function onFormSubmit(e) {
	e.preventDefault();

	const billAmount = parseFloat(ui.form.billAmount.value);
	const guestCount = parseInt(ui.form.guestCount.value);

	if (!billAmount) {
		alert('Please provide a valid bill amount.');
		return;
	}

	const tipAmount = calculateTip(billAmount);
	const tipPerGuest = tipAmount / guestCount;
	const totalPerGuest = (billAmount + tipAmount) / guestCount;

	displayResult(tipAmount, tipPerGuest, totalPerGuest);
}

function onFormReset() {
    displayResult(0, 0, 0)
}

function displayResult(tipAmount, tipPerGuest, totalPerGuest) {
	ui.tipAmount.textContent = formatNumber(tipAmount);
	ui.tipPerGuest.textContent = formatNumber(tipPerGuest);
	ui.totalPerGuest.textContent = formatNumber(totalPerGuest);
}

function calculateTip(billAmount) {
	const selectedTip = ui.form.querySelector('input:checked');

	if (selectedTip.id === 'custom') {
		return parseInt(ui.form.customTip.value);
	}

	return (billAmount * parseInt(selectedTip.value)) / 100;
}

function formatNumber(number) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		currencyDisplay: 'symbol',
	}).format(number);
}

initApp();

const year = document.getElementById('year');
const thisYear = new Date().getFullYear();

year.setAttribute('datetime', thisYear);
year.textContent = thisYear;