import axios from "axios";
import { useEffect, useState } from "react";
import MyVideoPreview from "./MyVideoPreview";
import { Link } from "react-router-dom";
function MyVideos() {

    const [videos,setVideos]=useState([]);
    const [isLoading,setIsLoading]=useState(false)
    const [isChannel,setIsChannel]=useState(false);
    const [isSignIn,setIsSignIn]=useState(false)
    useEffect(()=>
    {
        const accessToken=localStorage.getItem("accessToken");
        axios.get("https://mytube-jjn3.onrender.com/user",{
            headers: {
                Authorization: `JWT ${accessToken}`,
            }})
        .then(res=>{
            if(res.data.user)
            {
                setIsSignIn(true)
            }
            if(res.data.user?.channelName){
                setIsChannel(true);
            }
        })
    },[])
    useEffect(()=>{
        const accessToken=localStorage.getItem("accessToken");
        setIsLoading(true);
        axios.get("https://mytube-jjn3.onrender.com/myVideos", {
            headers: {
                Authorization: `JWT ${accessToken}`,
            },
        })
        .then((res) => {
            setIsLoading(false)
            if(res.data.allvideos){
                // alert("video fetched successfully")
                console.log(res.data.allvideos)
                setVideos(res.data.allvideos)
            }
            console.log("Response:", res);
            // setLoading(false);
        })
        .catch((err) => {
            setIsLoading(false)
            console.log("Error:", err);
            // setLoading(false);
        });
    },[])
  return (
    <div className="MyVideos_Page">
        {isChannel?<div>
            <h1>{isLoading&&"Loading...."}</h1>
            {!isLoading&&videos.length==0&&<div>
                <div>
                You have not uploaded any video yet
                </div>
                <div>
                <Link to="/profile/uploadVideo"><button className="Subscribe_btn">Upload Video</button></Link>
                </div>
                </div>}
            {videos.length!=0&&videos.map((video)=> {
        return <li key={video._id}><MyVideoPreview video={video}/></li>
       })}
        </div>:
       <div>
        {isSignIn?"You don't have channel yet, please create your channel":"Please signIn to see your videos"}
        </div>}
    </div>
  )
}

export default MyVideos