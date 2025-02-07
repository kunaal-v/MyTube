import axios from "axios";
import { useEffect, useState } from "react";
import MyVideoPreview from "./MyVideoPreview";
function MyVideos() {

    const [videos,setVideos]=useState([]);
    const [isLoading,setIsLoading]=useState(false)
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
        <h1>{isLoading&&"Loading...."}</h1>
       {videos.length!=0&&videos.map((video)=> {
        return <li key={video._id}><MyVideoPreview video={video}/></li>
       })}
    </div>
  )
}

export default MyVideos