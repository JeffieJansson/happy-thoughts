import { useState } from 'react'
import ReactTimeAgo from 'react-timeago'
import '../styles/thoughtCard.css'

export const ThoughtCard = ({ thought, onLike, onEdit, onDelete, user }) => {

  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(thought.message);
  const [deleted, setDeleted] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = () => {
    if (hasLiked) return;
    setHasLiked(true);
    if (onLike) onLike(thought._id);
  };

  if (deleted) return null;

  return (
    <article className="thought">
      {isEditing ? (
        <div className="thought-actions">
          <input
            value={editedMessage}
            onChange={e => setEditedMessage(e.target.value)}
            aria-label="Edit thought message"
          />
          <div className="edit-actions">
            <button
              className="save-button"
              onClick={() => {
                onEdit(thought._id, editedMessage);
                setIsEditing(false);
              }}
            >
              Save
            </button>
            <button
              className="cancel-button"
              onClick={() => {
                setEditedMessage(thought.message);
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="message">{thought.message}</p>
      )}

      <div className="meta">
        
        {/* Like button, likes, and time always visible */}
        <button
          className={`like-button ${hasLiked ? 'liked' : ''}`}
          onClick={handleLike}
          aria-label={`Like this thought (${thought.hearts ?? 0} likes)`}
          disabled={hasLiked}
        >
          <img src="./heart.png" alt="heart icon" className="hearts" />
        </button>
        <span className="likes">x{thought.hearts ?? 0}</span>
        <span className="thought-time">
          {thought.createdAt ? <ReactTimeAgo date={thought.createdAt} /> : ''}
        </span>

    
        {user && (
          <div className="thought-edit">
            {!isEditing ? (
              <div className="button-wrapper">
                <button
                  className="edit-button"
                  onClick={() => setIsEditing(true)}
                  aria-label="Edit this thought"
                >
                  ✏️
                </button>
                <button
                  className="delete-button"
                  onClick={() => {
                    onDelete(thought._id);
                    setDeleted(true);
                  }}
                  aria-label="Delete this thought"
                >
                  🗑️
                </button>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </article>
  );
}