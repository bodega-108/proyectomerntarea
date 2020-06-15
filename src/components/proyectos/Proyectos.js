import React,{useContext, useEffect} from 'react'
import Sidebar from '../layaout/Sidebar'
import Barra from '../layaout/Barra'
import Formtarea from '../tarea/Formtarea'
import ListadoTreas from '../tarea/ListadoTreas'
import AuthContext from '../../context/autenticacion/authContext'

export const Proyectos = () => {

    // Extraer la informacion de autenticacion
    const authContext = useContext(AuthContext);
    const {usuarioAutenticado} = authContext

    useEffect(()=>{
        usuarioAutenticado();
                // eslint-disable-next-line

    },[])

    return (
        <div className="contenedor-app">
           <Sidebar />

            <div className="seccion-principal">
                <Barra />
                <main>
                    <Formtarea />
                    <div className="contenedor-tareas">
                        <ListadoTreas />
                    </div>
                </main>
            </div>           
        </div>
    );
};
export default Proyectos;