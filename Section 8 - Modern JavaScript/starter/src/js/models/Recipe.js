import axios from 'axios';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        // pulls the recipe data from the api call
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`)
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
            // console.log(res.data);
        } catch (error) {
            console.log(error);
            alert('Something went wrong :(');
        }
    }

    calcTime() {
        // calculates the cooking time
        // asusming we need 15 minutes per 3 ingredients
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        // number of servings, no calulations here as not part of the course. 
        // Preset to 4 for all recipes
        this.servings = 4;
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'teaspoons', 'teaspoon', 'ounces', 'ounce','cups', 'cup', 'pounds', 'pound'];
        const unitsShort = ['tbsp', 'tbsp', 'tsp', 'tsp', 'oz', 'oz', 'cup', 'cup', 'lbs', 'lbs'];
        const units = [...unitsShort, 'kg', 'g']
        
        const newIngr = this.ingredients.map(el => {
            // 1. Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });
            
            // 2. Remove parentheses using Regex
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');


            // 3. Parse ingredients into count, unit, and ingredients.
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(e => units.includes(e));
            let objIng;

            if(unitIndex > -1) {
                // there is a unit
                const arrCount = arrIng.slice(0, unitIndex);
                
                let count;
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }


                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex+1).join(' ')
                }

            } else if (parseInt(arrIng[0], 10)) {
                // there is no unit, but 1st element is a number 
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            } else if (unitIndex === -1) {
                // there is no unit
                objIng = {
                    count: 1, 
                    unit: '',
                    ingredient
                }
            }


            return objIng;
        });
        
        this.ingredients = newIngr;
    }
}