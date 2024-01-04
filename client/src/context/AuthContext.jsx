import { createContext, useContext, useState, useEffect } from "react";
import {registerRequest,loginRequest, verifyTokenRequest} from '../api/auth.js'
import Cookies from 'js-cookie'

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error.response);
            setErrors(error.response.data);
        }
    };

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            console.log(res);
            setIsAuthenticated(true);
            setUser(res.data);
        } catch (error) {
            console.log(error);
            if(Array.isArray(error.response.data)){
                return setErrors(error.response.data);
            }
            setErrors([error.response.data.message])
        }
    }

    const logout = () => {
        Cookies.remove("token");
        setIsAuthenticated(false);
        setUser(null);
    }

    useEffect(()=>{
        if(errors.length > 0){
            const timer = setTimeout(()=>{
                setErrors([])
            },5000) //despues de 5 segundos elimina setErrors
            return () => clearTimeout(timer) //elimina el timer
        }
    },[errors])

    useEffect(() => {  //instalacion de 'js-cookie' para su funcionamiento
        async function checkLogin() {
            const cookies = Cookies.get(); //Lectura de las cookies
            
            if(!cookies.token){ //primero comprueba sino hay un token >>
                setIsAuthenticated(false); // auntenticacion falsa >>
                setLoading(false); //no esta cargando >>
                return setUser(null); //no hay usuario
            }
            try { 
                const res = await verifyTokenRequest(cookies.token); //verifica el token enviandolo al banckend
                if(!res.data) { //respuesta del backend
                    setIsAuthenticated(false); //autenticacion falsa >>
                    setLoading(true); //no esta cargando 
                    return;
                }  
                //si esta respondiendo el dato entonces el usuario está ahí >>
                setIsAuthenticated(true); // autenticacion verdadera >>
                setUser(res.data); //guarda en el estado del usuario >>
                setLoading(false); //terminó de cargar

            } catch (error) {
                console.log(error);
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }
        }
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider value={{
            signup,
            signin,
            logout,
            loading,
            user,
            isAuthenticated,
            errors,
        }}>
            {children}
        </AuthContext.Provider>
    );
};