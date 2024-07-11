const blurInput = document.getElementById('blur');
const transparencyInput = document.getElementById('transparency');
const colorInput = document.getElementById('color');
const outlineInput = document.getElementById('outline');
const cssResult = document.getElementById('css-code');
const glassRec = document.querySelector('.glass-preview-rectangle');

blurInput.value = 1;
transparencyInput.value = 0.3;
colorInput.value = '#000000';
outlineInput.value = 0;

updateGlassPreview();

blurInput.addEventListener('input', updateGlassPreview);
transparencyInput.addEventListener('input', updateGlassPreview);
outlineInput.addEventListener('input', updateGlassPreview);

colorInput.addEventListener('input', () => {
	updateGlassPreview();
	updateCssCode();
});

function updateGlassPreview() {
	const blurValue = blurInput.value;
	const transparencyValue = transparencyInput.value;
	const colorValue = colorInput.value;
	const outlineValue = outlineInput.value;

	glassRec.style.backdropFilter = `blur(${blurValue}px)`;
	glassRec.style.backgroundColor = `rgba(${hexToRgb(
		colorValue
	)}, ${transparencyValue})`;
	glassRec.style.outline = `${outlineValue}px solid ${colorValue}`;

	updateCssCode();
}

function updateCssCode() {
	const blurValue = blurInput.value;
	const transparencyValue = transparencyInput.value;
	const colorValue = colorInput.value;
	const outlineValue = outlineInput.value;

    const cssCode = `background: rgba(${hexToRgb(colorValue)}, ${transparencyValue});
backdrop-filter: blur(${blurValue}px);
-webkit-backdrop-filter: blur(${blurValue}px);
outline:${outlineValue}px solid ${colorValue};
border-radius: 10px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);`;

	cssResult.value = cssCode;
}

function hexToRgb(hex) {
	const shorthandRegax = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace(shorthandRegax, (m, r, g, b) => r + r + g + g + b + b);
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? `${parseInt(result[1], 16)}, ${parseInt(
				result[2],
				16
		  )}, ${parseInt(result[3], 16)}`
		: null;
}

const copyButton = document.getElementById('copy-button');
copyButton.addEventListener('click', copyToClipboard);

function copyToClipboard() {
    const copyText = cssResult.value;
    const textArea = document.createElement('textarea');
    textArea.value = copyText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy')
    document.body.removeChild(textArea);

    copyButton.innerText = 'Copied!';
    copyButton.style.backgroundColor = '#03c03c';
    setTimeout(() => {
        copyButton.innerText = 'Copy To Clipboard';
        copyButton.style.backgroundColor = '';
    }, 1000);
}