import React, { useState, useEffect } from "react";
import {Link} from "react-router";

function CharacterComponent() {
    const [characters, setCharacters] = useState([]);

    const fetchCharacter = async () => {
        try {
            const get = await fetch("http://145.24.237.14:8001/characters/detail", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
            });
            const data = await get.json();
            setCharacters(data.items);
        } catch (error) {
            console.error("Fout bij het ophalen van het characters:", error);
        }
    };

    useEffect(() => {
        fetchCharacter();
    }, []);

    console.log("characters state:", characters);

    return (
        <div className="space-y-4">

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
                {characters.map((character) => (
                    <div key={character.id} className="w-fit overflow-hidden rounded-xl border bg-white shadow-sm">
                        <div className="aspect-square w-48 overflow-hidden">
                            {character.imageUrl ? (
                                <img
                                    src={character.imageUrl}
                                    alt={character.name}
                                    className="h-full w-full object-cover"
                                />
                             ) : (<p className="text-sm text-center p-20 text-slate-400">No image given</p>)
                            }
                        </div>

                        <div className="p-2">
                            <p className="text-sm font-semibold">{character.name}</p>
                            <Link to={`/characters/${character.id}`} className="text-xs text-blue-600 hover:underline">
                                Details →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default CharacterComponent;