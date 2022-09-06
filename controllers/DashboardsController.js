import Dashboard from "../models/Dashboard.js";

const GetDashboards=async(req,res)=>{
    const dashboards=await Dashboard.find().where('Own').equals(req.usuario);
    res.json(dashboards)
};

const NewDashboards=async(req,res)=>{
    const dash=new Dashboard(req.body);
    dash.Own=req.usuario._id;
    try {
        const dashSave=await dash.save();
        res.json(dashSave);
    } catch (error) {
        res.status(404).json({msg:"Ocurrio un error, intente mas tarde"})
    }
};

const ViewDashboard=async(req,res)=>{
    const {id}=req.params;
    const viewdash=await Dashboard.findById(id);

    if(!viewdash)
    {
        const error=new Error("No se encontro ningun dashboard")
        return res.status(404).json({msg:error.message})
    }
    if(viewdash.Own.toString()===req.usuario._id.toString())
    {
        res.json(viewdash)
    }else{
        const error=new Error("Accion no valida")
        return res.status(401).json({msg:error.message})
    }
}

const EditDashboards=async(req,res)=>{
    const {id}=req.params;
    const viewdash=await Dashboard.findById(id);

    if(!viewdash)
    {
        const error=new Error("No se encontro ningun dashboard")
        return res.status(404).json({msg:error.message})
    }
    if(viewdash.Own.toString()!==req.usuario._id.toString())
    {
        const error=new Error("Accion no valida")
        return res.status(401).json({msg:error.message})
    }
    viewdash.nombre=req.body.nombre || viewdash.nombre
    viewdash.token=req.body.token || viewdash.token
    viewdash.type=req.body.type || viewdash.type
    viewdash.Grafica=req.body.Grafica || viewdash.Grafica
    try {
       const DashSaving=await viewdash.save()
       res.json(DashSaving)
    } catch (error) {
        
    }
};
const DeleteDashboards=async(req,res)=>{
    const {id}=req.params;
    const viewdash=await Dashboard.findById(id);

    if(!viewdash)
    {
        const error=new Error("No se encontro ningun dashboard")
        return res.status(404).json({msg:error.message})
    }
    if(viewdash.Own.toString()!==req.usuario._id.toString())
    {
        const error=new Error("Accion no valida")
        return res.status(401).json({msg:error.message})
    }

    try {
        await viewdash.delete();
        res.json({msg:"Dashboard eliminado"})
    } catch (error) {
        
    }
};

export {
    GetDashboards,
    NewDashboards,
    EditDashboards,
    DeleteDashboards,
    ViewDashboard
}

