import { useEffect, useState } from "react"
import axios from "axios";
import VideoPReview from "./VideoPreview";

function AllVideos() {
    const [videos,setVideos]=useState([]);
    const [allVideos,setAllVideos]=useState([])
    const [isLoading,setIsLoading]=useState(false)
    function handleFilter(value)
    {
        let filterVideos = [];
        if (value === "Study") {
            filterVideos = allVideos.filter((video) => video.category === "Study");
        } else if (value === "Entertainment") {
            filterVideos = allVideos.filter((video) => video.category === "Entertainment");
        } else if (value === "All") {
            filterVideos = allVideos;  
        } else if (value === "Others") {
            filterVideos = allVideos.filter((video) => video.category === "Others");
        } else if (value === "Songs") {
            filterVideos = allVideos.filter((video) => video.category === "Songs");
        } else if (value === "Developer") {
            filterVideos = allVideos.filter((video) => video.category === "Developer");
        }
        setVideos(filterVideos)
        

    }
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
                setAllVideos(res.data.allvideos)
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
        <div className="Filter_btns_container">
            <button className="Filter_btn" onClick={()=>handleFilter("All")}>All</button>
            <button className="Filter_btn" onClick={()=>handleFilter("Study")}>Study</button>
            <button className="Filter_btn" onClick={()=>handleFilter("Entertainment")}>Entertainment</button>
            <button className="Filter_btn" onClick={()=>handleFilter("Developer")}>Developer</button>
            <button className="Filter_btn" onClick={()=>handleFilter("Songs")}>Songs</button>
            <button className="Filter_btn" onClick={()=>handleFilter("Others")}>Others</button>
        </div>
         <div className="Video_page"  >
         <h1>{isLoading&&"Loading...."}</h1>
          {videos.length!=0&&videos.map((video)=> {
           return <li key={video._id}><VideoPReview video={video}/></li>
          })}
         </div>
       </div>
  )
}

export default AllVideos