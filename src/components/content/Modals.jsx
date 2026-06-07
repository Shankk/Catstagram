import { useEffect, useState } from "react";
import { createPost, fetchPostComments, fetchUserConversations, likeUserPost, sendUserPost, unlikeUserPost, uploadPostComment } from "../../services/userService";
import '../style/Modals.css'
import like from '../../assets/icons/heart.png';
import likefilled from '../../assets/icons/heart-filled.png'
import chat from '../../assets/icons/chat.png';
import share from '../../assets/icons/send.png';
import save from '../../assets/icons/save.png';
import { Link } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

export function CreatePostModal({ onClose }) {
  const [media, setMedia] = useState(null);
  const [caption, setCaption] = useState("");

  function handleFile(e) {
      setMedia(e.target.files[0]);
  }

  async function handleSubmit() {
    await createPost(media, caption)

    onClose();
    window.location.reload();
  }

  return (
    <div className="create-post-modal">
      <div className="post-modal-content">
        {media && (
          media.type.startsWith("video/") ? (
            <video 
                src={URL.createObjectURL(media)} 
                controls 
                className='post-preview' 
            />
          ) : (
            <img 
                src={URL.createObjectURL(media)} 
                className="post-preview"
            />
          )
        )}

        <div>
          <h2>Create Post</h2>

          <input type="file" accept="image/*,video/*" onChange={handleFile} />

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

export function SendPostModal({ postId, onClose }) {
  const {user} = useUser();
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetchUserConversations();
      setConversations(res);
    }
    load();
  }, []);

  async function sendTo(conversationId) {
    await sendUserPost(conversationId, postId);
    
    onClose();
  }

  return (
    <div className="send-modal-overlay">
      <div className="send-modal-container">
        <div className="send-modal-header">
          <h3>Send to</h3>
          <button className="send-modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="send-modal-list">
          {conversations.map(conv => {
            const other = conv.participants.find(p => p.userId !== user.id).user;

            return (
              <div
                key={conv.id}
                className="send-user-row"
                onClick={() => sendTo(conv.id)}
              >
                <img
                  className="send-user-avatar"
                  src={other.profile.avatar}
                  alt=""
                />
                <span className="send-user-name">{other.profile.username}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function PostViewerModal({ post, onClose }) {
  const [liked, setLiked] = useState(post.likes.length > 0);
  const [likesCount, setLikesCount] = useState(post._count.likes);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    async function loadComments() {
      const data = await fetchPostComments(post.id)
      setComments(data);
    }
    loadComments();
  }, [post.id]);

  async function submitComment() {
    if(!commentText.trim()) return;

    const data = await uploadPostComment(post.id, commentText)
    const newComment = data;

    setComments(prev => [...prev, newComment]);
    setCommentText("");
  }

  async function toggleLike() {
    if(liked) {
      await unlikeUserPost(post.id);
      setLiked(false);
      setLikesCount(likesCount - 1);
    } else {
      await likeUserPost(post.id);
      setLiked(true);
      setLikesCount(likesCount + 1);
    }
  }

  if (!post) return null;
  
  return (
    <div className="post-viewer-overlay" onClick={onClose}>
      <div className="post-viewer" onClick={(e) => e.stopPropagation()}>
        
        {/* Media */}
        <div className="post-viewer-media">
          {post.mediaType === "VIDEO" ? (
            <video
              src={post.mediaUrl}
              controls
              autoPlay
            />
          ) : (
            <img src={post.mediaUrl} />
          )}
        </div>

        {/* Right side panel */}
        <div className="post-viewer-info">
          <div className="post-header">
            <Link className='user-link' to={`/profile/${post.user.profile.username}`}>
              <img className='post-avatar' src={post.user.profile?.avatar} alt="" />
            </Link>
            <Link className='user-link' to={`/profile/${post.user.profile.username}`}>
              <div>{post.user.profile.username}</div>
            </Link>    
          </div>
          
          <div className='post-caption'>
            <Link className='user-link' to={`/profile/${post.user.profile.username}`}>
              <img className='post-avatar' src={post.user.profile?.avatar} alt="" />
            </Link>
            <Link className='user-link' to={`/profile/${post.user.profile.username}`}>
              <div>{post.user.profile.username}</div>
            </Link>  
            {post.caption}
          </div>
         
          {/* Comments */}
          <div className="post-comments">
            {comments.map(c => (
              <div key={c.id} className="comment-row">
                <Link className='user-link' to={`/profile/${c.user.profile.username}`}>
                  <img className="comment-avatar" src={c.user.profile.avatar} alt="" />
                </Link>
                <div className="comment-body">
                  <Link className='user-link' to={`/profile/${c.user.profile.username}`}>
                    {c.user.profile.username}
                  </Link>
                  <span>{c.text}</span> 
                </div>
              </div>
            ))}
          </div>
          <div className="post-social">
              <div className='left'>
                <img id="icon-like" className='icon'  src={liked ? likefilled : like} alt="" onClick={() => toggleLike()} />
                <div className='feed-text'>{likesCount}</div>
                <img id="icon-comment" className='icon' onClick={null} src={chat} alt="" />
                <div className='feed-text'>{post._count.comments}</div>
                <img id="icon-share" className='icon' src={share} alt="" />
              </div>
              <div className='right'>
                <img id="icon-save" className='icon' src={save} alt="" />
              </div>
          </div>
          {/* Add comment */}
          <div className="comment-input-row">
            <input
              className="comment-input"
              type="text"
              placeholder="Add a comment..."
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
            />
            <button onClick={submitComment}>Post</button>
          </div>
          
        </div>
      </div>
    </div>
  );
}