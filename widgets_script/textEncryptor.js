const alphabet =
	"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,?!'_-&@#$%*()/:<>|+= ";

function encryptText(text, key) {
    let encryptText = '';
    
    for (let i = 0; i < text.length; i++) {
        const textChar = text[i];
        const keyChar = key[i % key.length];

        const textIndex = alphabet.indexOf(textChar);
        const keyIndex = alphabet.indexOf(keyChar);

        if (textIndex === -1) {
            encryptText += textChar;
        } else {
            const newIndex = (textIndex + keyIndex) % alphabet.length;
            encryptText += alphabet[newIndex];
        }
    }

    return encryptText;
}

function decryptText(encryptText, key) {
    let decryptText = '';

    for (let i = 0; i < encryptText.length; i++) {
        const encryptedChar = encryptText[i];
        const keyChar = key[i % key.length];

        const encryptedIndex = alphabet.indexOf(encryptedChar);
        const keyIndex = alphabet.indexOf(keyChar);

        if (encryptedIndex === -1) {
            decryptText += encryptedChar;
        } else {
            let newIndex = encryptedIndex - keyIndex;
            if (newIndex < 0) newIndex += alphabet.length;
            decryptText += alphabet[newIndex]
        }
    }

    return decryptText;
}

function updateResult(isEncrypting) {
    const text = document.getElementById('message').value;
    const key = document.getElementById('key').value;

    let result = '';

    if (isEncrypting) {
        result = encryptText(text, key);
    } else {
        result = decryptText(text, key);
    }

    document.getElementById('result').textContent = result;
}

document.getElementById('enc-btn').addEventListener('click', () => {
    updateResult(true);
});

document.getElementById('dec-btn').addEventListener('click', () => {
    updateResult(false);
});

document.addEventListener('DOMContentLoaded', () => {
    updateResult(true);
});

const year = document.getElementById('year');
const thisYear = new Date().getFullYear();

year.setAttribute('datetime', thisYear);
year.textContent = thisYear;