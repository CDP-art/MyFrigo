import React from "react";
import { useState, useEffect } from "react";
import axios from "axios"

export default function Favorites() {

    const [favoriteRecipes, setFavoriteRecipes] = useState([])

    async function getFavoriteRecipes() {
        try {
            const res = await axios.get("http://localhost:8000/favoriteRecipes");
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
                <ul>
                    {favoriteRecipes.map((recipe, i) => (
                        <div>
                            <li key={i}>{recipe}</li>
                            <button onClick={removeFavoriteRecipe}>Cancella</button>
                        </div>
                    ))}
                </ul>
            )}
        </>
    )
}