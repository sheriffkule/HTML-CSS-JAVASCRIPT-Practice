const hapticSupportEl = document.getElementById('hapticSupport');
const statusMessageEl = document.getElementById('statusMessage');
const currentPatternEl = document.getElementById('currentPattern');

if (navigator.vibrate) {
  hapticSupportEl.textContent = 'Available ☑';
  hapticSupportEl.style.color = '#10b981';
} else {
  hapticSupportEl.textContent = 'Not Available ';
  hapticSupportEl.style.color = '#ef4444';
  showStatus('Haptics not supported on this device.');
}

document.getElementById('shortTap').addEventListener('click', function() {
  vibrate(50, 'short');
});
document.getElementById('doublePulse').addEventListener('click', function() {
  vibrate([100, 50, 100], 'double');
});
document.getElementById('longBuzz').addEventListener('click', function() {
  vibrate(200, 'long');
});

function vibrate(pattern, type) {
  document.body.classList.remove('vibrate', 'double-pulse', 'long-buzz');

  if (type === 'short') {
    document.body.classList.add('vibrate');
    currentPatternEl.textContent = '50ms vibration';
    showStatus('Short tap vibration triggered', 'success');
  } else if (type === 'double') {
    document.body.classList.add('double-pulse');
    currentPatternEl.textContent = '100ms, pause 50ms, 100ms';
    showStatus('Double pulse vibration triggered', 'success');
  } else if (type === 'long') {
    document.body.classList.add('long-buzz');
    currentPatternEl.textContent = '200ms long vibration';
    showStatus('Long buzz vibration triggered', 'success');
  }

  setTimeout(() => {
    document.body.classList.remove('vibrate', 'double-pulse', 'long-buzz');
  }, 800);

  if (navigator.vibrate) {
    navigator.vibrate(pattern);
  } else {
    simulateVibration(type);
  }
}

function simulateVibration(type) {
  const feedback = document.querySelector('.feedback');

  if (type === 'short') {
    feedback.style.opacity = '1';
    setTimeout(() => {
      feedback.style.opacity = '0.5';
    }, 100);
  } else if (type === 'double') {
    feedback.style.opacity = '1';
    setTimeout(() => {
      feedback.style.opacity = '0.3';
      setTimeout(() => {
        feedback.style.opacity = '1';
        setTimeout(() => {
          feedback.style.opacity = '0.5';
        }, 100);
      }, 100);
    }, 100);
  } else if (type === 'long') {
    feedback.style.opacity = '1';
    setTimeout(() => {
      feedback.style.opacity = '1';
    }, 300);
  }
}

function showStatus(message, type) {
  statusMessageEl.textContent = message;
  statusMessageEl.className = 'status ' + type + ' visible';

  setTimeout(() => {
    statusMessageEl.classList.remove('visible');
  }, 3000);
}

function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span')
    const diameter = Math.max(button.clientWidth, button.clientHeight)
    const radius = diameter / 2;

    circle.classList.add('button-effect')

    const ripple = button.querySelector('.button-effect');
    if (ripple) ripple.remove();

    button.appendChild(circle);
   circle.classList.add('button-effect')

        button.appendChild(circle)
}