// import axios from 'axios';
// import "dotenv/config";

// // Funzione per inviare la richiesta POST a OpenAI
// async function sendChatMessage(message) {
//     const apiKey = "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";
//     try {
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${apiKey}`
//             }
//         };

//         const payload = {
//             messages: [
//                 //{ role: 'system', content: 'You are a user' },
//                 { role: 'user', content: message }
//             ],
//             model: "gpt-3.5-turbo",
//         };
//         const response = await axios.post('https://api.openai.com/v1/chat/completions', payload, config);
//         const reply = response.data.choices[0].message.content;
//         console.log('Risposta da ChatGPT:', reply);
//     } catch (error) {
//         console.error('Errore durante la richiesta:', error.message);
//     }
// }

// // Invio di una richiesta di esempio
// sendChatMessage("creami una ricetta veloce");

