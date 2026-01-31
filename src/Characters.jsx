import React, { useState, useEffect } from "react";

function CharacterComponent() {
    const [characters, setCharacter] = useState(null);

    const fetchCharacter = async () => {
        try {
            const response = await fetch("http://145.24.237.14:8001/characters/detail", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
            });
            const data = await response.json();
            setCharacter(data.items);
        } catch (error) {
            console.error("Fout bij het ophalen van het characters:", error);
        }
    };

    useEffect(() => {
        fetchCharacter();
    }, []); // Lege array zorgt ervoor dat useEffect alleen bij de eerste render wordt uitgevoerd.

    return (
        <div>
            {characters ? (
                <div>
                    <h1>{characters.name}</h1>
                    <p>{characters.description}</p>
                </div>
            ) : (
                <p>Character loading...</p>
            )}
        </div>
    );
}

export default CharacterComponent;