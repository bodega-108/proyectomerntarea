import React,{useContext} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'

import tareaContext from '../../context/tareas/tareaContext'

 const Tarea = ({tarea}) => {
     // Otener el state de proyectos 
     const proyectosContext = useContext(proyectoContext);
     const {proyecto} = proyectosContext;

    const tareasContext = useContext(tareaContext);
    const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual} = tareasContext;
    // EXTARER EL PROYECTO
    
    const [ proyectoAtual] = proyecto;

    // Funcion que se ejecutar cuando el usuario presiona el boton de eliminar tarea
    const tareaEliminar = id =>{
        eliminarTarea(id, proyectoAtual._id)
        obtenerTareas(proyectoAtual._id)
    }   

    // funcion dque modifica el estado de las tareas
    const cambiarEstado = tarea =>{
        if(tarea.estado){
            tarea.estado = false;
        }else{
            tarea.estado = true;
        }
        actualizarTarea(tarea);

    }

    // AGREGAR UNA TAREA ACTUAL CUANDO EL USUARIO DESEA EDITARLA
    const seleccionarTarea = tarea =>{
        guardarTareaActual(tarea);
    }
    return (
        <div>
                <li className="tarea sombra">
                    <p>{tarea.nombre}</p>

                    <div className="estado">
                        {tarea.estado 
                        ?
                        (
                            <button
                                type="button"
                                className="completo"
                                onClick={()=>actualizarTarea(tarea)}
                            >Completado</button>
                        )
                        :
                        <button
                        type="button"
                        className="incompleto"
                        onClick={()=>cambiarEstado(tarea)}

                    >incompleto</button>
                        }
                    </div>

                    <div className="acciones">
                        <button
                            type="button"
                            className="btn btn-primario"
                            onClick={()=>seleccionarTarea(tarea)}
                        >Editar</button>

                        <button
                         type="button"
                         className="btn btn-secundario"
                         onClick={() => tareaEliminar(tarea._id)}
                        >Eliminar</button>

                    </div>
                </li>
        </div>
    );
};

export default Tarea;