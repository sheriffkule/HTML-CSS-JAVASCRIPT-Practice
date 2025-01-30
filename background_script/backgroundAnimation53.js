let c = document.getElementById('c');
let ctx = c.getContext('2d');

c.height = window.innerHeight;
c.width = window.innerWidth;

let matrix = 'QWERTYUIOASDFGHJKLZXCVBNMc!@#$%^&*()1234567890';

matrix = matrix.split('');
let font_size = 14;
let columns = c.width / font_size;
let drops = [];

for(let x = 0; x < columns; x++)
    drops[x] = 50;

function draw() {
    ctx.fillStyle = 'rgba(0,0,0,0.08)';

    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = '#0f0';
    ctx.font = font_size + 'px arial';

    for(let i = 0; i < drops.length; i++) {
        let text = matrix[Math.floor(Math.random() * matrix.length)];
        
        ctx.fillText(text, i * font_size, drops[i] * font_size);

        if(drops[i] * font_size > c.height && Math.random() > 0.975)
            drops[i] = 0;
        drops[i]++
    }
}

setInterval(draw, 150);