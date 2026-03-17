import { Default } from "./Default";
import '../style/Homepage.css'
//import { useState } from "react";

function Homepage() {
  /* const [isOpen, setIsOpen] = useState(false);

  function toggleSidebar() {
    setIsOpen(prev => !prev);
  } */

  return (
    <div className='page'>
      <div className='header'>
        <div className='head-title'>
          <img className="header-logo" src="corsico-logo-trans-no-title.webp" alt="" />
          <button className="home-button grow-btn" to="/">Catstagram</button>
        </div>
        <div className="head-nav">
          <nav>
            <a className="nav-item grow-btn" href="#services">Account</a>
            <a className="nav-item grow-btn" href="#projects">Messages</a>
          </nav>
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