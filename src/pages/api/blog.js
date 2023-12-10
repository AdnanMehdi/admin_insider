import Mongoose from '../../../helpers/mongoose'
import Blog from '../../../models/blog'

Mongoose()

export default async (req,res)=>{

    switch(req.method){
        case "GET":
            await getAllBlogs(req,res)
            break
        case "POST":
            await AddBlogs(req,res)
            break
        
    }
}

const getAllBlogs = async (req, res) =>{
    Blog.find().sort({_id:-1}).then(blogs=>{
        res.status(200).json(blogs)
    })
}

const AddBlogs = async (req,res)=>{
    const {title,tags,banner,content} = req.body

    if(!title || !tags || !banner || !content ){
        res.status(422).json({error:"Empty Fields"})
    }

    const blog = await new Blog({
        title,
        tags,
        banner,
        content
    }).save()
    res.status(201).json(blog)

}