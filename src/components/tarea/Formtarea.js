import React,{useContext, useState, useEffect} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext' 

 const Formtarea = () => {


    
    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;

    //obtener la funcion del context de tarea
    const tareasContext = useContext(tareaContext);
    const { tareaSeleccionada,
            errortarea,
            agregarTarea, 
            validarTarea, 
            obtenerTareas,
            actualizarTarea,
            limpiarTarea    
        } = tareasContext;

    // Effect que si hay una tarea tareaSeleccionada
    useEffect(()=>{
        if(tareaSeleccionada !== null){
            guardarTarea(tareaSeleccionada)
        }else{
            guardarTarea({
                nombre:''
            })
        }
    },[tareaSeleccionada]);

    // state del formulario
    const [tarea, guardarTarea] = useState({
        nombre:''
    });

    //Extraer el nombre del proyecto
    const {nombre} = tarea;

     // Si no hay proyecto seleccionado

 if(!proyecto){
    return null;   
}
const [ proyectoAtual] = proyecto;
// LEER LOS VALORES DEL FORMULARIO
const handleChange = e =>{
    guardarTarea({
        ...tarea,
        [e.target.name]: e.target.value
    })
}

const onSubmit = e =>{
    e.preventDefault();
// validar
    if(nombre.trim() === ''){
        validarTarea();
        return;
    }
// si es edicion o si es nueva tarea
if(tareaSeleccionada === null){
    // tarea nueva
     // agregar la nueva tarea al state de
     tarea.proyecto = proyectoAtual._id;
     agregarTarea(tarea);
}else{
    // actualizar tarea existente

    actualizarTarea(tarea);
    // Elimina tareaSleccionada del state
    limpiarTarea();
}
// pasar la validacion de
    //  obtener y filtrar las tareas del proyectoActual
    obtenerTareas(proyectoAtual._id)
    // Reiniciar el Form
    guardarTarea({
        nombre:''
    })
}
    return (
        <div className="formulario">
            <form 
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>

                <div className="contenedor-input">
                    <input 
                        type="Submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaSeleccionada ? 'Editar tareas':'Agregar Tarea'}
                    />
                </div>
            </form>
            
            {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
        </div>
    );
};

export default Formtarea;