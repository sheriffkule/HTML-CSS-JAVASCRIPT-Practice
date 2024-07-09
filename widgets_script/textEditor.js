let optionsButtons = document.querySelectorAll('.option-button');
let advancedOptionButton = document.querySelectorAll('.adv-option-button');
let fontName = document.getElementById('fontName');
let fontSizeRef = document.getElementById('fontSize');
let writingArea = document.getElementById('text-input');
let linkButton = document.getElementById('createLink');
let alignButtons = document.querySelectorAll('.align');
let spacingButtons = document.querySelectorAll('.spacing');
let formatButtons = document.querySelectorAll('.format');
let scriptButtons = document.querySelectorAll('.script');

let fontList = [
	'Arial',
	'Verdana',
	'Times New Roman',
	'Georgia',
	'Courier New',
  'cursive',
  'monospace',
];

const initializer = () => {
	highlighter(alignButtons, true);
	highlighter(spacingButtons, true);
	highlighter(formatButtons, false);
	highlighter(scriptButtons, true);

	fontList.map((value) => {
		let option = document.createElement('option');
		option.value = value;
		option.innerHTML = value;
		fontName.appendChild(option);
	});

	for (let i = 1; i <= 7; i++) {
		let option = document.createElement('option');
		option.value = i;
		option.innerHTML = i;
		fontSizeRef.appendChild(option);
	}

	fontSizeRef.value = 3;
};

const modifyText = (command, defaultUi, value) => {
	document.execCommand(command, defaultUi, value);
};

optionsButtons.forEach((button) => {
	button.addEventListener('click', () => {
		modifyText(button.id, false, null);
	});
});

advancedOptionButton.forEach((button) => {
  button.addEventListener('change', () => {
    modifyText(button.id, false, button.value)
  });
});

linkButton.addEventListener('click', () => {
  let userLink = prompt('Enter the URL for the link');

  if (/http/i.test(userLink)) {
    modifyText(linkButton.id, false, userLink);
  } else {
    url = "http://" + userLink;
    modifyText(linkButton.id, false, userLink);
  }
});

const highlighter = (className, needsRemoval) => {
	className.forEach((button) => {
		button.addEventListener('click', () => {
			if (needsRemoval) {
				let alreadyActive = false;

				if (button.classList.contains('active')) {
					alreadyActive = true;
				}

				highlighterRemover(className);
				if (!alreadyActive) {
					button.classList.add('active');
				}
			} else {
				button.classList.toggle('active');
			}
		});
	});
};

const highlighterRemover = (className) => {
  className.forEach((button) => {
    if (button.classList.contains('active')) {
      button.classList.remove('active');
    }
	});
};

window.onload = initializer();

const textinput = document.querySelector('.text-input');
const fileNameInput = document.querySelector('.file-name input');
const selectMenu = document.querySelector('.save-as .select-menu select');
const saveBtn = document.querySelector('.save-btn');

selectMenu.addEventListener('change', () => {
	const selectedFormat = selectMenu.options[selectMenu.selectedIndex].text;
	saveBtn.innerHTML = 'Save As ${selectedFormat.split(" ")[0]} File';
});

saveBtn.addEventListener('click', () => {
	const blob = new Blob([textinput.textContent], { type: selectMenu.value });
	const fileUrl = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.download = fileNameInput.value;
	link.href = fileUrl;
	link.click();
	window.URL.revokeObjectURL(fileUrl);
});