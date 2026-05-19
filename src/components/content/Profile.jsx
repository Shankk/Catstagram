import { useNavigate, useParams } from 'react-router-dom';
import '../style/Profile.css'
import { useUser } from '../../hooks/useUser';
import catpic from '../../assets/cat-profile.webp';
import { useEffect, useState } from 'react';
import { fetchUserProfile, followUser, unfollowUser } from '../../services/userService';


export function ProfilePage() {
    const navigate = useNavigate();
    const { username } = useParams();
    const { user } = useUser();
    const [ profile, setProfile ] = useState(null);
    const isOwnProfile = user?.id === profile?.profile.userId;
    const isFollowing = profile?.isFollowing;
    
    async function loadProfile() {
        const data = await fetchUserProfile(username);
        setProfile(data);  
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
                <img id='profile-img' src={profile?.profile.avatar ? `http://localhost:3000${profile?.profile.avatar}` : catpic} alt="" />
                <div className='profile-details'>
                    <div className='profile-username'>{profile?.profile.username}</div>
                    <div className='profile-fullname'>{ profile?.profile.firstname } { profile?.profile.lastname }</div>
                    <div className='profile-stats'>
                        <div>{profile?.profile.posts.length } posts</div>
                        <div>{profile?.profile.user._count.followers } followers</div>
                        <div>{profile?.profile.user._count.following } following</div>
                    </div>
                    <div className='profile-desc'>
                        {profile?.profile.bio}
                    </div>
                </div>
            </div>
            <div className='profile-settings'>
                <button className='profile-edit' onClick={() => navigate("/settings")}>Edit profile</button>
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
                <button className='media-button'>Posts</button>
                <button className='media-button'>Saved</button>
                <button className='media-button'>Tagged</button>
            </div>
            <div className='profile-media-display'>

            </div>
        </div>
        
    )
}


export default ProfilePage