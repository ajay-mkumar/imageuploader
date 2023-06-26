import mongoose from "mongoose";

const connectDb=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("mongo connected");
    }catch(err){
        console.log(err)
    }
}

export default connectDb;