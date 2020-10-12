import axios from 'axios';

export default class Search {
    // constructor for the Search class. This is the search controller
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        // async (bakcground function) the performs the search and errors if the search fails.
        // if the search is successful, an array of recipe objects is returned.
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
            this.result = res.data.recipes;
            //console.log(this.result);
        } catch (error) {
            alert(error);
        }    
    };
}