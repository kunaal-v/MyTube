import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faClockRotateLeft, faCirclePlay, faBarsProgress, faUsersRectangle, faTv,faGraduationCap, faClock,faThumbsUp, faDownload,faArrowTrendUp,faNewspaper, faTrophy,faTowerBroadcast,faClapperboard,faMusic} from '@fortawesome/free-solid-svg-icons';
Body.propTypes={
    toggleValue:PropTypes.bool,
};
function Body(props)
{
    return(<>
    <div style={{display:"flex"}}>
        <div>
        {props.toggleValue&&<div className='hamburger_menu'>
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
            </div>}
        </div>
        <div>
            <h1>This is Body component</h1>
        </div>
    </div></>)
}
export default Body