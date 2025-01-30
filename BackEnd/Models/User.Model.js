import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    userName:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:Number,required:true},
    password:{type:String,required:true},
    profile:{type:String},
    logoUrl:{type:String},
    logoId:{type:String},
    channelName:{type:String},
    subscribers:{type:Number,default:0},
    subscribedChannels:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}]
    
},{timestamps:true})

const userModel=mongoose.model("User",userSchema);
export default userModel;