let paragraph = document.querySelector('.text');
let text = 'SheriffKule Frontend Developer '.repeat(300);

paragraph.textContent = text;
paragraph.innerHTML = paragraph.textContent.replace(/\S/g,"<span>$&</span>")