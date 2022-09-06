import express from "express";
import {register,autenticar,confirmar,OlvidePassword,comprobarToken,NewPassword,perfil} from "../controllers/usuarioController.js"
import checkAuth from "../middleware/checkAuth.js";
const router=express.Router();
//http://localhost:4000/api/usuarios/...
//Autenticacion y registro
router.post('/Register',register);
router.post("/Login",autenticar);
router.get("/confirmar/:token",confirmar);
router.post("/olvide-password",OlvidePassword);
router.route("/olvide-password/:token").get(comprobarToken).post(NewPassword)
router.get('/perfil',checkAuth,perfil)
export default router;