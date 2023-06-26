import jwt  from "jsonwebtoken";
import User from "../models/userModel.js";


const protectedRoute=async(req,res,next)=>{
    const token=req.cookies.jwt;

    if(token){
        try{
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            req.user=await User.findById(decode.userId).select('-password');
            next();
        }catch(err){
            console.log(err);
            res.status(404).json({error:"not authroized"});

        }
    }else{
        res.status(404).json({error:"not authroized"});

    }
}

export default protectedRoute;