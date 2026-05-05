document.addEventListener('DOMContentLoaded', function () {
  // Tab functionality
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const tabId = tab.getAttribute('data-tab');
      document.querySelectorAll('.tab-content').forEach((content) => {
        content.classList.remove('active');
      });
      document.getElementById(tabId).classList.add('active');
    });
  });

  // Toggle second Z-score input for between probability
  const probabilityType = document.getElementById('probabilityType');
  const secondZScoreGroup = document.getElementById('secondZScoreGroup');

  probabilityType.addEventListener('change', function () {
    this.value === 'between'
      ? (secondZScoreGroup.style.display = 'block')
      : (secondZScoreGroup.style.display = 'none');
  });

  // Example click handlers
  const exampleItems = document.querySelectorAll('.example-item');
  exampleItems.forEach((item) => {
    item.addEventListener('click', function () {
      const zScore = parseFloat(this.getAttribute('data-z'));

      // Set the value in all Z-score inputs
      document.getElementById('zScoreProb').value = zScore;
      document.getElementById('zScorePercentile').value = zScore;

      // Switch to probability tab and calculate
      document.querySelector('.tab[data-tab="probability"]').click();
      calculateProbabilityFromZ();
    });
  });

  // Dark mode toggle
  const darkModeToggle = document.getElementById('darkModeToggle');
  darkModeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    const icon = this.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  });
});
