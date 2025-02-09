import axios from "axios";
import { useEffect, useState } from "react";
import MyVideoPreview from "./MyVideoPreview";
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