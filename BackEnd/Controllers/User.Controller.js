import bcrypt from "bcrypt";
import mongoose from "mongoose";
import userModel from "../Models/User.Model.js";
import dotenv from "dotenv";
import { v2 as cloudinary } from 'cloudinary';
import jwt from "jsonwebtoken"

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

export async function login(req,res) {
    try {
        const user=await userModel.findOne({email:req.body.email});
        if(!user)
        {
            return res.status(404).json({message:"User not Registred"})
        }
        const validatePassword=await bcrypt.compare(req.body.password,user.password);
        if(!validatePassword)
        {
            return res.status(201).json({message:"password Invalid"})
        }
        const token=jwt.sign({user:user},"Kunal's_Secret_Key",{expiresIn:"365d"})
        res.status(200).json([{user:user},{accessToken:token}])
    } catch (error) {
        return res.status(500).json({message:error})
    }
}

export async function createChannel(req,res) {
    try 
    {
        const {channelName}=req.body;
        const id=req.user._id;
        const uploadedImage=await cloudinary.uploader.upload(req.files.logo.tempFilePath)
        const user = await userModel.findByIdAndUpdate(id, { 
            logoUrl:uploadedImage.secure_url,
            logoId:uploadedImage.public_id,
            channelName:channelName
         });
            const savedUser=await user.save();
            res.status(200).json([{message:"user updated"},{user:savedUser}])
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error})   
    }
}