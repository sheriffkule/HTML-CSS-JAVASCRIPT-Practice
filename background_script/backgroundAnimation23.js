let section = document.querySelector('section');
for (let i = 1; i <= 4; i++) {
    let div = document.createElement('div');
    
	div.classList.add('loader');
	div.style.setProperty('--r', i);
    section.appendChild(div);
    
	for (let i = 1; i <= 20; i++) {
        let spans = document.createElement('span');
        
		spans.style.setProperty('--i', i);
		div.appendChild(spans);
	}
}