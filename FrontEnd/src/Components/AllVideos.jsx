import { useEffect, useState } from "react"
import axios from "axios";
import VideoPReview from "./VideoPreview";

function AllVideos() {
    const [videos,setVideos]=useState([]);
    const [isLoading,setIsLoading]=useState(false)
    useEffect(()=>{
        setIsLoading(true);
        axios.get("https://mytube-jjn3.onrender.com/allVideos")
        .then((res) => {
            setIsLoading(false)
            console.log(res)
            if(res.data.allvideos){
                // alert("video fetched successfully")
                console.log(res.data.allvideos)
                setVideos(res.data.allvideos)
            }
            console.log("Response:", res);
        })
        .catch((err) => {
            setIsLoading(false)
            console.log("Error:", err);
            // setLoading(false);
        });
    },[])
  return (
   <div className="Video_page">
           <h1>{isLoading&&"Loading...."}</h1>
          {videos.length!=0&&videos.map((video)=> {
           return <li key={video._id}><VideoPReview video={video}/></li>
          })}
       </div>
  )
}

export default AllVideos