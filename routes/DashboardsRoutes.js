import express from "express"
import {
    GetDashboards,
    NewDashboards,
    EditDashboards,
    DeleteDashboards,
    ViewDashboard
} from "../controllers/DashboardsController.js"
import checkAuth from "../middleware/checkAuth.js"


const router=express.Router();


router.route("/")
  .get(checkAuth,GetDashboards)
  .post(checkAuth,NewDashboards);


router.route('/:id')
  .get(checkAuth,ViewDashboard)
  .put(checkAuth,EditDashboards)
  .delete(checkAuth,DeleteDashboards);

router.post('')




export default router;