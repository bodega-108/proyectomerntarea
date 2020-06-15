import React,{useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertaContext'
import authContext from '../../context/autenticacion/authContext'



export const NuevaCuenta = (props) => {
    //Extraer los valores del context 
    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    const AuthContext = useContext(authContext);
    const { mensaje,autenticado,registrarUsuario } =AuthContext;

    // En caso de que el usuario se haya autenticado o registrado o sea un registro duplicado
    useEffect(()=>{
        if(autenticado){
            props.history.push('/proyectos')
        }
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        // eslint-disable-next-line

    },[ mensaje, autenticado, props.history])
    //sTATE PARA INICIAR SESION
    const [usuario, guardarUsuario]=useState({
        nombre:'',
        email:'',
        password:'',
        confirmar:''
    })

    const {nombre,email, password,confirmar} = usuario
    const onChange = (e) => {
            guardarUsuario({
                ...usuario,
                [e.target.name]:e.target.value
            })
    }
    // Cuando el usuario quiere iniciar sesion

    const onSubmit = (e) =>{
        e.preventDefault();

        // Validar que no haya campos vacios
        if(nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
            return
        }
        // password minimo sea de 6 caracteres
        if(password.length < 6){
            mostrarAlerta('El password debe ser al menos de 6 caracteres', 'alerta-error')
            return

        }
        // //verificacion de password
        // if(password.length !== confirmar){
        //     mostrarAlerta('Los password no son iguales', 'alerta-error')
        //     return

        // }
        
        // console.log(nombre,email,password)
        // return
        //Pasarlo al action
        console.log(nombre,email,password)
        registrarUsuario({
            nombre,
            email,
            password
        })

    }

    return (
        <div className="form-usuario">
            <div className="contenedor-form sombra-dark">
                <h1>Crear cuenta</h1>
                {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) :null}

                <form 
                    onSubmit={onSubmit}
                >
                      <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        
                        <input type="text"
                               id="nombre"
                               name="nombre" 
                               value={nombre}
                               placeholder="Tu nombre"
                               onChange={onChange}/>
                    </div>

                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input type="email"
                               id="email"
                               name="email" 
                               value={email}
                               placeholder="Tu email"
                               onChange={onChange}
                        
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input type="password"
                               id="password"
                               name="password" 
                               value={password}
                               placeholder="password"
                               onChange={onChange}
                        
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar Password</label>
                       
                        <input type="password"
                               id="confirmar"
                               name="confirmar" 
                               value={confirmar}
                               placeholder="confirmar"
                               onChange={onChange}
                        
                        />
                    </div>


                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Registrarme" />

                    </div>
                </form>
                <Link to={'/'}
                className="enlace-cuenta"
                >Volver ha iniciar sesion</Link>
            </div>
        </div>
    );
};
export default NuevaCuenta;