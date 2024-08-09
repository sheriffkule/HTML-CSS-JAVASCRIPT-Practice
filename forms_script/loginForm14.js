const signUpBtn = document.getElementById('sign_up');
const logInBtn = document.getElementById('login');

const signUpForm = document.getElementById('sign_up_form');
const logInForm = document.getElementById('login_form');

signUpBtn.addEventListener('click', () => {
	signUpBtn.classList.add('active');
	logInBtn.classList.remove('active');
	signUpForm.classList.add('active');
	logInForm.classList.remove('active');
});

logInBtn.addEventListener('click', () => {
	logInBtn.classList.add('active');
	signUpBtn.classList.remove('active');
	logInForm.classList.add('active');
	signUpForm.classList.remove('active');
});
