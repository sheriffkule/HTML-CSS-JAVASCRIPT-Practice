const boxes = document.querySelectorAll('.box');
boxes.forEach((box) => {
	box.addEventListener('mouseover', (event) => {
		const prevSibling = event.target.previousElementSibling;
		const prevPrevSibling = prevSibling?.previousElementSibling;

		const nextSibling = event.target.nextElementSibling;
		const nextNextSibling = nextSibling?.nextElementSibling;

		event.target.classList.add('hovered');

		if (prevPrevSibling) {
			prevPrevSibling.classList.add('prev2');
		}
		if (prevSibling) {
			prevSibling.classList.add('prev1');
		}
		if (nextNextSibling) {
			nextNextSibling.classList.add('next2');
		}
		if (nextSibling) {
			nextSibling.classList.add('next1');
		}
	});
	box.addEventListener('mouseout', (event) => {
		const parent = event.target.parentElement;
		const siblings = parent.querySelectorAll(
			'.next1, .next2, .prev1, .prev2, .hovered'
		);
		siblings.forEach((sibling) =>
			sibling.classList.remove(
				'next1',
				'next2',
				'prev1',
				'prev2',
				'hovered'
			)
		);
	});
});

const year = document.getElementById('year');
const thisYear = new Date().getFullYear();
const thisMonth = new Date().getMonth() + 1;

function getMonthName(monthNumber) {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return monthNames[monthNumber - 1];
}

year.setAttribute('datetime', thisYear);
year.textContent = `${getMonthName(thisMonth)}, ${thisYear}`;