import { strict } from "assert"
import { log } from "console"
import fs from "fs"
import { stringify } from "querystring"


const DB_INGREDIENTS_PATH = "./db/ingredientsList.json"
const DB_USER_INGREDIENTS_PATH = "./db/userIngredientsList.json"
const DB_RECIPES_PATH = "./db/favoriteRecipes.json"


//Ingredienti 
async function getIngredients(req, res) {
    try {
        const data = fs.readFileSync(DB_INGREDIENTS_PATH)
        const ingredienti = JSON.parse(data)
        res.status(200).json(ingredienti)
    } catch (err) {
        console.log(err)
        res.status(500)
    }
}

//UTENTE

//Ingredienti dell'utente
async function getUserIngredients(req, res) {
    try {
        const data = fs.readFileSync(DB_USER_INGREDIENTS_PATH)
        const ingredienti = JSON.parse(data)
        res.status(200).json(ingredienti)
    } catch (err) {
        console.log(err)
        res.status(500)
    }
}
//Ingrediente per nome
async function getIngredientName(req, res) {
    const { name } = req.params
    try {
        const data = fs.readFileSync(DB_USER_INGREDIENTS_PATH)
        const ingredienti = JSON.parse(data)
        console.table(ingredienti)
        const ingredientName = ingredienti.find(el => el.name === name);
        if (ingredientName) {
            res.status(200).json({ error: "Ingrediente trovato" })
        } else {
            res.status(404).send("Ingrediente non trovato")
        }

    } catch (err) {
        console.log(err);
        res.status(500)
    }
}

//aggiunta ingrediente
async function addIngredients(req, res) {
    const { name } = req.body
    try {
        const data = fs.readFileSync(DB_USER_INGREDIENTS_PATH)
        const ingredienti = JSON.parse(data)

        if (ingredienti.length <= 6) {
            const newIngredients = { name }
            ingredienti.push(newIngredients)

            fs.writeFileSync(DB_USER_INGREDIENTS_PATH, JSON.stringify(ingredienti));
            res.json(newIngredients)
        } else {
            res
                .status(400)
                .send("Hai raggiunto il limite massimo di ingredienti. Accedi o registrati per continuare ad aggiungere ingredienti!")
        }
    } catch (err) {
        console.log(err);
    }

}


//Rimozione ingredienti
async function removeIngredient(req, res) {
    const { name } = req.params
    try {
        const data = fs.readFileSync(DB_USER_INGREDIENTS_PATH)
        let ingredients = JSON.parse(data)
        ingredients = ingredients.filter(ingrediente => ingrediente.name !== name)
        fs.writeFileSync(DB_USER_INGREDIENTS_PATH, JSON.stringify(ingredients));
        res.status(201).send("Ingrediente cancellato correttamente!")
    } catch (err) {
        console.log(err);
        res
            .status(500)
            .send("Ops! Si è verificato un errore. L'ingrediente NON è stato rimosso.")

    }
}

//preferiti
async function getFavorites(req, res) {
    try {
        const data = fs.readFileSync(DB_RECIPES_PATH, 'utf8');
        const recipes = JSON.parse(data);
        res.status(200).json(recipes);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
}


//aggiunta ai preferiti
async function addFavoriteRecipe(req, res) {
    const { name, id } = req.body;
    try {
        const data = fs.readFileSync(DB_RECIPES_PATH);
        const recipes = JSON.parse(data);
        const newRecipe = { name, id };
        recipes.push(newRecipe);
        fs.writeFileSync(DB_RECIPES_PATH, JSON.stringify(recipes));
        res.json(newRecipe);
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
}

//rimuovi preferiti
async function removeFavoriteRecipe(req, res) {
    const { id } = req.params
    try {
        const data = fs.readFileSync(DB_RECIPES_PATH)
        let recipes = JSON.parse(data)
        recipes = recipes.filter(ingrediente => ingrediente.id !== id)
        fs.writeFileSync(DB_RECIPES_PATH, JSON.stringify(recipes));
        res.status(201).send("Ingrediente cancellato correttamente!")
    } catch (err) {
        console.log(err);
        res
            .status(500)
            .send("Ops! Si è verificato un errore. La ricetta non è stata rimossa");
    }
}

export {
    getIngredients,
    getUserIngredients,
    getIngredientName,
    addIngredients,
    removeIngredient,
    getFavorites,
    addFavoriteRecipe,
    removeFavoriteRecipe
}