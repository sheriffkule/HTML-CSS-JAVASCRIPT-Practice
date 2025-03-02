function calculateAge() {
  const birthdateInput = document.getElementById('birthdate');
  if (!birthdateInput.value) {
    document.getElementById('result').innerText = 'Please enter a birthdate.';
    return;
  }

  const birthDate = new Date(birthdateInput.value);
  if (isNaN(birthDate.getTime())) {
    document.getElementById('result').innerText =
      'Invalid birthdate format. Please use YYYY-MM-DD.';
    return;
  }

  const today = new Date();

  const ageInYears = today.getFullYear() - birthDate.getFullYear();
  const ageInMonths = today.getMonth() - birthDate.getMonth();

  if (today < birthDate) {
    alert('You are not even born yet!');
  }

  if (ageInMonths < 0) {
    const adjustedAgeInYears = ageInYears - 1;
    const adjustedAgeInMonths = 12 + ageInMonths;
    document.getElementById(
      'result'
    ).innerText = `You are ${adjustedAgeInYears} years and ${adjustedAgeInMonths} months old.`;
  } else if (ageInMonths === 0 && today.getDate() < birthDate.getDate()) {
    const adjustedAgeInYears = ageInYears - 1;
    const adjustedAgeInMonths = 11;
    document.getElementById(
      'result'
    ).innerText = `You are ${adjustedAgeInYears} years and ${adjustedAgeInMonths} months old.`;
  } else if (ageInMonths === 0 && today.getDate() >= birthDate.getDate()) {
    document.getElementById('result').innerText = `You are ${ageInYears} years old.`;
  } else {
    document.getElementById(
      'result'
    ).innerText = `You are ${ageInYears} years and ${ageInMonths} months old.`;
  }
}

function updateYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('year');
    yearElement.dateTime = currentYear;
    yearElement.textContent = currentYear;
  }
  
updateYear();