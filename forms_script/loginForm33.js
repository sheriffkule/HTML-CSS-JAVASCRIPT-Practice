const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.onclick = () => {
  container.classList.add('right-panel-active');
  signInButton.onclick = () => {
    container.classList.remove('right-panel-active');
  };
};

document.getElementById('year').textContent = new Date().getFullYear()