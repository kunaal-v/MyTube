import { Link } from "react-router-dom";
import logo from "../assets/MyTube_Logo.png";
import { useEffect, useState } from "react";
import axios from "axios";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars} from '@fortawesome/free-solid-svg-icons';
function Header (){
    const [SignIn,setSignIn]=useState(false)
    const [isChannel,setIsChannel]=useState(false);
    const [imageurl,setImageUrl]=useState("");
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
                setSignIn(true);
                setImageUrl(res.data.user.profile);
            }
            if(res.data.user?.channelName){
                setIsChannel(true);
            }
        })
    },[])
    return (
      <> 
        <div className='Navbar'>
            <div style={{display:"flex", alignItems:"center"}}>
            
                <div  style={{display:"flex", alignItems:"center"}}>
                <img 
                    src={logo} 
                    alt="Logo" 
                    width="80px"
                    height="40px"
                
                />
                </div>
            </div>
        
        
        <div >
            <form action="" style={{display:"flex" , flexWrap:"nowrap"}}>
                <label htmlFor="search"></label>
                <input type="text" name="search" id="search_input" />
                <button className="search_btn">Q</button>
            </form>
        </div>
        <div className="nav_btns">
            {SignIn&&!isChannel&&<Link to="/CreateChannel"> <button className="CreateChannel_btn">CreateChannel+</button></Link>}
            {SignIn? <Link to="/profile" ><button className="Profile_btn">
                {imageurl?<img src={imageurl} alt="" className="ProfileImage"/>:"U"}</button></Link>:<Link to="/signUp"><button className="SignIn_btn">Sign in</button></Link>}
        </div>
        
        </div>

      </>
    )
    
  }
  
  
  export default Header