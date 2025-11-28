import "./OpcionDificultad.css";


export default function OpcionDificultad({dificultad}) {
    
    return(
        <div className="opcion_dificultad">
            <span>{dificultad}</span>
        </div>
    );
}