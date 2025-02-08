import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment"

VideoPReview.propTypes={
    video:PropTypes.object,
    
};

function VideoPReview(props) {
    const video=props.video;
  return (
    <div className="video_Page_preview">
         
        <div>
            <div>
            <Link to={`/dashboard/videoDetails/${video._id}`}><div><img src={video.thubmailUrl} alt=""  width="380px" height="200px" border="1px solid black"/></div></Link>
            </div>  
            <div className="videoDetails_home">
                <div>
                    <img src={video.user_id.logoUrl} alt="" className="channelImageWithVideo"/>
                </div>   
                <div>
                    <h3>{video.title.split(" ").slice(0,6).length>3? video.title.split(" ").slice(0,6).join(" ")+"...":video.title.split(" ").slice(0,6).join(" ")}</h3>
                    <p>{video.user_id.channelName}</p>
                    <p>{video.views} views {moment(video.createdAt).fromNow()}</p>
                </div> 
            </div>
        </div>
    </div>
  )
}

export default VideoPReview