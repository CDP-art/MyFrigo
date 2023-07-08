import React from "react";
import { useState, useEffect, } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import "dotenv/config";
import "../css/userIngredientsList.css"
import "../css/chatButton.css"

export default function PersonalList() {

    const MySwal = withReactContent(Swal)

    const [ingredients, setIngredients] = useState([]);
    const [userIngredients, setUserIngredients] = useState([])
    let [ingredientsNames, setIngredientsName] = useState("")
    const [recipe, setRecipe] = useState("")

    async function getIngredients() {
        try {
            const res = await axios.get("http://localhost:8000/ingredients");
            setIngredients(res.data);
        } catch (err) {
            console.log(err.message);

        }
    };

    async function getUserIngredients() {
        try {
            const res = await axios.get("http://localhost:8000/ingredients/user");
            setUserIngredients(res.data)
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        getUserIngredients()
    }, [userIngredients])
    useEffect(() => {
        getIngredients();
    }, []);


    function checkList() {
        if (!ingredients || ingredients.length === 0) {
            return [];
        }
        const singleNames = [...new Set(ingredients.map(obj => obj.name))]

        singleNames.sort();

        const newList = singleNames.map(name => {
            return ingredients.find(obj => obj.name === name);
        });
        return newList
    }
    const newList = checkList()


    async function addIngredient(name) {
        const res = await axios.get("http://localhost:8000/ingredients/user");
        const ingredientsList = res.data

        if (ingredientsList.length >= 6) {
            MySwal.fire({
                icon: 'warning',
                title: 'Attenzione',
                text: 'Hai raggiunto il limite massimo degli elementi. Accedi o registrati per aggiungere altri elementi',
                confirmButtonText: 'OK'
            });
            return;
        }

        const presentElement = ingredientsList.find(
            (ingredient) => ingredient.name === name
        );

        if (presentElement) {
            MySwal.fire({
                icon: "warning",
                title: "Attenzione!",
                text: "Questo ingrediente è già stato aggiunto",
                confirmButtonText: "OK"
            })
            return;
        }

        try {
            await axios.post("http://localhost:8000/ingredients/user", { name });
            console.log("Ingrediente aggiunto");
            getIngredients()
            console.log(ingredientsList);
        } catch (err) {
            console.log(err.message);
        }
    }

    async function removeIngredient(name) {
        try {
            await axios.delete(`http://localhost:8000/ingredients/user/${name}`);
            getIngredients();
            console.log("Ingrediente rimosso");
            Swal.fire({
                position: 'center',
                icon: "error",
                title: "Ingrediente rimosso",
                showConfirmButton: false,
                timer: 900
            })
        } catch (err) {
            console.log(err);
        }
    };

    async function ricetta() {

        if (userIngredients.length <= 2) {
            Swal.fire({
                icon: "info",
                title: "Devi aggiungere almeno 2 ingredienti!",
                confirmButtonText: "OK"
            })
            return;
        }

        try {
            const ingredientsNamesArray = userIngredients.map(obj => obj.name);
            ingredientsNames = ingredientsNamesArray.join(", ")
            setIngredientsName(ingredientsNames)

            const res = await axios.post("http://localhost:8000/chat", {
                message: `creami una ricetta solo ed esclusivamente con ${ingredientsNames}.`
            });
            const reply = res.data.reply;
            console.log(reply);
            console.log("DOPO" + ingredientsNames)
            setRecipe(reply)
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className="container">
            <h1>MyFrigo</h1>
            <h3>Aggiungi nel tuo fringo gli ingredienti che più ti piacciono per creare una ricetta...artificiale!</h3>
            <div className="listItems">
                {newList.length === 0 ? (
                    <>
                        <h1>IL SERVER E' ATTUALMENTE OFFLINE</h1>
                        <h1>RIPROVA PIU' TARDI PER VEDERE LA LISTA AGGIORNATA DEGLI INGREDIENTI</h1>
                    </>
                ) : (
                    <ul>
                        {newList.map((ingrediente, i) => (

                            <li key={i}>
                                <div className="images">
                                    <img alt="" src={ingrediente.image} />
                                </div>
                                <span>{ingrediente.name.toUpperCase()}</span>
                                <button onClick={() => addIngredient(ingrediente.name)}
                                >Aggiungi</button></li>
                        ))}
                    </ul>
                )}

            </div>
            <h3>Ecco la lista degli ingredienti che ho nel mio Frigo</h3>
            <div className="userList">
                {userIngredients.length === 0 ? (<h3>La tua lista è vuota</h3>) : (
                    <ul>
                        {userIngredients.map((ingredient, i) => (
                            <li key={i}>
                                <span>{ingredient.name.toUpperCase()}</span>
                                <button onClick={() => removeIngredient(ingredient.name)}>
                                    Rimuovi
                                </button>
                            </li>
                        ))}
                    </ul>)}
            </div>
            <footer>
                <p><b>Clicca il bottone qui in basso per creare una ricetta con gli ingredienti selezionati!</b></p>
                <button onClick={ricetta} id="chatButton">Crea la ricetta</button>
                <div className="rispostaChat">
                    {!recipe ? (<div>
                        <span><b>Sono in attesa degli ingredienti che mi proponi</b></span>
                    </div>) : (
                        <div className="ricetta">
                            <span><p>{recipe}</p></span>
                            <button>Salva la ricetta nei Preferiti</button>
                            <button>Reset</button>
                        </div>
                    )}
                </div>
            </footer>
        </div>
    );
}