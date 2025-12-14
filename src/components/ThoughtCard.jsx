import { useState } from 'react'
import ReactTimeAgo from 'react-timeago'
import '../styles/thoughtCard.css'

export const ThoughtCard = ({ thought, onLike }) => {

  // === LOCAL STATE FOR LIKE SPAM PREVENTION ===
  const [hasLiked, setHasLiked] = useState(false)

  // === EVENT HANDLERS ===
  const handleLike = () => {
    if (hasLiked) return // disable multiple likes from same session
    setHasLiked(true) 
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
          <img src="/heart.png" alt="heart icon" className="hearts" />
        </button>
        
          {/* Like Count Display */}
        <span className="likes">x{thought.hearts ?? 0}</span>
        
        <span className="thought-time">
          {/* ReactTimeAgo automatically updates the time string ("2 minutes ago" → "3 minutes ago") */}
          {thought.createdAt ? <ReactTimeAgo date={thought.createdAt} /> : ''}
        </span>
      </div>
    </article>
  )
}