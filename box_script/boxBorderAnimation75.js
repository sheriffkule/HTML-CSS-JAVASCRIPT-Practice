let container = document.querySelector('.container');
let number = 12;

for (let i = 0; i < number; i++) {
    let card = document.createElement('div');
    card.className = "card";
    card.textContent = `${i + 1}`;

    let zPos = i * -120;
    let yPos = i * -20;

    card.style.transform = `translateY(${yPos}px) translateZ(${zPos}px)`;
    card.style.filter = `hue-rotate(${i * 30}deg)`;
    
    container.appendChild(card);
}