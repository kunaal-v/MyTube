import mongoose from "mongoose";
import commentModel from "../Models/Comment.Model.js";

export async function addComment(req,res) {
    try {
        const user=req.user;
        const videoId=req.params.id;
        const newComment= new commentModel({
            _id:new mongoose.Types.ObjectId,
            user_id:user._id,
            video_id:videoId,
            text:req.body.text
        })
        const addedComment=await newComment.save();
        return res.status(200).json([{message:"comment added"},{comment:addedComment}])
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error});
    }
    
}

export async function updateComment(req,res) {

    try {
        const user=req.user;
        const commentId=req.params.id;
        const comment=await commentModel.findById(commentId);
        console.log(user._id,comment.user_id._id);
        if(user._id!=comment.user_id._id)
        {
            return res.status(404).json({message:"you are not authorized to delete this comment"})
        }
        comment.text=req.body.text;
        const updatedComment=await comment.save();
        return res.status(200).json([{message:"comment updated"},{comment:updateComment}])
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error})
    }
    
}

export async function deleteComment(req,res) {
    try {
        const user=req.user;
        const commentId= req.params.id;
        const comment= await commentModel.findById(commentId)
        if(comment.user_id!=user._id)
        {
            return res.status(404).json({message:"you are not authorized to delete this comment"})
        }
        await commentModel.findByIdAndDelete(commentId);
        return res.status(200).json({message:"comment deleted"})
    } catch (error) {
        console.log(error)
    }
    
}

export async function fetchcommentByVideo(req,res) {
    try {
        const videoId=req.params.id;
        const comments=await commentModel.find({video_id:videoId}).populate("user_id","userName logoUrl")
        return res.status(200).json([{message:"all Comments"},{comments:comments}])
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error})
    }
    
}