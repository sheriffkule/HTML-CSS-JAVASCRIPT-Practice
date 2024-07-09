let generateOTP = () => {
	const otpLength = 6;

	const otp = Math.floor(Math.random() * Math.pow(10, otpLength));

	document.getElementById('otpDisplay').innerText = `${otp}`;
};

document.getElementById('generateBtn').addEventListener('click', generateOTP);

function copyCode() {
	const otpDisplay = document.getElementById('otpDisplay');
	const otp = otpDisplay.innerText;

	const tempTextarea = document.createElement('textarea');
	tempTextarea.value = otp;

	document.body.appendChild(tempTextarea);

	tempTextarea.select();
	tempTextarea.setSelectionRange(0, 999999);

	document.execCommand('copy');

	document.body.removeChild(tempTextarea);

	const copyButton = document.getElementById('copy-code');
	copyButton.innerText = 'Copied!';
	copyButton.style.background = 'green';
	setTimeout(() => {
		copyButton.innerText = 'Copy';
		copyButton.style.background = '';
	}, 2000);
}