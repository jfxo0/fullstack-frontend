import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router";

function CharacterDetail(){

    const params = useParams()
    const navigate = useNavigate()

    const [details, setDetails] = useState(null);
    const videoUrl = details
        ? `${import.meta.env.VITE_BASE_URI}/${details.path}`
        : null;

    const deletePrehistoricAnimal = async(id)=>{
        try{
            const result = await fetch (`http://145.24.237.147:8000/prehistoric-animals/${id}`,{
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json'
                }
            });

            navigate(`/prehistoricAnimals`)

        }catch (e){
            console.log(e)
        }
    };

    const loadDetails = async(id)=>{
        try{
            const result = await fetch (`http://145.24.237.147:8000/prehistoric-animals/${id}`,{
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (result.status === 404){
                navigate("*");
                return;
            }

            if (!result.ok){
                throw new Error(`HTTP error! status: ${result.status}`);
            }

            const data = await result.json()
            setDetails(data)
            console.log(data)

        }catch (e){
            console.log(e)
            navigate("*");
        }
    };

    useEffect(() => {
        loadDetails(params.id)
    }, [params.id]);

    return(
        <main className={"min-h-screen mx-auto max-w-7xl px-6 py-10 bg-gray-100"}>

            {details ? (
                <>
                    <section className={"p-6 bg-white rounded-2xl border border-slate-800 shadow-sm"}>
                        <h1 className={"text-3xl font-bold text-slate-900 mb-4"}>{details?.genus ?? "There are no prehistoric-animals yet"}</h1>
                        <h2 className={"text-lg font-medium text-slate-600 mb-6"}>Era: {details?.era ?? "There are no prehistoric-animals yet"}</h2>
                        <p className={"text-slate-700 leading-relaxed mb-8"}>Family: {details?.family ?? "There are no prehistoric-animals yet"}</p>
                        {videoUrl && (
                            <video controls className="w-full max-w-xl rounded-lg">
                                <source src={videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}

                        <div className={"flex row gap-1.5 pt-6" }>
                            <Link to={`/editPrehistoricAnimal/${details.id}`} className={"inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200"}>EDIT</Link>
                            <button onClick={() => deletePrehistoricAnimal(details.id)} className={"inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200"}>DELETE</button>
                        </div>
                    </section>
                </>
            ): (
                <p className={"text-center text-slate-600 text-lg animate-pulse"}>A little patience, prehistoric animals are getting revived...</p>
            )}
        </main>
    )
}

export default CharacterDetail;