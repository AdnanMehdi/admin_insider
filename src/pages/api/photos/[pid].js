import Photo from '../../../../models/photo'


export default async (req,res)=>{

    switch(req.method){
        case "GET":
            await getPhoto(req,res)
            break
        case "DELETE":
            await deletePhoto(req,res)
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