import mongoose from "mongoose";
const SCdeviceSchema=mongoose.Schema({
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
    }
},
{
    timestamps:true
}
);

const DeviceSC=mongoose.model("SCdevices", SCdeviceSchema);

export default DeviceSC;