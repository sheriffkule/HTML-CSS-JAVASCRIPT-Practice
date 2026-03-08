// Disable Right click
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  showWarningPopup();
});

// Disable copy-paste
document.addEventListener('copy', (e) => {
  e.preventDefault();
  showWarningPopup();
});

document.addEventListener('cut', (e) => {
  e.preventDefault();
  showWarningPopup();
});

// Disable Text selection (optional)
document.addEventListener('selectstart', (e) => {
  e.preventDefault();
});

// Show warning popup
function showWarningPopup() {
  const popup = document.getElementById('warningPopup');
  popup.style.display = 'flex';

  // Close popup after 3 seconds
  setTimeout(() => {
    popup.style.display = 'none';
  }, 3000);
}

// Close popup when close button is clicked
document.querySelector('.close-btn').addEventListener('click', () => {
  document.getElementById('warningPopup').style.display = 'none';
});
