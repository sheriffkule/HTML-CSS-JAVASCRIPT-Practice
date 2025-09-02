let txtEl = document.querySelector('.txt');
let wrdEl = document.querySelector('.wrd');
let charEl = document.querySelector('.char');

function counter() {
  let txtVal = txtEl.value;

  txtVal = txtVal.trim();
  charEl.textContent = txtVal.length;

  let words = txtVal.split(' ');

  const filterText = words.filter(function (e) {
    return e != '';
  });

  wrdEl.textContent = words.length;
}

document.addEventListener('input', counter);
document.getElementById('year').textContent = new Date().getFullYear();
