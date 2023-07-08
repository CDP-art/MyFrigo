import {
    insertUser,
    findUsers
} from "../src/mongodb.mjs"

async function signup(req, res) {
    let user = req.body
    insertUser(user)
    res
        .status(201)
        .send("Utente creato con successo")
        .end()
}

async function getUsers(req, res) {
    const users = await findUsers();
    res.send(users)
}

export {
    signup,
    getUsers,
}