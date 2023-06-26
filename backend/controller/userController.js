import User from "../models/userModel.js";
import genrateToken from "../utils/genrateToken.js";
import jwt from "jsonwebtoken";
export const getAllUsers=async(req,res)=>{
    try{
        const users=await User.find();
        res.status(200).json({users})
    }catch(err){
        console.log(err)
    }
}
export const login=(async(req,res)=>{
    const {email,password}=req.body;

    try{
        const user=await User.findOne({email});
      
        if(user && (await user.matchPassword(password))){
          let userId=user._id
            const token=jwt.sign({userId},process.env.JWT_SECRET,{
                expiresIn: '30d',
            })
            res.cookie('jwt',token,{
                httpOnly:true,
                secure:true,
                sameSite:"None",
                maxAge:30*24*60*60*1000
            })
    
                res.status(200).json(  {user} )
        }else{
        res.status(404).json({error:"invalid user"})
        }
    }catch(err){
        console.log(err)
    }
})

export const signup= (async(req,res)=>{
    const {name,email,password}=req.body;

    const existuser=await User.findOne({email});

    if(existuser){
        res.status(404).json({error:"user already exist"});
    }else{
    try{
        const user=await User.create({
            name,
            email,
            password
        })

        if(user){
            let userId=user._id
            const token=jwt.sign({userId},process.env.JWT_SECRET,{
                expiresIn: '30d',
            })
            res.cookie('jwt',token,{
                httpOnly:true,
                secure:true,
                sameSite:"None",
                maxAge:30*24*60*60*1000
            })
    
            res.status(200).json({user})
        }
        res.status(404).json({error:"failed to create user"});
    }catch(err){
        console.log(err);
    }
}
})

export const logout=(req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    });

    res.status(200).json({ message: 'Logged out successfully'})

}
