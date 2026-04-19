document.addEventListener('DOMContentLoaded', function () {
  const searchBtn = document.getElementById('search-btn');
  const abbreviationInput = document.getElementById('abbreviation');
  const resultsDiv = document.getElementById('results');
  const loadingDiv = document.getElementById('loading');
  const errorDiv = document.getElementById('error');

  searchBtn.addEventListener('click', async () => {
    const abbreviation = abbreviationInput.value.trim();
    if (!abbreviation) {
      alert('Please enter an abbreviation');
      return;
    }

    // Clear previous results and errors
    resultsDiv.innerHTML = '';
    errorDiv.style.display = 'none';

    // Show loading spinner
    loadingDiv.style.display = 'block';

    try {
      // Fetch data from the new API
      const response = await fetch(
        `http://www.nactem.ac.uk/software/acromine/dictionary.py?sf=${abbreviation}`,
      );
      const data = await response.json();

      // Hide loading spinner
      loadingDiv.style.display = 'none';

      if (data.length > 0 && data[0].lfs) {
        // Get only the first 10 results
        const results = data[0].lfs.slice(0, 10);

        // Display results
        results.forEach((item) => {
          const resultItem = document.createElement('div');
          resultItem.className = 'result-item';
          resultItem.innerHTML = `<strong>${abbreviation}:</strong> ${item.lf}`;
          resultsDiv.appendChild(resultItem);
        });
      } else {
        // Show error if no results found
        errorDiv.textContent = 'No results found';
        errorDiv.style.display = 'block';
      }
    } catch (error) {
      // Handle API errors
      loadingDiv.style.display = 'none';
      errorDiv.textContent = 'An error occurred. Please try again later.';
      errorDiv.style.display = 'block';
      console.error('Error', error);
    }
  });
});
