function submitTopic() {
  const topicInput = document.getElementById('topicInput');
  const topic = topicInput.value.trim();

  if (topic === '') {
    alert('Please enter a topic before proceeding');
    return;
  }

  document.getElementById('topicSection').style.display = 'none';
  document.getElementById('appContent').style.display = 'block';
  document.getElementById('topicTitle').textContent = topic;
}

document.getElementById('topicInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    submitTopic();
  }
});

function addItem(type) {
  const input = document.getElementById('itemInput');
  const text = input.value.trim();

  if (text === '') return;
  renderItem(text, type);
  input.value = '';
  updateScore();
}

function renderItem(text, type) {
  const li = document.createElement('li');
  li.textContent = text;
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.onclick = () => {
    li.remove();
    updateScore();
  };
  li.appendChild(deleteBtn);
  document.getElementById(`${type}List`).appendChild(li);
}

function updateScore() {
  const prosCount = document.getElementById('prosList').children.length;
  const consCount = document.getElementById('consList').children.length;
  const scoreboard = document.getElementById('scoreboard');
  let verdict = "Let's Decide";

  if (prosCount > consCount) verdict = 'Pros Win!';
  else if (consCount > prosCount) verdict = 'Cons Win!';
  else if (prosCount === consCount) verdict = "It's a Tie!";
  scoreboard.innerHTML = `Pros: ${prosCount} | Cons: ${consCount} <br> ${verdict}`;
}

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
