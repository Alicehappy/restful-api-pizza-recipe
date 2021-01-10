// Hold the logic to updating/deleting recipes and displaying them on the page
const setEditModal = (recipename) => {
    // Get information about the recipe using name
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", `http://localhost:3000/recipe/${recipename}`, false);
    xhttp.send();

    const recipe = JSON.parse(xhttp.responseText);

    const {
        name,
        instructions,
        ingredients
    } = recipe;

    // Filling information about the recipe in the form inside the modal
    document.getElementById('name').value = name;
    document.getElementById('instructions').value = instructions;
    document.getElementById('ingredients').value = ingredients;

    // Setting up the action url for the recipe
    document.getElementById('editForm').action = `http://localhost:3000/recipe/${recipename}`;
}

const deleteRecipe = (name) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open('DELETE', `http://localhost:3000/recipe/${name}`, false);
    xhttp.send();

    // Reloading the page
    location.reload();
}

const loadRecipes = () => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "http://localhost:3000/recipes", false);
    xhttp.send();

    const recipes = JSON.parse(xhttp.responseText);

    for (let recipe of recipes) {
        const x = `
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${recipe.name}</h5>

                        <div>Instructions: ${recipe.instructions}</div>
                        <div>Ingredients: ${recipe.ingredients}</div>

                        <hr>

                        <button type="button" class="btn btn-danger" onClick="deleteRecipe('${recipe.name}')">Delete</button>
                        <button types="button" class="btn btn-primary" data-toggle="modal"
                            data-target="#editRecipeModal" onClick="setEditModal('${recipe.name}')">
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        `

        document.getElementById('recipes').innerHTML = document.getElementById('recipes').innerHTML + x;
    }
}

loadRecipes();