import mongoose from 'mongoose';
const conectarDB=async()=>{
    try{
        const conection=await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
    }catch(error){
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
    
};


export default conectarDB;