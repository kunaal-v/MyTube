import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown,faShare} from '@fortawesome/free-solid-svg-icons';
import MyVideos from "./MyVideos";
import axios from "axios";
import Comment from "./Comment";
// import { text } from "@fortawesome/fontawesome-svg-core";

function VideoDetails() {
  const [video, setVideo] = useState([]);
  const [isExpended,setIsExpended]=useState(true)
  const [render,setRender]=useState(true);
  const params = useParams();
  const [words,setWords]=useState("");
  const [comment,setComment]=useState("")
  const [comments,setComments]=useState([]);
  const [userId,setUserId]=useState("");

  function toggleExpended(){
    setIsExpended(!isExpended)
  }
  function handleLike()
  {
    const accessToken=localStorage.getItem("accessToken");
    axios.put(`https://mytube-jjn3.onrender.com/like/${params.id}`,{} ,{
      headers: {
          Authorization: `JWT ${accessToken}`,
      },
      
    })
    .then((res)=>{console.log(res);
      setRender(!render)})
    .catch(err=>console.log("Err",err))
    
  }
  function handleDislike()
  {
    const accessToken=localStorage.getItem("accessToken");
    axios.put(`https://mytube-jjn3.onrender.com/dislike/${params.id}` ,{},{
      headers: {
          Authorization: `JWT ${accessToken}`,
      },
      
    })
    .then((res)=>{console.log(res);
      setRender(!render)})
    .catch(err=>console.log("Err",err))
  }
  function handleShare()
  {
      alert("share functionality is not available... we are working on it")
  }
  function handleSubscribe()
  {
    const accessToken=localStorage.getItem("accessToken");
    axios.put(`https://mytube-jjn3.onrender.com/subscribe/${video[0].user_id._id}` ,{},{
      headers: {
          Authorization: `JWT ${accessToken}`,
      },
      
    })
    .then((res)=>{console.log(res);
      setRender(!render)})
    .catch(err=>console.log("Err",err))
  }
  function handleAddComment(e)
  {
    e.preventDefault();
    const accessToken=localStorage.getItem("accessToken");
    const requestBody ={ text: comment };
    if (!comment.trim()) {
      return;
    }
    axios.post(`https://mytube-jjn3.onrender.com/addComment/${params.id}`,requestBody ,{
      headers: {
          Authorization: `JWT ${accessToken}`,
      },
      
  })
  .then((res)=>{console.log(res);
    setComment("");
    setRender(!render)})
  .catch(err=>console.log("Err",err))
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
        setWords(oneVideo[0].description.split(" "))
        setVideo(oneVideo);
        
      })
      .catch((error) => {
        console.error("Error fetching video data:", error);
      });

      axios.get(`https://mytube-jjn3.onrender.com/comments/${params.id}`)
      .then(res=>{
        setComments(res.data[1].comments);
      })
      const accessToken=localStorage.getItem("accessToken")
      axios.get("https://mytube-jjn3.onrender.com/user",{
        headers: {
            Authorization: `JWT ${accessToken}`,
        }})
    .then(res=>{
      setUserId(res.data.user._id);
    })
      .catch(err=>console.log(err))
  }, [params.id, video._id,render]); // Re-run effect when video ID changes
  useEffect(()=>{
    const timeOut=setTimeout(() => {
      axios.get(`https://mytube-jjn3.onrender.com/views/${params.id}`)
        .then(res => {
          console.log(res);
          setRender(!render)
              })
        .catch(err => {
          console.log("Error fetching view count:", err);
        });
    }, 10000); 

    return ()=>{
      clearTimeout(timeOut);
    }
  },[params.id,render])
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
                                <button className="Subscribe_btn" onClick={handleSubscribe}>{video[0].user_id.subscribedBy.includes(userId)?"Subscribed":"Suscribe"}</button>
                              </div>
                              <div>
                                <button className="like_btn" onClick={handleLike}> <FontAwesomeIcon icon={faThumbsUp} size="lg" style={{color:"rgb(147, 147, 147)"}}/> {video[0].likes>0&&video[0].likes}</button>
                                <button className="dislike_btn" onClick={handleDislike}> <FontAwesomeIcon icon={faThumbsDown} size="lg" style={{color:"rgb(147, 147, 147)"}}/> {video[0].dislikes>0&&video[0].dislikes}</button>
                                <button className="share_btn" onClick={handleShare}> <FontAwesomeIcon icon={faShare} size="lg" style={{color:"rgb(147, 147, 147)"}}/> Share</button>
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
                        <div className="Comments_container">
                                <form action="" className="Comments_form" onSubmit={handleAddComment}>
                                    <input type="text" 
                                    className="comment_input"
                                    placeholder="Add comment..."
                                    value={comment}
                                    onChange={(e)=>setComment(e.target.value)}
                                    />
                                    <button className="Comment_btn" type="submit">Add</button>
                                </form>
                                <div>
                                  {comments.map(comment=><li key={comment._id}><Comment comment={comment}/></li>)}
                                </div>
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
