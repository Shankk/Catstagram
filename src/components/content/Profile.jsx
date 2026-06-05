import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { useEffect, useState } from 'react';
import { fetchUserProfile, followUser, getUserPost, unfollowUser } from '../../services/userService';
import { CreatePostModal, PostViewerModal } from './Modals';
import '../style/Profile.css'
import catpic from '../../assets/cat-profile.webp';

export function ProfilePage() {
    const navigate = useNavigate();
    const { username } = useParams();
    const { user } = useUser();
    const [ userData, setUserData ] = useState(null);
    const [ showCreatePost, setShowCreatePost ] = useState(false);
    const [ activeTab, setActiveTab ] = useState("posts");
    const [ selectedPost, setSelectedPost] = useState(null);
    const isOwnProfile = user?.id === userData?.user.id;
    const isFollowing = !!userData?.isFollowing;

    async function loadProfile() {
        const data = await fetchUserProfile(username);
        setUserData(data);  
    };
    
    useEffect(() => {
        // React 19 false-postive. Ignore as our setState is safe.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUserData(null); // clear old profile data if exists.
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
                            <CreatePostModal onClose={() => setShowCreatePost(false)} />
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
                                    post.mediaType === "VIDEO" ? (
                                        <video
                                            key={post.id}
                                            onClick={ async () => {
                                                const fullPost = await getUserPost(post.id);
                                                setSelectedPost(fullPost);
                                            }}
                                            src={`http://localhost:3000${post.mediaUrl}`}
                                            className='profile-post-thumb'
                                            muted
                                            loop
                                            playsInline
                                        />
                                    ) : (
                                        <img 
                                            key={post.id}
                                            onClick={ async () => {
                                                const fullPost = await getUserPost(post.id);
                                                setSelectedPost(fullPost);
                                            }}
                                            src={`http://localhost:3000${post.mediaUrl}`}
                                            className="profile-post-thumb"
                                        />
                                    )
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

            {selectedPost && (
                <PostViewerModal 
                    post={selectedPost}
                    onClose={() => setSelectedPost(null)}
                />
            )}
        </div>
        
    )
}


export default ProfilePage