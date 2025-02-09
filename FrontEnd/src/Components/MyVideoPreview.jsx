import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";

MyVideoPreview.propTypes={
    video:PropTypes.object,
    
};

function MyVideoPreview(props) {

    function handleDeleteVideo(videoId)
    {
        const accessToken=localStorage.getItem("accessToken")
        axios.delete(`https://mytube-jjn3.onrender.com/${videoId}`,{
            headers: {
                Authorization: `JWT ${accessToken}`,
            },
            
        })
        .then((res)=>console.log(res))
        .catch((err)=>console.log("err",err))
        // alert("video deleted"+video._id)
    }
    function handleEditVideo()
    {
        alert("Video updated"+video._id)
    }
    const video=props.video;
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
            <button className="Subscribe_btn" onClick={handleEditVideo}>Edit</button>
            <button className="Subscribe_btn" onClick={()=>handleDeleteVideo(video._id)}style={{marginLeft:"10px"}}>Delete</button>
        </div>
    </div>
  )
}

export default MyVideoPreview