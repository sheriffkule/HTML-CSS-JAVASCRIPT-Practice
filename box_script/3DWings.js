document.addEventListener('DOMContentLoaded', () => {
  const wingsContainer = document.getElementById('wingsContainer');

  for (let w = 0; w < 24; w++) {
    const wing = document.createElement('div');
    wing.className = 'wing';
    wing.style.setProperty('--w', w);

    let currentSection = wing;
    for (let i = 0; i < 6; i++) {
      const section = document.createElement('div');
      section.className = 'wing-section';
      section.style.setProperty('--i', i);
      currentSection.appendChild(section);
      currentSection = section;
    }
    wingsContainer.appendChild(wing);
  }
});
