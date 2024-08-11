const textarea = document.querySelector('textarea');
const fileNameInput = document.querySelector('.file-name input');
const selectMenu = document.querySelector('.select-menu select');
const saveBtn = document.querySelector('.save-btn');

selectMenu.addEventListener('change', () => {
	const selectedFormat = selectMenu.options[selectMenu.selectedIndex].text;
	saveBtn.innerHTML = 'Save As ${selectedFormat.split(" ")[0]} File';
});

saveBtn.addEventListener('click', () => {
	const blob = new Blob([textarea.value], { type: selectMenu.value });
	const fileUrl = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.download = fileNameInput.value;
	link.href = fileUrl;
	link.click();
	window.URL.revokeObjectURL(fileUrl);
});

const year = document.getElementById('year');
const thisYear = new Date().getFullYear();

year.setAttribute('datetime', thisYear);
year.textContent = thisYear;