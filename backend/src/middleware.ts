import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken"

export function userMiddleware(req:Request,res:Response,next:NextFunction){
    const token=req.headers["token"] as string | undefined
    if(!token){
        throw new Error("no token in headers");
    }
     if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    const decode=jwt.verify(token,process.env.JWT_SECRET) 
    if(decode){
        //@ts-ignore
        req.userId=decode.id;
        next()
    }
    else{
        res.status(403).json({
            message:"you are not loggedin "
        })
    }
}