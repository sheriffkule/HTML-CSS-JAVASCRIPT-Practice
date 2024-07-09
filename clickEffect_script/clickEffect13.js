const addBtn = document.querySelector('.add-btn');
const inputWrapper = document.querySelector('.input-wrapper');
const input = document.querySelector('input');
addBtn.addEventListener('click', () => {
	if (input.value !== '') {
		sendMessage();
	}
	inputWrapper.classList.toggle('open');

	const isOpen = inputWrapper.classList.contains('open');
	addBtn.innerHTML = isOpen
		? '<ion-icon name="send-sharp"></ion-icon>'
		: '<ion-icon class="add-icon" name="add-outline"></ion-icon>';
});

function sendMessage() {
	alert('SEND MESSAGE: ' + input.value);
	input.value = '';
}
