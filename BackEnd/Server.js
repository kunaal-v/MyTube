import http from "http";
import app from "../BackEnd/app.js"
const server= http.createServer(app);
const port=process.env.PORT ;
server.listen(port,()=>{
    console.log("app is running on port: "+port);

});