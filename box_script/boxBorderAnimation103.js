const showSocial = (btnId, socialId) => {
  const btn = document.getElementById(btnId);
  const social = document.getElementById(socialId);

  btn.addEventListener('click', () => {
    social.classList.toggle('show-social');
    btn.classList.toggle('show-icon');
  });
};

showSocial('profile-btn', 'profile-social');
