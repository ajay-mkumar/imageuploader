import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/config.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'


const app=express();
app.use(cors({credentials: true, origin: "http://localhost:3000",}))


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended:true,limit:'50mb'}));
app.use(cookieParser());

dotenv.config();
connectDb();




app.use('/api/post',imageRouter)
app.use('/api/user',userRouter);

app.listen(5000,()=>{
    console.log("server started...")
})