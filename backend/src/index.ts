import express from "express"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import {z} from "zod"
import bcrypt from "bcrypt"
import cors from "cors"
import dotenv from 'dotenv'
import { userMiddleware } from "./middleware"
dotenv.config();
import { Usermodel,Contentmodel } from "./db"
import { mongo } from "mongoose"



const app=express()
app.use(express.json())
app.use(cors())

app.post('/api/v1/signup',async (req,res)=>{

    const valid=z.object({
        username:z.string().min(3),
        password:z.string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")

    })

    const parsed=valid.safeParse(req.body)
    if(!parsed.success){
        res.status(411).send("Invalid input")
        return
    }
    const {username,password}=req.body
    if(await Usermodel.findOne({username})){
        res.status(403).json("User already exists with this username")
        return
    }
    try{
    const hash=await bcrypt.hash(password,10)
    await Usermodel.create({
        username,
        password:hash
    })
    res.status(200).send("Signed up")
    }catch(e){
        res.status(500).json({
            message:"Server errror"
        })
    }
})


app.post('/api/v1/signin',async (req,res)=>{
    const {username,password}=req.body
    const user=await Usermodel.findOne({username:username})
    if(!user){
        res.send("wrong username")
        return
    }
    try{
        const pass=user.password
        const hash=await bcrypt.compare(password,pass)
        if(!hash){
            res.send("Incorrect password");
            return;
        }
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        const token=jwt.sign({
            id:user._id
        },process.env.JWT_SECRET)
        res.json({
            token,
            message:"You are signed in"
        })
        
    }catch(e){
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

app.use(userMiddleware)
app.post('/api/v1/content',async (req,res)=>{
    const {link,title}=req.body
    await Contentmodel.create({
        link,
        title,
         //@ts-ignore
        userId:req.userId,
        tags:[]
    })
    return res.json({
        message:"content added"
    })
})



app.get('/api/v1/content',async (req,res)=>{
    //@ts-ignore
    const userId=req.userId
    const content=await Contentmodel.findOne({userId}).populate("userId","username")
    res.json({
        content
    })
})



app.delete('/api/v1/content',async (req,res)=>{
    const contentId=req.body.contentId
    await Contentmodel.deleteMany({
        contentId,
        //@ts-ignore
        userId:req.userId
    })
})



app.post('/api/v1/brain/share',(req,res)=>{

})


app.get('/api/v1/brain/:sharelink',(req,res)=>{

})

async function main() {
    if(!process.env.MONGOOSE_URL){
        throw new Error("MONGOOSE_URL is not defined in environment variables");
    }
    await mongoose.connect(process.env.MONGOOSE_URL)
    app.listen(3000)
}

main()