const showHiddenPass = (passwordId, iconId) => {
  const input = document.getElementById(passwordId);
  const icon = document.getElementById(iconId);

  icon.addEventListener('click', () => {
    input.type = input.type === 'password' ? 'text' : 'password';
    icon.classList.toggle('ri-lock-2-line');
    icon.classList.toggle('ri-eye-line');
  });
};

showHiddenPass('inputPass', 'inputIcon');