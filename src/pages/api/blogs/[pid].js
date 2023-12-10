import Blog from '../../../../models/blog'

export default async (req,res)=>{

    switch(req.method){
        case "GET":
            await getBlog(req,res)
            break
        case "DELETE":
            await deleteBlog(req,res)
            break
        case "PUT":
            await updateBlog(req,res)
            break;
    }

}

const getBlog = async (req,res) =>{
    const {pid} = req.query
    const data = await Blog.findOne({_id:pid})

    res.status(200).json(data)

}

const deleteBlog = async (req,res) =>{
    const {pid} = req.query
    await Blog.findByIdAndDelete({_id:pid})

    res.status(200).json({})
}

const updateBlog = async (req,res) =>{
    const {pid} = req.query
    const {title,tags,content,status} = req.body

    try{
        const blogs = await Blog.findByIdAndUpdate({_id:pid},{
            $set:{
                title,tags,content,status
            }
        })
        res.status(200).json(blogs)
    }catch(error){
        return res.status(422).json({error:"error"})
    }
}