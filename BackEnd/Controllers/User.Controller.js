import bcrypt from "bcrypt";
import mongoose from "mongoose";
import userModel from "../Models/User.Model.js";
import dotenv from "dotenv";
import { v2 as cloudinary } from 'cloudinary';
dotenv.config();
    cloudinary.config({
        cloud_name:process.env.CLOUD_NAME,
        api_key:process.env.API_KEY,
        api_secret:process.env.API_SECRET,
    })
export async function register(req,res)
{
    
    try
    {
        
        const user=await userModel.find({email:req.body.email});
        if(user.length>0)
        {
            return res.status(409).json({message:"user already exist with this email address"})
        }
        const hashPass=await bcrypt.hash(req.body.password,10);
        
        const newUser= new userModel({
            _id: new mongoose.Types.ObjectId,
            email:req.body.email,
            phone:req.body.phone,
            password:hashPass,
            userName:req.body.userName
        })
        const savedUser=await newUser.save();
        res.status(200).json({newUser:savedUser})
        
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message:err})
    }
}

