import React,{Fragment, useContext} from 'react'
import Tarea from './Tarea'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'
import {CSSTransition, TransitionGroup} from 'react-transition-group' 


 const ListadoTreas = () => {
    const proyectosContext = useContext(proyectoContext);
    const {proyecto,eliminarProyecto} = proyectosContext;

//obtener la funcion del context de tarea
const tareasContext = useContext(tareaContext);
const {tareasproyecto} = tareasContext; 
    // Si no hay proyecto seleccionado
    if(!proyecto){
        return <h2>Selecciona un proyecto</h2>;   
    }

    const[proyectoAtual]= proyecto;

   
    // Eliminar un proyeocto 
    const onClickEliminar = ()=>{
        eliminarProyecto(proyectoAtual._id)
    }
    return (
        <Fragment>
            <h2>Proyecto : {proyectoAtual.nombre}</h2>
            <ul className="listado-tareas">
                {tareasproyecto.length === 0 ?
                     (<li className="tarea"><p>No hay tareas</p></li>)
                     
                    : 
                    <TransitionGroup>
                           {tareasproyecto.map(tarea =>(
                            <CSSTransition
                               key={tarea._id}
                               timeout={200}
                               className="tarea"
                            >
                            <Tarea 
                                tarea={tarea}
                                />
                            </CSSTransition>
                    ))}
                    </TransitionGroup>
                    
                 
                }
            </ul>
            <button className="btn btn-eliminar" 
                    type="button"
                    onClick={onClickEliminar}
            >Eliminar Proyecto &times;</button>
        </Fragment>
        

    );
};

export default ListadoTreas;