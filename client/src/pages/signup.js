import React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import "../css/form.css"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function Signup() {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const MySwal = withReactContent(Swal)

    async function addUser() {
        if (!name || !surname || !email || !password) {
            console.log("I campi sono vuoti");
            return;
        }

        if (!email.includes("@")) {
            console.log("L'EMAIL NON E' VALIDA");
            return;
        }

        try {
            await axios.post("http://localhost:8000/users/signup", {
                name,
                surname,
                email,
                password,
            });
            console.log(email);
            MySwal.fire({
                icon: "success",
                text: "CONGRATULAZIONI! TI SEI REGISTRATO CORRETTAMENTE",
                confirmButtonText: "OK"

            })
            //console.log("DOPO" + usersList);
        } catch (err) {
            MySwal.fire({
                icon: "warning",
                text: `MI DISPIACE! ${err.response.data.message}`

            })
            console.log(err.response.data.message);

        }
    }

    return (
        <div className="formContainer">
            <h1>Registrati</h1>
            <form method="post" action="http://localhost:8000/users/signup" id="form">
                <div>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Inserisci il tuo nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="given-name"
                        required
                    />
                </div>

                <div>
                    <input
                        type="text"
                        id="surname"
                        name="surname"
                        placeholder="Inserisci il tuo cognome"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        autoComplete="family-name"
                        required
                    />
                </div>

                <div>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <button type="button" onClick={addUser}>
                        <b>Accedi</b>
                    </button>
                </div>
            </form>
            <footer>
                <h5>Hai già un Account?</h5>
                <Link to="/login" className="accedi">
                    <h5>Accedi da qui</h5>
                </Link>
            </footer>
        </div>
    );
}

export default Signup;