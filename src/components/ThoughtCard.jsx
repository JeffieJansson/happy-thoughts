import { useState } from 'react'
import ReactTimeAgo from 'react-timeago'
import '../styles/thoughtCard.css'

export const ThoughtCard = ({ thought, onLike }) => {

  const [hasLiked, setHasLiked] = useState(false)
  const handleLike = () => {
    if (hasLiked) return 
    setHasLiked(true) 
    if (onLike) onLike(thought._id) 
  }

  return (
    <article className="thought">
      <p className="message">{thought.message}</p>
      <div className="meta"> 
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
      </div>
    </article>
  )
}