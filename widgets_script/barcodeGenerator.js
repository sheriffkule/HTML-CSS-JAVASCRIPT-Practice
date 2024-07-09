let input = document.getElementById('input');
let btn = document.getElementById('btn-barcode-generator');
let barcode = document.getElementById('barcode');

btn.addEventListener('click', () => {
	JsBarcode(barcode, input.value, {
		format: 'code128',
		displayValue: true,
		fontSize: 24,
		lineColor: '#000000',
		margin: 10,
	});
});

input.addEventListener('keyup', (e) => {
	if (e.key === 'Enter') {
		JsBarcode(barcode, input.value);
	}
});

input.value = '';
JsBarcode(barcode, input.value);
input.focus();
input.select();