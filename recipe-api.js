const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Where we will keep recipes
let recipes = [];

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/recipe', (req, res) => {
    const recipe = req.body;

    // Output the recipe to the console for debugging
    console.log(recipe);
    recipes.push(recipe);

    res.send('Recipe is added to the database');
});

app.get('/recipes', (req, res) => {
    res.json(recipes);
});

app.get('/recipe/:name', (req, res) => {
    // Reading name from the url
    const name = req.params.name;

    // Searching  recipes for the name
    for (let recipe of recipes) {
        if (recipe.name === name) {
            res.json(recipe);
            return;
        }
    }

    // Sending 404 when not found something is a good practice
    res.status(404).send('Recipe not found');
})

app.delete('/recipe/:name', (req, res) => {
    // Reading name from the url
    const name = req.params.name;

    // Remove item from the recipes array
    recipes = recipes.filter(i => {
        return (i.name != name);
    });
    console.log("Test for deletion");
    console.log(recipes);
    res.send('Recipe is deleted');
})

app.post('/recipe/:name', (req, res) => {
    // Reading name from the url
    const name = req.params.name;
    const newRecipe = req.body;

    // Remove item from the recipes array
    for (let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i]
        if(recipe.name === name) {
            recipes[i] = newRecipe;
        }
    }

    res.send('Recipe is edited');
});

app.listen(port, () => console.log(`Pizza Recipe app listening on port ${port}!`));
