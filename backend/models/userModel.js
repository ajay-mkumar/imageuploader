import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    images:
       [{ type:mongoose.Types.ObjectId,
        ref:"Image"}]
    
})

userSchema.methods.matchPassword=async function(enteredpassword){
    return await bcrypt.compare(enteredpassword,this.password);
}
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSaltSync(10);
    this.password=await bcrypt.hash(this.password,salt)
})



const User=mongoose.model("User",userSchema);

export default User;