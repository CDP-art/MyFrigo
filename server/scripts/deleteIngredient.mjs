// import axios from "axios"

// async function deleteIngredient(name) {
//     try {
//         const response = await axios.get('http://localhost:8000/ingredients');
//         const ingredients = response.data;

//         let ingredientFound = false;

//         for (let i = 0; i < ingredients.length; i++) {
//             if (ingredients[i].name === name) {
//                 ingredients.splice(i, 1);
//                 ingredientFound = true;
//                 break;
//             }
//         }

//         if (ingredientFound) {
//             const deleteResponse = await axios.delete(`http://localhost:8000/ingredients/${name}`);
//             console.log(deleteResponse.data);
//         } else {
//             console.log("Ingrediente non trovato");
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }
// deleteIngredient(process.argv[2]);

