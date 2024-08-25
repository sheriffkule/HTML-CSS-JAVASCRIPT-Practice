const toggleSearch = () => {
    const searchBar = document.getElementById('search-bar');
    const searchButton = document.getElementById('search-button');

    searchButton.addEventListener('click', () => {
        searchBar.classList.toggle('show-search');
    })
};

toggleSearch('search-bar', 'search-button');