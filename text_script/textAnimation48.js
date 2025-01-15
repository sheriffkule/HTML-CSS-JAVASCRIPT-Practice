let text = document.getElementById('text');
let shadow = '';

for(let i = 0; i < 33; i++){
    shadow += (shadow ? "," : "") + -i * 1 + "px " + i * 1 + "px 0 rgb(102,108,153)";
}

text.style.textShadow = shadow