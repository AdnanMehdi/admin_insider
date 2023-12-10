import mongoose from "mongoose"

const BlogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    tags:{
        type:String,
        required:true,
    },
    banner:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:"pending",
        enum:["pending","approved"]
    }

},{timestamps:true})

export default mongoose.models.blog || mongoose.model('blog',BlogSchema)