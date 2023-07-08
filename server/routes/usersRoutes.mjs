import fs from "fs"

const DB_USERS_PATH = "./db/users.json"

//devo creare una variabile dove i parametri che ricevo sono il body
//provare
//  creare una constate per leggere il fs
//  il risultato saranno gli utenti in json e li devo parsare 
//  creare una variabile per vedere se l'utente esiste o meno (tramite). Utilizzoi il metodo .find
//      se esiste => email presente
//      altrimenti => nuova variabile nuovoutente con parametri e lo pusho in utenti
//      sovrascrivo il fs con writefilesync
//      stato completato
//gestire errore


//SIGNUP
async function signup(req, res) {
    const { name, surname, email, password } = req.body;
    try {
        const data = fs.readFileSync(DB_USERS_PATH);
        const users = JSON.parse(data);

        const esUser = users.find((user) => user.email.toLowerCase() === email.toLowerCase());
        if (esUser) {
            res.status(400).json({ success: false, message: "Email già presente nell'archivio" });
        } else {
            const newUser = { name, surname, email, password };
            users.push(newUser);

            fs.writeFileSync(DB_USERS_PATH, JSON.stringify(users));

            res.status(201).json({ success: true, message: "Utente aggiunto regolarmente" });
        }
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ success: false, message: "Si è verificato un errore durante la registrazione" });
    }
}

//USERS LIST

async function getUsers(req, res) {
    try {
        const data = fs.readFileSync(DB_USERS_PATH);
        const users = JSON.parse(data);
        res
            .status(200)
            .json(users)
    } catch (err) {
        res
            .status(500)
            .json({ error: true, message: "internal server error" })
    }

}

export {
    signup,
    getUsers
}
