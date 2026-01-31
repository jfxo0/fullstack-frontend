import {useNavigate, useParams} from "react-router";
import {useState} from "react";

function Delete() {
    const params = useParams();
    const navigate = useNavigate();

    const [Characters, setTrains] = useState([]);
    const deleteData = async (id) => {

        try {
            const response = await fetch(`http://145.24.237.34:8000/trains/${id}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json'
                }
            });
            const data = await response.json();
            console.log(data); //data.items is de array met notities
            navigate("/");

            setTrains(data);
        } catch (error) {
            console.error('Fout bij het ophalen van notities:', error);
        }
    }
    deleteData(params.id);
}
export default Delete;