import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { logoutUser } from "../../services/authService";
import { useEffect, useState } from 'react';
import { CreatePostModal, PostViewerModal, SendPostModal } from './Modals';
import { followUser, getUserPost, unfollowUser } from '../../services/userService';

import  '../style/Home.css';
import logo from '../../assets/cat-logo.png';
import catpic from '../../assets/cat-profile.webp';
import like from '../../assets/icons/heart.png';
import likefilled from '../../assets/icons/heart-filled.png';
import chat from '../../assets/icons/chat.png';
import share from '../../assets/icons/send.png';
import save from '../../assets/icons/save.png';
import home from '../../assets/icons/home.png';
import homeFilled from '../../assets/icons/home-filled.png';
import menu from '../../assets/icons/menu.png';
import send from '../../assets/icons/send.png';
import sendFilled from '../../assets/icons/send-filled.png';
import create from '../../assets/icons/create.png';
import formatTimestamp from '../utility/timeFormatter';


function MenuDropdown({ onLogout }) {
    const navigate = useNavigate();

    return (
        <div className='menu-dropdown'>
            <button className='menu-item' onClick={() => navigate("/settings")}>Settings</button>
            <button className='menu-item'>Saved</button>
            <button className='menu-item' onClick={onLogout}>Logout</button>
        </div>
    );
}

