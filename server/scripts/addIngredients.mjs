// import axios from "axios"

// async function addIngredient(name) {
//     try {
//         const response = await axios.get('http://localhost:8000/ingredients');
//         const ingredients = response.data;

//         let ingredientFound = false;

//         for (let i = 0; i < ingredients.length; i++) {
//             if (ingredients[i].name === name) {
//                 ingredientFound = true;
//                 break;
//             }
//         }

//         if (ingredientFound) {
//             console.log("Ingrediente già presente");
//         } else {
//             const newIngredient = { name: name };
//             ingredients.push(newIngredient);
//             const addResponse = await axios.post('http://localhost:8000/ingredients', newIngredient);
//             console.log(addResponse.data);
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }

// addIngredient(process.argv[2]);
