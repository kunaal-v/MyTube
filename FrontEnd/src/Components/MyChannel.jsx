import { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MyVideos from "./MyVideos";
function MyChannel() {
    // const [SignIn,setSignIn]=useState(false)
    const [isChannel,setIsChannel]=useState(false);
    const [logo,setLogo]=useState("");
    const [profile,setProfile]=useState(null);
    const [userName,setUserName]=useState("");
    const [email,setEmail]=useState("");
    const [channelName,setChannelName]=useState("")

    useEffect(()=>
    {
        const accessToken=localStorage.getItem("accessToken");
        axios.get("https://mytube-jjn3.onrender.com/user",{
            headers: {
                Authorization: `JWT ${accessToken}`,
            }})
        .then(res=>{
            if(res.data.user)
            {
                setEmail(res.data.user.email);
                setUserName(res.data.user.userName);
                setLogo(res.data.user.logoUrl);
                setProfile(res.data.user.profile);
                setChannelName(res.data.user.channelName)
            }
            if(res.data.user?.channelName){
                setIsChannel(true);
            }
        })
    },[])
  return (
    <div>
        <div className="Myprofile_Page">
            {isChannel
            ?
            <div className="MyChannel_container">
                <div className="Myprofile_upper">
                    <div>
                    <img src={logo} alt=""  className="MyProfileImage"/>
                    </div>
                    <div className="Myprofile_details">
                        <h2>{channelName}</h2>
                        <p>{email}</p>
                        <button className="Subscribe_btn">Subscribe</button>
                    </div>
                </div>
                <div>
                    <p>Myvideos</p>
                </div>
                <hr />
                <div>
                    <MyVideos/>
                </div>

            </div>
            :
            <div className="Myprofile_container">
                <div className="Myprofile_upper">
                    <div>
                        <img src={profile} alt=""   className="MyProfileImage"/>
                    </div>
                    <div className="Myprofile_details">
                        <p style={{fontSize:"30px", fontWeight:"bold"}}>{userName}</p>
                        <p >{email}</p>

                    </div>
                </div>
                <div className="Myprofile_lower">
                <Link to={`/CreateChannel`}><button className="Subscribe_btn">Create channel</button></Link>  
                </div>  
            </div>}
        </div>
    </div>
  )
}

export default MyChannel