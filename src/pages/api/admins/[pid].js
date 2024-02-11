import Admin from "models/admin"
import bcrypt from 'bcryptjs'
import Mongoose from '../../../../helpers/mongoose'


Mongoose()

export default async (req,res)=>{
    switch(req.method){
        case "DELETE":
            await deleteAdmin(req,res)
            break
        case "PUT":
            await updateAdmin(req,res)
            break;
        case "POST":
            await updatePass(req,res)
            break;
    }
}

const deleteAdmin = async(req,res)=>{
    const {pid} = req.query
    await Admin.findByIdAndDelete({_id:pid})
    
    res.status(200).json({})

}

const updateAdmin = async (req,res) =>{
    const {pid} = req.query
    const {email,password} = req.body

    try{
        const user = await Admin.findById({_id:pid})
        if(user){
            const passMatch = await bcrypt.compare(password,user.password)
            if(passMatch){
                const admin = await Admin.findByIdAndUpdate({_id:pid},{
                    $set:{
                        email
                    }
                })
                res.status(200).json(admin)
            }else{
                return res.status(401).json({error:"Password not matched"})
            }
            
        }
    }catch(error){
        return res.status(422).json({error:"error"})
    }
}

const updatePass = async(req,res)=>{
    const {pid} = req.query
    const {password,newPass} = req.body

    try{
        const user = await Admin.findById({_id:pid})
        if(user){
            const passMatch = await bcrypt.compare(password,user.password)
            if(passMatch){
                const hashedPass = await bcrypt.hash(newPass,12)

                const admin = await Admin.findByIdAndUpdate({_id:pid},{
                    $set:{
                        password:hashedPass,
                    }
                })
                res.status(200).json(admin)
            }else{
                return res.status(401).json({error:"Wrong Password!"})
            }
            
        }
    }catch(e){
        return res.status(422).json({error:"error"})
    }
}