import express from "express";
import { addVideo, updateVideo,deleteVideo, likeVideo,dislikeVideo,views, fetchAllVideos, myVideos } from "../Controllers/Video.Controller.js";
import { verifyToken } from "../MiddleWares/VerifyToken.js";

const videoRoutes=express.Router();

videoRoutes.post("/video",verifyToken,addVideo);
videoRoutes.put("/:id",verifyToken,updateVideo);
videoRoutes.delete("/:id",verifyToken,deleteVideo);
videoRoutes.put("/like/:id",verifyToken,likeVideo);
videoRoutes.put("/dislike/:id",verifyToken,dislikeVideo);
videoRoutes.put("/views/:id",views);
videoRoutes.get("/allVideos",fetchAllVideos);
videoRoutes.get("/myVideos",verifyToken,myVideos);
export default videoRoutes;
