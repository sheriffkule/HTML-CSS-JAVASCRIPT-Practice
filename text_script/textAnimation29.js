let text = document.getElementById("text");
let shadow = "";

for(let i = 0; i < 20; i++){
    shadow += (shadow ? "," : "") + -i * 1 + "px " + i * 1 + "px 0 rgb(26,50,230)";
}

text.style.textShadow = shadow;

console.log(shadow)