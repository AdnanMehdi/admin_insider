import mongoose from "mongoose"

const VideoSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
    },
    link: {
        type:String,
        required: true,
    },
    tags:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    priority:{
        type:Boolean,
        required:true,
        default:false
    },
    status:{
        type:String,
        required:true,
        default:"pending",
        enum:["pending","approved"]
    }
},{timestamps:true});

export default mongoose.models.video || mongoose.model('video',VideoSchema)