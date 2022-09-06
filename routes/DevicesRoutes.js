import express from "express"
import { 
  AgregarDevice,
  SearchDevices,
  EditarDevice,
  SelectDevice,
  DeleteDevice,
  DeviceForDashBoard
 } from "../controllers/DevicesController.js";
import checkAuth from "../middleware/checkAuth.js"


const router=express.Router();


router.route("/Agregar")
  .post(checkAuth,AgregarDevice)
  
router.get("/:Type",checkAuth,SearchDevices);

router.route(`/:Type/:Id`)
  .get(checkAuth,SelectDevice)
  .post(checkAuth,EditarDevice)
  .delete(checkAuth,DeleteDevice);

router.get(`/Dash/:Type/:token`,checkAuth,DeviceForDashBoard)


export default router;