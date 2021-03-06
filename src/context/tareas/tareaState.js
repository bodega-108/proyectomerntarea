import React,{useReducer} from 'react';
import TareaContext from './tareaContext';

import tareaReducer from './tareaReducer';

import {
            TAREAS_PROYECTO, 
            AGREGAR_TAREA, 
            VALIDAR_TAREA, 
            ELIMINAR_TAREA,
            TAREA_ACTUAL,
            ACTUALIZAR_TAREA,
            LIMPIAR_TAREA    
        } from '../../types';
import clienteAxios from '../../config/axios'

const TareaState = props =>{
    const initialState ={

    tareasproyecto:[],
    errortarea:false,
    tareaSeleccionada:null

    }
    // Crear dispatch y state 
    const [state, dispatch] = useReducer(tareaReducer, initialState);

    // Crear las funciones

    // Obtener las tareas de un proyecto
    const obtenerTareas = async proyecto =>{
        try {
            const resultado =  await clienteAxios.get('/api/tareas',{params:{proyecto}});

            dispatch({
                type:TAREAS_PROYECTO,
                payload:resultado.data.tareas
            })
        } catch (error) {
            console.log(error)
        }
   
    };

    // AGREGAR NUEVA TAREA AL PROYECTO
    const agregarTarea = async tarea =>{
        try {
            const resultado =  await clienteAxios.post('/api/tarea',tarea);
        } catch (error) {
            console.log(error.response)
        }
        dispatch({
            type:AGREGAR_TAREA,
            payload: tarea
        })
    }
    // valida y muestra un error en caso de que sea necesario
    const validarTarea = () =>{
        dispatch({
            type: VALIDAR_TAREA

        })
    }
    // ELIMINAR TAREAS POR SU id
    const eliminarTarea = async (id,proyecto) =>{
        try {
            await clienteAxios.delete(`/api/tarea/${id}`,{params:{proyecto}})
            dispatch({

                type: ELIMINAR_TAREA,
                payload: id
            })
            
        } catch (error) {
            console.log(error.response)
            
        }
      
    }


    //  EXTRAER UNA TAREA PARA EDICIOn
    const guardarTareaActual = tarea =>{
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    // Edita o modifica una tareas

    const actualizarTarea =async tarea =>{

        try {
            const resultado = await clienteAxios.put(`/api/tarea/${tarea._id}`,tarea)
          console.log(resultado)
            dispatch({
                type:ACTUALIZAR_TAREA,
                payload: resultado.data
            })
        } catch (error) {
            console.log(error.response)
        }
        
    }
    // ELIMINA LA TAREA tareaSeleccionada
    const limpiarTarea = ()=>{
        dispatch({
            type:LIMPIAR_TAREA
        })
    }
    return(
       <TareaContext.Provider
        value={{ 
            tareasproyecto: state.tareasproyecto,
            errortarea: state.errortarea,
            tareaSeleccionada: state.tareaSeleccionada,
            obtenerTareas,
            agregarTarea,
            validarTarea,
            eliminarTarea,
            guardarTareaActual,
            actualizarTarea,
            limpiarTarea
        }}
       >
           {props.children}
       </TareaContext.Provider> 
    )
}

export default TareaState;