import React from "react";
import "../css/login.css"

export default function Login() {
    return (
        <div className="loginContainer">
            <main id="main">
                <h1>Bentornato!</h1>
                <input type="text" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="button" className="loginButton"><b>Accedi</b></button>
            </main>
        </div>)
}