import mongoose from "mongoose";
const SFdeviceSchema=mongoose.Schema({
    Device:{
        type:String,
        trim:true,
        required:true
    },
    NameDevice:{
        type:String,
        require:true
    },
    UseUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Usuario",
    },
    token:{
        type:String,
        required:true
    },
    CDI:{
        type:Number,
        required:true
    },
    Tuberia:{
        type:String,
        require:true
    },
    Rango:{
        type:Number,
        require:true
    }
},
{
    timestamps:true
}
);

const DeviceSF=mongoose.model("SFdevices", SFdeviceSchema);

export default DeviceSF;