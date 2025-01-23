const input = document.querySelector('.password-input');
const requirements = document.querySelectorAll('.requirement');
const requirementsList = document.querySelector('.requirements');
const progressBar = document.querySelector('.progress');
const toggleButton = document.querySelector('.toggle-password');

const validators = {
  length: (password) => password.length >= 10,
  number: (password) => /\d/.test(password),
  symbol: (password) => /[^A-Za-z0-9]/.test(password),
  uppercase: (password) => /[A-Z]/.test(password),
  lowercase: (password) => /[a-z]/.test(password),
};

input.addEventListener('focus', () => {
  requirementsList.classList.add('show');
});

input.addEventListener('input', (e) => {
  const password = e.target.value;
  let validCount = 0;

  requirements.forEach((requirement) => {
    const type = requirement.dataset.requirement;
    const isValid = validators[type](password);
    requirement.classList.toggle('valid', isValid);

    if (isValid) validCount++;
  });

  const progressPercentage = (validCount / requirements.length) * 100;
  progressBar.style.width = `${progressPercentage}%`;
});

toggleButton.addEventListener('click', () => {
  const type = input.type === 'password' ? 'text' : 'password';
  input.type = type;
  toggleButton.classList.toggle('hide');
});

const clearBtn = document.querySelector('.clear');
const copyBtn = document.querySelector('.copy');

clearBtn.addEventListener('click', () => {
  input.value = '';
});

function handleCopyButtonClick() {
  navigator.clipboard.writeText(input.value)
    .then(() => {
      copyBtn.innerText = 'Copied';
      copyBtn.style.background = '#0f0';
      copyBtn.style.color = '#000';
      copyBtn.style.fontWeight = 900;

      setTimeout(() => {
        copyBtn.innerText = 'Copy';
        copyBtn.style.background = '';
        copyBtn.style.color = '';
        copyBtn.style.fontWeight = '';
      }, 2000);
    })
    .catch((error) => {
      console.error('Error copying text:', error);
    });
}

copyBtn.addEventListener('click', handleCopyButtonClick);

const year = document.getElementById('year');
const thisYear = new Date().getFullYear();

year.setAttribute('datetime', thisYear);
year.textContent = thisYear;