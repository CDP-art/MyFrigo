import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../css/userIngredientsList.css"


export default function UserIngredientsList() {
    const [ingredients, setIngredients] = useState([]);

    //Prima chiamata per visualizzare la ingredientsList
    const getIngredients = async () => {
        try {
            const res = await axios.get("http://localhost:8000/ingredients");
            setIngredients(res.data);
        } catch (err) {
            console.log(err);
        }
    };


    //ho dichiarato esternamente la funzione getIngredients perchè
    //altrimenti non riuscivo a leggerla nella funzione successiva.
    //Quindi, solo successivamete, ho integrato la funzione dentro allo useEffect
    useEffect(() => {
        getIngredients();
    }, []);

    console.log(ingredients);

    const removeIngredient = async (name) => {
        try {
            //Cancellazione dell'ingrediente dal db sotto parametro "name"
            await axios.delete(`http://localhost:8000/ingredients/${name}`);
            getIngredients(); //Richiamo la lista per ritornarla aggiornata senza ingrediente
            console.log("Ingrediente rimosso");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <h3>Ecco la lista degli ingredienti che ho nel mio Frigo</h3>
            {ingredients.length === 0 ? (<p>La tua lista è vuota</p>) : (
                <div className="listItems">
                    <ul>
                        {ingredients.map((ingredient, i) => (
                            <li key={i}>
                                {ingredient.name.toUpperCase()}
                                <button onClick={() => removeIngredient(ingredient.name)}>
                                    Rimuovi
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>)}
        </>
    );
}