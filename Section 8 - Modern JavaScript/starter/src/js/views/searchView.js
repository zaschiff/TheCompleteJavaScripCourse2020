import {elements} from './base'

export const clearInput = () => {
    // clears the input field for the search term
    elements.searchInput.value='';
};

export const clearResult = () => {
    // clears the list of results from a search and removes the page buttons
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML='';
};

export const getInput = () => elements.searchInput.value; // gets the search term to query for

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    // loops through the array passed and renders the result using a private function
    recipes.slice(start, end).forEach(renderRecipe);

    // render the page buttons
    renderButtons(page, recipes.length, resPerPage);
};

const createButton = (page, type) => // creates the button element for the page
    `
        <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1: page + 1}>
            <span>Page ${type === 'prev' ? page - 1: page + 1}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
            </svg>
        </button>
`;

const limitRecipeTitle = (title, limit = 17) => {
    // place holder array for the new title length
    const newTitle = [];

    // adjust the title length to only be on one line in the list view
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            // configures the title to be no more than 17 characters
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            // console.log(acc, cur, newTitle);

            return acc + cur.length;
        }, 0);

        return  `${newTitle.join(' ')}...`;

    }

    return title; 
};

const renderRecipe = recipe => {
    // function that renders the result of a single element.
    // the element is stored in the markup variable as a single strinmg template
    // consisting of a single html code element

    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResList.insertAdjacentHTML("beforeend",markup);
};

const renderButtons = (page, numRes, resPerPage) => {
    // code to render the appropriate buttons based on the page number we are on
    const pages = Math.ceil(numRes / resPerPage);
    let button;

    if(page === 1 && pages > 1) {
        //button to go to next page
        button = createButton(page, 'next');
    } else if (page < pages) {
        // button to both
        button =`
            ${createButton(page, 'next')}
            ${createButton(page, 'prev')}
        ` 
    } else if (page === pages && pages > 1) {
        // only button to go to previous page
        button = createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};