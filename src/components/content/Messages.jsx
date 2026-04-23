import { Link } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import  '../style/Messages.css';
import catpic from '../../assets/cat-profile.webp';
import SendIcon from '../../assets/icons/note-edit.svg';

function User({image, username, name}) {
    return (
        <div className='user-box'>
            <Link className='user-link'>
                <img className='user-img' src={image} alt="" />
            </Link>
            <div className='user-info'>
                <Link className='user-link'>{username ? username : "Username"}</Link>
                <div className='user-name'>{name != null ? name : "name"}</div>
            </div>
        </div>
    )
}

function DirectMessageInbox() {
    const {user} = useUser();

    return (
        <>
            {/* <!-- Header --> */}
            <header class="messages-header">
                <h2 class="username">{user.profile?.username}</h2>
                <button class="new-message-btn">
                    <img src={SendIcon} alt="" />
                </button>
            </header>

            {/* <!-- Search Bar --> */}
            <div class="search-bar">
                <input type="text" placeholder="Search" />
            </div>

            {/* <!-- Messages List --> */}
            <div class="messages-list">

                {/* <!-- Single Conversation Item --> */}
                <div class="message-item">
                    <img src={catpic} class="avatar" />
                    <div class="message-info">
                        <p class="name">john_doe</p>
                        <p class="last-message">Sent a photo · 2h</p>
                    </div>
                </div>

                <div class="message-item">
                    <img src={catpic} class="avatar" />
                    <div class="message-info">
                        <p class="name">sarah</p>
                        <p class="last-message">Typing…</p>
                    </div>
                </div>

                <div class="message-item">
                    <img src={catpic} class="avatar" />
                    <div class="message-info">
                        <p class="name">mike</p>
                        <p class="last-message">You: Sounds good!</p>
                    </div>
                </div>
            </div>
        </>
        
    )
}
function ChatScreen() {
    return(
        <>
            {/* <!-- Chat Header --> */}
            <header class="chat-header">
                <div class="chat-user">
                    <img src={catpic} class="avatar-small" />
                    <p class="name">john_doe</p>
                </div>
                <button class="back-btn">
                    
                </button>
                <button class="info-btn">
                    
                </button>
            </header>

            {/* <!-- Messages Area --> */}
            <div class="chat-messages">

                {/* <!-- Received Message --> */}
                <div class="message-row received">
                    <img src={catpic} class="avatar-small" />
                    <div class="bubble">Hey, what’s up?</div>
                </div>

                {/* <!-- Sent Message --> */}
                <div class="message-row sent">
                    <div class="bubble">All good! Working on a project.</div>
                </div>

                <div class="message-row received">
                    <img src={catpic} class="avatar-small" />
                    <div class="bubble">Nice! Send it when you're done.</div>
                </div>

            </div>

            {/* <!-- Input Bar --> */}
            <div class="chat-input">
                <input type="text" placeholder="Message..." />
                <button class="icon-btn">Send</button>
            </div>
        </>
    )
}

export default function MessagePage() {

    return (
        <>
            <div className='messages-page'>
                <DirectMessageInbox></DirectMessageInbox>
            </div>
            <div className="chat-page">
                <ChatScreen></ChatScreen>
            </div>
        </>
        
    )
}