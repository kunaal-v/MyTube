import PropTypes from "prop-types";
Comment.propTypes={
    comment:PropTypes.object,
    
};
function Comment(props) {
    const comment=props.comment
    // console.log(comment)
  return (
    <div className="Comment_container">
        <div>
                <img src={comment.user_id.profile} alt="profile" className="comment_Profile" />
        </div>
        <div>
            <h3>{comment.user_id.userName}</h3>
            <p >{comment.text}</p>
        </div>
    </div>
  )
}

export default Comment