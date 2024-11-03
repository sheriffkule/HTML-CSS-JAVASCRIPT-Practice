function clock() {
    let hour = document.getElementById('hour');
    let minute = document.getElementById('minute');
    let seconds = document.getElementById('seconds');
    let ampm = document.getElementById('ampm');

    let h = new Date().getHours();
    let m = new Date().getMinutes();
    let s = new Date().getSeconds();
    let am = h >= 12 ? 'PM' : 'AM';
    // let am = 'AM';

    if (h >= 12) {
        h = h - 12;
        let am = 'PM';
    }

    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    
    hour.innerHTML = h;
    minute.innerHTML = m;
    seconds.innerHTML = s;
    ampm.innerHTML = am;
}

let interval = setInterval(clock, 1000);

const year = document.getElementById('year');
const thisYear = new Date().getFullYear();
const thisMonth = new Date().getMonth() + 1;
const thisDay = new Date().getDate();

function getMonthName(monthNumber) {
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	return monthNames[monthNumber - 1];
}

year.setAttribute('datetime', thisYear);
year.textContent = `${getMonthName(thisMonth)} ${thisDay}, ${thisYear}.`;