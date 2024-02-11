import Photo from '../../../../models/photo'


export default async (req,res)=>{

    switch(req.method){
        case "GET":
            await getPhoto(req,res)
            break
        case "DELETE":
            await deletePhoto(req,res)
            break
        case "PUT":
            await updatePhoto(req,res)
            break
    }

}

const getPhoto = async (req,res) =>{
    const {pid} = req.query
    const data = await Photo.findOne({_id:pid})

    res.status(200).json(data)

}

const deletePhoto = async (req,res) =>{
    const {pid} = req.query
    await Photo.findByIdAndDelete({_id:pid})

    res.status(200).json({})
}

const updatePhoto = async(req,res)=>{
    const {pid} = req.query
    const {link,status,priority} = req.body

    try{
        await Photo.findByIdAndUpdate({_id:pid},{
            $set:{
                mediaUrl:link,
                status,
                priority
            }
        })

        return res.status(200).json({})
    }catch(error){
        return res.status(422).json("error")
    }

}