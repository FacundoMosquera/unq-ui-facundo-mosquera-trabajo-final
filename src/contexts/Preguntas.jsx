import { createContext, useContext, useState } from "react";



const PreguntasContext = createContext({
    preguntasTotales: 0,
    preguntasAcertadas: 0,
    dificultad: "easy",
    setPreguntasAcertadas: () => {},
    setPreguntasTotales: () => {},
    setDificultad: () => {}
    
});


export const PreguntasProvider = ({children}) => {
    const [preguntasTotales, setPreguntasTotales]     = useState(0);
    const [preguntasAcertadas, setPreguntasAcertadas] = useState(0);
    const [dificultad, setDificultad] = useState("easy");

    const values = {
        preguntasTotales: preguntasTotales,
        preguntasAcertadas: preguntasAcertadas,
        dificultad: dificultad,
        setPreguntasAcertadas: setPreguntasAcertadas,
        setDificultad: setDificultad,
        setPreguntasTotales: setPreguntasTotales
    }

    return (
        <PreguntasContext.Provider value={values}>
            {children}
        </PreguntasContext.Provider>
    );
} 

export const usePreguntas = () => useContext(PreguntasContext);