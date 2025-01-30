import express from "express";
import { addVideo, updateVideo } from "../Controllers/Video.Controller.js";
import { verifyToken } from "../MiddleWares/VerifyToken.js";

const videoRoutes=express.Router();

videoRoutes.post("/video",verifyToken,addVideo);
videoRoutes.put("/:id",verifyToken,updateVideo)
export default videoRoutes;
