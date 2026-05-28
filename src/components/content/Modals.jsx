import { useState } from "react";
import { createPost } from "../../services/userService";
import '../style/Modals.css'

export function CreatePost({ onClose }) {
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

export function PostViewerModal({ post, onClose }) {
    if (!post) return null;

    return (
    <div className="post-viewer-overlay" onClick={onClose}>
      <div className="post-viewer" onClick={(e) => e.stopPropagation()}>
        
        {/* Media */}
        <div className="post-viewer-media">
          {post.mediaType === "VIDEO" ? (
            <video
              src={`http://localhost:3000${post.mediaUrl}`}
              controls
              autoPlay
            />
          ) : (
            <img src={`http://localhost:3000${post.mediaUrl}`} />
          )}
        </div>

        {/* Right side panel */}
        <div className="post-viewer-info">
          <h3>@{post.user.profile.username}</h3>
          <p>{post.caption}</p>

          {/* Comments */}
          <div className="post-comments">
            {post.comments.map((c) => (
              <div key={c.id} className="comment">
                <strong>@{c.user.profile.username}</strong> {c.text}
              </div>
            ))}
          </div>

          {/* Add comment */}
          <input
            type="text"
            placeholder="Add a comment..."
            className="comment-input"
          />

        </div>
      </div>
    </div>
  );
}