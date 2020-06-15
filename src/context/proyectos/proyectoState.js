import React,{useReducer} from 'react';
import clienteAxios from '../../config/axios'

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import {
        FORMULARIO_PROYECTO, 
        OBTENER_PROYECTO,
        AGREGAR_PROYECTO,
        VALIDAR_FORMULARIO,
        PROYECTO_ACTUAL,
        ELIMINAR_PROYECTO,
        PROYECTO_ERROR
    } from '../../types/index'




const ProyectoState = props =>{

    const inialState = {
        proyectos :[],
        formulario: false,
        errorFormulario: false,
        proyecto: null,
        mensaje:null
    }

    // Dispach para ejecutar las acciones
    const [state, dispatch]= useReducer(proyectoReducer, inialState)
    // Serie de funciones para el CRUD
    const mostrarFormulario = () =>{
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    //Otener los proyectos 
    const obtenerProyectos = async () =>{
       try {
           const resultado = await clienteAxios.get('/api/proyectos')
        dispatch({
            type:OBTENER_PROYECTO,
             payload:resultado.data.proyectos
         })
       } catch (error) {
           console.log(error)
       }
    }

    // Agregar nuevo proyectos
    const agregarProyecto = async proyecto =>{

        try {
            const resultado =  await clienteAxios.post('/api/proyecto',proyecto)
            console.log(resultado)
            dispatch({
                type:AGREGAR_PROYECTO,
                payload:resultado.data
            })
        } catch (error) {
            console.log(error)
        }
    
    }

    // validar formulario
    const mostrarError = () =>{
            dispatch({
                type: VALIDAR_FORMULARIO
            })
    }
    //Selecciona el proyecto que el usuario dio click
    const proyectoAtual = proyectoId =>{
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }
    // Eliminar proyecto
    const eliminarProyecto =async proyectoId =>{
        try {
             await clienteAxios.delete(`/api/proyecto/${proyectoId}`);
       
             dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })
            } catch (error) {
            const alerta={
                msg:'Hubo un error',
                categoria:'alerta-error'
            }
            dispatch({
                type:PROYECTO_ERROR,
                payload:alerta
            })
        }

        
    }
    
    return(
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorFormulario : state.errorFormulario,
                proyecto:state.proyecto,
                mensaje : state.mensaje,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoAtual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState;