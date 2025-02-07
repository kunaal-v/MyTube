import { useEffect } from "react"
import logo from "../assets/MyTube_Logo.png"
import Header from "./Header"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faClockRotateLeft, faCirclePlay, faBarsProgress, faUsersRectangle, faTv,faGraduationCap, faClock,faThumbsUp, faDownload,faArrowTrendUp,faNewspaper, faTrophy,faTowerBroadcast,faClapperboard,faMusic} from '@fortawesome/free-solid-svg-icons';

function Dashboard() {


    useEffect(()=>{

    })
  return (
    <div className="Dashboard_Page">
        <div className="Profile">
            <div className="logo profile_container">
                      <img src={logo} alt="Logo" className="Logo_Image" />
                      <h4>Channel Name</h4>
            </div>
            <div className="HambourgeMenu">
            <ul>
                    <li> <FontAwesomeIcon icon={faHouse} />Home</li>
                    <li> <FontAwesomeIcon icon={faBarsProgress} /> Shorts</li>
                    <li> <FontAwesomeIcon icon={faUsersRectangle} /> subscriptions</li><hr />
                    <li>You {">"}</li>
                    <li> <FontAwesomeIcon icon={faClockRotateLeft} /> History</li>
                    <li> <FontAwesomeIcon icon={faCirclePlay} /> Playlists</li>
                    <li> <FontAwesomeIcon icon={faTv} /> Your videos</li>
                    <li> <FontAwesomeIcon icon={faGraduationCap} /> Your courses</li>
                    <li> <FontAwesomeIcon icon={faClock} /> Watch later</li>
                    <li> <FontAwesomeIcon icon={faThumbsUp} /> Liked videos</li>
                    <li> <FontAwesomeIcon icon={faDownload} /> Downloads</li><hr />
                    <li>Explore {">"}</li>
                    <li> <FontAwesomeIcon icon={faArrowTrendUp} /> Trandings</li>
                    <li> <FontAwesomeIcon icon={faMusic} /> Music</li>
                    <li> <FontAwesomeIcon icon={faClapperboard} /> Movies</li>
                    <li> <FontAwesomeIcon icon={faTowerBroadcast} /> Live</li>
                    <li> <FontAwesomeIcon icon={faNewspaper} /> News</li>
                    <li> <FontAwesomeIcon icon={faTrophy} /> Sports</li>
                    </ul>
            </div>
        </div>
        <div className="content">
            <div>
                <Header/>
            </div>
            <div>
                content
            </div>
        </div>
    </div>
  )
}

export default Dashboard