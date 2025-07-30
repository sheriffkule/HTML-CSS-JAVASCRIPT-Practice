let toggler = document.getElementById('switch');
let myCubes = document.getElementById('myCubes');
let switchCheck = document.getElementById('switchCheck');
let toggleShape = document.getElementById('toggleShape');

toggler.addEventListener('click', function (e) {
  toggler.classList.toggle('toggler');
});

switchCheck.addEventListener('click', function (e) {
  if (switchCheck.checked) {
    myCubes.classList.add('backfaceVisibility');
  } else {
    myCubes.classList.remove('backfaceVisibility');
  }
});

toggleShape.addEventListener('click', function () {
  myCubes.classList.toggle('toggleShape');
  if (myCubes.classList.contains('toggleShape')) {
    toggleShape.textContent = 'Switch to Cube';
  } else {
    toggleShape.textContent = 'Switch to Shape';
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
