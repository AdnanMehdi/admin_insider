import Mongoose from '../../../helpers/mongoose'
import Video from '../../../models/video'

Mongoose()

export default async (req,res) =>{
    switch(req.method){
        case "GET":
            await GetVideos(req,res)
            break
        case "POST":
            await AddVideo(req,res)
            break
        
    }

}

const GetVideos = async(req,res) =>{
    Video.find().sort({_id:-1}).then(videos=>{
        res.status(200).json(videos)
    })
}

const AddVideo = async (req,res) =>{
    const {title,link,tags} = req.body

    if(!title || !link || !tags){
        res.status(422).json({error:"Empty Fields"})
    }

    const video = await new Video({
        title,
        link,
        tags
    }).save()
    res.status(201).json(video)
}