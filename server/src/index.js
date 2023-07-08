import express from 'express'
import axios from "axios"
axios.defaults.withCredentials = true;
import "dotenv/config"
const app = express()
import bodyParser from 'body-parser'
import cors from "cors"
import fs from "fs"
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false })); // per poter utilizzare l'html con il form per la login.
app.use(express.json());


//INGREDIENTI
import {
    addIngredients,
    getUserIngredients,
    getIngredients,
    removeIngredient,
    getIngredientName,
    getFavorites
}
    from "../routes/ingredientsRoutes.mjs"

//USERS
import {
    signup,
    getUsers
}
    from "../routes/usersRoutes.mjs"

//MONGODB

// import { run } from "./mongodb.mjs"

// import {
//     addIngredients,
//     getIngredients,
//     getGeneralIngredients,
//     removeIngredient,
//     getIngredientName,
// }
//     from "../routes/ingredientsRoutesMDB.mjs"

//USERS
// import {
//     signup,
//     getUsers
// } from '../routes/usersRoutesMDB.mjs';

//CHATGPT
import { chatGPT } from "../routes/chatgptRoute.mjs"

const port = 8000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

//MONGODB
// run()

// //chiamata per tutti gli ingredienti
// app.get("/ingredients", getGeneralIngredients)

// //chiamata per vedere tutti gli ingredienti dal db user
// app.get("/ingredients/user", getIngredients)

// //aggiunta di un ingrediente
// app.post("/ingredients/user", addIngredients)

// //chiamata per nome ingrediente
// app.get("/ingredients/:name", getIngredientName)

// //cancellazione di un ingrediente
// app.delete("/ingredients/user/:name", removeIngredient);

// //USERS

// //Singup
// app.post("/users/signup", signup)

// //Users List DB
// app.get("/users", getUsers)


//FILE SYSTEM

//INGREDIENTI

//Ottieni la lista degli ingredienti
app.get("/ingredients", getIngredients);

//Lista ingredienti user
app.get("/ingredients/user", getUserIngredients);

//Ottieni nome ingrediente user
app.get("/ingredients/user/:name", getIngredientName);

// Aggiungi un ingrediente user
app.post("/ingredients/user", addIngredients);

// Rimuovi un ingrediente user
app.delete("/ingredients/user/:name", removeIngredient);


//USERS FS

//SIGNUP
app.post("/users/signup", signup)

//USERS LIST
app.get("/users", getUsers)



//FAVORITE RECIPES
app.get("/favoriteRecipes", getFavorites)




//chatGPT
app.post('/chat', chatGPT);


app.listen(port, () => {
    console.log(`SERVER ONLINE: HTTP://LOCALHOST:${port}/`)
})

