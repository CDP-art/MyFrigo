

import axios from "axios";
import "dotenv/config";
const apiKey = "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"


async function chatGPT(req, res) {
    const { message } = req.body;

    try {
        const response = await axios.post("https://api.openai.com/v1/chat/completions", {
            model: "gpt-3.5-turbo",
            messages: [{ role: 'system', content: 'You are a user' }, { role: 'user', content: message + "Scrivi una ricetta completa senza interruzioni. Genera la risposta fino a che non hai completato." }]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });

        const reply = response.data.choices[0].message.content;

        res.json({ reply });
    } catch (error) {
        console.log("Errore durante la chat:", error);
        console.log("Dettagli dell'errore:", error.response.data.error);
        console.log("Errore durante la chat:", error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
}





export { chatGPT }



