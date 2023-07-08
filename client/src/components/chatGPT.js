// import React from 'react';
// import { useState } from 'react';
// import axios from 'axios';
import "../css/chatButton.css"

const ChatGPT = () => {
    return (
        <footer>
            <p><b>Clicca il bottone qui in basso per creare una ricetta con gli ingredienti selezionati!</b></p>
            <button>Crea la ricetta</button>
            <div className="rispostaChat">
                <p></p>
            </div>
        </footer>
    );
};

export default ChatGPT;