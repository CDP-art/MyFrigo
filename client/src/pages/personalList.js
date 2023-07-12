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
    const [loading, setLoading] = useState("")
    const [error, setError] = useState("")
    const [id, setId] = useState(1)


    //Lista generale degli ingredienti
    async function getIngredients() {
        try {
            const res = await axios.get("http://localhost:8000/ingredients");
            setIngredients(res.data);
        } catch (err) {
            console.log(err.message);

        }
    };

    useEffect(() => {
        getIngredients();
    }, []);

    //Lista ingredienti aggiunti
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
    }, [])



    //Lista ordinata in ordine alfabetico
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


    //Aggiungi ingrediente
    async function addIngredient(name) {
        console.log("SONO QUI");
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
            getUserIngredients()
            console.log(ingredientsList);
        } catch (err) {
            console.log(err.message);
        }
    }


    //Rimuovi ingrediente
    async function removeIngredient(name) {
        try {
            await axios.delete(`http://localhost:8000/ingredients/user/${name}`);
            getUserIngredients();
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


    //Ricetta chatGPT
    async function ricetta() {

        if (userIngredients.length < 2) {
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
            setIngredientsName(ingredientsNames);
            setLoading("Sto creando...")

            const res = await axios.post("http://localhost:8000/chat", {
                message: `creami una ricetta solo ed esclusivamente con ${ingredientsNames}.`
            });
            const reply = res.data.reply;
            console.log(reply);
            console.log("DOPO" + ingredientsNames)
            setRecipe(reply)
            setLoading("")
        } catch (err) {
            console.log(err.message);
            setError("Ops, si è verificato un errore. Riprova più tardi")
            setLoading("")
        }
    }



    //Salva nei preferiti
    async function saveRecipe() {
        try {
            const res = await axios.get("http://localhost:8000/favoriteRecipes");
            const fRecipes = res.data;
            console.log(fRecipes);

            if (!recipe) {
                MySwal.fire({
                    icon: "warning",
                    text: "Non esiste ancora nessuna ricetta",
                    confirmButtonText: 'OK'
                });
                return;
            }

            let lastObjId;
            if (fRecipes.length === 0) {
                lastObjId = 1;
                console.log("L'ARRAY E' VUOTO!");
            } else {
                const lastObj = fRecipes[fRecipes.length - 1];
                lastObjId = lastObj.id + 1;
            }
            setId(lastObjId);
            await axios.post("http://localhost:8000/favoriteRecipes", {
                id: lastObjId,
                message: recipe
            });

            MySwal.fire({
                icon: "success",
                text: `Ricetta n. ${id} salvata nei Preferiti!`,
                confirmButtonText: 'OK'
            });

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="container">
            <main className="listItems">
                <h2>Aggiungi nel tuo fringo gli ingredienti che più ti piacciono per creare una ricetta...artificiale!</h2>
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
                                >Aggiungi</button>
                            </li>
                        ))}
                    </ul>
                )}

            </main>
            <div className="userList">
                <h2>Il mio frigo</h2>
                {userIngredients.length === 0 ? (
                    <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <h3>Il tuo frigo è vuoto</h3>
                    </div>
                ) : (
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
                <button onClick={ricetta} id="ricettaButton">Crea la ricetta</button>
                <div className="rispostaChat">
                    {!recipe && !loading && !error ? (
                        <></>
                    ) : loading ? (
                        <i>{loading}</i>
                    ) : recipe ? (
                        <>
                            <div className="ricetta">
                                <p style={{ whiteSpace: 'pre-line', overflow: "scroll" }}>{recipe}</p>
                            </div>
                            <div className="decisionButton">
                                <button onClick={saveRecipe}>Salva nei Preferiti</button>
                                <button onClick={(() => {
                                    if (recipe) {
                                        setRecipe("")
                                    }
                                })}>Reset</button>
                            </div>
                        </>
                    ) : (
                        <div>
                            <span><b>{error}</b></span>
                        </div>
                    )}
                </div>
            </footer>
        </div>
    );
}