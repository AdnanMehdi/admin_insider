import Mongoose from '../../../../helpers/mongoose'
import Video from '../../../../models/video'

Mongoose()

export default async (req,res)=>{
    switch(req.method){
        case "GET":
            await getVideo(req,res)
            break;
        case "DELETE":
            await deleteVideo(req,res)
            break;
        case "PUT":
            await updateVideo(req,res)
            break;
    }
}

const getVideo = async(req,res)=>{
    const {pid} = req.query
    const data = await Video.findOne({_id:pid})

    res.status(200).json(data)
}

const deleteVideo = async (req,res)=>{
    const {pid} = req.query
    await Video.findByIdAndDelete({_id:pid})

    res.status(200).json({})
}

const updateVideo = async(req,res) =>{
    const {pid} = req.query
    const {title,tags,link,status,priority} = req.body
    try{
        await Video.findByIdAndUpdate({_id:pid},{
            $set:{
                title,
                tags,
                link,
                status,
                priority
            }
        })

        return res.status(200).json({})
    }catch(error){
        return res.status(422).json("error")
    }
}