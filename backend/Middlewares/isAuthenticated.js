import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../Models/UserModel.js";
dotenv.config();

const isAuthenticated=async(req,res,next)=>{
    const token=req.cookies.token || req.headers.token;
    console.log(token,'Hi token')
    if(token){
       const decode =jwt.verify(token,process.env.JWT_SECRET);
       const user=await UserModel.findById(decode._id);
       req._id=user._id;
       next();
    }else{
        res.status(401).json({
            success:false,
            message:"Please login first"
        })
    }
}

export default isAuthenticated;