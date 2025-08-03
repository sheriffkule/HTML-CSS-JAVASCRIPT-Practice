let allTypes = document.querySelectorAll('.container .time-options button');

let getType = (elem, type) => {
  for (x of allTypes) {
    x.classList.remove('active');
  }

  elem.classList.add('active');
  pomodoroType = type;
  resetTimer();
};

const timer_type_pomodoro = 'Pomodoro';
const timer_type_shortbreak = 'Shortbreak';
const timer_type_longbreak = 'Longbreak';
let pomodoroType = timer_type_pomodoro;
const pomodoroTimeInSec = 1500;

let resetTimer = () => {
    
}