import { useEffect, useState } from "react";
import "./Menu.css";
import OpcionDificultad from "../OpcionDificultad/OpcionDificultad";
import { usePreguntas } from "../../contexts/Preguntas";
import apiService from "../../service/api.js";



export default function Menu() {
    const [dificultades, setDificultades] = useState([]);
    const [loading, setLoading]           = useState(true);
    const [preguntas, setPreguntas]       = useState(null);
    const [respondio, setRespondio]       = useState(false);
    const { setDificultad, preguntasTotales, setPreguntasTotales, setPreguntaActual, preguntaActual, preguntasAcertadas, setPreguntasAcertadas } = usePreguntas();
    const [opcionCorrecta, setOpcionCorrecta] = useState(null);
    const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);
    const [animar, setAnimar] = useState(null);
    
    useEffect(() => {
        apiService.getDifficulties()
        .then(res => res.json())
        .then(data => setDificultades(data))
        .catch(err => console.log("Ocurrió un error al recuperar las dificultades", err))
        .finally(() => setLoading(false));
    }, []);


    const handleDifficulty = (dif) => {
        setLoading(true);
        setDificultad(dif);
        apiService.getQuestions(dif)
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
        setLoading(true);
        setAnimar(option);
        setTimeout(()=> {
            setAnimar(null);
        }, 300);
        setOpcionSeleccionada(option);
        apiService.getAnswer(id, option)
        .then(res => res.json())
        .then(data => {
            data.answer ? setPreguntasAcertadas(prev => prev + 1) : null;
            setOpcionCorrecta(data.answer);
            setRespondio(true);
            })
        .catch(err => console.log("Ocurrió un error al enviar la respuesta", err))
        .finally(() => setLoading(false));
    }

    const handleNextQuestion = () => {
        if(preguntaActual === preguntasTotales) {
            setPreguntas([]);
        } else {
            setPreguntaActual(prev => prev + 1);
            setRespondio(false);
            setOpcionCorrecta(null);
            setOpcionSeleccionada(null);
        }
    }

    const handlePlayAgain = () => {
        setPreguntaActual(1);
        setPreguntasAcertadas(0);
        setPreguntasTotales(0);
        setPreguntas(null);
        setRespondio(false);
        setOpcionCorrecta(null);
        setOpcionSeleccionada(null);
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
        return(
            <div className="menu">
                <div className="indicadores">
                    <span>Pregunta {preguntaActual}/{preguntasTotales}</span>
                    <span id="volver" onClick={handlePlayAgain}>Volver al menú</span>
                </div>
                <div className="pregunta">
                    <span id="pregunta">{preguntas[preguntaActual-1].question}</span>
                    <div className="options">
                        {opciones(preguntas[preguntaActual-1]).map(([key, value]) =>{
                            let clase = "option";
                            if(respondio && key === opcionSeleccionada) {
                                 clase += opcionCorrecta ? " correcta" : " incorrecta";
                            }
                            return (
                                <div id={key} key={key} className={clase + ` ${animar=== key ? "click-anim": ""}`} onClick={() => respondio ? null : handleAnswer(preguntas[preguntaActual-1].id, key)} style={respondio ? {cursor: "default"} : null}>
                                    <span>{value}</span>
                                </div>
                            )                   
                        })}
                    </div>
                </div>
                <div className="footer">
                    <button className="boton" onClick={handleNextQuestion} disabled={!respondio}>{loading ? "Analizando" : "Siguiente pregunta"}</button>
                </div>
            </div>
        )
    }

    if(preguntas.length === 0 && respondio) {
        return(
            <div className="menu">
                <div className="resultado">
                    <h2>Has respondido correctamente</h2>
                    <h2>{preguntasAcertadas} / {preguntasTotales}</h2>
                    <h2>preguntas</h2>
                </div>
                <div className="botones">
                    <button className="boton" onClick={handlePlayAgain}>Volver a jugar</button>
                </div>
            </div>
        );
    }
}