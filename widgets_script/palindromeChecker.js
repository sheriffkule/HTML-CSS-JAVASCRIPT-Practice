let userInput = document.querySelector('input');
let checkBtn = document.querySelector('button');
let result = document.querySelector('.result');

let inputValue;
let checkPalindrome = () => {
  result.style.display = 'block';
  let reverseText = inputValue.split('').reverse().join('');
  if (inputValue == reverseText) {
    result.innerHTML = `Yes, <span>'${inputValue}'</span> is a palindrome`;
    result.style.color = '#0f0';
    result.style.textUnderlineOffset = 'none';
  } else {
    result.innerHTML = `No, <span>'${inputValue}'</span> is not a palindrome`;
    result.style.textDecoration = '1px solid underline red';
    result.style.color = 'red';
    result.style.textUnderlineOffset = '4px';
  }
};

userInput.addEventListener('keyup', (e) => {
  inputValue = userInput.value.toLowerCase().replace(/[^A-Z-0-9]/gi, '');

  if (e.key === 'Enter') {
    checkPalindrome();
  }
});

checkBtn.addEventListener('click', () => {
  if (userInput.value != '') {
    checkPalindrome();
  }
});

document.getElementById('year').textContent = new Date().getFullYear();
