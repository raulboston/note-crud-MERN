import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {TOKEN_SECRET} from '../config.js'
import {createAccesToken} from '../libs/jwt.js'

export const register = async (req, res) => {
    const{email,password,username} = req.body;
    try{
        const userFound = await User.findOne({email});
        if(userFound) return  res.status(400).json({message: ['El correo ingresado está en uso']}); 

        const passwordHash = await bcrypt.hash(password,10); //encriptar la contraseña
        const newUser = new User({
            username, 
            email, 
            password:passwordHash,
        });
        const userSaved = await newUser.save(); //guardar el usuario
        const token = await createAccesToken({id:userSaved._id}) //crear el token
        res.cookie("token",token); //establecer en cookie

        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        }); //datos que necesita conocer el front-end
    }catch(error){
        res.status(500).json({message: error.message});
    }
}
export const login = async (req, res) => {
    const{email,password} = req.body;
    try{
        const userFound = await User.findOne({email});
        if(!userFound) return res.status(400).json({message:"User not found"});

        const isMatch = await bcrypt.compare(password,userFound.password); //coincidencia de password
        if(!isMatch) return res.status(400).json({message: "Invalid credentials"});

        const token = await createAccesToken({id:userFound._id}) //crear el token
        res.cookie('token',token); //establecer en cookie
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        }); //datos que necesita conocer el front-end
    }catch(error){
        res.status(500).json({message: error.message});
    }
}
export const logout = (req, res) => {
    res.cookie('token',"",
        {expires: new Date(0)}
    )
    return res.sendStatus(200);
}
export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id);

    if(!userFound) return res.status(400).json({message: "User not found"});

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,            
        updatedAt: userFound.updatedAt,
    })
}

export const verifyToken = async (req, res) => {
    const {token} = req.cookies

    if(!token) return res.status(401).json({message: "Unauthorized"});

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if(err) return res.status(401).json({message: "Unauthorized"});

        const userFound = await User.findById(user.id);
        if(!userFound) return res.status(401).json({message: "Unauthorized"});

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        });
    });
} //esta peticion se hace cada que el usuario carga la pagina por primera vez