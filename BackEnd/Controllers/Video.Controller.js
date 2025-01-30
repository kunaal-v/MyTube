import mongoose from "mongoose";
import videoModel from "../Models/Video.Model.js";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
dotenv.config();

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET,
})
export async function addVideo(req,res){
try {
    const {category,tags,title,description}=req.body;
    const uploadedVideo=await cloudinary.uploader.upload(req.files.video.tempFilePath,{
        resource_type:"video"
    })
    const uploadedThumbnail=await cloudinary.uploader.upload(req.files.thumbnail.tempFilePath)
    const newVideo= new videoModel({

        user_id:req.user._id,
        title:title,
        description:description,
        category:category,
        tags:tags.split(","),
        videoUrl:uploadedVideo.secure_url,
        videoId:uploadedVideo.public_id,
        thubmailId:uploadedThumbnail.secure_url,
        thubmailUrl:uploadedThumbnail.public_id,
    })
    const savedVideo=await newVideo.save();
    res.status(200).json([{message:"video uploaded"},{video:savedVideo}])
    
} catch (error) {
 console.log(error)
 return res.status(500).json({message:error})   
}
}

