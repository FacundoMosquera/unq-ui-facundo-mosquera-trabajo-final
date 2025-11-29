import { useEffect, useState } from "react";
import "./Menu.css";
import OpcionDificultad from "../OpcionDificultad/OpcionDificultad";
import { usePreguntas } from "../../contexts/Preguntas";



export default function Menu() {
    const [dificultades, setDificultades] = useState([]);
    const [loading, setLoading]           = useState(true);
    const [preguntas, setPreguntas]       = useState(null);
    const [respondio, setRespondio]       = useState(false);
    const { setDificultad, preguntasTotales, setPreguntasTotales, setPreguntaActual, preguntaActual, preguntasAcertadas, setPreguntasAcertadas } = usePreguntas();
    
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
            setPreguntasTotales(data.length);
            setPreguntaActual(1);
        })
        .catch(err => console.log("Ocurrió un error al recuperar las preguntas", err))
        .finally(() => setLoading(false) );
    }

    const opciones = (pregunta) => Object.entries(pregunta)
    .filter(([key]) => key.startsWith("option"));

    const handleAnswer = (id, option) => {
        fetch(`https://preguntados-api.vercel.app/api/answer`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                questionId: id,
                option: option
            })
        })
        .then(res => res.json())
        .then(data => {
            data.answer ? setPreguntasAcertadas(prev => prev + 1) : null;
            setRespondio(true);
            })
        .catch(err => console.log("Ocurrió un error al enviar la respuesta", err))
    }

    const handleNextQuestion = () => {
        if(preguntaActual === preguntasTotales) {

        } else {
            setPreguntaActual(prev => prev + 1);
            setRespondio(false);
        }
    }
    
    if(!preguntas) {
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


    if(preguntas.length > 0 ) {
        console.log(preguntas);
        console.log(preguntasAcertadas)
        return(
            <div className="menu">
                <div className="indicadores">
                    <span>{preguntaActual}/{preguntasTotales}</span>
                </div>
                <div className="pregunta">
                    <span>{preguntas[preguntaActual-1].question}</span>
                    <div className="options">
                        {opciones(preguntas[preguntaActual-1]).map(([key, value]) =>(
                            <div id={key} key={key} className="option" onClick={() => respondio ? null : handleAnswer(preguntas[preguntaActual-1].id, key)}>
                                <span>{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="footer">
                    <button onClick={handleNextQuestion} disabled={!respondio}>Siguiente pregunta</button>
                </div>
            </div>
        )
    }
}