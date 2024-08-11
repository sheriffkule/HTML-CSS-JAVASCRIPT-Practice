function X() {
	const firstDate = document.getElementById('firstDate').value;
	const secondDate = document.getElementById('secondDate').value;

	const startTimestamp = new Date(firstDate).getTime();
	const endTimestamp = new Date(secondDate).getTime();

	const difference = endTimestamp - startTimestamp;

	const differenceCount = Math.round(difference / (1000 * 60 * 60 * 24));

	const dayCount = document.getElementById('dayCount');
	if (
		!firstDate & !secondDate ||
		!firstDate & secondDate ||
		firstDate & !secondDate
	) {
		dayCount.innerHTML = 'Please enter a date';
	} else if (!firstDate) {
		dayCount.innerHTML = 'Please enter a date';
	} else if (!secondDate) {
		dayCount.innerHTML = 'Please enter a date';
	} else {
		dayCount.innerHTML = `${differenceCount} days.`;
		dayCount.style.backgroundColor = '#59a67d';
	}
}

const year = document.getElementById('year');
const thisYear = new Date().getFullYear();

year.setAttribute('datetime', thisYear);
year.textContent = thisYear;