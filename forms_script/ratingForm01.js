document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const themeToggle = document.getElementById('themeToggle');
  const stars = document.querySelectorAll('.star');
  const ratingText = document.getElementById('ratingText');
  const emojis = document.querySelectorAll('.emoji');
  const feedbackText = document.getElementById('feedbackText');
  const chartCount = document.getElementById('charCount');
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
    const count = this.value.length;
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
        feedback: feedbackText.value,
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

  // Helper functions
  function updateStars(rating) {
    stars.forEach((star) => {
      const starRating = parseInt(star.getAttribute('data-rating'));
      if (starRating <= rating) {
        star.classList.add('active');
        star.classList.remove('far');
        star.classList.add('fas');
      } else {
        star.classList.remove('active');
        star.classList.add('far');
        star.classList.remove('fas');
      }
    });

    // Update rating text
    const ratingLabels = ['Select a rating', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
    ratingText.textContent = ratingLabels[rating];
  }

  function highlightStars(rating) {
    stars.forEach((star) => {
      const starRating = parseInt(star.getAttribute('data-rating'));
      starRating <= rating ? star.classList.add('active') : star.classList.remove('active');
    });
  }

  function resetStars() {
    stars.forEach((star) => {
      star.classList.remove('active');
      star.classList.remove('fas');
      star.classList.add('far');
    });
    ratingText.textContent = 'Select a rating';
  }

  function updateEmojis(rating) {
    emojis.forEach((emoji) => {
      const emojiRating = parseInt(emoji.getAttribute('data-emoji'));
      emojiRating === rating ? emoji.classList.add('active') : emoji.classList.remove('active');
    });
  }

  function updateSubmitButton() {
    currentRating > 0 || currentEmoji > 0 ? (submitBtn.disabled = false) : (submitBtn.disabled = true);
  }

  function resetForm() {
    currentRating = 0;
    currentEmoji = 0;
    resetStars();
    emojis.forEach((emoji) => emoji.classList.remove('active'));
    feedbackText.value = '';
    chartCount.textContent = '0';
    submitBtn.disabled = true;
  }

  function updateStatistics() {
    if (ratings.length === 0) return;

    // Calculate average rating
    const totalStars = ratings.reduce((sum, rating) => sum + rating.stars, 0);
    const avgRating = (totalStars / ratings.length).toFixed(1);
    averageRating.textContent = avgRating;

    // Calculate 5-star percentage
    const fiveStarCount = ratings.filter((rating) => rating.stars === 5).length;
    const fiveStarPercentage = Math.round((fiveStarCount / ratings.length) * 100);
    fiveStar.textContent = `${fiveStarPercentage}%`;

    // Calculate response rate (percentage with feedback)
    const withFeedback = ratings.filter((rating) => rating.feedback.trim().length > 0).length;
    const responsePercentage = Math.round((withFeedback / ratings.length) * 100);
    responseRate.textContent = `${responsePercentage}%`;

    // Update total ratings
    totalRatings.textContent = `${ratings.length} ${ratings.length === 1 ? 'rating' : 'ratings'}`;
  }

  // Initialize with some sample ratings for demo purposes
  ratings = [
    { stars: 5, emoji: 5, feedback: 'Great service! Very satisfied.', timestamp: '2026-01-15T10:30:00Z' },
    { stars: 4, emoji: 4, feedback: 'Good experience overall.', timestamp: '2026-01-16T14:45:00Z' },
    { stars: 5, emoji: 5, feedback: '', timestamp: '2026-01-17T09:15:00Z' },
    { stars: 3, emoji: 3, feedback: 'It was okay, but could be better.', timestamp: '2026-01-18T16:20:00Z' },
  ];

  updateStatistics();
});
