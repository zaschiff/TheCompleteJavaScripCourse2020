export const elements = {
    // DOM elements needed to be manipulated
    recipe: document.querySelector('.recipe'),
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResult: document.querySelector('.results'),
    searchResList: document.querySelector('.results__list'),
    searchResPages: document.querySelector('.results__pages')
};

export const elementStrings = {
    // elements that need to be created but are not yet on the page at load
    loader: 'loader'
};

export const clearLoader = () => {
    // removes the loading icon
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if(loader) loader.parentElement.removeChild(loader);
};

export const renderLoader = parent => {
    // renders the loading icon
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};