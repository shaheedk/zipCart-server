import { NextFunction,Request ,Response} from "express";
import jwt from "jsonwebtoken";

const adminAuth=async(req:Request,res:Response,next:NextFunction)=>{
try {
    const{token}=req.headers;
    if(!token){
        return res.json({success:false ,message:"Not Authorized Login Again"})
    }
    const token_decode=jwt.verify(token,process.env.JWT_SECRET)
    if(token_decode!==process.env.ADMIN_EMAIL||process.env.ADMIN_PASSWORD){
        return res.json({success:false ,message:"Not Authorized Login Again"})

    }
    next()
} catch (error) {
     if (error instanceof Error) {
      res.status(400).json({ success: false, message: error.message });
    } else {
      res
        .status(400)
        .json({ success: false, message: "An unknown error occurred" });
    }
}
}