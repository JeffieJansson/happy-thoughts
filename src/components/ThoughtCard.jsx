import { useState } from 'react'
import ReactTimeAgo from 'react-timeago'

/**
 * @param {Object} thought - The thought object from API
 * @param {string} thought._id - Unique identifier
 * @param {string} thought.message - The thought text
 * @param {number} thought.hearts - Like count
 * @param {string} thought.createdAt - ISO timestamp
 * @param {Function} onLike - Callback to App.jsx to handle like action
 */
export const ThoughtCard = ({ thought, onLike }) => {

  // === LOCAL STATE FOR LIKE SPAM PREVENTION ===
  const [hasLiked, setHasLiked] = useState(false)

  // === EVENT HANDLERS ===
  const handleLike = () => {
    if (hasLiked) return // disable multiple likes from same session
    setHasLiked(true) // Mark as liked immediately for responsive UI
    if (onLike) onLike(thought._id) // Trigger API call via parent
  }

  return (
    <article className="thought">
      <p className="message">{thought.message}</p>
      <div className="meta"> 
        <button
          className={`like-button ${hasLiked ? 'liked' : ''}`}
          onClick={handleLike}
          aria-label={`Like this thought (${thought.hearts ?? 0} likes)`}
          disabled={hasLiked} // Disable button if already liked in this session
        >
          <img src="./heart.png" alt="heart icon" className="hearts" />
        </button>
        
        {/* Like Count Display 
            (??) provides 0 as default if hearts is null/undefined */}
        <span className="likes">x{thought.hearts ?? 0}</span>
        
        <span className="thought-time">
          {/* ReactTimeAgo automatically updates the time string ("2 minutes ago" → "3 minutes ago") */}
          {/* It handles its own internal tick mechanism, no manual re-rendering needed */}
          {thought.createdAt ? <ReactTimeAgo date={thought.createdAt} /> : ''}
        </span>
      </div>
    </article>
  )
}