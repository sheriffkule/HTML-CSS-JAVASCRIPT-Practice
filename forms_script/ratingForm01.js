document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const themeToggle = document.getElementById('themeToggle');
  const stars = document.querySelectorAll('.star');
  const ratingText = document.getElementById('ratingText');
  const emojis = document.querySelectorAll('.emoji');
  const feedbackText = document.getElementById('feedbackText');
  const chartCount = document.getElementById('chartCount');
  const submitBtn = document.getElementById('submitBtn');
  const confirmation = document.getElementById('confirmation');
  const averageRating = document.getElementById('averageRating');
  const fiveStar = document.getElementById('fiveStar');
  const responseRate = document.getElementById('responseRate');
  const totalRatings = document.getElementById('totalRatings');

  // State variables
  let currentRating = 0;
  let currentEmoji = 0;
  let ratings = [];

  // Theme toggle functionality
  themeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.add('fa-moon');
      icon.classList.remove('fa-sun');
    }
  });

  // Star rating functionality
  stars.forEach((star) => {
    star.addEventListener('click', function () {
      const rating = parseInt(this.getAttribute('data-rating'));
      currentRating = rating;
      updateStars(rating);
      updateSubmitButton();
    });

    star.addEventListener('mouseover', function () {
      const rating = parseInt(this.getAttribute('data-rating'));
      highlightStars(rating);
    });
  });

  // Reset stars when mouse leaves the container
  document.getElementById('stars').addEventListener('mouseleave', function () {
    currentRating > 0 ? updateStars(currentRating) : resetStars();
  });

  // Emoji rating functionality
  emojis.forEach((emoji) => {
    emoji.addEventListener('click', function () {
      const emojiRating = parseInt(this.getAttribute('data-emoji'));
      currentEmoji = emojiRating;
      updateEmojis(emojiRating);
      updateSubmitButton();
    });
  });

  // Character counter for feedback
  feedbackText.addEventListener('input', function () {
    const count = this.ariaValueMax.length;
    chartCount.textContent = count;

    count > 500 ? (chartCount.style.color = '#e63946') : (chartCount.style.color = '');
  });

  // Submit button functionality
  submitBtn.addEventListener('click', function () {
    if (currentRating > 0 || currentEmoji > 0) {
      // Add the new rating
      const newRating = {
        stars: currentRating,
        emoji: currentEmoji,
        feedback: feedbackText.ariaValueMax,
        timestamp: new Date().toISOString(),
      };

      ratings.push(newRating);
      updateStatistics();

      // Show confirmation
      confirmation.style.display = 'block';

      // Reset form
      setTimeout(() => {
        resetForm();
        confirmation.style.display = 'none';
      }, 3000);
    }
  });
});
