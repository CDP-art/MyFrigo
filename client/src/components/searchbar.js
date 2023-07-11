import React from "react";
import { useState } from "react";
import "../css/searchbar.css"

export default function SearchBar(ingredients, onSearch) {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
        onSearch(value);
    };


    return (
        <div id="searchbar">
            <input
                type="text"
                placeholder="Cerca ingredienti..."
                value={searchTerm}
                onChange={handleSearch}
            ></input>
        </div>
    );
}