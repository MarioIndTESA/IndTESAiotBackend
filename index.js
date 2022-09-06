import cors from 'cors';
import express from 'express';
import conectarDB from './config/db.js';
import dotenv from "dotenv";
import usuariosRoutes from "./routes/usuariosRoutes.js"
import DashboardRoutes from "./routes/DashboardsRoutes.js"
import DevicesRoutes from "./routes/DevicesRoutes.js"
console.clear()
const app=express();
app.use(express.json())
dotenv.config();
conectarDB();

//cors
const WhiteList=[process.env.FRONTEND_URL];
const corsOptions={
    origin:function(origin,callback){
        if(WhiteList.includes(origin)){
            callback(null,true)
        }else
        {
            callback(new Error('Error de cors'))
        }
    }
}
app.use(cors(corsOptions));

//routing
app.use('/api/usuarios',usuariosRoutes);
app.use('/api/Dashboards',DashboardRoutes);
app.use('/api/Devices',DevicesRoutes);

const PORT=process.env.PORT || 4000;
const servidor=app.listen(PORT,()=>{
    console.log(`Puerto en ${PORT}`)
})

//Socket.io
import { Server } from 'socket.io';
import { MongoClient } from 'mongodb';

const io=new Server(servidor,{
    pingTimeout:60000,
    cors:{
        origin:process.env.FRONTEND_URL,
    },
});

io.on('connection',(socket)=>{
    console.log("Conectado a socket.io ...")
    
    client.on('message', (topic, payload) => {
        //console.log(payload.toString())
        Destruct(payload.toString(),socket);
    })
    socket.on("datas",(D)=>{
        
        if(D.token && D.type)
        {
            const MongoDB = new MongoClient(process.env.MONGO);
            const Busqueda=async()=>{
                await MongoDB.connect();
                const db=MongoDB.db(D.type);
                const collection=db.collection(D.token);
                const findResult = await collection.find({}).toArray();
                //console.log('Found documents =>', findResult);
                socket.emit(`${D.token}/${D.type}`,findResult);
            }
            Busqueda()
                .then(console.log)
                .catch(console.error)
                .finally(() => MongoDB.close());
        }
})
})





import * as mqtt from "mqtt";
let client=mqtt.connect(`mqtt://${process.env.MQTT_BROKER}`);
const topic=`SF`;
//----------------------
client.on('connect', () =>{
    client.subscribe([topic]);
})/*
client.on('message', (topic, payload) => {
    Destruct(payload.toString());
})*/
//----------------------
const Destruct= (msg,socket)=>{
    const MSGlength=msg.length;
    let Fecha="";
    let Flujo="";
    let Promedio="";
    let Total="";
    let Token="";
    let Seccion=0;
    for(let i=0;i<MSGlength;i++){
        if(msg[i]==="/"){
            Seccion++;
        }else{
            if(Seccion===0 )
            {
                Fecha+=msg[i];
            }
            if(Seccion===1)
            {
                Flujo+=msg[i];
            }
            if(Seccion===2)
            {
                Promedio+=msg[i];
            }
            if(Seccion===3)
            {
                Total+=msg[i];
            }
            if(Seccion===4)
            {
                Token+=msg[i];
            }
        }
    }
    socket.emit(`${Token}/SF/actual`,{
        Fecha,
        Flujo,
        Promedio,
        Total,
        Token
    });
}