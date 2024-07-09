function checkPassword() {
	let password = document.getElementById('password').value;
	let confirmPassword = document.getElementById('confirm-password').value;
	let message = document.getElementById('message');

	if (password.length != 0) {
		if (password == confirmPassword) {
			message.textContent = 'Passwords match.';
            message.style.backgroundColor = '#3ae374';
            message.style.color = 'black';
		} else {
			message.textContent = 'Passwords do not match!';
			message.style.backgroundColor = 'red';
		}
	} else {
		message.textContent = 'Please enter a password!';
		message.style.backgroundColor = 'orange';
		message.style.color = 'black';
	}
}