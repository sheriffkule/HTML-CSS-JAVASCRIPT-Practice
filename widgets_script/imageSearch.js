const apiKey = 'rpHhi6l4VlMV1xYfm1R0Or9DnJHH1VAHDVB3dc7N2Hw7fKvgaNVEJk7j';

const searchForm = document.getElementById('search-form');
const searchResult = document.getElementById('result');

const setupListeners = () => {
    searchForm.addEventListener('submit', onSearchFormSubmit)
}

const onSearchFormSubmit = (e) => {
    e.preventDefault();

    const query = searchForm.query.value.trim();

    if(!query) {
        alert('Please enter a valid search term');
        return;
    }

    console.log(query);
}

setupListeners();