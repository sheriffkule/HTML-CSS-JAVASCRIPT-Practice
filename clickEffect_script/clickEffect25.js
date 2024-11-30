const switchInput = document.getElementById('switch');
const container = document.querySelector('.container');
const p = document.querySelector('p');

switchInput.addEventListener('change', () => {
	const audio = new Audio('/thumb/alarm.mp3');
    audio.play();
    
    container.classList.toggle('darkTheme');
    
    p.textContent = container.classList.contains('darkTheme') ? 'Dark Theme' : 'Light Theme';
});