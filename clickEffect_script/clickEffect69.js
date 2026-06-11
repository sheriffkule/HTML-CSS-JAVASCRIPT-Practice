document.addEventListener('DOMContentLoaded', () => {
  const months = [
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

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 60 }, (_, i) => i);
  const ampm = ['AM', 'PM'];

  const scrollables = {
    month: months,
    day: days,
    year: years,
    hour: hours,
    minute: minutes,
    ampm,
  };

  const selections = {};

  const updateSelectedDateTime = () => {
    const { month, day, year, hour, minute, ampm } = selections;
    const formattedMinute = minute === undefined || minute === '' ? '--' : String(minute).padStart(2, '0');
    const selectedDateTime = `${month || '--'} ${day || '--'}, ${year || '--'} ${hour || '--'}:${formattedMinute} ${ampm || '--'}`;
    const selectedDateTimeOutput = document.getElementById('selectedDateTime');

    if (selectedDateTimeOutput) {
      selectedDateTimeOutput.textContent = selectedDateTime;
    }
  };

  for (const [id, values] of Object.entries(scrollables)) {
    const scrollable = document.getElementById(id);
    const content = scrollable?.querySelector('.scrollable-content');

    if (!scrollable || !content) {
      continue;
    }

    values.forEach((value) => {
      const div = document.createElement('div');
      div.textContent = value;

      div.addEventListener('click', () => {
        content.querySelectorAll('div').forEach((d) => d.classList.remove('selected'));
        div.classList.add('selected');
        selections[id] = value;
        updateSelectedDateTime();
      });

      content.appendChild(div);
    });
  }

  updateSelectedDateTime();
});
