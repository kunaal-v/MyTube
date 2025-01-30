import express from "express";
import { addVideo } from "../Controllers/Video.Controller.js";
import { verifyToken } from "../MiddleWares/VerifyToken.js";

const videoRoutes=express.Router();

videoRoutes.post("/video",verifyToken,addVideo)
export default videoRoutes;
