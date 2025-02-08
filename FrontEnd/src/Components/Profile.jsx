import { useEffect } from "react"
import logo from "../assets/MyTube_Logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowRightFromBracket,faHouse,faUpload, faHouseUser} from '@fortawesome/free-solid-svg-icons';
import { Link, Outlet, useNavigate } from "react-router-dom";

function Profile() {
    const navigate=useNavigate();
    useEffect(()=>{

    })
    function handleLogout()
    {
        const value=confirm("Are you sure?")
        if(value)
        {
            localStorage.removeItem('accessToken');
            navigate("/signUp")
        }

    }
  return (
    <div className="Dashboard_Page">
        <div className="Profile">
            <div className="logo profile_container">
                      <img src={logo} alt="Logo" className="Logo_Image" />
                      <h4>Channel Name</h4>
            </div>
            <div className="Profile_container">
                <hr />
                <Link to="/dashboard"className={location.pathname==="/profile/myvideos"?"active-a":"a"}>
                <FontAwesomeIcon icon={faHouse} /> Home</Link><hr />
                <Link to="/profile/mychannel"className={location.pathname==="/profile/mychannel"?"active-a":"a"}>
                <FontAwesomeIcon icon={faHouseUser} /> My Channel</Link><hr />
                <Link to="/profile/uploadvideo"className={location.pathname==="/profile/uploadvideo"?"active-a":"a"}>
                <FontAwesomeIcon icon={faUpload} /> Upload Video</Link><hr />
                <Link onClick={handleLogout} className={location.pathname==="/profile/logout"?"active-a":"a"}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} />Logout   </Link><hr />
            </div>
        </div>
        <div className="content">
            
            <div>
               <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Profile