import PropTypes from "prop-types";
Header.propTypes={
    toggleFunction:PropTypes.func,
};
import { Link } from 'react-router-dom';
import logo from "../assets/MyTube_Logo.png"
function Header(props)
{
    return(<>
    <div className='Header'> 
        <div className='Navbar'>
            <div style={{display:"flex"}}>
            <div>
                <button className="dropdown-toggle" onClick={props.toggleFunction}>
                Menu
                </button>
                
            
        </div>
        <div>
        <img 
            src={logo} 
            alt="Logo" 
            width="80px"
            height="30px"
        
        />
        </div>
            </div>
        
        
        <div >
            <form action="">
                <input type="text" name="" id="" />
                <button>Q</button>
            </form>
        </div>
        <Link to="/SignUp"><button>Sign in</button></Link>
        </div>
        <div>
           <span>filters</span>
        </div>
    </div>
    </>)
}
export default Header;