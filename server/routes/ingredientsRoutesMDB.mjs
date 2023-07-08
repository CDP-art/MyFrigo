import {
    insertIngredient,
    findIngredients,
    findIngredientByName,
    deleteIngredient,
}
    from "../src/mongodb.mjs"

import fs from "fs"

const DB_INGREDIENTS_PATH = "./db/ingredientsList.json"


//aggiunta ingredienti
const addIngredients = async (req, res) => {
    let ingredients = req.body
    await insertIngredient(ingredients)
    res
        .status(201)
        .send(`Ingrediente aggiunto!`)
        .end()
}

//vedere tutti gli ingredienti
const getIngredients = async (req, res) => {
    res.send(await findIngredients())
}

//vedete lista ingredienti
async function getGeneralIngredients(req, res) {
    try {
        const data = fs.readFileSync(DB_INGREDIENTS_PATH)
        const ingredienti = JSON.parse(data)
        res.status(200).json(ingredienti)
    } catch (err) {
        console.log(err)
        res.status(500)
    }
}

//vedere singolo ingrediente per nome
const getIngredientName = async (req, res) => {
    try {
        const name = req.params.name
        const ingredient = await findIngredientByName(name)
        console.table(ingredient);

        if (ingredient) {
            res.send(ingredient)
        } else {
            res.status(400).send("Ingrediente non trovato")
            return
        }

    } catch (err) {
        console.log(err);
        res.status(500).send("Errore del server")
    }
}

//cancellazione ingrediente
const removeIngredient = async (req, res) => {
    const name = req.params.name;
    await deleteIngredient(name);
    res
        .status(201)
        .send("Ingrediente cancellato")
        .end();
}


export {
    addIngredients,
    getIngredients,
    getGeneralIngredients,
    removeIngredient,
    getIngredientName
}
