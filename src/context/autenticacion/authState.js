import React,{useReducer} from 'react'
import authContext from './authContext';
import authReducer from './authReducer';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth'

import {REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION} from '../../types/index' 

    const AuthState = props =>{
        const initialState ={
            token: localStorage.getItem('token'),
            autenticado:null,
            usuario:null,
            mensaje:null,
            cargando:true
        }
        const [state, dispatch]= useReducer(authReducer,initialState)
        
        const registrarUsuario = async datos =>{
            try {
                const respuesta = await clienteAxios.post('/api/usuario',datos);
                // console.log(respuesta)
                dispatch({
                    type:REGISTRO_EXITOSO,
                    payload:respuesta.data
                })
                // Oteber usuarioAutenticado
                usuarioAutenticado();
            } catch (error) {
                console.log(error.response.data.msg);
                const alerta = {
                    msg:error.response.data.msg,
                    categoria: 'alerta-error'
                }
                dispatch({
                    type:REGISTRO_ERROR,
                    payload:alerta
                })
            }
        }

        // Retorna el usuario autenticado
        const usuarioAutenticado = async ()=>{
            const token = localStorage.getItem('token');

            if(token){
                // Tdo :Funcion paa enviar el token por headers
                tokenAuth(token);
            }
            try {
                const respuesta = await clienteAxios.get('/api/')
                
                // console.log(respuesta);
                dispatch({
                    type:OBTENER_USUARIO,
                    payload: respuesta.data.usuario
                })
            } catch (error) {
                console.log(error.response);
                dispatch({
                    type:LOGIN_ERROR
                })
            }
        }
        // CUANDO EL USUARIO INICIA SESION
        const iniciarSesion = async datos=>{
            try {
                const respuesta = await clienteAxios.post('/api/auth',datos);
                dispatch({
                    type: LOGIN_EXITOSO,
                    payload: respuesta.data
                })

                 // Oteber usuarioAutenticado
                 usuarioAutenticado();
                
            } catch (error) {
                console.log(error.response.data.msg);
                const alerta = {
                    msg:error.response.data.msg,
                    categoria: 'alerta-error'
                }
                dispatch({
                    type:REGISTRO_ERROR,
                    payload:alerta
                })
                
            }
        }
        // Cerra la sesion del usuarioAutentic
        const cerraSesion = ()=>{
            dispatch({
                type:CERRAR_SESION
            })
        }
        return(
            <authContext.Provider
                value={{
                    token : state.token,
                    autenticado: state.autenticado,
                    usuario: state.usuario,
                    mensaje:state.mensaje,
                    cargando: state.cargando,
                    registrarUsuario,
                    iniciarSesion,
                    usuarioAutenticado,
                    cerraSesion
                }}
            >
                {props.children}
            </authContext.Provider>
        )
    }
    export default AuthState;