import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { useState } from "react";


MyVideoPreview.propTypes={
    video:PropTypes.object,
    
};

function MyVideoPreview(props) {
    const [isLoading,setIsLoading]=useState(false);
    const video=props.video;
    function handleDeleteVideo(videoId)
    {
        const value=confirm("You will not see the video on you channel after deleting")
        if(value)
        {
            setIsLoading(true)
            const accessToken=localStorage.getItem("accessToken")
        axios.delete(`https://mytube-jjn3.onrender.com/${videoId}`,{
            headers: {
                Authorization: `JWT ${accessToken}`,
            },
            
        })
        .then((res)=>{console.log(res)
            setIsLoading(false)
            if(res.data[0].message=="video deleted"){
                // alert("video deleted")
                window.location.reload();
            }
        })
        .catch((err)=>{console.log("err",err)
            setIsLoading(false)
        })
        }
        
    }
   
    
  return (
    <div className="MyVideo_container">
        <Link to={`/dashboard/videoDetails/${video._id}`}><div><img src={video.thubmailUrl} alt=""  width="150px" height="80px" border="1px solid black"/></div></Link>
        <div>
            <h4>{video.title.split(" ").slice(0,6).join(" ")+"..."}</h4>
            <p>
            {video.description.split(" ").slice(0,8).join(" ")+"..."}
            </p>
            <p>{video.views>1000?(video.views)/1000+"k":video.views} views</p>
            <p>{moment(video.createdAt).fromNow()}</p>
        </div>
        <div > 
            
            <Link to={`/profile/editVideo/${video._id}`}><button className="Subscribe_btn">Edit</button></Link>
            
            <button className="Subscribe_btn" onClick={()=>handleDeleteVideo(video._id)}style={{marginLeft:"10px"}}>{isLoading?"Deleting...":"Delete"}</button>
        </div>
    </div>
  )
}

export default MyVideoPreview