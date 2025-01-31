import express from "express";
import { verifyToken } from "../MiddleWares/VerifyToken.js";
import { addComment, updateComment ,deleteComment,fetchcommentByVideo} from "../Controllers/Comment.Controller.js";
const commentRoutes=express.Router();
commentRoutes.post("/addComment/:id",verifyToken,addComment);
commentRoutes.put("/updateComment/:id",verifyToken,updateComment);
commentRoutes.delete("/deleteComment/:id",verifyToken,deleteComment);
commentRoutes.get("/comments/:id",fetchcommentByVideo);
export default commentRoutes