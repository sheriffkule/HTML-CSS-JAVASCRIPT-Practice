document.querySelectorAll('ul li a').forEach(element => {
    let randomChars = '!@#$%^&*()_+-<>?';
    let originalText = element.dataset.text;

    element.addEventListener('mouseover', () => {
        let iterations = 0;
        let interval = setInterval(() => {
            element.textContent = originalText.split('').map((char, index) => {
                if (index < iterations) return char;
                return randomChars.charAt(Math.floor(Math.random() * randomChars.length));
            })
            .join('');
            if (iterations >= originalText.length) {
                clearInterval(interval);
            }
            iterations += 1 / 3;
        }, 50)
    })
})