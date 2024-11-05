let pieChart;

function updateDownpayment() {
	const principal = parseFloat(document.getElementById('principal').value);

	const percentage =
		parseFloat(document.getElementById('downpayment-percentage').value) || 0;

	if (principal && percentage >= 0 && percentage <= 100) {
		const downpayment = (percentage / 100) * principal;
		document.getElementById('downpayment').value = downpayment.toFixed(2);
	} else {
		document.getElementById('downpayment').value = '';
		if (percentage >= 100) {
			alert('Down Payment can not be 100% of the principal amount.');
		}
	}
}

function updatePercentage() {
	const principal = parseFloat(document.getElementById('principal').value);
	const downpayment =
		parseFloat(document.getElementById('downpayment').value) || 0;

	if (principal && downpayment >= 0) {
		const percentage = ((downpayment / principal) * 100).toFixed(2);
		document.getElementById('downpayment-percentage').value = percentage;
	} else {
		document.getElementById('downpayment-percentage').value = '';
	}
}

function calculateMortage() {
	const principal = parseFloat(document.getElementById('principal').value);
	const downpayment =
		parseFloat(document.getElementById('downpayment').value) || 0;
	const interestRate = parseFloat(document.getElementById('interest').value);
	const years = parseInt(document.getElementById('years').value);
	const extraPayment =
		parseFloat(document.getElementById('extra-payment').value) || 0;

	if (!principal || !interestRate || !years) {
		alert('Please fill in all fields with valid numbers.');
		return;
	}

	if (downpayment >= principal) {
		alert('Down Payment can not be greater than the principal amount.');
		return;
	}

	if (extraPayment >= principal - downpayment) {
		alert(
			'Extra Payment can not be greater or equal than to the remaining loan amount.'
		);
		return;
	}

	if (interestRate <= 0 && interestRate >= 100) {
		alert('Interest Rate must be between 0 and 100.');
		return;
	}

	const monthlyInterestRate = interestRate / 1200;
	const loanAmount = principal - downpayment;

	let remainingBalance = loanAmount;

	const monthlyPayments = years * 12;

	let monthlyPayment =
		(loanAmount * monthlyInterestRate) /
		(1 - Math.pow(1 + monthlyInterestRate, -monthlyPayments));

	let totalInterest = 0;
	let totalMonths = 0;

	while (remainingBalance > 0 && totalMonths < monthlyPayments) {
		totalMonths++;
		const interestPayment = remainingBalance * monthlyInterestRate;

		let principalPayment = monthlyPayment - interestPayment;

		if (remainingBalance < principalPayment + extraPayment) {
			principalPayment = remainingBalance;
			remainingBalance = 0;
		} else {
			remainingBalance -= principalPayment + extraPayment;
		}

		totalInterest += interestPayment;
	}

	document.getElementById('monthly-payment').innerText = (
		monthlyPayment + extraPayment
	).toFixed(2);
	document.getElementById('total-emi').innerText = totalMonths;
	document.getElementById('total-principal').innerText = loanAmount.toFixed(2);
	document.getElementById('total-interest').innerText =
		totalInterest.toFixed(2);

	const mortageData = {
		principal: loanAmount,
		numPayments: totalMonths,
		monthlyPayment: monthlyPayment,
		monthlyInterestRate: monthlyInterestRate,
		extraPayment: extraPayment,
	};

	localStorage.setItem('mortageData', JSON.stringify(mortageData));

	document.getElementById('amortization-button').disabled = false;

	drawPieChart(totalInterest, loanAmount);
}

function drawPieChart(totalInterest, totalPrincipal) {
	const ctx = document.getElementById('pie-chart').getContext('2d');

	if (pieChart) {
		pieChart.destroy();
	}

	pieChart = new Chart(ctx, {
		type: 'pie',
		data: {
			labels: ['principal', 'Interest'],
			datasets: [
				{
					label: 'Mortgage Breakdown',
					data: [totalPrincipal, totalInterest],
					backgroundColor: ['#9EDDFF', '#6499E9'],
					borderColor: '#fff',
					borderWidth: 1,
				},
			],
		},

		options: {
			responsive: true,
			maintainAspectRatio: false,
		},
	});
}