export function Header() {
    const navigate = useNavigate();
    const {user, setUser} = useUser();
    const location = useLocation();
    const path = location.pathname;
    const onProfilePage = user != null ? path.startsWith(`/profile/${user.profile?.username}`) : false; 
    const [ showCreatePost, setShowCreatePost ] = useState(false);
    const [ isMenuOpen, setMenuOpen] = useState(false);
    const [ expanded, setExpanded ] = useState(false);

    const handleLogout = async () => {
        const success = await logoutUser();
        if(success) {
            localStorage.removeItem("lastConversation");
            setUser(null); // clear user state
            navigate('/'); //redirect to homepage
            window.location.reload();
        }
    };

    useEffect(() => {
        function handleClickOutside(e) {
            if( 
                !e.target.closest(".menu-dropdown") && 
                !e.target.closest("#menu-button")
            ) {
                setMenuOpen(false);
                setExpanded(false);
            }
        }
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div className={`header ${expanded ? "expanded" : ""}`}
            onMouseEnter={() => setExpanded(true)} onMouseLeave={() => {if(!isMenuOpen) setExpanded(false)}}
        >
            <Link to='/' ><img className="header-logo" src={logo} alt="" /></Link>

            <nav>
                <Link className="nav-container" to='/' ><img className="nav-icon" src={path === "/" ? homeFilled : home } alt="" />Home</Link>
                <Link className="nav-container" to='/direct' ><img className="nav-icon" src={path === "/direct" ? sendFilled : send} alt="" />Messages</Link>
                <button className="nav-container" onClick={() => setShowCreatePost(true)} ><img className="nav-icon" src={create} alt="" />Create</button>
                <Link className={`nav-container ${onProfilePage ? "active-profile" : ""}`} to={user ?`/profile/${user.profile?.username}` : "#"}>
                    <div className='profile-border'>
                        <img className="nav-icon"  id="header-profile-img" src={user.profile?.avatar ? `http://localhost:3000${user.profile?.avatar}` : catpic} alt={null} />
                    </div>
                    Profile
                </Link>
            </nav>
            
            <button id="menu-button" className='nav-container' onClick={() => setMenuOpen(!isMenuOpen)}>
                <img className="nav-icon" src={menu} alt="menu" /> More
            </button>

            {isMenuOpen && <MenuDropdown onLogout={handleLogout} />}

            {showCreatePost && (
                <CreatePostModal onClose={() => setShowCreatePost(false)} />
            )}
        </div>
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

function User({image, username, name, isUser, onClick}) {
    const [isFollowing, setFollowing] = useState(false);

    async function handleFollowUser(username) {
        await followUser(username)
        setFollowing(true)
    }
    async function handleUnfollowUser(username) {
        await unfollowUser(username)
        setFollowing(false)
    }

    return (
        <div className='user-box'>
            <Link className='user-link' to={`profile/${username}`}>
                <img className='user-img' src={image} alt="" />
            </Link>
            <div className='user-info'>
                <Link className='user-link' to={`profile/${username}`}>{username ? username : "Username"}</Link>
                <div className='user-name'>{name != null ? name : "name"}</div>
            </div>
            {isUser ? <button className='user-logout' onClick={onClick}>Logout</button> : null}
            
            {!isUser && (
                isFollowing ? (
                    <button className='user-follow' onClick={() => handleUnfollowUser(username)}>Unfollow</button>
                ) : (
                    <button className='user-follow' onClick={() => handleFollowUser(username)}>Follow</button>  
                )
            )}
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

function Reel({post, onClick}) {
    const [liked, setLiked] = useState(post.likes?.length > 0);
    const [likesCount, setLikesCount] = useState(post._count.likes);
    const [showSendModal, setShowSendModal] = useState(false);

    async function toggleLike() {
        if(liked) {
            await fetch(`http://localhost:3000/posts/${post.id}/like`, {
                method: "DELETE",
                credentials: "include"
            });
            setLiked(false);
            setLikesCount(likesCount - 1);
        } else {
            await fetch(`http://localhost:3000/posts/${post.id}/like`, {
                method: "POST",
                credentials: "include"
            });
            setLiked(true);
            setLikesCount(likesCount + 1);
        }
    }

    return (
        <div className="feed-item">
            <div className="feed-header">
                <Link className='user-link' to={`profile/${post.user.profile.username}`}>
                    <img className='feed-avatar' src={`http://localhost:3000${post.user.profile?.avatar}`} alt="" />
                </Link>
                <Link className='user-link' to={`profile/${post.user.profile.username}`}>
                    <div>{post.user.profile.username}</div>
                </Link>
                
                <div>{formatTimestamp(post.createdAt)}</div>
            </div>
            
            {post.mediaType === "VIDEO" ? (
                <video
                    onClick={onClick}
                    src={`http://localhost:3000${post.mediaUrl}`}
                    className="feed-media"
                    controls
                />
            ) : (
                <img
                    onClick={onClick}
                    src={`http://localhost:3000${post.mediaUrl}`}
                    className="feed-media"
                />
            )}
            
            <div className="feed-social">
                <div className='left'>
                    <img id="icon-like" className='icon'  src={liked ? likefilled : like} alt="" onClick={() => toggleLike()} />
                    <div className='feed-text'>{likesCount}</div>
                    <img id="icon-comment" className='icon' src={chat} alt="" onClick={onClick}/>
                    <div className='feed-text'>{post._count.comments}</div>
                    <img id="icon-share" className='icon' src={share} alt="" onClick={() => setShowSendModal(true)}/>
                </div>
                <div className='right'>
                    <img id="icon-save" className='icon' src={save} alt="" />
                </div>
            </div>
            <div className="description">
                <div className='feed-text'>
                    <strong>{post.user.profile.username} </strong>
                    {post.caption}
                </div>
            </div>

            {showSendModal && (
                <SendPostModal postId={post.id} onClose={() => setShowSendModal(false)}/>
            )}
        </div>
    )
}

export default function Homepage() {
    const navigate = useNavigate();
    const {user, setUser} = useUser();
    const [feed, setFeed] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [suggested, setSuggested] = useState([]);

    const handleLogout = async () => {
        const success = await logoutUser();
        if(success) {
            localStorage.removeItem("lastConversation");
            setUser(null); // clear user state
            navigate('/'); //redirect to homepage
            window.location.reload();
        }
    };

    useEffect(() => {
        async function loadFeed() {
            const res = await fetch("http://localhost:3000/feed", {
                method: "GET",
                credentials: "include"
            });
            
            const data = await res.json();
            setFeed(data);
        }

        loadFeed();
    }, []);

    useEffect(() => {
        async function loadSuggestions() {
            const res = await fetch("http://localhost:3000/suggested", {
                method: "GET",
                credentials: "include"
            });
            const data = await res.json();
            setSuggested(data);
        }

        loadSuggestions();
    }, []);


    return (
        <>
            <div className='main'>
                <div className="stories">
                    {/* <Story></Story>
                    <Story></Story>
                    <Story></Story>
                    <Story></Story>
                    <Story></Story>
                    <Story></Story> */}
                </div>
                <div className="home-feed">
                    {feed.map(post => (
                        <Reel 
                            key={post.id}
                            onClick={ async () => {
                                const fullPost = await getUserPost(post.id);
                                setSelectedPost(fullPost);
                            }}
                            post={post}
                        />
                    ))}
                </div>
            </div>
            <div className='side'>
                <User 
                    image={user.profile?.avatar ? `http://localhost:3000${user.profile?.avatar}` : catpic} 
                    username={user.profile?.username} 
                    name={user.profile?.firstname}
                    onClick={handleLogout}
                    isUser={true} >
                </User>
                
                <div>Suggested for you </div>
                {suggested.map(u => (
                    <User
                        image={u.profile?.avatar ? `http://localhost:3000${u.profile?.avatar}` : catpic} 
                        username={u.profile?.username} 
                        name={u.profile?.firstname} 
                        isUser={false}>
                    </User>
                ))}

                <div className='side-footer'>
                    <Footer></Footer>
                </div>
                
            </div>
            
            {selectedPost && (
                <PostViewerModal 
                    post={selectedPost}
                    onClose={() => setSelectedPost(null)}
                />
            )}
        </>
    );
}