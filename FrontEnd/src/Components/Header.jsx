import { Link } from "react-router-dom";
import logo from "../assets/MyTube_Logo.png";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars} from '@fortawesome/free-solid-svg-icons';
function Header (){
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
            {<Link to="/CreateChannel"> <button className="CreateChannel_btn">CreateChannel+</button></Link>}
            { <Link to="/profile"><button className="SignIn_btn">Profile</button></Link>}{<Link to="/signUp"><button className="SignIn_btn">Sign in</button></Link>}
        </div>
        
        </div>

      </>
    )
    
  }
  
  
  export default Header