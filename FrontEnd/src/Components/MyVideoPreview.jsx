import PropTypes from "prop-types";
import { Link } from "react-router-dom";

MyVideoPreview.propTypes={
    video:PropTypes.object,
    
};

function MyVideoPreview(props) {
    const video=props.video;
  return (
    <div className="MyVideo_container">
        <Link to={`/videoDetails/${video._id}`}><div><img src={video.thubmailUrl} alt=""  width="150px" height="80px" border="1px solid black"/></div></Link>
        <div>
            <p>{video.title}</p>
            <p>{video.description}</p>
            <p>{video.views}</p>
            <p>{video.createdAt}</p>
        </div>
        <div>
            <button>Edit</button>
            <button>Delete</button>
        </div>
    </div>
  )
}

export default MyVideoPreview