import Mongoose from '../../../helpers/mongoose'
import Admin from '../../../models/admin'
import bcrypt from 'bcryptjs'

Mongoose()

export default async (req,res) =>{

    switch(req.method){
        case "GET":
            await getAdmins(req,res)
            break
        case "POST":
            await addAdmins(req,res)
            break
    }

}

const getAdmins= async(req,res)=>{
    Admin.find().then(admins=>{
        res.status(200).json(admins)
    })
}

const addAdmins = async(req,res)=>{
    const {name,email,password,role} = req.body

    if(!name || !email || !password || !role){
        res.status(422).json({error:"error"})
    }
    const user = await Admin.findOne({email})
    if(user){
        res.status(422).json({error:"already exist with this email."})
    }else{
        const hashedPass = await bcrypt.hash(password,12)

        const admin = await new Admin({
            name,
            email,
            password:hashedPass,
            role
        }).save()
        res.status(201).json(admin)
    }

    
}