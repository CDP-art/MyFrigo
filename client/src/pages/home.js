import React from "react";
import "../css/home.css"
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="homeContainer">
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
                <div className="links">
                    <p>Se non hai ancora un account: <Link to="/signup" style={{ color: "black" }}><b>registrati qui</b></Link></p>
                    <Link to="/personalingredients" style={{ color: "black" }}>
                        <p>Oppure inizia dalla versione gratuita</p>
                    </Link>
                </div>
            </footer>
        </div>)
}