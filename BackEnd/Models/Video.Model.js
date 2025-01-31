import mongoose, { Schema } from "mongoose";
const videoSchema= new mongoose.Schema({
    
    title:{type:String,required:true},
    description:{type:String,required:true},
    user_id:{type:String,requuired:true},
    thubmailUrl:{type:String,required:true},
    thubmailId:{type:String,required:true},
    videoUrl:{type:String,required:true},
    videoId:{type:String,required:true},
    category:{type:String,required:true},
    tags:[{type:String}],
    likes:{type:Number,default:0},
    likedBy:[{type:String}],
    dislikes:{type:Number,default:0},
    dislikedBy:[{type:String}],
    views:{type:Number,default:0}
    },{timestamps:true})

const videoModel=mongoose.model("video",videoSchema);
export default videoModel;