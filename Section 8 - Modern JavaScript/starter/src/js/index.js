// Global app controller
import Search from './models/Search';

/*
* - Search object
* - current recipe object
* - Shopping list object
* - Liked Recipes
*/

const state = {};

const controlSearch = () => {
    // 1. Get the query from the view
    // TODO
    const query = 'pizza';

    // 2. create a new search object
    if (query) {
        // new search object
        state.search = new Search(query);

        // 3. Prepare the UI

        // 4. search for recipes
        state.search.getResults();
    }
}

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

search.getResults();