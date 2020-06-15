import React,{Fragment, useState, useContext} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'

 const NuevoProyecto = () => {

    // Obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);
    const { formulario,errorFormulario,mostrarFormulario,agregarProyecto, mostrarError } = proyectosContext;

    // state para el proyectos

    const [proyecto, guardarProyecto]=useState({
        nombre: ''
    });

    // Extraer nombre del proyecto para el
    const {nombre}=proyecto;

    const onChangeProyecto = e =>{
        guardarProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    }
    //  Cuando el usuario envia un proyecto en

    const onSubmitProyecto = e =>{
        e.preventDefault();

        //validar el proyectos

        if(nombre === ''){
            mostrarError()
            return;
        }

        //agregar al state
        agregarProyecto(proyecto)

        // Reiniciar el formular
        guardarProyecto({
            nombre:''
        })
    }

    // mostrat formulario
    const onClick = () => {
        mostrarFormulario();
    }
    return (
        <Fragment>
        <button
            type="button"
            className="btn btn-block btn-primario"
            onClick={onClick}
        >Nuevo Proyecto</button>
        { formulario ? 
        <form
            className="formulario-nuevo-proyecto"
            onSubmit={onSubmitProyecto}
        >
            <input 
                type="text"
                value={nombre}

                className="input-text"
                placeholder="Nombre Proyecto"
                name="nombre"
                onChange={onChangeProyecto}
            />
             <input 
                type="submit"
                className="btn btn-ptimario btn-bloc"
                value="Agregar Proyecto"
            />

        </form>
         : null
       
        }

        {errorFormulario ? <p className="mensaje error">El nombre es obligatorio</p> : null}
        </Fragment>
     
    );
};

export default NuevoProyecto;