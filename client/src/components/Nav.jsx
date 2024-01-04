import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"


function Navbar(){
    const{isAuthenticated, logout, user} = useAuth();
    return(
        <nav className = "bg-gray-800 flex justify-between py-4 px-10 h-30 items-center ">

            <Link to=
                {isAuthenticated ? '/tasks': '/'}
            >
                <h1 className="text-2xl text-white font-bold">Tareas</h1>
            </Link> 

            <ul className=" flex gap-x-2 items-center text-white">
                {isAuthenticated ? (
                    <>
                    <li className="font-bold text-xl">
                        BIENVENIDO! {user.username}
                    </li>
                    
                    <li className="flex items-center">
            <Link
                to="/add-task"
                className="bg-yellow-300 font-medium ml-2 px-3 py-2 text-slate-800 rounded-lg hover:bg-yellow-300 hover:text-slate-600 flex items-center"
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-3" // Ajusta el margen aquí para la separación entre el icono y el texto
                >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Nueva nota
            </Link>
            </li>

                    <li>
                        <Link to = '/' 
                        className="font-medium px-3 py-2 text-slate-200 rounded-lg hover:bg-slate-900 hover:text-slate-300"
                        onClick={() => {
                            logout();
                        }}
                        >
                        Cerrar sesión
                        </Link>
                    </li>
                    </>
                ) : (
                    <>
                    <li>
                        <Link to='/login'
                        className="font-medium px-3 py-2 text-slate-200 rounded-lg hover:bg-slate-900 hover:text-slate-300"
                        >Iniciar sesión</Link>
                    </li>
                    <li>
                        <Link to='/register'
                        className="bg-sky-600 font-medium px-3 py-2 text-slate-200 rounded-lg hover:bg-sky-800 hover:text-slate-300"
                        >Crear cuenta</Link>
                    </li>
                    </>
                )}
                
            </ul>
        </nav>
        
    )
}

export default Navbar