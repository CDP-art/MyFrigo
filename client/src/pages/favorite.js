import React from "react";
import { useState, useEffect } from "react";
import axios from "axios"

export default function Favorites() {

    const [favoriteRecipes, setFavoriteRecipes] = useState([])

    async function getFavoriteRecipes() {
        try {
            const res = await axios.get("http://localhost:8000/favoriteRecipes");
            console.log(res.data)
            setFavoriteRecipes(res.data);
        } catch (err) {
            console.log(err.message);
        }
    };


    useEffect(() => {
        getFavoriteRecipes()
    }, [])


    async function removeFavoriteRecipe(id) {
        try {
            await axios.delete(`http://localhost:8000/favoriteRecipes/${id}`)
            getFavoriteRecipes()
            console.log("Ricetta rimossa")
        } catch (err) {
            console.log(err);
            console.log("Spiacenti. Ricetta non rimossa");
        }
    }

    return (
        <>
            {favoriteRecipes.length === 0 ? (<h2>Non hai aggiunto ancora nessuna ricetta</h2>) : (
                <ol>
                    {favoriteRecipes.map((recipe) => (
                        <div>
                            <li key={recipe.id}>{recipe.message}</li>
                            <button onClick={removeFavoriteRecipe}>Cancella</button>
                        </div>
                    ))}
                </ol>
            )}
        </>
    )
}