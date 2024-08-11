let calculateBtn = document.getElementById('calculate-btn');
let result = document.getElementById('result');
let resetBtn = document.getElementById('reset-btn');

let calculate = () => {
	let p = Number(document.getElementById('principal').value);
	let r = Number(document.getElementById('rate').value);
	let t = Number(document.getElementById('time').value);

	let duration = document.getElementById('duration').value;

	let simpleInterest =
		duration == 'year' ? (p * r * t) / 100 : (p * r * t) / 1200;

	let amount = p + simpleInterest;

	result.innerHTML = `<div>Principal Amount: <span>$ ${p.toFixed(
		2
	)}</span></div>
      <div>Total Interest: <span>$ ${simpleInterest.toFixed(2)}</span></div>
      <div>Total Amount: <span>$ ${amount.toFixed(2)}</span></div>`;
};

let reset = () => {
	result.innerHTML = 'Chose other values';
	document.getElementById('principal').value = '1000';
	document.getElementById('rate').value = '5';
	document.getElementById('time').value = '1';
};

calculateBtn.addEventListener('click', calculate);
window.addEventListener('load', calculate);
resetBtn.addEventListener('click', reset);

const year = document.getElementById('year');
const thisYear = new Date().getFullYear();

year.setAttribute('datetime', thisYear);
year.textContent = thisYear;