import React from "react";
import "../css/home.css"
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="container">
            <header>
                <h1>Benvenuto in MYFRIGO</h1>
                <h2>L'applicazione che ti crea ricette in base agli ingredienti che hai in casa!</h2>
            </header>
            <main>
                <p>L'app MyFrigo è un applicazione con l'implementazione dell'AI chatGPT.</p>
                <p>Noi ti forniamo degli ingredienti, tu scegli quelli che più ti piacciono o che hai a disposizione in casa e chatGPT fa il resto.</p>
                <p>Lasciati ispirare dall'AI di come abbina gli ingredienti per crearti ricette sempre nuove!</p>
            </main>
            <footer>
                <h1>Accedi</h1>
                <input type="text" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="button" className="loginButton"><b>Accedi</b></button>
                <Link to="/signup" style={{ textDecoration: "none" }}>
                    <p>Se non hai ancora un account registrati qui</p>
                </Link>
                <Link to="/personalingredients" style={{ textDecoration: "none" }}>
                    <p>Oppure inizia dalla versione gratuita</p>
                </Link>
            </footer>
        </div>)
}