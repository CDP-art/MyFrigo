import { MongoClient, ServerApiVersion } from 'mongodb';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


//per far collegare mongodb al server
async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("TE SEI COLLEGATO A MONGO DB! DAJE");
    } catch (err) {
        console.log(err);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}



//inserire ingredienti
async function insertIngredient(ingredient) {
    try {
        await client.connect()
        const database = client.db(process.env.MONGODB_DBNAME);
        const ingredientsCollection = database.collection("ingredients");
        const ingredientsCount = await ingredientsCollection.countDocuments();
        if (ingredientsCount >= 6) {
            res.status(400).send("Raggiunto limite massimo di ingredienti! Accedi o registrati per continuare ad aggiungere ingredienti!");
        }
        const result = await ingredientsCollection.insertOne(ingredient);
        console.log(`Ingrediente aggiunto: ${ingredient.name}`);
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
}

//trovare ingredienti
async function findIngredients() {
    try {
        await client.connect()
        const database = client.db(process.env.MONGODB_DBNAME);
        const ingredientsCollection = database.collection("ingredients");
        const foundIngredients = await ingredientsCollection.find().toArray()
        return foundIngredients
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
}

//trovare singolo ingrediente tramite nome
async function findIngredientByName(name) {
    try {
        await client.connect()
        const database = client.db(process.env.MONGODB_DBNAME);
        const ingredientsCollection = database.collection("ingredients");
        const ingredientName = await ingredientsCollection.findOne({ name })
        return ingredientName
    } catch (err) {
        console.log(err);
    } finally {
        await client.close()
    }
}

//cancellare ingredienti
async function deleteIngredient(name) {
    try {
        await client.connect()
        const database = client.db(process.env.MONGODB_DBNAME);
        const ingredientsCollection = database.collection("ingredients");
        const result = await ingredientsCollection.deleteOne({ name });
        console.log(`Ingrediente eliminato: ${name}`);
        return result.deletedCount === 1
    } catch (err) {
        console.log(err);
        throw err
    } finally {
        await client.close();
    }
}


//USERS

//Aggiungere user
async function insertUser(user) {
    try {
        await client.connect()
        const database = client.db(process.env.MONGODB_DBNAME);
        const usersCollection = database.collection("users");
        const result = await usersCollection.insertOne(user);
        console.log(result);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } catch (err) {
        console.log(err);
    }
}


//Tutti gli users
async function findUsers() {
    try {
        await client.connect()
        const database = client.db(process.env.MONGODB_DBNAME);
        const usersCollection = database.collection("users");
        const foundUsers = await usersCollection.find().toArray()
        return foundUsers
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
}


export {
    run,
    insertIngredient,
    findIngredients,
    findIngredientByName,
    deleteIngredient,
    insertUser,
    findUsers
}
