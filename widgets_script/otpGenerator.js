let generateOTP = () => {
  const otpLength = 6;

  const otp = Math.floor(Math.random() * Math.pow(10, otpLength));

  document.getElementById('otpDisplay').innerText = `${otp}`;
};

let btns = document.querySelectorAll('.btn');

btns.forEach((btn) => {
	btn.addEventListener('mousemove', (e) => {
		let rect = btn.getBoundingClientRect();
		let x = e.clientX - rect.left;
		let y = e.clientY - rect.top;
		let numParticles = 20;
	
		for(let i = 0; i < numParticles; i++) {
			createParticle(x, y, btn);
		}
	});
})

function createParticle(x, y, btn) {
    let particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    let angle = Math.random() * 2 * Math.PI;
    let distance = Math.random() * 80 + 20;
    let tx = Math.cos(angle) * distance;
    let ty = Math.sin(angle) * distance;

    particle.style.setProperty('--tx', tx + 'px');
    particle.style.setProperty('--ty', ty + 'px');

    btn.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 1000);
}

document.getElementById('generateBtn').addEventListener('click', generateOTP);

function copyCode() {
  const otpDisplay = document.getElementById('otpDisplay');
  const otp = otpDisplay.innerText;

  const tempTextarea = document.createElement('textarea');
  tempTextarea.value = otp;

  document.body.appendChild(tempTextarea);

  tempTextarea.select();
  tempTextarea.setSelectionRange(0, 999999);

  document.execCommand('copy');

  document.body.removeChild(tempTextarea);

  const copyButton = document.getElementById('copy-code');
  copyButton.innerText = 'Copied!';
  copyButton.style.background = 'green';
  setTimeout(() => {
    copyButton.innerText = 'Copy';
    copyButton.style.background = '';
  }, 2000);
}

function createBubble() {
  const bubbleWrapper = document.querySelector('.bubble_wrapper');
  const bubble = document.createElement('div');

  bubble.classList.add('bubble');

  const size = Math.random() * 80 + 10;
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;

  bubble.style.left = `${Math.random() * 100}vw`;
  bubble.style.animationDuration = `${Math.random() * 18 + 4}s`;

  bubbleWrapper.appendChild(bubble);

  setTimeout(() => {
    bubble.remove();
  }, 16000);
}

setInterval(createBubble, 400);
