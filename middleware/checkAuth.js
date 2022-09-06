import JWT from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';
const checkAuth=async (req,res,next)=>{
    let Token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            Token=req.headers.authorization.split(' ')[1];
            const decoded=JWT.verify(Token,process.env.JWT_SECRET);
            req.usuario=await Usuario.findById(decoded.id).select("-password -confirmado -token -createdAt -updatedAt -__v");
            return next();
        } catch (error) {
            return res.status(404).json(({msg:"Hubo un error"}))
        }
    }
    if(!Token){
        const error=new Error("Token no valido");
        res.status(401).json({msg:error.message})
    }
    next();
}

export default checkAuth;