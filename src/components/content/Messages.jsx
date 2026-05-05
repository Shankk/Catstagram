import { useEffect, useState } from 'react';
import { useUser } from '../../hooks/useUser';
import { socket } from '../../hooks/useSocket';
import { createNewConversation, fetchUserConversations } from '../../services/authService';

import catpic from '../../assets/cat-profile.webp';
import SendIcon from '../../assets/icons/note-edit.svg';
import  '../style/Messages.css';

function InboxItem({image, username, message, age}) {
    return (
        <div className="message-item">
            <img src={image} className="avatar" />
            <div className="message-info">
                <p className="name">{username}</p>
                <p className="last-message">{message} · {age} </p>
            </div>
        </div>
    )
}

function MessageSent({message}) {
    return (
        <div className="message-row sent">
            <div className="bubble">{message}</div>
        </div>
    )
}

function MessageReceived({image, message}) {
    return (
        <div className="message-row received">
            <img src={image} className="avatar-small" />
            <div className="bubble">{message}</div>
        </div>
    )
    
}

function NewConversationModal({ onClose, onSelectUser }) {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    
    // Fetch users as the search changes
    useEffect(() => {
    if (search.trim() === "") return;

    async function searchUsers() {
      const res = await fetch(`http://localhost:3000/search-users?query=${search}`, {
        credentials: "include"
      });
      const data = await res.json();
      setResults(data);
    }

        searchUsers();
    }, [search]);

    return (
    <div className="new-convo-modal">
      <div className="modal-content">
        <h3>New Message</h3>

        <input
          type="text"
          placeholder="Search users"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <div className="results">
          {results.map(user => (
            <div
              key={user.id}
              className="result-item"
              onClick={() => onSelectUser(user)}
            >
              <img src={catpic /* user.profile.avatar */} />
              <span>{user.profile.username}</span>
            </div>
          ))}
        </div>

        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

function DirectMessageInbox() {
    const {user} = useUser();
    const [conversations, setConversations] = useState([]);
    const [showNewMessage, setShowNewMessage] = useState(false);

    // Load all conversations
    useEffect(() => {
        async function loadConversations() {
            const data = await fetchUserConversations();
            setConversations(data);
        }

        loadConversations();
    }, []);

    useEffect(() => {
        socket.on("new_message", msg => {
            setConversations(prev => {
            // Move the conversation to the top
            const updated = prev.map(conv =>
                conv.id === msg.conversationId ? { ...conv, messages: [msg] } : conv
            );

            // Sort by latest message timestamp
            return updated.sort((a, b) =>
                new Date(b.messages[0]?.createdAt) - new Date(a.messages[0]?.createdAt)
                );
            });
        });

        return () => socket.off("new_message");
    }, []);

    async function handleStartConversation(otherUser) {
        const conversation = await createNewConversation(otherUser);

        // Add to conversation list if new
        setConversations(prev => {
            const exists = prev.some(c => c.id === conversation.id);
            if (exists) return prev;
            return [conversation, ...prev];
        });

        // Close modal
        setShowNewMessage(false);

        // Open the conversation in the right panel
        //setActiveConversation(conversation.id);

        // Join the socket room
        socket.emit("join_conversation", conversation.id);
    }

    return (
        <>
            {/* <!-- Header --> */}
            <header className="messages-header">
                <h2 className="username">{user.profile?.username}</h2>
                <button className="new-message-btn" onClick={() => setShowNewMessage(true)}>
                    <img src={SendIcon} alt="" />
                </button>
            </header>

            {/* <!-- Search Bar --> */}
            <div className="search-bar">
                <input type="text" placeholder="Search" />
            </div>

            {/* <!-- Messages List --> */}
            <div className="messages-list">
                {conversations.map(conv => {
                    const other = conv.participants.find(p => p.userId !== user.id)?.user;

                    return (
                        <InboxItem
                            key={conv.id}
                            image={catpic /* other.profile?.avatar */}
                            username={other.profile?.username}
                            message={conv.messages[0]?.text || "No messages yet"}
                            age={"2h"} // You can replace this with a real timestamp formatter
                            conversationId={conv.id}
                        />
                        );
                    })
                }
            </div>

            {showNewMessage && (
                <NewConversationModal onClose={() => setShowNewMessage(false)} onSelectUser={handleStartConversation} />
            )}
        </>
        
    )
}
function ChatScreen() {
    return(
        <>
            {/* <!-- Chat Header --> */}
            <header className="chat-header">
                <div className="chat-user">
                    <img src={catpic} className="avatar-small" />
                    <p className="name">john_doe</p>
                </div>
                <button className="back-btn">
                    
                </button>
                <button className="info-btn">
                    
                </button>
            </header>

            {/* <!-- Messages Area --> */}
            <div className="chat-messages">

                <MessageReceived image={catpic} message={"Hey"} />

                <MessageSent message={"I am good."} />

                <MessageReceived image={catpic} message={"thats good"} />

            </div>

            {/* <!-- Input Bar --> */}
            <div className="chat-input">
                <input type="text" placeholder="Message..." />
                <button className="icon-btn">Send</button>
            </div>
        </>
    )
}

export default function MessagePage() {
    //socket.emit("join_conversation", conversationId);
    //socket.on("new_message", msg => setMessages(prev => [...prev, msg]));


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