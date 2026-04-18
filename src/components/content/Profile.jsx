import '../style/Profile.css'
import { useUser } from '../../hooks/useUser';
import catpic from '../../assets/cat-profile.webp';


export function ProfilePage() {
    const { user } = useUser();
    //console.log("data:", user);

    return (
        <div className='profile-content'>
            <div className='profile-box'>
                <img id='profile-img' src={catpic} alt="" />
                <div className='profile-details'>
                    <div className='profile-username'>{user.profile?.username}</div>
                    <div className='profile-fullname'>{user.profile?.firstname} {user.profile?.lastname}</div>
                    <div className='profile-stats'>
                        <div>{user.profile.posts.length} posts</div>
                        <div>{user.followers.length} followers</div>
                        <div>{user.following.length} following</div>
                    </div>
                    <div className='profile-desc'>
                        {user.profile.bio}
                    </div>
                </div>
            </div>
            <div className='profile-settings'>
                <button className='profile-edit'>Edit profile</button>
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