import { useEffect, useState } from "react";
import "./Menu.css";
import OpcionDificultad from "../OpcionDificultad/OpcionDificultad";
import { usePreguntas } from "../../contexts/Preguntas";



export default function Menu() {
    const [dificultades, setDificultades] = useState([]);
    const [loading, setLoading]           = useState(true);
    const [preguntas, setPreguntas]       = useState([]);
    const { setDificultad } = usePreguntas();
    
    useEffect(() => {
        fetch("https://preguntados-api.vercel.app/api/difficulty")
        .then(res => res.json())
        .then(data => setDificultades(data))
        .catch(err => console.log("Ocurrió un error al recuperar las dificultades", err))
        .finally(() => setLoading(false));
    }, []);


    const handleDifficulty = (dif) => {
        setLoading(true);
        setDificultad(dif);
        fetch(`https://preguntados-api.vercel.app/api/questions?difficulty=${dif}`)
        .then(res => res.json())
        .then(data => {
            setPreguntas(data);
            console.log(data)
        })
        .catch(err => console.log("Ocurrió un error al recuperar las preguntas", err))
        .finally(() => setLoading(false) );
    }
    
    return(
        
        <div className="menu">
            <div className="bienvenida">
                <h1>Preguntados</h1>
            </div>
            <div className="dificultades">
                {loading ? (<p>CARGANDO...</p>) : (
                    dificultades.map(dif => (
                        <div key={dif} className="opcion" onClick={() => handleDifficulty(dif)}>
                            <OpcionDificultad dificultad={dif}/>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}