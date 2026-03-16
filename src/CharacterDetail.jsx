import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router";

function CharacterDetail(){
    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();
    const [character, setCharacter] = useState({
        name: "",
        description: "",
        funFact: "",
        imageUrl: "",
    });

    const fetchCharacter = async () => {

        try {
            const get = await fetch(`http://145.24.237.14:8001/characters/${id}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
            });
            const data = await get.json();
            setCharacter(data);

        } catch (error) {
            console.error("Fout bij het ophalen van het character:", error);
        }
    };

    const deleteCharacter = async()=> {
        if (!confirm("Delete this character?")) return;

        const res = await fetch(`http://145.24.237.14:8001/characters/${id}`, {
            method: "DELETE",
            headers: { Accept: "application/json" },
        });

        if (!res.ok && res.status !== 204) {
            console.log("Delete failed", res.status);
            return;
        }

        navigate("/");
    }


    useEffect(() => {
        fetchCharacter();
    }, []);

    console.log("character:", character);

    return (

            <div key={character.name} className="mx-auto max-w-3xl ">
                <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

                    <div className="aspect-square  overflow-hidden">
                        {character.imageUrl ? (
                            <img
                                src={character.imageUrl}
                                alt={character.name}
                                className="h-full w-full object-cover"
                            />
                        ) : (<p className="text-xl text-center p-10 text-slate-400">No image given</p>)
                        }
                    </div>


                    <div className="space-y-3 p-4">
                        <h1 className="text-2xl font-semibold">{character.name}</h1>

                        <p className="text-slate-700">{character.description}</p>

                        {character.funFact && (
                            <p className="text-sm italic text-slate-500">
                                {character.funFact}
                            </p>
                        )}


                        <div className="flex gap-3 pt-2">
                            <button onClick={deleteCharacter} className="rounded-md bg-red-50 px-3 py-1 text-sm text-red-600 hover:bg-red-100">
                                Delete
                            </button>

                            <Link to={`/edit/${character.id}`} className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700">
                                Edit
                            </Link>
                            <Link to={`/`} className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700">
                                ← Back
                            </Link>

                        </div>
                    </div>
                </div>
            </div>

    );
}

export default CharacterDetail;