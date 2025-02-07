import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";


function VideoDetails() {
  const [video, setVideo] = useState([]);

  const params = useParams();


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
        setVideo(oneVideo);
        console.log(oneVideo)
      })
      .catch((error) => {
        console.error("Error fetching video data:", error);
      });
  }, [params.id]); // Re-run effect when video ID changes

  return (
    <div>
      {video.length !== 0 && (
        <div>
          <h3>Video Details - {params.id}</h3>
          <div>
            <video width="640" height="360" controls>
              <source src={`${video[0].videoUrl}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          
          
        </div>
      )}
    </div>
  );
}

export default VideoDetails;



{/* <div>
            {comments ? (   
              comments.map((comment) => {
                return (<li key={comment._id} style={{listStyle:"none"}}>
                    <div className="comment_container">
                      <div>
                        {/* If this is the comment being edited */}
          //               {commentId === comment._id ? (
          //                 <>
          //                   <input 
          //                     type="text" 
          //                     value={updateComment}  // Use updateComment to store the input value
          //                     onChange={(e) => setUpdateComment(e.target.value)}  // Update the state on input change
          //                   />
          //                   <button onClick={handleUpdateComment}>Update</button>  {/* Call handleUpdateComment on click */}
          //                 </>
          //               ) : (
          //                 // Display the comment if it's not being edited
          //                 <Comment commentData={comment} />
          //               )}
          //             </div>
          //             <div>
          //               {/* Edit and Delete buttons */}
          //               <button onClick={() => handleEditComment(comment)}>Edit</button>
          //               <button onClick={() => handleDeleteComment(comment)}>Delete</button>
          //             </div>
          //           </div>
          //         </li>
          //         )
          //     })
          //   ) : (
          //     <p>No comments available</p>
          //   )}
          // </div> */}