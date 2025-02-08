import mongoose from "mongoose";
import commentModel from "../Models/Comment.Model.js";

export async function addComment(req, res) {
    try {
        // Log the incoming request body
        console.log("Received request body:", req.body); // Debugging line to check the body

        // Check if `text` exists in the body
        const { text } = req.body;
        if (!text || text.trim() === "") {
            return res.status(400).json({ message: "Comment text is required" });
        }

        // Proceed with adding the comment if text is valid
        const user = req.user;
        const videoId = req.params.id;

        const newComment = new commentModel({
            _id: new mongoose.Types.ObjectId(),
            user_id: user._id,
            video_id: videoId,
            text: text,
        });

        const addedComment = await newComment.save();

        return res.status(200).json({ message: "Comment added successfully", comment: addedComment });
    } catch (error) {
        console.log("Error in adding comment:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message, body: req.body });
    }
}


export async function updateComment(req, res) {
    try {
        const user = req.user;
        const user_id = user._id.toString();
        const commentId = req.params.id;

        // Find the comment by ID
        const comment = await commentModel.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // Ensure comment belongs to the authenticated user
        const userID = comment.user_id._id.toString();  // Convert to string to avoid type issues
        if (user_id !== userID) {
            return res.status(403).json({ message: "You are not authorized to update this comment" });
        }

        // Update the comment's text
        comment.text = req.body.text;

        // Save the updated comment
        const updatedComment = await comment.save();

        // Return the updated comment as part of the response
        return res.status(200).json([{ message: "Comment updated successfully" }, { comment: updatedComment }]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message || "Server error" });
    }
}


export async function deleteComment(req,res) {
    try {
        const user=req.user;
        const commentId= req.params.id;
        const comment= await commentModel.findById(commentId)
        if(comment.user_id.toString()!=user._id.toString())
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
        const comments=await commentModel.find({video_id:videoId}).populate("user_id","userName profile")
        return res.status(200).json([{message:"all Comments"},{comments:comments}])
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error})
    }
    
}