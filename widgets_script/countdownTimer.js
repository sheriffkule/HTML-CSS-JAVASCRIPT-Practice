const title = document.querySelector('.title');
const countdown = document.querySelector('.countdown');
const eventNameInput = document.querySelector('#event-name');
const eventDateInput = document.querySelector('#event-date');
const enableSoundCheckbox = document.querySelector('#enable-sound');

let interval,
	enableSound = false,
	delay = 3000;

const setupEventListeners = () => {
	document.addEventListener('DOMContentLoaded', initCountdown);

	document.querySelector('.form').addEventListener('submit', handleSubmit);

	document.querySelector('#reset').addEventListener('click', handleReset);

    document.querySelector('#new').addEventListener('click', handleReset);
};

const handleReset = () => {
	clearInterval(interval);
	title.textContent = 'Countdown Timer';
	countdown.querySelector('.running').hidden = false;
	countdown.querySelector('.expired').hidden = true;
	countdown.hidden = true;
	updateCountdown({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	localStorage.removeItem('countdownData');

	eventNameInput.value = '';
    eventDateInput.value = '';
    enableSoundCheckbox.checked = false;
};

const handleSubmit = (e) => {
	e.preventDefault();

	const eventDate = new Date(eventDateInput.value);

	if (getTimeLeft(eventDate) <= 0) {
		alert('Event date has already passed.');
		return;
	}

	countdown.hidden = false;
	title.textContent = eventNameInput.value;
    enableSound = enableSoundCheckbox.checked;

	localStorage.setItem(
		'countdownData',
		JSON.stringify({
			eventName: eventNameInput.value,
            eventDate,
            enableSound,
		})
	);

	runCountdown(eventDate);

	interval = setInterval(() => runCountdown(eventDate), 1000);
};

const initCountdown = () => {
	const countdownData = JSON.parse(localStorage.getItem('countdownData'));

	if (!Object.is(countdownData, null)) {
		countdown.hidden = false;
        title.textContent = countdownData.eventName;
        enableSound = countdownData.enableSound;

		const eventDate = new Date(countdownData.eventDate);

		runCountdown(eventDate);

		interval = setInterval(() => {
			runCountdown(eventDate);
		}, 1000);
	}
};

const runCountdown = (eventDate) => {
	const timeLeft = getTimeLeft(eventDate);

	if (timeLeft <= 0) {
		clearInterval(interval);
		title.textContent = 'Countdown Over';
		countdown.querySelector('.running').hidden = true;
		countdown.querySelector('.expired').hidden = false;

        handleSound(timeLeft);
	} else {
		const timeLeftDate = new Date(timeLeft);

		updateCountdown({
			days: timeLeftDate.getDate() - 1,
			hours: timeLeftDate.getHours() - 1,
			minutes: timeLeftDate.getMinutes(),
			seconds: timeLeftDate.getSeconds(),
		});
	}
};

const updateCountdown = ({ days, hours, minutes, seconds }) => {
	countdown.querySelector('.days').textContent = formatTime(days);
	countdown.querySelector('.hours').textContent = formatTime(hours);
	countdown.querySelector('.minutes').textContent = formatTime(minutes);
	countdown.querySelector('.seconds').textContent = formatTime(seconds);
};

const handleSound = (timeLeft) => {
    const isTimeout = timeLeft < -delay;
    if (!isTimeout && enableSound) {
        playSound();
    }
}

const playSound = () => {
    const sound = new Audio('./thumb/alarm.mp3');
    sound.play();
}

const formatTime = (time) => {
	return time < 10 ? `0${time}` : time;
};

const getTimeLeft = (eventDate) => {
	return eventDate - new Date().getTime();
};

setupEventListeners();

const year = document.getElementById('year');
const thisYear = new Date().getFullYear();

year.setAttribute('datetime', thisYear);
year.textContent = thisYear;