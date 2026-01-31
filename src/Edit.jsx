import { useState } from "react";

function Edit() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });

    // Generieke handler voor het bijwerken van de state
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Formulier verzonden:", formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Naam:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="email">E-mailadres:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
            </div>
            <button type="submit">Verzenden</button>
        </form>
    );
}

export default Edit;