import { Link, useNavigate } from "react-router-dom";
//import { useParams } from "react-router-dom";
import { logoutUser } from "../../services/authService";
import { useUser } from "../../hooks/useUser";
import { Default } from "./Default";
import { LoginPage , SignupPage} from "./Auth";
import '../style/Homepage.css'
import home from '../../assets/header/home.png'
import homeFilled from '../../assets/header/home-filled.png'
import reel from '../../assets/header/play-square.png'
import reelFilled from '../../assets/header/play-square-filled.png'
import send from '../../assets/header/send.png'
import sendFilled from '../../assets/header/send-filled.png'
import heart from '../../assets/header/heart.png'
import heartFilled from '../../assets/header/heart-filled.png'

//import { useState } from "react";

function Homepage() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  //const { user } = useEnsureAuth();
  //const { path } = useParams();

  /* const [isOpen, setIsOpen] = useState(false);

  function toggleSidebar() {
    setIsOpen(prev => !prev);
  } */

  const handleLogout = async () => {
    const success = await logoutUser();
    if(success) {
      setUser(null); // clear user state
      navigate('/'); //redirect to homepage
      window.location.reload();
    }
  };

  return (
    <div className='page'>
        <div className='header'>
            <Link to='/' ><img className="header-logo" src="Catstagram-Logo.png" alt="" /></Link>

            <nav>
              <Link className="nav-container" to='/' ><img className="nav-icon" src={home} alt="" />Home</Link>
              <Link className="nav-container" to='/' ><img className="nav-icon" src={reel} alt="" />Reels</Link>
              <Link className="nav-container" to='/' ><img className="nav-icon" src={send} alt="" />Messages</Link>
              <Link className="nav-container" to='/' ><img className="nav-icon" src={heart} alt="" />Notifications</Link>
              <Link className="nav-container" to='/' ><img className="nav-icon" id="profile-img" src="" alt="" />Profile</Link>
            </nav>
            
            <button className="nav-container" onClick={handleLogout} to="/log-out">Logout</button>
        </div>

        <div className='content'>
          <Default />
        </div>

        <div className='footer'>
          <div className="footer-top">
            
          </div>
          <hr />
          <div className="footer-bottom">
            <img src="copyright.svg" alt="" />
            <div>2026 Catstagram</div>
          </div>
        </div>
    </div>
  )
}

export default Homepage