function clearFields() {
	document.getElementById('principal').value = '';
	document.getElementById('downpayment').value = '';
	document.getElementById('downpayment-percentage').value = '';
	document.getElementById('interest').value = '';
	document.getElementById('years').value = '30';
	document.getElementById('extra-payment').value = '';
	document.getElementById('monthly-payment').innerText = '0';
	document.getElementById('total-emi').innerText = '0';
	document.getElementById('total-principal').innerText = '0';
	document.getElementById('total-interest').innerText = '0';
	document.getElementById('amortization-button').disabled = true;

	if (pieChart) {
		pieChart.destroy();
	}

	const ctx = document.getElementById('pie-chart').getContext('2d');
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('principal').addEventListener('input', function () {
		const principal = parseFloat(this.value);
		const downpayment =
			parseFloat(document.getElementById('downpayment').value) || 0;

		const percentage =
			parseFloat(document.getElementById('downpayment-percentage').value) ||
			0;

		if (principal && downpayment && percentage >= 0 && percentage < 100) {
			const newDownpayment = (percentage / 100) * principal;
			document.getElementById('downpayment').value =
				newDownpayment.toFixed(2);
		}

        if (isNaN(principal) || isNaN(downpayment) || isNaN(percentage)) {
            return;
        }
	});

	document
		.getElementById('downpayment-percentage')
		.addEventListener('input', updateDownpayment);

	const inputs = document.querySelectorAll('input[type="number"]');
	inputs.forEach((input) => {
		input.addEventListener('input', function () {
			const allFilled = Array.from(input).every(
				(input) => input.value.trim() != ''
			);
			document.getElementById('amortization-button').disabled = !allFilled;
		});
	});
});

function viewAmortizationPage() {
	window.location.href = '/widgets/mortageCalculator2.html';
}

if (window.location.pathname.endsWith('/widgets/mortageCalculator2.html')) {
	document.addEventListener('DOMContentLoaded', function () {
		const mortageData = JSON.parse(localStorage.getItem('mortageData'));

		if (!mortageData) {
			alert('No mortage data available. Please go back to main page.');
			window.location.href = '/widgets/mortageCalculator1.html';
		}

		const amortizationTable = document.getElementById('amortization-table');
		amortizationTable.innerHtml = '';

		const headerRow = document.createElement('tr');
		headerRow.innerHTML = `
        <th>Month</th>
        <th>Payment</th>
        <th>Interest</th>
        <th>Principal</th>
        <th>Extra Payment</th>
        <th>Balance</th>
        `;

		amortizationTable.appendChild(headerRow);

		let remainingBalance = mortageData.principal;

		const totaPayments = mortageData.numPayments;

		for (let i = 1; i <= totaPayments; i++) {
			const interestPayment =
				remainingBalance * mortageData.monthlyInterestRate;

			let principalPayment = mortageData.monthlyPayment - interestPayment;

			let extraPayment = mortageData.extraPayment;

			if (remainingBalance < principalPayment + extraPayment) {
				principalPayment = remainingBalance;
				extraPayment = 0;
				remainingBalance = 0;
			} else {
				remainingBalance -= principalPayment + extraPayment;
			}

			const row = document.createElement('tr');

			row.innerHTML = `
            <td>${i}</td>
            <td>${(principalPayment + interestPayment + extraPayment).toFixed(
				2
			)}</td>
            <td>${interestPayment.toFixed(2)}</td>
            <td>${principalPayment.toFixed(2)}</td>
            <td>${extraPayment.toFixed(2)}</td>
            <td>${remainingBalance.toFixed(2)}</td>
        `;
			amortizationTable.appendChild(row);

			if (remainingBalance <= 0) break;
		}
	});
}

const year = document.getElementById('year');
const thisYear = new Date().getFullYear();

year.setAttribute('datetime', thisYear);
year.textContent = thisYear;