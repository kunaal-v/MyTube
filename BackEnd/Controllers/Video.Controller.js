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
        thubmailUrl:uploadedThumbnail.secure_url,
        thubmailId:uploadedThumbnail.public_id,
    })
    const savedVideo=await newVideo.save();
    res.status(200).json([{message:"video uploaded"},{video:savedVideo}])
    
} catch (error) {
 console.log(error)
 return res.status(500).json({message:error})   
}
}

export async function updateVideo(req,res){
    try {
        const user=req.user;
        const {title, category, description,tags}=req.body;
        const videoId=req.params.id;
        const video=await videoModel.findById(videoId);
        if(user._id==video.user_id)
        {
            if(req.files)
            {
                await cloudinary.uploader.destroy(video.thubmailId);
                const updatedThubmail=await cloudinary.uploader.upload(req.files.thumbnail.tempFilePath);
                const updatedVideo = await videoModel.findByIdAndUpdate(videoId,{
                    title:title,
                    description:description,
                    category:category,
                    tags:tags.split(","),
                    thubmailId:updatedThubmail.public_id,
                    thubmailUrl:updatedThubmail.secure_url,
                },{new:true})
                const savedVideo= await updatedVideo.save();
                res.status(200).json([{message:"video updated"},{video:savedVideo}])

            }
            const updatedVideo = await videoModel.findByIdAndUpdate(videoId,{
            title:title,
            description:description,
            category:category,
            tags:tags.split(",")
            },{new:true})
            const savedVideo= await updatedVideo.save();
            res.status(200).json([{message:"video updated"},{video:savedVideo}])
        }
        else{
            return res.status(404).json({message:"you don't have permisson to update video"})
        }
    } catch (error) {
       console.log(error);
       return res.status(500).json({message:error})
    }
}
