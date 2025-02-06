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
export async function addVideo(req, res) {
    try {
        const { category, tags, title, description } = req.body;
        const user = req.user;

        // Ensure the video and thumbnail files exist
        if (!req.files.video || !req.files.thumbnail) {
            return res.status(400).json({ message: req.files.video});
        }

        const uploadedVideo = await cloudinary.uploader.upload(req.files.video.tempFilePath, {
            resource_type: "video"
        });

        const uploadedThumbnail = await cloudinary.uploader.upload(req.files.thumbnail.tempFilePath);

        const newVideo = new videoModel({
            user_id: user._id,
            title: title,
            description: description,
            category: category,
            tags: tags.split(","),
            videoUrl: uploadedVideo.secure_url,
            videoId: uploadedVideo.public_id,
            thubmailUrl: uploadedThumbnail.secure_url,
            thubmailId: uploadedThumbnail.public_id,
        });

        const savedVideo = await newVideo.save();
        return res.status(200).json([{ message: "Video uploaded successfully" }, { video: savedVideo }]);

    } catch (error) {
        console.error('Error uploading video:', error);
        return res.status(500).json({ message: "error" || 'Internal Server Error' });
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
            return res.status(200).json([{message:"video updated"},{video:savedVideo}])
        }
        else{
            return res.status(404).json({message:"you don't have permisson to update video"})
        }
    } catch (error) {
       console.log(error);
       return res.status(500).json({message:error})
    }
}

export async function deleteVideo(req,res)
{
    try {
        const user=req.user;
        const videoId=req.params.id;
        const video=await videoModel.findById(videoId);
        if(user._id==video.user_id)
        {
            await cloudinary.uploader.destroy(video.thubmailId)
            await cloudinary.uploader.destroy(video.videoId,{resource_type:"video"})
            const DeletedVideo=await videoModel.findByIdAndDelete(videoId);
            return res.status(200).json([{message:"video deleted"},{deletedVideo:DeletedVideo}])
        }
        else{
            return res.status(404).json({message:"you don't have permisson to delete video"})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error})
    }
}


export async function likeVideo(req,res) {
    try {
        const user=req.user;
        const videoId=req.params.id;
        const video= await videoModel.findById(videoId);
        
        if(video.likedBy.includes(user._id))
        {
            return res.status(400).json({message:"already liked"});
        }
        if(video.dislikedBy.includes(user._id))
        {
            video.dislikes--;
            video.dislikedBy=video.dislikedBy.filter(id=>id.toString()!=user._id)
        
        }
        video.likedBy.push(user._id);
        video.likes++;
        const savedVideo=await video.save();
        return res.status(200).json([{message:"video liked"},{video:savedVideo}])
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error});
    }
    
}

export async function dislikeVideo(req,res) {
    try {
        const user=req.user;
        const videoId=req.params.id;
        const video= await videoModel.findById(videoId);
        
        if(video.dislikedBy.includes(user._id))
        {
            return res.status(400).json({message:"already disliked"});
        }
        if(video.likedBy.includes(user._id))
            {
                video.likes--;
                video.likedBy=video.likedBy.filter(id=>id.toString()!=user._id)
            }
        video.dislikedBy.push(user._id);
        video.dislikes++;
        const savedVideo=await video.save();
        return res.status(200).json([{message:"video disliked"},{video:savedVideo}])
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error});
    }
    
}


export async function views(req,res) {
    try {
        const videoId=req.params.id;
        const video=await videoModel.findById(videoId);
        video.views++;
        const savedvideo=await video.save();
        return res.status(200).json([{messgae:"views updated"},{video:savedvideo}])
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error})
    }
    
}

export async function fetchAllVideos(req, res) {
    try {
        const videos = await videoModel.find().populate("user_id", "channelName logoUrl");
        console.log(videos);
        if (videos.length === 0) {
            return res.status(200).json({ allvideos: "empty" });
        }
        return res.status(200).json({ allvideos: videos });
    } catch (error) {
        console.error('Error fetching all videos:', error); // more detailed error logging
        return res.status(500).json({ message: error.message });
    }
}



