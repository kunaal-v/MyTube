import { Link } from "react-router-dom";
import logo from "../assets/MyTube_Logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHouse, faClockRotateLeft, faCirclePlay, faBarsProgress, faUsersRectangle, faTv,faGraduationCap, faClock,faThumbsUp, faDownload,faArrowTrendUp,faNewspaper, faTrophy,faTowerBroadcast,faClapperboard,faMusic} from '@fortawesome/free-solid-svg-icons';
import { faBars} from '@fortawesome/free-solid-svg-icons';
function Header (){
    return (
      <> 
        <div className='Navbar'>
            <div style={{display:"flex", alignItems:"center"}}>
            <div>
                <button className="Menu_btn">
                <FontAwesomeIcon icon={faBars} size="2xl" style={{color: "#2b435b",}} />
                </button>
                
            
        </div>
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
            <Link to="/CreateChannel"> <button className="CreateChannel_btn">CreateChannel+</button></Link>
            <Link to="/SignUp"><button className="SignIn_btn">Sign in</button></Link>
        </div>
        
        </div>

      </>
    )
  }
  
  export default Header