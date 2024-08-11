let apiKey = 'f892e276175a55c14a0e4b71';
let api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const fromDropDown = document.getElementById('from-currency-select');
const toDropDown = document.getElementById('to-currency-select');
currencies = [ 'AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BRL', 'BSD', 'BTN', 'BWP', 'BYN', 'BZD', 'CAD', 'CDF', 'CHF', 'CLP', 'CNY', 'COP', 'CRC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'FOK', 'GBP', 'GEL', 'GGP', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'IMP', 'INR', 'IQD', 'IRR', 'ISK', 'JEP', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KID', 'KMF', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRU', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SEK', 'SGD', 'SHP', 'SLE', 'SOS', 'SRD', 'SSP', 'STN', 'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TTD', 'TVD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'UYU', 'UZS', 'VES', 'VND', 'VUV', 'WST', 'XAF', 'XCD', 'XDR', 'XOF', 'XPF', 'YER', 'ZAR', 'ZMW', 'ZWL',
];

currencies.forEach((currency) => {
	const option = document.createElement('option');
	option.value = currency;
	option.text = currency;
	fromDropDown.add(option);
});

currencies.forEach((curency) => {
	const option = document.createElement('option');
	option.value = curency;
	option.text = curency;
	toDropDown.add(option);
});

fromDropDown.value = 'USD';
toDropDown.value = 'EUR';

let convertCurrency = () => {
	const amount = document.querySelector('#amount').value;
	// const amount = Number(document.getElementById("amount").value);
	const fromCurrency = fromDropDown.value;
	const toCurrency = toDropDown.value;

	if (amount.length != 0) {
		fetch(api)
			.then((resp) => resp.json())
			.then((data) => {
				let fromExchangeRate = data.conversion_rates[fromCurrency];
				let toExchangeRate = data.conversion_rates[toCurrency];
				const convertedAmount =
					(amount / fromExchangeRate) * toExchangeRate;
				result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(
					2
				)} ${toCurrency}`;
			});
	} else {
		alert('Please enter an amount');
	}
};

document
	.querySelector('#convert-button')
	.addEventListener('click', convertCurrency);
window.addEventListener('load', convertCurrency);

const year = document.getElementById('year');
const thisYear = new Date().getFullYear();

year.setAttribute('datetime', thisYear);
year.textContent = thisYear;