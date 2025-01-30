import express from "express";
import { verifyToken } from "../MiddleWares/VerifyToken.js";
import {register,login,createChannel} from "../Controllers/User.Controller.js"
const userRouter=express.Router();

userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.post("/createChannel",verifyToken,createChannel)
export default userRouter;
