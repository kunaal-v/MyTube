import http from "http";
import dotenv from 'dotenv';
import app from "../BackEnd/app.js"
const server= http.createServer(app);
const port=process.env.PORT ;
dotenv.config();
server.listen(port,()=>{
    console.log("app is running on port: "+port);

});