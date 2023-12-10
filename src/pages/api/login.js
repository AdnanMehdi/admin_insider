import { parseCookies } from 'nookies'
import Mongoose from '../../../helpers/mongoose'
import Admin from '../../../models/admin'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

Mongoose()

export default async (req,res) =>{

    switch(req.method){
        case "POST":
            await LoginUser(req,res)
            break
        case "GET":
            await VerifyUser(req,res)
            break
    }

}

const LoginUser = async(req,res)=>{
    const {email,password} = req.body

    try{
        if(!email || !password){
            return res.status(422).json({error:"Empty fields"})
        }
        const admin = await Admin.findOne({email})
        const userData = {}
        if(admin){
            const passMatch = await bcrypt.compare(password,admin.password)
            if(passMatch){
                const token = jwt.sign({userId:admin._id,name:admin.name,role:admin.role},process.env.JWT_SECRET,{
                    expiresIn:"10h"
                })

                const {name,role} = admin

                // res.cookie('jwt',token,{
                //     expiresIn:1,
                //     secure: process.env.NODE_ENV !== "development",
                //     httpOnly: true,
                // })

                res.status(201).json({token,user:{name,role}})
            }else{
                return res.status(401).json({error:"Email or Password doesn't match!"})
            }
        }else{
            return res.status(404).json({error:"Email doesn't exist"})
        }
    }catch(err){
        console.log(err)
    }
}

const VerifyUser = async(req,res)=>{
    const {token} = parseCookies()
    
    const verifyToken = jwt.verify(token,process.env.JWT_SECRET)

    if(!verifyToken){
        res.status(401).json({error:"Unauthenticated"})
    }else{
        res.status(200).json({verifyToken})
    }
}