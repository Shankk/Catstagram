import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { logoutUser } from "../../services/authService";
import  '../style/Home.css';
import logo from '../../assets/cat-logo.png';
import catpic from '../../assets/cat-profile.webp';
import like from '../../assets/icons/heart.png';
import chat from '../../assets/icons/chat.png';
import share from '../../assets/icons/send.png';
import save from '../../assets/icons/save.png';
import home from '../../assets/icons/home.png'
import homeFilled from '../../assets/icons/home-filled.png'
import reel from '../../assets/icons/play-square.png'
import reelFilled from '../../assets/icons/play-square-filled.png'
import send from '../../assets/icons/send.png'
import sendFilled from '../../assets/icons/send-filled.png'
import heart from '../../assets/icons/heart.png'
import heartFilled from '../../assets/icons/heart-filled.png'

export function Header() {
    const navigate = useNavigate();
    const {user, setUser} = useUser();
    const location = useLocation();
    const path = location.pathname;
    const onProfilePage = user != null ? path.startsWith(`/profile/${user.profile?.username}`) : false; 

    

    const handleLogout = async () => {
        const success = await logoutUser();
        if(success) {
            localStorage.removeItem("lastConversation");
            setUser(null); // clear user state
            navigate('/'); //redirect to homepage
            window.location.reload();
        }
    };

    return (
        <>
            <Link to='/' ><img className="header-logo" src={logo} alt="" /></Link>

            <nav>
                <Link className="nav-container" to='/' ><img className="nav-icon" src={path === "/" ? homeFilled : home } alt="" />Home</Link>
                <Link className="nav-container" to='/' ><img className="nav-icon" src={reel} alt="" />Reels</Link>
                <Link className="nav-container" to='/direct' ><img className="nav-icon" src={path === "/direct" ? sendFilled : send} alt="" />Messages</Link>
                <Link className="nav-container" to='/' ><img className="nav-icon" src={heart} alt="" />Notifications</Link>
                <Link className={`nav-container ${onProfilePage ? "active-profile" : ""}`} to={user ?`/profile/${user.profile?.username}` : "#"}>
                    <div className='profile-border'>
                        <img className="nav-icon"  id="header-profile-img" src={user.profile?.avatar ? `http://localhost:3000${user.profile?.avatar}` : catpic} alt={null} />
                    </div>
                    Profile
                </Link>
            </nav>
            
            <button id="logout" className="nav-container" onClick={handleLogout} to="/log-out">Logout</button>
        </>
    )
}

export function Footer() {
    return (
        <>
            <p> About . Blog . Jobs . Help . API . Privacy . Terms . Locations </p>
            <p> © 2026 Catstagram </p>
        </>
    )
    
}

function User({image, username, name, isUser}) {
    return (
        <div className='user-box'>
            <Link className='user-link' to={`profile/${username}`}>
                <img className='user-img' src={image} alt="" />
            </Link>
            <div className='user-info'>
                <Link className='user-link' to={`profile/${username}`}>{username ? username : "Username"}</Link>
                <div className='user-name'>{name != null ? name : "name"}</div>
            </div>
            {isUser ? <button className='user-logout'>Logout</button> : null}
        </div>
    )
}

function Story() {
    return (
        <Link className='story' >
            <img id='story-img' src={null} alt="" />
            <span>username</span>
        </Link>
    )
}

function Reel() {
    return (
        <div className="reel">
            <div className="author">
                <img className='user-img' src={null} alt="" />
                <div>Author</div>
                <div>Age</div>
            </div>
            <div className="post">
                <img src={null} alt="" />
            </div>
            <div className="social">
                <div className='left'>
                    <img id="icon-like" className='icon' src={like} alt="" />
                    <div className='reel-text'>2.6K</div>
                    <img id="icon-comment" className='icon' src={chat} alt="" />
                    <div className='reel-text'>103</div>
                    <img id="icon-share" className='icon' src={share} alt="" />
                </div>
                <div className='right'>
                    <img id="icon-save" className='icon' src={save} alt="" />
                </div>
            </div>
            <div className="description">
                <div className='reel-text'><span>Author Name </span>This is where text would be for a post 
                    and it would be talking about something relating to the post.
                </div>
            </div>
        </div>
    )
}

export default function Homepage() {
    const {user} = useUser();

    return (
        <>
            <div className='main'>
                <div className="stories">
                    <Story></Story>
                    <Story></Story>
                    <Story></Story>
                    <Story></Story>
                    <Story></Story>
                    <Story></Story>
                </div>
                <div className="reels">
                    <Reel></Reel>
                    <Reel></Reel>
                </div>
            </div>
            <div className='side'>
                <User image={user.profile?.avatar ? `http://localhost:3000${user.profile?.avatar}` : catpic} username={user.profile?.username} name={user.profile?.firstname} isUser={true} ></User>
                <div>Suggested for you </div>
                <User></User>

                <div className='side-footer'>
                    <Footer></Footer>
                </div>
                
            </div>
        </>
    );
}