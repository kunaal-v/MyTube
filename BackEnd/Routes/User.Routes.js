import express from "express";
import { verifyToken } from "../MiddleWares/VerifyToken.js";
import {register,login,createChannel, subscribeChannel,unsubscribeChannel, userInfo} from "../Controllers/User.Controller.js"
const userRouter=express.Router();

userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.put("/createChannel",verifyToken,createChannel);
userRouter.put("/subscribe/:id",verifyToken,subscribeChannel);
userRouter.put("/unsubscribe/:id",verifyToken,unsubscribeChannel);
userRouter.get("/user",verifyToken,userInfo)
export default userRouter;