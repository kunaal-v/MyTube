
import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import userRouter from "../BackEnd/Routes/User.Routes.js";
import cors from "cors";
import videoRoutes from "./Routes/Video.Routes.js";
import commentRoutes from "./Routes/Comment.Routes.js";
dotenv.config();

const app = express();

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected with database");
  })
  .catch((err) => {
    console.log(err);
  });

// CORS Configuration
const corsOptions = {
  origin: ['http://localhost:5173'], // Allow frontend running on localhost:5173
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions)); // Apply CORS middleware with options

// Body parsing and file upload handling
app.use(bodyParser.json());
app.use(fileUpload({
    limits: { fileSize: 100 * 1024 * 1024 }, 
  useTempFiles: true,
  tempFileDir: '/tmp/', // Updated to a directory that's accessible
}));

// API Routes
app.use(userRouter);
app.use(videoRoutes);
app.use(commentRoutes);

// Server export
export default app;
