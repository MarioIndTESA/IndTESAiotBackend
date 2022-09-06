import DeviceSF from "../models/DevicesFlujo.js";
import DeviceSC from "../models/DeviceCorriente.js";
const DBtype=(DB)=>{
    if(DB==="SF"){
        return DeviceSF;
    }
    if(DB==="SC"){
        return DeviceSC;
    }
}
const AgregarDevice=async(req,res)=>{
    const db=DBtype(req.body.type)
    const Search= await db.findOne({"token":`${req.body.token}`})
    if(!Search)
    {
        const error=new Error('No se encontro ningun dispositivo');
        return res.status(404).json({msg:error.message});
    }
    if(Search.UseUser){
        const error=new Error('Este dispositivo ya esta siendo usado por otro usuario');
        return res.status(401).json({msg:error.message});
    }
    Search.Device=req.body.Device;
    Search.NameDevice=req.body.NameDevice;
    Search.UseUser=req.usuario._id;
    await Search.save();
    res.json({msg:'Dispositivo agregado correctamente'})

}

const SearchDevices=async(req,res)=>{
    const {Type}=req.params;
    const db=DBtype(Type)
    const Search = await db.find({"UseUser":req.usuario._id})
    res.json(Search)
}


const EditarDevice=async(req,res)=>{
    const db=DBtype(req.params.Type)
    const ViewDevice=await db.findById(req.params.Id);

    if(!ViewDevice)
    {
        const error=new Error("No se encontro ningun dispositivo")
        return res.status(404).json({msg:error.message})
    }


    if(ViewDevice.UseUser.toString()===req.usuario._id.toString())
    {
        ViewDevice.Device=req.body.Device || ViewDevice.Device
        ViewDevice.NameDevice=req.body.NameDevice || ViewDevice.NameDevice
        ViewDevice.CDI=req.body.CDI || ViewDevice.CDI
        ViewDevice.Tuberia=req.body.Tuberia || ViewDevice.Tuberia
        ViewDevice.Rango=req.body.Rango || ViewDevice.Rango
        try {
            const DeviceSaving=await ViewDevice.save()
            res.json(DeviceSaving)
        } catch (error) {
            error=new Error("Ocurrio algun error intente mas tarde")
            return res.status(404).json({msg:error.message})
        }

    }else{
        const error=new Error("Accion no valida")
        return res.status(401).json({msg:error.message})
    }
}


const SelectDevice=async(req,res)=>{
    const db=DBtype(req.params.Type)
    const ViewDevice=await db.findById(req.params.Id);

    if(!ViewDevice)
    {
        const error=new Error("No se encontro ningun dispositivo")
        return res.status(404).json({msg:error.message})
    }


    if(ViewDevice.UseUser.toString()===req.usuario._id.toString())
    {
        res.json(ViewDevice)
    }else{
        const error=new Error("Accion no valida")
        return res.status(401).json({msg:error.message})
    }
}
const DeleteDevice=async(req,res)=>{
    const db=DBtype(req.params.Type)
    const ViewDevice=await db.findById(req.params.Id);
    if(!ViewDevice)
    {
        const error=new Error("No se encontro ningun dispositivo")
        return res.status(404).json({msg:error.message})
    }


    if(ViewDevice.UseUser.toString()===req.usuario._id.toString())
    {
        ViewDevice.UseUser=undefined
        try {
            await ViewDevice.save()
            res.json({msg:"Dispositivo eliminado correctamente"})
        } catch (error) {
            error=new Error("Ocurrio algun error intente mas tarde")
            return res.status(404).json({msg:error.message})
        }
    }else{
        const error=new Error("Accion no valida")
        return res.status(401).json({msg:error.message})
    }
}

const DeviceForDashBoard= async(req,res)=>{
    const db=DBtype(req.params.Type)
    const ViewDevice=await db.findOne({"token":req.params.token});
    if(!ViewDevice)
    {
        const error=new Error("No se encontro ningun dispositivo")
        return res.status(404).json({msg:error.message})
    }
    
    if(ViewDevice.UseUser.toString()===req.usuario._id.toString())
    {
        res.json(ViewDevice)
    }else{
        const error=new Error("Accion no valida")
        return res.status(401).json({msg:error.message})
    }
}


export {
    AgregarDevice,
    SearchDevices,
    EditarDevice,
    SelectDevice,
    DeleteDevice,
    DeviceForDashBoard
}

