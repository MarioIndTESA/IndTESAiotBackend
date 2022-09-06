import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import {RegistroEmail,ForgotPasswordEmail} from "../helpers/emails.js"
const register= async (req,res)=>{
    const {email}=req.body;
    const ExistUser=await Usuario.findOne({email});
    if(ExistUser){
        const error=new Error('Usuario ya registrado');
        return res.status(400).json({msg:error.message});
    }
    try{
        const usuario=new Usuario(req.body);
        usuario.token=generarId();
        await usuario.save();
        RegistroEmail({
            email:usuario.email,
            nombre:usuario.nombre,
            token:usuario.token
        })
        res.json({msg:'Usuario creado correctamente, revisa tu email para confirmar tu cuenta'})

    }catch(error){
        console.log(error)
    }
}


const autenticar=async(req,res)=>{
    const {email,password}=req.body;
    const usuario=await Usuario.findOne({email});
    if(!usuario)
    {
        const error=new Error("El usuario no existe");
        return res.status(404).json({msg:error.message})
    }
    if(!usuario.confirmado)
    {
        const error=new Error("Tu cuenta no esta confirmada");
        return res.status(403).json({msg:error.message})
    }
    if(await usuario.comprobarPassword(password))
    {
        res.json({
            _id:usuario._id,
            nombre:usuario.nombre,
            email:usuario.email,
            token:generarJWT(usuario._id)
        })
    }else
    {
        const error=new Error("La contraseña es incorrecta");
        return res.status(403).json({msg:error.message})
    }
}

const confirmar= async (req,res)=>{
    const {token}=req.params
    const usuarioConfirmar=await Usuario.findOne({token});
    if(!usuarioConfirmar)
    {
        const error=new Error("Token no valido");
        return res.status(403).json({msg:error.message})
    }
    try{
        usuarioConfirmar.confirmado=true;
        usuarioConfirmar.token="";
        await usuarioConfirmar.save();
        res.json({msg:"Usuario confirmado"})
    }catch(error){

    }
}

const OlvidePassword= async (req,res)=>{
    const {email}=req.body;
    const usuario=await Usuario.findOne({email});
    if(!usuario)
    {
        const error=new Error("El usuario no existe");
        return res.status(404).json({msg:error.message})
    }
    try{
        usuario.token=generarId();
        await usuario.save();
        ForgotPasswordEmail({
            email:usuario.email,
            nombre:usuario.nombre,
            token:usuario.token
        });
        res.json({msg:"Se envio un email con las instrucciones"})
    }catch(error){

    }

}
const comprobarToken= async(req,res)=>{
    const {token}=req.params;
    const tokenValidate=await Usuario.findOne({token});
    if(tokenValidate){
        res.json({msg:"Token Valido"})
    }else
    {
        const error=new Error("No tienes permiso para realizar esta accion");
        return res.status(403).json({msg:error.message})
    }
}

const NewPassword=async(req,res)=>{
    const {token}=req.params;
    const {password}=req.body;
    const usuario=await Usuario.findOne({token});
    if(usuario){
        usuario.password=password;
        usuario.token="";
        var msg;
        try {
            if(usuario.confirmado==false)
            {
                msg="Contraseña modificada correctamente y correo validado";
                usuario.confirmado=true;
            }else
            {
                msg="Contraseña modificada correctamente";
            }
            await usuario.save();
            res.json({msg})
        } catch (error) {
            
        }

        
    }else
    {
        const error=new Error("No tienes permiso para realizar esta accion");
        return res.status(403).json({msg:error.message})
    }
}


const perfil=async(req,res)=>{
    const {usuario}=req;
    res.json(usuario);
}
export {
    register,
    autenticar,
    confirmar,
    OlvidePassword,
    comprobarToken,
    NewPassword,
    perfil
}