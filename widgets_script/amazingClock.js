const hr = document.getElementById('hr');
const mn = document.getElementById('mn');
const sc = document.getElementById('sc');

setInterval(() => {
  const day = new Date();
  const hh = day.getHours() * 30;
  const mm = day.getMinutes() * 6;
  const ss = day.getSeconds() * 6;

  hr.style.transform = `rotateZ(${hh + mm / 12}deg)`;
  mn.style.transform = `rotateZ(${mm}deg)`;
  sc.style.transform = `rotateZ(${ss}deg)`;

  const hours = document.getElementById('hours');
  const minutes = document.getElementById('minutes');
  const seconds = document.getElementById('seconds');
  const ampm = document.getElementById('ampm');

  const h = new Date().getHours();
  const m = new Date().getMinutes();
  const s = new Date().getSeconds();

  hours.innerHTML = h < 10 ? '0' + h : h;
  minutes.innerHTML = m < 10 ? '0' + m : m;
  seconds.innerHTML = s < 10 ? '0' + s : s;
  ampm.innerHTML = h >= 12 ? 'PM' : 'AM';

  if (h > 12) {
    hours.innerHTML = h - 12 < 10 ? '0' + (h - 12) : h - 12;
  } else if (h === 0) {
    hours.innerHTML = '12';
  }
});

function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');

  if (yearElement) {
    yearElement.setAttribute('datetime', currentYear.toString());
    yearElement.dateTime = currentYear;
    yearElement.textContent = currentYear.toString();
  }
}

window.addEventListener('load', updateYear);