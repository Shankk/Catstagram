import { Link, useNavigate } from "react-router-dom";
//import { useParams } from "react-router-dom";
import { logoutUser } from "../../services/authService";
import { useUser } from "../../hooks/useUser";
import { Default } from "./Default";
import { LoginPage , SignupPage} from "./Auth";
import '../style/Homepage.css'
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
          <div className='head-title'>
            <img className="header-logo" src="Catstagram-Logo.png" alt="" />
            <button className="home-button grow-btn" to="/">Catstagram</button>
          </div>
          <div className="head-nav">
            <nav>
              <a className="nav-item grow-btn" href="#services">Account</a>
              <a className="nav-item grow-btn" href="#projects">Messages</a>
            </nav>
            <button onClick={handleLogout} className="nav-item grow-btn" to="/log-out">Logout</button>
          </div>
        
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