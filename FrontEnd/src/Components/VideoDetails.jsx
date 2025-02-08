import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown,faShare} from '@fortawesome/free-solid-svg-icons';
import MyVideos from "./MyVideos";


function VideoDetails() {
  const [video, setVideo] = useState([]);
  const [isExpended,setIsExpended]=useState(true)
  const params = useParams();
  const [words,setWords]=useState("");
  function toggleExpended(){
    setIsExpended(!isExpended)
  }
  useEffect(() => {
    fetch('https://mytube-jjn3.onrender.com/allVideos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const oneVideo = data.allvideos.filter((video) => video._id === params.id);
        console.log(oneVideo)
        setWords(oneVideo[0].description.split(" "))
        setVideo(oneVideo);
        console.log(oneVideo)
      })
      .catch((error) => {
        console.error("Error fetching video data:", error);
      });
  }, [params.id]); // Re-run effect when video ID changes

  return (
    <div >
      {video.length !== 0 && (
        <div className="video_details_page">
          <div className="video_container">
                        <div>
                              <video width="840" height="480" controls>
                                  <source src={`${video[0].videoUrl}`} type="video/mp4" />
                                  
                                </video>
                        </div>
                        <div className="uderVideo">
                            <div>
                                  <h2>{video[0].title}</h2>
                                  <p>{video[0].views} views</p>
                            </div>
                            <div className="aboutChannel">
                              <img src={video[0].user_id.logoUrl} alt="" className="ChannelLogo" />
                              <div className="channelDetails">
                                <h3>{video[0].user_id.channelName}</h3>
                                {/* {video[0].user_id.ChannelName} */}
                                <button className="Subscribe_btn">Subscribe</button>
                              </div>
                              <div>
                                <button className="like_btn"> <FontAwesomeIcon icon={faThumbsUp} size="lg" style={{color:"rgb(147, 147, 147)"}}/> {video[0].likes>0&&video[0].likes}</button>
                                <button className="dislike_btn"> <FontAwesomeIcon icon={faThumbsDown} size="lg" style={{color:"rgb(147, 147, 147)"}}/> {video[0].dislikes>0&&video[0].dislikes}</button>
                                <button className="share_btn"> <FontAwesomeIcon icon={faShare} size="lg" style={{color:"rgb(147, 147, 147)"}}/> Share</button>
                              </div>
                            </div>
                            <div className="description_container">
                              <p className="description">{isExpended?
                              words.slice(0,30).join(" ")+"..."
                              :video[0].description}
                                {words.length>30&&<span className="view_more_less"
                                onClick={toggleExpended}>{!isExpended?"view less":"view more"}</span>}</p>
                            </div>
                        </div>
                        <div>
                          Comments
                        </div>
          </div>
          <div className="StaticSideVideoDetails">
            <MyVideos/>
          </div>
        </div>
        
      )}
    </div>
  );
}

export default VideoDetails;
