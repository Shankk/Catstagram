import { useNavigate, useParams } from 'react-router-dom';
import '../style/Profile.css'
import { useUser } from '../../hooks/useUser';
import catpic from '../../assets/cat-profile.webp';
import { useEffect, useState } from 'react';
import { fetchUserProfile, followUser, unfollowUser } from '../../services/userService';

function CreatePost({ onClose }) {
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState("");

    function handleFile(e) {
        setImage(e.target.files[0]);
    }

    async function handleSubmit() {
        const form = new FormData();
        form.append("post", image);
        form.append("caption", caption);

        await fetch("http://localhost:3000/profile/post", {
            method: "POST",
            credentials: "include",
            body: form
        });

        onClose();
        window.location.reload();
    }

    return (
        <div className="create-post-modal">
            <div className="post-modal-content">
                
                {image && (
                    <img 
                        src={URL.createObjectURL(image)} 
                        className="post-preview"
                    />
                )}

                <div>
                    <h2>Create Post</h2>
                    <input type="file" accept="image/*" onChange={handleFile} />
                    <textarea
                        placeholder="Write a caption..."
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                    />

                    <button onClick={handleSubmit}>Post</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
                
            </div>
        </div>
    );
}


export function ProfilePage() {
    const navigate = useNavigate();
    const { username } = useParams();
    const { user } = useUser();
    const [ userData, setUserData ] = useState(null);
    const [ showCreatePost, setShowCreatePost ] = useState(false);
    const [ activeTab, setActiveTab ] = useState("posts");
    const isOwnProfile = user?.id === userData?.user.id;
    const isFollowing = userData?.isFollowing;

    async function loadProfile() {
        const data = await fetchUserProfile(username);
        setUserData(data);  
    };
    
    useEffect(() => {
        // React 19 false-postive. Ignore as our setState is safe.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadProfile();
    }, [username]);

    const handleFollow = async () => {
        await followUser(username);
        loadProfile();
    }
    const handleUnfollow = async () => {
        await unfollowUser(username);
        loadProfile();
    }

    return (
        <div className='profile-content'>
            <div className='profile-box'>
                <img id='profile-img' src={userData?.user.profile.avatar ? `http://localhost:3000${userData?.user.profile.avatar}` : catpic} alt="" />
                <div className='profile-details'>
                    <div className='profile-username'>{userData?.user.profile.username}</div>
                    <div className='profile-fullname'>{ userData?.user.profile.firstname } { userData?.user.profile.lastname }</div>
                    <div className='profile-stats'>
                        <div>{userData?.user.posts.length } posts</div>
                        <div>{userData?.user._count.followers } followers</div>
                        <div>{userData?.user._count.following } following</div>
                    </div>
                    <div className='profile-desc'>
                        {userData?.user.profile.bio}
                    </div>
                </div>
            </div>
            <div className='profile-settings'>
                {isOwnProfile && (
                    <>
                        <button className='profile-edit' onClick={() => setShowCreatePost(true)}>Create Post</button>
                        <button className='profile-edit' onClick={() => navigate("/settings")}>Edit profile</button>
                    </>
                )}
                {!isOwnProfile && (
                    isFollowing ? ( 
                        <button className='profile-edit' onClick={handleUnfollow}>Unfollow</button>
                    ) : (
                        <button className='profile-edit' onClick={handleFollow}>Follow</button>) 
                )}
            </div>
            <div className='profile-stories'>

            </div>
            <div className='profile-media'>
                <button 
                    className={`media-button ${activeTab === "posts" ? "active" : ""}`}
                    onClick={() => setActiveTab("posts")}>
                    Posts
                </button>
                <button 
                    className={`media-button ${activeTab === "saved" ? "active" : ""}`}
                    onClick={() => setActiveTab("saved")}>
                    Saved
                </button>
                <button 
                    className={`media-button ${activeTab === "tagged" ? "active" : ""}`}
                    onClick={() => setActiveTab("tagged")}>
                    Tagged
                </button>
            </div>
            <div className='profile-media-display'>
                {activeTab === "posts" && (
                    <>
                        {showCreatePost && (
                            <CreatePost onClose={() => setShowCreatePost(false)} />
                        )}

                        {userData?.user.posts.length === 0 ? (
                            <div className='no-posts'>
                                <div className='no-posts-icon'>📷</div>
                                <h3>Share Posts</h3>
                                <p>when you share photos, they will appear on your profile.</p>
                            </div>
                        ) : ( 
                            <div className='profile-posts'>    
                                {userData?.user.posts.map(post => (
                                    <img 
                                        key={post.id}
                                        src={`http://localhost:3000${post.imageUrl}`}
                                        className="profile-post-thumb"
                                    />
                                ))}
                            </div>
                        )}
                    </>
                    
                )}
                
                {activeTab === "saved" && (
                    <>
                    
                    </>
                )}

                {activeTab === "tagged" && (
                    <>
                    
                    </>
                )}
            </div>
        </div>
        
    )
}


export default ProfilePage