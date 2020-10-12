// Global app controller
import Recipe from './models/Recipe';
import * as recipeView from './views/recipeView';
import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements, renderLoader, clearLoader} from './views/base';

/*
* - Search object
* - current recipe object
* - Shopping list object
* - Liked Recipes
*/

// state object to hold the currently in-use data.
const state = {};


// RECIPE CONTROLLLER.
const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');

    if (id) {
        // prepare the ui for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // create the new recipe object
        state.recipe = new Recipe(id);

        try {
            // get the recipe data
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // calculate serving and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // render the recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        } catch (err) {
            console.log(err);
            alert('Error processing recipe!');
        }
    }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


// SEARCH CONTROLLER. Runs all code pertaining to starting a search,
//  retrieving, and displaying the results. 
const controlSearch = async () => {
    // 1. Get the query from the view
    // TODO
    const query = searchView.getInput();
    //console.log(query);

    // 2. create a new search object
    if (query) {
        // new search object
        state.search = new Search(query);

        // 3. Prepare the UI
        searchView.clearInput();
        searchView.clearResult();

        //render the load wheel
        renderLoader(elements.searchResult);

        try {
            // 4. search for recipes
            await state.search.getResults();

            // 5. Render results to the UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch(error) {
            alert('Something went wrong with the search...');
            clearLoader();
        }
    }
};

elements.searchForm.addEventListener('submit', e => {
    // activates the listener on the search form/button and runs the async function.
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    // create the listeners for the page buttons and get teh data from the page button
    //   for the next page
    const btn = e.target.closest('.btn-inline');

    //console.log(e.target.closest('.btn-inline'));
    if (btn) {
        // converts the page number from a String to an Int
        const goToPage = parseInt(btn.dataset.goto, 10);

        // clears the search results list window
        searchView.clearResult();

        // renders the next set of results for the next page
        searchView.renderResults(state.search.result, goToPage);
    }
});