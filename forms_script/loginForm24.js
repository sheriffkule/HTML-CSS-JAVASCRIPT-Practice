const passwordAccess = (loginPass, loginEye) => {
	const input = document.getElementById(loginPass);
	const iconEye = document.getElementById(loginEye);

	iconEye.addEventListener('click', () => {
		input.type === 'password'
			? (input.type = 'text')
			: (input.type = 'password');

        iconEye.classList.toggle('ri-eye-fill')
        iconEye.classList.toggle('ri-eye-off-fill')
	});
};

passwordAccess('password', 'loginPassword');

const passwordRegister = (loginPass, loginEye) => {
	const input = document.getElementById(loginPass);
	const iconEye = document.getElementById(loginEye);

	iconEye.addEventListener('click', () => {
		input.type === 'password'
			? (input.type = 'text')
			: (input.type = 'password');

		iconEye.classList.toggle('ri-eye-fill');
		iconEye.classList.toggle('ri-eye-off-fill');
	});
};

passwordRegister('passwordCreate', 'loginPasswordCreate');

const loginAccessRegister = document.getElementById('loginAccessRegister');
const buttonRegister = document.getElementById('loginButtonRegister');
const buttonAccess = document.getElementById('loginButtonAccess');

buttonRegister.addEventListener('click', () => {
    loginAccessRegister.classList.add('active')
});

buttonAccess.addEventListener('click', () => {
	loginAccessRegister.classList.remove('active');
});

const year = document.getElementById('year');
const thisYear = new Date().getFullYear();

year.setAttribute('datetime', thisYear);
year.textContent = thisYear;