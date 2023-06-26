import mongoose from "mongoose";
import imageModel from "../models/imageModel.js";
import User from "../models/userModel.js";

export const getAllImages=async(req,res)=>{
    let data;
    try{
        data=await imageModel.find().populate('user');
        if(!data){
            res.status(404).json({error:"there's nothing to show"})
        }
        return res.status(200).json({data})
    }catch(err){
        console.log(err)
    }
}

export const uploadImages=async(req,res)=>{
    const {caption,image}=req.body;
    const user=req.user._id;
    
    let existuser;
    try{
         existuser=await User.findById(user);
    }catch(err){
        console.log(err)
    }
    if(!existuser){
        res.status(404).json({error:"can't find user by this id"})
    }
    const post=new imageModel({
        caption,
        image,
        user
    })

    try{
        const session=await mongoose.startSession();
        session.startTransaction();
        await post.save({session});
        existuser.images.push(post)
        await existuser.save({session});
        await session.commitTransaction();
    }catch(err){
        console.log(err);
    }
    res.status(200).json({post})

}

export const getImageDetail=async(req,res)=>{
    let data;
 
    try{
        data=await imageModel.findById(req.params.id).populate('user');
        res.status(200).json({data});
    }catch(err){
        console.log(err)
        res.status(404).json({error:"some error occured"})
    }

}

export const deleteImage=async(req,res)=>{
    const id=req.params.id;
    console.log(id)
    let data;
    const existimage=await imageModel.findById(id);

    if(!existimage){
        
        res.status(404).json({error:"can't find any images"})
    }else{
        try{
            data=await imageModel.findByIdAndRemove(id).populate('user')
            await data.user.images.pull(data);
            await data.user.save();
            res.status(202).json({data:"deleted successfully"})
        }catch(err){
            console.log(err);
        }

    
    }
}