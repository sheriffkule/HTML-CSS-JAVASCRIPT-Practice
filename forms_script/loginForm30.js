const loginForm = document.getElementById('lgForm');
const registerForm = document.getElementById('rgForm');
const signUpButton = document.getElementById('signup');
const logInButton = document.getElementById('login');

signUpButton.onclick = function(event){
    event.preventDefault();
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
}

logInButton.onclick = function(event){
    event.preventDefault();
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
}