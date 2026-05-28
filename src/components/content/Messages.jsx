import { useEffect, useState } from 'react';
import { useUser } from '../../hooks/useUser';
import { socket } from '../../hooks/useSocket';
import { createNewConversation, fetchConversation, 
        fetchConversationMessages, fetchUserConversations, 
        fetchUserSearch, sendNewMessage 
} from '../../services/userService';
import formatTimestamp from '../utility/timeFormatter';
import catpic from '../../assets/cat-profile.webp';
import SendIcon from '../../assets/icons/note-edit.svg';
import  '../style/Messages.css';

function InboxItem({image, username, message, age, onClick}) {
    return (
        <div className="message-item" onClick={onClick}>
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
            const data = await fetchUserSearch(search);
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
              <img src={user.profile.avatar ? `http://localhost:3000${user.profile.avatar}` : catpic  } />
              <span>{user.profile.username}</span>
            </div>
          ))}
        </div>

        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

function DirectMessageInbox({ setActiveConversationId}) {
    const {user} = useUser();
    const [search, setSearch] = useState("");
    const [conversations, setConversations] = useState([]);
    const [showNewMessage, setShowNewMessage] = useState(false);
    const filtered = conversations.filter(conv => {
        const text = search.toLowerCase();
        const other = conv.participants.find(p => p.userId !== user.id)?.user;

        return (
            other?.profile?.username?.toLowerCase().includes(text) ||
            conv.messages[0]?.text?.toLowerCase().includes(text) 
        )
    })
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

    useEffect(() => {
        const last = localStorage.getItem("lastConversation");
        if(last) { setActiveConversationId(Number(last))}
    },[]);

    async function handleStartConversation(otherUser) {
        //console.log("other user: ", otherUser)
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
        setActiveConversationId(conversation.id);
        // Join the socket room
        socket.emit("join_conversation", conversation.id);
    }

    return (
        <div className='messages-page'>
            {/* <!-- Header --> */}
            <header className="messages-header">
                <h2 className="username">{user.profile?.username}</h2>
                <button className="new-message-btn" onClick={() => setShowNewMessage(true)}>
                    <img src={SendIcon} alt="" />
                </button>
            </header>

            {/* <!-- Search Bar --> */}
            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder="Search conversations..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} 
                />
            </div>

            {/* <!-- Messages List --> */}
            <div className="messages-list">
                {filtered.map(conv => {
                    const other = conv.participants.find(p => p.userId !== user.id)?.user;

                    return (
                        <InboxItem
                            key={conv.id}
                            image={other.profile?.avatar ? `http://localhost:3000${other.profile?.avatar}` : catpic }
                            username={other.profile?.username}
                            message={conv.messages[0]?.text || "No messages yet"}
                            age={formatTimestamp(conv.messages[0]?.createdAt) || ""} // You can replace this with a real timestamp formatter
                            onClick={() => { setActiveConversationId(conv.id); localStorage.setItem("lastConversation", conv.id)}}
                            
                        />
                        );
                    })
                }
            </div>

            {showNewMessage && (
                <NewConversationModal 
                    onClose={() => setShowNewMessage(false)} 
                    onSelectUser={handleStartConversation} 
                />
            )}
        </div>
        
    )
}

function ChatScreen({activeConversationId}) {
    const { user } = useUser();
    const [ otherUser, setOtherUser] = useState(null);
    const [ messages, setMessages] = useState([]);
    const [ input, setInput] = useState("");

    useEffect(() => {
        if(!activeConversationId) return;

        async function loadParticipants() {
            const conv = await fetchConversation(activeConversationId);

            const other = conv.participants.find(
                p => p.user.id !== user.id
            )?.user;

            setOtherUser(other);
        }

        loadParticipants();
    }, [activeConversationId]);

    useEffect(() => {
        if(!activeConversationId) return;

        async function loadMessages() {
            const messages = await fetchConversationMessages(activeConversationId)
            setMessages(messages);
        }
        loadMessages();

        // join socket room
        socket.emit("join_conversation", activeConversationId);
    }, [activeConversationId]);

    useEffect(() => {
        socket.on("new_message", msg => {
            if (msg.conversationId === activeConversationId) {
                setMessages(prev => [...prev, msg]);
            }
        });

        return () => socket.off("new_message");
    }, [activeConversationId]);

    async function sendMessage() {
        if(!input.trim()) return;

        console.log("SEND MESSAGE FIRED");
        const newMsg = await sendNewMessage(activeConversationId, input);
        
        // Optimistic update (optional)
        setMessages(prev => [...prev, newMsg]);
        //Emit socket event
        socket.emit("send_message", newMsg);

        setInput("");
    }

    return(
        <div className="chat-page">
            {activeConversationId ? (
                <>
                    {/* <!-- Chat Header --> */}
                    <header className="chat-header">
                        <div className="chat-user">
                            <img className="avatar-small" src={otherUser?.profile?.avatar ? `http://localhost:3000${otherUser?.profile?.avatar}` : catpic} />
                            <p className="name">{otherUser?.profile?.username}</p>
                        </div>
                        <button className="back-btn">
                            
                        </button>
                        <button className="info-btn">
                            
                        </button>
                    </header>

                    {/* <!-- Messages Area --> */}
                    <div className="chat-messages">
                        {messages.map(msg => {
                            const isMe = msg.senderId === user.id;

                            return isMe ? (
                                <MessageSent key={msg.id} message={msg.text} />
                            ) : (
                                <MessageReceived 
                                    key={msg.id}
                                    image={msg.sender.profile?.avatar ? `http://localhost:3000${msg.sender.profile?.avatar}` : catpic}
                                    message={msg.text}
                                />
                            )
                        })}
                    </div>

                    {/* <!-- Input Bar --> */}
                    <div className="chat-input">
                        <input 
                            type="text" 
                            placeholder="Message..."
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && sendMessage()}
                        />
                        <button className="icon-btn" onClick={sendMessage}>Send</button>
                    </div> 
                </>
            ) : (
                <div className='chat-placeholder'>
                    <div className='chat-placeholder-icon'>💬</div>
                    <h2>Your Messages</h2>
                    <p>Select a conversation to start chatting</p>
                </div>
            )}
            
        </div>
    )
}

export default function MessagePage() {
    const [activeConversationId, setActiveConversationId] = useState(null);

    return (
        <>
            <DirectMessageInbox 
                setActiveConversationId={setActiveConversationId}
            />
        
            <ChatScreen 
                activeConversationId={activeConversationId} 
            />
        </>
    );
}