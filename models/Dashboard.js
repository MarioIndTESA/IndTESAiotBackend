import mongoose from "mongoose";
const proyectoSchema=mongoose.Schema({
    nombre:{
        type:String,
        trim:true,
        required:true
    },
    token:{
        type:String,
        required:true
    },
    Grafica:{
        type:Array
    },
    Own:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Usuario",
    },
    type:{
        type:String,
        required:true
    }
},
{
    timestamps:true
}
);

const Dashboard=mongoose.model("Dashboards", proyectoSchema);

export default Dashboard;