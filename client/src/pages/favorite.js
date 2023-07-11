import React from "react";
import { useState, useEffect } from "react";
import axios from "axios"
import "../css/favorite.css"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


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



    async function removeRecipe(id) {
        console.log(id);
        console.log(favoriteRecipes);
        const MySwal = withReactContent(Swal)
        try {
            await axios.delete(`http://localhost:8000/favoriteRecipes/${id}`);
            getFavoriteRecipes();
            console.log("Ingrediente rimosso");
            MySwal.fire({
                position: 'center',
                icon: "error",
                title: "Ingrediente rimosso",
                showConfirmButton: false,
                timer: 900
            })
        } catch (err) {
            console.log(err.message);
        }
    };


    return (
        <div id="favorites">
            {favoriteRecipes.length === 0 ? (<h2>Non hai aggiunto ancora nessuna ricetta</h2>) : (
                <ol>
                    {favoriteRecipes.map(recipe => (
                        <div key={recipe.id} className="fRecipes">
                            <li><i>Ricetta n. </i><b>{recipe.id}</b></li>
                            <li id="recipe">{recipe.message}</li>
                            <button type="button" onClick={removeRecipe.bind(null, recipe.id)}>Cancella</button>
                        </div>
                    ))}
                </ol>
            )}
        </div>
    )
}