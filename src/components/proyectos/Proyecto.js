import React,{useContext} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext'

import tareaContext from '../../context/tareas/tareaContext' 

 const Proyecto = ({proyecto}) => {
// Otener el state de proyectos 
const proyectosContext = useContext(proyectoContext);
const {proyectoAtual } = proyectosContext;

//obtener la funcion del context de tarea
const tareasContext = useContext(tareaContext);
const {obtenerTareas} = tareasContext; 

// Funcion para agregar el proyecto actual
const seleccionarProyecto = id =>{
  proyectoAtual(id); // Fijar un proyecto actual
  obtenerTareas(id); // Filtar las tareas

}
 
    return (
      <li>
          <button
            type="button"
            className="btn btn-blank"
            onClick = {()=> seleccionarProyecto(proyecto._id)}
          >
              {proyecto.nombre}
          </button>
      </li>
    );
};

export default Proyecto;