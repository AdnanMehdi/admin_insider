import mongoose, { mongo } from "mongoose";

function connectDB(){
    if(mongoose.connections[0].readyState){
        console.log("already Connected")

        return
    }
    mongoose.connect(process.env.MONGOURI,{
        dbName:'deen',
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    mongoose.connection.on('connected',()=>{
        console.log("connected to mongo")
    })
    mongoose.connection.on('error',(err)=>{
        console.log("error with connection")
    })
}

export default connectDB;