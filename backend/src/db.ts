import mongoose, { model } from "mongoose"
import { required } from "zod/v4/core/util.cjs"
const Schema=mongoose.Schema
const ObjectId=Schema.ObjectId


const UserSchema=new Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})


const ContentSchema=new Schema({
    link:String,
    title:String,
    tags:[{type:ObjectId,ref:'tags'}],
    userId:{type:ObjectId,ref:'users',required:true}
})


const LinkSchema=new Schema({
    hash:{type:String,required:true},
    useId:{type:ObjectId,ref:"users",required:true}
})

const TagSchema=new Schema({
    title:{type:String,required:true,unique:true}
})

export const Usermodel=mongoose.model('users',UserSchema)
export const Contentmodel=mongoose.model('contents',ContentSchema)
export const Tagsmodel=mongoose.model('tags',TagSchema)
export const LinkModel=mongoose.model('links',LinkSchema)
