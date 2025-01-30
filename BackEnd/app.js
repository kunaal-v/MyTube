import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import userRouter from "../BackEnd/Routes/User.Routes.js"
dotenv.config();


const app=express();
mongoose.connect(process.env.MONGO_URI)
.then((res)=>{
    console.log("conected with database");
})
.catch((err)=>{
    console.log(err);
})

app.use(bodyParser.json());
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/temp/"
}))

app.use(userRouter);
export default app;