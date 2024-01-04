import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';  
import './styles.css';

function RegisterPage(){
    const {
        register, 
        handleSubmit, 
        formState:{errors},
    } = useForm();
    const {signup, isAuthenticated, errors: registerErrors} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthenticated)
          navigate("/tasks"); //cambio de pestaña 
    },[isAuthenticated]);

    const onSubmit = handleSubmit(async (values) => {
        signup(values);
    });

    return(
        <div className='items-center justify-center flex h-[calc(70vh-100px)]'>
            <div className='bg-zinc-200 max-w-md w-full p-10 rounded-md li text-slate-700 leading-snug'>
            {
                registerErrors.map((error, i) => (
                    <div className='bg-red-500 text-sm p-2 text-white my-1' key={i}>
                        {error}
                    </div>
                ))
            }
            <form onSubmit={onSubmit}>
                <label class="block">
                <span class="ml-1 mt-3 after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-bold text-slate-700">
                    Usuario
                </span>
                <input type="text" {...register("username",{required:true})}
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
                placeholder='Ingresa un nombre de usuario'
                />
                </label>
                {
                    errors.username && (
                        <p className='text-red-600 text-sm	'>El username es requerido</p>
                    )
                }
                <label class="block">
                <span class="ml-1 mt-3 after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-bold text-slate-700">
                    Email
                </span>
                <input type="email" {...register("email",{required:true})} 
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
                placeholder="you@example.com" />
                </label>
                {
                    errors.email && (
                        <p className='text-red-600 text-sm	'>El correo es requerido</p>
                    )
                }
                <label class="block">
                <span class="ml-1 mt-3 after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-bold text-slate-700">
                    Contraseña
                </span>
                <input type="password" {...register("password",{required:true})}
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
                placeholder='Ingresa una contraseña'
                />
                </label>
                {
                    errors.password && (
                        <p className='text-red-600 text-sm	'>La contraseña es requerida</p>
                    )
                }
                <button 
                className="mt-3 flex w-full justify-center rounded-md bg-sky-600 px-3 py-2 text-sm font-bold leading-6 text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                type="submit">
                    Enviar
                </button>
            </form>
            <p className='flex gap-x-2 justify-between my-5 text-gray-700'>
                ¿Ya tienes una cuenta?
                <Link to = "/login" className='text-sky-600'>Iniciar sesión</Link>
            </p>
            </div>
        </div>
    )
}

export default RegisterPage