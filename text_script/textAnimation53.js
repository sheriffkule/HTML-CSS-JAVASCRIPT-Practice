let output = document.querySelector('.output');

document.addEventListener('keydown', (event) => {
    if(event.key === 'Backspace') {
        if(output.lastElementChild) {
            output.removeChild(output.lastElementChild);
        }
        event.preventDefault();
    } else if(event.key.length === 1) {
        let keyDiv = document.createElement('div');
        keyDiv.classList.add('key');
        let iElem = document.createElement('i');
        iElem.innerText = event.key;
        keyDiv.appendChild(iElem);
        output.appendChild(keyDiv);
    }
})