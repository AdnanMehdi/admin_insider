import Mongoose from '../../../helpers/mongoose'
import Photo from '../../../models/photo'

Mongoose()

export default async (req,res) => {

    switch(req.method){
        case "GET":
            await AllPhotos(req,res)
            break
        case "POST":
            await AddPhotos(req,res)
            break
    }
}

const AllPhotos = async(req,res)=>{
    Photo.find().sort({_id:-1}).then(photos=>{
        res.status(200).json(photos)
    })
}

const AddPhotos = async(req,res) =>{
    const {mediaUrl} = req.body

    if(!mediaUrl){
        res.status(422).json({error:"no Url"})
    }

    const photos = await new Photo({
        mediaUrl,
    }).save()
    res.status(201).json(photos)

}