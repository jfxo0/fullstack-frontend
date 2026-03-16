import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

function Edit() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        funFact: "",
        imageUrl: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    useEffect(() => {
        async function fetchCharacter() {
            try {
                const response = await fetch(
                    `http://145.24.237.14:8001/characters/${id}`,
                    {
                        method: "GET",
                        headers: { Accept: "application/json" },
                    }
                );

                if (!response.ok) {
                    console.error("Detail ophalen mislukt:", response.status);
                    return;
                }

                const data = await response.json();

                setFormData({
                    name: data.name ?? "",
                    description: data.description ?? "",
                    funFact: data.funFact ?? "",
                    imageUrl: data.imageUrl ?? "",
                });
            } catch (error) {
                console.error("Fout bij ophalen detail:", error);
            }
        }

        fetchCharacter();
    }, [id]);


    async function updateCharacter() {
        try {
            const response = await fetch(
                `http://145.24.237.14:8001/characters/${id}`,
                {
                    method: "PUT",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) {
                console.error("Update mislukt:", response.status);
                return;
            }

            navigate(`/characters/${id}`);
        } catch (error) {
            console.error("Fout bij updaten:", error);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        updateCharacter();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mx-auto max-w-xl space-y-5 rounded-xl border bg-white p-6 shadow-sm">

                <div className="space-y-1">
                    <label htmlFor="name" className="text-sm font-medium text-slate-700">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="e.g. Soul"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>


                <div className="space-y-1">
                    <label htmlFor="description" className="text-sm font-medium text-slate-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows={4}
                        placeholder="Describe your character..."
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full resize-none rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>


                <div className="space-y-1">
                    <label htmlFor="funFact" className="text-sm font-medium text-slate-700">
                        Fun fact
                    </label>
                    <input
                        type="text"
                        id="funFact"
                        name="funFact"
                        placeholder="Tell a fun fact"
                        value={formData.funFact}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>


                <div className="space-y-1">
                    <label htmlFor="imageUrl" className="text-sm font-medium text-slate-700">
                        Image URL <span className="text-slate-400">(optional)</span>
                    </label>
                    <input
                        type="url"
                        id="imageUrl"
                        name="imageUrl"
                        placeholder="https://..."
                        value={formData.imageUrl}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>


                <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Save
                </button>
            </div>

        </form>
    );
}

export default Edit;
