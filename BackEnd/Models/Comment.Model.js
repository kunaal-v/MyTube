import mongoose from "mongoose";

const commentSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    user_id:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"User"},
    video_id:{type:String,required:true},
    text:{type:String,required:true},
},{timestamps:true})

const commentModel= mongoose.model("comment",commentSchema);
export default commentModel;