import { useState } from 'react'
import ReactTimeAgo from 'react-timeago'

/**
 * ThoughtCard Component - Displays a single happy thought
 * 
 * This component shows the thought message, like button with count,
 * and relative timestamp (e.g., "2 minutes ago").
 * 
 * Features:
 * - Like spam prevention using local state
 * - Automatic timestamp updates via react-timeago
 * - Visual feedback when liked (pink button, disabled state)
 * - Accessible with proper ARIA labels
 * 
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

  /**
   * Flow:
   * 1. Check if already liked (early return if yes)
   * 2. Set local state to prevent re-clicking
   * 3. Call parent's onLike handler to update API and global state
   */
  const handleLike = () => {
    if (hasLiked) return //  exit early if already liked
    setHasLiked(true) // Mark as liked immediately for responsive UI
    if (onLike) onLike(thought._id) // Trigger API call via parent
  }

  return (
    <article className="thought">
      <p className="message">{thought.message}</p>
      {/*like button, count, and timestamp */}
      <div className="meta"> 
        <button
          // Dynamic class: adds 'liked' class for pink styling when hasLiked is true
          className={`like-button ${hasLiked ? 'liked' : ''}`}
          onClick={handleLike}
          // ACCESSIBILITY: Screen readers announce button purpose and current like count
          aria-label={`Like this thought (${thought.hearts ?? 0} likes)`}
          // Disable button after liking to prevent multiple clicks
          disabled={hasLiked}
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