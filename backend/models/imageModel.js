import mongoose from "mongoose";

const imageSchema=new mongoose.Schema({
    caption:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Types.ObjectId, 
        ref:"User",
        required:true
    }
},{
    timestamps:true
})

const imageModel=mongoose.model("Image",imageSchema)

export default imageModel;
